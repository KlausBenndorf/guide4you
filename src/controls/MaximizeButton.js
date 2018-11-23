import $ from 'jquery'

import { Control } from 'guide4you/src/controls/Control'
import { cssClasses } from 'guide4you/src/globals'

import '../../less/maximizebutton.less'

/**
 * @typedef {g4uControlOptions} MaximizeButtonOptions
 * @property {string} [pageTitle]
 */

/**
 * Opens the client in a new maximized window
 */
export class MaximizeButton extends Control {
  /**
   * @param {MaximizeButtonOptions} options
   */
  constructor (options = {}) {
    options.className = options.className || 'g4u-maximize-button'
    options.element = $('<button>').get(0)
    options.singleButton = true

    super(options)

    this.setTipLabel(this.getTipLabel() || this.getLocaliser().localiseUsingDictionary('MaximizeButton tipLabel'))

    this.get$Element()
      .addClass(cssClasses.mainButton)
      .on('click', () => {
        this.handleClick_()
      })

    this.newPageTitle_ = options.pageTitle
  }

  handleClick_ () {
    const url = this.getMap().get('urlApi').makeURL({
      additionalParameters: {
        clsBtn: true
      }
    })
    window.open(url, this.newPageTitle_)
  }
}
