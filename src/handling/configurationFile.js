export const configurationFileParam = {
  keys: [ 'conf' ],
  setEvent: 'beforeConfigLoad',
  setToMap: (map, query) => {
    if (query.isSet('conf')) {
      let val = query.getInjectUnsafeVal('conf').trim()
      if (val.match(/^(?:[a-z]+:)?\/\//i)) {
        throw new Error('The provided conf parameter is absolute. Only relative paths are allowed.')
      }
      map.set('configFileName', val)
    }
  },
  getFromMap: (map) => {
    return {
      conf: map.get('configFileName')
    }
  }
}
