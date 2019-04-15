import { ButtonController } from './ButtonController'

export class WMSButtonController extends ButtonController {
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

    layer.on('change:opacity', () => {
      this.dispatchEvent('change:opacity')
    })

    layer.getSource().on('change:queryLayers', () => {
      this.dispatchEvent('change:featureInfoActive')
    })
  }

  getOpacity () {
    return this.layer_.getOpacity()
  }

  setOpacity (opacity) {
    this.layer_.setOpacity(opacity)
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
    active = active === undefined ? !this.getActive() : active
    if (this.get('unselectable') || active) {
      if (active) {
        this.layer_.getSource().activateLayers(this.get('wmsLayers'))
      } else {
        this.layer_.getSource().deactivateLayers(this.get('wmsLayers'))
      }
      this.layer_.setVisible(this.layer_.getSource().anyLayerActive())
    }
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
}
