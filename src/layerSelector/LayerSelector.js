import $ from 'jquery'
import { Control } from '../controls/Control'
import { Debug } from '../Debug'
import { ButtonBox } from '../html/ButtonBox'
import { addTooltip, changeTooltip } from '../html/html'
import { ListenerOrganizerMixin } from '../ListenerOrganizerMixin'
import { mixin, offset } from '../utilities'
import { isObject, isArray } from 'lodash/lang'

import '../../less/layerselector.less'
import { LayerSelectorAccordionMenu } from './LayerSelectorAccordionMenu'

/**
 * @typedef {g4uControlOptions} LayerSelectorOptions
 * @property {boolean} [collapsible=true] if the menu should be collapsible
 * @property {boolean} [collapsed=false] if the menu starts collapsed
 * @property {number} [minVisibleEntries=6] amount of minimal visible elements
 * @property {string} menuName the name of the layerMenu this selector is connected to. For example 'baseLayers'
 * @property {number} [minLayerAmount=1] the minimum number of layers which should be visible to show this selector
 * @property {LayerController} layerController the layerController will be passed in by the UIConfigurator
 */

/**
 * @typedef {object} ButtonConfig
 * @property {object} [window] open a window if the button gets clicked
 * @property {string} [class] add a css class to the button
 * @property {[]} [context] contextmenu items
 */

/**
 * @typedef {ButtonConfig} LayerButtonConfig
 * @property {"layer"} type
 * @property {Localizable} [title] if not set, the title of the layer will be chosen
 * @property {string|number} refId the id of the layer
 * @property {string} exclusive all layers with the same exclusive value are mutually exclusive active
 */

/**
 * @typedef {ButtonConfig} WMSLayerButtonConfig
 * @property {"WMS"} type
 * @property {Localizable} title
 * @property {string|number} refId the id of the layer
 * @property {string[]} LAYERS
 * @property {string[]} [QUERY_LAYERS]
 * @property {boolean} [checked] if QUERY_LAYERS are set and checked is true, the featureInfo appears turned on.
 */

/**
 * @typedef {ButtonConfig} GroupButtonConfig
 * @property {"group"} type
 * @property {Localizable} title
 * @property {string} [groupButton="onlyMenu"] can be "noButton", "onlyMenu" or "activate"
 *    "noButton": the group itself will have no button, the contained buttons are displayed on the same level
 *    "onlyMenu": the group has a button which can be clicked to open/close the submenu with the contained layers
 *    "activate": the group has 2 buttons. One will open/close the submenu, the other will de-/activate all layers
 * @property {string} [items="normal"] can be "normal" or "exclusive"
 *    "normal": all contained layers can be activated independently
 *    "exclusive": activating one layer in this group will deactivate the others.
 * @property {boolean} [unselectable=true] specifies if a button can be unselected
 * @property {boolean} [collapsible=true]
 * @property {boolean} [collapsed=true]
  */

