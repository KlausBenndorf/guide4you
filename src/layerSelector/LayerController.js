// import { MultiController } from './MultiController'

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

  // registerAdditionalGroup (value, controller) {
  //   if (!this.addGroups_[value]) {
  //     this.addGroups_[value] = new GroupButtonController({ exclusive: true })
  //     this.controllers_[this.id_++] = this.addGroups_[value]
  //   }
  //   const groupController = this.addGroups_[value]
  //   groupController.addChild(controller)
  // }

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
  }
}
