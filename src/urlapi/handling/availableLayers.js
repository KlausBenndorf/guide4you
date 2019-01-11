/**
 * @type {URLParameter}
 */
export const availableLayersParam = {
  keys: [ 'avalay' ],
  setEvent: 'afterConfiguring',
  setToMap: (map, query) => {
    if (query.isSet('avalay')) {
      let layerIds = query.getArray('avalay')

      if (layerIds.length > 0) {
        // let visibleBaseLayer
        // let countAvailable = 0

        map.getLayerGroup().recursiveForEach(layer => {
          // TODO: implement avaLay for new style baselayers
          // if (!visibleBaseLayer && layer.getVisible()) {
          //   visibleBaseLayer = layer
          // }
          let available = layerIds.indexOf(layer.get('id').toString()) > -1
          layer.set('available', available)
          // if (available) {
          //   countAvailable++
          // }
        })

        // // make at least one baselayer visible
        // if (countAvailable === 0) {
        //   visibleBaseLayer.set('available', true)
        //   visibleBaseLayer.setVisible(true)
        // }
      }

      map.get('configurator').configureUI()
    }
  },
  getFromMap: (map, query) => {
    let layerIds = []

    map.getLayerGroup().recursiveForEach(layer => {
      if (layer.get('available')) {
        layerIds.push(layer.get('id'))
      }
    })

    return {
      avalay: layerIds.join(',')
    }
  }
}
