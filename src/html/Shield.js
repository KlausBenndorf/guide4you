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
 * @typedef {object} ElementPosition
 * @property {jQuery} $actualElement
 * @property {jQuery} $oldParent
 * @property {number} oldIndex
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

    /**
     * @type {Map<jQuery, ElementPosition>}
     * @private
     */
    this.elementsOnTop_ = new Map()
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
   * Gets the given element in front of the shield. The element is removed from its context temporarily
   * @param {jQuery} $element
   */
  add$OnTop ($element) {
    var $actualElement = $element

    let $window = $element.parents().filter('.g4u-window')
    if ($window.length > 0) {
      $actualElement = $window
    }

    let $oldParent = $element.parent()

    this.elementsOnTop_.set($element, {
      $actualElement,
      $oldParent,
      oldIndex: $oldParent.children().index($element)
    })

    this.$element_.append($actualElement)
  }

  /**
   * Returns the given element in front of the shield to the previous context
   * @param {jQuery} $element
   */
  remove$OnTop ($element) {
    let elementPosition = this.elementsOnTop_.get($element)
    this.elementsOnTop_.remove($element)

    if (elementPosition.oldIndex === 0) {
      elementPosition.$oldParent.prepend(elementPosition.$actualElement)
    } else {
      elementPosition.$oldParent.children().eq(elementPosition.oldIndex - 1).after(elementPosition.$actualElement)
    }
  }
}
