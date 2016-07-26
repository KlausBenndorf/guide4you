/**
 * @module utilities
 * Helper- and Miscfunctions
 */

import $ from 'jquery'

import 'polyfill!Object.defineProperty'
import 'polyfill!Object.getOwnPropertyNames'
import 'core-js/library/fn/object/get-own-property-descriptor'
import 'polyfill!Object.getPrototypeOf'

import Debug from './Debug'

/**
 * Checks whether an argument can be interpreted as an even integer
 * @param   {Object}  value A value of any type
 * @returns {Boolean} True when value is numeric, parses as an integer (no matter if decimal, octal or sexadecimal)
 */
export function even (value) {
  if ($.isNumeric(value)) {
    let valueAsInteger = parseInt(value)
    if ((value === valueAsInteger) && (valueAsInteger % 2 === 0)) {
      return true
    }
  }
  return false
}

/**
 * Checks whether an argument can be interpreted as an even integer
 * @param   {Object}  value A value of any type
 * @returns {Boolean} True when value is numeric, parses as an integer (no matter if decimal, octal or sexadecimal)
 */
export function odd (value) {
  if ($.isNumeric(value)) {
    let valueAsInteger = parseInt(value)
    if ((value === valueAsInteger) && (valueAsInteger % 2 === 1)) {
      return true
    }
  }
  return false
}

/**
 * Check for a label in a configuration object
 * @param   {Object}  configurationObject a configuration object
 * @param   {String}  label               a label to check for
 * @returns {boolean} true if label present and true, false otherwise
 */
export function checkFor (configurationObject, label) {
  return ((label in configurationObject) && (configurationObject[label]))
}

/**
 * return argument as object (if it is no object the value is {})
 * @returns {Object}
 */
export function asObject (argument) {
  return (typeof argument === 'object') ? argument : {}
}

/**
 * Gets the subconfig or an empty object
 * @param {object} config
 * @param {string} name
 * @returns {object}
 */
export function getConfig (config, name) {
  if (name in config && config[name]) {
    if (typeof config[name] !== 'object') {
      return {}
    } else {
      return config[name]
    }
  }
}

// //////////////////////////////////////////////////////////////////////////////////////// //
//                                Proxy related functions                                   //
// //////////////////////////////////////////////////////////////////////////////////////// //

/**
 * this function takes an (url) template and encodes everything except for the templated elements.
 * @param {string} template an (url) template
 * @returns {string} the encoded (url) template
 */
export function encodeTemplate (template) {
  let parts = template.split('}')

  let encodedTemplate = ''

  let i
  for (i = 0; i < parts.length - 1; i += 1) {
    let partedParts = parts[i].split('{')
    encodedTemplate += encodeURIComponent(partedParts[0]) + '{' + partedParts[1] + '}'
  }

  encodedTemplate += encodeURIComponent(parts[i])

  return encodedTemplate
}

/**
 * replaces a param enclosed in {} in a (url) template with a value. If the value is an array it will take any string
 * not containing a '}' after the paramName to join the array, default ','.
 * @param {string} template an (url) template
 * @param {string} paramName the parameter that will be replaced (given without {}) f.e. 'example' will replace any
 *    occurancy of '{example}' (after the word 'example' there might be given a string join an array value
 *    i.e. '{example+}')
 * @param {string|string[]|number} paramValue the value(s) which will be inserted
 * @returns {string} the expanded string
 */
export function expandTemplate (template, paramName, paramValue) {
  let regexp = new RegExp('{' + paramName + '([^}]*)}')
  let match = template.match(regexp)
  if (match) {
    if ($.type(paramValue) === 'string') {
      return template.replace(regexp, paramValue)
    } else if ($.type(paramValue) === 'array') {
      let joinString = match[1] || ','
      return template.replace(regexp, paramValue.join(joinString))
    } else if ($.type(paramValue) === 'number') {
      let valReg = new RegExp('(?::|,)([^,])', 'g')
      let nextMatch = valReg.exec(match[1])
      for (let i = 0; i < paramValue; i++) {
        nextMatch = valReg.exec(match[1])
      }
      return template.replace(regexp, nextMatch[1])
    }
  } else {
    throw new Error('parameter ' + paramName + ' (enclosed in {}) not found in string ' + template)
  }
}

