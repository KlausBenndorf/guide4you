import BaseObject from 'ol/Object'

class ButtonController extends BaseObject {
  constructor (props) {
    super(props)

    this.disabled_ = false
  }

  getDisabled () {
    return this.disabled_
  }

  updateDisabled (zoom) {
    const disable = (this.get('minZoom') && zoom < this.get('minZoom')) ||
      (this.get('maxZoom') && zoom > this.get('maxZoom'))
    if (disable && !this.disabled_) {
      this.disabled_ = true
      if (this.getActive()) {
        this.toggleActive(false)
      }
      this.dispatchEvent('change:disabled')
    } else if (!disable && this.disabled_) {
      this.disabled_ = false
      this.dispatchEvent('change:disabled')
    }
  }
}

class LayerButtonController extends ButtonController {
  constructor (layer, props) {
    super(props)
    this.layer_ = layer

    this.loading_ = false

    layer.on('change:visible', () => {
      this.dispatchEvent('change:active')
    })

    layer.on('loadcountstart', () => {
      this.loading_ = true
      this.dispatchEvent('change:loading')
    })

    // TODO: use listener manager mixin
    // this.listenAt(layer).on('loadcountend', () => {
    layer.on('loadcountend', () => {
      this.loading_ = false
      this.dispatchEvent('change:loading')
    })

    layer.on('change:disabled', () => {
      this.dispatchEvent('change:disabled')
    })
  }

  getActive () {
    return this.layer_.getVisible()
  }

  getLoading () {
    return this.loading_
  }

  getDisabled () {
    return this.layer_.get('disabled') || super.getDisabled()
  }

  toggleActive (active) {
    this.layer_.setVisible(active === undefined ? !this.layer_.getVisible() : active)
  }

  count () {
    return 1
  }

  controlsSame (controller) {
    return controller.layer_ && controller.layer_ === this.layer_
  }
}

class GroupButtonController extends ButtonController {
  constructor (props) {
    super(props)
    this.children_ = []
  }

  addChild (controller) {
    this.children_.push(controller)
    controller.on('change:active', () => {
      if (this.get('exclusive') && controller.getActive()) {
        for (const other of this.children_) {
          if (!controller.controlsSame(other) && other.getActive()) {
            other.toggleActive(false)
          }
        }
      }
      this.dispatchEvent('change:active')
    })
  }

  getActive () {
    return this.children_.some(c => c.getActive())
  }

  getAllActive () {
    return this.children_.every(c => c.getActive())
  }

  toggleActive (active) {
    active = active === undefined ? !this.getAllActive() : active
    for (const child of this.children_) {
      child.toggleActive(active)
    }
    this.dispatchEvent('change:active')
  }

  count () {
    return this.children_.reduce((p, n) => p + n.count(), 0)
  }

  controlsSame (controller) {
    return controller.children_ && controller.children_.every(c => this.children_.includes(c))
  }
}

class WMSLayerController extends ButtonController {
  constructor (layer, props) {
    super(props)
    this.layer_ = layer
    this.loading_ = false

    layer.on('change:visible', () => {
      this.dispatchEvent('change:active')
    })

    layer.on('loadcountstart', () => {
      this.loading_ = true
      this.dispatchEvent('change:loading')
    })

    // TODO: use listener manager mixin
    // this.listenAt(layer).on('loadcountend', () => {
    layer.on('loadcountend', () => {
      this.loading_ = false
      this.dispatchEvent('change:loading')
    })

    layer.on('change:disabled', () => {
      this.dispatchEvent('change:disabled')
    })

    layer.getSource().on('change:layers', () => {
      this.dispatchEvent('change:active')
    })

    layer.getSource().on('change:queryLayers', () => {
      this.dispatchEvent('change:featureInfoActive')
    })
  }

  getActive () {
    return this.layer_.getSource().areLayersActive(this.get('wmsLayers'))
  }

  getLoading () {
    return this.getActive() && this.loading_
  }

  getDisabled () {
    return this.layer_.get('disabled') || super.getDisabled()
  }

  getFeatureInfoActive () {
    return this.layer_.getSource().areQueryLayersActive(this.get('queryLayers'))
  }

