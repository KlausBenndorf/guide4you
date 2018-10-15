import $ from 'jquery'

import { ComposedControl } from './ComposedControl'
import { cssClasses } from '../globals'

/**
 * @typedef {ComposedControlOptions} ShiftableComposedControlOptions
 * @property {number} visibleControls specifies amount visible controls
 */

/**
 * This class displays only a given amount of the containing controls and arrows to switch through these
 */
export class ShiftableComposedControl extends ComposedControl {
  /**
   * @param {ShiftableComposedControlOptions} options
   */
  constructor (options = {}) {
    super(options)

    /**
     * @type {number}
     * @private
     */
    this.visibleControls_ = options.visibleControls

    /**
     * @type {number}
     * @private
     */
    this.position_ = 1

    let $shiftContainer = $('<div>')
      .addClass(this.className_ + '-shift')
    this.get$Element()
      .append($shiftContainer.append(this.get$Container()))

    /**
     * @type {jQuery}
     * @private
     */
    this.$moveLeftButton_ = $('<button>')
      .addClass(this.className_ + '-move-left')
      .addClass(this.classNameItem_)
      .addClass(this.classNameItemFirst_)
      .addClass(cssClasses.hidden)
    this.$moveLeftButton_.on('click', () => this.shiftControls(-(this.visibleControls_ - 2)))

    $shiftContainer.prepend(this.$moveLeftButton_)
    this.$moveLeftButton_.addClass(cssClasses.hidden)

    /**
     * @type {jQuery}
     * @private
     */
    this.$moveRightButton_ = $('<button>')
      .addClass(`${this.className_}-move-right`)
      .addClass(this.classNameItem_)
      .addClass(this.classNameItemLast_)
    this.$moveRightButton_.on('click', () => this.shiftControls(this.visibleControls_ - 2))

    $shiftContainer.append(this.$moveRightButton_)
    this.$moveRightButton_.addClass(cssClasses.hidden)
  }

  /**
   * @param {Control} control
   * @param {g4uControlOptions} options
   */
  addControl (control, options) {
    super.addControl(control, options)

    if (this.controls_.length > this.visibleControls_) {
      let $lastInsertedControl = this.get$Container().children(':last-child')
      $lastInsertedControl.addClass(cssClasses.hidden)
      $(this.get$Container().children()[this.visibleControls_ - 1]).addClass(cssClasses.hidden)
      this.$moveRightButton_.removeClass(cssClasses.hidden)
    }
  }

  /**
   * Shift the controls the given amount of steps to the left. if the value is negative, the controls are shifted to
   * the right
   * @param shift
   */
  shiftControls (shift) {
    if (shift < 0) {
      if (this.position_ > 1) {
        // shift 'left'

        // show move right button
        if (this.$moveRightButton_.hasClass(cssClasses.hidden)) {
          this.get$Container().children(':last-child').addClass(cssClasses.hidden)
          this.$moveRightButton_.removeClass(cssClasses.hidden)
        }

        // shift visible controls
        this.position_--
        $(this.get$Container().children()[this.position_]).removeClass(cssClasses.hidden)
        $(this.get$Container().children()[this.position_ + this.visibleControls_ - 2]).addClass(cssClasses.hidden)

        // show first button instead of move left
        if (this.position_ === 1) {
          this.get$Container().children(':first-child').removeClass(cssClasses.hidden)
          this.$moveLeftButton_.addClass(cssClasses.hidden)
        }

        // recurse
        this.shiftControls(shift + 1)
      }
    } else if (shift > 0) {
      if (this.position_ + this.visibleControls_ < this.controls_.length + 1) {
        // shift 'right'

        // show move left button
        if (this.$moveLeftButton_.hasClass(cssClasses.hidden)) {
          this.get$Container().children(':first-child').addClass(cssClasses.hidden)
          this.$moveLeftButton_.removeClass(cssClasses.hidden)
        }

        // shift visible controls
        this.position_++
        $(this.get$Container().children()[this.position_ - 1]).addClass(cssClasses.hidden)
        $(this.get$Container().children()[this.position_ + this.visibleControls_ - 3]).removeClass(cssClasses.hidden)

        // show last button instead of move right
        if (this.position_ + this.visibleControls_ >= this.controls_.length) {
          this.get$Container().children(':last-child').removeClass(cssClasses.hidden)
          this.$moveRightButton_.addClass(cssClasses.hidden)
        }

        // recurse
        this.shiftControls(shift - 1)
      }
    }
  }
}
