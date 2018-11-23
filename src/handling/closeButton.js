/**
 * @type {URLParameter}
 */
export const closeButtonParam = {
  keys: [ 'clsbtn' ],
  setEvent: 'ready:ui',
  setToMap: (map, query) => {
    if (query.isTrue('clsbtn')) {
      map.get('UIConfigurator').controlFactory.addControlTo(map, 'closeWindowButton')
      map.get('history').setOnLeave(() => window.close())
    }
  }
  // get is not supported (closeButton does only work if the map was opened programmatically, it makes no sense to
  // duplicate it to a linked page)
}