/**
 * prepends the url with the proxy address and encodes the old url
 * @param {string} url an url
 * @param {string} proxy the proxy to prepend
 * @returns {string} the composed url
 */
export function addProxy (url, proxy) {
  if (proxy) {
    return expandTemplate(proxy, 'url', encodeTemplate(url))
  } else {
    return url
  }
}

/*
 * this function will add an parameter to an url
 * @param {string} url
 * @param {string} parameter
 * @returns {string} url
 */
export function addParamToURL (url, param) {
  if (url.search(/\?/) === -1) {
    url += '?'
  } else {
    url += '&'
  }
  url += param
  return url
}

// //////////////////////////////////////////////////////////////////////////////////////// //
//                      finish all ajax requests then continue                              //
// //////////////////////////////////////////////////////////////////////////////////////// //

/**
 * finishs loading all images contained in the given jQuery object.
 * @param {jQuery} $object
 * @returns {Promise}
 */
export function finishAllImages ($object) {
  let imagePromises = []

  let $images = recursiveSelect($object, 'img')

  $images.each(function () {
    let image = this

    if (!image.complete) {
      imagePromises.push(new Promise(resolve => {
        $(image).load(resolve)
      }))
    }
  })

  return Promise.all(imagePromises)
}

/**
 * calculates the distance between one and another jQuery element
 * @param {jQuery} $one
 * @param {jQuery} $other
 * @returns {{top: number, left: number}}
 */
export function offset ($one, $other) {
  let oneOff = $one.offset()
  let otherOff = $other.offset()
  return { top: oneOff.top - otherOff.top, left: oneOff.left - otherOff.left }
}

// //////////////////////////////////////////////////////////////////////////////////////////
//                                   jQuery Extensions                                    //
// //////////////////////////////////////////////////////////////////////////////////////////

/**
 * selects all matching elements and child elements
 * @param {jQuery} $elem
 * @param {string} query
 * @returns {jQuery}
 */
export function recursiveSelect ($elem, query) {
  return $elem.filter(query).add($elem.find(query))
}

// //////////////////////////////////////////////////////////////////////////////////////// //
//                                Structural Functions                                      //
// //////////////////////////////////////////////////////////////////////////////////////// //

export function showInteractionActivity (map) {
  Debug.info('superseding interactions:')
  let k, i
  let total
  let amountActive

  for (k in map.supersedingInteractions_) {
    total = map.supersedingInteractions_[k].length
    amountActive = 0
    for (i = 0; i < total; i++) {
      if (map.supersedingInteractions_[k][i].getActive()) {
        amountActive += 1
      }
    }

    Debug.info('  ' + k + ': total: ' + total + ' active: ' + amountActive)
  }

  Debug.info('default interactions:')

  for (k in map.defaultInteractions_) {
    total = map.defaultInteractions_[k].length
    amountActive = 0
    for (i = 0; i < total; i++) {
      if (map.defaultInteractions_[k][i].getActive()) {
        amountActive += 1
      }
    }

    Debug.info('  ' + k + ': total: ' + total + ' active: ' + amountActive)
  }
}

// //////////////////////////////////////////////////////////////////////////////////////// //
//                                     URL Functions                                        //
// //////////////////////////////////////////////////////////////////////////////////////// //

// the functions are designed to mimic the behaviour of the node path module.
// differences: dirURLs will end in /'s
// the are in no way complete and don't claim to be complete
// NOTE: another way to solve this would be using String.split instead of regular expressions

/**
 * A function that tries to get the dir url of an url
 * @param {string} url
 * @returns {string}
 */
