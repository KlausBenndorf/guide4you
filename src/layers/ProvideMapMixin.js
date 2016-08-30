export class ProvideMapMixin {
  /**
   * @param {G4UMap} map
   */
  provideMap (map) {
    /**
     * @type {G4UMap|undefined}
     * @private
     */
    this.providedMap_ = map
  }

  /**
   * @returns {G4UMap|undefined}
   */
  getProvidedMap () {
    return this.providedMap_
  }
}
