import ol from 'openlayers'
import $ from 'jquery'
import 'babel-polyfill'

import 'file-loader?name=images/[name].[ext]!../images/g4u-logo.png'

import 'polyfill!requestAnimationFrame,cancelAnimationFrame,Element.prototype.classList,URL'

window.jQuery = window.jQuery || $

import {G4UMap} from './G4UMap'
import {Debug} from './Debug'

export function createMapInternal (element, clientConfPath, layerConfPath, options) {
  if (Array.isArray(options)) { // backwards compatibility
    options = { modules: options }
  }

  return new Promise((resolve, reject) => {
    $(document).ready(() => {
      if (!$) {
        reject('jQuery not available.')
      } else {
        let v = $().jquery.split('.')
        if (+v[0] < 2 && +v[1] < 9) {
          Debug.error('You are using an outdated version of jQuery. Please use version 1.9 or higher.')
        }
      }

      if (!ol) {
        reject('OpenLayers not available.')
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
