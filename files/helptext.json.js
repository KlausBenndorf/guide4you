// As the webpack loader's exec method is broken we need to do plain ES5 here

var merge = require('lodash/merge')

module.exports = merge(require('guide4you/files/helptext.json.js'), {
  'de': {
    'linkGeneratorButton': {
      'img': ['button-link.png'],
      'descr': ['Mit dieser Schalt&shy;fl&auml;che zeigen Sie einen Link (Verweis) auf die aktuell dargestellte Karten&shy;ansicht an.']
        'Karten&shy;ansicht an.'
    }
  },
  // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  'en': {
    'linkGeneratorButton': {
      'img': ['button-link.png'],
      'descr': ['Use this button to display a link to the current view of the map.']
    }
  },
  'ar': {
    'linkGeneratorButton': {
      'img': ['button-link.png'],
      'descr': ['استخدم هذا الزر لعرض رابط إلى العرض الحالي للخريطة']
    }
  }
})
