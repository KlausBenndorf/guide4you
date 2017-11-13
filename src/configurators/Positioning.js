import $ from 'jquery'
import uniq from 'lodash/uniq'

import { cssClasses } from '../globals'
import { mixinAsClass } from '../utilities'
import { ListenerOrganizerMixin } from '../ListenerOrganizerMixin'

/**
 * This describes the floating directions of an element. It can be an array, then it will move from the center to the
 * first specified direction and after that it moves in the second direction. If it is set to 'fixed' it is not
 * positioned via Positioning.
 * @typedef {string[]|string} Float
 */

/**
 * @typedef {Object} HideableElement
 * @property {Control} control
 * @property {number} importance
 * @property {number} order
 * @property {Float} [float] first and second direction or special value 'fixed'
 * @property {HideableElement[]} [hideableChildren]
 */

/**
 * @typedef {HideableElement} PositionedElement
 * @property {string[]} float first and second direction or special value 'fixed'
 * @property {number} minWidth
 * @property {number} minHeight
 * @property {{width: number, height: number}} size
 */

/**
 * @typedef {object} PositioningOptions
 * @property {number} [padding=5]
 * @property {number} [spacing=10]
 * @property {HTMLElement} viewport
 */

export class Positioning extends mixinAsClass(ListenerOrganizerMixin) {
  /**
   * @param {PositioningOptions} options
   */
  constructor (options) {
    super()
    /**
     * @type {jQuery|HTMLElement}
     * @private
     */
    this.$viewport_ = $(options.viewport)

    /**
     * The padding between the controls
     * @type {number}
     * @private
     */
    this.padding_ = options.padding || 5

    /**
     * The space between the controls and the edges of the map
     * @type {number}
     * @private
     */
    this.spacing_ = options.spacing || 10

    /**
     * The hidden controle
     * @type {jQuery}
     * @private
     */
    this.hidden$Elements_ = []

    this.init()
  }

  init () {
    this.detachAllListeners()

    /**
     * @type {HideableElement[]}
     * @private
     */
    this.all_ = []

    /**
     * All Controls stored according their position on the map
     * @type {object}
     * @private
     */
    this.corners_ = {
      'left': {
        'top': {
          counterclockwise: [],
          clockwise: []
        },
        'bottom': {
          counterclockwise: [],
          clockwise: []
        }
      },
      'right': {
        'top': {
          counterclockwise: [],
          clockwise: []
        },
        'bottom': {
          counterclockwise: [],
          clockwise: []
        }
      }
    }

    /**
     * This number tracks the order in which controls are added
     * @type {number}
     * @private
     */
    this.order_ = 0
  }

  getArray_ (float) {
    let x, y, direction
    switch (float[0]) {
      case 'top':
        y = 'top'
        x = float[1]
        if (x === 'left') {
          direction = 'clockwise'
        } else if (x === 'right') {
          direction = 'counterclockwise'
        }
        break
      case 'right':
        x = 'right'
        y = float[1]
        if (y === 'top') {
          direction = 'clockwise'
        } else if (y === 'bottom') {
          direction = 'counterclockwise'
        }
        break
      case 'bottom':
        y = 'bottom'
        x = float[1]
        if (x === 'left') {
          direction = 'counterclockwise'
        } else {
          direction = 'clockwise'
        }
        break
      case 'left':
        x = 'left'
        y = float[1]
        if (y === 'top') {
          direction = 'counterclockwise'
        } else {
          direction = 'clockwise'
        }
    }

    return this.corners_[x][y][direction]
  }

