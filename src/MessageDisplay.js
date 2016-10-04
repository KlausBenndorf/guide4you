import 'notifyjs-browser'
import $ from 'jquery'
import { html2Text } from './utilities'

/**
 * @typedef {object} MessageReducedDisplayOptions
 * @property {boolean} [autoHide] - whether to auto-hide the notification
 * @property {number} [autoHideDelay] - milliseconds before hide (if autoHide is set)
 * @property {string} [position] - notification position relative to element
 */

/**
 * @typedef {MessageReducedDisplayOptions} MessageDisplayOptions
 * @property {(string|string[])} [className] - default class
 */

/**
 * @typedef {MessageDisplayOptions} MessageConstructorOptions
 * @property {boolean} [arrowShow=true] - whether to show an arrow pointing at the element
 * @property {number} [arrowSize=5] - Arrow size in pixels
 * @property {boolean} [autoHide=true] - whether to auto-hide the notification
 * @property {number} [autoHideDelay=15000] - milliseconds before hide (if autoHide is set)
 * @property {(string|string[])} [className='error'] - default class
 * @property {string} [position=bottom left] - notification position relative to element
 * @property {number} [gap=2] - padding between element and notification
 * @property {string} [hideAnimation=slideUp] - hide animation type
 * @property {number} [hideDuration=200] - hide animation duration in milliseconds
 * @property {string} [showAnimation=slideDown] - show animation type
 * @property {number} [showDuration=400] - show animation duration in miliseconds
 * @property {string} [style=bootstrap] - default style
 */

/**
 * Displays Messages
 */
export class MessageDisplay {
  /**
   * @param {jQuery} $element
   * @param {MessageConstructorOptions} options
   */
  constructor ($element, options = {}) {
    if ($element) {
      /**
       * @type {jQuery}
       * @private
       */
      this.$element_ = $element
    } else {
      throw new Error('MessageDisplay needs an object to be associated to!')
    }

    /**
     * @type {MessageOptions}
     * @private
     */
    this.defaults_ = options

    /**
     * @type {?number}
     * @private
     */
    this.autoHideTimer_ = null

    if (!options.hasOwnProperty('arrowShow')) { this.defaults_.arrowShow = true }
    if (!options.hasOwnProperty('arrowSize')) { this.defaults_.arrowSize = 5 }
    if (!options.hasOwnProperty('autoHide')) { this.defaults_.autoHide = true }
    if (!options.hasOwnProperty('autoHideDelay')) { this.defaults_.autoHideDelay = 15000 }
    if (!options.hasOwnProperty('className')) { this.defaults_.className = 'error' }
    if (!options.hasOwnProperty('position')) { this.defaults_.position = 'bottom left' }
    if (!options.hasOwnProperty('gap')) { this.defaults_.gap = 2 }
    if (!options.hasOwnProperty('hideAnimation')) { this.defaults_.hideAnimation = 'slideUp' }
    if (!options.hasOwnProperty('hideDuration')) { this.defaults_.hideDuration = 200 }
    if (!options.hasOwnProperty('showAnimation')) { this.defaults_.showAnimation = 'slideDown' }
    if (!options.hasOwnProperty('showDuration')) { this.defaults_.showDuration = 400 }
    if (!options.hasOwnProperty('style')) { this.defaults_.style = 'bootstrap' }
  }

  /**
   * Displays a generic message
   * @param {string} message
   * @param {MessageDisplayOptions} options
   */
  message (message, options = {}) {
    let msgOptions = this.defaults_
    if (options.hasOwnProperty('autoHide')) { msgOptions.autoHide = options.autoHide }
    if (options.hasOwnProperty('autoHideDelay')) { msgOptions.autoHideDelay = options.autoHideDelay }
    if (options.hasOwnProperty('className')) { msgOptions.className = options.className }
    if (options.hasOwnProperty('position')) { msgOptions.position = options.position }

    this.$element_.notify(html2Text(message), msgOptions)

    // HOTFIX for notifyjs issue
    $('.notifyjs-wrapper').click(() => {
      this.hide()
    })
  }

  /**
   * Displays an error message
   * @param {string} message
   * @param {MessageReducedDisplayOptions} options
   */
  error (message, options = {}) {
    options.className = 'error'
    this.message(message, options)
  }

  /**
   * Displays an info message
   * @param {string} message
   * @param {MessageReducedDisplayOptions} options
   */
  info (message, options = {}) {
    options.className = 'info'
    this.message(message, options)
  }

  /**
   * Displays a success message
   * @param {string} message
   * @param {MessageReducedDisplayOptions} options
   */
  success (message, options = {}) {
    options.className = 'success'
    this.message(message, options)
  }

  /**
   * Displays a warning message
   * @param {string} message
   * @param {MessageReducedDisplayOptions} options
   */
  warn (message, options = {}) {
    options.className = 'warn'
    this.message(message, options)
  }

  /**
   * Hides all messages
   */
  hide () {
    $('.notifyjs-wrapper').trigger('notify-hide')
    window.clearTimeout(this.autoHideTimer_)
  }
}
