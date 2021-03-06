/**
 * @type {URLParameter}
 */
export const languageParam = {
  keys: ['lang'],
  setEvent: 'change:localiser',
  setToMap: (map, query) => {
    if (query.isSet('lang')) {
      map.get('localiser').setCurrentLang(query.getSanitizedVal('lang'))
    }
  },
  getFromMap: (map) => {
    return {
      lang: map.get('localiser').getCurrentLang()
    }
  }
}
