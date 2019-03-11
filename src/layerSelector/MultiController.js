import { difference, xor } from 'lodash/array'
import { isArray, isEmpty } from 'lodash/lang'
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
  }

  setParam (name, value, radio) {
    if (radio) {
      this.settedParams_[name] = value
    } else {
      this.settedParams_[name] = xor(this.settedParams_[name], [value])
    }
    this.updateConfig()
    this.dispatchEvent('change:params')
  }

  clearParams () {
    this.settedParams_ = {}
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
      layer.setVisible(layer.getSource().anyLayerActive())
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
      layer.setVisible(layer.getSource().anyLayerActive())
    }
    this.currentConfig_ = newConfig
    this.dispatchEvent('change:active')
  }

  checkCondition (condition) {
    for (const name in condition) {
      if (!this.settedParams_[name]) {
        return false
      }
      if (isArray(condition[name])) {
        if (condition[name].length !== this.settedParams_[name].length) {
          return false
        }
        for (const value of condition[name]) {
          if (!this.settedParams_[name].includes(value)) {
            return false
          }
        }
      } else if (condition[name] !== this.settedParams_[name]) {
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

    // TODO: use listener manager mixin
    // this.listenAt(layer).on('loadcountend', () => {
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
    return this.currentConfig_.refId !== undefined && !isEmpty(this.currentConfig_.LAYERS)
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
    if (!active) {
      this.clearParams()
    }
  }

  toggleFeatureInfo (active) {
    throw new Error('not implemented')
  }

  count () {
    return 1
  }
}
