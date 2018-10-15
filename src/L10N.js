import ol from 'ol'
import $ from 'jquery'

import stripJsonComments from 'strip-json-comments'
import { Debug } from './Debug'
import { URL } from './URLHelper'

/**
 * @typedef {Object.<string, string>|string} Localizable
 */

/**
 * @typedef {object} L10NOptions
 * @property {string} [defaultLanguage='en']
 * @property {string} [currentLanguage]
 * @property {string} [languageFile='files/l10n.commented.json']
 * @property {string[]} [availableLanguages]
 */

/**
 * This class localizes texts by either selecting one from a dictionary (asynchron loaded JSON File) or choosing the
 * right string from a selection.
 */
export class L10N extends ol.Observable {
  /**
   * @param {L10NOptions} options
   */
  constructor (options = {}) {
    super()

    /**
     * @type {string}
     * @private
     */
    this.defaultLang_ = options.defaultLanguage || 'en'

    /**
     * @type {string}
     * @private
     */
    this.currentLang_ = options.currentLanguage || this.defaultLang_

    /**
     * @type {URL}
     * @private
     */
    this.languageFileUrl_ = URL.extractFromConfig(options, 'languageFile', 'files/l10n.commented.json')

    if (options.availableLanguages) {
      /**
       * @type {string[]}
       * @private
       */
      this.availableLanguages_ = options.availableLanguages
    } else {
      this.availableLanguages_ = [this.currentLang_]
      if (this.currentLang_ !== this.defaultLang_) {
        this.availableLanguages_.push(this.defaultLang_)
      }
    }
  }

  /**
   * @returns {string[]}
   */
  getAvailableLanguages () {
    return this.availableLanguages_
  }

  /**
   * @param {string[]} languages
   */
  setAvailableLanguages (languages) {
    this.availableLanguages_ = languages
  }

  /**
   * Loads the language file. This function is called manually from outside to be abel to pass in a callback.
   */
  ajaxGetLanguageFile () {
    let finalUrl = this.languageFileUrl_.finalize()
    return $.ajax({
      type: 'GET',
      url: finalUrl,
      dataType: 'text',
      success: data => {
        this.dictionary = JSON.parse(stripJsonComments(data))
      },
      error: () => { // The arguments are ignored
        Debug.error(`The language file ${finalUrl} couldn't be loaded or parsed`)
      }
    })
  }

  /**
   * Select language string. Note that this routine throws an error if there is no fitting string. Method to obtain the
   *    fitting string:
   * 1. If there is no data, an 'Unable to obtain localization' error is thrown.
   * 2. If data is a string, that string is returned.
   * 3. If language is given and present in data, the string value for langage is returned.
   * 4. If the default language is given and present in data, that value is returned.
   * 5. If the special tag '*' is present in data, that value is returned.
   * 6. If still no string was found at this point, an 'Unable to obtain localization' error is thrown.
   * @property {Localizable} data
   * @returns {string} a (presumably localised) string
   */
  selectL10N (data) {
    if (data) {
      if (typeof data === 'string') { // Only a generic string is available
        return data
      } else { // an object is available
        if (data[this.currentLang_] || data[this.currentLang_] === '') { // current language available
          return data[this.currentLang_]
        } else if (data[this.defaultLang_] || data[this.defaultLang_] === '') { // default language as a last resort
          return data[this.defaultLang_]
        } else if (data['*'] || data['*'] === '') {
          return data['*']
        } else {
          Debug.error('Unable to obtain localization')
        }
      }
    }
  }

  /**
   * Localise identifier using given dictionary. Throws an error if identifier is not in dictionary. Relies on
   * selectL10N to select actual localisation.
   * @param {string} identifier
   * @param {boolean} silent if an error message should be printed if the text is not found in the dictionary
   * @returns {string} a (presumably localised) string
   */
  localiseUsingDictionary (identifier, silent = false) {
    if (identifier in this.dictionary) {
      return this.selectL10N(this.dictionary[identifier])
    } else if (!silent) {
      Debug.error(`Cannot localise '${identifier}': Not in dictionary`)
    }
  }

  /**
   * @param {string} lang
   */
  setCurrentLang (lang) {
    this.currentLang_ = lang
    this.dispatchEvent('change:language', lang)
  }

  /**
   *
   * @returns {string|*}
   */
  getCurrentLang () {
    return this.currentLang_
  }

  getDefaultLang () {
    return this.defaultLang_
  }

  /**
   * @returns {bool}
   */
  isRtl () {
    return this.dictionary[this.currentLang_].rtl || false
  }
}
