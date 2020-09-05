import $ from 'jquery'
import BScroll from 'better-scroll'
import BaseObject from 'ol/Object'

import { offset } from '../utilities'
import { getInFront } from './html'
import { cssClasses } from '../globals'

import '../../less/window.less'

/**
 * @typedef {object} WindowOptions
 * @property {string} parentClassName an additional html class name to use
 * @property {boolean} [draggable=false]
 * @property {string} [id] an html id for the outer window element
 * @property {string} [className] an alternative html class name to use instead of 'g4u-window', not recommended
 * @property {G4UMap} [map] the map the window should be shown on. The viewport will be set as the context of the window
 * @property {boolean} [visible=false] the visibility of the window on start up
 * @property {boolean} [fixedPosition=false] if the window is movable or not
 */

/**
 * A HTML Window
 */
export class Window extends BaseObject {
  /**
   * @param {WindowOptions} options
   */
  constructor (options) {
    super()

    /**
     * @type {G4UMap}
     * @private
     */
    this.map_ = options.map

    /**
     * @type {string}
     * @private
     */
    this.className_ = (options.hasOwnProperty('className')) ? options.className : 'g4u-window'

    /**
     * @type {string}
     * @private
     */
    this.classNameBody_ = this.className_ + '-content'

    /**
     * @type {string}
     * @private
     */
    this.classNameButtonClose_ = this.className_ + '-button-close'

    /**
     * @type {jQuery}
     * @private
     */
    this.$element_ = $('<div>').addClass(this.className_).addClass(options.parentClassName + '-window')
      .on('click', e => e.stopPropagation())

    /**
     * @type {jQuery}
     * @private
     */
    this.$positionWrapper_ = $('<div>').addClass(this.className_ + '-inner-position')

    /**
     * @type {jQuery}
     * @private
     */
    this.$scrollWrapper_ = $('<div>').addClass(this.className_ + '-scroll-wrap')

    /**
     * @type {jQuery}
     * @private
     */
    this.$body_ = $('<div>').addClass(this.classNameBody_)

    /**
     * @type {jQuery}
     * @private
     */
    this.$button_ = $('<button>').addClass(this.classNameButtonClose_)

    this.$element_
      .append(this.$button_)
      .append(this.$positionWrapper_
        .append(this.$scrollWrapper_.append(this.$body_)
        )
      )
      .addClass(cssClasses.hidden)
      .appendTo($(this.map_.getViewport()).children('.ol-overlaycontainer-stopevent'))

    if (options.hasOwnProperty('id')) {
      this.$element_.attr('id', options.id)
    }

    this.$button_.on('click', () => this.setVisible(false))

    /**
     * @type {boolean}
     * @private
     */
    this.draggable_ = options.hasOwnProperty('draggable') ? options.draggable : true

    /**
     * @type {boolean}
     * @private
     */
    this.fixedPosition_ = options.fixedPosition === true

    /**
     * @type {jQuery}
     * @private
     */
    this.$context_ = $(this.map_.getTarget())
    const initialDraggable = this.draggable_

    this.map_.asSoonAs('ready', true, () => {
      this.map_.on('resize', () => this.updateSize(true))

      const onChangeMobile = () => {
        if (this.map_.get('mobile')) {
          this.draggable_ = false
          if (this.getVisible()) {
            this.setEnableMobileScrolling_(true)
          }
        } else {
          this.draggable_ = initialDraggable
          if (this.scroll_ && this.scroll_.enabled) {
            this.setEnableMobileScrolling_(false)
          }
        }
        this.updateSize()
      }

      onChangeMobile()
      this.map_.on('change:mobile', onChangeMobile)
    })

    this.makeWindowDraggable_()

    // get window in front if clicked

    this.$element_.on('mousedown', () => {
      this.getInFront()
    })

    /**
     * @type {boolean}
     * @private
     */
    this.visible_ = false
    this.setVisible(options.hasOwnProperty('visible') ? options.visible : false)

    /**
     * @type {boolean}
     * @private
     */
    this.shieldActivated_ = false
  }

