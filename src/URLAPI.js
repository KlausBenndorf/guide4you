import $ from 'jquery'

import {Debug} from 'guide4you/src/Debug'
import { Query } from './Query'

import { availableLayersParam } from './handling/availableLayers'
import { centerParam } from './handling/center'
import { closeButtonParam } from './handling/closeButton'
import { configurationFileParam } from './handling/configurationFile'
import { fitRectangleParam } from './handling/fitRectangle'
import { languageParam } from './handling/language'
import { layerConfigurationFileParam } from './handling/layerConfigurationFile'
import { markerParam } from './handling/marker'
import { responsivenessParam } from './handling/responsiveness'
import { rotationParam } from './handling/rotation'
import { searchParam } from './handling/search'
import { visibleLayersParam } from './handling/visibleLayers'
import { zoomParam } from './handling/zoom'

/**
 * @typedef {object} URLAPIOptions
 * @property {G4UMap} map
 * @property {string[]} [excluded] parameters to exclude
 */

/**
 * The purpose of the URLAPI is two-fold:
 *
 * 1)   to parse the page's search string, extract information like layers to
 *      be activated, the location, etc. and modify the map's state accordingly,
 *
 * 2)   to read the map's state and generate a link that said layers to be
 *      activated, the location, etc.
 */
export class URLAPI {
  /**
   * @param {URLAPIOptions} options
   */
  constructor (options) {
    /**
     * @type {G4UMap}
     * @private
     */
    this.map_ = options.map

    /**
     * In this object all initial values are stored. This is needed to create only the needed Parameters for an URL.
     * All getters are called once after the map is ready for the first time to fill this.
     * @type {object}
     * @private
     */
    this.initialValues_ = {}

    /**
     * @typedef {object} URLParameter
     * @property {string[]} keys an array of keys this URLParameter reacts to. If any of this are contined in the URL
     *    the setToMap function of this parameter is called.
     * @property {string} [setEvent] if this event is thrown by the map the setToMap function will be called.
     * @property {function} [setToMap] this function should adjust the map state according to the given keys.
     * @property {function} [getFromMap] this function is called to get the needed values from the map to create the
     *    needed URL Parameter(s). This function needs to return an object with key value pairs representing the values
     *    to be written in the URL
     */

    /**
     * @type {URLParameter[]}
     * @private
     */
    this.parameters_ = [
      availableLayersParam,
      centerParam,
      closeButtonParam,
      configurationFileParam,
      fitRectangleParam,
      languageParam,
      layerConfigurationFileParam,
      markerParam,
      responsivenessParam,
      rotationParam,
      searchParam,
      visibleLayersParam,
      zoomParam
    ]

    if (options.hasOwnProperty('moduleParameters') &&
      Array.isArray(options.moduleParameters) && options.moduleParameters.length) {
      this.parameters_ = this.parameters_.concat(options.moduleParameters)
    }

    /**
     * All used keys by all parameters
     * @type {string[]}
     * @private
     */
    this.parameterKeys_ = []

    /**
     * All getters by all parameters
     * @type {function[]}
     * @private
     */
    this.parameterGetters_ = []

    for (let parameterConf of this.parameters_) {
      // gather keys
      this.parameterKeys_ = this.parameterKeys_.concat(parameterConf.keys)

      // set values and gather values before setting to avoid unneccessary parameters
      if (parameterConf.hasOwnProperty('setToMap')) {
        this.map_.once(parameterConf.setEvent, () => {
          // read out initial value
          if (parameterConf.hasOwnProperty('getFromMap')) {
            $.extend(this.initialValues_, parameterConf.getFromMap(this.map_, this.query_))
          }
          // set value
          parameterConf.setToMap(this.map_, this.query_)
        })
      }

      // gather getters
      if (parameterConf.hasOwnProperty('getFromMap')) {
        this.parameterGetters_.push(parameterConf.getFromMap)
      }
    }

    this.query_ = new Query(this.parameterKeys_, options.excluded || [])
  }

  /**
   * Adds an layer which should be controlled with the URLAPI
   * @param {VectorLayer} layer needs to have a {{QuerySource}}
   * @param {string} key the key this layer should be controlled by
   */
  addApiLayer (layer, key) {
    if (this.parameterKeys_.indexOf(key) > -1) {
      Debug.error('Key is already in use.')
    } else if (key.toLowerCase() !== key) {
      Debug.error('Key should be lowercase.')
    } else {
      let queryString = window.location.search
      let match = queryString.match(new RegExp(key + '=(.*?)(&|$)', 'i'))
      if (match) {
        let value = match[ 1 ]
        Debug.info(value)
        this.queryValues[ key ] = value.split(',')
      }

      // get
      let get = () => {
        let obj = {}
        obj[ key ] = layer.getSource().getQueryValues()
        return obj
      }

      this.parameterGetters_.push(get)
      this.initialValues_[ key ] = get()[ key ]

      // set
      if (this.queryValues.hasOwnProperty(key)) {
        layer.getSource().setQueryValues(this.queryValues[ key ])
        layer.setVisible(true)
      }
    }
  }

  /**
   * Returns the value of a key in the URLAPI
   * @param {string} key
   * @returns {string}
   */
  get (key) {
    return this.queryValues[ key ]
  }

  /**
   * Create query string from map and optional name of config file
   * @param {object} [options={}]
   * @param {string} [options.baseURL] the base URL to use. Defaults to the current location.
   * @returns {string} Query string
   */
  makeURL (options = {}) {
    let baseURL = options.baseURL || window.location.href.match(/^[^?]*/)[ 0 ]

    let assignmentList = []

    /**
     * Compares if the two values are equal
     * @param valA
     * @param valB
     * @returns {boolean}
     */
    function equal (valA, valB) {
      if (typeof (valA) !== typeof (valB)) {
        return false
      }

      if (valA instanceof Array) {
        if (valA.length !== valB.length) {
          return false
        }
        for (let i = 0, ii = valA.length; i < ii; i++) {
          if (valA[ i ] !== valB[ i ]) {
            return false
          }
        }
        return true
      } else if (typeof (valA) === 'object') {
        throw new Error('object comparsion not supported atm.')
      } else {
        return valA === valB
      }
    }

    for (let getter of this.parameterGetters_) {
      let keyValuePairs = getter(this.map_, this.query_)
      if (keyValuePairs) {
        for (let key in keyValuePairs) {
          if (keyValuePairs.hasOwnProperty(key) && keyValuePairs[ key ] !== undefined) {
            // check if the value differs from the initial Value
            if (!(this.initialValues_.hasOwnProperty(key) && equal(this.initialValues_[ key ], keyValuePairs[ key ]))) {
              assignmentList.push(
                encodeURIComponent(key) + '=' + encodeURIComponent(keyValuePairs[ key ].toString()))
            }
          }
        }
      }
    }

    let url = baseURL || ''

    if (assignmentList.length === 0) {
      return url
    }

    if (url.indexOf('?') > -1) {
      return url + '&' + assignmentList.join('&')
    } else {
      return url + '?' + assignmentList.join('&')
    }
  }
}
