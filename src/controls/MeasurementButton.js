import ol from 'openlayers'
import $ from 'jquery'

import {Control} from './Control'
import { cssClasses, keyCodes } from '../globals'
import {VectorLayer} from '../layers/VectorLayer'

import '../../less/measurement.less'

/**
 * @typedef {g4uControlOptions} MeasurementButtonOptions
 * @property {StyleLike} [style='#defaultStyle']
 * @property {string} type geometry type ('LineString', 'Polygon')
 * @property {number} [dimension=1] 1 for lines, 2 for polygons
 * @property {string} [atDrawEnd=''] if set to 'newMeasurement' the control will start a new measurement after
 *    completing a measurement
 */

/**
 * Enables the user to draw lines or polygons on the map and displays the length or area.
 */
export class MeasurementButton extends Control {
  /**
   * @param {MeasurementButtonOptions} options
   */
  constructor (options = {}) {
    options.element = $('<div>').get(0)
    options.className = options.className || 'g4u-measurement'
    options.singleButton = false

    super(options)

    /**
     * @type {StyleLike}
     * @private
     */
    this.style_ = options.style || '#defaultStyle'

    if (!options.hasOwnProperty('type')) {
      throw new Error('Measurement needs a type (Polygon, LineString, etc)')
    }

    /**
     * @type {string}
     * @private
     */
    this.type_ = options.type

    /**
     * @type {number}
     * @private
     */
    this.dimension_ = options.dimension || 1

    this.setTitle(this.getTitle() ||
      this.getLocaliser().localiseUsingDictionary('MeasurementButton dim' + this.dimension_ + ' title')
    )
    this.setTipLabel(this.getTipLabel() ||
      this.getLocaliser().localiseUsingDictionary('MeasurementButton dim' + this.dimension_ + ' tipLabel')
    )

    /**
     * @type {string}
     * @private
     */
    this.atDrawEnd_ = options.atDrawEnd || ''

    /**
     * @type {boolean}
     * @private
     */
    this.active_ = false

    /**
     * @type {number}
     * @private
     */
    this.value_ = 0

    /**
     * @type {jQuery}
     * @private
     */
    this.$valueDisplay_ = $('<span>').html('0')

    /**
     * @type {jQuery}
     * @private
     */
    this.$unitPlaceholder_ = $('<span>')
  }

  /**
   * @param {G4UMap} map
   */
  setMap (map) {
    if (map) {
      this.get$Element()
        .append(this.getLocaliser().localiseUsingDictionary('MeasurementButton dim' + this.dimension_ + ' measured'))
        .append($('<span>')
          .addClass(this.className_ + '-value')
          .append(this.$valueDisplay_)
          .append('&nbsp;')
          .append(this.$unitPlaceholder_))
        .append('<br/>')
        .append(this.getLocaliser().localiseUsingDictionary('MeasurementButton doubleClickEndsMeasurement'))

      /**
       * @type {ol.proj.Projection}
       * @private
       */
      this.measurementProjection_ = map.get('measurementProjection')

      if (!this.measurementProjection_) {
        throw new Error('MeasurementButton needs a measurementProjection. This is a global option of the map.')
      }

      if (this.dimension_ === 1) {
        this.$unitPlaceholder_.replaceWith(this.measurementProjection_.getUnits())
      }
      if (this.dimension_ === 2) {
        this.$unitPlaceholder_.replaceWith(this.measurementProjection_.getUnits() + '&sup2;')
      }

      /**
       * @type {ol.TransformFunction}
       * @private
       */
      this.measurementTransform_ = ol.proj.getTransform(map.getView().getProjection(), this.measurementProjection_)

      /**
       * @type {ol.source.Vector}
       * @private
       */
      this.source_ = new ol.source.Vector({
        projection: this.measurementProjection_
      })

      /**
       * @type {VectorLayer}
       * @private
       */
      this.layer_ = new VectorLayer({
        source: this.source_
      })

      map.get('styling').styleLayer(this.layer_, this.style_)

      map.getLayers().insertAt(1, this.layer_) // at 0 the baselayers are

      /**
       * @type {ol.interaction.Draw}
       * @private
       */
      this.drawInteraction_ = new ol.interaction.Draw({
        source: this.source_,
        type: this.type_,
        style: map.get('styling').getStyle(this.style_)
      })

      this.drawInteraction_.setActive(false)

      map.addSupersedingInteraction('singleClick doubleClick mouseMove', this.drawInteraction_)

      let curFeature = null

      this.drawInteraction_.on('drawstart', e => {
        this.clear()
        curFeature = e.feature
        this.dispatchEvent('measurement')
      })

      map.on('click', () => {
        if (this.getActive()) {
          let geometry = curFeature.getGeometry().clone()
          geometry.applyTransform(this.measurementTransform_)
          if (this.dimension_ === 1) {
            this.setValue(geometry.getLength())
          } else if (this.dimension_ === 2) {
            this.setValue(geometry.getArea())
          }
        }
      })

      $(map.getViewport()).parent().on('keydown', e => {
        if (e.which === keyCodes.ESCAPE && this.drawInteraction_.getActive()) {
          this.drawInteraction_.finishDrawing()
        }
      })

      this.drawInteraction_.on('drawend', () => {
        if (this.atDrawEnd_ !== 'newMeasurement') {
          this.setActive(false)
        }
      })
    } else {
      this.getMap().getLayers().remove(this.layer_)
      this.getMap().removeInteraction(this.drawInteraction_)
    }

    super.setMap(map)
  }

  /**
   * @returns {number}
   */
  getValue () {
    return this.value_
  }

  /**
   * @param {number} value
   */
  setValue (value) {
    this.value_ = value
    this.$valueDisplay_.html('' + Math.round(value))
    this.changed()
  }

  /**
   * @returns {string}
   */
  getType () {
    return this.type_
  }

  /**
   * @returns {boolean}
   */
  getActive () {
    return this.active_
  }

  /**
   * @param {boolean} active
   */
  setActive (active) {
    let oldValue = this.active_

    if (oldValue !== active) {
      let changeEvent = {
        type: 'change:active',
        oldValue: oldValue
      }

      this.active_ = active

      this.layer_.setVisible(active)

      if (active) {
        $(this.getMap().getViewport()).addClass(cssClasses.crosshair)

        this.clear()
        this.drawInteraction_.setActive(true)
      } else {
        $(this.getMap().getViewport()).removeClass(cssClasses.crosshair)

        this.drawInteraction_.setActive(false)
      }

      this.dispatchEvent(changeEvent)
    }
  }

  /**
   * Clears any measurement
   */
  clear () {
    this.source_.clear()
    this.setValue(0)
  }
}
