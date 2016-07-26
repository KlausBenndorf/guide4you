import $ from 'jquery'

import GroupLayer from '../layers/GroupLayer'
import ButtonBox from '../html/ButtonBox'
import Control from './Control'
import { offset } from '../utilities'
import {cssClasses} from '../globals'

import '../../less/layerselector.less'

/**
 * @typedef {g4uControlOptions} LayerSelectorOptions
 * @property {boolean} [toggle=true] if the layers are toggable
 * @property {boolean} [collapsible=true] if the menu should be collapsible
 * @property {boolean} [collapsed=false] if the menu starts collapsed
 * @property {number} [minVisibleEntries=6] amount of minimal visible elements
 * @property {string} layerGroupName the name of the layerGroup this selector is connected to. For example 'baseLayers'
 * @property {number} [minLayerAmount=1] the minimum number of layers which should be visible to show this selector
 */

/**
 * This control shows Buttons to let you select the layer you want to see on the map.
 * It supports categories and nested categories - each {GroupLayer}-Object will be interpreted as a category.
 */
export default class LayerSelector extends Control {
  /**
   * @param {LayerSelectorOptions} options
   */
  constructor (options = {}) {
    options.className = options.className || 'g4u-layerselector'
    options.element = $('<div>')[0]
    options.singleButton = false

    super(options)

    /**
     * @type {String}
     * @private
     */
    this.layerGroupName_ = options.layerGroupName

    /**
     * @type {number}
     * @private
     */
    this.minLayerAmount_ = options.hasOwnProperty('minLayerAmount') ? options.minLayerAmount : 1

    /**
     * @type {boolean}
     * @private
     */
    this.collapsible_ = !options.hasOwnProperty('collapsible') || options.collapsible

    /**
     * @type {boolean}
     * @private
     */
    this.collapsed_ = options.collapsed || false

    /**
     * @type {string}
     * @private
     */
    this.classNameMenu_ = this.className_ + '-menu'

    /**
     * @type {string}
     * @private
     */
    this.classNameLayerButton_ = this.className_ + '-layerbutton'

    /**
     * @type {ButtonBox}
     * @private
     */
    this.menu_ = new ButtonBox({
      element: this.get$Element(),
      className: this.getClassName(),
      title: this.getLocaliser().selectL10N(this.getTitle()),
      collapsible: this.collapsible_,
      collapsed: this.collapsed_
    })

    this.get$Element().append(this.menu_.get$Element())

    /**
     * @type {boolean}
     * @private
     */
    this.toggle_ = options.toggle || true

    /**
     * @type {number}
     * @private
     */
    this.minVisibleButtons_ = options.minVisibleEntries || 6

    /**
     * @type {boolean}
     * @private
     */
    this.visible_ = true
  }

  /**
   * @returns {boolean}
   */
  getCollapsible () {
    return this.collapsible_
  }

  /**
   * @returns {boolean}
   */
  getCollapsed () {
    return this.menu_.getCollapsed()
  }

  /**
   * @param {boolean} collapsed
   */
  setCollapsed (collapsed) {
    this.menu_.setCollapsed(collapsed)
  }

  /**
   * this method builds a button for a layer. It toggles visibility if you click on it
   * @param {ol.layer.Base} layer
   * @param {jQuery} $target
   */
  buildLayerButton (layer, $target) {
    this.loadProcessCount = this.loadProcessCount || {}
    if (layer.get('available')) {
      let layerSource = layer.getSource()
      let $button = $('<button class="' + this.classNameLayerButton_ + '"></button>')
        .html(layer.get('title'))
      let menuFunctions = new ButtonBox({className: this.classNameMenu_})

      $button.on('click', () => {
        if (this.toggle_) {
          layer.setVisible(!layer.getVisible())
        } else {
          layer.setVisible(true)
        }
      })

      if (layer.getVisible()) {
        menuFunctions.setActive($button, true)
      }

      layer.on('change:visible', () => {
        menuFunctions.setActive($button, layer.getVisible())
        if (!layer.getVisible()) {
          layer.resetLoadProcessCount()
          $button.removeClass('g4u-layer-loading')
        }
      })

      layerSource.on(['vectorloadstart', 'tileloadstart', 'imageloadstart'], () => {
        $button.addClass('g4u-layer-loading')
      })

      layerSource.on([
        'vectorloadend', 'vectorloaderror',
        'tileloadend', 'tileloaderror',
        'imageloadend', 'imageloaderror'], () => {
        if (layer.getLoadProcessCount() === 0) {
          $button.removeClass('g4u-layer-loading')
        }
      })
      $target.append($button)
    }
  }

