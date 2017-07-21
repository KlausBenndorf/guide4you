import { filterText } from 'guide4you/src/xssprotection'

export class Query {
  constructor (possibleKeys, excluded) {
    /**
     * All parsed values as key value pairs.
     * @type {object.<string,string>}
     * @private
     */
    this.queryValues_ = {}
    this.parameterKeys_ = possibleKeys

    this.excluded_ = excluded

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
            this.queryValues_[key] = value // store key and value
          }
        }
      }
    }
  }

  isSet (key) {
    return this.queryValues_.hasOwnProperty(key)
  }

  getSanitizedVal (key) {
    return filterText(this.queryValues_[key])
  }

  getInjectUnsafeVal (key) {
    return this.queryValues_[key]
  }

  isExcluded (key) {
    return (this.excluded_.indexOf(key) > -1)
  }

  isTrue (key) {
    return (this.isSet(key) && !!JSON.parse(this.getSanitizedVal(key)))
  }

  getArray (key) {
    return this.queryValues_[key].split(',')
  }

  addValue (key, value) {
    this.queryValues_[key] = value
  }
}
