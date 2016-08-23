/**
 * @module utilitiesObject
 * Helper- and Miscfunctions (object related)
 */

import $ from 'jquery'

// //////////////////////////////////////////////////////////////////////////////////////// //
//                                     Object Copying                                       //
// //////////////////////////////////////////////////////////////////////////////////////// //

/**
 * Copy an object
 * @param {Object} object
 * @returns {Object}
 */
export function copy (object) {
  if ($.isArray(object)) {
    return $.extend([], object)
  } else if ($.isPlainObject(object)) {
    return $.extend({}, object)
  } else {
    return object
  }
}

/**
 * Deep copy an object
 * @param {Object} object
 * @returns {Object}
 */
export function copyDeep (object) {
  if ($.isArray(object)) {
    return $.extend(true, [], object)
  } else if ($.isPlainObject(object)) {
    return $.extend(true, {}, object)
  } else {
    return object
  }
}

// //////////////////////////////////////////////////////////////////////////////////////// //
//                                    Object Merging                                        //
// //////////////////////////////////////////////////////////////////////////////////////// //

/**
 * A simple object merge function. merges all keys of obj2 to obj1.
 * @param {Object} obj1 the object which will be merged into
 * @param {Object} obj2 the object that will be merged into obj1
 * @returns {Object}
 */
export function merge (obj1, obj2) {
  return $.extend(obj1, obj2)
}

/**
 * A simple reverse object merge function. merges all keys of obj2 to obj1.
 * @param {Object} obj1 the object which will be merged into
 * @param {Object} obj2 the object that will be merged into obj1
 * @returns {Object}
 */
export function mergeDeep (obj1, obj2) {
  return $.extend(true, obj1, obj2)
}

/**
 * basically adds all properties (key, value - pairs) from defaults to config whichs keys aren't keys of config.
 *      (except for keys with 'Element' in their name)
 * if the value is an object (on the left side, config) it is called recursively
 * if the value is an array (on the left side, config) it is called with the key value+'Element' for each element
 *      of the array
 * @param {Object} config the config which should be mergeed with defaults
 * @param {Object} defaults the defaults to be merged with config
 * @returns {Object} the altered config
 */
export function mergeWithDefaults (config, defaults) {
  if (typeof defaults === 'object' && typeof config === 'object') {
    for (let k of Object.keys(defaults)) {
      if (!(k in config) && (k.search('Element') < 0)) {
        config[k] = defaults[k]
      // order of this branches is important because typeof Array equals object
      } else if (config[k] instanceof Array) {
        // if both arrays have the same length, it assumed that every element of the array in default is
        //      the default for every element in the array in config
        if (config[k].length === defaults[k].length) {
          for (let i = 0; i < config[k].length; i += 1) {
            mergeWithDefaults(config[k][i], defaults[k][i])
          }
        } else {
          // if there exists a key with the name k+'Element' then it is the default for every element of
          //      the configuration
          if ((k + 'Element') in defaults) {
            for (let i = 0; i < config[k].length; i += 1) {
              mergeWithDefaults(config[k][i], defaults[k + 'Element'])
            }
          }
        }
      } else if (typeof config[k] === 'object') {
        mergeWithDefaults(config[k], defaults[k])
      } else if ((typeof config[k] !== 'object') && (typeof defaults[k] === 'object') && config[k]) {
        config[k] = {}
        mergeWithDefaults(config[k], defaults[k])
      }
    }
  } else {
    if (!config) {
      config = defaults
    }
  }
  return config
}

/**
 * Removes a property from an object and returns its value
 * @param {Object} object
 * @param {String} prop
 * @returns {*}
 */
export function take (object, prop) {
  if (object.hasOwnProperty(prop)) {
    let tmp = object[prop]
    delete object[prop]
    return tmp
  }
}
