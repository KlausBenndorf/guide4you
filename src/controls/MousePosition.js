import OlMousePosition from 'ol/control/MousePosition'

import { mixin } from '../utilities'
import { RewireMixin } from './RewireMixin'

import '../../less/mouseposition.less'

/**
 * @typedef {g4uControlOptions} MousePositionOptions
 * @property {function} [coordinateFormat]
 */

/**
 * @extends Control
 */
export class MousePosition extends mixin(OlMousePosition, RewireMixin) {
  /**
   * @param {MousePositionOptions} [options={}]
   */
  constructor (options = {}) {
    options.className = (options.hasOwnProperty('className')) ? options.className : 'g4u-mouseposition'

    let truncateToString = (x, length) => {
      let lead = x.toString().match(/^[^.]*/)[ 0 ]
      if (lead.length >= length) {
        return lead
      } else {
        return x.toFixed(length - lead.length)
      }
    }

    let digits = options.digits || 8

    options.coordinateFormat = c => {
      return `${truncateToString(c[0], digits)}, ${truncateToString(c[1], digits)}`
    }

    let dashs = '&ndash;' + '.' + '&ndash;'.repeat(digits - 1)
    options.undefinedHTML = `${dashs}, ${dashs}`

    super(options)
  }
}
