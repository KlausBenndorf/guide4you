import ol from 'openlayers'
import { mixin } from '../utilities'
import { RewireMixin } from './RewireMixin'

import '../../less/scaleline.less'
import { ListenerOrganizerMixin } from '../ListenerOrganizerMixin'

/**
 * @extends Control
 */
export class ScaleLine extends mixin(mixin(ol.control.ScaleLine, RewireMixin), ListenerOrganizerMixin) {
  /**
   * @param {g4uControlOptions} [options={}]
   */
  constructor (options = {}) {
    options.className = (options.hasOwnProperty('className')) ? options.className : 'g4u-scale-line'
    super(options)
  }

  setMap (map) {
    if (this.getMap()) {
      this.detachAllListeners()
    }
    super.setMap(map)
    if (map) {
      this.listenAt(map.getView()).on('change:resolution', () => this.dispatchEvent('change:size'))
    }
  }
}
