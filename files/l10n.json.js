// As the webpack loader's exec method is broken we need to do plain ES5 here

var merge = require('lodash/merge')

module.exports = merge(require('guide4you/files/l10n.json.js'), {
  'LinkGenerator afterLinkText': {
    'de': ' um Karte in neuem Fenster anzuzeigen.',
    'en': ' to show map in a new window.',
    'pl': ' aby pokaza&cacute; map&eogon; w nowym oknie.',
    'ar': 'لمشاهدة الخريطة في نافذة العرض الجديدة'
  },
  'LinkGenerator beforeLinkText': {
    'de': '',
    'en': '',
    'pl': '',
    'ar': ''
  },
  'LinkGenerator linkText': {
    'de': 'Hier klicken',
    'en': 'Click here',
    'pl': 'Kliknij tutaj',
    'ar': 'اضغط هنا'
  },

  'LinkGeneratorButton hint': {
    'de': 'Benutzen Sie Strg-C oder das Kontextmen&uuml; um den Link zu kopieren',
    'en': 'Use Ctrl-C or context menu to copy link',
    'pl': 'U&zdot;yj Ctrl-C lub menu kontekstowego, aby skopiowa&cacute; link',
    'ar': 'استخدم Ctrl-C أو قائمة السياق لنسخ الرابط'
  },
  'LinkGeneratorButton markerText': {
    'de': '',
    'en': '',
    'pl': '',
    'ar': ''
  },
  'LinkGeneratorButton setMarkerText': {
    'de': 'Marker platzieren (optional)',
    'en': 'Place marker (optional)',
    'pl': 'Umie&sacute;&cacute; znacznik',
    'ar': 'علامة المكان (اختياري)'
  },
  'LinkGeneratorButton setMarkerTextBoxText': {
    'de': 'Text eingeben:',
    'en': 'Insert text:',
    'pl': 'Dodaj tekst:',
    'ar': 'إدخال نص'
  },
  'LinkGeneratorButton tipLabel': {
    'de': 'Link zur aktuellen Ansicht',
    'en': 'Link to current view',
    'pl': 'Link do bie&zdot;&aogon;cego widoku',
    'ar': 'رابط إلى العرض الحالي'
  },
  'LinkGeneratorButton title': {
    'de': 'Link',
    'en': 'Link',
    'pl': 'Link',
    'ar': 'حلقة الوصل'
  }
})