  /**
   * Add a control to the positioning.
   * @param {Control} control
   * @param {Object} [parentMeta] the meta information of the parent control
   */
  addControl (control, parentMeta) {
    // check if control needs to be positioned
    if (control.get$Element().parents().hasClass('ol-viewport')) {
      if (!parentMeta || !parentMeta.control.isWindowed()) {
        // gather metainformation
        /** @type {HideableElement} */
        let metaElem = {
          control,
          order: this.order_++,
          importance: control.getImportance()
        }

        control.on('change:visible', e => {
          let index = this.hidden$Elements_.indexOf(control.get$Element())
          if (e.oldValue && index > -1) {
            this.hidden$Elements_.splice(index, 1)
          }
          this.positionElements()
        })

        // repositioning if collapsible elements changes size
        this.listenAt(control).on('change:size', () => {
          this.positionElements()
        })

        if (!parentMeta) {
          metaElem.float = metaElem.control.getFloat() || ['top', 'left']

          if (metaElem.float === 'fixed') {
            return
          }

          this.getArray_(metaElem.float).push(metaElem)

          this.all_.push(metaElem)

          if (metaElem.control.getControls) {
            metaElem.hideableChildren = []
            for (let child of metaElem.control.getControls()) {
              this.addControl(child, metaElem)
            }
          }
        } else if (!parentMeta.control.isWindowed()) {
          metaElem.importance = control.getImportance()
          parentMeta.hideableChildren.push(metaElem)
          this.all_.push(metaElem)
        }
      }
    }
  }

  /**
   * Gets the element in a corner
   * @param {string} x
   * @param {string} y
   * @returns {HideableElement}
   * @private
   */
  getCorner_ (x, y) {
    let cwi = 0
    let ccwi = 0

    let cwElem = this.corners_[x][y].clockwise[cwi++]
    let ccwElem = this.corners_[x][y].counterclockwise[ccwi++]

    while (cwElem && !Positioning.isElemVisible_(cwElem)) {
      cwElem = this.corners_[x][y].clockwise[cwi++]
    }

    while (ccwElem && !Positioning.isElemVisible_(ccwElem)) {
      ccwElem = this.corners_[x][y].counterclockwise[ccwi++]
    }

    if (cwElem || ccwElem) {
      if (!cwElem) {
        return ccwElem
      } else if (!ccwElem) {
        return cwElem
      } else {
        if (cwElem.order < ccwElem.order) {
          return cwElem
        } else {
          return ccwElem
        }
      }
    }
  }

  static isElemVisible_ (elem) {
    return elem.control.get$Element().is(':visible')
  }

  /**
   * Gets all elements at one edge
   * @param side
   * @returns {*|Array.<Element>}
   * @private
   */
  getEdge_ (side) {
    let x1, x2, y1, y2
    if (side === 'top') {
      x1 = 'left'
      x2 = 'right'
      y1 = y2 = 'top'
    } else if (side === 'right') {
      x1 = x2 = 'right'
      y1 = 'top'
      y2 = 'bottom'
    } else if (side === 'bottom') {
      x1 = 'right'
      x2 = 'left'
      y1 = y2 = 'bottom'
    } else if (side === 'left') {
      x1 = x2 = 'left'
      y1 = 'bottom'
      y2 = 'top'
    }

    let clockwise = this.corners_[x1][y1].clockwise.filter(Positioning.isElemVisible_)
    let counterclockwise = this.corners_[x2][y2].counterclockwise.filter(Positioning.isElemVisible_)

    let arr = []
    let c = this.getCorner_(x1, y1)
    if (c) {
      arr.push(c)
    }
    arr.push(...clockwise)
    arr.push(...counterclockwise)
    c = this.getCorner_(x2, y2)
    if (c) {
      arr.push(c)
    }
    return uniq(arr)
  }

  /**
   * Initializes all elements
   * @private
   */
  beforePositioning_ () {
    let elems = new Set(this.all_)

    this.hidden$Elements_.forEach($e => $e.removeClass(cssClasses.hidden))
    this.hidden$Elements_ = []

    /**
     * @param {PositionedElement} elem
     */
    let forEach = elem => {
      if (Positioning.isElemVisible_(elem)) {
        if (elem.control.beforePositioning) {
          elem.control.beforePositioning()
        }

        if (elem.hideableChildren) {
          for (let child of elem.hideableChildren) {
            forEach(child)
          }
        }

        elem.control.get$Element().position({ top: 0, left: 0 })
        if (elem.control.release) {
          elem.control.release('height')
          elem.control.release('width')
        }
        elem.size = this.measureExpandedElement_(elem)
      }

      elems.delete(elem)
    }

    for (let elem of elems) {
      forEach(elem)
    }
  }

