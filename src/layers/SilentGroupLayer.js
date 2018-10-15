import ol from 'ol'
import {ProvideMapMixin} from './ProvideMapMixin'
import {BaseLayerMixin} from './BaseLayerMixin'
import {mixin} from '../utilities'

export class SilentGroupLayer extends mixin(ol.layer.Group, ProvideMapMixin) {
  /**
   * @param {object} [options={}]
   */
  constructor (options = {}) {
    super(options)

    let listenerKeys = new WeakMap()

    this.getLayers().on('add', /** ol.CollectionEvent */ e => {
      let layer = e.element
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
      let layer = e.element
      if (layer.provideMap) {
        layer.provideMap(null)
      }
      ol.Observable.unByKey(listenerKeys.get(layer))
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
