import ol from 'openlayers'
import $ from 'jquery'

import {Control} from './Control'
import { cssClasses, keyCodes } from '../globals'
import {VectorLayer} from '../layers/VectorLayer'

import '../../less/drawbuttons.less'
import { mixin } from '../utilities'

/**
 * @typedef {g4uControlOptions} DrawButtonsOptions
 * @property {StyleLike} [editStyle='#defaultStyle']
 * @property {StyleLike} [finishedStyle='#defaultStyle']
 */

/**
 * Enables the user to draw, edit and erase geometries on the map
 */
export class MeasurementButton extends mixin(Control) {
  /**
   * @param {DrawButtonsOptions} options
   */
  constructor (options = {}) {
    options.element = $('<div>').get(0)
    options.className = options.className || 'g4u-drawbuttons'
    options.singleButton = false

    super(options)

    this.classNames_ = {
      new: this.getClassName() + '-new',
      edit: this.getClassName() + '-edit',
      erase: this.getClassName() + '-erase'
    }

    /**
     * @type {StyleLike}
     * @private
     */
    this.editStyle_ = options.editStyle || '#defaultStyle'

    /**
     * @type {StyleLike}
     * @private
     */
    this.finishedStyle_ = options.finishedStyle || '#defaultStyle'

    this.setTitle(this.getTitle() ||
      this.getLocaliser().localiseUsingDictionary('MeasurementButton dim' + this.dimension_ + ' title')
    )
    this.setTipLabel(this.getTipLabel() ||
      this.getLocaliser().localiseUsingDictionary('MeasurementButton dim' + this.dimension_ + ' tipLabel')
    )

    this.modeNew_ = false
    this.modeEdit_ = false
    this.modeErase_ = false
  }

  createHTML () {
    const $newButton = $('<button>')
      .addClass(this.classNames_.new)
      .on('click', () => this.toggleModeNew())

    this.get$Element().append($newButton)
  }

  toggleModeNew (value) {
    this.newInteraction_.setActive(value === undefined) ? !this.modeNew_ : value
    if (this.modeNew_) {
      this.toggleModeEdit(false)
      this.toggleModeErase(false)
      this.newInteraction_.setActive(true)
    } else {
      this.newInteraction_.setActive(false)
    }
  }

  toggleModeEdit (value) {
    this.modeEdit_ = (value === undefined) ? !this.modeEdit_ : value
    if (this.modeEdit_) {
      this.toggleModeNew(false)
      this.toggleModeErase(false)
      this.editInteraction_.setActive(true)
    } else {
      this.editInteraction_.setActive(false)
    }
  }

  toggleModeErase (value) {
    this.modeErase_ = (value === undefined) ? !this.modeErase_ : value
    if (this.modeErase_) {
      this.toggleModeNew(false)
      this.toggleModeEdit(false)
      this.eraseInteraction_.setActive(true)
    } else {
      this.eraseInteraction_.setActive(false)
    }
  }

  setupNewInteraction (map) {
    this.newInteraction_ = new ol.interaction.Draw({
      source: this.layer_.getSource(),
      type: 'Point',
      style: map.get('styling').getStyle(this.editStyle_)
    })

    this.newInteraction_.setActive(false)

    map.addSupersedingInteraction('singleclick dblclick pointermove', this.newInteraction_)

    this.newInteraction_.on('change:active', () => {
      this.modeNew_ = this.newInteraction_.getActive()
    })
  }

  setupEditInteraction (map) {
    this.editInteraction_ = new ol.interaction.Modify({
      source: this.layer_.getSource(),
      style: map.get('styling').getStyle(this.editStyle_)
    })

    this.editInteraction_.setActive(false)

    map.addSupersedingInteraction('singleclick dblclick pointermove', this.editInteraction_)

    this.editInteraction_.on('change:active', () => {
      this.modeEdit__ = this.editInteraction_.getActive()
    })
  }

  setupEraseInteractions (map) {
    this.eraseHoverInteraction_ = new ol.interaction.Select({
      layers: [this.layer_],
      style: map.get('styling').getStyle(this.editStyle_),
      condition: ol.events.condition.pointerMove
    })

    this.eraseHoverInteraction_.setActive(false)

    map.addSupersedingInteraction('pointermove', this.eraseHoverInteraction_)

    this.eraseHoverInteraction_.on('change:active', () => {
      this.modeErase_ = this.eraseHoverInteraction_.getActive()
    })

    this.eraseClickInteraction_ = new ol.interaction.Select({
      layers: [this.layer_],
      style: map.get('styling').getStyle(this.editStyle_)
    })

    this.eraseClickInteraction_.setActive(false)

    this.eraseClickInteraction_.on('select', e => {
      for (let f of e.selected) {
        this.layer_.getSource().removeFeature(f)
      }
    })

    map.addSupersedingInteraction('singleclick dblclick', this.eraseClickInteraction_)

    this.eraseClickInteraction_.on('change:active', () => {
      this.modeErase_ = this.eraseClickInteraction_.getActive()
    })
  }

  /**
   * @param {G4UMap} map
   */
  setMap (map) {
    if (this.getMap()) {
      this.getMap().getLayers().remove(this.layer_)
      this.getMap().removeInteraction(this.newInteraction_)
      this.getMap().removeInteraction(this.editInteraction_)
      this.getMap().removeInteraction(this.eraseInteraction_)
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

      this.layer_.setStyle(map.get('styling').getStyle(this.style_))
      map.get('styling').manageLayer(this.layer_)

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

      map.addSupersedingInteraction('singleclick dblclick pointermove', this.drawInteraction_)

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
