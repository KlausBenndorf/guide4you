import $ from 'jquery'

import { Control } from 'guide4you/src/controls/Control'
import { cssClasses } from 'guide4you/src/globals'
import { Debug } from 'guide4you/src/Debug'

import '../../less/linkgeneratorbutton.less'
import { filterText, restoreText } from 'guide4you/src/xssprotection'
import Collection from 'ol/Collection'
import Draw from 'ol/interaction/Draw'

/**
 * @typedef {g4uControlOptions} LinkGeneratorButtonOptions
 * @property {string} [baseURL] the baseUrl of the link. Defaults to the current location.
 * @property {StyleLike} [style='#defaultStyle'] The style of the marker.
 */

/**
 * Shows a window which contains a link to the current location of the map. Optionally a marker can be positioned on the
 * map by the user and a text for this marker can be added.
 */
export class LinkGeneratorButton extends Control {
  /**
   * @param {LinkGeneratorButtonOptions} options
   */
  constructor (options = {}) {
    options.className = options.className || 'g4u-linkgenerator'
    options.element = $('<div>')[0]

    super(options)

    /**
     * @type {boolean}
     * @private
     */
    this.active_ = false

    /**
     * @type {StyleLike}
     * @private
     */
    this.style_ = options.style || '#defaultStyle'

    /**
     * @type {string}
     * @private
     */
    this.baseURL_ = options.baseURL

    this.setTitle(this.getTitle() || this.getLocaliser().localiseUsingDictionary('LinkGeneratorButton title'))
    this.setTipLabel(this.getTipLabel() || this.getLocaliser().localiseUsingDictionary('LinkGeneratorButton tipLabel'))

    this.createHTML()
  }

  createHTML () {
    let $element = this.get$Element()

    // rtl

    if (this.getLocaliser().isRtl()) {
      $element.prop('dir', 'rtl')
    }

    // title

    $element.append($('<h3>')
      .html(this.getTipLabel()))

    // set marker checkbox

    /**
     * @type {jQuery}
     * @private
     */
    this.$markerCheckbox_ = $('<input type="checkbox">')

    let $checkboxLabel = $('<label>')
      .addClass(this.className_ + '-setmarker-checkbox')
      .html(this.getLocaliser().localiseUsingDictionary('LinkGeneratorButton setMarkerText'))
      .prepend(this.$markerCheckbox_)

    $element.append($checkboxLabel)

    this.$markerCheckbox_.on('click', () => {
      if (this.$markerCheckbox_.is(':checked')) {
        this.placeMarker()
      } else {
        this.hideMarker()
      }
    })

    // marker description text area

    /**
     * @type {jQuery}
     * @private
     */
    this.$markerDescriptionTextArea_ = $('<textarea>')

    this.$markerDescriptionTextArea_.on('input', () => this.updateDescription())

    /**
     * @type {jQuery}
     * @private
     */
    this.$markerDescription_ = $('<label>')
      .addClass(this.className_ + '-setmarker-textbox')
      .addClass(cssClasses.hidden)
      .html(this.getLocaliser().localiseUsingDictionary('LinkGeneratorButton setMarkerTextBoxText'))
      .append(this.$markerDescriptionTextArea_)

    $element.append(this.$markerDescription_)

    // link display

    /**
     * @type {jQuery}
     * @private
     */
    this.$linkDisplay_ = $('<input type="text">')
      .prop('readonly', true)

    $element.append(
      $('<label>')
        .addClass(this.className_ + '-input')
        .html(this.getLocaliser().localiseUsingDictionary('LinkGeneratorButton hint'))
        .append(this.$linkDisplay_)
    )

    this.$linkDisplay_.on('mousedown click', e => {
      if (e.which === 1) {
        e.preventDefault()
      }
      this.$linkDisplay_.focus().select()
    })
  }

  placeMarker () {
    this.enableMap()
    this.drawMarkerPoint()
      .then(point => {
        this.updateMarker(point)
        this.disableMap()
        this.$markerDescription_.removeClass(cssClasses.hidden)
        this.$linkDisplay_.focus().select()
        this.changed()
      })
  }

  hideMarker () {
    this.marker_.setActive(false)
    this.updateURL()
    this.$linkDisplay_.focus().select()
    this.$markerDescription_.addClass(cssClasses.hidden)
    this.changed()
  }

