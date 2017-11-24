import { filterText } from 'guide4you/src/xssprotection'

export class Query {
  constructor (possibleKeys, excluded, extract, values = {}) {
    /**
     * All parsed values as key value pairs.
     * @type {object.<string,string>}
     * @private
     */
    this.urlValues_ = {}

    this.jsValues_ = values

    this.parameterKeys_ = possibleKeys

    this.excluded_ = excluded

    for (let ex of this.excluded_) {
      if (this.jsValues_.hasOwnProperty(ex)) {
        this.jsValues_[ex] = undefined
      }
    }

    // some helper functions to be used in the parameter definitions

    let keyValuePair
    let queryString = window.location.search

    if (queryString !== '') { // Nothing to be done if search string is absent
      // Remove initial '?', split search at '&', result is supposed to be 'key=value' list
      let assignmentList = queryString.substring(1).split('&')

      // iterated over all assignmentList elements
      for (let i = 0; i < assignmentList.length; i += 1) {
        // Skip elements without '='
        if (assignmentList[i].indexOf('=') > -1) {
          // Split assignment at '='
          keyValuePair = assignmentList[i].split('=')

          // Use URL-decoded 1st (2nd) element of assignment as key (value)
          // Decoding takes place this late in code as premature URI-decoding may interfere with parsing
          const key = decodeURIComponent(keyValuePair[0]).trim().toLowerCase()
          const value = decodeURIComponent(keyValuePair[1]).trim()

          // Skip unsupported keys
          if (this.parameterKeys_.indexOf(key) > -1) {
            this.urlValues_[key] = value // store key and value
          }
        }
      }
    }
  }

  isSet (key) {
    return this.jsValues_.hasOwnProperty(key) || this.urlValues_.hasOwnProperty(key)
  }

  getSanitizedVal (key) {
    return this.urlValues_.hasOwnProperty(key) ? filterText(this.urlValues_[key]) : this.jsValues_[key]
  }

  getInjectUnsafeVal (key) {
    return this.urlValues_.hasOwnProperty(key) ? this.urlValues_[key] : this.jsValues_[key]
  }

  isExcluded (key) {
    return (this.excluded_.indexOf(key) > -1)
  }

  isTrue (key) {
    if (this.urlValues_.hasOwnProperty(key)) {
      return JSON.parse(this.urlValues_[key])
    } else {
      return this.jsValues_.hasOwnProperty(key) && this.jsValues_[key]
    }
  }

  getArray (key) {
    return this.urlValues_.hasOwnProperty(key) ? this.urlValues_[key].split(',').map(filterText) : this.jsValues_[key]
  }

  setUrlValue (key, value) {
    this.urlValues_[key] = value
  }

  setJsValue (key, value) {
    this.jsValues_[key] = value
  }
}
