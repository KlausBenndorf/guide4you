import $ from 'jquery'

import {Dropdown} from '../html/Dropdown'
import { addTooltip } from '../html/html'
import {Control} from './Control'
import { cssClasses, keyCodes } from '../globals'
import {Debug} from '../Debug'

import '../../less/languageControls.less'
import {ListenerOrganizerMixin} from '../ListenerOrganizerMixin'
import {mixin} from '../utilities'
import { ActivatableMixin } from './ActivatableMixin'

/**
 * @typedef {g4uControlOptions} LanguageSwitcherMenuOptions
 * @property {boolean} [showLongLanguage=false]
 * @property {boolean} [active=false]
 */

/**
 * A button to switch the language that is being used.
 */
export class LanguageSwitcherMenu extends mixin(Control, [ListenerOrganizerMixin, ActivatableMixin]) {
  /**
   * @param {LanguageSwitcherMenuOptions} options
   */
  constructor (options = {}) {
    options.className = options.className || 'g4u-languageswitchermenu'
    options.element = $('<div>').get(0)
    options.singleButton = false

    super(options)

    this.showLongLanguage_ = options.showLongLanguage || false

    this.setTitle(this.getLocaliser().getCurrentLang())

    /**
     * @type {jQuery}
     * @private
     */
    this.$button_ = $('<button>')
      .addClass(this.className_ + '-button')
      .addClass(cssClasses.mainButton)

    if (this.showLongLanguage_) {
      this.$button_.addClass(this.className_ + '-lang-long')
    }

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

    this.dropdown_.setEntries(languages,
      languages.map(l => `${l.toUpperCase()} - ${this.getLocaliser().localiseUsingDictionary(l)}`))

    this.dropdown_.on('select', () => this.getLocaliser().setCurrentLang((this.dropdown_.getValue())))

    this.get$Element().on('keydown', e => {
      if (e.which === keyCodes.ESCAPE) {
        this.setActive(false)
        $(this.getMap().getViewport()).focus()
      }
    })

    this.on('change:active', () => this.handleActiveChange_())
  }

  /**
   * @param {G4UMap} map
   */
  setMap (map) {
    if (this.getMap()) {
      this.detachAllListeners()

      this.setActive(false)
    }

    super.setMap(map)

    if (map) {
      this.collapse_ = true

      // The following does not work in 'on('click')' as it relies on useCapture; all click events will be
      // dispatched to the listener before being dispatched to any EventTarget beneath it in the DOM tree.
      this.listenAt(document).on('click', () => {
        this.collapse_ = true
      }, true)

      this.listenAt([
        $(this.getMap().getViewport()).find('.ol-overlaycontainer-stopevent'),
        document
      ]).on('click', () => {
        if (this.collapse_ && this.getActive()) {
          this.setActive(false)
        }
      })

      this.listenAt(this.get$Element()).on('click', () => {
        this.collapse_ = false
        this.setActive(!this.getActive())
      })

      let curLang = this.getLocaliser().getCurrentLang()
      if (!this.showLongLanguage_) {
        this.$button_.html(curLang.toUpperCase())
      } else {
        this.$button_.html(curLang.toUpperCase() + ' - ' + this.getLocaliser().localiseUsingDictionary(curLang))
      }

      addTooltip(this.$button_, this.getLocaliser().localiseUsingDictionary('LanguageSwitcherMenu tipLabel'))

      this.activateOnMapChange()
    }
  }

  handleActiveChange_ () {
    let active = this.getActive()
    this.dropdown_.setActivated(this.getLocaliser().getCurrentLang())
    if (active) {
      this.collapse_ = false
      this.dropdown_.slideDown(this.getMap().get('mobile'))
    } else {
      this.dropdown_.slideUp(this.getMap().get('mobile'))
    }
  }
}
