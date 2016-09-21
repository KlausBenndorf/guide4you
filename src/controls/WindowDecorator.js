import $ from 'jquery'

import {Control} from './Control'
import {Window} from '../html/Window'
import { addTooltip } from '../html/html'
import {cssClasses} from '../globals'

import '../../less/windowdecorator.less'

/**
 * @typedef {g4uControlOptions} WindowDecoratorOptions
 * @property {Control} component
 */

/**
 * This class provides an easy wrap around an control to provide a button to open the control inside of a window.
 * If the child control has a setActive method it is called upon opening and closing the window.
 */
export class WindowDecorator extends Control {
  /**
   * @param {WindowDecoratorOptions} options
   */
  constructor (options = {}) {
    options.element = $('<div>').addClass('g4u-window-decorator').get(0)
    options.singleButton = false
    options.className = options.component.getClassName()
    options.windowed = true

    super(options)

    /**
     * @type {jQuery}
     * @private
     */
    this.$button_ = $('<button>')
      .addClass(cssClasses.mainButton)

    this.get$Element()
      .append(this.$button_)

    /**
     * @type {Control}
     * @private
     */
    this.component_ = options.component
    this.component_.get$Element().addClass('g4u-window-component')

    this.$button_.addClass(cssClasses.hasTooltip).text(this.component_.getTitle())
    addTooltip(this.$button_, this.component_.getTipLabel())

    this.component_.on('change', () => {
      this.window_.updateSize()
      this.window_.getInFront()
    })
  }

  /**
   * @param {G4UMap} map
   */
  setMap (map) {
    super.setMap(map)

    if (this.getMap()) {
      this.getMap().removeControl(this.component_)
    }

    if (map) {
      map.addControl(this.component_)

      /**
       * @type {Window}
       * @private
       */
      this.window_ = new Window({ map: map })

      this.window_.get$Body().append(this.component_.get$Element())

      if (this.component_.setActive) {
        this.$button_.on('click touch', () => {
          this.component_.setActive(!this.component_.getActive())
        })

        this.component_.on('change:active', () => {
          let active = this.component_.getActive()
          this.setWindowVisible(active)
          this.$button_.toggleClass(cssClasses.active, active)
        })

        this.window_.on('change:visible', (e) => {
          if (!this.window_.getVisible()) {
            this.component_.setActive(false)
          }
          this.dispatchEvent(e)
        })
      } else {
        this.$button_.on('click touch', () => {
          this.setWindowVisible(!this.window_.getVisible())
        })

        this.window_.on('change:visible', (e) => {
          this.dispatchEvent(e)
        })
      }
      this.get$Element().append(this.window_.get$Element())
    }
  }

  /**
   * @param {boolean} visible
   */
  setWindowVisible (visible) {
    this.window_.setVisible(visible)
  }

  /**
   * @returns {boolean}
   */
  getWindowVisible () {
    return this.window_.getVisible()
  }
}
