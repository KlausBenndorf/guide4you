import ol from 'openlayers'
import $ from 'jquery'

import { cssClasses, keyCodes } from '../globals'
import { getInFront } from './html'

import '../../less/shield.less'

/**
 * @typedef {object} ShieldOptions
 * @property {G4UMap} map
 * @property {string} [className='g4u-shield']
 */

/**
 * A shield that sets itself in front of all other elements in a context if activated, hides itself if deactivated.
 * It can get another element in front of it (Attention: it gets removed from its context temporarly)
 */
export default class Shield extends ol.Object {
  /**
   * @param {ShieldOptions} options
   */
  constructor (options) {
    super()

    /**
     * @type {string}
     * @private
     */
    this.className_ = options.className || 'g4u-shield'

    /**
     * @type {G4UMap}
     * @private
     */
    this.map_ = options.map

    /**
     * @type {jQuery}
     * @private
     */
    this.$context_ = $(this.map_.getTarget())

    /**
     * @type {jQuery}
     * @private
     */
    this.$element_ = $('<div>')
      .addClass(this.className_)

    this.$context_.append(this.$element_)

    this.setActive(options.hasOwnProperty('active') ? options.active : false)

    this.$element_.on('keydown', e => {
      if (e.which === keyCodes.ESCAPE) {
        if (this.getActive()) {
          this.setActive(false)
        }
      }
    })
  }

  /**
   * @param {boolean} active
   */
  setActive (active) {
    let oldValue = this.active_
    if (oldValue !== active) {
      if (active) {
        this.$element_.removeClass(cssClasses.hidden)
        getInFront(this.$element_, this.$context_)
      } else {
        this.$element_.addClass(cssClasses.hidden)
      }
      this.active_ = active
      this.dispatchEvent({
        type: 'change:active',
        oldValue: oldValue,
        key: 'active'
      })
    }
  }

  /**
   * @returns {boolean}
   */
  getActive () {
    return this.active_
  }

  /**
   * Gets the given element in front of the shield. The element is removed from its current context temporarily
   * @param {jQuery} $element
   */
  getInFront ($element) {
    let $window = $element.parents().filter('.g4u-window')
    if ($window.length > 0) {
      $element = $window
    }
    this.$oldParent_ = $element.parent()
    this.$element_.append($element)
    this.once('change:active', () => {
      this.$oldParent_.append($element)
    })
  }
}
