import ol from 'openlayers'

import LayerLoadProcessCountMixin from './LayerLoadProcessCountMixin'
import { mixin } from '../utilities'

/**
 * @typedef {object} VectorLayerOptions
 * @property {string[]} [mutators=[]] list of mutators (changes featurepopup content) to use for this layer.
 */

export default class VectorLayer extends mixin(ol.layer.Vector, LayerLoadProcessCountMixin) {
  constructor (options = {}) {
    super(options)

    this.on('change:visible', () => {
      if (this.getSource().setRefreshing) {
        this.getSource().setRefreshing(this.getVisible())
      }
    })

    // saving text mutators
    this.set('mutators', options.mutators || [])
  }

  /**
   * @param {G4UMap} map
   */
  setMap (map) {
    /**
     * WORKAROUND
     * As openlayers identifies managed layers (i.e. layers that are registered via the maps addLayer function)
     * by the fact that the setMap method was called and we need a reference to the map in layers contained in a
     * grouplayer, we overwrite the setMap method to still have access to the map via the normal way
     * @type {G4UMap}
     * @private
     */
    this.map__ = map
  }

  /**
   * @returns {G4UMap}
   */
  getMap () {
    return this.map__
  }
}
