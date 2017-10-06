import $ from 'jquery'

import { GroupLayer } from '../layers/GroupLayer'
import { ButtonBox } from '../html/ButtonBox'
import { Control } from './Control'
import { offset, mixin } from '../utilities'
import { Window } from '../html/Window'

import '../../less/layerselector.less'
import { ListenerOrganizerMixin } from '../ListenerOrganizerMixin'
import { URL } from '../URLHelper'

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
export class LayerSelector extends mixin(Control, ListenerOrganizerMixin) {
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
     * classNames
     * @type {object.<string, string>}
     * @protected
     */
    this.classNames_ = {
      menu: this.getClassName() + '-menu',
      layerButton: this.getClassName() + '-layerbutton',
      active: this.getClassName() + '-active',
      checkbox: this.getClassName() + '-checkbox'
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

    this.menu_.on('change:collapsed', () => this.dispatchEvent('change:size'))

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
    this.minVisibleButtons_ = options.minVisibleEntries || 5

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
  setCollapsed (collapsed, silent) {
    if (collapsed !== this.menu_.getCollapsed()) {
      this.menu_.setCollapsed(collapsed, silent)
    }
  }

  addWindowToButton ($button, layer) {
    let windowConfig = layer.get('window')

    let window = new Window({
      map: this.getMap()
    })

    if (!this.$windowContainer_) {
      this.$windowContainer_ = $('<span>')
      this.get$Element().append(this.$windowContainer_)
    }

    this.$windowContainer_.append(window.get$Element())

    window.get$Element().attr('data-layer-0', layer.get('id'))

    let content

    let showWindow = () => {
      if (this.getMap().get('localiser').isRtl()) {
        window.get$Body().prop('dir', 'rtl')
      } else {
        window.get$Body().prop('dir', undefined)
      }
      window.get$Body().html(content)
      window.setVisible(true)
    }

    let hideWindow = () => {
      window.setVisible(false)
    }

    this.listenAt($button).on('click', () => {
      if (layer.getVisible()) {
        if (!content) {
          let url = URL.extractFromConfig(this.getMap(), windowConfig, 'url')
          $.get(url.finalize(), data => {
            content = data
            showWindow()
          })
        } else {
          showWindow()
        }
      } else {
        hideWindow()
      }
    })
  }

  /**
   * this method builds a button for a layer. It toggles visibility if you click on it
   * @param {ol.layer.Base} layer
   * @param {jQuery} $target
   */
  buildLayerButton (layer, $target) {
    if (layer.get('available')) {
      let $button = $('<button>')
        .addClass(this.classNames_.layerButton)
        .attr('id', layer.get('id'))
        .html(layer.get('title'))

      if (this.getMap().get('localiser').isRtl()) {
        $button.prop('dir', 'rtl')
      }

      let activeClassName = this.classNames_.menu + '-active'

      this.listenAt($button).on('click', () => {
        if (this.toggle_) {
          layer.setVisible(!layer.getVisible())
        } else {
          layer.setVisible(true)
        }
        this.dispatchEvent({
          type: 'click:layer',
          layer: layer
        })
      })

      if (layer.getVisible()) {
        $button.addClass(activeClassName)
      }

      this.listenAt(layer).on('change:visible', () => {
        $button.toggleClass(activeClassName, layer.getVisible())
        if (!layer.getVisible()) {
          $button.removeClass('g4u-layer-loading')
        }
      })

      if (layer.get('window')) {
        this.addWindowToButton($button, layer)
      }

      this.listenAt(layer).on('loadcountstart', () => {
        $button.addClass('g4u-layer-loading')
      })

      this.listenAt(layer).on('loadcountend', () => {
        $button.removeClass('g4u-layer-loading')
      })

      $target.append($button)

      return $button
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
        rtl: this.getMap().get('localiser').isRtl(),
        titleButton: activateChildren,
        collapsed: !categoryLayer.countChildrenVisible() && (categoryLayer.get('collapsed') !== false),
        id: categoryLayer.get('id')
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
        this.listenAt(childLayer)
          .on(['change:visible', 'change:childVisible'], e => {
            let changedLayer = e.child || childLayer

            if (changedLayer.getVisible()) {
              countVisibleChildren++
            } else {
              countVisibleChildren--
            }

            updateButtonActivities()
          })
      }

      categoryLayer.getLayers().forEach(forEachChildLayer)

      this.listenAt(categoryLayer.getLayers())
        .on('add', e => forEachChildLayer(e.element))

      this.listenAt(menu)
        .on('title:click', () => {
          let visible = countVisibleChildren < countChildren
          categoryLayer.recursiveForEach(childLayer => {
            if (!(childLayer instanceof GroupLayer)) {
              childLayer.setVisible(visible)
            }
          })
          this.dispatchEvent({
            type: 'click:layer',
            layer: categoryLayer
          })
        })

      $target.append(menu.get$Element())

      $nextTarget = menu.get$Body()

      this.listenAt(menu)
        .on('change:collapsed', () => {
          this.dispatchEvent('change:size')
          this.changed()
        })

      for (let childLayer of categoryLayer.getLayers().getArray()) {
        this.chooseButtonBuilder(childLayer, $nextTarget)
      }

      return menu
    } else {
      for (let childLayer of categoryLayer.getLayers().getArray()) {
        this.chooseButtonBuilder(childLayer, $nextTarget)
      }
    }
  }

