import ol from 'openlayers'
import $ from 'jquery'
import { cssClasses, keyCodes } from '../globals'

import '../../less/dropdown.less'

/**
 * @typedef {object} DropdownOptions
 * @property {string} [className='g4u-dropdown']
 * @property {string} [ghostentry='no entries'] This text is shown if the dropdown has no entries
 * @property {number} [slideDuration=400] standard slideDuration
 */

/**
 * A HTML Dropdown select.
 * The text entries in the list can be setted and changed and given a click handler.
 * @fires 'leave:backwards' This event is raised if the dropdown is left via the up arrow or shift+tab
 * @fires 'leave:forwards' This event is raised if the dropdown is left via the down arrow or tab
 */
export default class Dropdown extends ol.Object {
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
     * @type {string}
     * @private
     */
    this.classNameEntry_ = this.className_ + '-entry'

    /**
     * @type {string}
     * @private
     */
    this.classNameSelected_ = this.className_ + '-selected'

    /**
     * @type {string}
     * @private
     */
    this.classNameGhostentry_ = this.className_ + '-ghostentry'

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
      .addClass(this.classNameGhostentry_)
      .text(options.ghostentry || 'no entries')

    /**
     * @type {number}
     * @private
     */
    this.slideDuration_ = options.slideDuration || 400

    /**
     * @type {jQuery[]}
     * @private
     */
    this.$entriesArray_ = []

    /**
     * @type {number}
     * @private
     */
    this.selectedIndex_ = -1

    // key handling

    this.$element_.on('keydown', e => {
      if (e.which === keyCodes.ARROW_DOWN) {
        e.preventDefault()
        e.stopPropagation()
        if (this.selectedIndex_ < this.$entriesArray_.length - 1) {
          this.$entriesArray_[this.selectedIndex_ + 1].addClass(this.classNameSelected_)
          this.$entriesArray_[this.selectedIndex_ + 1].focus()
          this.$entriesArray_[this.selectedIndex_].removeClass(this.classNameSelected_)
          this.selectedIndex_ += 1
        }
      } else if (e.which === keyCodes.ARROW_UP) {
        e.preventDefault()
        e.stopPropagation()
        if (this.selectedIndex_ > 0) {
          this.$entriesArray_[this.selectedIndex_ - 1].addClass(this.classNameSelected_)
          this.$entriesArray_[this.selectedIndex_ - 1].focus()
          this.$entriesArray_[this.selectedIndex_].removeClass(this.classNameSelected_)
          this.selectedIndex_ -= 1
        } else {
          this.dispatchEvent({
            type: 'leave:backwards',
            originalEvent: e
          })
        }
      } else if (e.which === keyCodes.TAB) {
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
      }
    })

    this.$element_.on('focus', () => {
      if (this.selectedIndex_ >= 0) {
        this.$entriesArray_[this.selectedIndex_].focus()
      }
    })

