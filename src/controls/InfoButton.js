import $ from 'jquery'

import { Attribution } from './Attribution'
import { Control } from './Control'

import '../../less/infobutton.less'
import { URL } from '../URLHelper'
import { ActivatableMixin } from './ActivatableMixin'
import { mixin } from '../utilities'
import { cssClasses } from '../globals'

/**
 * @typedef {g4uControlOptions} InfoButtonOptions
 * @property {URLLike} contentURL url providing content to be shown
 * @property {boolean} [attribution=true]
 * @property {boolean} [active=false]
 */

/**
 * This control opens a window with showing some specified info text
 */
export class InfoButton extends mixin(Control, ActivatableMixin) {
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

    if (!this.getTitle()) {
      this.setTitle(this.getLocaliser().localiseUsingDictionary('InfoPage title'))
    }
    if (!this.getTipLabel()) {
      this.setTipLabel(this.getLocaliser().localiseUsingDictionary('InfoPage tipLabel'))
    }

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
      if (this.contentURL_) {
        this.contentURL_.extractParamsFromMap(map)
      }

      if (this.attribution_) {
        map.addControl(this.attributionControl_)
      }

      this.activateOnMapChange()
    }
  }

  /**
   * @param {boolean} active
   */
  setActive (active) {
    if (active) {
      if (this.getMap().get('localiser').isRtl()) {
        this.get$Element().prop('dir', 'rtl')
      } else {
        this.get$Element().prop('dir', undefined)
      }
      if (!this.loaded_ && this.contentURL_) {
        $.get(this.contentURL_.finalize(), (data) => {
          this.$content_.html(data)
          super.setActive(active)
          this.loaded_ = true
        })
      } else {
        super.setActive(active)
      }
    } else {
      super.setActive(active)
    }
    this.get$Element().toggleClass(cssClasses.active, active)
  }
}