  updateDescription () {
    let text = filterText(this.$markerDescriptionTextArea_.val())
    this.marker_.setText(text)
    if (text) {
      this.marker_.setPopupVisible(true)
    } else {
      this.marker_.setPopupVisible(false)
    }
    this.updateURL()
  }

  enableMap () {
    this.shield_.setActive(false)
    let $overlayContainers = $(this.getMap().getViewport())
      .children('.ol-overlaycontainer-stopevent, .ol-overlaycontainer')
    $overlayContainers.addClass(cssClasses.hidden)
  }

  disableMap () {
    this.shield_.setActive(true)
    let $overlayContainers = $(this.getMap().getViewport())
      .children('.ol-overlaycontainer-stopevent, .ol-overlaycontainer')
    $overlayContainers.removeClass(cssClasses.hidden)
  }

  updateMarker (point) {
    this.marker_.setPosition(point)

    let text = this.getLocaliser().localiseUsingDictionary('LinkGeneratorButton markerText')
    this.marker_.setText(text)
    this.$markerDescriptionTextArea_.val(restoreText(text))

    if (text) {
      this.marker_.setPopupVisible(true)
    } else {
      this.marker_.setPopupVisible(false)
    }

    this.marker_.setActive(true)
    this.updateURL()
  }

  /**
   * @param {?G4UMap} map
   */
  setMap (map) {
    if (map) {
      /**
       * @type {Marker}
       * @private
       */
      this.marker_ = map.get('marker')

      /**
       * @type {Shield}
       * @private
       */
      this.shield_ = map.get('shield')

      let collection = new Collection()

      /**
       * @type {Draw}
       * @private
       */
      this.drawPoint_ = new Draw({
        features: collection,
        type: 'Point',
        style: map.get('styling').getStyle(this.style_)
      })
      this.drawPoint_.setActive(false)
      map.addSupersedingInteraction('singleClick doubleClick mouseMove', this.drawPoint_)
    }

    super.setMap(map)
  }

  /**
   * Let the user draw a point for the marker.
   * @returns {Promise.<Feature>}
   */
  drawMarkerPoint () {
    return new Promise(resolve => {
      this.drawPoint_.setActive(true)
      $(this.getMap().getViewport()).addClass(cssClasses.crosshair)

      this.drawPoint_.once('drawend', (e) => {
        this.drawPoint_.setActive(false)
        $(this.getMap().getViewport()).removeClass(cssClasses.crosshair)

        resolve(e.feature.getGeometry().getCoordinates())
      })
    })
      .catch(Debug.defaultErrorHandler)
  }

  updateURL () {
    let urlApi = this.getMap().get('urlApi')
    this.$linkDisplay_.val(urlApi.makeURL({ baseURL: this.baseURL_ }))
  }

  /**
   * @param {boolean} active
   */
  setActive (active) {
    let oldValue = this.active_
    if (oldValue !== active) {
      this.active_ = active

      if (active === true) {
        if (this.marker_.getActive()) {
          this.resetMarker_ = {
            position: this.marker_.getPosition(),
            text: this.marker_.getText(),
            popVis: this.marker_.getPopupVisible()
          }
        }

        this.shield_.setActive(true)
        this.shield_.add$OnTop(this.get$Element())

        this.updateURL()
        this.$linkDisplay_.focus().select()

        if (this.marker_.getActive()) {
          this.$markerCheckbox_.prop('checked', true)
          this.$markerDescription_.removeClass(cssClasses.hidden)
          if (this.marker_.getText()) {
            this.$markerDescriptionTextArea_.val(restoreText(this.marker_.getText()))
          }
          this.marker_.setPopupVisible(true)
        }
      } else {
        this.shield_.setActive(false)
        this.shield_.remove$OnTop(this.get$Element())

        this.$markerDescriptionTextArea_.val('')
        this.$markerCheckbox_.prop('checked', false)
        this.$markerDescription_.addClass(cssClasses.hidden)

        if (this.resetMarker_) {
          this.marker_.setActive(true)

          this.marker_.setPosition(this.resetMarker_.position)
          this.marker_.setText(this.resetMarker_.text)
          this.marker_.setPopupVisible(this.resetMarker_.popVis)

          delete this.resetMarker_
        } else {
          this.marker_.setActive(false)
        }
      }

      this.dispatchEvent({
        type: 'change:active',
        oldValue: oldValue
      })
    }
  }

  /**
   * @returns {boolean}
   */
  getActive () {
    return this.active_
  }
}
