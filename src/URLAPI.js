import ol from 'openlayers'
import $ from 'jquery'

import {GroupLayer} from 'guide4you/src/layers/GroupLayer'

import {Debug} from 'guide4you/src/Debug'
import {restoreText, filterText} from 'guide4you/src/xssprotection'

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
     * parameters to exclude
     * @type {Array}
     * @private
     */
    this.excluded_ = options.excluded || []

    /**
     * All parsed values as key value pairs.
     * @type {object.<string,string>}
     * @private
     */
    this.queryValues = {}

    // some helper functions to be used in the parameter definitions

    let isSet = key => (this.queryValues.hasOwnProperty(key))

    const getSanitizedVal = key => filterText(this.queryValues[key])

    const getInjectUnsafeVal = key => this.queryValues[key]

    const isExcluded = key => (this.excluded_.indexOf(key) > -1)

    const isTrue = key => (isSet(key) && !!JSON.parse(getSanitizedVal(key)))

    const getArray = key => this.queryValues[ key ].split(',')

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
      {
        // Center
        keys: [ 'lon', 'lat', 'x', 'y' ],
        setEvent: 'afterConfiguring',
        setToMap: () => {
          if (isSet('x') && isSet('y')) {
            let x = parseFloat(getSanitizedVal('x'))
            let y = parseFloat(getSanitizedVal('y'))

            if (!isNaN(x) && !isNaN(y)) {
              let view = this.map_.getView()

              view.setCenter(view.constrainCenter(
                ol.proj.transform([ x, y ], this.map_.get('interfaceProjection'), view.getProjection())
              ))
            }
          } else if (isSet('lon') && isSet('lat') && Math.abs(parseFloat(getSanitizedVal('lat'))) < 90) {
            let lon = parseFloat(getSanitizedVal('lon'))
            let lat = parseFloat(getSanitizedVal('lat'))

            if (!isNaN(lon) && !isNaN(lat)) {
              let view = this.map_.getView()

              view.setCenter(view.constrainCenter(
                ol.proj.transform([ lon, lat ], 'EPSG:4326', view.getProjection())
              ))
            }
          }
        },
        getFromMap: () => {
          let view = this.map_.getView()
          let coordinate = ol.proj.transform(
            view.getCenter(),
            view.getProjection(),
            this.map_.get('interfaceProjection')
          )

          if (!isExcluded('center')) {
            return {
              x: coordinate[ 0 ].toFixed(5),
              y: coordinate[ 1 ].toFixed(5)
            }
          }
        }
      },
      // Rotation
      {
        keys: [ 'rot' ],
        setEvent: 'afterConfiguring',
        setToMap: () => {
          if (isSet('rot')) {
            this.map_.getView().setRotation(Math.PI * getSanitizedVal('rot') / 180)
          }
        },
        getFromMap: () => {
          if (!isExcluded('rot')) {
            return {
              rot: 180 * this.map_.getView().getRotation() / Math.PI
            }
          }
        }
      },
      // Zoom
      {
        keys: [ 'zoom' ],
        setEvent: 'afterConfiguring',
        setToMap: () => {
          if (isSet('zoom')) {
            this.map_.getView().setZoom(parseFloat(getSanitizedVal('zoom')))
          }
        },
        getFromMap: () => {
          if (!isExcluded('zoom')) {
            return {
              zoom: this.map_.getView().getZoom()
            }
          }
        }
      },
      // Available Layers
      {
        keys: [ 'avalay' ],
        setEvent: 'afterConfiguring',
        setToMap: () => {
          if (isSet('avalay')) {
            let layerIds = getArray('avalay')

            if (layerIds.length > 0) {
              let visibleBaseLayer
              let countAvailable = 0

              this.map_.get('baseLayers').recursiveForEach(layer => {
                if (!visibleBaseLayer && layer.getVisible()) {
                  visibleBaseLayer = layer
                }
                let available = layerIds.indexOf(layer.get('id').toString()) > -1
                layer.set('available', available)
                if (available) {
                  countAvailable++
                }
              })

              // make at least one baselayer visible
              if (countAvailable === 0) {
                visibleBaseLayer.set('available', true)
                visibleBaseLayer.setVisible(true)
              }

              this.map_.get('featureLayers').recursiveForEach(layer => {
                layer.set('available', layerIds.indexOf(layer.get('id').toString()) > -1)
              })
            }

            this.map_.get('configurator').configureUI()
          }
        },
        getFromMap: () => {
          let layerIds = []

          function forEachLayer (layer) {
            if (layer.get('available')) {
              layerIds.push(layer.get('id'))
            }
          }

          this.map_.get('baseLayers').recursiveForEach(forEachLayer)
          this.map_.get('featureLayers').recursiveForEach(forEachLayer)

          return {
            avalay: layerIds.join(',')
          }
        }
      },
      // Visible Layers
      {
        keys: [ 'vislay' ],
        setEvent: 'afterConfiguring',
        setToMap: () => {
          if (isSet('vislay')) {
            let layerIds = getArray('vislay')

            let baseLayers = this.map_.get('baseLayers')

            if (baseLayers) {
              baseLayers.recursiveForEach(layer => {
                if (!(layer instanceof GroupLayer)) {
                  layer.setVisible(layerIds.indexOf(layer.get('id').toString()) > -1)
                }
              })
            }

            let featureLayers = this.map_.get('featureLayers')

            if (featureLayers) {
              featureLayers.recursiveForEach(layer => {
                if (!(layer instanceof GroupLayer)) {
                  layer.setVisible(layerIds.indexOf(layer.get('id').toString()) > -1)
                }
              })
            }
          }
        },
        getFromMap: () => {
          if (!isExcluded('vislay')) {
            let layerIds = []

            const forEachLayer = layer => {
              if (layer.getVisible()) {
                layerIds.push(layer.get('id'))
              }
            }

            this.map_.get('baseLayers').recursiveForEach(forEachLayer)
            this.map_.get('featureLayers').recursiveForEach(forEachLayer)

            return {
              vislay: layerIds.join(',')
            }
          }
        }
      },
      // Responsive
      {
        keys: [ 'responsive' ],
        setEvent: 'ready',
        setToMap: () => {
          if (isSet('responsive')) {
            this.map_.set('responsive', JSON.parse(getSanitizedVal('responsive')))
          }
        },
        getFromMap: () => {
          return {
            responsive: this.map_.get('responsive')
          }
        }
      },
      // conf
      {
        keys: [ 'conf' ],
        setEvent: 'beforeConfigLoad',
        setToMap: () => {
          if (isSet('conf')) {
            let val = getInjectUnsafeVal('layconf').trim()
            if (val.match(/^(?:[a-z]+:)?\/\//i)) {
              throw new Error('The provided conf parameter is absolute. Only relative paths are allowed.')
            }
            this.map_.set('configFileName', val)
          }
        },
        getFromMap: () => {
          return {
            conf: this.map_.get('configFileName')
          }
        }
      },
      // layconf
      {
        keys: [ 'layconf' ],
        setEvent: 'beforeConfigLoad',
        setToMap: () => {
          if (isSet('layconf')) {
            let val = getInjectUnsafeVal('layconf').trim()
            if (val.match(/^(?:[a-z]+:)?\/\//i)) {
              throw new Error('The provided layconf parameter is absolute. Only relative paths are allowed.')
            }
            this.map_.set('layerConfigFileName', val)
          }
        },
        getFromMap: () => {
          return {
            layconf: this.map_.get('layerConfigFileName')
          }
        }
      },
      // lang
      {
        keys: [ 'lang' ],
        setEvent: 'afterConfigLoad',
        setToMap: () => {
          if (isSet('lang')) {
            this.map_.get('localiser').setCurrentLang(getSanitizedVal('lang'))
          }
        },
        getFromMap: () => {
          return {
            'lang': this.map_.get('localiser').getCurrentLang()
          }
        }
      },
      {
        keys: [ 'clsbtn' ],
        setEvent: 'ready:ui',
        setToMap: () => {
          if (isTrue('clsbtn')) {
            this.map_.get('UIConfigurator').controlFactory.addControlTo(this.map_, 'closeWindowButton')
          }
        }
        // get is not supported (closeButton does only work if the map was opened programmatically, it makes no sense to
        // duplicate it to a linked page)
      },
      // Marker
      {
        keys: [ 'marklat', 'marklon', 'markx', 'marky', 'marktext', 'markpop' ],
        setEvent: 'ready',
        setToMap: () => {
          let marker = this.map_.get('marker')

          let coords, fromProjection
          if (marker) {
            if (isSet('markx') && isSet('marky')) {
              coords = [ parseFloat(getSanitizedVal('markx')), parseFloat(getSanitizedVal('marky')) ]
              fromProjection = this.map_.get('interfaceProjection')
            } else if (isSet('marklat') && isSet('marklon')) {
              coords = [ parseFloat(getSanitizedVal('marklon')), parseFloat(getSanitizedVal('marklat')) ]
              fromProjection = 'EPSG:4326'
            } else {
              coords = this.map_.getView().getCenter()
              fromProjection = this.map_.getView().getProjection()
            }
            marker.setPosition(ol.proj.transform(coords, fromProjection, this.map_.get('mapProjection')))

            if (isSet('marklat') || isSet('marklon') || isSet('markx') || isSet('marky')) {
              marker.setActive(true)
            }

            if (isSet('marktext')) {
              marker.setActive(true)
              marker.setText(getSanitizedVal('marktext'))

              if (isTrue('markpop') || !isSet('markpop')) {
                marker.setPopupVisible(true)
              } else {
                marker.setPopupVisible(false)
              }
            }
          } else {
            Debug.warn('There is no marker configured for the map, but it was tried to set it via the urlapi.')
          }
        },
        getFromMap: () => {
          let marker = this.map_.get('marker')

          if (marker && marker.getActive() && !isExcluded('marker')) {
            let result = {}

            let xy = ol.proj.transform(
              marker.getPosition(), this.map_.get('mapProjection'), this.map_.get('interfaceProjection'))
            let text = restoreText(marker.getText())
            let popvis = marker.getPopupVisible()

            result.markx = xy[ 0 ].toFixed(5)
            result.marky = xy[ 1 ].toFixed(5)

            if (text) {
              result.marktext = text
              result.markpop = popvis // maybe don't set if not needed?
            }

            return result
          }
        }
      },
      // search
      {
        keys: [ 'search' ],
        setEvent: 'ready',
        setToMap: () => {
          if (isSet('search')) {
            let search = this.map_.getControlsByName('searchControl')[ 0 ]
            if (search) {
              search.setSearchValue(getSanitizedVal('search'))
            }
          }
        }
        // get??
      }
    ]

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
            $.extend(this.initialValues_, parameterConf.getFromMap())
          }
          // set value
          parameterConf.setToMap()
        })
      }

      // gather getters
      if (parameterConf.hasOwnProperty('getFromMap')) {
        this.parameterGetters_.push(parameterConf.getFromMap)
      }
    }

    let keyValuePair
    let queryString = window.location.search

    if (queryString !== '') { // Nothing to be done if search string is absent
      // Remove initial '?', split search at '&', result is supposed to be 'key=value' list
      let assignmentList = queryString.substring(1).split('&')

      // iterated over all assignmentList elements
      for (let i = 0; i < assignmentList.length; i += 1) {
        // Skip elements without '='
        if (assignmentList[ i ].indexOf('=') > -1) {
          // Split assignment at '='
          keyValuePair = assignmentList[ i ].split('=')

          // Use URL-decoded 1st (2nd) element of assignment as key (value)
          // Decoding takes place this late in code as premature URI-decoding may interfere with parsing
          const key = decodeURIComponent(keyValuePair[ 0 ]).trim().toLowerCase()
          const value = decodeURIComponent(keyValuePair[ 1 ]).trim()

          // Skip unsupported keys
          if (this.parameterKeys_.indexOf(key) > -1) {
            this.queryValues[ key ] = value // store key and value
          }
        }
      }
    }
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
      let keyValuePairs = getter.call(this)
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
