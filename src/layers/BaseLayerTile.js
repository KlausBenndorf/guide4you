import ol from 'openlayers'

import BaseLayerMixin from './BaseLayerMixin'
import LayerLoadProcessCountMixin from './LayerLoadProcessCountMixin'
import { mixin } from '../utilities'

export default class BaseLayerTile extends mixin(mixin(ol.layer.Tile, BaseLayerMixin), LayerLoadProcessCountMixin) {
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
