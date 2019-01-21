import Observable from 'ol/Observable'

class LayerButtonController extends Observable {
  constructor (layer) {
    super()
    this.layer_ = layer

    this.loading_ = false

    layer.on('change:visible', () => {
      this.dispatchEvent('change')
    })

    layer.on('loadcountstart', () => {
      this.loading_ = true
      this.dispatchEvent('change')
    })

    // TODO: use listener manager mixin
    // this.listenAt(layer).on('loadcountend', () => {
    layer.on('loadcountend', () => {
      this.loading_ = false
      this.dispatchEvent('change')
    })

    layer.on('change:disabled', () => {
      this.dispatchEvent('change')
    })
  }

  getActive () {
    return this.layer_.getVisible()
  }

  getLoading () {
    return this.loading_
  }

  getDisabled () {
    return this.layer_.get('disabled')
  }

  toggleActive (active) {
    this.layer_.setVisible(active === undefined ? !this.layer_.getVisible() : active)
    this.dispatchEvent('toggle')
  }

  count () {
    return 1
  }

  controlsSame (controller) {
    return controller.layer_ && controller.layer_ === this.layer_
  }
}

class GroupButtonController extends Observable {
  constructor (exclusive) {
    super()
    this.exclusive_ = exclusive
    this.children_ = []
  }

  addChild (controller) {
    this.children_.push(controller)
    controller.on('toggle', () => {
      if (this.exclusive_ && controller.getActive()) {
        for (const other of this.children_) {
          if (!controller.controlsSame(other) && other.getActive()) {
            other.toggleActive(false)
          }
        }
      }
      this.dispatchEvent('change')
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
    this.dispatchEvent('toggle')
  }

  count () {
    return this.children_.reduce((p, n) => p + n.count(), 0)
  }

  controlsSame (controller) {
    return controller.children_ && controller.children_.every(c => this.children_.includes(c))
  }
}

class WMSLayerController extends Observable {
  constructor (layer, wmsLayers, queryLayers) {
    super()
    this.layer_ = layer
    this.wmsLayers_ = wmsLayers
    this.queryLayers_ = queryLayers
    this.loading_ = false

    layer.on('change:visible', () => {
      this.dispatchEvent('change')
    })

    layer.on('loadcountstart', () => {
      this.loading_ = true
      this.dispatchEvent('change')
    })

    // TODO: use listener manager mixin
    // this.listenAt(layer).on('loadcountend', () => {
    layer.on('loadcountend', () => {
      this.loading_ = false
      this.dispatchEvent('change')
    })

    layer.on('change:disabled', () => {
      this.dispatchEvent('change')
    })

    layer.getSource().on('change', () => {
      this.dispatchEvent('change')
    })
  }

  getActive () {
    return this.layer_.getSource().areLayersActive(this.wmsLayers_)
  }

  getLoading () {
    return this.getActive() && this.loading_
  }

  getDisabled () {
    return this.layer_.get('disabled')
  }

  getFeatureInfoActive () {
    return this.layer_.getSource().areQueryLayersActive(this.queryLayers_)
  }

  toggleActive (active) {
    if (active === undefined ? !this.getActive() : active) {
      this.layer_.getSource().activateLayers(this.wmsLayers_)
    } else {
      this.layer_.getSource().deactivateLayers(this.wmsLayers_)
    }
    this.layer_.setVisible(this.layer_.getSource().anyLayerActive())
    this.dispatchEvent('toggle')
  }

  toggleFeatureInfo (active) {
    if (active === undefined ? !this.getFeatureInfoActive() : active) {
      this.layer_.getSource().activateQueryLayers(this.queryLayers_)
    } else {
      this.layer_.getSource().deactivateQueryLayers(this.queryLayers_)
    }
    this.toggleActive(true)
  }

  count () {
    return 1
  }

  controlsSame (controller) {
    return controller.wmsLayers_ && controller.wmsLayers_.every(w => this.wmsLayers_.includes(w))
  }
}

export class LayerController {
  constructor (map, layerConfig) {
    this.map_ = map
    // this.buttons_ = []
    this.layers_ = {}
    this.menuConfigs_ = layerConfig['menus']
    this.addGroups_ = {}
  }

  registerAdditionalGroup (value, controller) {
    if (!this.addGroups_[value]) {
      this.addGroups_[value] = new GroupButtonController(true)
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
    const controller = new LayerButtonController(layer)
    if (group) {
      group.addChild(controller)
    }
    if (options.addGroup) {
      this.registerAdditionalGroup(options.addGroup, controller)
    }
    return controller
  }

  registerGroupButton (options, group) {
    const exclusive = options.items === 'exclusive'
    const oneActive = options.alwaysActive === true // TODO
    const controller = new GroupButtonController(exclusive, oneActive)
    if (group) {
      group.addChild(controller)
    }
    if (options.addGroup) {
      this.registerAdditionalGroup(options.addGroup, controller)
    }
    return controller
  }

  registerWmsLayerButton (options, group) {
    const layer = this.layers_[options.refId]
    const controller = new WMSLayerController(layer, options['LAYERS'], options['QUERY_LAYERS'])
    if (group) {
      group.addChild(controller)
    }
    if (options.addGroup) {
      this.registerAdditionalGroup(options.addGroup, controller)
    }
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

  upadateDisabledLayers (zoom) {
    const layerIsViewable = layer => {
      if (layer.get('minZoom') && zoom < layer.get('minZoom')) {
        return false
      } else if (layer.get('maxZoom') && zoom > layer.get('maxZoom')) {
        return false
      } else {
        return true
      }
    }

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

    this.map_.getLayers().forEach(layer => {
      if (layerIsViewable(layer)) {
        layer.set('disabled', false)
      } else {
        layer.set('disabled', true)
        if (layer.getVisible()) {
          layer.setVisible(false)
        }
      }
    })
  }
}
