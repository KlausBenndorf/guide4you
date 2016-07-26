import Module from 'guide4you/src/Module'
import SearchControl from './SearchControl'

/**
 * @typedef {object} SearchControlModuleOptions
 * @property {object.<string, SearchParser>} parsers
 */

export default class SearchControlModule extends Module {
  /**
   * @param {SearchControlModuleOptions} options
   */
  constructor (options) {
    super()
    /**
     * @type {SearchControl[]}
     * @private
     */
    this.searchControls_ = []
    /**
     * @type {Object.<string, SearchParser>}
     * @private
     */
    this.searchParsers_ = options.parsers
  }

  /**
   * This method is called if the ControlFactory cant construct controls of this type
   * @param {string} controlType
   * @param {g4uControlOptions} options
   * @param {ComposedControl|G4UMap} receiver
   * @returns {undefined|SearchControl}
   */
  createControl (controlType, options, receiver) {
    switch (controlType) {
      case 'searchControl':
        options.parsers = this.searchParsers_
        let control = new SearchControl(options)
        this.searchControls_.push(control)
        return control
    }
  }

  /**
   * Thsi method is called if the map enables userActionTracking
   * @returns {undefined}
   */
  enableUserActionTracking () {
    for (let searchControl of this.searchControls_) {
      searchControl.on('searchEnd', e => {
        this.getMap().dispatchEvent({
          type: 'userActionTracking',
          action: 'search',
          value: e.searchTerm
        })
      })
    }
  }
}