/**
 * @typedef {object} ButtonActions
 * @property toggleActive
 * @property toggleDisabled
 * @property toggleLoading
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
     * @type {string}
     * @private
     */
    this.menuName_ = options.menuName

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
      disabled: this.getClassName() + '-disabled',
      spacer: this.getClassName() + '-spacer',
      checkbox: this.getClassName() + '-checkbox',
      radio: this.getClassName() + '-radio'
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

    this.listenAt(this.menu_).on('change:collapsed', () => this.dispatchEvent('change:size'))

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
   * @param {G4UMap} map
   */
  setMap (map) {
    if (this.getMap()) {
      this.clear()
    }

    super.setMap(map)

    if (map) {
      /**
       * @type {LayerController}
       * @private
       */
      this.layerController_ = map.get('layerController')
      this.build()
    }
  }

  clear () {
    this.detachAllListeners()
    this.menu_.get$Body().empty()
  }

  build () {
    const menuConfig = this.layerController_.getMenuConfig(this.menuName_)
    let count = 0
    if (isArray(menuConfig)) {
      for (const buttonConfig of menuConfig) {
        count += this.chooseButtonBuilder(buttonConfig, this.menu_.get$Body()).count()
      }
    } else if (isObject(menuConfig)) {
      count += this.chooseButtonBuilder(menuConfig, this.menu_.get$Body()).count()
    }

    if (count < this.minLayerAmount_) {
      this.setVisible(false)
    }
  }

  /**
   * This method chooses the right builder function. Intended to be overwritten for special button types
   * @param {ButtonConfig} buttonConfig
   * @param {jQuery} $target
   * @param {GroupButtonController} [group]
   */
  chooseButtonBuilder (buttonConfig, $target, group) {
    if (buttonConfig.type === 'group') {
      return this.buildGroupButton(buttonConfig, $target, group)
    } else if (buttonConfig.type === 'WMS') {
      return this.buildWMSButton(buttonConfig, $target, group)
    } else if (buttonConfig.type === 'layer') {
      return this.buildLayerButton(buttonConfig, $target, group)
    } else if (buttonConfig.type === 'multi') {
      return this.buildMultiControl(buttonConfig, $target, group)
    } else {
      Debug.error(`Unknown button type '${buttonConfig.type}'`)
    }
  }

  /**
   * this method builds a button for a layer. It toggles visibility if you click on it
   * @param {ButtonConfig} buttonConfig
   */
  buildBasicButton (title, buttonConfig, controller, $target) {
    let $button = $('<span>')
      .addClass('button')
      .addClass(this.classNames_.layerButton)

    if (buttonConfig.refId) {
      $button.attr('id', buttonConfig.refId)
    }

    if (buttonConfig.hasOwnProperty('class')) {
      $button.addClass(buttonConfig.class)
    }

    if (this.getMap().get('localiser').isRtl()) {
      $button.prop('dir', 'rtl')
    }

    $button.html(title)
    const $wrap = $('<div>')
      .addClass('g4u-layerselector-button-frame')
      .append($button)

    $target.append($wrap)

    if (buttonConfig.context) {
      const context = new LayerSelectorAccordionMenu(buttonConfig.context, this.getLocaliser(), controller)
      context.appendTo($wrap)
    }

    if (buttonConfig.hasOwnProperty('window')) {
      this.addWindowToButton($button, buttonConfig) // TODO: add method to class
    }

    return $button
  }

  buildLayerButton (buttonConfig, $target, group) {
    const layer = this.layerController_.getLayer(buttonConfig.refId)
    if (layer && layer.get('available')) {
      const buttonController = this.layerController_.registerLayerButton(buttonConfig, group)

      const $button = this.buildBasicButton(buttonConfig.title ? buttonConfig.title : layer.get('title'),
        buttonConfig, buttonController, $target)

      let activeClassName = this.classNames_.menu + '-active'

      $button.toggleClass(activeClassName, buttonController.getActive())
      $button.toggleClass('g4u-layer-loading', buttonController.getLoading())
      $button.toggleClass(this.classNames_.disabled, buttonController.getDisabled())

      this.listenAt(buttonController).on('change:active', () => {
        $button.toggleClass(activeClassName, buttonController.getActive())
      })
      this.listenAt(buttonController).on('change:loading', () => {
        $button.toggleClass('g4u-layer-loading', buttonController.getLoading())
      })
      this.listenAt(buttonController).on('change:disabled', () => {
        $button.toggleClass(this.classNames_.disabled, buttonController.getDisabled())
      })

      this.listenAt($button).on('click', () => {
        buttonController.toggleActive()
      })

      return buttonController
    }
  }

  buildGroupButton (buttonConfig, $target, group) {
    // TODO: available for group buttons

    const groupController = this.layerController_.registerGroupButton(buttonConfig, group)

    if (buttonConfig.hasOwnProperty('groupButton') && buttonConfig.groupButton === 'noButton') {
      for (const childConfig of buttonConfig.buttons) {
        this.chooseButtonBuilder(childConfig, $target, groupController)
      }
    } else {
      const activateChildren = buttonConfig.hasOwnProperty('groupButton') && buttonConfig.groupButton === 'activate'
      // TODO: where is categoryLayer.get('collapsed') used (or 'change:collapsed')

      const menu = new ButtonBox({
        className: this.classNames_.menu,
        title: this.getLocaliser().selectL10N(buttonConfig.title),
        rtl: this.getMap().get('localiser').isRtl(),
        titleButton: activateChildren,
        collapsed: buttonConfig.collapsed !== false,
        addClass: buttonConfig.addClass
      })

      this.listenAt(menu).on('change:collapsed', () => {
        this.dispatchEvent('change:size')
      })

      const updateMenu = () => {
        menu.setCollapseButtonActive(groupController.getActive())
        if (activateChildren) {
          menu.setTitleButtonActive(groupController.getAllActive())
        }
      }

      this.listenAt(groupController).on('change:active', updateMenu)

      // TODO: menu set disabled ?

      $target.append(menu.get$Element())

      for (const childConfig of buttonConfig.buttons) {
        this.chooseButtonBuilder(childConfig, menu.get$Body(), groupController)
      }

      updateMenu()
    }

    return groupController
  }

  buildWMSButton (buttonConfig, $target, group) {
    const layer = this.layerController_.getLayer(buttonConfig.refId)
    if (layer && layer.get('available')) {
      const buttonController = this.layerController_.registerWmsLayerButton(buttonConfig, group)

      const $button = this.buildBasicButton(buttonConfig.title ? buttonConfig.title : layer.get('title'),
        buttonConfig, buttonController, $target)

      let $toggleFeatureInfo = $('<span>')
        .addClass(this.classNames_.featureInfo)
      addTooltip($toggleFeatureInfo,
        this.getLocaliser().localiseUsingDictionary('LayerSelector featureInfo show'))

      let activeClassName = this.classNames_.menu + '-active'

      $button.toggleClass(activeClassName, buttonController.getActive())
      $button.toggleClass('g4u-layer-loading', buttonController.getLoading())
      $button.toggleClass(this.classNames_.disabled, buttonController.getDisabled())
      const updateFeatureInfoActive = () => {
        if (buttonController.getFeatureInfoActive()) {
          $toggleFeatureInfo.toggleClass(this.classNames_.featureInfoActive, true)
          changeTooltip($toggleFeatureInfo,
            this.getLocaliser().localiseUsingDictionary('LayerSelector featureInfo hide'))
        } else {
          $toggleFeatureInfo.toggleClass(this.classNames_.featureInfoActive, false)
          changeTooltip($toggleFeatureInfo,
            this.getLocaliser().localiseUsingDictionary('LayerSelector featureInfo show'))
        }
      }
      updateFeatureInfoActive()

      this.listenAt(buttonController).on('change:active', () => {
        $button.toggleClass(activeClassName, buttonController.getActive())
      })
      this.listenAt(buttonController).on('change:loading', () => {
        $button.toggleClass('g4u-layer-loading', buttonController.getLoading())
      })
      this.listenAt(buttonController).on('change:disabled', () => {
        $button.toggleClass(this.classNames_.disabled, buttonController.getDisabled())
      })
      this.listenAt(buttonController).on('change:featureInfoActive', updateFeatureInfoActive)

      if (buttonConfig.QUERY_LAYERS !== undefined) {
        $button.append($toggleFeatureInfo)
        this.listenAt($toggleFeatureInfo).on('click', e => {
          buttonController.toggleFeatureInfo()
          e.stopPropagation()
        })
      }

      this.listenAt($button).on('click', () => {
        buttonController.toggleActive()
      })

      return buttonController
    }
  }

  buildMultiControl (buttonConfig, $target, group) {
    // TODO: available for group buttons ??

    const multiController = this.layerController_.registerMultiControl(buttonConfig, group)

    if (buttonConfig.title !== undefined) {
      const menu = new ButtonBox({
        className: this.classNames_.menu,
        title: this.getLocaliser().selectL10N(buttonConfig.title),
        rtl: this.getMap().get('localiser').isRtl(),
        titleButton: false,
        collapsed: buttonConfig.collapsed !== false,
        addClass: buttonConfig.addClass
      })

      $target.append(menu.get$Element())

      this.listenAt(menu).on('change:collapsed', () => {
        this.dispatchEvent('change:size')
      })

      this.listenAt(multiController).on('change:active', () => {
        menu.setCollapseButtonActive(multiController.getActive())
      })

      $target = menu.get$Body()
    }

    const activeClassName = this.classNames_.menu + '-active'

    let lastName
    for (const subConfig of buttonConfig.buttons) {
      if (lastName === undefined) {
        lastName = subConfig.name
        multiController.setDefault(subConfig.name, subConfig.value)
      } else if (lastName !== subConfig.name) {
        lastName = subConfig.name
        multiController.setDefault(subConfig.name, subConfig.value)
        $target.append($('<span>').addClass(this.classNames_.spacer).html('&nbsp;'))
      }

      const $button = this.buildBasicButton(subConfig.title, subConfig, multiController, $target)

      this.listenAt($button).on('click', () => {
        multiController.setParam(subConfig.name, subConfig.value)
      })

      const updateButton = () => {
        const currentParams = multiController.getParams()
        $button.toggleClass(activeClassName, currentParams[subConfig.name] === subConfig.value)
      }

      this.listenAt(multiController).on('change:params', updateButton)
      updateButton()
    }

    // TODO: menu set disabled ?

    return multiController
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
