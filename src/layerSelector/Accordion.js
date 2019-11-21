import $ from 'jquery'

import '../../less/layerselectoraccordion.less'
import '../../less/slider.less'
import { Window } from '../html/Window'
import { URL } from '../URLHelper'

export class Accordion {
  constructor (map, options, localiser) {
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

  setActive (active) {
    this.$menu_.toggleClass('g4u-layer-active', active)
  }

  setVisible (visible) {
    this.visible_ = visible
    this.$button_.toggleClass('g4u-accordion-active', visible)
    this.$button_.parent().toggleClass('g4u-accordion-size-' + this.size_, visible)
    if (visible) {
      this.$menu_.show()
    } else {
      this.$menu_.hide()
    }
  }

  getVisible () {
    return this.visible_
  }

  addTransparencySlider (layer) {
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
      .val(1 - layer.getOpacity())
    $slider.append($input)
    $input.on('input', () => {
      layer.setOpacity(1 - parseFloat($input.val()))
    })
    layer.on('change:opacity', () => {
      $input.val(1 - layer.getOpacity())
    })
  }

  addWindow (options) {
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

    const hideWindow = () => {
      window.setVisible(false)
    }

    $('<button>')
      .addClass('g4u-accordion-entry-content')
      .html(this.localiser_.selectL10N(options.title))
      .on('click', () => {
        if (!window.getVisible()) {
          if (!content) {
            const url = URL.extractFromConfig(options, 'url', undefined, this.map_)
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

  buildHTML () {
    this.$button_ = $('<span>')
      .addClass('g4u-accordion-button')
      .addClass('button')
      .on('click', () => {
        this.setVisible(!this.getVisible())
      })
    this.$menu_ = $('<div>')
      .addClass('g4u-accordion-menu')
    this.$menu_.hide()
  }

  addEntry ($content, size = 1) {
    this.get$Entry(size)
      .append($content)
      .appendTo(this.$menu_)
  }

  get$Element () {
    return this.$button_.add(this.$menu_)
  }
}
