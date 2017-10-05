/**
 * @type {URLParameter}
 */
export const rotationParam = {
  keys: ['rot'],
  setEvent: 'afterConfiguring',
  setToMap: (map, query) => {
    if (query.isSet('rot')) {
      map.getView().setRotation(Math.PI * query.getSanitizedVal('rot') / 180)
    }
  },
  getFromMap: (map, query) => {
    if (!query.isExcluded('rot')) {
      return {
        rot: 180 * map.getView().getRotation() / Math.PI
      }
    }
  }
}
