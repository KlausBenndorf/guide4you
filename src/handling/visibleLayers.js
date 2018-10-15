import { GroupLayer } from 'guide4you/src/layers/GroupLayer'

/**
 * @type {URLParameter}
 */
export const visibleLayersParam = {
  keys: [ 'vislay' ],
  setEvent: 'afterConfiguring',
  setToMap: (map, query) => {
    if (query.isSet('vislay')) {
      let layerIds = query.getArray('vislay')

      let baseLayers = map.get('baseLayers')

      if (baseLayers) {
        baseLayers.recursiveForEach(layer => {
          if (!(layer instanceof GroupLayer)) {
            layer.setVisible(layerIds.indexOf(layer.get('id').toString()) > -1)
          }
        })
      }

      let featureLayers = map.get('featureLayers')

      if (featureLayers) {
        featureLayers.recursiveForEach(layer => {
          if (!(layer instanceof GroupLayer)) {
            layer.setVisible(layerIds.indexOf(layer.get('id').toString()) > -1)
          }
        })
      }
    }
  },
  getFromMap: (map, query) => {
    if (!query.isExcluded('vislay')) {
      let layerIds = []

      const forEachLayer = layer => {
        if (layer.getVisible()) {
          layerIds.push(layer.get('id'))
        }
      }

      map.get('baseLayers').recursiveForEach(forEachLayer)
      map.get('featureLayers').recursiveForEach(forEachLayer)

      return {
        vislay: layerIds.join(',')
      }
    }
  }
}
