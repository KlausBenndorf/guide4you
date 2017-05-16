export const layerConfigurationFileParam = {
  keys: [ 'layconf' ],
  setEvent: 'beforeConfigLoad',
  setToMap: (map, query) => {
    if (query.isSet('layconf')) {
      let val = query.getInjectUnsafeVal('layconf').trim()
      if (val.match(/^(?:[a-z]+:)?\/\//i)) {
        throw new Error('The provided layconf parameter is absolute. Only relative paths are allowed.')
      }
      map.set('layerConfigFileName', val)
    }
  },
  getFromMap: (map) => {
    return {
      layconf: map.get('layerConfigFileName')
    }
  }
}
