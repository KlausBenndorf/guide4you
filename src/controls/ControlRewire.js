import ol from 'openlayers'
import $ from 'jquery'

import {mixin, recursiveSelect} from '../utilities'
import {ControlLogicMixin} from './ControlLogicMixin'
import {cssClasses} from '../globals'

import '../../less/attribution.less'
import '../../less/overviewmap.less'
import '../../less/scaleline.less'
import '../../less/mouseposition.less'

/**
 * This file provides versions of all used ol controls extended by the ControlLogicMixin
 */

/**
 * This class does all generic rewiring including catching the target and restyling the tooltips
 * It is important to provide a className in the control because else it will not be possible to find the control in
 * the ol-viewport
 */
class RewireMixin extends ControlLogicMixin {
  /**
   * @param {g4uControlOptions} [options={}]
   */
  initialize (options = {}) {
    options.singleButton = false

    super.initialize(options)

    this.rewire()
  }

  /**
   * This function tweaks the control a little bit
   */
  rewire () {
    recursiveSelect(this.get$Element(), 'button[title]')
      .each(function () {
        let title = $(this).attr('title')
        $(this).addClass(cssClasses.hasTooltip).removeAttr('title').append(`<span role='tooltip'>${title}</span>`)
      })
  }
}

/**
 * @typedef {g4uControlOptions} AttributionOptions
 * @property {Localizable} [tipLabel]
 */

/**
 * @extends Control
 */
export class Attribution extends mixin(ol.control.Attribution, RewireMixin) {
  /**
   * @param {AttributionOptions} [options={}]
   */
  constructor (options = {}) {
    options.className = (options.hasOwnProperty('className')) ? options.className : 'g4u-attribution'

    if (options.hasOwnProperty('title')) {
      options.tipLabel = options.localiser.selectL10N(options.title)
    } else {
      options.tipLabel = (options.hasOwnProperty('tipLabel'))
        ? options.localiser.selectL10N(options.tipLabel)
        : options.localiser.localiseUsingDictionary('Attribution tipLabel')
    }

    options.collapsed = options.collapsed === true

    super(options)

    /**
     * @type {boolean}
     * @private
     */
    this.showPoweredBy_ = options.poweredBy !== false
    if (this.showPoweredBy_) {
      let content = (options.poweredBy === undefined)
        ? '<a href="https://github.com/KlausBenndorf/guide4you" target="_blank">Guide4You</a>'
        : options.poweredBy

      /**
       * @type {jQuery}
       * @private
       */
      this.$poweredBy_ = $('<li>')
        .append(content)
        .addClass(this.className_ + '-poweredby')
    }
  }

  rewire () {
    super.rewire()

    if (this.showPoweredBy_) {
      this.get$Element().children('ul').children('li').eq(0).after(this.$poweredBy_)
    }
  }
}

/**
 * @typedef {g4uControlOptions} OverviewMapOptions
 * @property {Localizable} [tipLabel]
 */

/**
 * @extends Control
 */
export class OverviewMap extends mixin(ol.control.OverviewMap, RewireMixin) {
  /**
   * @param {OverviewMapOptions} [options={}]
   */
  constructor (options = {}) {
    if (options.hasOwnProperty('title')) {
      options.tipLabel = options.localiser.selectL10N(options.title)
    } else {
      options.tipLabel = (options.hasOwnProperty('tipLabel'))
        ? options.localiser.selectL10N(options.tipLabel)
        : options.localiser.localiseUsingDictionary('OverviewMap tipLabel')
    }

    super(options)
  }
}

/**
 * @extends Control
 */
export class ScaleLine extends mixin(ol.control.ScaleLine, RewireMixin) {
  /**
   * @param {g4uControlOptions} [options={}]
   */
  constructor (options = {}) {
    options.className = (options.hasOwnProperty('className')) ? options.className : 'g4u-scale-line'
    super(options)
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
export class Zoom extends mixin(ol.control.Zoom, RewireMixin) {
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
export class ZoomSlider extends mixin(ol.control.ZoomSlider, RewireMixin) {
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

/**
 * @typedef {g4uControlOptions} MousePositionOptions
 * @property {function} [coordinateFormat]
 */

/**
 * @extends Control
 */
export class MousePosition extends mixin(ol.control.MousePosition, RewireMixin) {
  /**
   * @param {MousePositionOptions} [options={}]
   */
  constructor (options = {}) {
    options.className = (options.hasOwnProperty('className')) ? options.className : 'g4u-mouseposition'

    options.coordinateFormat = coordinate => {
      return coordinate.map(c => {
        let lead = c.toString().match(/^[^.]*/.length)[ 0 ]
        if (lead.length >= 8) {
          return lead
        } else {
          return c.toFixed(7 - lead.length)
        }
      })
    }

    super(options)
  }
}
