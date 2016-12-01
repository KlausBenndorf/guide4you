import $ from 'jquery'

import {Control} from './Control'

import '../../less/printlogo.less'

/**
 * @typedef {g4uControlOptions} PrintLogoOptions
 * @property {string} [src='images/g4u-logo.png'] path to the image
 * @property {number} [width]
 * @property {number} [height]
 * @property {number} [opacity]
 */

/**
 * This is a class which provides a printLogo on the map.
 */
export class PrintLogo extends Control {
  /**
   * @param {PrintLogoOptions} options
   */
  constructor (options = {}) {
    options.className = options.className || 'g4u-print-logo'
    options.element = $('<img>').get(0)
    options.singleButton = false

    super(options)

    /**
     * @type {string}
     * @private
     */
    this.logo_ = options.hasOwnProperty('src')
      ? options.src
      : 'images/g4u-logo.png'

    this.get$Element()
      .prop('src', this.logo_)
      .addClass(this.className_)

    if (options.width) {
      this.get$Element().width(options.width)
    }

    if (options.height) {
      this.get$Element().height(options.height)
    }

    if (options.opacity) {
      this.get$Element().css('opacity', options.opacity.toString())
    }
  }
}
