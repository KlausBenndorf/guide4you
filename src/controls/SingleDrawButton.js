import $ from 'jquery'
import { Feature } from 'ol'
import LineString from 'ol/geom/LineString'
import { unByKey } from 'ol/Observable'
import { getLength } from 'ol/sphere'

import { Control } from './Control'
import { cssClasses, keyCodes } from '../globals'
import { VectorLayer } from '../layers/VectorLayer'

import '../../less/singledrawbutton.less'
import { mixin } from '../utilities'
import { Dropdown } from '../html/Dropdown'
import { ActivatableMixin } from './ActivatableMixin'
import Draw from 'ol/interaction/Draw'
import VectorSource from 'ol/source/Vector'

/**
 * @typedef {g4uControlOptions} DrawButtonsOptions
 * @property {StyleLike} [editStyle='#defaultStyle']
 * @property {StyleLike} [finishedStyle='#defaultStyle']
 */

/**
 * Enables the user to draw, edit and erase geometries on the map
 */
export class SingleDrawButton extends mixin(Control, ActivatableMixin) {
  /**
   * @param {DrawButtonsOptions} options
   */
  constructor (options = {}) {
    options.element = $('<div>').get(0)
    options.className = options.className || 'g4u-single-draw'
    options.singleButton = false

    super(options)

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
      this.getLocaliser().localiseUsingDictionary('SingleDrawButton title')
    )
    this.setTipLabel(this.getTipLabel() ||
      this.getLocaliser().localiseUsingDictionary('SingleDrawButton tipLabel')
    )

    this.createHTML()
  }

  createHTML () {
    const $button = $('<button>')
      .addClass(this.getClassName() + '-button')
      .addClass(cssClasses.mainButton)
      .text(this.getTitle())
      .on('click', () => {
        if (this.getActive()) {
          this.setActive(false)
        } else {
          this.dropdown_.slideDown()
        }
      })

    this.get$Element().append($button)

    this.dropdown_ = new Dropdown()

    this.dropdown_.setEntries([
      'Point',
      'LineString',
      'Polygon',
      'Circle',
      'Delete'
    ], [
      this.getLocaliser().localiseUsingDictionary('SingleDrawButton draw point'),
      this.getLocaliser().localiseUsingDictionary('SingleDrawButton draw line'),
      this.getLocaliser().localiseUsingDictionary('SingleDrawButton draw polygon'),
      this.getLocaliser().localiseUsingDictionary('SingleDrawButton draw circle'),
      this.getLocaliser().localiseUsingDictionary('SingleDrawButton delete all')
    ])

    this.dropdown_.on('select', () => {
      const mode = this.dropdown_.getValue()
      if (mode === 'Delete') {
        this.layer_.getSource().clear()
      } else {
        this.setActive(true)
      }
    })

    this.get$Element().append(this.dropdown_.get$Element())
  }

  setActive (active) {
    if (active) {
      const mode = this.dropdown_.getValue()
      this.addInteraction(mode)
      this.dropdown_.slideUp()
    } else if (this.interaction_) {
      this.removeInteraction()
    }

    super.setActive(active)

    this.get$Element().toggleClass(cssClasses.active, active)
  }

  addInteraction (mode) {
    const map = this.getMap()

    const style = map.get('styling').getStyle(this.editStyle_)

    this.interaction_ = new Draw({
      source: this.layer_.getSource(),
      type: mode,
      style: style
    })

    $(map.getViewport()).addClass(cssClasses.crosshair)

    map.addSupersedingInteraction('singleclick dblclick pointermove', this.interaction_)

    this.interaction_.on('drawend', () => {
      this.setActive(false)
    })
  }

  removeInteraction () {
    const map = this.getMap()
    this.interaction_.setActive(false)
    map.removeInteraction(this.interaction_)
    this.interaction_ = undefined
    $(map.getViewport()).removeClass(cssClasses.crosshair)
  }

  /**
   * @param {G4UMap} map
   */
  setMap (map) {
    if (this.getMap()) {
      this.getMap().getLayers().remove(this.layer_)
      if (this.interaction_) {
        this.removeInteraction()
      }
    }

    super.setMap(map)

    if (map) {
      /**
       * @type {VectorLayer}
       * @private
       */
      this.layer_ = new VectorLayer({
        source: new VectorSource(),
        visible: true
      })

      this.layer_.setStyle(map.get('styling').getStyle(this.finishedStyle_))
      map.get('styling').manageLayer(this.layer_)

      map.addLayer(this.layer_) // at 0 the baselayers are

      $(map.getViewport()).parent().on('keydown', e => {
        if (e.which === keyCodes.ESCAPE && this.interaction_) {
          this.removeInteraction()
        }
      })

      this.addMeasureLine()
    }
  }

  getLayer () {
    return this.layer_
  }

  addMeasureLine () {
    let lastPoint = null

    const style = this.getMap().get('styling').getStyle(this.editStyle_).clone()
    style.setZIndex(style.getZIndex() + 1)
    const projection = this.getMap().getView().getProjection()

    const measureLine = new Feature()
    measureLine.setStyle(() => {
      if (style.getText()) {
        const length = getLength(measureLine.getGeometry(), { projection })
        style.getText().setText(length.toFixed(0) + ' m')
      }
      return style
    })

    this.layer_.getSource().addFeature(measureLine)

    this.getMap().on('singleclick', e => {
      measureLine.set('hidden', true)
      lastPoint = e.coordinate
    })

    this.getMap().on('pointermove', e => {
      if (this.getActive() && lastPoint) {
        const geometry = new LineString([lastPoint, e.coordinate])
        measureLine.setGeometry(geometry)
        measureLine.set('hidden', false)
      }
    })

    this.on('change:active', () => {
      lastPoint = null
      measureLine.set('hidden', true)
    })
  }
}
