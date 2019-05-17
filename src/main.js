import $ from 'jquery'

import '../images/g4u-logo.png'

import 'polyfill!requestAnimationFrame,cancelAnimationFrame,Element.prototype.classList,URL'
import { isPlainObject } from 'lodash/lang'

import { G4UMap } from './G4UMap'
import { Debug } from './Debug'
import { copy } from './utilitiesObject'

window.jQuery = window.jQuery || $

export function createMapInternal (element, args, defaultConfigs) {
  let configs = copy(defaultConfigs)
  let options
  if (args.length > 0) {
    if (isPlainObject(args[0])) {
      Object.assign(configs, args[0])
      if (args.length > 1) {
        options = args[1]
      }
    } else {
      Debug.warn('You are not using a config files object. Please use createMap like this: ' +
        '`createMap(target, { client: \'path/to/conf.json\', layer: \'path/to/other.json\' }, options)` \n' +
        'You can use an empty object if you want to pass options.')
      configs.client = args[0]
      if (args.length > 1) {
        configs.layer = args[1]
        if (args.length > 2) {
          options = args[2]
        }
      }
    }
  }

  return new Promise((resolve, reject) => {
    $(document).ready(() => {
      if (!$) {
        reject(new Error('jQuery not available.'))
      } else {
        let v = $().jquery.split('.')
        if (+v[0] < 2 && +v[1] < 9) {
          Debug.error('You are using an outdated version of jQuery. Please use version 1.9 or higher.')
        }
      }

      $(element).empty()

      // for remote analysis and debugging - not used inside of the software
      window.map = new G4UMap(element, configs, options)

      window.map.asSoonAs('ready', true, () => {
        resolve(window.map)
      })
    })
  })
}