  /**
   * called after positioning
   * @private
   */
  afterPositioning_ () {
    let elems = new Set(this.all_)

    /**
     * @param {PositionedElement} elem
     */
    let forEach = elem => {
      if (elem.control.afterPositioning) {
        elem.control.afterPositioning()
      }

      if (elem.hideableChildren) {
        for (let child of elem.hideableChildren) {
          forEach(child)
        }
      }

      elems.delete(elem)
    }

    for (let elem of elems) {
      forEach(elem)
    }
  }

  /**
   * Calculates summed length of all elements on one edge
   * @param {PositionedElement[]} edgeElems
   * @param {string} dim
   * @returns {number}
   * @private
   */
  calculateLength_ (edgeElems, dim) {
    if (edgeElems.length === 0) {
      return 0
    }

    let length = this.padding_ * 2

    let firstElement = true

    for (let elem of edgeElems) {
      length += elem.size[dim]
      if (firstElement) {
        firstElement = false
      } else {
        length += this.spacing_
      }
    }

    return length
  }

  calculateSide_ (side, availableSpace) {
    let dim = (side === 'top' || side === 'bottom') ? 'width' : 'height'
    let elems = this.getEdge_(side)
    let wantedSpace = this.calculateLength_(elems, dim)
    let changed = false

    while (wantedSpace > availableSpace) {
      if (this.squeezeElements_(elems, dim, wantedSpace - availableSpace)) {
        break
      }
      this.hideLeastImportant_(elems)
      elems = this.getEdge_(side)
      wantedSpace = this.calculateLength_(elems, dim)
      changed = true
    }
    return changed
  }

  positionElementsCorner_ (x, y) {
    let corner = this.getCorner_(x, y)
    if (corner) {
      let xLength = this.padding_
      let yLength = this.padding_
      let $elem = corner.control.get$Element()

      $elem.removeClass(cssClasses.hidden).css({[x]: xLength, [y]: yLength})

      xLength += $elem.outerWidth() + this.spacing_
      yLength += $elem.outerHeight() + this.spacing_

      let xDirection, yDirection

      if (x === 'left' && y === 'top') {
        xDirection = 'clockwise'
        yDirection = 'counterclockwise'
      } else if (x === 'right' && y === 'top') {
        xDirection = 'counterclockwise'
        yDirection = 'clockwise'
      } else if (x === 'right' && y === 'bottom') {
        xDirection = 'clockwise'
        yDirection = 'counterclockwise'
      } else if (x === 'left' && y === 'bottom') {
        xDirection = 'counterclockwise'
        yDirection = 'clockwise'
      }

      // x
      for (let elem of this.corners_[x][y][xDirection]
        .filter(el => Positioning.isElemVisible_(el) && el !== corner)) {
        $elem = elem.control.get$Element()
        $elem.css({[x]: xLength, [y]: this.padding_})
        xLength += $elem.outerWidth() + this.spacing_
      }

      // y
      for (let elem of this.corners_[x][y][yDirection]
        .filter(el => Positioning.isElemVisible_(el) && el !== corner)) {
        $elem = elem.control.get$Element()
        $elem.css({[x]: this.padding_, [y]: yLength})
        yLength += $elem.outerHeight() + this.spacing_
      }
    }
  }

