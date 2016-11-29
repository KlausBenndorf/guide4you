import ol from 'openlayers'
import {mixin} from '../utilities'
import {RewireMixin} from './RewireMixin'

import '../../less/scaleline.less'

/**
 * @extends Control
 */
export class ScaleLine extends mixin(ol.control.ScaleLine, RewireMixin) {
  /**
   * @param {g4uControlOptions} [options={}]
   */
  constructor (options = {}) {
    options.className = (options.hasOwnProperty('className')) ? options.className : 'g4u-scale-line'
    super(options)
  }
}
