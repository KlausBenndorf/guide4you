import $ from 'jquery'

import '../../less/layerselectoraccordion.less'
import '../../less/slider.less'

export class LayerSelectorAccordionMenu {
  constructor (options, localiser, layerController) {
    this.options_ = options
    this.layerController_ = layerController
    this.active_ = false
    this.lines_ = 0
    /**
     * @type {L10N}
     */
    this.localiser_ = localiser

    this.buildHTML()
  }

  get$Line () {
    this.lines_++
    return $('<div>')
      .addClass('g4u-accordion-line')
  }

  buildHTML () {
    this.$button_ = $('<span>')
      .addClass('g4u-accordion-button')
      .addClass('button')
      .on('click', () => {
        this.toggleActive()
      })
    this.$menu_ = $('<div>')
      .addClass('g4u-accordion-menu')
      .toggleClass('g4u-layer-active', this.layerController_.getActive())
    this.layerController_.on('change:active', () => {
      this.$menu_.toggleClass('g4u-layer-active', this.layerController_.getActive())
    })
    for (const option of this.options_) {
      if (option === 'transparency') {
        const $head = this.get$Line()
          .appendTo(this.$menu_)
        $head
          .append($('<span>')
            .html(this.localiser_.localiseUsingDictionary('LayerSelectorAccordion transparency'))
            .addClass('g4u-accordion-text'))
        const $slider = this.get$Line()
          .appendTo(this.$menu_)
        const $input = $('<input>')
          .addClass('g4u-slider')
          .attr('type', 'range')
          .attr('min', 0)
          .attr('max', 1)
          .attr('step', 'any')
          .val(1)
        $slider.append($input)
        $input.on('input', () => {
          this.layerController_.setOpacity(parseFloat($input.val()))
        })
        this.layerController_.on('change:opacity', () => {
          $input.val(this.layerController_.getOpacity())
        })
      }
    }
    this.$menu_.hide()
  }

  appendTo ($parent) {
    this.$parent_ = $parent
    // this.$parent_.addClass('g4u-layerbutton-with-accordion')
    this.$parent_
      .append(this.$button_)
      .append(this.$menu_)
  }

  toggleActive () {
    this.active_ = !this.active_
    if (this.active_) {
      this.$button_.addClass('g4u-accordion-active')
      this.$parent_.addClass('g4u-accordion-size-' + this.lines_)
      this.$menu_.show()
    } else {
      this.$button_.removeClass('g4u-accordion-active')
      this.$parent_.removeClass('g4u-accordion-size-' + this.lines_)
      this.$menu_.hide()
    }
  }
}
