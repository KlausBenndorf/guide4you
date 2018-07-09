import { groupBy, map } from 'lodash/collection'
import { ListenerOrganizerMixin } from './ListenerOrganizerMixin'
import { GroupLayer } from './layers/GroupLayer'
import { uniq } from 'lodash/array'
import { debounce } from 'lodash/function'
import { mixin } from './utilities'

import ol from 'openlayers'

function groupByChain (col) {
  return {
    groupBy: (cb) => {
      return groupByChain(groupBy(col, cb))
    },
    forEach: (cb) => {
      return groupByChain(col.forEach(cb))
    },
    map: (cb) => {
      return groupByChain(map(col, cb))
    },
    asArray: () => {
      return col
    }
  }
}

export class Attributions extends mixin(ol.Observable, ListenerOrganizerMixin) {
  constructor () {
    super()
    /**
     * @type {string[]}
     * @private
     */
    this.attributions_ = []

    this.debouncedUpdate = debounce(() => this.update())
  }

  /**
   * @param {G4UMap} map
   */
  setMap (map) {
    if (this.map_) {
      this.attributions_ = []
      this.detachAllListeners()
    }

    this.map_ = map

    if (map) {
      map.asSoonAs('ready:layers', true, () => {
        setTimeout(() => {
          this.attachListeners(this.map_.getLayerGroup())
          this.update()
        }, 0)
      })
    }
  }

  getArray () {
    return this.attributions_
  }

  scanLayers () {
    return this.scanLayer(this.map_.getLayerGroup())
  }

  scanLayer (layer, layerTitle = null) {
    if (layer && layer.getVisible()) {
      if (layer.getLayers) {
        let silentGroup = !(layer instanceof GroupLayer)
        return layer.getLayers().getArray().reduce((arr, nextLayer) => {
          layerTitle = silentGroup ? layer.get('title') : null
          return arr.concat(this.scanLayer(nextLayer, layerTitle))
        }, [])
      } else {
        if (layer.getVisible()) {
          let label = layer.isBaseLayer
            ? this.map_.get('localiser').localiseUsingDictionary('Attribution baseLayerLabel')
            : (layerTitle || layer.get('title'))
          if (label) {
            return this.extractAttributions(layer, this.labelize(label))
          }
        }
      }
    }
    return []
  }

  extractAttributions (layer, label) {
    if (layer.getSource && layer.getSource()) {
      let attributions = layer.getSource().getAttributions()
      if (attributions) {
        return attributions().map(a => [label, a])
      }
      return []
    }
  }

  labelize (title) {
    return title.replace(/<[^>]*>/, ' ').replace(/\s{2,}/, ' ')
  }

  update () {
    this.attributions_ = groupByChain(this.scanLayers())
      .groupBy(([layerTitle, attribution]) => {
        return layerTitle
      }) // -> { layerTitle: [[layerTitle, attribution]*] }
      .map((val, key) => {
        return [key, val.map(p => p[1])]
      }) // -> [[layerTitle, attribution*]*]
      .groupBy(([layerTitle, attributions]) => {
        attributions = uniq(attributions)
        if (attributions.length === 1) {
          return attributions[0]
        } else {
          return attributions.join(' & ')
        }
      })
      .map((val, key) => {
        return [val.map(p => p[0]), key]
      })
      .map(([layerTitles, attributionText]) => {
        let text
        if (layerTitles.length === 1) {
          text = layerTitles[0]
        } else {
          text = layerTitles.slice(0, -1).join(', ') + ' & ' + layerTitles[layerTitles.length - 1]
        }
        text += ': ' + attributionText
        return text
      })
      .asArray()
    this.dispatchEvent('change', this.attributions_)
  }

  attachListeners (layer) {
    if (layer.getLayers) {
      layer.getLayers().forEach(l => this.attachListeners(l))
      this.listenAt(layer.getLayers())
        .on('add', e => {
          this.attachListeners(e.element)
          this.debouncedUpdate()
        })
        .on('remove', e => {
          this.detachFrom(e.element)
          this.debouncedUpdate()
        })
    }

    if (!(layer instanceof GroupLayer)) {
      this.listenAt(layer)
        .on('change:visible', () => {
          this.debouncedUpdate()
        })
        .on('change:source', () => {
          if (layer.getVisible()) {
            this.debouncedUpdate()
          }
        })
    }
  }
}
