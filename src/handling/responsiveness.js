export const responsivenessParam = {
  keys: [ 'responsive' ],
  setEvent: 'ready',
  setToMap: (map, query) => {
    if (query.isSet('responsive')) {
      map.set('responsive', JSON.parse(query.getSanitizedVal('responsive')))
    }
  },
  getFromMap: (map) => {
    return {
      responsive: map.get('responsive')
    }
  }
}
