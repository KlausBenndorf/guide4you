import { uniq } from 'lodash/array'
import { GroupButtonController } from './GroupButtonController'
import { LayerButtonController } from './LayerButtonController'
import { MultiController } from './MultiController'
import { WMSButtonController } from './WMSButtonController'

export class LayerController {
  constructor (map, layerConfig) {
    this.map_ = map
    // this.buttons_ = []
    this.layers_ = {}
    this.menuConfigs_ = layerConfig['menus']
    this.addGroups_ = {}
    this.controllers_ = {}
    this.id_ = 0
  }

  registerAdditionalGroup (value, controller) {
    if (!this.addGroups_[value]) {
      this.addGroups_[value] = new GroupButtonController({ exclusive: true })
      this.controllers_[this.id_++] = this.addGroups_[value]
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
    if (options._id === undefined) {
      const layer = this.layers_[options.refId]
      const controller = new LayerButtonController(layer, {
        minZoom: options.minZoom,
        maxZoom: options.maxZoom,
        unselectable: options.unselectable !== false
      })
      if (group) {
        group.addChild(controller)
      }
      if (options.addGroup) {
        this.registerAdditionalGroup(options.addGroup, controller)
      }
      options._id = this.id_++
      this.controllers_[options._id] = controller
    }
    return this.controllers_[options._id]
  }

  registerGroupButton (options, group) {
    if (options._id === undefined) {
      const controller = new GroupButtonController({
        minZoom: options.minZoom,
        maxZoom: options.maxZoom,
        exclusive: options.items === 'exclusive',
        unselectable: options.unselectable !== false
      })
      if (group) {
        group.addChild(controller)
      }
      if (options.addGroup) {
        this.registerAdditionalGroup(options.addGroup, controller)
      }
      options._id = this.id_++
      this.controllers_[options._id] = controller
    }
    return this.controllers_[options._id]
  }

  registerWmsLayerButton (options, group) {
    if (options._id === undefined) {
      const layer = this.layers_[options.refId]
      const controller = new WMSButtonController(layer, {
        minZoom: options.minZoom,
        maxZoom: options.maxZoom,
        wmsLayers: options['LAYERS'],
        queryLayers: options['QUERY_LAYERS'],
        unselectable: options.unselectable !== false
      })
      if (group) {
        group.addChild(controller)
      }
      if (options.addGroup) {
        this.registerAdditionalGroup(options.addGroup, controller)
      }
      options._id = this.id_++
      this.controllers_[options._id] = controller
    }
    return this.controllers_[options._id]
  }

  registerMultiControl (options, group) {
    if (options._id === undefined) {
      // TODO: respect group
      const controller = new MultiController(options.configs)
      for (const refId of uniq(options.configs.map(c => c.refId).filter(r => r !== undefined))) {
        controller.addLayer(refId, this.layers_[refId])
      }
      if (group) {
        group.addChild(controller)
      }
      if (options.addGroup) {
        this.registerAdditionalGroup(options.addGroup, controller)
      }
      options._id = this.id_++
      this.controllers_[options._id] = controller
    }
    return this.controllers_[options._id]
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

    for (const controller of Object.values(this.controllers_)) {
      controller.updateDisabled(zoom)
    }
  }
}
