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

  activeToggle (active) {
    this.layer_.setVisible(active === undefined ? !this.layer_.getVisible() : active)
  }

  count () {
    return 1
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
    controller.on('change', () => {
      if (this.exclusive_ && controller.getActive()) {
        for (const other of this.children_) {
          if (other !== controller) {
            other.activeToggle(false)
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

  activeToggle (active) {
    active = active === undefined ? !this.getAllActive() : active
    for (const child of this.children_) {
      child.activeToggle(active)
    }
  }

  count () {
    return this.children_.reduce((p, n) => p + n.count(), 0)
  }
}

class WMSLayerController extends Observable {
  constructor (layer, wmsLayers, queryLayers) {
    super()
    this.layer_ = layer
    this.layer_.getSource().registerWmsLayerController(this)
    this.wmsLayersActive_ = false
    this.queryLayersActive_ = false
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

    layer.getSource().on('change:layers', () => {
      this.dispatchEvent('change')
    })
  }

  getActive () {
    return this.wmsLayersActive_
  }

  getLoading () {
    return this.loading_
  }

  getDisabled () {
    return this.layer_.get('disabled')
  }

  getFeatureInfoActive () {
    return this.queryLayersActive_
  }

  getActiveWmsLayers () {
    return this.wmsLayersActive_ ? this.wmsLayers_ : []
  }

  getActiveQueryLayers () {
    return this.queryLayersActive_ ? this.queryLayers_ : []
  }

  activeToggle (active) {
    this.wmsLayersActive_ = active === undefined ? !this.wmsLayersActive_ : active
    this.layer_.setVisible(this.layer_.getSource().updateLayers())
  }

  featureInfoToggle (active) {
    this.queryLayersActive_ = active === undefined ? !this.queryLayersActive_ : active
    this.activeToggle(true)
  }

  count () {
    return 1
  }
}

export class LayerController {
  constructor (map, layerConfig) {
    this.map_ = map
    // this.buttons_ = []
    this.layers_ = {}
    this.menuConfigs_ = layerConfig['menus']
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
    return controller
  }

  registerGroupButton (options, group) {
    const exclusive = options.items === 'exclusive'
    const controller = new GroupButtonController(exclusive)
    if (group) {
      group.addChild(controller)
    }
    return controller
  }

  registerWmsLayerButton (options, group) {
    const layer = this.layers_[options.refId]
    const controller = new WMSLayerController(layer, options['LAYERS'], options['QUERY_LAYERS'])
    if (group) {
      group.addChild(controller)
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
