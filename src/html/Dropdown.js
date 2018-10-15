import ol from 'ol'
import $ from 'jquery'
import { cssClasses, keyCodes } from '../globals'

import 'polyfill!Array.prototype.findIndex,Array.prototype.find'

import '../../less/dropdown.less'
import { ListenerOrganizerMixin } from '../ListenerOrganizerMixin'
import { mixin } from '../utilities'

/**
 * @typedef {object} DropdownOptions
 * @property {string} [className='g4u-dropdown']
 * @property {string} [ghostentry='no entries'] This text is shown if the dropdown has no entries
 * @property {number} [slideDuration=400] standard slideDuration
 */

/**
 * @typedef {Object} Entry
 * @property {jQuery} $element
 * @property {*} value
 */

$.extend($.easing, {
  easeOutCirc: function (x, t, b, c, d) {
    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b
  },
  easeInCirc: function (x, t, b, c, d) {
    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b
  }
})

/**
 * A HTML Dropdown select.
 * The text entries in the list can be setted and changed and given a click handler.
 * @fires 'leave:backwards' This event is raised if the dropdown is left via the up arrow or shift+tab
 * @fires 'leave:forwards' This event is raised if the dropdown is left via the down arrow or tab
 * @fires 'close' dropdown closing without select
 * @fires 'select' dropdown closing with select
 */
export class Dropdown extends mixin(ol.Object, ListenerOrganizerMixin) {
  /**
   * @param {DropdownOptions} [options={}]
   */
  constructor (options = {}) {
    super()

    /**
     * @type {string}
     * @private
     */
    this.className_ = options.className || 'g4u-dropdown'

    /**
     * @type {Object.<string, string>}
     * @private
     */
    this.classNames_ = {
      entry: this.className_ + '-entry',
      selected: this.className_ + '-selected',
      ghost: this.className_ + '-ghostentry'
    }

    /**
     * @type {jQuery}
     * @private
     */
    this.$element_ = $('<div>')
      .addClass(this.className_)

    /**
     * @type {jQuery}
     */
    this.$ghostentry = $('<button tabindex="-1">')
      .addClass(this.classNames_.ghost)
      .html(options.ghostentry || 'no entries')

    /**
     * @type {number}
     * @private
     */
    this.slideDuration_ = options.slideDuration || 400

    /**
     * @type {Entry[]}
     * @private
     */
    this.entriesArray_ = []

    /**
     * @type {number}
     * @private
     */
    this.selectedIndex_ = -1

    // key handling

    this.setUpKeyboardHandling_()

    this.listenAt(this.$element_).on('focus', () => {
      if (this.selectedIndex_ > -1) {
        this.entriesArray_[this.selectedIndex_].$element.focus()
      }
    })

    this.listenAt(this.$element_).on('mousemove', e => {
      e.stopPropagation()
    })

    this.slideUp(true)

    let skipCollapse

    this.listenAt(this.$element_).on('click', () => {
      skipCollapse = true
    })

    this.listenAt([
      // $(this.getMap().getViewport()).find('.ol-overlaycontainer-stopevent'),
      document
    ]).on('click', () => {
      if (skipCollapse) {
        skipCollapse = false
      } else if (this.collapse_) {
        this.slideUp()
      }
    })
  }

  detach () {
    this.detachAllListeners()
  }

  /**
   * returns the value of the selected list element
   * @returns {*}
   */
  getValue () {
    if (this.selectedIndex_ >= 0) {
      return this.entriesArray_[this.selectedIndex_].value
    }
  }

  /**
   * returns the text of the current selected list element
   */
  getText () {
    if (this.selectedIndex_ >= 0) {
      return this.entriesArray_[this.selectedIndex_].text
    }
  }

  /**
   * @private
   */
  setUpKeyboardHandling_ () {
    this.listenAt(this.$element_).on('keydown', e => {
      switch (e.which) {
        case keyCodes.ARROW_DOWN:
          e.preventDefault()
          e.stopPropagation()
          if (this.selectedIndex_ < this.entriesArray_.length - 1) {
            this.entriesArray_[this.selectedIndex_ + 1].$element.addClass(this.classNames_.selected)
            this.entriesArray_[this.selectedIndex_ + 1].$element.focus()
            this.entriesArray_[this.selectedIndex_].$element.removeClass(this.classNames_.selected)
            this.selectedIndex_ += 1
          }
          break
        case keyCodes.ARROW_UP:
          e.preventDefault()
          e.stopPropagation()
          if (this.selectedIndex_ > 0) {
            this.entriesArray_[this.selectedIndex_ - 1].$element.addClass(this.classNames_.selected)
            this.entriesArray_[this.selectedIndex_ - 1].$element.focus()
            this.entriesArray_[this.selectedIndex_].$element.removeClass(this.classNames_.selected)
            this.selectedIndex_ -= 1
          } else {
            this.entriesArray_[this.selectedIndex_].$element.removeClass(this.classNames_.selected)
            this.selectedIndex_ = -1
            this.dispatchEvent({
              type: 'leave:backwards',
              originalEvent: e
            })
          }
          break
        case keyCodes.TAB:
          if (!e.shiftKey) {
            this.dispatchEvent({
              type: 'leave:forwards',
              originalEvent: e
            })
          } else {
            this.dispatchEvent({
              type: 'leave:backwards',
              originalEvent: e
            })
          }
          break
        case keyCodes.ENTER:
          e.stopPropagation()
          e.preventDefault()
          this.select$Entry_(this.entriesArray_[this.selectedIndex_].$element)
      }
    })
    this.listenAt(window).on('keydown', e => {
      if (this.collapse_ && e.which === keyCodes.ESCAPE) {
        this.slideUp()
        this.dispatchEvent('close')
      }
    })
  }

