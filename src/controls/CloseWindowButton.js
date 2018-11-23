import $ from 'jquery'

import { Control } from 'guide4you/src/controls/Control'

import '../../less/closewindowbutton.less'

/**
 * @typedef {g4uControlOptions} CloseWindowButtonOptions
 * @property {string} [label]
 */

/**
 * Close the window. This only works if the window was opened by javascript.
 */
export class CloseWindowButton extends Control {
  /**
   * @param {g4uControlOptions} options
   */
  constructor (options = {}) {
    options.className = options.className || 'g4u-close-window-button'
    options.element = $('<div>')[0]

    super(options)

    /**
     * @type {string}
     * @private
     */
    this.label_ = ('label' in options)
      ? this.getLocaliser().selectL10N(options.label)
      : this.getLocaliser().localiseUsingDictionary('CloseWindowButton label')

    let $button = $('<button>')
      .html(this.label_)
      .on('click', () => {
        window.close()
      })

    this.get$Element().append($button)
  }
}