    this.$element_.get(0).addEventListener('mousemove', e => {
      e.stopPropagation()
    }, false)
  }

  /**
   * returns the selected lsit element
   * @returns {jQuery|undefined}
   */
  getSelected () {
    if (this.selectedIndex_ >= 0) {
      return this.$entriesArray_[this.selectedIndex_]
    }
  }

  /**
   * returns the text of the selected list element
   * @returns {string|undefined}
   */
  getValue () {
    if (this.selectedIndex_ >= 0) {
      return this.$entriesArray_[this.selectedIndex_].text()
    }
  }

  /**
   * return the whole element
   * @returns {jQuery}
   */
  get$Element () {
    return this.$element_
  }

  /**
   * Adds an entry to the end of the dropdown list
   * @param {string} entry
   * @param {function} handler
   * @returns {jQuery}
   */
  addEntry (entry, handler) {
    let $newEntry = $('<button tabindex="-1">')
      .addClass(this.classNameEntry_)
      .text(entry)

    let index = this.$entriesArray_.length
    this.$entriesArray_[index] = $newEntry

    $newEntry.on('click', () => {
      if (!$newEntry.hasClass(this.classNameSelected_)) {
        $newEntry.addClass(this.classNameSelected_)
        if (this.selectedIndex_ >= 0) {
          this.$entriesArray_[this.selectedIndex_].removeClass(this.classNameSelected_)
        }
        this.selectedIndex_ = index
      }
    })
    // $newEntry.focus()

    if (handler) {
      $newEntry.on('click', handler)
    }

    this.$element_.append($newEntry)

    return $newEntry
  }

  /**
   * This function takes an array of entries (strings) and an array of the same length with handlers.
   * The length of the dropdown is set to the length of the arrays (they have to have the same length).
   * All entries are inserted and the handlers are applied to the entries.
   * @param {jQuery[]} entries
   * @param {function[]} clickHandlers
   */
  setEntries (entries, clickHandlers) {
    if (entries.length === clickHandlers.length) {
      this.setLength(entries.length)

      for (let i = 0, ii = entries.length; i < ii; i++) {
        this.$entriesArray_[i].html(entries[i]).off('click').on('click', clickHandlers[i])
      }

      this.selectedIndex_ = -1
    } else {
      throw new Error('there are not the same amount of entries and clickHandlers.')
    }
  }

  /**
   * This function corrects the number of entries in the dropdown. The content of the entries is not respected.
   * New entries are slided down, to be removed entries are slided up then removed.
   * @param {number} length
   */
  setLength (length) {
    let i, ii

    if (this.$entriesArray_.length === 0) { // removing ghost entry
      this.$element_.empty()
      this.$entriesArray_ = []
    }

    if (length > this.$entriesArray_.length) { // adding entries and dropdown handlers
      for (i = this.$entriesArray_.length, ii = length; i < ii; i++) {
        let $entry = $('<button tabindex="-1">')
          .addClass(this.classNameEntry_)
          .hide()
        let index = i

        $entry.on('click', () => {
          if (!$entry.hasClass(this.classNameSelected_)) {
            $entry.addClass(this.classNameSelected_)
            if (this.selectedIndex_ >= 0) {
              this.$entriesArray_[this.selectedIndex_].removeClass(this.classNameSelected_)
            }
            this.selectedIndex_ = index
          }
        })
        $entry.focus()

        this.$element_.append($entry)

        this.$entriesArray_.push($entry)

        $entry.slideDown({ duration: this.slideDuration_ })
      }
    } else if (length < this.$entriesArray_.length) { // removing entries
      for (i = this.$entriesArray_.length - 1, ii = length; i >= ii; i--) {
        this.$entriesArray_[i].slideUp({
          duration: this.slideDuration_,
          complete: () => {
            this.$entriesArray_.pop()
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
    if (this.$entriesArray_.length >= 0) {
      if (this.selectedIndex_ < 0) {
        this.selectedIndex_ = 0
        this.$entriesArray_[0].addClass(this.classNameSelected_)
      }
      this.$entriesArray_[this.selectedIndex_].focus()
    }
  }

  /**
   * @param {boolean} [immediately=false] if setted to true the animation is skipped
   * @returns {Promise}
   */
  slideUp (immediately = false) {
    return new Promise(resolve => {
      let duration = 0
      if (!immediately) {
        duration = this.slideDuration_
      }
      this.$element_.slideUp({
        duration: duration,
        complete: () => {
          this.$element_.addClass(cssClasses.hidden)
          resolve()
        }
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
        let duration = 0
        if (!immediately) {
          duration = this.slideDuration_
        }
        this.$element_.slideDown({
          start: () => {
            this.$element_.removeClass(cssClasses.hidden)
          },
          complete: resolve,
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
    this.$entriesArray_ = []
    this.selectedIndex_ = -1
  }

  /**
   * Returns true if the dropdown has selectable elements
   * @returns {boolean}
   */
  isSelectable () {
    return (this.$entriesArray_.length > 0)
  }
}
