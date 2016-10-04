import $ from 'jquery'

import {Control} from './Control'
import { addTooltip } from '../html/html'
import {Debug} from '../Debug'

import '../../less/languageControls.less'

/**
 * @typedef {g4uControlOptions} LanguageSwitcherButtonOptions
 */

/**
 * A button to switch the language that is being used.
 * Works if only two languages are configured.
 */
export class LanguageSwitcherButton extends Control {
  /**
   * @param {LanguageSwitcherButtonOptions} options
   */
  constructor (options = {}) {
    options.element = $('<button>').get(0)
    options.singleButton = true
    options.className = options.className || 'g4u-languageswitcher'

    super(options)

    /**
     * @type {jQuery}
     * @private
     */
    this.$button_ = this.get$Element().addClass(this.className_ + '-button')

    let languages = this.getLocaliser().getAvailableLanguages()

    if (languages.length < 2) {
      Debug.info('You do not have any languages to switch between.')
      Debug.info('Could it be that you forgot to disable languageSwitcherButton?')
    } else if (languages.length > 2) {
      Debug.info('You have more than 2 languages to switch between.')
      Debug.info('In this case you need to use languageSwitcherMenu.')
    }

    this.$button_.on('click', () => {
      let availableLanguages = this.getLocaliser().getAvailableLanguages()
      let sourceLanguage = availableLanguages[0]
      let targetLanguage = availableLanguages[1] || availableLanguages[0]
      this.getLocaliser().setCurrentLang(targetLanguage)

      let map = this.getMap()
      let visibilities = map.getLayerGroup().getIdsVisibilities()

      map.get('configurator').configureLayers()
      map.get('configurator').configureUI()

      map.getLayerGroup().setIdsVisibilities(visibilities)

      this.getLocaliser().setAvailableLanguages([targetLanguage, sourceLanguage])
    })
  }

  /**
   * @param {G4UMap} map
   */
  setMap (map) {
    if (map) {
      this.$button_.html(this.getLocaliser().getCurrentLang())
      addTooltip(this.$button_, this.getLocaliser().localiseUsingDictionary('LanguageSwitcherButton tipLabel'))
    }

    super.setMap(map)
  }
}
