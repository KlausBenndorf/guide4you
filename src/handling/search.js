export const searchParam = {
  keys: [ 'search' ],
  setEvent: 'ready',
  setToMap: (map, query) => {
    if (query.isSet('search')) {
      let search = map.getControlsByName('searchControl')[ 0 ]
      if (search) {
        search.setSearchValue(query.getSanitizedVal('search'))
      }
    }
  }
}
