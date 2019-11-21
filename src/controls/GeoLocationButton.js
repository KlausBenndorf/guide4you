import $ from 'jquery'
import Feature from 'ol/Feature'

import Geolocation from 'ol/Geolocation'
import Point from 'ol/geom/Point'
import VectorSource from 'ol/source/Vector'

import { Control } from './Control'
import { addTooltip } from '../html/html'
import { VectorLayer } from '../layers/VectorLayer'
import { MessageDisplay } from '../MessageDisplay'
import { cssClasses } from '../globals'

import '../../less/geolocation.less'
import { ActivatableMixin } from './ActivatableMixin'
import { ListenerOrganizerMixin } from '../ListenerOrganizerMixin'
import { mixin } from '../utilities'
import { GEOLOCATION } from 'ol/has'

/**
 * @typedef {g4uControlOptions} GeoLocationButtonOptions
 * @property {boolean} [animated] if the move on the map to the geoposition should be animated
 * @property {StyleLike} [style='#defaultStyle']
 * @property {number} [maxZoom]
 * @property {boolean} [followLocation=false]
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
      if (GEOLOCATION) {
        this.setActive(!this.getActive())
      } else {
        this.buttonMessageDisplay_.error(
          this.getLocaliser().localiseUsingDictionary('geolocation geolocation-not-possible'),
          this.getMap().get('mobile') ? { position: 'top middle' } : {}
        )
      }
    })

    this.layer_ = null
    const geolocationOptions = { tracking: false }
    if (options.hasOwnProperty('trackingOptions')) {
      geolocationOptions.trackingOptions = options.trackingOptions
    }
    if (options.hasOwnProperty('projection')) {
      geolocationOptions.projection = options.projection
    }
    this.followLocation_ = options.followLocation || false
    this.geolocation_ = new Geolocation(geolocationOptions)
    this.geolocation_.on('error', () => {
      this.buttonMessageDisplay_.error(
        this.getLocaliser().localiseUsingDictionary('geolocation geolocation-not-possible'),
        this.getMap().get('mobile') ? { position: 'top middle' } : {}
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
      const projection = map.getView().getProjection()
      this.geolocation_.setProjection(projection)

      const layerOptions = { source: new VectorSource({ projection: projection }), visible: true }
      this.layer_ = new VectorLayer(layerOptions)

      this.layer_.setStyle(map.get('styling').getStyle(this.style_))
      map.get('styling').manageLayer(this.layer_)
      map.addLayer(this.layer_)

      this.activateOnMapChange()
    }
  }

  changeHandler_ (options) {
    const source = this.layer_.getSource()
    source.clear()
    const position = this.geolocation_.getPosition()
    source.addFeature(new Feature({ geometry: new Point(position) }))

    const circle = this.geolocation_.getAccuracyGeometry()
    source.addFeature(new Feature({ geometry: circle }))
    if (options.hasOwnProperty('initialRun') && options.initialRun) {
      this.getMap().get('move').toExtent(circle.getExtent(), { animated: this.animated_, maxZoom: this.maxZoom_ })
    } else {
      if (this.animated_) {
        this.getMap().getView().animate({ center: position })
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
    const active = this.getActive()
    this.get$Element().toggleClass(this.classNamePushed_, active)
    if (active) {
      this.geolocation_.setTracking(true)
      const position = this.geolocation_.getPosition()
      if (position) {
        this.changeHandler_({ stopTracking: !this.followLocation_, initialRun: true })
        if (this.followLocation_) {
          this.listenAt(this.geolocation_).on('change', e => this.changeHandler_(e))
        }
      } else {
        this.listenAt(this.geolocation_).once('change', () => {
          this.changeHandler_({ stopTracking: !this.followLocation_, initialRun: true })
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
}