  /**
   * return the whole element
   * @returns {jQuery}
   */
  get$Element () {
    return this.$element_
  }

  /**
   * Returns the amount of dropdown entries
   * @returns {Number}
   */
  getLength () {
    return this.entriesArray_.length
  }

  /**
   * Adds an entry to the end of the dropdown list
   * @param {*} value
   * @param {string} [text=value]
   * @param {boolean} [optSelected=false]
   */
  addEntry (value, text, optSelected = false) {
    text = text || value

    let index = this.getLength()
    this.setLength(index + 1)

    let entry = this.entriesArray_[index]
    entry.text = text
    entry.$element.html(text)
    entry.value = value

    if (optSelected) {
      entry.$element.addClass(this.classNames_.selected)
      this.selectedIndex_ = index
    }
  }

  setActivated (value, active) {
    this.entriesArray_.find(o => o.value === value).$element.toggleClass(cssClasses.active, active)
  }

  setFastMode (value) {
    this.fastMode_ = value
  }

  /**
   * This function takes an array of entries (strings).
   * The length of the dropdown is set to the length of the arrays (they have to have the same length).
   * @param {any[]} values
   * @param {string[]} [texts=values]
   */
  setEntries (values, texts) {
    texts = texts || values
    this.setLength(values.length)

    for (let i = 0, ii = values.length; i < ii; i++) {
      this.entriesArray_[i].text = texts[i]
      this.entriesArray_[i].$element.html(texts[i])
      this.entriesArray_[i].value = values[i]
    }
  }

  select$Entry_ ($entry) {
    if (!$entry.hasClass(this.classNames_.selected)) {
      $entry.addClass(this.classNames_.selected)
      if (this.selectedIndex_ > -1) {
        this.entriesArray_[this.selectedIndex_].$element.removeClass(this.classNames_.selected)
      }
    }
    this.selectedIndex_ = this.entriesArray_.findIndex(el => el.$element === $entry)
    this.slideUp()
    this.dispatchEvent('select')
  }

  /**
   * This function corrects the number of entries in the dropdown. The content of the entries is not respected.
   * New entries are slided down, to be removed entries are slided up then removed.
   * @param {number} length
   */
  setLength (length) {
    if (this.selectedIndex_ > -1) {
      this.entriesArray_[this.selectedIndex_].$element.removeClass(this.classNames_.selected)
      this.selectedIndex_ = -1
    }

    let i, ii

    if (this.entriesArray_.length === 0) { // removing ghost entry
      this.$element_.empty()
    }

    if (length > this.entriesArray_.length) { // adding entries and dropdown handlers
      for (i = this.entriesArray_.length, ii = length; i < ii; i++) {
        let $entry = $('<button tabindex="-1">')
          .addClass(this.classNames_.entry)
          .hide()

        $entry.on('click', () => this.select$Entry_($entry))
        $entry.focus()

        this.$element_.append($entry)

        this.entriesArray_.push({
          $element: $entry
        })

        $entry.slideDown({ duration: this.slideDuration_ })
      }
    } else if (length < this.entriesArray_.length) { // removing entries
      for (i = this.entriesArray_.length - 1, ii = length; i >= ii; i--) {
        this.entriesArray_[i].$element.slideUp({
          duration: this.slideDuration_,
          complete: () => {
            this.entriesArray_.pop()
            this.$element_.children().last().remove()
          }
        })
      }
      if (this.selectedIndex_ >= length) { // correcting selected element
        this.selectedIndex_ = length - 1
      }
    }
  }

  showGhostEntry () {
    this.setLength(0)
    this.$element_.append(this.$ghostentry)
    this.slideDown()
  }

  focus () {
    if (this.entriesArray_.length >= 0) {
      if (this.selectedIndex_ < 0) {
        this.selectedIndex_ = 0
        this.entriesArray_[0].$element.addClass(this.classNames_.selected)
      }
      this.entriesArray_[this.selectedIndex_].$element.focus()
    }
  }

  /**
   * @param {boolean} [immediately=false] if setted to true the animation is skipped
   * @returns {Promise}
   */
  slideUp (immediately = false) {
    return new Promise(resolve => {
      this.collapse_ = false
      let duration = this.slideDuration_
      if (immediately || this.fastMode_) {
        duration = 0
      }
      this.$element_.slideUp({
        duration: duration,
        complete: () => {
          this.$element_.addClass(cssClasses.hidden)
          resolve()
        },
        easing: 'easeInCirc'
      })
    })
  }

  /**
   * @param {boolean} [immediately=false] if setted to true the animation is skipped
   * @returns {Promise}
   */
  slideDown (immediately = false) {
    return new Promise(resolve => {
      if (this.$element_.children().length > 0) {
        let duration = this.slideDuration_
        if (immediately || this.fastMode_) {
          duration = 0
        }
        this.$element_.removeClass(cssClasses.hidden)
        this.$element_.slideDown({
          easing: 'easeOutCirc',
          complete: () => {
            this.collapse_ = true
            resolve()
          },
          duration: duration
        })
      }
    })
  }

  /**
   * Removes all entries
   */
  clear () {
    this.slideUp()
    this.$element_.empty()
    this.entriesArray_ = []
    this.selectedIndex_ = -1
  }

  /**
   * Returns true if the dropdown has selectable elements
   * @returns {boolean}
   */
  isSelectable () {
    return (this.entriesArray_.length > 0)
  }
}
