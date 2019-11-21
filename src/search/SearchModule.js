import { Module } from '../Module'
import { Debug } from '../Debug'
import { SearchControl } from './SearchControl'

/**
 * @typedef {object} SearchControlModuleOptions
 * @property {object.<string, SearchConnector>} connectors
 */

export class SearchModule extends Module {
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
     * @type {Object.<string, SearchConnector>}
     * @private
     */
    this.searchConnectors_ = options.connectors
  }

  /**
   * @param {SearchConnectorOptions} type
   * @returns {SearchConnector}
   */
  getConnector (options) {
    if (!this.searchConnectors_.hasOwnProperty(options.type)) {
      Debug.error('No valid connector for searchControl specified! (Option "connector.type", current value: ' +
        options.type + ')')
    }
    return new this.searchConnectors_[options.type](options)
  }

  /**
   * This method is called if the ControlFactory cant construct controls of this type
   * @param {string} controlType
   * @param {g4uControlOptions} options
   * @param {ComposedControl|G4UMap} receiver
   * @returns {undefined|SearchControl}
   */
  createControl (controlType, options, receiver) {
    if (controlType === 'searchControl') {
      const control = new SearchControl(this, options)
      this.searchControls_.push(control)
      return control
    }
  }

  /**
   * This method is called if the map enables userActionTracking
   * @returns {undefined}
   */
  enableUserActionTracking () {
    for (const searchControl of this.searchControls_) {
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
