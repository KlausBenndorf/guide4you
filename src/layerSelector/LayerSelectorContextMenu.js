import $ from 'jquery'

export class LayerSelectorContextMenu {
  constructor (options, layerController) {
    this.options_ = options
    this.layerController_ = layerController
    this.buildHTML()
    this.active_ = false
  }

  buildHTML () {
    this.$button_ = $('<span>')
      .addClass('g4u-layerselector-context-button')
      .addClass('button')
      .on('click', () => {
        this.toggleActive()
      })
    this.$menu_ = $('<div>')
      .addClass('g4u-layerselector-context-menu')
    for (const option of this.options_) {
      if (option === 'transparency') {
        this.$menu_.append('transparency')
      }
    }
    this.$menu_.hide()
  }

  get$Element () {
    return this.$button_.add(this.$menu_)
  }

  toggleActive () {
    this.active_ = !this.active_
    if (this.active_) {
      this.$button_.addClass('g4u-active')
      this.$menu_.show()
    } else {
      this.$button_.removeClass('g4u-active')
      this.$menu_.hide()
    }
  }
}
