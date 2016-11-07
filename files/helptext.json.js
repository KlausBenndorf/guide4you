// As the webpack loader's exec method is broken we need to do plain ES5 here

var merge = require('lodash/merge')

module.exports = merge(require('guide4you/files/helptext.json.js'), {
  "de": {
    "searchControl": {
      "img": [
        "search-inactive-de.png",
        "search-active.png"
      ],
      "joinWith": "<br>&nbsp;<br>",
      "descr": [
        "Mit diesem Element suchen Sie nach Adressen, Orten, und &Auml;hnlichem. Tippen Sie den Such&shy;begriff in das Such&shy;feld ein.",
        "W&auml;hlen Sie mit der Maus oder den Pfeil&shy;tasten aus den angezeigten Vorschl&auml;gen aus oder geben Sie den Such&shy;begriff vollst&auml;ndig ein. F&uuml;hren Sie die Suche aus, indem Sie die Enter-Taste bet&auml;tigen oder auf das Lupen&shy;symbol klicken.",
        "Die obere Abbildung zeigt die Suche im inaktiven Zustand, die untere mit Vorschl&auml;gen."
      ]
    }
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "en": {
    "searchControl": {
      "img": [
        "search-inactive-en.png",
        "search-active.png"
      ],
      "joinWith": "<br>&nbsp;<br>",
      "descr": [
        "Use this element to search for addresses, places and the like.",
        "Type a search term into the search field. Choose among the suggestions using the mouse or the arrow buttons or enter the full search term. Execute the search by pressing the Enter button or clicking the magnifying glass symbol.",
        "The upper image shows the search in inactive state, the lower image with suggestions being displayed."
      ]
    }
  }
})