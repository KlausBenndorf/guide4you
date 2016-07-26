// As the webpack loader's exec method is broken we need to do plain ES5 here

var merge = require('lodash/merge')

module.exports = merge(require('guide4you/files/l10n.json.js'), {
  'SearchControl noSearchResults': {
    'de': 'Keine Suchergebnisse',
    'en': 'No search results',
    'pl': 'Brak wynik&oacute;w wyszukiwania'
  },
  'SearchControl placeholder': {
    'de': 'Bitte Suche eingeben',
    'en': 'Please enter search',
    'pl': 'Wprowad&zacute; dane do wyszukiwania'
  },
  'SearchControl searchButton': {
    'de': 'Suchen',
    'en': 'Search',
    'pl': 'Szukaj'
  }
})
