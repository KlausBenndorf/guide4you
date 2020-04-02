import $ from 'jquery'

import { Control } from './Control'
import { cssClasses } from '../globals'

import '../../less/toolbox.less'
import '../../less/layermenu.less'

/**
 * @typedef {g4uControlOptions} ComposedControlOptions
 * @property {string} [containerClassName]
 * @property {boolean} [squeeze=false]
 * @property {number} [minHeight=50]
 */

/**
 * This is a class ComposedControl which provides some functionality for controls which are composed out of several
 * other controls. It makes use of the composite pattern.
 */

export class ComposedControl extends Control {
  /**
   * @param {ComposedControlOptions} [options={}]
   */
  constructor (options = {}) {
    const $container = $('<div>')

    if (options.hasOwnProperty('element')) {
      $(options.element).append($container)
    } else {
      options.element = $container.get(0)
    }

    options.singleButton = false

    super(options)

    /**
     * @type {Control[]}
     * @private
     */
    this.controls_ = []

    /**
     * @type {jQuery}
     * @private
     */
    this.$container_ = $container

    if (options.hasOwnProperty('containerClassName')) {
      this.$container_.addClass(options.containerClassName)
    }

    /**
     * @type {string}
     * @private
     */
    this.classNameItem_ = this.getClassName() + '-item'
    /**
     * @type {string}
     * @private
     */
    this.classNameItemFirst_ = this.classNameItem_ + '-first'
    /**
     * @type {string}
     * @private
     */
    this.classNameItemLast_ = this.classNameItem_ + '-last'

    this.squeeze_ = options.squeeze === true
    this.minHeight_ = options.minHeight === undefined ? 50 : options.minHeight
  }

  /**
   * @returns {Control[]}
   */
  getControls () {
    return this.controls_
  }

  /**
   * @returns {jQuery}
   */
  get$Container () {
    return this.$container_
  }

  /**
   * This method adds some helping css classes to the items
   * @param {jQuery} $item
   * @returns {jQuery}
   * @private
   */
  addClasses_ ($item) {
    $item.addClass(this.classNameItemLast_)

    if (this.$container_.children().length === 0) {
      $item.addClass(this.classNameItemFirst_)
    } else {
      this.$container_.children(':last-child').removeClass(this.classNameItemLast_)
    }

    return $item
  }

  /**
   *
   * @param {Control} control
   * @param {Object} options
   * @param {Boolean} [options.claim=true] if claim is set to false the control won't add anything to the container
   * @param {Boolean} [options.wrap=true] if wrap is set to true a span will be put arround the element
   *    if set to false the element of the control will be inserted directly
   * @param {Boolean} [options.cssPosition=true] if this is set to true the wrap or the element will get css classes
   *    indicating its position inside the container
   * @param {HTMLElement} [options.element] if this is set it will be put inside the container instead calling
   *    control.set$Target()
   */
  addControl (control, options = {}) {
    const map = this.getMap()
    if (map) {
      map.addControl(control)
    } else {
      throw new Error('composed controls needs to be added to the map before they can get any controls')
    }

    if (!(options.hasOwnProperty('claim')) || !options.claim) {
      if (!(options.hasOwnProperty('wrap')) || options.wrap) {
        const $wrap = $('<div>')

        if (options.hasOwnProperty('element')) {
          $wrap.append($(options.element))
        } else {
          control.set$Target($wrap)
        }

        $wrap.addClass(this.classNameItem_)

        if (!(options.hasOwnProperty('cssPosition')) || options.cssPosition) {
          this.addClasses_($wrap)
        }

        if (!control.getVisible()) {
          $wrap.addClass(cssClasses.hidden)
        }

        control.on('change:visible', () => {
          $wrap.toggleClass(cssClasses.hidden, !control.getVisible())
        })

        this.$container_.append($wrap)
      } else {
        $(options.element).addClass(this.classNameItem_)

        if (!(options.hasOwnProperty('cssPosition')) || options.cssPosition) {
          this.addClasses_($(options.element))
        }

        if (options.hasOwnProperty('element')) {
          this.$container_.append($(options.element))
        } else {
          control.set$Target(this.$container_)
        }
      }
    }

    control.on('change:visible', () => this.updateVisibility())
    control.on('change', e => this.dispatchEvent(e))
    control.on('change:size', e => this.dispatchEvent(e))

    this.controls_.push(control)

    this.changed()
    this.updateVisibility()
  }

  /**
   * @param {Control} control
   * @param {boolean} [propagate=true] propagate to map
   */
  removeControl (control, propagate = true) {
    const index = this.controls_.indexOf(control)
    if (index > -1) {
      control.get$Element()
        .add(control.get$Element().parent())
        .add(control.get$Target())
        .filter('.' + this.classNameItem_)
        .remove()

      this.controls_.splice(index, 1)
      if (propagate) {
        this.getMap().removeControl(control)
      }

      this.changed()
    }
  }

  /**
   * @param {G4UMap} map
   */
  setMap (map) {
    if (this.getMap()) {
      this.controls_.forEach(control => {
        this.getMap().removeControl(control)
      })

      this.controls_ = []
    }

    super.setMap(map)

    if (map) {
      map.getControls().on('remove', e => {
        this.removeControl(e.element, false)
      })
    }
  }

  updateVisibility () {
    this.setVisible(this.controls_.some(c => c.getVisible()))
  }

  /**
   * Returns true if the control is squeezable in the given dimension. Used by Positioning.
   * @param {string} dimension
   * @returns {boolean}
   */
  isSqueezable (dimension) {
    return this.squeeze_ && dimension === 'height'
  }

  /**
   * Squeezes the control in the given dimension by the provided value. Used by Positioning
   * Returns the value the control could get squeezed by.
   * @param {string} dimension
   * @param {number} value
   * @returns {number}
   */
  squeezeBy (dimension, value) {
    if (this.squeeze_ && dimension === 'height') {
      const height = this.$container_.height()
      const newHeight = Math.max(this.minHeight_, height - value)
      if (height > newHeight) {
        this.$container_.css('max-height', newHeight)
        return height - newHeight
      }
    }

    return 0
  }

  beforePositioning () {
    this.scrolled_ = this.$container_.scrollTop()
  }

  /**
   * used by positioning
   */
  afterPositioning () {
    this.$container_.scrollTop(this.scrolled_)
  }

  /**
   * Removes the squeeze. Used by Positioning.
   * @param {string} dimension
   */
  release (dimension) {
    if (dimension === 'height') {
      this.$container_.css('max-height', '')
    }
  }
}
