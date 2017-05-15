import ol from 'openlayers'
import $ from 'jquery'

import 'file?name=images/[name].[ext]!../images/g4u-logo.png'

// for remote analysis and debugging - not used inside of the software
window.ol = window.ol || ol
window.$ = window.$ || $
window.jQuery = window.jQuery || $

import {G4UMap} from './G4UMap'

import 'polyfill!requestAnimationFrame,cancelAnimationFrame'

export function createG4UInternal (element, clientConfPath, layerConfPath, options) {
  if (Array.isArray(options)) { // backwards compatibility
    options = { modules: options }
  }

  return new Promise((resolve, reject) => {
    $(document).ready(() => {
      if (!ol) {
        reject('OpenLayers was not loaded.')
      }

      if (!ol.has.CANVAS) {
        $('.g4u-browser-support-message').show()
        reject('Browser does not support Canvas.')
      }

      $(element).empty()

      // for remote analysis and debugging - not used inside of the software
      window.map = new G4UMap(element, clientConfPath, layerConfPath, options)

      window.map.asSoonAs('ready', true, () => {
        resolve(window.map)
      })
    })
  })
}