  buildWMSButton (wmsLayer, $target) {
    if (wmsLayer.get('available')) {
      let layerButtons = wmsLayer.get('buttons')

      if (layerButtons && layerButtons.length) {
        let countActiveButtons = 0
        let wmsSource = wmsLayer.getSource()

        let allLayersParams = []
        let allQueryLayersParams = []

        let featureInfoCheckable = wmsSource.isFeatureInfoCheckable()

        let menu = new ButtonBox({
          className: this.classNames_.menu,
          title: this.getLocaliser().selectL10N(wmsLayer.get('title')),
          titleButton: true,
          collapsed: wmsLayer.get('collapsed') !== false,
          id: wmsLayer.get('id')
        })

        $target.append(menu.get$Element())

        this.listenAt(menu)
          .on('change:collapsed', () => {
            this.dispatchEvent('change:size')
            this.changed()
          })

        let activeClassName = this.classNames_.menu + '-active'

        for (let layerButton of layerButtons) {
          allLayersParams = allLayersParams.concat(layerButton.LAYERS)
          allQueryLayersParams = allQueryLayersParams.concat(layerButton.QUERY_LAYERS)

          let $button = $('<button>')
            .addClass(this.classNames_.layerButton)
            .html(this.getLocaliser().selectL10N(layerButton.title))
          let $checkbox = $('<input type="checkbox">')
            .addClass(this.classNames_.checkbox)

          menu.get$Body().append($button)

          let toggleButtonActive, setCheckboxActive

          toggleButtonActive = () => {
            let active = !wmsSource.getWMSLayersVisible(layerButton.LAYERS)

            if (active) {
              countActiveButtons++
            } else {
              countActiveButtons--
            }

            $button.toggleClass(activeClassName, active)

            wmsSource.toggleWMSLayers(layerButton.LAYERS, active)

            if (!active && featureInfoCheckable) {
              setCheckboxActive(false)
            }

            if (countActiveButtons === 0) {
              wmsLayer.setVisible(false)
              menu.setCollapseButtonActive(false)
              menu.setTitleButtonActive(false)
            } else if (countActiveButtons === layerButtons.length) {
              wmsLayer.setVisible(true)
              menu.setCollapseButtonActive(true)
              menu.setTitleButtonActive(true)
            } else {
              wmsLayer.setVisible(true)
              menu.setCollapseButtonActive(true)
              menu.setTitleButtonActive(false)
            }
            this.dispatchEvent({
              type: 'click:layer',
              layer: wmsLayer,
              wmsLayer: true
            })
          }

          setCheckboxActive = checkboxActive => {
            if (checkboxActive && !wmsSource.getWMSLayersVisible(layerButton.LAYERS)) {
              toggleButtonActive()
            }
            wmsSource.toggleWMSQueryLayers(layerButton.QUERY_LAYERS, checkboxActive)
            $checkbox.prop('checked', checkboxActive)
          }

          this.listenAt($button)
            .on('click', () => {
              toggleButtonActive()
            })

          if (featureInfoCheckable) {
            $button.append($checkbox)
            this.listenAt($checkbox).on('click', e => {
              setCheckboxActive($checkbox.is(':checked'))
              e.stopPropagation()
            })
          }
        }

        this.listenAt(menu).on('title:click', () => {
          let activateAll = countActiveButtons < layerButtons.length
          if (activateAll) {
            wmsSource.toggleWMSLayers(allLayersParams, true)
            countActiveButtons = layerButtons.length
          } else {
            wmsSource.toggleWMSLayers(allLayersParams, false)
            if (featureInfoCheckable) {
              wmsSource.toggleWMSQueryLayers(allQueryLayersParams, false)
              menu.get$Body().find('input[type=checkbox]').prop('checked', false)
            }
            countActiveButtons = 0
          }

          menu.get$Body().find('button').toggleClass(activeClassName, activateAll)
          wmsLayer.setVisible(activateAll)
          menu.setCollapseButtonActive(activateAll)
          menu.setTitleButtonActive(activateAll)

          this.dispatchEvent({
            type: 'click:category',
            layer: wmsLayer,
            wmsLayer: true
          })
        })

        return menu
      } else {
        return this.buildLayerButton(wmsLayer, $target)
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
      return this.buildCategoryButton(layer, $target)
    } else if (layer.getSource && layer.getSource() && layer.getSource().isFeatureInfoCheckable) {
      return this.buildWMSButton(layer, $target)
    } else {
      return this.buildLayerButton(layer, $target)
    }
  }

  /**
   * @param {G4UMap} map
   */
  setMap (map) {
    if (this.getMap()) {
      this.clear()
    }

    super.setMap(map)

    if (map) {
      this.build()
    }
  }

  clear () {
    this.detachAllListeners()
    this.menu_.get$Body().empty()
  }

  build () {
    this.layers_ = this.getMap().get(this.layerGroupName_).getLayers()
    if (this.layers_.getLength() >= this.minLayerAmount_) {
      this.setVisible(true)
      let menuFunctions = new ButtonBox({className: this.classNames_.menu})
      for (let layer of this.layers_.getArray()) {
        this.chooseButtonBuilder(layer, this.menu_.get$Body())
      }
      menuFunctions.giveLastVisible(this.get$Element().children(':last-child').children(':last-child'))
      this.listenAt(this.menu_).on('change:collapsed', () => this.dispatchEvent('change:size'))
    } else {
      this.setVisible(false)
    }
  }

  rebuild () {
    this.clear()
    this.build()
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
   * Squeezes the control in the given dimension by the provided value. Used by Positioning
   * Returns the value the control could get squeezed by.
   * @param {string} dimension
   * @param {number} value
   * @returns {number}
   */
  squeezeBy (dimension, value) {
    if (dimension === 'height') {
      let $contentBox = this.get$Element().find(`.${this.getClassName()}-content`)
      let $buttons = $contentBox.find('button:visible')
        .filter(`.${this.getClassName()}-layerbutton,.${this.getClassName()}-menu-titlebutton`)

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

  beforePositioning () {
    this.scrolled_ = this.menu_.get$Body().scrollTop()
  }

  /**
   * used by positioning
   * @param {{scroll: number}} state
   */
  afterPositioning () {
    this.menu_.get$Body().scrollTop(this.scrolled_)
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
