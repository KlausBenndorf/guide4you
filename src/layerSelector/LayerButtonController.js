  import { ButtonController } from './ButtonController'

export class LayerButtonController extends ButtonController {
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
    active = active === undefined ? !this.layer_.getVisible() : active
    if (this.get('unselectable') || active) {
      this.layer_.setVisible(active)
    }
  }

  count () {
    return 1
  }
}
