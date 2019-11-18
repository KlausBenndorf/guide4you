import { Debug } from './Debug'

/**
 * @typedef {object} PopupContent
 * @property {string} name
 * @property {string} description
 */

/**
 * @callback PopupModifier
 * @param {PopupContent} popupContent
 * @param {G4UMap} map
 * @returns {Promise.<PopupContent>|PopupContent}
 */

/**
 * Allow the registration of PopupModifiers via the PopupModifier API.
 * Registration:
 * map.api.popupModifier.register(name, popupModifier)
 * ```
 *  map.api.popupModifier.register('modification', (content, map) => {
 *    return {
 *      name: content.name,
 *      description: content.description.replace(/f/g, 'k')
 *    }
 *  })
 * ```
 * Configuration:
 * Layer specific modifiers need to be enabled in the layer object and can be referenced in an array. It is supported
 * for Vector layers and featureInfo enabled WMS layers.
 * ```
 *  {
 *    "type": "KML",
 *    "popupModifiers": ["modification"],
 *    ...
 *  }
 *  ```
 *  Or it can be done globally in the FeaturePopup configuration.
 *  ```
 *  "featurePopup": {
 *    "popupModifiers": ["modification"],
 *    ...
 *  }
 *  ```
 */
export class PopupModifierManager {
  constructor () {
    /**
     * @type {Map.<string,PopupModifier>}
     * @private
     */
    this.popupModifiers_ = new Map()
  }

  /**
   * register a text mutator with a name.
   * @param {string} name
   * @param {PopupModifier} popupModifier
   */
  register (name, popupModifier) {
    this.popupModifiers_.set(name, popupModifier)
  }

  /**
   * @param {PopupContent} popupContent
   * @param {G4UMap} map
   * @param {string[]} popupModifiers
   * @returns {Promise.<PopupContent>}
   */
  apply (popupContent, map, popupModifiers) {
    let promiseContent = Promise.resolve(popupContent)

    for (let m of popupModifiers) {
      let popupModifier = this.popupModifiers_.get(m)
      if (popupModifier) {
        promiseContent = promiseContent.then(result => popupModifier(result, map))
      } else {
        Debug.error(`Trying to use unregistered modifier ${m}`)
      }
    }

    return promiseContent
  }
}
