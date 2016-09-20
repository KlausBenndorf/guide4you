import $ from 'jquery'

import { addProxy } from '../utilities'
import { Attribution } from './ControlRewire'
import {Control} from './Control'

import '../../less/infobutton.less'

/**
 * @typedef {g4uControlOptions} InfoButtonOptions
 * @property {string} contentURL url providing content to be shown
 * @property {boolean} [useProxy]
 * @property {string} [proxy]
 */

/**
 * This control opens a window with showing some specified info text
 */
export class InfoButton extends Control {
  /**
   * @param {InfoButtonOptions} options
   */
  constructor (options = {}) {
    options.className = options.className || 'g4u-infobutton'
    options.element = $('<div>')[0]

    super(options)

    /**
     * @type {string}
     * @private
     */
    this.classNameAttributions_ = this.className_ + '-attributions'

    /**
     * @type {string}
     * @private
     */
    this.classNameContent_ = this.className_ + '-content'

    this.setTitle(this.getLocaliser().localiseUsingDictionary('InfoPage title'))
    this.setTipLabel(this.getLocaliser().localiseUsingDictionary('InfoPage tipLabel'))

    /**
     * @type {jQuery}
     * @private
     */
    this.$attributions_ = $('<div>')

    /**
     * @type {jQuery}
     * @private
     */
    this.$content_ = $('<div>').addClass(this.classNameContent_)

    this.get$Element()
      .append(this.$content_)
      .append($('<h2>').html(this.getLocaliser().localiseUsingDictionary('InfoPage copyrightTitle')))
      .append(this.$attributions_)

    /**
     * @type {string}
     * @private
     */
    this.contentURL_ = options.contentURL

    /**
     * @type {boolean}
     * @private
     */
    this.useProxy_ = this.useProxy_ = (options.useProxy || (!options.hasOwnProperty('useProxy') && options.proxy))

    /**
     * @type {string|undefined}
     * @private
     */
    this.proxy_ = options.proxy

    if (options.attributions || !options.hasOwnProperty('attributions')) {
      /**
       * @type {Attribution}
       * @private
       */
      this.attributionControl_ = new Attribution({
        target: this.get$Element()[0],
        localiser: this.getLocaliser(),
        collapsible: false,
        className: this.classNameAttributions_
      })
    }

    /**
     * @type {boolean}
     * @private
     */
    this.loaded_ = false

    /**
     * @type {boolean}
     * @private
     */
    this.active_ = false
  }

  /**
   * @param {G4UMap} map
   */
  setMap (map) {
    let oldMap = this.getMap()

    if (oldMap) {
      oldMap.removeControl(this.attributionControl_)
    }

    if (map) {
      map.addControl(this.attributionControl_)
    }

    super.setMap(map)
  }

  /**
   * @param {boolean} active
   */
  setActive (active) {
    let oldValue = this.active_
    if (oldValue !== active) {
      this.active_ = active
      let changeEvent = {
        type: 'change:active',
        oldValue: oldValue
      }
      if (!this.loaded_) {
        if (this.contentURL_) {
          let url = this.getLocaliser().selectL10N(this.contentURL_)
          if (this.useProxy_) {
            url = addProxy(url, this.proxy_ || this.getMap().get('proxy'))
          }
          $.get(url, (data) => {
            this.$content_.html(data)
            this.dispatchEvent(changeEvent)
          })
        } else {
          this.dispatchEvent(changeEvent)
        }
      } else {
        this.dispatchEvent(changeEvent)
      }
    }
  }

  /**
   * @returns {boolean}
   */
  getActive () {
    return this.active_
  }
}
