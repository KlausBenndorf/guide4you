export const availableLayersParam = {
  keys: [ 'avalay' ],
  setEvent: 'afterConfiguring',
  setToMap: (map, query) => {
    if (query.isSet('avalay')) {
      let layerIds = query.getArray('avalay')

      if (layerIds.length > 0) {
        let visibleBaseLayer
        let countAvailable = 0

        map.get('baseLayers').recursiveForEach(layer => {
          if (!visibleBaseLayer && layer.getVisible()) {
            visibleBaseLayer = layer
          }
          let available = layerIds.indexOf(layer.get('id').toString()) > -1
          layer.set('available', available)
          if (available) {
            countAvailable++
          }
        })

        // make at least one baselayer visible
        if (countAvailable === 0) {
          visibleBaseLayer.set('available', true)
          visibleBaseLayer.setVisible(true)
        }

        map.get('featureLayers').recursiveForEach(layer => {
          layer.set('available', layerIds.indexOf(layer.get('id').toString()) > -1)
        })
      }

      map.get('configurator').configureUI()
    }
  },
  getFromMap: (map, query) => {
    let layerIds = []

    function forEachLayer (layer) {
      if (layer.get('available')) {
        layerIds.push(layer.get('id'))
      }
    }

    map.get('baseLayers').recursiveForEach(forEachLayer)
    map.get('featureLayers').recursiveForEach(forEachLayer)

    return {
      avalay: layerIds.join(',')
    }
  }
}
