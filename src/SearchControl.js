/**
 * @typedef {g4uControlOptions} SearchControlOptions
 * @property {number} [amountDropdownEntries=4] number of entries shown in the dropdown
 * @property {number} [autocompleteStart=2] count of letters after which the autocomplete starts.
 *    if set to -1 autocomplete is disabled
 * @property {number} [autocompleteDelay=300]
 * @property {number} [slideDuration=400] time it takes for the dropdown to slide down
 * @property {SearchConnectorOptions} connector options of the connector to use. At the moment 'nominatim' is
 *    delivered within this module.
 * @property {StyleLike} [style] of the search results
 * @property {boolean} [animated] affects the move to the search results.
 * @property {string} [placeholder] text to be seen in the input field if the user has made no input yet
 * @property {string} [ghostentry] text to be seen in the dropdown if the autocomplete or search didn't find
 * @property {string} [deactivateMobileSearch='exactResult']  other possible values are 'never' and 'anyResult'
 */
import $ from 'jquery'

import { addTooltip } from 'guide4you/src/html/html'
import { Dropdown } from 'guide4you/src/html/Dropdown'
import { keyCodes } from 'guide4you/src/globals'
import { html2Text } from 'guide4you/src/utilities'
import { Control } from 'guide4you/src/controls/Control'
import { SearchView } from './SearchView'

import 'polyfill!Element.prototype.placeholder'

import '../less/searchcontrol.less'
import Feature from 'ol/Feature'

const DeactivateMobileSearch = {
  NEVER: 'never',
  ANY: 'anyResult',
  EXACT: 'exactResult'
}

/**
 *
 * @fires 'searchEnd' with bool parameter `success`
 */