  toggleActive (active) {
    if (active === undefined ? !this.getActive() : active) {
      this.layer_.getSource().activateLayers(this.get('wmsLayers'))
    } else {
      this.layer_.getSource().deactivateLayers(this.get('wmsLayers'))
    }
    this.layer_.setVisible(this.layer_.getSource().anyLayerActive())
  }

  toggleFeatureInfo (active) {
    if (active === undefined ? !this.getFeatureInfoActive() : active) {
      this.layer_.getSource().activateQueryLayers(this.get('queryLayers'))
    } else {
      this.layer_.getSource().deactivateQueryLayers(this.get('queryLayers'))
    }
    this.toggleActive(true)
  }

  count () {
    return 1
  }

  controlsSame (controller) {
    return controller.get('wmsLayers') && controller.get('wmsLayers')
      .every(w => this.get('wmsLayers').includes(w))
  }
}

export class LayerController {
  constructor (map, layerConfig) {
    this.map_ = map
    // this.buttons_ = []
    this.layers_ = {}
    this.menuConfigs_ = layerConfig['menus']
    this.addGroups_ = {}
    this.controllers_ = []
  }

  registerAdditionalGroup (value, controller) {
    if (!this.addGroups_[value]) {
      this.addGroups_[value] = new GroupButtonController({ exclusive: true })
      this.controllers_.push(this.addGroups_[value])
    }
    const groupController = this.addGroups_[value]
    groupController.addChild(controller)
  }

  /**
   * @param {ButtonConfig} options
   * @param group
   * @returns {Function}
   */
  registerLayerButton (options, group) {
    const layer = this.layers_[options.refId]
    const controller = new LayerButtonController(layer, {
      minZoom: options.minZoom,
      maxZoom: options.maxZoom
    })
    if (group) {
      group.addChild(controller)
    }
    if (options.addGroup) {
      this.registerAdditionalGroup(options.addGroup, controller)
    }
    this.controllers_.push(controller)
    return controller
  }

  registerGroupButton (options, group) {
    const controller = new GroupButtonController({
      minZoom: options.minZoom,
      maxZoom: options.maxZoom,
      exclusive: options.items === 'exclusive',
      oneActive: options.alwaysActive === true // TODO
    })
    if (group) {
      group.addChild(controller)
    }
    if (options.addGroup) {
      this.registerAdditionalGroup(options.addGroup, controller)
    }
    this.controllers_.push(controller)
    return controller
  }

  registerWmsLayerButton (options, group) {
    const layer = this.layers_[options.refId]
    const controller = new WMSLayerController(layer, {
      minZoom: options.minZoom,
      maxZoom: options.maxZoom,
      wmsLayers: options['LAYERS'],
      queryLayers: options['QUERY_LAYERS']
    })
    if (group) {
      group.addChild(controller)
    }
    if (options.addGroup) {
      this.registerAdditionalGroup(options.addGroup, controller)
    }
    this.controllers_.push(controller)
    return controller
  }

  registerLayer (id, layer) {
    this.layers_[id] = layer
  }

  /**
   * @param {string} name
   * @returns {ButtonConfig}
   */
  getMenuConfig (name) {
    return this.menuConfigs_[name]
  }

  getLayer (id) {
    return this.layers_[id]
  }

  updateDisabledLayers (zoom) {
    // TODO: implement behaviour for new layer structure
    // let activateNext = false
    // this.map_.get('baseLayers').forEach(layer => {
    //   if (!(layer instanceof GroupLayer)) {
    //     if (layerIsViewable(layer)) {
    //       layer.set('disabled', false)
    //       if (activateNext) {
    //         layer.setVisible(true)
    //         activateNext = false
    //       }
    //     } else {
    //       layer.set('disabled', true)
    //       if (layer.getVisible()) {
    //         activateNext = true
    //       }
    //     }
    //   }
    // })
    //
    // if (activateNext) {
    //   this.map_.get('baseLayers').recursiveForEach(layer => {
    //     if (!(layer instanceof GroupLayer)) {
    //       if (layerIsViewable(layer)) {
    //         if (activateNext) {
    //           layer.setVisible(true)
    //           activateNext = false
    //         }
    //       }
    //     }
    //   })
    // }

    for (const controller of this.controllers_) {
      controller.updateDisabled(zoom)
    }
  }
}
