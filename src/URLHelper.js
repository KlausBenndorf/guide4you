import $ from 'jquery'
import { Debug } from './Debug'

/**
 * @typedef {object} URLConfig
 * @property {Localizable} url
 * @property {boolean} [useProxy]
 * @property {string} [proxy]
 * @property {boolean} [cache=true]
 */

/**
 * @typedef {URLConfig|Localizable|URL} URLLike
 */

// workaround for static members (es7)
/**
 * @type {string}
 */
let globalProxy
/**
 * @type {L10N}
 */
let localiser

export class URL {
  /**
   * @param {URLLike} urlLike
   */
  constructor (urlLike) {
    if ($.type(urlLike) === 'string' || !urlLike.hasOwnProperty('url')) {
      /**
       * @type {string}
       */
      this.url = urlLike
      /**
       * @type {boolean}
       */
      this.useProxy = false
      /**
       * @type {boolean}
       */
      this.cache = true
      this.params = []
      this.expand = []
    } else {
      /**
       * @type {string}
       */
      this.url = urlLike.url
      /**
       * @type {boolean}
       */
      this.useProxy = urlLike.useProxy
      /**
       * @type {string}
       */
      this.proxy = urlLike.proxy
      /**
       * @type {boolean}
       */
      this.cache = urlLike.cache === undefined ? true : urlLike.cache
      this.params = urlLike.params || []
      this.expand = urlLike.expand || []
    }
  }

  /**
   * @param {object} config
   * @param {string} paramName
   * @param {string} [defaultValue]
   * @returns {URL}
   */
  static extractFromConfig (config, paramName, defaultValue) {
    if (!config.hasOwnProperty(paramName)) {
      return null
    }
    if (config.hasOwnProperty('useProxy') || config.hasOwnProperty('proxy') || config.hasOwnProperty('cache')) {
      Debug.warn('Using the parameters \'useProxy\' \'proxy\' \'cache\' directly inside a config object is considered' +
        ' deprecated. Please use a URLConfig object')
      return new URL({
        url: config[paramName] || defaultValue,
        useProxy: config.useProxy,
        proxy: config.proxy,
        cache: config.cache
      })
    } else {
      return new URL(config[paramName])
    }
  }

  static setGlobalProxy (proxy) {
    globalProxy = proxy
  }

  static setLocaliser (aLocaliser) {
    localiser = aLocaliser
  }

  /**
   * @returns {URL}
   */
  clone () {
    return new URL(this)
  }

  /**
   * @returns {string}
   */
  finalize () {
    let url = this
    if (!this.cache) {
      url = this.clone().addParam(Math.random().toString(36).substring(7))
    }

    let urlAsString = localiser ? localiser.selectL10N(url.url) : url.url

    if (url.params.length) {
      if (urlAsString.search(/\?/) === -1) {
        urlAsString += '?'
      } else {
        urlAsString += '&'
      }
      urlAsString += url.params.join('&')
    }

    for (let expand of url.expand) {
      urlAsString = URL.expandTemplate_(urlAsString, expand)
    }

    if (url.useProxy === true || (url.useProxy === undefined && !!url.proxy)) {
      let proxy = url.proxy || globalProxy
      if (!proxy) {
        throw new Error('No proxy configured. Either configure a local or global proxy if you want to use the option' +
          ' useProxy.')
      }

      return URL.expandTemplate_(proxy,
        { paramName: 'url', paramValue: URL.encodeTemplate_(urlAsString), required: true })
    } else {
      return urlAsString
    }
  }

  /*
 * this function will add an parameter to the url
 * @param {string} param
 * @returns {URL)
 */
  addParam (param) {
    this.params.push(param)
    return this
  }

  /**
   * replaces a param enclosed in {} in a (url) template with a value. If the value is an array it will take any string
   * not containing a '}' after the paramName to join the array, default ','.
   * @param {string} template an (url) template
   * @param {object} expand
   * @param {string} expand.paramName the parameter that will be replaced (given without {}) f.e. 'example' will
   *    replace any occurancy of '{example}' (after the word 'example' there might be given a string join an
   *    array value i.e. '{example+}')
   * @param {string|string[]|number} expand.paramValue the value(s) which will be inserted
   * @param {boolean} expand.required
   * @returns {string} the expanded string
   */
  static expandTemplate_ (template, expand) {
    let regexp = new RegExp('{' + expand.paramName + '([^}]*)}')
    let match = template.match(regexp)
    if (match) {
      if ($.type(expand.paramValue) === 'string') {
        return template.replace(regexp, expand.paramValue)
      } else if ($.type(expand.paramValue) === 'array') {
        let joinString = match[1] || ','
        return template.replace(regexp, expand.paramValue.join(joinString))
      } else if ($.type(expand.paramValue) === 'number') {
        let valReg = new RegExp('(?::|,)([^,])', 'g')
        let nextMatch = valReg.exec(match[1])
        for (let i = 0; i < expand.paramValue; i++) {
          nextMatch = valReg.exec(match[1])
        }
        return template.replace(regexp, nextMatch[1])
      }
    } else if (expand.required) {
      throw new Error('required parameter ' + expand.paramName + ' (enclosed in {}) not found in string ' + template)
    } else {
      return template
    }
  }

  /**
   * @param {string} paramName
   * @param paramValue
   * @param {boolean} [required=true]
   * @returns {URL}
   */
  expandTemplate (paramName, paramValue, required = true) {
    this.expand.push({ paramName, paramValue, required })
    return this
  }

  /**
   * this function takes an (url) template and encodes everything except for the templated elements.
   * @param {string} template an (url) template
   * @returns {string} the encoded (url) template
   */
  static encodeTemplate_ (template) {
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
   * @param {string} otherUrl
   * @returns {URL}
   */
  useProxyFor (otherUrl) {
    return new URL({
      useProxy: this.useProxy,
      proxy: this.proxy,
      url: otherUrl
    })
  }
}
