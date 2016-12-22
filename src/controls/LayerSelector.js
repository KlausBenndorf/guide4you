import $ from 'jquery'
import ol from 'openlayers'
import flatten from 'lodash/flatten'

import {GroupLayer} from '../layers/GroupLayer'
import {ButtonBox} from '../html/ButtonBox'
import {Control} from './Control'
import {offset} from '../utilities'
import {cssClasses} from '../globals'

import '../../less/layerselector.less'
import {ImageWMSSource} from '../sources/ImageWMSSource'

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
export class LayerSelector extends Control {
  /**
   * @param {LayerSelectorOptions} options
   */
  constructor (options = {}) {
    options.className = options.className || 'g4u-layerselector'
    options.element = $('<div>')[ 0 ]
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
     * classNames
     * @type {object.<string, string>}
     * @private
     */
    this.classNames_ = {
      menu: this.className_ + '-menu',
      layerButton: this.className_ + '-layerbutton'
    }

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

    /**
     * @type {Array}
     * @private
     */
    this.listenerKeys_ = []
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
      let $button = $('<button>')
        .addClass(this.classNames_.layerButton)
        .html(layer.get('title'))

      let activeClassName = this.classNames_.menu + '-active'

      $button.on('click', e => {
        console.log(e)
        if (this.toggle_) {
          layer.setVisible(!layer.getVisible())
        } else {
          layer.setVisible(true)
        }
      })

      if (layer.getVisible()) {
        $button.addClass(activeClassName)
      }

      this.listenerKeys_.push(
        layer.on('change:visible', () => {
          $button.toggleClass(activeClassName, layer.getVisible())
          if (!layer.getVisible()) {
            layer.resetLoadProcessCount()
            $button.removeClass('g4u-layer-loading')
          }
        }))

      this.listenerKeys_.push(
        layerSource.on([ 'vectorloadstart', 'tileloadstart', 'imageloadstart' ], () => {
          $button.addClass('g4u-layer-loading')
        }))

      this.listenerKeys_.push(
        layerSource.on([
          'vectorloadend', 'vectorloaderror',
          'tileloadend', 'tileloaderror',
          'imageloadend', 'imageloaderror' ], () => {
          if (layer.getLoadProcessCount() === 0) {
            $button.removeClass('g4u-layer-loading')
          }
        }))

      $target.append($button)
    }
  }

  /**
   * builds a category button which collapses on click
   * @param {GroupLayer} categoryLayer
   * @param {jQuery} $target
   */
  buildCategoryButton (categoryLayer, $target) {
    let $nextTarget = $target

    if (categoryLayer.get('available')) {
      let activateChildren = categoryLayer.get('activateChildren') !== false

      let menu = new ButtonBox({
        className: this.classNames_.menu,
        title: this.getLocaliser().selectL10N(categoryLayer.get('title')),
        titleButton: activateChildren,
        collapsed: !categoryLayer.countChildrenVisible() && (categoryLayer.get('collapsed') !== false)
      })

      let countChildren = categoryLayer.countChildren()
      let countVisibleChildren = categoryLayer.countChildrenVisible()

      let updateButtonActivities = () => {
        if (countVisibleChildren === 0) {
          menu.setCollapseButtonActive(false)
          if (activateChildren) {
            menu.setTitleButtonActive(false)
          }
        } else if (countVisibleChildren === countChildren) {
          menu.setCollapseButtonActive(true)
          if (activateChildren) {
            menu.setTitleButtonActive(true)
          }
        } else {
          menu.setCollapseButtonActive(true)
          if (activateChildren) {
            menu.setTitleButtonActive(false)
          }
        }
      }

      updateButtonActivities()

      let forEachChildLayer = childLayer => {
        this.listenerKeys_.push(
          childLayer.on([ 'change:visible', 'change:childVisible' ], e => {
            let changedLayer = e.child || childLayer

            if (changedLayer.getVisible()) {
              countVisibleChildren++
            } else {
              countVisibleChildren--
            }

            updateButtonActivities()
          }))
      }

      this.listenerKeys_.push(
        categoryLayer.getLayers().forEach(forEachChildLayer))

      this.listenerKeys_.push(
        categoryLayer.getLayers().on('add', e => forEachChildLayer(e.element)))

      menu.on('title:click', () => {
        let visible = countVisibleChildren < countChildren
        categoryLayer.recursiveForEach(childLayer => {
          if (!(childLayer instanceof GroupLayer)) {
            childLayer.setVisible(visible)
          }
        })
      })

      $target.append(menu.get$Element())

      $nextTarget = menu.get$Body()

      menu.on('change:collapsed', () => this.changed())
    }

    for (let childLayer of categoryLayer.getLayers().getArray()) {
      this.chooseButtonBuilder(childLayer, $nextTarget)
    }
  }

  buildWMSButton (wmsLayer, $target) {
    if (wmsLayer.get('available')) {
      let layerButtons = wmsLayer.get('buttons')

      class ActiveButtons {
        constructor () {
          this.buttons_ = []
        }

        isActive (button) {
          return this.buttons_.indexOf(button) > -1
        }

        add (button) {
          if (Array.isArray(button)) {
            for (let b of button) {
              this.add(b)
            }
          } else {
            if (!this.isActive(button)) {
              this.buttons_.push(button)
            }
          }
        }

        remove (button) {
          if (Array.isArray(button)) {
            for (let b of button) {
              this.remove(b)
            }
          } else {
            let index = this.buttons_.indexOf(button)
            if (index > -1) {
              this.buttons_.splice(index, 1)
            }
          }
        }

        clear () {
          this.buttons_ = []
        }

        getFlatProp (prop) {
          return flatten(this.buttons_.map(a => a[ prop ] || []))
        }

        count () {
          return this.buttons_.length
        }

        toggle (button, value) {
          if (value) {
            this.add(button)
          } else {
            this.remove(button)
          }
        }
      }

      let activeLayerButtons = new ActiveButtons()
      let updateLayersParam = () => {
        wmsLayer.getSource().updateParams({ LAYERS: activeLayerButtons.getFlatProp('LAYERS') })
      }

      let featureInfoCheckable = wmsLayer.getSource().isFeatureInfoCheckable()
      let activeQueryLayerButtons = new ActiveButtons()
      let updateQueryLayersParam = () => {
        let featureInfoParams
        if (featureInfoCheckable) {
          featureInfoParams = { QUERY_LAYERS: activeQueryLayerButtons.getFlatProp('QUERY_LAYERS') }
        } else {
          featureInfoParams = { QUERY_LAYERS: activeLayerButtons.getFlatProp('QUERY_LAYERS') }
        }
        wmsLayer.getSource().updateFeatureInfoParams(featureInfoParams)
      }

      if (layerButtons) {
        let menu = new ButtonBox({
          className: this.classNames_.menu,
          title: this.getLocaliser().selectL10N(wmsLayer.get('title')),
          titleButton: true,
          collapsed: wmsLayer.get('collapsed') !== false
        })

        $target.append(menu.get$Element())

        menu.on('change:collapsed', () => this.changed())

        let activeClassName = this.classNames_.menu + '-active'

        let $buttons = $()

        for (let layerButton of layerButtons) {
          let $button = $('<button>')
            .addClass(this.classNames_.layerButton)
            .html(this.getLocaliser().selectL10N(layerButton.title))
          let $checkbox = $('<input type="checkbox">')

          let buttonActive, checkboxActive

          buttonActive = active => {
            activeLayerButtons.toggle(layerButton, active)
            $button.toggleClass(activeClassName, active)

            if (!active && featureInfoCheckable) {
              checkboxActive(false)
            }

            if (activeLayerButtons.count() === 0) {
              wmsLayer.setVisible(false)
              menu.setCollapseButtonActive(false)
              menu.setTitleButtonActive(false)
            } else if (activeLayerButtons.count() === layerButtons.length) {
              wmsLayer.setVisible(true)
              menu.setCollapseButtonActive(true)
              menu.setTitleButtonActive(true)
            } else {
              wmsLayer.setVisible(true)
              menu.setCollapseButtonActive(true)
              menu.setTitleButtonActive(false)
            }

            updateLayersParam()
            updateQueryLayersParam()
          }

          checkboxActive = active => {
            activeQueryLayerButtons.toggle(layerButton, active)
            if (active && !activeLayerButtons.isActive(layerButton)) {
              buttonActive(true)
            }

            updateQueryLayersParam()
            $checkbox.prop('checked', active)
          }

          $button.on('click', () => buttonActive(!activeLayerButtons.isActive(layerButton)))

          if (featureInfoCheckable) {
            $button.append($checkbox)
            $checkbox.on('click', e => {
              checkboxActive($checkbox.is(':checked'))
              e.stopPropagation()
            })
          }

          $buttons = $buttons.add($button)
          menu.get$Body().append($button)
        }

        menu.on('title:click', () => {
          let activateAll = activeLayerButtons.count() < layerButtons.length
          if (activateAll) {
            activeLayerButtons.add(layerButtons)
          } else {
            activeLayerButtons.clear()
            if (featureInfoCheckable) {
              activeQueryLayerButtons.clear()
              $buttons.find('input[type=checkbox]').prop('checked', false)
            }
          }

          $buttons.toggleClass(activeClassName, activateAll)
          wmsLayer.setVisible(activateAll)
          menu.setCollapseButtonActive(activateAll)
          menu.setTitleButtonActive(activateAll)

          updateLayersParam()
        })
      } else {
        this.buildLayerButton(wmsLayer, $target)
      }
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
    } else if (layer.getSource().isFeatureInfoCheckable) {
      this.buildWMSButton(layer, $target)
    } else {
      this.buildLayerButton(layer, $target)
    }
  }

  /**
   * @param {G4UMap} map
   */
  setMap (map) {
    if (this.getMap()) {
      ol.Observable.unByKey(this.listenerKeys_)
    }

    super.setMap(map)

    if (map) {
      this.layers_ = map.get(this.layerGroupName_).getLayers()
      if (this.layers_.getLength() >= this.minLayerAmount_) {
        let menuFunctions = new ButtonBox({ className: this.classNames_.menu })
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

        if (height > newHeight) {
          $contentBox.css('max-height', newHeight)
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
