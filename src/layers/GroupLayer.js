import ol from 'openlayers'
import {ProvideMapMixin} from './ProvideMapMixin'
import {mixin} from '../utilities'

/**
 * This Class is a Wrap around {ol.layer.Group} providing some extra functionality. This class is normally used for a
 * category of layers containing them.
 */
export class GroupLayer extends mixin(ol.layer.Group, ProvideMapMixin) {
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
      listenerKeys.set(layer, layer.on('change:visible', () => {
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

  /**
   * calls callback for every terminal, non-group Layer
   * @param {Function} callback
   */
  recursiveForEach (callback) {
    this.getLayers().forEach(layer => {
      callback(layer, this)
      if (layer.recursiveForEach) {
        layer.recursiveForEach(callback)
      }
    })
  }

  /**
   * Attachs a listener to each layer and to each newly added listener and removes the listener if the layer gets
   * removed.
   * @param eventType
   * @param listener
   */
  forEachOn (eventType, listener) {
    this.recursiveForEach(layer => {
      layer.on(eventType, listener)
      if (layer instanceof GroupLayer) {
        this.getLayers().on('add', (e) => {
          e.element.on(eventType, listener)
        })
        this.getLayers().on('remove', (e) => {
          e.element.un(eventType, listener)
        })
      }
    })
  }

  /**
   * Checks how many children are visible. Doesn't check visibility of the group layer
   * @returns {number}
   */
  countChildrenVisible () {
    let array = this.getLayersArray()
    let count = 0

    for (let i = 0, ii = array.length; i < ii; i++) {
      if (array[i] instanceof GroupLayer) {
        count += array[i].countChildrenVisible()
      } else if (array[i].getVisible()) {
        count += 1
      }
    }
    return count
  }

  countChildren () {
    let array = this.getLayersArray()
    let count = 0

    for (let i = 0, ii = array.length; i < ii; i++) {
      if (array[i] instanceof GroupLayer) {
        count += array[i].countChildren()
      } else {
        count += 1
      }
    }
    return count
  }

  /**
   * Returns the layers inside as an array.
   * @returns {ol.layer.Base[]}
   */
  getLayersArray () {
    return this.getLayers().getArray()
  }

  /**
   * Returns the number of direct child layers
   * @returns {number}
   */
  getLength () {
    return this.getLayers().getLength()
  }

  /**
   * checks if the given layer is a child of the grouplayer
   * @param {ol.layer.Base} layer
   * @returns {boolean}
   */
  isParentOf (layer) {
    let found = false
    this.recursiveForEach(function (childLayer) {
      if (layer === childLayer) {
        found = true
      }
    })
    return found
  }

  /**
   * Returns all ids of all contained layers and its own.
   * @returns {number[]}
   */
  getIds () {
    let ids = [this.get('id')]

    let array = this.getLayersArray()

    for (let i = 0, ii = array.length; i < ii; i++) {
      if (array[i].getIds) {
        ids = ids.concat(array[i].getIds())
      } else {
        ids.push(array[i].get('id'))
      }
    }

    return ids
  }

  /**
   * Returns all attributions of all visible layers.
   * @returns {number[]}
   */
  getAttributions () {
    let attributions = []

    this.recursiveForEach(function (layer) {
      if (layer.getVisible()) {
        if (layer.getSource) {
          let atts = layer.getSource().getAttributions()
          if (atts) {
            attributions = attributions.concat(atts)
          }
        }
      }
    })

    return attributions
  }

  /**
   * Remove layer by id
   * @param {string|number} id
   */
  removeLayerById (id) {
    let layers = this.getLayers()
    for (let i = 0; i < layers.getLength(); i++) {
      if (layers.item(i).get('id') === id) {
        return layers.removeAt(i)
      } else if (layers.item(i).removeLayerById) {
        let res = layers.item(i).removeLayerById(id)
        if (res) {
          return res
        }
      }
    }
  }

  /**
   * Find layer with callback
   * @param {Function} cb
   */
  findLayer (cb) {
    for (let layer of this.getLayersArray()) {
      if (cb(layer)) {
        return layer
      } else if (layer.findLayer) {
        let res = layer.findLayer(cb)
        if (res) {
          return res
        }
      }
    }
  }

  /**
   * Get layer by id
   * @param {string|number} id
   */
  getLayerById (id) {
    for (let layer of this.getLayersArray()) {
      if (layer.get('id') === id) {
        return layer
      } else if (layer.getLayerById) {
        let res = layer.getLayerById(id)
        if (res) {
          return res
        }
      }
    }
  }

  /**
   * removes layer
   * @param {ol.layer.Base} layer
   */
  removeLayer (layer) {
    let found = this.getLayers().remove(layer)
    if (!found) {
      this.getLayers().forEach(subLayer => {
        if (!found && subLayer.removeLayer) {
          found = subLayer.removeLayer(layer)
        }
      })
    }
    return found
  }

  /**
   * gives an object with ids as keys and visibility as value
   * @returns {Object.<string|number,boolean>}
   */
  getIdsVisibilities () {
    let visibilities = {}
    this.recursiveForEach(layer => {
      if (layer.get('id')) {
        visibilities[layer.get('id')] = layer.getVisible()
      }
    })
    return visibilities
  }

  /**
   * Sets the visibility of the layers to the given visibility
   * @param {Object.<string|number,boolean>} visibilities
   */
  setIdsVisibilities (visibilities) {
    this.recursiveForEach(layer => {
      if (layer.get('id')) {
        layer.setVisible(visibilities[layer.get('id')])
      }
    })
  }

  /**
   * Checks if the group contains the layer
   * @param {ol.layer.Layer} layer
   * @returns {boolean}
   */
  containsLayer (layer) {
    return this.getLayers().getArray().some(subLayer => {
      if (subLayer === layer) {
        return true
      }
      if (subLayer.containsLayer) {
        return subLayer.containsLayer(layer)
      }
    })
  }
}
