/**
 * Base class for modules. It shows all usable methods.
 */
export class Module {
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
   * This method is called once when the map is configured
   * @param mapConfig
   * @returns {undefined}
   */
  configureMap (mapConfig) {
    return undefined
  }

  /**
   * This method is called every time the ui is recreated
   * @param mapConfig
   * @returns {undefined}
   */
  configureUI (mapConfig) {
    return undefined
  }

  /**
   * This method is called if the ControlFactory cant construct controls of this type
   * @param {string} controlType
   * @param {g4uControlOptions} options
   * @param {ComposedControl|G4UMap} receiver
   * @returns {undefined|Control}
   */
  createControl (controlType, options, receiver) {
    return undefined
  }

  /**
   * This method is called if the LayerFactory cant construct layers of this type
   * @param {string} type
   * @param {g4uLayerOptions} options
   * @param {SuperType} superType
   * @param {boolean} skipIdCheck
   * @returns {undefined|ol.layer.Base}
   */
  createLayer (type, options, superType, skipIdCheck) {
    return undefined
  }

  /**
   * Thsi method is called if the map enables userActionTracking
   * @returns {undefined}
   */
  enableUserActionTracking () {
    return undefined
  }
}
