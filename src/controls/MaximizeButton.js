import $ from 'jquery'

import { Control } from 'guide4you/src/controls/Control'
import { cssClasses } from 'guide4you/src/globals'
import { URL } from 'guide4you/src/URLHelper'

import '../../less/maximizebutton.less'

/**
 * @typedef {g4uControlOptions} MaximizeButtonOptions
 * @property {URLLike} [baseURL]
 * @property {object.<string, string>} [URLParameters]
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
    options.element = $('<div>').get(0)

    super(options)

    this.setTipLabel(this.getTipLabel() || this.getLocaliser().localiseUsingDictionary('MaximizeButton tipLabel'))

    $('<button>')
      .addClass(cssClasses.mainButton)
      .on('click', () => {
        this.handleClick_()
      })
      .appendTo(this.get$Element())

    this.parameters_ = options.URLParameters
    this.baseURL_ = URL.extractFromConfig(options, 'baseURL')
  }

  setMap (map) {
    if (map && this.baseURL_) {
      this.baseURL_.extractParamsFromMap(map)
    }
    super.setMap(map)
  }

  handleClick_ () {
    const parameters = Object.assign({
      clsBtn: true
    }, this.parameters_)
    const baseURL = (this.baseURL_ !== null) ? this.baseURL_.finalize() : undefined
    const url = this.getMap().get('urlApi').makeURL({
      baseURL,
      parameters
    })
    window.open(url)
  }
}
