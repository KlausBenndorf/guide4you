import $ from 'jquery'

import { Attribution } from './Attribution'
import {Control} from './Control'

import '../../less/infobutton.less'
import { URL } from '../URLHelper'

/**
 * @typedef {g4uControlOptions} InfoButtonOptions
 * @property {URLLike} contentURL url providing content to be shown
 * @property {boolean} [attribution=true]
 * @property {boolean} [active=false]
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
    this.$content_ = $('<div>').addClass(this.classNameContent_)

    this.get$Element()
      .append(this.$content_)

    /**
     * @type {boolean}
     * @private
     */
    this.attribution_ = options.attribution !== false

    /**
     * @type {URL}
     * @private
     */
    this.contentURL_ = URL.extractFromConfig(options, 'contentURL')

    if (this.attribution_) {
      /**
       * @type {jQuery}
       * @private
       */
      this.$attributions_ = $('<div>')

      this.get$Element()
        .append($('<h2>').html(this.getLocaliser().localiseUsingDictionary('InfoPage copyrightTitle')))
        .append(this.$attributions_)

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
    this.active_ = options.active === true
  }

  /**
   * @param {G4UMap} map
   */
  setMap (map) {
    let oldMap = this.getMap()

    if (oldMap && this.attribution_) {
      oldMap.removeControl(this.attributionControl_)
    }

    super.setMap(map)

    if (map) {
      if (this.attribution_) {
        map.addControl(this.attributionControl_)
      }

      if (this.active_) {
        this.active_ = false // to trigger code in setActive
        this.setActive(true)
      }
    }
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
      if (active) {
        if (this.getMap().get('localiser').isRtl()) {
          this.get$Element().prop('dir', 'rtl')
        } else {
          this.get$Element().prop('dir', undefined)
        }
      }
      if (!this.loaded_) {
        if (this.contentURL_) {
          $.get(this.contentURL_.finalize(), (data) => {
            this.$content_.html(data)
            this.dispatchEvent(changeEvent)
            this.loaded_ = true
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
