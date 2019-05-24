import { difference } from 'lodash/array'
import { isEmpty } from 'lodash/lang'
import { ButtonController } from './ButtonController'

export class MultiController extends ButtonController {
  constructor (configs, props) {
    super(props)
    this.layers_ = {}
    this.activeRefId_ = undefined
    this.loading_ = false
    this.configs_ = configs
    this.currentConfig_ = {}
    this.settedParams_ = {}
    this.active_ = false
  }

  setParam (name, value) {
    this.settedParams_[name] = value
    this.updateConfig()
    this.dispatchEvent('change:params')
  }

  getParams () {
    return this.settedParams_
  }

  updateConfig () {
    const oldConfig = this.currentConfig_
    if (oldConfig.refId !== undefined) {
      const layer = this.layers_[oldConfig.refId]
      if (oldConfig.LAYERS) {
        layer.getSource().deactivateLayers(oldConfig.LAYERS)
      }
      if (oldConfig.QUERY_LAYERS) {
        layer.getSource().deactivateQueryLayers(oldConfig.QUERY_LAYERS)
      }
    }
    const newConfig = this.getMatchingConfig()
    if (newConfig.refId !== undefined) {
      const layer = this.layers_[newConfig.refId]
      if (newConfig.LAYERS) {
        layer.getSource().activateLayers(newConfig.LAYERS)
      }
      if (newConfig.QUERY_LAYERS) {
        layer.getSource().activateQueryLayers(newConfig.QUERY_LAYERS)
      }
    }

    for (const layer of Object.values(this.layers_)) {
      if (this.getActive()) {
        layer.setVisible(layer.getSource().anyLayerActive())
      } else {
        layer.setVisible(false)
      }
    }

    this.currentConfig_ = newConfig
    this.dispatchEvent('change:active')
  }

  checkCondition (condition) {
    for (const name in condition) {
      if (!isEmpty(difference(condition[name], this.settedParams_[name]))) {
        return false
      }
    }
    return true
  }

  getMatchingConfig () {
    const match = {}
    for (const config of this.configs_) {
      if (this.checkCondition(config.condition)) {
        Object.assign(match, config)
      }
    }
    return match
  }

  addLayer (refId, layer) {
    this.layers_[refId] = layer

    layer.on('change:visible', () => {
      this.dispatchEvent('change:active')
    })

    layer.on('loadcountstart', () => {
      this.loading_ = true
      this.dispatchEvent({
        type: 'change:loading'
      })
    })

    layer.on('loadcountend', () => {
      this.loading_ = false
      this.dispatchEvent({
        type: 'change:loading'
      })
    })

    layer.on('change:disabled', () => {
      this.dispatchEvent({
        type: 'change:disabled'
      })
    })
  }

  getActive () {
    return this.active_
  }

  getLoading () {
    return this.getActive() && this.loading_
  }

  getDisabled () {
    throw new Error('not implemented')
  }

  getFeatureInfoActive () {
    throw new Error('not implemented')
  }

  toggleActive (active) {
    this.active_ = active === undefined ? !this.getActive() : active
    for (const layer of Object.values(this.layers_)) {
      if (this.active_) {
        layer.setVisible(layer.getSource().anyLayerActive())
      } else {
        layer.setVisible(false)
      }
    }
  }

  toggleFeatureInfo (active) {
    throw new Error('not implemented')
  }

  count () {
    return 1
  }
}
