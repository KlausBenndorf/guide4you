import $ from 'jquery'
import LineString from 'ol/geom/LineString'

import VectorSource from 'ol/source/Vector'
import Draw from 'ol/interaction/Draw'
import { getArea, getLength } from 'ol/sphere'

import { Control } from './Control'
import { cssClasses, keyCodes } from '../globals'
import { VectorLayer } from '../layers/VectorLayer'

import '../../less/measurement.less'
import { mixin } from '../utilities'
import { ActivatableMixin } from './ActivatableMixin'

/**
 * @typedef {g4uControlOptions} MeasurementButtonOptions
 * @property {StyleLike} [style='#defaultStyle']
 * @property {string} type geometry type ('LineString', 'Polygon')
 * @property {number} [dimension=1] 1 for lines, 2 for polygons
 * @property {string} [atDrawEnd] if set to 'newMeasurement' the control will start a new measurement after
 *    completing a measurement. if set to 'closeWindow' the window will be closed.
 * @property {boolean} [active=false]
 */

/**
 * Enables the user to draw lines or polygons on the map and displays the length or area.
 */
export class MeasurementButton extends mixin(Control, ActivatableMixin) {
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
     * @type {string|undefined}
     * @private
     */
    this.atDrawEnd_ = options.atDrawEnd

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

    this.on('change:active', () => this.handleActiveChange_())
  }

  /**
   * @param {G4UMap} map
   */
  setMap (map) {
    if (this.getMap()) {
      this.getMap().getLayers().remove(this.layer_)
      this.getMap().removeInteraction(this.drawInteraction_)
    }

    super.setMap(map)

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

      if (this.dimension_ === 1) {
        this.$unitPlaceholder_.replaceWith('m')
      }
      if (this.dimension_ === 2) {
        this.$unitPlaceholder_.replaceWith('m&sup2;')
      }

      /**
       * @type {ol.source.Vector}
       * @private
       */
      this.source_ = new VectorSource({})

      /**
       * @type {VectorLayer}
       * @private
       */
      this.layer_ = new VectorLayer({
        source: this.source_
      })

      const style = map.get('styling').getStyle(this.style_)
      const segmentStyle = (feature, resolution) => {
        let coords
        if (this.dimension_ === 1) {
          coords = feature.getGeometry().getCoordinates()
        } else if (this.dimension_ === 2) {
          coords = feature.getGeometry().getCoordinates()[0]
        }
        const styles = []
        for (let i = 0; i < coords.length - 1; i++) {
          const segment = new LineString([coords[i], coords[i + 1]])
          const segmentStyle = style.clone()
          const length = getLength(segment, { projection: map.getView().getProjection() })
          segmentStyle.getText().setText(`${length.toFixed(0)} m`)
          segmentStyle.setGeometry(segment)
          styles.push(segmentStyle)
        }
        return styles
      }

      this.layer_.setStyle(segmentStyle)
      map.get('styling').manageLayer(this.layer_)

      map.addLayer(this.layer_)

      let curFeature

      /**
       * @type {ol.interaction.Draw}
       * @private
       */
      this.drawInteraction_ = new Draw({
        source: this.source_,
        type: this.type_,
        style: (feature, resolution) => {
          if (feature === curFeature) {
            return segmentStyle(feature, resolution)
          }
        }
      })

      this.drawInteraction_.setActive(false)

      map.addSupersedingInteraction('singleclick dblclick pointermove', this.drawInteraction_)

      this.drawInteraction_.on('drawstart', e => {
        this.clear()
        curFeature = e.feature
        this.dispatchEvent('measurement')
      })

      map.on('click', () => {
        if (this.getActive()) {
          if (this.dimension_ === 1) {
            this.setValue(getLength(curFeature.getGeometry(), { projection: map.getView().getProjection() }))
          } else if (this.dimension_ === 2) {
            this.setValue(getArea(curFeature.getGeometry(), { projection: map.getView().getProjection() }))
          }
        }
      })

      $(map.getViewport()).parent().on('keydown', e => {
        if (e.which === keyCodes.ESCAPE && this.drawInteraction_.getActive()) {
          this.drawInteraction_.finishDrawing()
        }
      })

      this.drawInteraction_.on('drawend', () => {
        switch (this.atDrawEnd_) {
          case 'newMeasurement':
            break
          case 'closeWindow':
            this.setActive(false)
            break
          default:
            this.drawInteraction_.setActive(false)
        }
      })

      this.activateOnMapChange()
    }
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

  handleActiveChange_ () {
    let active = this.getActive()

    this.layer_.setVisible(active)

    if (active) {
      if (this.getMap().get('localiser').isRtl()) {
        this.get$Element().prop('dir', 'rtl')
      } else {
        this.get$Element().prop('dir', undefined)
      }
      let popup = this.getMap().get('featurePopup')
      if (popup) {
        popup.setVisible(false)
      }
      $(this.getMap().getViewport()).addClass(cssClasses.crosshair)

      this.clear()
      this.drawInteraction_.setActive(true)
    } else {
      $(this.getMap().getViewport()).removeClass(cssClasses.crosshair)

      this.drawInteraction_.setActive(false)
    }

    this.get$Element().toggleClass(cssClasses.active, active)
  }

  /**
   * Clears any measurement
   */
  clear () {
    this.source_.clear()
    this.setValue(0)
  }
}