export function urlDirname (url) {
  return url.replace(/\/([^\/]*)(\?.*)?$/, '/')
}

/**
 * A function that normalizes a url
 * @param {string} url
 * @returns {string}
 */
export function urlNormalize (url) {
  if (url.match(/^\.\//)) {
    return urlNormalize(url.replace(/^\.\//, ''))
  } else {
    return url
  }
}

/**
 * A function that adds urls
 * @param {string} urlRoot
 * @param {string} urlExt
 * @returns {string}
 */
export function urlJoin (urlRoot, urlExt) {
  let normPathRoot = urlDirname(urlNormalize(urlRoot))
  let normPathExt = urlNormalize(urlExt)

  let lastPart = /[^\/]+\/$/
  let leadingDoubleDots = /^\.\.\//

  while (normPathRoot.match(lastPart) && normPathExt.match(leadingDoubleDots)) {
    normPathRoot = normPathRoot.replace(lastPart, '')
    normPathExt = normPathExt.replace(leadingDoubleDots, '')
  }

  return normPathRoot + normPathExt
}

/**
 * A function that tries to get the relative url between to urles
 * @param {string} source
 * @param {string} target
 * @returns {string}
 */
export function urlRelative (source, target) {
  let sourceNorm = urlDirname(urlNormalize(source))
  let targetNorm = urlNormalize(target)

  let urlRelative = ''

  let firstPart = /^\/?((\/\/)|[^/])+\//

  let firstSourcePart
  let firstTargetPart

  while (sourceNorm.match(firstPart) && targetNorm.match(firstPart)) {
    firstSourcePart = sourceNorm.match(firstPart)[0]
    firstTargetPart = targetNorm.match(firstPart)[0]

    if (firstSourcePart.toUpperCase() !== firstTargetPart.toUpperCase()) {
      break
    }

    sourceNorm = sourceNorm.replace(firstPart, '')
    targetNorm = targetNorm.replace(firstPart, '')
  }

  while (sourceNorm.match(firstPart)) {
    firstSourcePart = sourceNorm.match(firstPart)[0]
    sourceNorm = sourceNorm.replace(firstPart, '')
    urlRelative += '../'
  }

  return urlRelative + targetNorm
}

/**
 * @param {string} url
 * @returns {boolean}
 */
export function urlIsAbsolute (url) {
  return !!url.match(/^\/|.*:\/\//)
}

// //////////////////////////////////////////////////////////////////////////////////////// //
//                                         Other                                            //
// //////////////////////////////////////////////////////////////////////////////////////// //

function getPropertyNamesAndDescriptions (obj) {
  let props = {}

  do {
    Object.getOwnPropertyNames(obj).forEach(function (prop) {
      if (!props.hasOwnProperty(prop)) {
        props[prop] = Object.getOwnPropertyDescriptor(obj, prop)
      }
    })
    obj = Object.getPrototypeOf(obj)
  } while (obj !== Object.prototype)

  return props
}

/**
 * This creates a new class which inherits from the base class and mixes in every method (except any method named
 * 'initialize') from the mixin class. The mixin class may not overwrite any existing method. If it has a method called
 * 'initialize' this will be remembered and called after the constructor of the base class has finished
 * @param baseClass
 * @param mixinClass
 * @returns {class}
 */
export function mixin (baseClass, mixinClass) {
  let initialize = mixinClass.prototype.initialize

  let m = class extends baseClass {
    constructor (options) {
      super(options)
      if (initialize) {
        initialize.call(this, options)
      }
    }
  }

  let propsAndDescriptions = getPropertyNamesAndDescriptions(mixinClass.prototype)

  for (let name in propsAndDescriptions) {
    if (name !== 'constructor' && name !== 'initialize') {
      if (name in m.prototype) {
        throw new Error('mixins should not overwrite methods')
      }
      Object.defineProperty(m.prototype, name, propsAndDescriptions[name])
    }
  }

  return m
}