export class SearchControl extends Control {
  /**
   * @param {SearchModule} module
   * @param {SearchControlOptions} options
   */
  constructor (module, options) {
    options.className = options.className || 'g4u-search-control'
    options.element = $('<div>').get(0)
    options.singleButton = false

    super(options)

    /**
     * @type {SearchModule}
     * @private
     */
    this.module_ = module

    if (this.getLocaliser().isRtl()) {
      this.get$Element().prop('dir', 'rtl')
    }

    /**
     * @type {SearchView}
     * @private
     */
    this.searchView_ = new SearchView({ style: options.style })

    options.connector.localiser = this.getLocaliser()

    this.searchConnector_ = this.module_.getConnector(options.connector)

    /**
     * @type {string}
     * @private
     */
    this.classNameTextfield_ = this.className_ + '-textfield'

    /**
     * @type {string}
     * @private
     */
    this.classNameSearchbutton_ = this.className_ + '-searchbutton'

    /**
     * @type {number}
     * @private
     */
    this.amountDropdownEntries_ = (options.hasOwnProperty('amountDropdownEntries')) ? options.amountDropdownEntries : 4

    /**
     * @type {number}
     * @private
     */
    this.autocompleteStart_ = (options.hasOwnProperty('autocompleteStart')) ? options.autocompleteStart : 2
    let slideDuration = options.slideDuration || 400

    /**
     * @type {number}
     * @private
     */
    this.autocompleteDelay_ = options.hasOwnProperty('autocompleteDelay') ? options.autocompleteDelay : 300

    /**
     * @type {boolean}
     * @private
     */
    this.animated_ = options.animated

    /**
     * @type {string}
     * @private
     */
    this.deactivateMobileSearch_ = options.hasOwnProperty('deactivateMobileSearch')
      ? options.deactivateMobileSearch
      : DeactivateMobileSearch.EXACT

    /**
     * @type {string}
     * @private
     */
    this.projectionOfServer_ = options.projectionOfServer

    let placeholder = (options.hasOwnProperty('placeholder'))
      ? this.getLocaliser().selectL10N(options.placeholder)
      : this.getLocaliser().localiseUsingDictionary('SearchControl placeholder')

    /**
     * @type {jQuery}
     * @private
     */
    this.$textfield_ = $('<input autocomplete="off" type="search">')
      .prop('placeholder', placeholder)
      .addClass(this.classNameTextfield_)

    /**
     * @type {jQuery}
     * @private
     */
    this.$submitButton_ = $('<button>')
      .addClass(this.classNameSearchbutton_)
      .text('S')
      .on('click', () => this.onSubmit_())

    addTooltip(this.$submitButton_, this.getLocaliser().localiseUsingDictionary('SearchControl searchButton'))

    /**
     * @type {Dropdown}
     * @private
     */
    this.dropdown_ = new Dropdown({
      ghostentry: options.hasOwnProperty('ghostentry')
        ? options.ghostentry
        : this.getLocaliser().localiseUsingDictionary('SearchControl noSearchResults'),
      slideDuration: slideDuration
    })

    this.dropdown_.on('select', () => this.onDropdownSelect_())

    /**
     * @type {boolean}
     * @private
     */
    this.dropdownActive_ = false

    /**
     * @type {Array}
     * @private
     */
    this.dropdownData_ = []

    /**
     * @type {boolean}
     * @private
     */
    this.active_ = false

    this.$textfield_.on('input', e => {
      this.onTextInput_(e)
    })

    // Keyevents in the whole form
    this.get$Element().on('keydown', e => {
      // slide up dropdown
      if (e.which === keyCodes.ESCAPE) {
        this.dropdown_.slideUp()
        $(this.getMap().getViewport()).focus()
      } else if (e.which === keyCodes.ENTER) {
        this.onSubmit_()
      }
    })

    // Keyevents only in the textfields
    this.$textfield_.on('keydown', e => {
      if (e.which === keyCodes.ARROW_DOWN) {
        if (this.dropdown_.isSelectable()) {
          this.dropdown_.focus()
        }
      } else if ((e.which === keyCodes.TAB) && !e.shiftKey) {
        this.dropdown_.slideUp()
      }
    })

    // Keyevents only in the dropdown
    this.dropdown_.on('leave:backwards', e => {
      e.originalEvent.preventDefault()
      this.$textfield_.focus()
    })

    this.dropdown_.on('leave:forwards', e => {
      e.originalEvent.preventDefault()
      this.$submitButton_.focus()
    })

    // Assembling Element
    this.get$Element()
      .append(this.$textfield_)
      .append(this.$submitButton_)
      .append(this.dropdown_.get$Element())
  }

  /**
   * @param {?G4UMap} map
   */
  setMap (map) {
    if (map) {
      // search view
      this.searchView_.setMap(map)

      // search connector
      this.searchConnector_.setMap(map)

      // slide up the dropdown if clicked outside of the searchControl, slide it down if clicked inside
      let slideUp

      document.addEventListener('click', () => {
        if (!map.get('mobile')) {
          slideUp = true
        } else {
          slideUp = false
        }
      }, true)

      $(map.getViewport()).find('.ol-overlaycontainer-stopevent')
        .add(document)
        .on('click', () => {
          if (slideUp) {
            this.setActive(false)
          }
        })

      this.$textfield_.on('click', () => {
        slideUp = false
        this.setActive(true)
      })
    }
    super.setMap(map)
  }

  /**
   * @param {boolean} active
   */
  setActive (active) {
    let oldValue = this.active_
    if (oldValue !== active) {
      if (active) {
        if (this.dropdownActive_) {
          this.dropdown_.slideDown()
        }
        setTimeout(() => this.$textfield_.focus(), 0)
      } else {
        if (this.dropdownActive_) {
          this.dropdown_.slideUp()
        }
      }

      this.active_ = active
      this.dispatchEvent({
        type: 'change:active',
        oldValue
      })
    }
  }

  getActive () {
    return this.active_
  }

