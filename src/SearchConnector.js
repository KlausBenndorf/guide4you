import { URL } from 'guide4you/src/URLHelper'
import zip from 'lodash/zip'

/**
 * @typedef {Object} SearchConnectorOptions
 * @property {string} type
 * @property {URLLike} serviceURL
 * @property {L10N} localiser
 */
export class SearchConnector {
  /**
   * @param {SearchConnectorOptions} options
   */
  constructor (options) {
    /**
     * @type {URL}
     * @protected
     */
    this.serviceURL = URL.extractFromConfig(options, 'serviceURL')

    /**
     * @type {L10N}
     * @protected
     */
    this.localiser = options.localiser
  }

  static flipTuples (tuples) {
    if (tuples.length) {
      return zip(...tuples)
    }
    return [[], []]
  }

  setMap (map) {
    if (map) {
      this.serviceURL.extractParamsFromMap(map)
      this.featureProjection = map.getView().getProjection()
      this.map_ = map
    }
  }

  getMap () {
    return this.map_
  }

  /**
   * @param {string} text
   * @abstract
   * @returns {Promise<[string[], *[]]>}
   */
  getAutoComplete (text) {
    throw new Error('Function getAutoComplete not implemented!')
  }

  /**
   * @param {string} text
   * @abstract
   * @returns {Promise<[string[], ol.Feature[]]>}
   */
  getSearchResult (text) {
    throw new Error('Function getSearchResult not implemented!')
  }

  /**
   * @param {*} handle
   * @abstract
   * @returns {Promise<ol.Feature>}
   */
  getByHandle (handle) {
    throw new Error('Function getByHandle not implemented!')
  }
}