  /**
   * Reset the dragged state
   * @private
   */
  resetDragged () {
    this.$element_.css('position', '')
  }

  /**
   * Makes the Window draggable
   * @private
   */
  makeWindowDraggable_ () {
    let clickPosX = 0
    let clickPosY = 0

    let preventClick = false
    let moving = false

    this.$context_.on('mousemove', e => {
      if (moving) {
        if (e.clientY - clickPosY !== this.$element_.offset().top ||
          e.clientX - clickPosX !== this.$element_.offset().left) {
          preventClick = true
          this.$element_.css('position', 'absolute')
          this.$element_.offset({ top: e.clientY - clickPosY, left: e.clientX - clickPosX })
          e.stopPropagation()
        }
      }
    })

    this.$button_.on('mousedown', e => {
      if (!$(e.target).is('input, textarea') && this.draggable_) {
        clickPosX = e.clientX - this.$element_.offset().left
        clickPosY = e.clientY - this.$element_.offset().top
        moving = true
      }
    })

    this.$element_.get(0).addEventListener('click', e => {
      if (preventClick && this.draggable_) {
        preventClick = false
        e.preventDefault()
        e.stopPropagation()
      }
    }, true)

    this.$context_.on('mouseup', () => {
      moving = false
    })
  }

  /**
   * Enables/Disables the scroll lib needed for mobile scrolling
   * @param {boolean} scrollable
   * @private
   */
  setEnableMobileScrolling_ (scrollable) {
    if (scrollable) {
      if (!this.scroll_) {
        this.scroll_ = new BScroll(this.$scrollWrapper_.get(0), {
          scrollbar: true,
          bounce: false
          // mouseWheel: true,
          //
          // momentum: false,
          // interactiveScrollbars: true,
          // // bounce: true,
          // click: true,
          // keyBindings: true,
          // disablePointer: true,
          // disableTouch: false,
          // disableMouse: true,
          // eventPassthrough: false
        })

        window.addEventListener('wheel', e => {
          if (this.getVisible() && this.scroll_.enabled) {
            this.scroll_.scrollTo(0, Math.max(this.scroll_.maxScrollY, Math.min(0, this.scroll_.y - e.deltaY)), 100)
          }
        })
      } else {
        this.scroll_.enable()
      }
    } else {
      if (this.scroll_) {
        this.scroll_.scrollTo(0, 0, 0)
        this.scroll_.disable()
      }
    }
  }

  /**
   * Moves the window in front of all other elements inside its context
   */
  getInFront () {
    getInFront(this.$element_, this.$context_)
  }

  /**
   * @param {boolean} visible
   * @param {boolean} [popHistory=true]
   */
  setVisible (visible, popHistory = true) {
    const oldValue = this.visible_
    if (oldValue !== visible) {
      if (visible) {
        this.$element_.removeClass(cssClasses.hidden)
        if (this.map_.get('mobile')) {
          this.setEnableMobileScrolling_(true)
          this.map_.get('shield').setActive(true)
          this.map_.get('shield').add$OnTop(this.$element_, {
            findParentWindow: false
          })
          this.shieldActivated_ = true
          this.map_.get('history')
            .push(() => this.setVisible(false, false))
        } else if (!this.map_.get('shield').getActive()) {
          this.getInFront()
        }
      } else {
        if (this.map_.get('mobile')) {
          this.setEnableMobileScrolling_(false)
        }
        if (this.shieldActivated_) {
          if (popHistory) {
            this.map_.get('history').pop()
          } else {
            this.map_.get('shield').setActive(false)
            this.map_.get('shield').remove$OnTop(this.$element_)
            this.shieldActivated_ = false
          }
        }
        this.$element_.addClass(cssClasses.hidden)
        this.$element_.css('top', '')
        this.$element_.css('left', '')
      }
      this.visible_ = visible
      this.updateSize(true)
      this.dispatchEvent({ type: 'change:visible', oldValue: oldValue, newValue: visible })
    }
  }

