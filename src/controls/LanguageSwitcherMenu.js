import $ from 'jquery'

import {Dropdown} from '../html/Dropdown'
import { addTooltip } from '../html/html'
import {Control} from './Control'
import { cssClasses, keyCodes } from '../globals'
import {Debug} from '../Debug'

import '../../less/languageControls.less'

/**
 * @typedef {g4uControlOptions} LanguageSwitcherMenuOptions
 */

/**
 * A button to switch the language that is being used.
 */
export class LanguageSwitcherMenu extends Control {
  /**
   * @param {LanguageSwitcherMenuOptions} options
   */
  constructor (options = {}) {
    options.className = options.className || 'g4u-languageswitchermenu'
    options.element = $('<div>').get(0)
    options.singleButton = false

    super(options)

    this.setTitle(this.getLocaliser().getCurrentLang())

    /**
     * @type {jQuery}
     * @private
     */
    this.$button_ = $('<button>')
      .addClass(this.className_ + '-button')
      .addClass(cssClasses.mainButton)
    this.get$Element().append(this.$button_)

    let dropdownOptions = {'className': 'g4u-dropdown'}

    /**
     * @type {Dropdown}
     * @private
     */
    this.dropdown_ = new Dropdown(dropdownOptions)
    this.get$Element().append(this.dropdown_.get$Element())

    let languages = this.getLocaliser().getAvailableLanguages()

    if (languages.length < 2) {
      Debug.info('You do not have any languages to switch between.')
      Debug.info('Could it be that you forgot to disable languageSwitcherMenu?')
    } else if (languages.length === 2) {
      Debug.info('You only have 2 languages to switch between.')
      Debug.info('What about using languageSwitcherButton in place of languageSwitcherMenu?')
    }

    for (let i = 0, ii = languages.length; i < ii; i++) {
      let iso639 = languages[i]
      this.dropdown_.addEntry(
        iso639.toUpperCase() + ' - ' + this.getLocaliser().localiseUsingDictionary(iso639),
        this.languageSwitchHandler(iso639),
        iso639 === this.getLocaliser().getCurrentLang()
      )
    }

    this.get$Element().on('keydown', e => {
      if (e.which === keyCodes.ESCAPE) {
        this.setActive(false)
        $(this.getMap().getViewport()).focus()
      }
    })

    /**
     * @type {boolean}
     * @private
     */
    this.active_ = false
  }

  /**
   * Creates a handler to switch to the specified language
   * @param {string} iso639
   * @returns {function}
   */
  languageSwitchHandler (iso639) {
    return () => {
      this.getLocaliser().setCurrentLang(iso639)
      this.setTitle(iso639)

      let map = this.getMap()

      let visibilities = map.getLayerGroup().getIdsVisibilities()

      map.get('configurator').configureLayers()
      map.get('configurator').configureUI()

      map.getLayerGroup().setIdsVisibilities(visibilities)
    }
  }

  /**
   * @param {G4UMap} map
   */
  setMap (map) {
    if (this.getMap()) {
      this.setActive(false)

      $(this.getMap().getViewport()).find('.ol-overlaycontainer-stopevent')
        .add(document)
        .off('click', this.deactivateListener_)
    }

    super.setMap(map)

    if (map) {
      this.collapse_ = true

      // The following does not work in 'on('click')' as it relies on useCapture; all click events will be
      // dispatched to the listener before being dispatched to any EventTarget beneath it in the DOM tree.
      document.addEventListener('click', function () {
        this.collapse_ = true
      }, true)

      this.deactivateListener_ = () => {
        if (this.collapse_ && this.getActive()) {
          this.setActive(false)
        }
      }

      $(map.getViewport()).find('.ol-overlaycontainer-stopevent')
        .add(document)
        .on('click', this.deactivateListener_)

      this.get$Element().on('click', () => {
        this.collapse_ = false
        this.setActive(!this.getActive())
      })

      this.$button_.html(this.getLocaliser().getCurrentLang())

      addTooltip(this.$button_, this.getLocaliser().localiseUsingDictionary('LanguageSwitcherMenu tipLabel'))
    }
  }

  getActive () {
    return this.active_
  }

  setActive (active) {
    let oldValue = this.active_
    if (oldValue !== active) {
      if (active) {
        this.collapse_ = false
        this.dropdown_.slideDown(this.getMap().get('mobile'))
      } else {
        this.dropdown_.slideUp(this.getMap().get('mobile'))
      }
      this.active_ = active
      this.dispatchEvent({
        type: 'change:active',
        oldValue
      })
    }
  }
}
