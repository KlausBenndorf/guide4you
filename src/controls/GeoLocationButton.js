import ol from 'openlayers'
import $ from 'jquery'

import {Control} from './Control'
import { addTooltip } from '../html/html'
import {VectorLayer} from '../layers/VectorLayer'
import {MessageDisplay} from '../MessageDisplay'
import {cssClasses} from '../globals'

import '../../less/geolocation.less'

/**
 * @typedef {g4uControlOptions} GeolocationButtonOptions
 * @property {boolean} [animated] if the move on the map to the geoposition should be animated
 * @property {StyleLike} [style='#defaultStyle']
 * @property {number} [maxZoom]
 */

/**
 * This class provides a button to center the view on your current geoposition.
 */
export class GeolocationButton extends Control {
  /**
   * @param {GeolocationButtonOptions} [options={}]
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
      .text(this.getTitle())

    addTooltip(this.get$Element(), this.getTipLabel())

    /**
     * @type {MessageDisplay}
     * @private
     */
    this.buttonMessageDisplay_ = new MessageDisplay(this.get$Element())

    this.get$Element().on('click', () => {
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
    this.geolocation_ = new ol.Geolocation()
    this.geolocation_.on('error', () => {
      this.buttonMessageDisplay_.error(
        this.getLocaliser().localiseUsingDictionary('geolocation geolocation-not-possible'),
        this.getMap().get('mobile') ? {position: 'top middle'} : {}
      )
      this.setActive(false)
    })

    /**
     * @type {boolean}
     * @private
     */
    this.active_ = false
  }

  /**
   * @param {G4UMap} map
   */
  setMap (map) {
    if (map) {
      let projection = map.getView().getProjection()
      this.geolocation_.setProjection(projection)

      let layerOptions = {source: new ol.source.Vector({projection: projection}), visible: true}
      this.layer_ = new VectorLayer(layerOptions)

      map.get('styling').styleLayer(this.layer_, this.style_)
      map.getLayers().insertAt(1, this.layer_) // 0 is where the baseLayers are
    } else {
      this.getMap().getLayers().remove(this.layer_)
    }

    super.setMap(map)
  }

  /**
   * @returns {boolean}
   */
  getActive () {
    return this.active_
  }

  /**
   * Show/Hide the geolocation on the map as point with a circle in the size of the accuracy around
   * @param {boolean} active
   */
  setActive (active) {
    let oldValue = this.active_
    if (oldValue !== active) {
      this.get$Element().toggleClass(this.classNamePushed_, active)

      if (active) {
        this.geolocation_.once('change:position', () => {
          let view = this.getMap().getView()
          let position = this.geolocation_.getPosition()
          let source = this.layer_.getSource()

          // point on the position
          let geometry = new ol.geom.Point(position)
          let feature = new ol.Feature({geometry: geometry})

          source.addFeature(feature)

          // radius around
          let accuracy = this.geolocation_.getAccuracy()
          if (accuracy > 0) {
            geometry = this.geolocation_.getAccuracyGeometry()
            if (!geometry) {
              geometry = GeolocationButton.makeCircle_(position, view.getProjection(), accuracy)
            }
            feature = new ol.Feature({geometry: geometry})
            source.addFeature(feature)
          }

          this.getMap().get('move').toExtent(geometry.getExtent(), {animated: this.animated_, maxZoom: this.maxZoom_})

          this.geolocation_.setTracking(false)
        })

        this.geolocation_.setTracking(true)
      } else {
        this.layer_.getSource().clear()
      }

      this.active_ = active
      this.dispatchEvent({
        type: 'change:active',
        oldValue: oldValue
      })
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
