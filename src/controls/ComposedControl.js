import $ from 'jquery'

import Window from '../html/Window'
import Control from './Control'
import {cssClasses} from '../globals'

import '../../less/toolbox.less'
import '../../less/layermenu.less'

/**
 * @typedef {g4uControlOptions} ComposedControlOptions
 * @property {string} [containerClassName]
 */

/**
 * This is a class ComposedControl which provides some functionality for controls which are composed out of several
 * other controls. It makes use of the composite pattern.
 */

export default class ComposedControl extends Control {
  /**
   * @param {ComposedControlOptions} [options={}]
   */
  constructor (options = {}) {
    let $container = $('<div>')

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
   * @param {Control} control
   * @private
   */
  setWindowForControl_ (control) {
    let aWindow = new Window({$context: $(this.getMap().getViewport())})
    control.setWindow(aWindow, true)
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
    let map = this.getMap()
    if (map) {
      map.addControl(control)
    } else {
      throw new Error('composed controls needs to be added to the map before they can get any controls')
    }

    if (control.setWindow) {
      this.setWindowForControl_(control)
    }

    if (!(options.hasOwnProperty('claim')) || !options.claim) {
      if (!(options.hasOwnProperty('wrap')) || options.wrap) {
        let $wrap = $('<div>')

        if (options.hasOwnProperty('element')) {
          $wrap.append($(options.element))
        } else {
          control.set$Target($wrap)
        }

        $wrap.addClass(this.classNameItem_)

        if (!(options.hasOwnProperty('cssPosition')) || options.cssPosition) {
          this.addClasses_($wrap)
        }

        if (control.getVisible && !control.getVisible()) {
          $wrap.addClass(cssClasses.hidden)
        }

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

    this.controls_.push(control)
  }

  /**
   * @param {Control} control
   */
  removeControl (control) {
    if (control.get$Element().hasClass(this.classNameItem_)) {
      control.get$Element().remove()
    } else if (control.get$Element().parent().hasClass(this.classNameItem_)) {
      control.get$Element().parent().remove()
    }

    this.controls_.splice(this.controls_.indexOf(control), 1)
    this.getMap().removeControl(control)
  }

  /**
   * @param {G4UMap} map
   */
  setMap (map) {
    if (!map) {
      this.controls_.forEach(control => {
        this.getMap().removeControl(control)
      })

      this.controls_ = []
    }

    super.setMap(map)
  }
}
