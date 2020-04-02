import $ from 'jquery'

import { GroupLayer } from '../layers/GroupLayer'
import { ButtonBox } from '../html/ButtonBox'
import { Control } from './Control'
import { offset, mixin } from '../utilities'
import { Window } from '../html/Window'

import '../../less/layerselector.less'
import { ListenerOrganizerMixin } from '../ListenerOrganizerMixin'
import { URL } from '../URLHelper'
import { addTooltip, changeTooltip } from '../html/html'

/**
 * @typedef {g4uControlOptions} LayerSelectorOptions
 * @property {boolean} [collapsible=true] if the menu should be collapsible
 * @property {boolean} [collapsed=false] if the menu starts collapsed
 * @property {number} [minVisibleEntries=6] amount of minimal visible elements
 * @property {string} layerGroupName the name of the layerGroup this selector is connected to. For example 'baseLayers'
 * @property {number} [minLayerAmount=1] the minimum number of layers which should be visible to show this selector
 */

/**
 * @typedef {object} LayerButton
 * @property {string} title
 * @property {boolean} [checked] if QUERY_LAYERS are set and checked is true, the featureInfo appears turned on.
 * @property {string[]} LAYERS
 * @property {string[]} [QUERY_LAYERS]
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
      featureInfo: this.getClassName() + '-info',
      featureInfoActive: this.getClassName() + '-info-active',
      disabled: this.getClassName() + '-disabled'
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
   * @param {boolean} silent
   */
  setCollapsed (collapsed, silent) {
    if (collapsed !== this.menu_.getCollapsed()) {
      this.menu_.setCollapsed(collapsed, silent)
    }
  }

  addWindowToButton ($button, layer) {
    const windowConfig = layer.get('window')

    const window = new Window({
      parentClassName: this.getClassName(),
      map: this.getMap()
    })

    if (layer.get('addClass')) {
      window.get$Element().addClass(layer.get('addClass'))
    }

    let content

    const showWindow = () => {
      if (this.getMap().get('localiser').isRtl()) {
        window.get$Body().prop('dir', 'rtl')
      } else {
        window.get$Body().prop('dir', undefined)
      }
      window.get$Body().html(content)
      window.setVisible(true)
    }

    const hideWindow = () => {
      window.setVisible(false)
    }

    this.listenAt($button).on('click', () => {
      if (layer.getVisible()) {
        if (!content) {
          const url = URL.extractFromConfig(windowConfig, 'url', undefined, this.getMap())
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

  updateDisabledButtons () {
    this.dispatchEvent('update:disabled')
  }

  /**
   * this method builds a button for a layer. It toggles visibility if you click on it
   * @param {ol.layer.Base} layer
   * @param {jQuery} $target
   */
  buildLayerButton (layer, $target) {
    if (layer.get('available')) {
      const $button = $('<button>')
        .addClass(this.classNames_.layerButton)
        .attr('id', layer.get('id'))
        .html(layer.get('title'))

      if (layer.get('addClass')) {
        $button.addClass(layer.get('addClass'))
      }

      if (layer.get('disabled')) {
        $button.addClass(this.classNames_.disabled)
      }

      this.on('update:disabled', () => {
        $button.toggleClass(this.classNames_.disabled, layer.get('disabled'))
      })

      if (this.getMap().get('localiser').isRtl()) {
        $button.prop('dir', 'rtl')
      }

      const activeClassName = this.classNames_.menu + '-active'

      this.listenAt($button).on('click', () => {
        layer.setVisible(!layer.getVisible())
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
      const activateChildren = categoryLayer.get('activateChildren') !== false

      let collapsed = categoryLayer.get('collapsed')
      if (collapsed === undefined) {
        collapsed = !categoryLayer.countChildrenVisible() && (categoryLayer.get('collapsed') !== false)
        categoryLayer.set('collapsed', collapsed)
      }

      const menu = new ButtonBox({
        className: this.classNames_.menu,
        title: this.getLocaliser().selectL10N(categoryLayer.get('title')),
        rtl: this.getMap().get('localiser').isRtl(),
        titleButton: activateChildren,
        collapsed,
        id: categoryLayer.get('id'),
        addClass: categoryLayer.get('addClass')
      })

      const countChildren = categoryLayer.countChildren()
      let countVisibleChildren = categoryLayer.countChildrenVisible()

      const updateButtonActivities = () => {
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

      const forEachChildLayer = childLayer => {
        this.listenAt(childLayer)
          .on(['change:visible', 'change:childVisible'], e => {
            const changedLayer = e.child || childLayer

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
          const visible = countVisibleChildren < countChildren
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
          categoryLayer.set('collapsed', menu.getCollapsed())
          this.dispatchEvent('change:size')
          this.changed()
        })

      for (const childLayer of categoryLayer.getLayers().getArray()) {
        this.chooseButtonBuilder(childLayer, $nextTarget)
      }

      return menu
    } else {
      for (const childLayer of categoryLayer.getLayers().getArray()) {
        this.chooseButtonBuilder(childLayer, $nextTarget)
      }
    }
  }

  buildWMSButton (wmsLayer, $target) {
    if (wmsLayer.get('available')) {
      const layerButtons = wmsLayer.get('buttons')

      if (layerButtons && layerButtons.length) {
        let countActiveButtons = 0
        const wmsSource = wmsLayer.getSource()

        let allLayersParams = []
        let allQueryLayersParams = []

        const featureInfoCheckable = wmsSource.isFeatureInfoCheckable()

        let menu
        if (layerButtons.length > 1) {
          menu = new ButtonBox({
            className: this.classNames_.menu,
            title: this.getLocaliser().selectL10N(wmsLayer.get('title')),
            titleButton: true,
            collapsed: wmsLayer.get('collapsed') !== false,
            id: wmsLayer.get('id'),
            addClass: wmsLayer.get('addClass')
          })

          $target.append(menu.get$Element())

          this.listenAt(menu)
            .on('change:collapsed', () => {
              this.dispatchEvent('change:size')
              this.changed()
            })

          $target = menu.get$Body()
        }

        const activeClassName = this.classNames_.menu + '-active'

        for (const layerButton of layerButtons) {
          allLayersParams = allLayersParams.concat(layerButton.LAYERS)
          allQueryLayersParams = allQueryLayersParams.concat(layerButton.QUERY_LAYERS)

          const $button = $('<span>')
            .addClass(this.classNames_.layerButton)
            .addClass('button')
            .html(this.getLocaliser().selectL10N(layerButton.title))
          const $toggleFeatureInfo = $('<span>')
            .addClass(this.classNames_.featureInfo)
          addTooltip($toggleFeatureInfo,
            this.getLocaliser().localiseUsingDictionary('LayerSelector featureInfo show'))

          if (wmsLayer.get('disabled')) {
            $button.addClass(this.classNames_.disabled)
          }

          this.on('update:disabled', () => {
            $button.toggleClass(this.classNames_.disabled, wmsLayer.get('disabled'))
          })

          $target.append($button)

          const toggleButtonActive = () => {
            const active = !wmsSource.getWMSLayersVisible(layerButton.LAYERS)

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

            if (active && layerButton.checked) {
              setCheckboxActive(true)
            }

            if (countActiveButtons === 0) {
              wmsLayer.setVisible(false)
              if (menu) {
                menu.setCollapseButtonActive(false)
                menu.setTitleButtonActive(false)
              }
            } else if (countActiveButtons === layerButtons.length) {
              wmsLayer.setVisible(true)
              if (menu) {
                menu.setCollapseButtonActive(true)
                menu.setTitleButtonActive(true)
              }
            } else {
              wmsLayer.setVisible(true)
              if (menu) {
                menu.setCollapseButtonActive(true)
                menu.setTitleButtonActive(false)
              }
            }
            this.dispatchEvent({
              type: 'click:layer',
              layer: wmsLayer,
              wmsLayer: true
            })
          }

          const setCheckboxActive = checkboxActive => {
            if (checkboxActive && !wmsSource.getWMSLayersVisible(layerButton.LAYERS)) {
              toggleButtonActive()
            }
            wmsSource.toggleWMSQueryLayers(layerButton.QUERY_LAYERS, checkboxActive)
            $toggleFeatureInfo.toggleClass(this.classNames_.featureInfoActive, checkboxActive)
            if (checkboxActive) {
              changeTooltip($toggleFeatureInfo,
                this.getLocaliser().localiseUsingDictionary('LayerSelector featureInfo hide'))
            } else {
              changeTooltip($toggleFeatureInfo,
                this.getLocaliser().localiseUsingDictionary('LayerSelector featureInfo show'))
            }
          }

          if (wmsLayer.getVisible()) {
            toggleButtonActive()
          }

          this.listenAt($button)
            .on('click', () => {
              toggleButtonActive()
            })

          if (featureInfoCheckable) {
            $button.append($toggleFeatureInfo)
            this.listenAt($toggleFeatureInfo).on('click', e => {
              setCheckboxActive(!$toggleFeatureInfo.hasClass(this.classNames_.featureInfoActive))
              e.stopPropagation()
            })
          }

          if (layerButtons.length === 1) {
            this.listenAt(wmsLayer).on('loadcountstart', () => {
              $button.addClass('g4u-layer-loading')
            })

            this.listenAt(wmsLayer).on('loadcountend', () => {
              $button.removeClass('g4u-layer-loading')
            })
          }
        }

        if (menu) {
          this.listenAt(menu).on('title:click', () => {
            const activateAll = countActiveButtons < layerButtons.length
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

          this.listenAt(wmsLayer).on('loadcountstart', () => {
            menu.get$Element().addClass('g4u-layer-loading')
          })

          this.listenAt(wmsLayer).on('loadcountend', () => {
            menu.get$Element().removeClass('g4u-layer-loading')
          })

          return menu
        }
      } else {
        const wmsSource = wmsLayer.getSource()
        const featureInfoCheckable = wmsSource.isFeatureInfoCheckable()

        const activeClassName = this.classNames_.menu + '-active'

        const $button = $('<span>')
          .addClass(this.classNames_.layerButton)
          .addClass('button')
          .html(this.getLocaliser().selectL10N(wmsLayer.get('title')))

        if (wmsLayer.get('addClass')) {
          $button.addClass(wmsLayer.get('addClass'))
        }

        if (wmsLayer.get('disabled')) {
          $button.addClass(this.classNames_.disabled)
        }

        this.on('update:disabled', () => {
          $button.toggleClass(this.classNames_.disabled, wmsLayer.get('disabled'))
        })

        const $toggleFeatureInfo = $('<span>')
          .addClass(this.classNames_.featureInfo)
        addTooltip($toggleFeatureInfo,
          this.getLocaliser().localiseUsingDictionary('LayerSelector featureInfo show'))

        $target.append($button)

        const toggleButtonActive = () => {
          const active = !wmsLayer.getVisible()
          wmsLayer.setVisible(active)
          $button.toggleClass(activeClassName, active)

          if (!active && featureInfoCheckable) {
            setCheckboxActive(false)
          }

          if (active && wmsSource.isFeatureInfoChecked()) {
            setCheckboxActive(true)
          }

          this.dispatchEvent({
            type: 'click:layer',
            layer: wmsLayer,
            wmsLayer: true
          })
        }

        const featureInfoParams = wmsSource.getFeatureInfoParams()

        const setCheckboxActive = checkboxActive => {
          if (checkboxActive && !wmsLayer.getVisible()) {
            toggleButtonActive()
          }
          wmsSource.toggleWMSQueryLayers(featureInfoParams.QUERY_LAYERS, checkboxActive)
          $toggleFeatureInfo.toggleClass(this.classNames_.featureInfoActive, checkboxActive)
          if (checkboxActive) {
            changeTooltip($toggleFeatureInfo,
              this.getLocaliser().localiseUsingDictionary('LayerSelector featureInfo hide'))
          } else {
            changeTooltip($toggleFeatureInfo,
              this.getLocaliser().localiseUsingDictionary('LayerSelector featureInfo show'))
          }
        }

        this.listenAt($button)
          .on('click touchstart', () => {
            toggleButtonActive()
            this.dispatchEvent({
              type: 'click:layer',
              layer: wmsLayer,
              wmsLayer: true
            })
          })

        this.listenAt(wmsLayer).on('change:visible', () => {
          $button.toggleClass(activeClassName, wmsLayer.getVisible())
        })

        if (wmsLayer.get('window')) {
          this.addWindowToButton($button, wmsLayer)
        }

        if (featureInfoCheckable) {
          $button.append($toggleFeatureInfo)
          this.listenAt($toggleFeatureInfo).on('click touchstart', e => {
            setCheckboxActive(!$toggleFeatureInfo.hasClass(this.classNames_.featureInfoActive))
            e.stopPropagation()
          })
        }

        this.listenAt(wmsLayer).on('loadcountstart', () => {
          $button.addClass('g4u-layer-loading')
        })

        this.listenAt(wmsLayer).on('loadcountend', () => {
          $button.removeClass('g4u-layer-loading')
        })
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

  clear () {
    this.detachAllListeners()
    this.menu_.get$Body().empty()
  }

  build () {
    this.layers_ = this.getMap().get(this.layerGroupName_).getLayers()
    if (this.layers_.getLength() >= this.minLayerAmount_) {
      this.setVisible(true)
      const menuFunctions = new ButtonBox({ className: this.classNames_.menu })
      for (const layer of this.layers_.getArray()) {
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
      const $contentBox = this.get$Element().find(`.${this.getClassName()}-content`)
      const $buttons = $contentBox.find('button:visible')
        .filter(`.${this.getClassName()}-layerbutton,.${this.getClassName()}-menu-titlebutton`)

      if ($buttons.length > 1) {
        const height = $contentBox.height()
        const buttonHeight = offset($buttons.eq(1), $buttons.eq(0)).top

        const newHeight = Math.max(buttonHeight * this.minVisibleButtons_, height - value)

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