  /**
   * @private
   */
  updateDropdown_ (dropdownTexts, data) {
    let dropdownContainsOnlyInput = this.dropdown_.getValue() &&
      dropdownTexts.length === 1 && this.dropdown_.getText() === html2Text(dropdownTexts[0])

    if (dropdownContainsOnlyInput || dropdownTexts.length === 0) {
      this.dropdown_.setLength(0)
      this.dropdownActive_ = false
      return this.dropdown_.slideUp().then(() => this.changed())
    } else {
      let length = Math.min(this.amountDropdownEntries_, dropdownTexts.length)
      this.dropdown_.setEntries(data.slice(0, length), dropdownTexts.slice(0, length))
      this.dropdownActive_ = true
      return this.dropdown_.slideDown().then(() => this.changed())
    }
  }

  /**
   * @private
   */
  onDropdownSelect_ () {
    let dropdownData = this.dropdown_.getValue()

    this.$textfield_.val(html2Text(this.dropdown_.getText()))

    this.updateDropdown_([], [])

    if (dropdownData instanceof Feature) {
      this.onSearchEnd_([dropdownData])
    } else {
      this.searchConnector_.getByHandle(dropdownData)
        .then(feature => {
          this.onSearchEnd_([feature])
        })
    }
  }

  /**
   * @private
   */
  onTextInput_ () {
    this.searchView_.hideSearchResults()

    clearTimeout(this.autocompleteTimeout_)
    this.autocompleteTimeout_ = setTimeout(() => {
      // checking if autocomplete search should be performed and perform it
      let searchtext = encodeURIComponent(this.$textfield_.val())
      if (this.autocompleteStart_ >= 0 && searchtext.length >= this.autocompleteStart_) {
        this.searchConnector_.getAutoComplete(searchtext)
          .then(([dropdownTexts, data]) => {
            this.updateDropdown_(dropdownTexts, data)
          })
      } else if (this.autocompleteStart_ >= 0) {
        this.dropdown_.slideUp()
      }
    }, this.autocompleteDelay_)
  }

  /**
    * @private
   */
  onSubmit_ () {
    let searchstring = this.$textfield_.val()

    if (!this.dropdown_.getValue() || searchstring !== html2Text(this.dropdown_.getText())) {
      searchstring = encodeURIComponent(searchstring)
      this.searchView_.hideSearchResults()

      if (searchstring !== '') {
        this.searchConnector_.getSearchResult(searchstring)
          .then(([dropdownTexts, data]) => {
            this.updateDropdown_(dropdownTexts, data)
            this.onSearchEnd_(data)
          })
      } else {
        this.updateDropdown_([], [])
      }
    }
  }

  onSearchEnd_ (features) {
    if (features.length > 0) {
      this.searchView_.showSearchResults(features)

      let isExact = features.length === 1

      if (!this.getMap().get('mobile') && isExact) {
        // exact search result desktop
        let featurePopup = this.getMap().get('featurePopup')
        featurePopup.setFeature(features[0], features[0].getStyle() || this.searchView_.getStyle())
        featurePopup.setVisible(true, false)
        // featurePopup.update(false)
        featurePopup.centerMapOnPopup()
      } else {
        this.searchView_.centerOnSearchlayer()

        if ((isExact && this.deactivateMobileSearch_ === DeactivateMobileSearch.EXACT) ||
          this.deactivateMobileSearch_ === DeactivateMobileSearch.ANY) {
          this.setActive(false)
        }
      }

      this.dispatchEvent({
        type: 'searchEnd',
        success: true,
        searchTerm: this.getSearchValue()
      })
    } else {
      this.dropdown_.showGhostEntry()

      this.dispatchEvent({
        type: 'searchEnd',
        success: false,
        searchTerm: this.getSearchValue()
      })
    }
  }

  /**
   * @returns {string}
   */
  getSearchValue () {
    return encodeURIComponent(this.$textfield_.val())
  }

  /**
   * @returns {SearchView}
   */
  getSearchView () {
    return this.searchView_
  }
}