  /**
   * builds a category button which collapses on click
   * @param {GroupLayer} layer
   * @param {jQuery} $target
   */
  buildCategoryButton (layer, $target) {
    let $newTarget = $target

    if (layer.get('available')) {
      let menu = new ButtonBox({
        className: this.classNameMenu_,
        title: this.getLocaliser().selectL10N(layer.get('title')),
        collapsed: !layer.getChildrenVisible() && (layer.get('collapsed') !== false)
      })

      $target.append(menu.get$Element())

      $newTarget = menu.get$Body()
    }

    for (let layer of layer.getLayers().getArray()) {
      this.chooseButtonBuilder(layer, $newTarget)
    }
  }

  /**
   * This method chooses the right builder function
   * @param {ol.layer.Base} layer
   * @param {jQuery} $target
   */
  chooseButtonBuilder (layer, $target) {
    if (layer instanceof GroupLayer) {
      this.buildCategoryButton(layer, $target)
    } else {
      this.buildLayerButton(layer, $target)
    }
  }

  /**
   * @param {G4UMap} map
   */
  setMap (map) {
    super.setMap(map)

    if (map) {
      this.layers_ = map.get(this.layerGroupName_).getLayers()
      if (this.layers_.getLength() >= this.minLayerAmount_) {
        let menuFunctions = new ButtonBox({ className: this.classNameMenu_ })
        for (let layer of this.layers_.getArray()) {
          this.chooseButtonBuilder(layer, this.menu_.get$Body())
        }
        menuFunctions.giveLastVisible(this.get$Element().children(':last-child').children(':last-child'))
      } else {
        this.setVisible(false)
      }
    }
  }

  /**
   * @param {boolean} visible
   */
  setVisible (visible) {
    this.get$Element().toggleClass(cssClasses.hidden, !visible)
    this.visible_ = visible
  }

  /**
   * @returns {boolean}
   */
  getVisible () {
    return this.visible_
  }

  /**
   * Returns true if the control is squeezable in the given dimension. Used by Positioning.
   * @param {string} dimension
   * @returns {boolean}
   */
  isSqueezable (dimension) {
    return dimension === 'height'
  }

  /**
   * Squeezes the control in the given dimenstion by the provided value. Used by Positioning
   * Returns the value the control could get squeezed by.
   * @param {string} dimension
   * @param {number} value
   * @returns {number}
   */
  squeezeBy (dimension, value) {
    if (dimension === 'height') {
      let $contentBox = this.get$Element().find(`.${this.getClassName()}-content`)
      let $buttons = $contentBox.find('button:visible')

      if ($buttons.length > 1) {
        let height = $contentBox.height()
        let buttonHeight = offset($buttons.eq(1), $buttons.eq(0)).top

        let newHeight = Math.max(buttonHeight * this.minVisibleButtons_, height - value)

        console.log(height)
        console.log(newHeight)

        if (height > newHeight) {
          $contentBox.css('max-height', newHeight)
          console.log('setted max-height')
          return height - newHeight
        }
      }
    }

    return 0
  }

  /**
   * Removes the squeeze. Used by Positioning.
   * @param {string} dimension
   */
  release (dimension) {
    if (dimension === 'height') {
      this.get$Element().find(`.${this.getClassName()}-content`).css('max-height', '')
    }
  }
}
