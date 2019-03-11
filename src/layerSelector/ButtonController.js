import BaseObject from 'ol/Object'

export class ButtonController extends BaseObject {
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