  /**
   * @returns {boolean}
   */
  getVisible () {
    return this.visible_
  }

  /**
   * @returns {jQuery}
   */
  get$Body () {
    return this.$body_
  }

  /**
   * @returns {jQuery}
   */
  get$Element () {
    return this.$element_
  }

  /**
   * Fixes width and height depending on the current content on the popup.
   * needs to be called when the window is visible.
   * @param {boolean} [initialize=false]
   */
  updateSize (initialize = false) {
    let margin = 0

    if (this.getVisible()) {
      if (!this.map_.get('mobile')) {
        // desktop
        margin = 50

        const maxWidth = this.$context_.innerWidth() - 2 * margin
        const maxHeight = this.$context_.innerHeight() - 2 * margin

        // storing values
        const position = this.$element_.css('position')
        let top = this.$element_.css('top')
        let left = this.$element_.css('left')

        // // reset position to get default value
        // this.$element_.css('position', '')
        //
        // // resetting all directly setted values
        // this.$element_.css('top', '')
        // this.$element_.css('left', '')
        // this.$element_.css('width', '')
        // this.$element_.css('height', '')

        this.get$Body().css('max-height', '')

        // position element so it can be measured
        this.$element_.css('position', 'fixed')
        this.$element_.css('top', '0px')
        this.$element_.css('left', '0px')

        // clearing fixed size and height

        this.$element_.css('width', 'auto')
        this.$element_.css('height', 'auto')

        // calculate width & height
        // restrain width first because height can be compensated with a scroll bar

        const calcWidth = this.$element_.outerWidth()
        const width = Math.min(calcWidth, maxWidth)
        this.$element_.css('width', width)

        const calcHeight = this.$element_.outerHeight()
        this.$element_.css('height', Math.min(calcHeight, maxHeight))

        // setting max-height for the scroll bar
        // i assume here there is no margin and no padding on the parent element
        const padding = parseInt(this.get$Body().css('padding-top').split('px')[0]) +
          parseInt(this.get$Body().css('padding-bottom').split('px')[0])
        this.get$Body().css('max-height', this.get$Element().innerHeight() - this.$button_.outerHeight() - padding)

        this.$element_.css('position', position)

        if (initialize && !this.fixedPosition_) {
          // getting initial values
          top = this.$element_.css('top')
          left = this.$element_.css('left')

          // initialize_ at top middle
          const off = offset(this.$context_, this.$element_)

          const sideDist = (this.$context_.width() - width) / 2
          const topDist = margin

          const topPixel = (top === 'auto') ? 0 : parseInt(top)
          const leftPixel = (left === 'auto') ? 0 : parseInt(left)

          this.$element_.css('top', topPixel + off.top + topDist)
          this.$element_.css('left', leftPixel + off.left + sideDist)
        } else {
          // move back to old position
          this.$element_.css('top', top)
          this.$element_.css('left', left)
        }
      } else {
        // mobile
        margin = 10

        const maxWidth = this.$context_.innerWidth() - 2 * margin
        const maxHeight = this.$context_.innerHeight() - 2 * margin

        this.get$Body().css('max-height', '')
        this.$element_.css('width', maxWidth)
        this.$element_.css('height', maxHeight)

        const contextOff = this.$context_.offset()

        this.$element_.css('left', margin + contextOff.left)
        this.$element_.css('top', margin + contextOff.top)
      }

      if (this.get$Body().children(`:not(.${cssClasses.hidden})`).length === 0) {
        this.$element_.addClass(cssClasses.hidden)
      }

      if (this.scroll_) {
        this.scroll_.refresh()
      }
    }
  }
}
