import $ from 'jquery'

import { cssClasses } from '../globals'

/**
 * @typedef {object} ButtonBoxOptions
 * @property {string} [className='g4u-menu']
 * @property {HTMLElement|jQuery} [content] the content of the body of the button box
 * @property {boolean} [collapsible]
 * @property {boolean} [collapsed]
 * @property {string} [title] the title appearing on the button
 */

/**
 * An Element to easily construct nested HTML Menus
 * It contains of a button followed by a body below the button. The button can toggle the visibility of the body.
 * If multiple elements with the same classname are nested it gives the last visible element a special class name.
 * It can also marks one or multiple element in the tree to be active (same classname is needed, too).
 * After a ButtonBox has been added all child elements the method finish should be called.
 */
export default class ButtonBox {
  /**
   * @param {ButtonBoxOptions} [options={}]
   */
  constructor (options = {}) {
    /**
     * @type {string}
     * @private
     */
    this.className_ = options.className || 'g4u-menu'

    /**
     * @type {string}
     * @private
     */
    this.classNameTitle_ = this.className_ + '-titlebutton'

    /**
     * @type {string}
     * @private
     */
    this.classNameBody_ = this.className_ + '-content'

    /**
     * @type {string}
     * @private
     */
    this.classNameCollapsed_ = this.className_ + '-collapsed'

    /**
     * @type {string}
     * @private
     */
    this.classNameLastVisible_ = this.className_ + '-last-visible'

    /**
     * @type {string}
     * @private
     */
    this.classNameActive_ = this.className_ + '-active'

    /**
     * @type {jQuery}
     * @private
     */
    this.$element_ = $('<div>')
      .addClass(this.className_)

    if (options.hasOwnProperty('id')) {
      this.$element_.attr('id', options.id)
    }

    /**
     * @type {boolean}
     * @private
     */
    this.collapsible_ = (options.hasOwnProperty('collapsible')) ? options.collapsible : true

    /**
     * @type {boolean}
     * @private
     */
    this.collapsed_ = (options.hasOwnProperty('collapsed')) ? options.collapsed : false

    /**
     * @type {jQuery}
     * @private
     */
    this.$body_ = $('<div>')
      .addClass(this.classNameBody_)

    if (options.hasOwnProperty('content')) {
      this.$body_.append(options.content)
    }

    // title

    if (options.hasOwnProperty('title')) {
      /**
       * @type {string}
       * @private
       */
      this.title_ = options.title

      let $button = $(`<button class="${this.classNameTitle_}"></button>`).html(this.title_)

      if (this.collapsible_) {
        $button.on('click', () => {
          if (!this.collapsed_) {
            this.setCollapsed(true)
          } else {
            this.setCollapsed(false)
          }
          $button.blur()
        })
      }
      this.$element_.append($button).append(this.$body_)
    } else {
      this.collapsible_ = false
      this.collapsed_ = false
    }

    // this.$element_.collapsed_ will be setted in the following functions
    if (!this.collapsed_) {
      this.setCollapsed(false)
    } else {
      this.setCollapsed(true)
    }
  }

  /**
   * @param {boolean} collapsed
   */
  setCollapsed (collapsed) {
    if (collapsed) {
      this.$body_.addClass(cssClasses.hidden)
      this.$element_.addClass(this.classNameCollapsed_)
    } else {
      this.$body_.removeClass(cssClasses.hidden)
      this.$element_.removeClass(this.classNameCollapsed_)
    }

    this.collapsed_ = collapsed

    this.lastVisibleClass_()
  }

  /**
   * @returns {boolean}
   */
  getCollapsed () {
    return this.collapsed_
  }

  /**
   * distribute the last visible class to the correct element
   * @private
   */
  lastVisibleClass_ () {
    // first take the last visible class name away
    if (this.takeLastVisible(this.$element_)) {
      // if the last visible class name was taken, distribute it to the correct element
      this.giveLastVisible(this.$element_)
    }
  }

  /**
   * Returns the body element
   * @returns {jQuery}
   */
  get$Body () {
    return this.$body_
  }

  /**
   * Returns the element itself
   * @returns {jQuery}
   */
  get$Element () {
    return this.$element_
  }

  /**
   * finds and returns the last child in the body of the given element if it is of the same classname as this ButtonBox
   * @param {jQuery} $element
   * @returns {jQuery}
   * @private
   */
  get$LastChild_ ($element) {
    return $element.children('.' + this.classNameBody_).children(':last-child')
  }

  /**
   * Mark an element (and its parents) as active/inactive (clicked)
   * @param {jQuery} $element
   * @param {boolean} active
   */
  setActive ($element, active) {
    let $parent = $element.parent().parent()
    if (active) {
      $element.addClass(this.classNameActive_)
      if ($parent.hasClass(this.className_)) { // propagate to parent if it has the same classname
        this.setActive($parent, active)
      }
    } else {
      if (!$element.children('.' + this.classNameBody_).children().hasClass(this.classNameActive_)) {
        $element.removeClass(this.classNameActive_)
        if ($parent.hasClass(this.className_)) { // propagate to parent if it has the same classname
          this.setActive($parent, active)
        }
      }
    }
  }

  /**
   * @param $element
   * @returns {boolean}
   */
  getActive ($element) {
    return $element.hasClass(this.classNameActive_)
  }

  /**
   * Gives the last element in the element the last visible class
   * @param $element
   */
  giveLastVisible ($element) {
    if ($element.hasClass(this.classNameCollapsed_)) {
      // if the element is collapsed itself is the last visible element
      $element.addClass(this.classNameLastVisible_)
    } else {
      if ($element.hasClass(this.className_)) {
        // the element is a button box and not collapsed
        let $lastChild = this.get$LastChild_($element)
        if ($lastChild) {
          // -> recursively call this method on the last element
          this.giveLastVisible($lastChild)
        } else {
          // no last element existent
          $element.addClass(this.classNameLastVisible_)
        }
      } else {
        // the element is no buttonbox with the same classname it is declared the last visible element
        $element.addClass(this.classNameLastVisible_)
      }
    }
  }

  /**
   * Searches for the last visible class in its child elements and removes it.
   * Returns true if it was removed.
   * @param {jQuery} $element
   * @returns {boolean}
   */
  takeLastVisible ($element) {
    if ($element.hasClass(this.classNameLastVisible_)) {
      $element.removeClass(this.classNameLastVisible_)
      return true
    } else if ($element.hasClass(this.className_)) {
      let $lastChild = this.get$LastChild_($element)
      // reverse call
      if ($lastChild) {
        return this.takeLastVisible($lastChild)
      } else {
        return false
      }
    } else {
      return false
    }
  }

  /**
   * This method should be called after all child elements have been added to the button box
   */
  finish () {
    this.takeLastVisible(this.$element_)
    this.giveLastVisible(this.$element_)
  }
}
