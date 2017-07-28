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
 * @property {Boolean} visible
 * @property {Object} state
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
          visible: true,
          importance: control.getImportance()
        }

        // repositioning if collapsible elements changes size
        this.listenAt(control).on('change:size', () => {
          this.positionElements()
        })

        if (!parentMeta) {
          metaElem.float = metaElem.control.getFloat() || ['top', 'left']

          if (metaElem.float === 'fixed') {
            return
          }

          let x, y, direction
          switch (metaElem.float[0]) {
            case 'top':
              y = 'top'
              x = metaElem.float[1]
              if (x === 'left') {
                direction = 'clockwise'
              } else if (x === 'right') {
                direction = 'counterclockwise'
              }
              break
            case 'right':
              x = 'right'
              y = metaElem.float[1]
              if (y === 'top') {
                direction = 'clockwise'
              } else if (y === 'bottom') {
                direction = 'counterclockwise'
              }
              break
            case 'bottom':
              y = 'bottom'
              x = metaElem.float[1]
              if (x === 'left') {
                direction = 'counterclockwise'
              } else {
                direction = 'clockwise'
              }
              break
            case 'left':
              x = 'left'
              y = metaElem.float[1]
              if (y === 'top') {
                direction = 'counterclockwise'
              } else {
                direction = 'clockwise'
              }
          }

          this.corners_[x][y][direction].push(metaElem)

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

    while (cwElem && !cwElem.visible) {
      cwElem = this.corners_[x][y].clockwise[cwi++]
    }

    while (ccwElem && !ccwElem.visible) {
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

  /**
   * Gets all elements at one edge
   * @param edge
   * @returns {*|Array.<Element>}
   * @private
   */
  getEdge_ (edge) {
    let x1, x2, y1, y2
    if (edge === 'top') {
      x1 = 'left'
      x2 = 'right'
      y1 = y2 = 'top'
    } else if (edge === 'right') {
      x1 = x2 = 'right'
      y1 = 'top'
      y2 = 'bottom'
    } else if (edge === 'bottom') {
      x1 = 'right'
      x2 = 'left'
      y1 = y2 = 'bottom'
    } else if (edge === 'left') {
      x1 = x2 = 'left'
      y1 = 'bottom'
      y2 = 'top'
    }

    let clockwise = $.grep(this.corners_[x1][y1].clockwise, el => el.visible)
    let counterclockwise = $.grep(this.corners_[x2][y2].counterclockwise, el => el.visible)

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

    /**
     * @param {PositionedElement} elem
     */
    let forEach = elem => {
      if (elem.control.beforePositioning) {
        elem.control.beforePositioning()
      }

      if (elem.hideableChildren) {
        for (let child of elem.hideableChildren) {
          forEach(child)
        }
      }

      let $elem = elem.control.get$Element()
      $elem.removeClass(cssClasses.hidden)
      $elem.position({ top: 0, left: 0 })
      elem.visible = $elem.is(':visible')
      if (elem.visible) {
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
   * @param {string} side
   * @returns {number}
   * @private
   */
  calculateLength_ (edgeElems, side) {
    let length = this.padding_ * 2

    let firstElement = true

    for (let elem of edgeElems) {
      length += elem.size[side]
      if (firstElement) {
        firstElement = false
      } else {
        length += this.spacing_
      }
    }

    return length
  }

  /**
   * (Re-)Position the controls on the map
   */
  positionElements () {
    let width = this.$viewport_.innerWidth()
    let height = this.$viewport_.innerHeight()

    this.beforePositioning_()

    let changed

    let processSides = new Set(['top', 'left', 'bottom', 'right'])

    while (processSides.size) {
      // calculation

      if (processSides.has('top')) {
        let topElems = this.getEdge_('top')
        let topWidth = this.calculateLength_(topElems, 'width')

        changed = false
        while (topElems.length && topWidth > width && !this.squeezeElements_(topElems, 'width', topWidth - width)) {
          this.hideLeastImportant_(topElems)
          topElems = this.getEdge_('top')
          topWidth = this.calculateLength_(topElems, 'width')
          changed = true
        }
        if (changed) {
          processSides.add('left')
          processSides.add('right')
        }

        processSides.delete('top')
      }

      if (processSides.has('right')) {
        let rightElems = this.getEdge_('right')
        let rightHeight = this.calculateLength_(rightElems, 'height')

        if (rightElems.length && rightHeight > height) {
          changed = false
          let squeezable = this.squeezeElements_(rightElems, 'height', rightHeight - height)
          while (rightElems.length && rightHeight > height && !squeezable) {
            this.hideLeastImportant_(rightElems)
            rightElems = this.getEdge_('right')
            rightHeight = this.calculateLength_(rightElems, 'height')
            changed = true
            squeezable = this.squeezeElements_(rightElems, 'height', rightHeight - height)
          }
          if (changed) {
            processSides.add('top')
            processSides.add('bottom')
          }
        }

        processSides.delete('right')
      }

      if (processSides.has('bottom')) {
        let bottomElems = this.getEdge_('bottom')
        let bottomWidth = this.calculateLength_(bottomElems, 'width')

        changed = false
        while (bottomElems.length && (bottomWidth > width) &&
            !this.squeezeElements_(bottomElems, 'width', bottomWidth - width)) {
          this.hideLeastImportant_(bottomElems)
          bottomElems = this.getEdge_('bottom')
          bottomWidth = this.calculateLength_(bottomElems, 'width')
          changed = true
        }
        if (changed) {
          processSides.add('left')
          processSides.add('right')
        }

        processSides.delete('bottom')
      }

      if (processSides.has('left')) {
        let leftElems = this.getEdge_('left')
        let leftHeight = this.calculateLength_(leftElems, 'height')

        changed = false
        while (leftElems.length && (leftHeight > height) &&
            !this.squeezeElements_(leftElems, 'height', leftHeight - height)) {
          this.hideLeastImportant_(leftElems)
          leftElems = this.getEdge_('left')
          leftHeight = this.calculateLength_(leftElems, 'height')
          changed = true
        }
        if (changed) {
          processSides.add('top')
          processSides.add('bottom')
        }

        processSides.delete('left')
      }
    }

    // positioning

    let positionCorner = (x, y) => {
      let corner = this.getCorner_(x, y)
      if (corner) {
        let xLength = this.padding_
        let yLength = this.padding_
        let $elem = corner.control.get$Element()

        if (corner.control.setPositionedState) {
          corner.control.setPositionedState(corner.state)
        }

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
        for (let elem of $.grep(this.corners_[x][y][xDirection], el => el.visible && el !== corner)) {
          $elem = elem.control.get$Element()
          $elem.css({[x]: xLength, [y]: this.padding_})
          if (elem.control.setPositionedState) {
            elem.control.setPositionedState(elem.state)
          }
          xLength += $elem.outerWidth() + this.spacing_
        }

        // y
        for (let elem of $.grep(this.corners_[x][y][yDirection], el => el.visible && el !== corner)) {
          $elem = elem.control.get$Element()
          $elem.css({[x]: this.padding_, [y]: yLength})
          if (elem.control.setPositionedState) {
            elem.control.setPositionedState(elem.state)
          }
          yLength += $elem.outerHeight() + this.spacing_
        }
      }
    }

    positionCorner('left', 'top')

    positionCorner('right', 'top')

    positionCorner('right', 'bottom')

    positionCorner('left', 'bottom')

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

    let squeezed = 0

    for (let elem of squeezableElements) {
      squeezed += elem.control.squeezeBy(side, neededSpace)

      if (squeezed >= neededSpace) {
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
    let expanded = this.expandElement_(elem)
    let $elem = elem.control.get$Element()
    let size = { width: $elem.outerWidth(), height: $elem.outerHeight() }
    for (let exp of expanded) {
      exp.setCollapsed(true, true)
    }
    return size
  }

  /**
   * Hides the least important element of the given ones.
   * @param {PositionedElement[]} elems visible elements
   * @private
   */
  hideLeastImportant_ (elems) {
    /**
     * @param {PositionedElement[]} elems
     * @returns {PositionedElement}
     */
    let findLeastImportant = function (elems) {
      let leastImportant
      for (let elem of elems) {
        if (!leastImportant) {
          leastImportant = elem
        } else {
          if (elem.importance < leastImportant.importance) {
            leastImportant = elem
          }
        }

        if (elem.hideableChildren) {
          let hideableChildren = $.grep(elem.hideableChildren, el => el.visible)
          if (hideableChildren.length) {
            let leastImportantChild = findLeastImportant(hideableChildren)
            if (leastImportantChild.importance < leastImportant.importance) {
              leastImportant = leastImportantChild
            }
          }
        }
      }
      return leastImportant
    }

    let leastImportant = findLeastImportant(elems)
    leastImportant.visible = false
    leastImportant.control.get$Element().addClass(cssClasses.hidden)
  }
}
