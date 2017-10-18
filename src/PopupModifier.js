/**
 * @typedef {object} PopupContent
 * @property {string} name
 * @property {string} description
 */

export class PopupModifier {
  /**
   * @param {G4UMap} map
   */
  setMap (map) {
    /**
     * @type {G4UMap}
     * @private
     */
    this.map_ = map
  }

  /**
   * @returns {G4UMap}
   */
  getMap () {
    return this.map_
  }

  /**
   * overwrite this method
   * @param {PopupContent} popupContent
   * @returns {PopupContent|Promise.<PopupContent>}
   */
  modifyPopupContent (popupContent) {
    return popupContent
  }
}
