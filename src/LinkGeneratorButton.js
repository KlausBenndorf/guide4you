import ol from 'openlayers'
import $ from 'jquery'

import Control from 'guide4you/src/controls/Control'
import { cssClasses } from 'guide4you/src/globals'
import Debug from 'guide4you/src/Debug'

import '../less/linkgeneratorbutton.less'

/**
 * @typedef {g4uControlOptions} LinkGeneratorButtonOptions
 * @property {string} [baseURL] the baseUrl of the link. Defaults to the current location.
 * @property {StyleLike} [style='#defaultStyle'] The style of the marker.
 */

/**
 * Shows a window which contains a link to the current location of the map. Optionally a marker can be positioned on the
 * map by the user and a text for this marker can be added.
 */
export default class LinkGeneratorButton extends Control {
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

    /**
     * @type {jQuery}
     * @private
     */
    this.$markerCheckbox_ = $('<input type="checkbox">')
      .addClass(this.className_ + '-setmarker-checkbox')

    /**
     * @type {jQuery}
     * @private
     */
    this.$markerTextBox_ = $('<textarea>')

    /**
     * @type {jQuery}
     * @private
     */
    this.$markerTextDiv_ = $('<div>')
      .addClass(this.className_ + '-setmarker-textbox')
      .html(this.getLocaliser().localiseUsingDictionary('LinkGeneratorButton setMarkerTextBoxText'))
      .append('<br>')
      .append(this.$markerTextBox_)

    let $title = $('<h3>')
      .html(this.getTipLabel())

    let $setMarkerText = $('<span>')
      .addClass(this.className_ + '-setmarker-text')
      .html(this.getLocaliser().localiseUsingDictionary('LinkGeneratorButton setMarkerText'))

    /**
     * @type {jQuery}
     * @private
     */
    this.$setMarker_ = $('<div>')
      .append(this.$markerCheckbox_)
      .append($setMarkerText)

    let $explanation = $('<div>')
      .append(this.getLocaliser().localiseUsingDictionary('LinkGeneratorButton hint'))

    /**
     * @type {jQuery}
     * @private
     */
    this.$linkDisplay_ = $('<input type="text">')
      .addClass(this.className_ + '-input')
      .prop('readonly', true)

    this.$linkDisplay_.on('mousedown click', e => {
      if (e.which === 1) {
        e.preventDefault()
      }
      this.$linkDisplay_.focus().select()
    })

    let onCheckboxChange = () => {
      if (this.$markerCheckbox_.is(':checked')) {
        this.drawMarkerPoint()
          .then(() => {
            this.marker_.setActive(true)
            this.$setMarker_.append(this.$markerTextDiv_)
            this.updateURL()
            this.$linkDisplay_.focus().select()
            this.changed()
          })
      } else {
        this.marker_.setActive(false)
        this.updateURL()
        this.$linkDisplay_.focus().select()
        this.$markerTextDiv_.detach()
        this.changed()
      }
    }

    $setMarkerText.on('click', e => {
      this.$markerCheckbox_.prop('checked', !this.$markerCheckbox_.prop('checked'))
      onCheckboxChange(e)
    })

    this.$markerCheckbox_.on('click', onCheckboxChange)

    this.$markerTextBox_.on('input', () => {
      let text = this.$markerTextBox_.val()
      if (text) {
        this.marker_.setPopupVisible(true)
      } else {
        this.marker_.setPopupVisible(false)
      }
      this.marker_.setText(text) // has to be done after setVisible
      this.updateURL()
    })

    this.get$Element()
      .append($title)
      .append(this.$setMarker_)
      .append($explanation)
      .append(this.$linkDisplay_)
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

      let collection = new ol.Collection()

      /**
       * @type {ol.interaction.Draw}
       * @private
       */
      this.drawPoint_ = new ol.interaction.Draw({
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
   * @returns {Promise.<ol.Feature>}
   */
  drawMarkerPoint () {
    return new Promise(resolve => {
      this.shield_.setActive(false)
      let $viewport = $(this.getMap().getViewport())
      let $overlayContainers = $viewport.children('.ol-overlaycontainer-stopevent, .ol-overlaycontainer')

      $viewport.addClass(cssClasses.crosshair)
      $overlayContainers.addClass(cssClasses.hidden)

      this.drawPoint_.setActive(true)
      this.drawPoint_.once('drawend', (e) => {
        this.marker_.setPosition(e.feature.getGeometry().getCoordinates())

        let text = this.getLocaliser().localiseUsingDictionary('LinkGeneratorButton markerText')
        this.marker_.setText(text)
        this.$markerTextBox_.val(text)

        if (text) {
          this.marker_.setPopupVisible(true, false)
        } else {
          this.marker_.setPopupVisible(false)
        }

        this.shield_.setActive(true)

        $overlayContainers.removeClass(cssClasses.hidden)
        $viewport.removeClass(cssClasses.crosshair)

        this.drawPoint_.setActive(false)

        resolve(this.drawPoint_)
      })
    })
    .catch(Debug.defaultErrorHandler)
  }

  updateURL () {
    let urlApi = this.getMap().get('urlApi')
    this.$linkDisplay_.val(urlApi.makeURL({baseURL: this.baseURL_}))
  }

  /**
   * @param {boolean} active
   */
  setActive (active) {
    let oldValue = this.active_
    if (oldValue !== active) {
      this.active_ = active

      let changeEvent = {
        type: 'change:active',
        oldValue: oldValue
      }

      if (active === true) {
        if (this.marker_.getActive()) {
          this.resetMarker_ = {
            position: this.marker_.getPosition(),
            text: this.marker_.getText(),
            popvis: this.marker_.getPopupVisible()
          }
        }

        this.shield_.setActive(true)
        this.shield_.getInFront(this.get$Element())

        this.updateURL()
        this.$linkDisplay_.focus().select()

        if (this.marker_.getActive()) {
          this.$markerCheckbox_.prop('checked', true)
          this.$setMarker_.append(this.$markerTextDiv_)
          if (this.marker_.getText()) {
            this.$markerTextBox_.val(this.marker_.getText())
          }
        }
      } else {
        this.shield_.setActive(false)

        this.$markerTextBox_.val('')
        this.$markerCheckbox_.prop('checked', false)
        this.$markerTextDiv_.detach()

        if (this.resetMarker_) {
          this.marker_.setActive(true)

          this.marker_.setPosition(this.resetMarker_.position)
          this.marker_.setText(this.resetMarker_.text)
          this.marker_.setPopupVisible(this.resetMarker_.popupvis)

          delete this.resetMarker_
        } else {
          this.marker_.setActive(false)
        }
      }

      this.dispatchEvent(changeEvent)
    }
  }

  /**
   * @returns {boolean}
   */
  getActive () {
    return this.active_
  }
}
