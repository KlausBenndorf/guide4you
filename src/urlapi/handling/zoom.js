/**
 * @type {URLParameter}
 */
export const zoomParam = {
  keys: ['zoom'],
  setEvent: 'afterConfiguring',
  setToMap: (map, query) => {
    if (query.isSet('zoom')) {
      map.getView().setZoom(parseFloat(query.getSanitizedVal('zoom')))
    }
  },
  getFromMap: (map, query) => {
    if (!query.isExcluded('zoom')) {
      return {
        zoom: map.getView().getZoom()
      }
    }
  }
}
