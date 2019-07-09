import $ from 'jquery'
import { Control } from '../controls/Control'
import { ButtonBox } from '../html/ButtonBox'
import { ListenerOrganizerMixin } from '../ListenerOrganizerMixin'
import { mixin, offset } from '../utilities'
import { isObject, isArray } from 'lodash/lang'

import '../../less/layerselector.less'
import { LayerButton } from './LayerButton'
import { GroupElement } from './GroupElement'
import { MultiButton } from './MultiButton'
import { WMSLayerButton } from './WMSLayerButton'

/**
 * @typedef {g4uControlOptions} LayerSelectorOptions
 * @property {boolean} [collapsible=true] if the menu should be collapsible
 * @property {boolean} [collapsed=false] if the menu starts collapsed
 * @property {number} [minVisibleEntries=6] amount of minimal visible elements
 * @property {string} menuName the name of the layerMenu this selector is connected to. For example 'baseLayers'
 * @property {number} [minLayerAmount=1] the minimum number of layers which should be visible to show this selector
 * @property {LayerController} layerController the layerController will be passed in by the UIConfigurator
 * @property {boolean} [checkboxes=false] if the layerbuttons should have trailing checkboxes
 */

/**
 * @typedef {object} ButtonConfig
 * @property {object} [window] open a window if the button gets clicked
 * @property {string} [class] add a css class to the button
 * @property {[]} [accordion] accordionmenu items
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

    if (options.checkboxes !== false) {
      this.menu_.get$Element().addClass('g4u-layerselector-with-checkbox')
    }

    this.elements_ = []

    this.elementGroups_ = {}
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

      this.listenAt(map.getView()).on('change:resolution', () => {
        const zoom = map.getView().getZoom()
        for (const elem of this.elements_) {
          elem.updateDisabled(zoom)
        }
      })

      const zoom = map.getView().getZoom()
      for (const elem of this.elements_) {
        elem.updateDisabled(zoom)
      }
    }
  }

  clear () {
    this.detachAllListeners()
    for (const elem of this.elements_) {
      elem.detach()
    }
    this.menu_.get$Body().empty()
  }

  addElement (config) {
    const element = this.getElement(config)
    this.menu_.get$Body().append(element.get$Element())
    this.elements_.push(element)
    return element.count()
  }

  build () {
    const menuConfig = this.layerController_.getMenuConfig(this.menuName_)
    let count = 0
    this.elements_ = []
    if (isArray(menuConfig)) {
      for (const buttonConfig of menuConfig) {
        count += this.addElement(buttonConfig)
      }
    } else if (isObject(menuConfig)) {
      count += this.addElement(menuConfig)
    }

    if (count < this.minLayerAmount_) {
      this.setVisible(false)
    }
  }

  getElement (config) {
    switch (config.type) {
      case 'layer':
        return new LayerButton(this, config, this.getMap())
      case 'group':
        return new GroupElement(this, config, this.getMap())
      case 'WMS':
        return new WMSLayerButton(this, config, this.getMap())
      case 'multi':
        return new MultiButton(this, config, this.getMap())
    }
  }

  addElementToGroup (element, groupName) {
    if (!this.elementGroups_.hasOwnProperty(groupName)) {
      this.elementGroups_[groupName] = []
    }
    this.elementGroups_[groupName].push(element)
  }

  deactivateOtherGroupElements (element, groupName) {
    for (const other of this.elementGroups_[groupName]) {
      if (other !== element) {
        other.setActive(false)
      }
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
