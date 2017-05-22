import zip from 'lodash/zip'

import {addProxy} from 'guide4you/src/utilities'

/**
 * @typedef {Object} SearchConnectorOptions
 * @property {string} type
 * @property {string} serviceURL
 * @property {string} proxy
 * @property {boolean} useProxy
 * @property {L10N} localiser
 */
export class SearchConnector {
  /**
   * @param {SearchConnectorOptions} options
   */
  constructor (options) {
    /**
     * @type {string}
     * @protected
     */
    this.serviceURL = options.serviceURL

    /**
     * @type {boolean}
     * @private
     */
    this.useProxy_ = options.useProxy || (options.hasOwnProperty('useProxy') && options.proxy)

    /**
     * @type {string}
     * @private
     */
    this.proxy_ = options.proxy

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

  proxifyUrl (url) {
    return this.useProxy_ ? addProxy(url, this.proxy_ || this.getMap().get('proxy')) : url
  }

  setMap (map) {
    if (map) {
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
