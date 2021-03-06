import $ from 'jquery'

import OlZoom from 'ol/control/Zoom'
import OlZoomSlider from 'ol/control/ZoomSlider'

import { ComposedControl } from './ComposedControl'
import { cssClasses } from '../globals'
import { copy } from '../utilitiesObject'

import '../../less/zoom.less'
import { mixin } from '../utilities'
import { RewireMixin } from './RewireMixin'

/**
 * @typedef {ComposedControlOptions} CombinedZoomOptions
 * @property {boolean} [buttons=true] visibility of the zoombuttons
 * @property {boolean} [slider=true] visibility of the zoomslider
 * @property {number} [buttonImportance] importance of the buttons
 * @property {number} [sliderImportance] importance of the slider
 * @property {string} [zoomInTipLabel]
 * @property {string} [zoomOutTipLabel]
 */

/**
 * This combines the two zoom controls (zoomslider and zoombuttons)
 */
export class CombinedZoom extends ComposedControl {
  /**
   * @param {CombinedZoomOptions} [options={}]
   */
  constructor (options = {}) {
    options.element = $('<div>').get(0)
    options.className = options.className || 'g4u-zoom'
    options.singleButton = false

    super(options)

    delete options.element

    /**
     * @type {boolean}
     * @private
     */
    this.hasButtons_ = options.buttons || !options.hasOwnProperty('buttons')

    /**
     * @type {boolean}
     * @private
     */
    this.hasSlider_ = options.slider || !options.hasOwnProperty('slider')

    if (this.hasButtons_) {
      this.zoomButtonOptions = copy(options)
      this.zoomButtonOptions.importance = options.buttonImportance || options.importance
      this.zoomButtonOptions.zoomInTipLabel = (options.hasOwnProperty('zoomInTipLabel'))
        ? this.getLocaliser().selectL10N(options.zoomInTipLabel)
        : this.getLocaliser().localiseUsingDictionary('Zoom zoomInTipLabel')

      this.zoomButtonOptions.zoomOutTipLabel = (options.hasOwnProperty('zoomOutTipLabel'))
        ? this.getLocaliser().selectL10N(options.zoomOutTipLabel)
        : this.getLocaliser().localiseUsingDictionary('Zoom zoomOutTipLabel')
    }

    if (this.hasSlider_) {
      this.zoomSliderOptions = copy(options)
      this.zoomSliderOptions.importance = options.sliderImportance
      this.zoomSliderOptions.className = 'g4u-zoomslider'
    }
  }

  /**
   * @param {G4UMap} map
   */
  setMap (map) {
    super.setMap(map)

    if (map) {
      if (this.hasSlider_) {
        this.addZoomSlider()
      }

      if (this.hasButtons_) {
        this.addZoomButtons()
      }
    }
  }

  addZoomButtons () {
    /**
     * @type {Zoom}
     * @private
     */
    this.zoomButtons_ = new Zoom(this.zoomButtonOptions)

    this.addControl(this.zoomButtons_, { wrap: false })

    const $zoomIn = this.zoomButtons_.get$Element().children('.g4u-zoom-in')
    const $zoomOut = this.zoomButtons_.get$Element().children('.g4u-zoom-out')

    this.get$Container().prepend($zoomIn)
    this.get$Container().append($zoomOut)

    this.zoomButtons_.get$Element().remove()
  }

  addZoomSlider () {
    /**
     * @type {ZoomSlider}
     * @private
     */
    this.zoomSlider_ = new ZoomSlider(this.zoomSliderOptions)

    this.addControl(this.zoomSlider_, { wrap: false })

    const $zoomSlider = this.zoomSlider_.get$Element()

    $zoomSlider.on('mousedown', function () {
      $zoomSlider.addClass(cssClasses.mousedown)
    })
    $zoomSlider.on('mouseup', function () {
      $zoomSlider.removeClass(cssClasses.mousedown)
    })

    const $zoomIn = this.get$Container().filter('.g4u-zoom-in')

    if ($zoomIn.length) {
      $zoomSlider.insertAfter($zoomIn)
    } else {
      this.get$Container().append($zoomSlider)
    }
  }
}

/**
 * @typedef {g4uControlOptions} ZoomOptions
 * @property {Localizable} [zoomInTipLabel]
 * @property {Localizable} [zoomOutTipLabel]
 */

/**
 * @extends Control
 */
export class Zoom extends mixin(OlZoom, RewireMixin) {
  /**
   * @param {g4uControlOptions} [options={}]
   */
  constructor (options = {}) {
    options.className = (options.hasOwnProperty('className')) ? options.className : 'g4u-zoom'

    options.zoomInTipLabel = (options.hasOwnProperty('zoomInTipLabel'))
      ? options.localiser.selectL10N(options.zoomInTipLabel)
      : options.localiser.localiseUsingDictionary('Zoom zoomInTipLabel')

    options.zoomOutTipLabel = (options.hasOwnProperty('zoomOutTipLabel'))
      ? options.localiser.selectL10N(options.zoomOutTipLabel)
      : options.localiser.localiseUsingDictionary('Zoom zoomOutTipLabel')

    super(options)
  }
}

/**
 * @extends Control
 */
export class ZoomSlider extends mixin(OlZoomSlider, RewireMixin) {
  /**
   * @param {g4uControlOptions} [options={}]
   */
  constructor (options = {}) {
    options.className = (options.hasOwnProperty('className')) ? options.className : 'g4u-zoomslider'

    super(options)
  }

  rewire () {
    super.rewire()

    this.get$Element().on('mousedown', function () {
      $(this).addClass(cssClasses.mousedown)
    })
    this.get$Element().on('mouseup', function () {
      $(this).removeClass(cssClasses.mousedown)
    })
  }
}
