import $ from 'jquery'
import { Element } from './Element'
import { Accordion } from './Accordion'

export class Button extends Element {
  buildButton (text) {
    this.$button_ = $('<span>')
      .addClass('button')
      .addClass('g4u-layerselector-layerbutton')

    if (this.config.refId) {
      this.$button_.attr('id', this.config.refId)
    }

    if (this.config.hasOwnProperty('class')) {
      this.$button_.addClass(this.config.class)
    }

    if (this.map.get('localiser').isRtl()) {
      this.$button_.prop('dir', 'rtl')
    }

    if (this.config.hasOwnProperty('window')) {
      this.addWindowToButton(this.$button_, this.config) // TODO: add method to class
    }

    this.$button_.html(text)
    this.$element_ = $('<div>')
      .addClass('g4u-layerselector-button-frame')
      .append(this.$button_)

    if (this.config.hasOwnProperty('window')) {
      this.addWindowToButton(this.$button_, this.config) // TODO: add method to class
    }

    this.listenAt(this.$button_).on('click', () => {
      this.setActive(!this.getActive())
    })

    if (this.config.hasOwnProperty('accordion') && this.config.accordion) {
      this.accordion = new Accordion(this.map, this.config.accordion,
        this.map.get('localiser'))
      for (const option of this.config.accordion) {
        this.addAccordionOption(option)
      }
      this.$element_.append(this.accordion.get$Element())
    }
  }

  addAccordionOption (option) {
    if (option.type === 'window') {
      this.accordion.addWindow(option)
      return true
    }
  }

  update () {
    this.$button_.toggleClass('g4u-layerselector-menu-active', this.getActive())
    this.$button_.toggleClass('g4u-layer-loading', this.getLoading())
    this.$button_.toggleClass('g4u-layerselector-disabled', this.getDisabled())
    if (this.accordion) {
      this.accordion.setActive(this.getActive())
    }
    super.update()
  }

  getActive () {
    return false
  }

  getLoading () {
    return false
  }

  count () {
    return 1
  }
}