  /**
   * (Re-)Position the controls on the map
   */
  positionElements () {
    let width = this.$viewport_.innerWidth()
    let height = this.$viewport_.innerHeight()

    this.beforePositioning_()

    // calculation
    let processSides = new Set(['top', 'left', 'bottom', 'right'])

    while (processSides.size) {
      if (processSides.has('top')) {
        if (this.calculateSide_('top', width)) {
          processSides.add('left')
          processSides.add('right')
        }

        processSides.delete('top')
      }

      if (processSides.has('right')) {
        if (this.calculateSide_('right', height)) {
          processSides.add('top')
          processSides.add('bottom')
        }

        processSides.delete('right')
      }

      if (processSides.has('bottom')) {
        if (this.calculateSide_('bottom', width)) {
          processSides.add('left')
          processSides.add('right')
        }

        processSides.delete('bottom')
      }

      if (processSides.has('left')) {
        if (this.calculateSide_('left', height)) {
          processSides.add('top')
          processSides.add('bottom')
        }

        processSides.delete('left')
      }
    }

    // positioning

    this.positionElementsCorner_('left', 'top')
    this.positionElementsCorner_('right', 'top')
    this.positionElementsCorner_('right', 'bottom')
    this.positionElementsCorner_('left', 'bottom')

    this.afterPositioning_()
  }

  /**
   * Tries to squeeze the elements on one edge to fit the space. Returns true if it did work, false otherwise.
   * @param {PositionedElement[]} elems
   * @param {string} side
   * @param {number} neededSpace
   * @private
   * @returns {boolean}
   */
  squeezeElements_ (elems, side, neededSpace) {
    let squeezableElements = []

    function insert (item, x = 0, y = squeezableElements.length) {
      if (y === x) {
        squeezableElements.splice(x, 0, item)
      } else {
        let p = Math.floor((x + y) / 2)
        if (item.importance <= squeezableElements[p].importance) {
          insert(item, x, p)
        } else {
          insert(item, p + 1, y)
        }
      }
    }

    /**
     * @param {PositionedElement[]} elems
     */
    function findSqueezables (elems) {
      for (let elem of elems) {
        if (elem.control.isSqueezable && elem.control.isSqueezable(side)) {
          insert(elem)
        }
        if (elem.hideableChildren) {
          findSqueezables(elem.hideableChildren)
        }
      }
    }

    findSqueezables(elems)

    for (let elem of squeezableElements) {
      neededSpace -= elem.control.squeezeBy(side, neededSpace)

      if (neededSpace <= 0) {
        return true
      }
    }

    for (let elem of squeezableElements) {
      elem.control.release(side)
    }

    return false
  }

  /**
   * Expands element to maximum size
   * @param {PositionedElement} elem
   * @returns {Array}
   * @private
   */
  expandElement_ (elem) {
    let expanded = []

    if (elem.hideableChildren) {
      for (let child of elem.hideableChildren) {
        expanded.push(...this.expandElement_(child))
      }
    }
    if (elem.control.getCollapsible && elem.control.getCollapsible()) {
      if (elem.control.getCollapsed()) {
        elem.control.setCollapsed(false, true)
        expanded.push(elem.control)
      }
    }

    return expanded
  }

  /**
   * measures size of the element
   * @param {PositionedElement} elem
   * @returns {{width: number, height: number}}
   * @private
   */
  measureExpandedElement_ (elem) {
    // let expanded = this.expandElement_(elem)
    let $elem = elem.control.get$Element()
    let size = {width: $elem.outerWidth(), height: $elem.outerHeight()}
    // for (let exp of expanded) {
    //   exp.setCollapsed(true, true)
    // }
    return size
  }

  /**
   * Hides the least important element of the given ones.
   * @param {PositionedElement[]} elems visible elements
   * @private
   */
  hideLeastImportant_ (elems) {
    let leastImportant = elems[0]
    for (let elem of elems.slice(1)) {
      if (elem.importance < leastImportant.importance) {
        leastImportant = elem
      }
    }

    let childHidden = false
    if (leastImportant.hideableChildren) {
      let hideableChildren = leastImportant.hideableChildren.filter(Positioning.isElemVisible_)
      if (hideableChildren.length > 1) {
        this.hideLeastImportant_(hideableChildren)
        childHidden = true
      }
    }

    if (childHidden) {
      leastImportant.size = this.measureExpandedElement_(leastImportant)
    } else {
      leastImportant.control.get$Element().addClass(cssClasses.hidden)
      this.hidden$Elements_.push(leastImportant.control.get$Element())
    }
  }
}
