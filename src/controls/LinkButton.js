import $ from 'jquery'

import { Control } from './Control'
import { addTooltip } from '../html/html'
import { cssClasses } from '../globals'

import '../../less/linkbutton.less'

/**
 * @typedef {g4uControlOptions} LinkButtonOptions
 * @property {string} [url]
 * @property {string} [linkTarget] set the link target (e.g. '_blank')
 */

/**
 * provides a button which links to another page
 */
export class LinkButton extends Control {
  /**
   * @param {LinkButtonOptions} options
   */
  constructor (options = {}) {
    options.className = options.className || 'g4u-link-button'
    options.singleButton = true
    options.element = $('<a></a>').get(0)

    super(options)

    /**
     * @type {string}
     * @private
     */
    this.url_ = (options.hasOwnProperty('url')) ? options.url : ''

    this.setTitle(this.getTitle() || this.getLocaliser().localiseUsingDictionary('LinkButton title'))
    this.setTipLabel(this.getTipLabel() || this.getLocaliser().localiseUsingDictionary('LinkButton tipLabel'))

    this.get$Element().attr('href', this.url_).addClass(this.className_)
    if (options.hasOwnProperty('target')) {
      this.get$Element().attr('target', options.target)
    }
    let $button = $('<button>')
      .addClass(cssClasses.mainButton)
      .html(this.getTitle())

    addTooltip($button, this.getTipLabel())

    this.get$Element().append($button)

    if (options.hasOwnProperty('linkTarget')) {
      this.get$Element().attr('target', options.linkTarget)
    }
  }
}
