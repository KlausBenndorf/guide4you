import $ from 'jquery'
import ol from 'openlayers'

import { cssClasses } from '../globals'

/**
 * @typedef {object} ButtonBoxOptions
 * @property {string} [className='g4u-menu']
 * @property {HTMLElement|jQuery} [content] the content of the body of the button box
 * @property {boolean} [collapsible]
 * @property {boolean} [collapsed]
 * @property {boolean} [titleButton=false] displays an extra button with a title firing an 'title:click' event
 * @property {string} [title] the title appearing on the button
 */

/**
 * An Element to easily construct nested HTML Menus
 * It contains of a button followed by a body below the button. The button can toggle the visibility of the body.
 * If multiple elements with the same classname are nested it gives the last visible element a special class name.
 * It can also marks one or multiple element in the tree to be active (same classname is needed, too).
 * After a ButtonBox has been added all child elements the method finish should be called.
 */
export class ButtonBox extends ol.Object {
  /**
   * @param {ButtonBoxOptions} [options={}]
   */
  constructor (options = {}) {
    super()

    /**
     * @type {string}
     * @private
     */
    this.className_ = options.className || 'g4u-menu'

    this.classNames_ = {
      body: this.className_ + '-content',
      collapseButton: this.className_ + '-collapsebutton',
      titleButton: this.className_ + '-titlebutton',
      title: this.className_ + '-title',
      active: this.className_ + '-active',
      collapsed: this.className_ + '-collapsed',
      lastVisible: this.className_ + '-last-visible'
    }

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
    this.titleButton_ = options.titleButton || false

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
      .addClass(this.classNames_.body)

    if (options.hasOwnProperty('content')) {
      this.$body_.append(options.content)
    }

    if (options.hasOwnProperty('title')) {
      /**
       * @type {jQuery}
       * @private
       */
      this.$title_ = $('<div>')
        .addClass(this.classNames_.title)

      this.$element_.append(this.$title_)

      if (this.collapsible_) {
        let $collapseButton = $('<button>')
          .addClass(this.classNames_.collapseButton)

        $collapseButton.on('click', () => {
          this.setCollapsed(!this.collapsed_)
          $collapseButton.blur()
        })

        if (this.titleButton_) {
          let $titleButton = $('<button>')
            .addClass(this.classNames_.titleButton)
            .on('click', () => {
              this.dispatchEvent('title:click')
              $titleButton.blur()
            })
            .html(options.title)

          this.$title_
            .append($collapseButton)
            .append($titleButton)
        } else {
          $collapseButton
            .addClass(this.classNames_.titleButton)
            .html(options.title)
          this.$title_
            .append($collapseButton)
        }
      } else {
        this.$title_
          .html(options.title)
      }
    } else {
      this.collapsible_ = false
      this.collapsed_ = false
    }

    this.$element_.append(this.$body_)

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
      this.$element_.addClass(this.classNames_.collapsed)
    } else {
      this.$body_.removeClass(cssClasses.hidden)
      this.$element_.removeClass(this.classNames_.collapsed)
    }

    this.collapsed_ = collapsed

    this.lastVisibleClass_()
    this.dispatchEvent('change:collapsed')
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
    return $element.children('.' + this.classNames_.body).children(':last-child')
  }

  setCollapseButtonActive (active) {
    this.$title_.children('.' + this.classNames_.collapseButton).toggleClass(this.classNames_.active, active)
  }

  setTitleButtonActive (active) {
    this.$title_.children('.' + this.classNames_.titleButton).toggleClass(this.classNames_.active, active)
  }

  // /**
  //  * Mark an element (and its parents) as active/inactive (clicked)
  //  * @param {jQuery} $element
  //  * @param {boolean} active
  //  */
  // setActive ($element, active) {
  //   let $parent = $element.parent().parent()
  //   if (active) {
  //     let $collapseButton = $element.find('.' + this.classNames_.collapseButton)
  //     let $titleButton = $element.find('.' + this.classNames_.titleButton)
  //     if () {
  //
  //     }
  //     $element.addClass(this.classNames_.active)
  //     if ($parent.hasClass(this.className_)) { // propagate to parent if it has the same classname
  //       this.setActive($parent, active)
  //     }
  //   } else {
  //     if (!$element.children('.' + this.classNames_.body).children().hasClass(this.classNames_.active)) {
  //       $element.removeClass(this.classNames_.active)
  //       if ($parent.hasClass(this.className_)) { // propagate to parent if it has the same classname
  //         this.setActive($parent, active)
  //       }
  //     }
  //   }
  // }

  // /**
  //  * @param $element
  //  * @returns {boolean}
  //  */
  // getActive ($element) {
  //   return $element.hasClass(this.classNames_.active)
  // }

  /**
   * Gives the last element in the element the last visible class
   * @param $element
   */
  giveLastVisible ($element) {
    if ($element.hasClass(this.classNames_.collapsed)) {
      // if the element is collapsed itself is the last visible element
      $element.addClass(this.classNames_.lastVisible)
    } else {
      if ($element.hasClass(this.className_)) {
        // the element is a button box (with the same className) and not collapsed
        let $lastChild = this.get$LastChild_($element)
        if ($lastChild) {
          // -> recursively call this method on the last element
          this.giveLastVisible($lastChild)
        } else {
          // no last element exists
          $element.addClass(this.classNames_.lastVisible)
        }
      } else {
        // the element is no buttonbox with the same classname it is declared the last visible element
        $element.addClass(this.classNames_.lastVisible)
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
    if ($element.hasClass(this.classNames_.lastVisible)) {
      $element.removeClass(this.classNames_.lastVisible)
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
