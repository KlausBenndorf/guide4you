import $ from 'jQuery'

import { cssClasses } from '../globals'
import { FeatureInteraction } from './FeatureInteraction'

export class ClickableInteraction extends FeatureInteraction {
  constructor (options) {
    options.type = 'pointermove'
    super(options)
    this.filters_ = []

    this.on('interaction', e => {
      const clickable = e.interacted
        .map(o => o.feature)
        .some(feature => this.filters_.some(filter => filter(feature)))
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
