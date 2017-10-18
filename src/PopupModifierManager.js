import { Debug } from './Debug'

export class PopupModifierManager {
  constructor () {
    /**
     * @type {Map.<string,PopupModifier>}
     * @private
     */
    this.popupModifiers_ = new Map()
  }

  /**
   * register a text mutator with a name. Which mutator is finally used can be adjusted via the config files.
   * @param {string} name
   * @param {PopupModifier} popupModifier
   */
  register (name, popupModifier) {
    this.popupModifiers_.set(name, popupModifier)
  }

  /**
   * @param {PopupContent} popupContent
   * @param {string[]} popupModifiers
   * @returns {Promise.<PopupContent>}
   */
  apply (popupContent, popupModifiers) {
    let promiseContent = Promise.resolve(popupContent)

    for (let m of popupModifiers) {
      let popupModifier = this.popupModifiers_.get(m)
      if (popupModifier) {
        promiseContent = promiseContent.then(result => popupModifier.modifyPopupContent(result))
      } else {
        Debug.error(`Trying to use unregistered modifier ${m}`)
      }
    }

    return promiseContent
  }
}
