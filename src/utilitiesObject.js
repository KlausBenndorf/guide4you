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
 * Removes a property from an object and returns its value
 * @param {Object} object
 * @param {String} prop
 * @returns {*}
 */
export function take (object, prop) {
  if (object.hasOwnProperty(prop)) {
    const tmp = object[prop]
    delete object[prop]
    return tmp
  }
}
