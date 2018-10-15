import $ from 'jquery'

import { ControlLogicMixin } from './ControlLogicMixin'
import { cssClasses } from '../globals'
import { recursiveSelect } from '../utilities'

/**
 * This class does all generic rewiring including catching the target and restyling the tooltips
 * It is important to provide a className in the control because else it will not be possible to find the control in
 * the ol-viewport
 */
export class RewireMixin extends ControlLogicMixin {
  /**
   * @param {g4uControlOptions} [options={}]
   */
  initialize (options = {}) {
    options.singleButton = false

    super.initialize(options)

    this.rewire()
  }

  /**
   * This function tweaks the control a little bit
   */
  rewire () {
    recursiveSelect(this.get$Element(), 'button[title]')
      .each(function () {
        let title = $(this).attr('title')
        $(this).addClass(cssClasses.hasTooltip).removeAttr('title').append(`<span role='tooltip'>${title}</span>`)
      })
  }
}
