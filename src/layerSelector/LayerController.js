export class LayerController {
  constructor (map, layerConfig) {
    this.map_ = map
    // this.buttons_ = []
    this.layers_ = {}
    this.menuConfigs_ = layerConfig['menus']
  }

  /**
   * @param {ButtonConfig} options
   * @param {ButtonActions} buttonActions
   * @returns {Function}
   */
  registerLayerButton (options, buttonActions) {
    const layer = this.layers_[options.refId]

    layer.on('change:visible', () => {
      buttonActions.toggleActive(layer.getVisible())
      if (!layer.getVisible()) {
        buttonActions.toggleLoading(false)
      }
    })
    buttonActions.toggleActive(layer.getVisible())

    layer.on('loadcountstart', () => {
      buttonActions.toggleLoading(true)
    })

    // TODO: use listener manager mixin
    // this.listenAt(layer).on('loadcountend', () => {
    layer.on('loadcountend', () => {
      buttonActions.toggleLoading(false)
    })

    layer.on('change:disabled', () => {
      buttonActions.toggleDisabled(layer.get('disabled'))
    })
    buttonActions.toggleDisabled(layer.get('disabled'))

    return {
      notifyActiveToggle: () => {
        layer.setVisible(!layer.getVisible())
      }
    }
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
