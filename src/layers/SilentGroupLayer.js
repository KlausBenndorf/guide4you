import Group from 'ol/layer/Group'
import { unByKey } from 'ol/Observable'
import { mixin } from '../utilities'
import { BaseLayerMixin } from './BaseLayerMixin'

import { ProvideMapMixin } from './ProvideMapMixin'

export class SilentGroupLayer extends mixin(Group, ProvideMapMixin) {
  /**
   * @param {object} [options={}]
   */
  constructor (options = {}) {
    super(options)

    const listenerKeys = new WeakMap()

    this.getLayers().on('add', /** ol.CollectionEvent */ e => {
      const layer = e.element
      if (layer.provideMap) {
        layer.provideMap(this.getProvidedMap())
      }
      listenerKeys.set(layer, layer.on(['change:visible', 'change:childVisible'], () => {
        this.dispatchEvent({
          type: 'change:childVisible',
          child: layer
        })
      }))
    })

    this.getLayers().on('remove', /** ol.CollectionEvent */ e => {
      const layer = e.element
      if (layer.provideMap) {
        layer.provideMap(null)
      }
      unByKey(listenerKeys.get(layer))
      listenerKeys.delete(layer)
    })
  }

  /**
   * The provideMap methods of all contained children are called recursively
   * @param {G4UMap} map
   */
  provideMap (map) {
    super.provideMap(map)

    this.getLayers().forEach(layer => {
      if (layer.provideMap) { layer.provideMap(map) }
    })
  }
}

export class BaseSilentGroupLayer extends mixin(SilentGroupLayer, BaseLayerMixin) {

}
