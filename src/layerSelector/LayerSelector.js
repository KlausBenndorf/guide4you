import $ from 'jquery'
import { Control } from '../controls/Control'
import { ButtonBox } from '../html/ButtonBox'
import { ListenerOrganizerMixin } from '../ListenerOrganizerMixin'
import { mixin } from '../utilities'
import { isObject, isArray } from 'lodash/lang'

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
 */

/**
 * @typedef {ButtonConfig} LayerButtonConfig
 * @property {"layer"} type
 * @property {Localizable} [title] if not set, the title of the layer will be chosen
 * @property {string|number} refId the id of the layer
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
 * @property {string} [buttonBehaviour="noButton"] can be "noButton", "onlyMenu" or "activateAll"
 *    "noButton": the group itself will have no button, the contained buttons are displayed on the same level
 *    "onlyMenu": the group has a button which can be clicked to open/close the submenu with the contained layers
 *    "activateAll": the group has 2 buttons. One will open/close the submenu, the other will de-/activate all layers
 * @property {string} [itemBehaviour="normal"] can be "normal" or "exclusive"
 *    "normal": all contained layers can be activated independently
 *    "exclusive": activating one layer in this group will deactivate the others.
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
    if (isArray(menuConfig)) {
      if (menuConfig.length >= this.minLayerAmount_) {
        for (const buttonConfig of menuConfig) {
          this.chooseButtonBuilder(buttonConfig, this.menu_.get$Body())
        }
      } else {
        this.setVisible(false)
      }
    } else if (isObject(menuConfig)) {
      if (this.minLayerAmount_ <= 1 ||
          (menuConfig.type === 'group' && menuConfig.layers.length >= this.minLayerAmount_)) {
        this.chooseButtonBuilder(menuConfig, this.menu_.get$Body())
      } else {
        this.setVisible(false)
      }
    }
  }

  /**
   * This method chooses the right builder function. Intended to be overwritten for special button types
   * @param {ButtonConfig} buttonConfig
   * @param {jQuery} $target
   */
  chooseButtonBuilder (buttonConfig, $target) {
    if (buttonConfig.type === 'group') {
      return this.buildGroupButton(buttonConfig, $target)
    } else if (buttonConfig.type === 'WMS') {
      return this.buildWMSButton(buttonConfig, $target)
    } else if (buttonConfig.type === 'layer') {
      return this.buildLayerButton(buttonConfig, $target)
    }
  }

  /**
   * this method builds a button for a layer. It toggles visibility if you click on it
   * @param {LayerButtonConfig} buttonConfig
   * @param {jQuery} $target
   */
  buildBasicButton (buttonConfig, $target) {
    const layer = this.layerController_.getLayer(buttonConfig.refId)
    if (layer && layer.get('available')) {
      let $button = $('<button>')
        .addClass(this.classNames_.layerButton)
        .attr('id', buttonConfig.refId)
        .html(buttonConfig.title ? buttonConfig.title : layer.get('title'))

      if (buttonConfig.hasOwnProperty('class')) {
        $button.addClass(buttonConfig.class)
      }

      if (this.getMap().get('localiser').isRtl()) {
        $button.prop('dir', 'rtl')
      }

      if (buttonConfig.hasOwnProperty('window')) {
        this.addWindowToButton($button, layer) // TODO: add method to class
      }

      $target.append($button)

      return $button
    }
  }

  buildLayerButton (buttonConfig, $target) {
    const $button = this.buildBasicButton(buttonConfig, $target)

    if ($button) {
      let activeClassName = this.classNames_.menu + '-active'

      const dispatcher = this.layerController_.registerLayerButton(buttonConfig, {
        toggleActive: (act) => {
          $button.toggleClass(activeClassName, act)
        },
        toggleLoading: (loading) => {
          $button.toggleClass('g4u-layer-loading', loading)
        },
        toggleDisabled: (disabled) => {
          $button.toggleClass(this.classNames_.disabled, disabled)
        }
      })

      this.listenAt($button).on('click', () => {
        dispatcher.notifyActiveToggle()
      })

      return $button
    }
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
}
