// As the webpack loader's exec method is broken we need to do plain ES5 here

var merge = require('lodash/merge')

module.exports = merge(require('guide4you/files/l10n.json.js'), {
  'SearchControl noSearchResults': {
    'de': 'Keine Suchergebnisse',
    'en': 'No search results',
    'pl': 'Brak wynik&oacute;w wyszukiwania',
    'ar': 'ل يوجد نتائج للبحث'
  },
  'SearchControl placeholder': {
    'de': 'Bitte Suche eingeben',
    'en': 'Please enter search',
    'pl': 'Wprowad&zacute; dane do wyszukiwania',
    'ar': 'ادخل رجاء ما تبحث عنه'
  },
  'SearchControl searchButton': {
    'de': 'Suchen',
    'en': 'Search',
    'pl': 'Szukaj',
    'ar': 'البحث'
  }
})
