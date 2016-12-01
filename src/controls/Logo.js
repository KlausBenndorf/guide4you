import $ from 'jquery'

import {Control} from './Control'

import '../../less/logo.less'

/**
 * @typedef {g4uControlOptions} LogoOptions
 * @property {string} [src='images/g4u-logo.png'] path to the image
 * @property {number} [width]
 * @property {number} [height]
 * @property {number} [opacity]
 * @property {string} [mode='both'] possible values: print, screen, both
 */

/**
 * This is a class which provides a logo on the map.
 */
export class Logo extends Control {
  /**
   * @param {LogoOptions} options
   */
  constructor (options = {}) {
    options.className = options.className || 'g4u-logo'
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
      .on('load', () => this.changed)
      .prop('src', this.logo_)
      .addClass(this.className_)

    if (options.mode === 'both' || options.mode === 'screen') {
      this.get$Element()
        .addClass(this.className_ + '-screen')
    }

    if (options.mode === 'both' || options.mode === 'print') {
      this.get$Element()
        .addClass(this.className_ + '-print')
    }

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
