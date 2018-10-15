import ol from 'ol'
import $ from 'jquery'

import {Control} from './Control'
import { addTooltip } from '../html/html'
import {VectorLayer} from '../layers/VectorLayer'
import {MessageDisplay} from '../MessageDisplay'
import {cssClasses} from '../globals'

import '../../less/geolocation.less'
import { ActivatableMixin } from './ActivatableMixin'
import { ListenerOrganizerMixin } from '../ListenerOrganizerMixin'
import { mixin } from '../utilities'

/**
 * @typedef {g4uControlOptions} GeoLocationButtonOptions
 * @property {boolean} [animated] if the move on the map to the geoposition should be animated
 * @property {StyleLike} [style='#defaultStyle']
 * @property {number} [maxZoom]
 * @property {boolean} [active=false]
 */

/**
 * This class provides a button to center the view on your current geoposition.
 */
export class GeolocationButton extends mixin(Control, [ActivatableMixin, ListenerOrganizerMixin]) {
  /**
   * @param {GeoLocationButtonOptions} [options={}]
   */
  constructor (options = {}) {
    options.className = options.className || 'g4u-geolocation'
    options.singleButton = true
    options.element = $('<button>').get(0)

    super(options)

    /**
     * @type {string}
     * @private
     */
    this.classNamePushed_ = this.className_ + '-pushed'

    /**
     * @type {boolean}
     * @private
     */
    this.animated_ = options.animated

    /**
     * @type {StyleLike}
     * @private
     */
    this.style_ = options.style || '#defaultStyle'

    /**
     * @type {number}
     * @private
     */
    this.maxZoom_ = options.maxZoom

    this.setTitle(this.getTitle() || this.getLocaliser().localiseUsingDictionary('GeolocationButton title'))

    this.setTipLabel(this.getTipLabel() || this.getLocaliser().localiseUsingDictionary('GeolocationButton tipLabel'))

    this.get$Element()
      .addClass(this.className_)
      .addClass(cssClasses.mainButton)
      .html(this.getTitle())

    addTooltip(this.get$Element(), this.getTipLabel())

    /**
     * @type {MessageDisplay}
     * @private
     */
    this.buttonMessageDisplay_ = new MessageDisplay(this.get$Element())

    this.get$Element().on('click touch', () => {
      if (ol.has.GEOLOCATION) {
        this.setActive(!this.getActive())
      } else {
        this.buttonMessageDisplay_.error(
          this.getLocaliser().localiseUsingDictionary('geolocation geolocation-not-possible'),
          this.getMap().get('mobile') ? {position: 'top middle'} : {}
        )
      }
    })

    this.layer_ = null
    let geolocationOptions = { tracking: false }
    if (options.hasOwnProperty('trackingOptions')) {
      geolocationOptions.trackingOptions = options.trackingOptions
    }
    if (options.hasOwnProperty('projection')) {
      geolocationOptions.projection = options.projection
    }
    this.followLocation_ = options.followLocation || false
    this.geolocation_ = new ol.Geolocation(geolocationOptions)
    this.geolocation_.on('error', () => {
      this.buttonMessageDisplay_.error(
        this.getLocaliser().localiseUsingDictionary('geolocation geolocation-not-possible'),
        this.getMap().get('mobile') ? {position: 'top middle'} : {}
      )
      this.setActive(false)
    })

    this.on('change:active', e => this.activeChangeHandler_(e))
  }

  /**
   * @param {G4UMap} map
   */
  setMap (map) {
    if (this.getMap()) {
      this.getMap().getLayers().remove(this.layer_)
    }

    super.setMap(map)

    if (map) {
      let projection = map.getView().getProjection()
      this.geolocation_.setProjection(projection)

      let layerOptions = {source: new ol.source.Vector({projection: projection}), visible: true}
      this.layer_ = new VectorLayer(layerOptions)

      this.layer_.setStyle(map.get('styling').getStyle(this.style_))
      map.get('styling').manageLayer(this.layer_)
      map.getLayers().insertAt(1, this.layer_) // 0 is where the baseLayers are

      this.activateOnMapChange()
    }
  }

  changeHandler_ (options) {
    let source = this.layer_.getSource()
    source.clear()
    let position = this.geolocation_.getPosition()
    source.addFeature(new ol.Feature({geometry: new ol.geom.Point(position)}))

    let circle = this.geolocation_.getAccuracyGeometry()
    source.addFeature(new ol.Feature({geometry: circle}))
    if (options.hasOwnProperty('initialRun') && options.initialRun) {
      this.getMap().get('move').toExtent(circle.getExtent(), {animated: this.animated_, maxZoom: this.maxZoom_})
    } else {
      if (this.animated_) {
        this.getMap().getView().animate({'center': position})
      } else {
        this.getMap().getView().setCenter(position)
      }
    }
    if (options.hasOwnProperty('stopTracking')) {
      this.geolocation_.setTracking(!options.stopTracking)
    }
  }

  /**
   * Show/Hide the geolocation on the map as point with a circle in the size of the accuracy around
   */
  activeChangeHandler_ () {
    let active = this.getActive()
    this.get$Element().toggleClass(this.classNamePushed_, active)
    if (active) {
      this.geolocation_.setTracking(true)
      let position = this.geolocation_.getPosition()
      if (position) {
        this.changeHandler_({'stopTracking': !this.followLocation_, 'initialRun': true})
        if (this.followLocation_) {
          this.listenAt(this.geolocation_).on('change', e => this.changeHandler_(e))
        }
      } else {
        this.listenAt(this.geolocation_).once('change', () => {
          this.changeHandler_({'stopTracking': !this.followLocation_, 'initialRun': true})
          if (this.followLocation_) {
            this.listenAt(this.geolocation_).on('change', e => this.changeHandler_(e))
          }
        })
      }
    } else {
      this.layer_.getSource().clear()
      this.detachFrom(this.geolocation_, 'change')
      this.geolocation_.setTracking(false)
    }
  }

  /**
   * Creates a circle around a given position with a given radius in meters in a desired projection
   * @param {ol.Coordinate} position
   * @param {ol.ProjectionLike} projection
   * @param {number} meters
   * @returns {ol.geom.Circle}
   * @private
   */
  static makeCircle_ (position, projection, meters) {
    // using assumption that earth is a sphere and that one degree in north/south direction
    // on any point of the earth is 90/10000 km

    let position4326 = ol.proj.transform(position, projection, 'EPSG:4326')

    let secondPosition4326 = [position4326[0], position4326[1] +
    meters / 1000 * 90 / 10000]

    let secondPosition = ol.proj.transform(secondPosition4326, 'EPSG:4326', projection)

    let radius = Math.abs(position[1] - secondPosition[1])

    return new ol.geom.Circle(position, radius)
  }
}
