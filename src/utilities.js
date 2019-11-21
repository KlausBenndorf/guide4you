/**
 * @module utilities
 * Helper and misc functions
 */

import $ from 'jquery'

import 'polyfill!Object.defineProperty'
import 'polyfill!Object.getOwnPropertyNames'
import 'polyfill!Object.getOwnPropertyDescriptor'
import 'polyfill!Object.getPrototypeOf'

import { Debug } from './Debug'

/**
 * Checks whether an argument can be interpreted as an even integer
 * @param   {Object}  value A value of any type
 * @returns {Boolean} True when value is numeric, parses as an integer (no matter if decimal, octal or sexadecimal)
 */
export function even (value) {
  if ($.isNumeric(value)) {
    const valueAsInteger = parseInt(value)
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
    const valueAsInteger = parseInt(value)
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
  if (config.hasOwnProperty(name) && config[name]) {
    return asObject(config[name])
  }
}

// //////////////////////////////////////////////////////////////////////////////////////// //
//                      async image load                                                    //
// //////////////////////////////////////////////////////////////////////////////////////// //

/**
 * @param {HTMLImageElement} image
 * @param {URL} origUrl
 * @param {string} [finalUrl]
 * @returns {Promise}
 */
export function asyncImageLoad (image, origUrl, finalUrl) {
  if (!finalUrl) {
    finalUrl = origUrl.finalize()
  }
  return new Promise((resolve, reject) => {
    function onError () {
      reject(new Error(`Error loading url ${finalUrl}`))
    }
    image.addEventListener('load', resolve)
    image.addEventListener('error', onError)
    if (!origUrl.username || !origUrl.password) {
      image.src = finalUrl
    } else {
      const xhr = new XMLHttpRequest() // eslint-disable-line no-undef
      xhr.open('GET', finalUrl, true)
      xhr.responseType = 'blob'

      origUrl.setAuth(xhr)

      xhr.addEventListener('load', function () {
        if (this.status === 200) {
          const urlCreator = window.URL || window.webkitURL
          image.src = urlCreator.createObjectURL(this.response)
        } else {
          onError()
        }
      })

      xhr.send()
    }
  })
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
  const imagePromises = []

  const $images = recursiveSelect($object, 'img')

  $images.each(function () {
    const image = this

    if (!image.complete) {
      imagePromises.push(new Promise(resolve => {
        $(image).on('load', resolve)
        $(image).on('error', resolve)
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
  const oneOff = $one.offset()
  const otherOff = $other.offset()
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
  return url.replace(/\/([^/]*)(\?.*)?$/, '/')
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

  const lastPart = /[^/]+\/$/
  const leadingDoubleDots = /^\.\.\//

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

  const firstPart = /^\/?((\/\/)|[^/])+\//

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
  const props = {}

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
 * @param mixinClasses
 * @returns {class}
 */
export function mixin (baseClass, mixinClasses) {
  if (!Array.isArray(mixinClasses)) {
    mixinClasses = [mixinClasses]
  }
  const initializes = mixinClasses.map(mC => mC.prototype.initialize)

  const mixed = class extends baseClass {
    constructor (options) {
      super(options)
      for (const initialize of initializes) {
        if (initialize) {
          initialize.call(this, options)
        }
      }
    }
  }

  for (const mixinClass of mixinClasses) {
    const propsAndDescriptions = getPropertyNamesAndDescriptions(mixinClass.prototype)

    for (const name in propsAndDescriptions) {
      if (name !== 'constructor' && name !== 'initialize') {
        if (name in mixed.prototype) {
          throw new Error('mixins should not overwrite methods')
        }
        Object.defineProperty(mixed.prototype, name, propsAndDescriptions[name])
      }
    }
  }

  return mixed
}

/**
 * This returns a mixin as a normal class.
 * @param mixinClass
 * @returns {class}
 */
export function mixinAsClass (mixinClass) {
  const initialize = mixinClass.prototype.initialize

  const m = class extends mixinClass {
    constructor (options) {
      super(options)
      if (initialize) {
        initialize.call(this, options)
      }
    }
  }

  return m
}

const $p = $('<p>')

/**
 * Takes a string with HTML and returns the containing resulting text.
 * @param stringWithHTML string with encoded HTML entities
 * @returns {string}
 */
export function html2Text (stringWithHTML) {
  return $p.html(stringWithHTML).text()
}
