import { Button } from './Button'

export class LayerButton extends Button {
  constructor (layerSelector, config, map) {
    super(layerSelector, config, map)
    this.layer_ = map.getLayerGroup().getLayerById(this.config.refId)
    if (this.layer_ && this.layer_.get('available')) {
      const title = this.config.title !== undefined ? this.config.title : this.layer_.get('title')
      this.buildButton(title)
      this.listenAt(this.layer_).on(['change:visible', 'loadcountstart', 'loadcountend'], () => {
        this.debouncedUpdate()
      })
      this.debouncedUpdate()
    }
  }

  addAccordionOption (option) {
    if (super.addAccordionOption(option)) {
      return true
    }
    if (option.type === 'transparency') {
      this.accordion.addTransparencySlider(this.layer_)
      return true
    }
  }

  getActive () {
    return this.layer_.getVisible()
  }

  getLoading () {
    return this.layer_.isLoading()
  }

  setActive (active) {
    super.setActive(active)
    this.layer_.setVisible(active)
  }
}
