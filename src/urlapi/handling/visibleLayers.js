/**
 * @type {URLParameter}
 */
export const visibleLayersParam = {
  keys: ['vislay'],
  setEvent: 'afterConfiguring',
  setToMap: (map, query) => {
    if (query.isSet('vislay')) {
      const layerIds = query.getArray('vislay')

      map.getLayerGroup().recursiveForEach(layer => {
        layer.setVisible(layerIds.indexOf(layer.get('id').toString()) > -1)
      })
    }
  },
  getFromMap: (map, query) => {
    if (!query.isExcluded('vislay')) {
      const layerIds = []

      map.getLayerGroup().recursiveForEach(layer => {
        if (layer.getVisible()) {
          layerIds.push(layer.get('id'))
        }
      })

      return {
        vislay: layerIds.join(',')
      }
    }
  }
}
