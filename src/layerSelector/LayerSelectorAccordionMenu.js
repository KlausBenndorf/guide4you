import $ from 'jquery'

import '../../less/layerselectoraccordion.less'
import '../../less/slider.less'
import { Window } from '../html/Window'
import { URL } from '../URLHelper'

export class LayerSelectorAccordionMenu {
  constructor (map, options, localiser, layerController) {
    this.options_ = options
    this.layerController_ = layerController
    this.active_ = false
    this.size_ = 0
    this.map_ = map
    /**
     * @type {L10N}
     */
    this.localiser_ = localiser

    this.buildHTML()
  }

  get$Entry (size = 1) {
    this.size_ += size
    return $('<div>')
      .addClass('g4u-accordion-entry')
      .addClass(`g4u-accordion-entry-size-${size}`)
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
      switch (option.type) {
        case 'transparency':
          const $head = this.get$Entry()
            .appendTo(this.$menu_)
          $head
            .append($('<span>')
              .html(this.localiser_.localiseUsingDictionary('LayerSelectorAccordion transparency'))
              .addClass('g4u-accordion-entry-content'))
          const $slider = this.get$Entry()
            .appendTo(this.$menu_)
          const $input = $('<input>')
            .addClass('g4u-slider')
            .attr('type', 'range')
            .attr('min', 0)
            .attr('max', 1)
            .attr('step', 'any')
            .val(1 - this.layerController_.getOpacity())
          $slider.append($input)
          $input.on('input', () => {
            this.layerController_.setOpacity(1 - parseFloat($input.val()))
          })
          this.layerController_.on('change:opacity', () => {
            $input.val(1 - this.layerController_.getOpacity())
          })
          break
        case 'window':
          const $entry = this.get$Entry()
            .appendTo(this.$menu_)
          const window = new Window({
            map: this.map_
          })

          let content

          const showWindow = () => {
            if (this.map_.get('localiser').isRtl()) {
              window.get$Body().prop('dir', 'rtl')
            } else {
              window.get$Body().prop('dir', undefined)
            }
            window.get$Body().html(content)
            window.setVisible(true)
          }

          let hideWindow = () => {
            window.setVisible(false)
          }

          $('<button>')
            .addClass('g4u-accordion-entry-content')
            .html(this.localiser_.selectL10N(option.title))
            .on('click', () => {
              if (!window.getVisible()) {
                if (!content) {
                  let url = URL.extractFromConfig(option, 'url', undefined, this.map_)
                  $.get(url.finalize(), data => {
                    content = data
                    showWindow()
                  })
                } else {
                  showWindow()
                }
              } else {
                hideWindow()
              }
            })
            .appendTo($entry)
      }
    }
    this.$menu_.hide()
  }

  addEntry ($content, size = 1) {
    this.get$Entry(size)
      .append($content)
      .appendTo(this.$menu_)
  }

  appendTo ($parent) {
    this.$parent_ = $parent
    // this.$parent_.addClass('g4u-layerbutton-with-accordion')
    this.$parent_
      .append(this.$button_)
      .append(this.$menu_)
  }

  toggleActive (active) {
    this.active_ = active === undefined ? !this.active_ : active
    if (this.active_) {
      this.$button_.addClass('g4u-accordion-active')
      this.$parent_.addClass('g4u-accordion-size-' + this.size_)
      this.$menu_.show()
    } else {
      this.$button_.removeClass('g4u-accordion-active')
      this.$parent_.removeClass('g4u-accordion-size-' + this.size_)
      this.$menu_.hide()
    }
  }
}
