import $ from 'jquery'
import { Element } from './Element'
import { Accordion } from './Accordion'

export class Button extends Element {
  constructor (layerSelector, config, map) {
    super(layerSelector, config, map)
    this.deactivatable_ = config.deactivatable !== false
  }

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
      this.addWindowToButton(this.$button_, this.config)
    }

    this.$button_.html(text)
    this.$element_ = $('<div>')
      .addClass('g4u-layerselector-button-frame')
      .append(this.$button_)

    const clickHandler = () => {
      if (this.deactivatable_ || !this.getActive()) {
        this.setActive(!this.getActive())
      }
    }

    this.listenAt(this.$button_).on('click', clickHandler)

    // hack for registering clicks on spans in mobile chrome / firefox
    const maxDiff = 20
    let startX, startY

    this.listenAt(this.$button_).on('touchstart', e => {
      if (e.touches.length !== 1) {
        startX = undefined
        startY = undefined
      } else {
        startX = e.touches[0].pageX
        startY = e.touches[0].pageY
      }
    })

    this.listenAt(this.$button_).on('touchend', e => {
      if (e.changedTouches.length === 1) {
        const x = e.changedTouches[0].pageX
        const y = e.changedTouches[0].pageY
        if (Math.abs(x - startX) < maxDiff && Math.abs(y - startY) < maxDiff) {
          clickHandler()
        }
      }
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

  setActive (active) {
    super.setActive(active)
  }

  addAccordionOption (option) {
    if (option.type === 'window') {
      this.accordion.addWindow(option)
      return true
    }
  }

  update () {
    if (this.$button_) {
      this.$button_.toggleClass('g4u-layerselector-menu-active', this.getActive())
      this.$button_.toggleClass('g4u-layer-loading', this.getActive() && this.getLoading())
      this.$button_.toggleClass('g4u-layerselector-disabled', this.getDisabled())
      if (this.accordion) {
        this.accordion.setActive(this.getActive())
      }
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
