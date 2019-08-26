import $ from 'jquery'

import { cssClasses } from '../globals'
import { MapEventInteraction } from './MapEventInteraction'

export class ClickableInteraction extends MapEventInteraction {
  constructor (options) {
    options.type = 'pointermove'
    super(options)
    this.filters_ = []

    this.on('mapevent', e => {
      const clickable = this.filters_.some(f => f(e.mapEvent))
      if (clickable) {
        $(this.getMap().getViewport()).addClass(cssClasses.clickable)
      } else {
        $(this.getMap().getViewport()).removeClass(cssClasses.clickable)
      }
    })
  }

  addFilter (filter) {
    this.filters_.push(filter)
  }
}
