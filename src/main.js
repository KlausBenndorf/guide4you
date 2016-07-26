import ol from 'openlayers'
import $ from 'jquery'

// import licenses once
import 'file?name=licenses/OpenLayers.txt!node_modules/openlayers/LICENSE.md'
import 'file?name=licenses/jQuery.txt!node_modules/jquery/LICENSE.txt'

import 'file?name=images/[name].[ext]!../images/g4u-logo.png'

// for remote analysis and debugging - not used inside of the software
window.ol = window.ol || ol
window.$ = window.$ || $

import G4UMap from './G4UMap'

import 'polyfill!requestAnimationFrame,cancelAnimationFrame'

export function createG4U (element, mapConfig, layerConfig, modules) {
  return new Promise((resolve, reject) => {
    $(document).ready(() => {
      if (!ol) {
        reject('OpenLayers was not loaded.')
      }

      if (!ol.has.CANVAS) {
        reject('Browser does not support Canvas.')
      }

      $(element).empty()

      // for remote analysis and debugging - not used inside of the software
      window.map = new G4UMap(element, mapConfig, layerConfig, {
        modules: modules
      })

      resolve(window.map)
    })
  })
}
