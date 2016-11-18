import ol from 'openlayers'
import $ from 'jquery'

import {Positioning} from './Positioning'

import {Move} from '../Move'
import {FeaturePopup} from '../FeaturePopup'
import {FeatureTooltip} from '../FeatureTooltip'

import {Shield} from '../html/Shield'

import {ControlFactory} from './ControlFactory'

import {Debug} from '../Debug'

import {copyDeep} from '../utilitiesObject'
import {checkFor, getConfig, urlDirname, urlJoin} from '../utilities'

import {MeasurementButton} from '../controls/MeasurementButton'
import {PrintButton} from '../controls/PrintButton'

import {cssClasses} from '../globals'

import {FeatureSelect} from '../interactions/FeatureSelect'

import {parseCSSColor} from 'csscolorparser'
import {FunctionCallBuffer} from '../FunctionCallBuffer'
import {ShowWMSFeatureInfo} from '../ShowWMSFeatureInfo'

/**
 * This class configures the UI of a map according to its mapconfig
 */
export class UIConfigurator {
  /**
   * @param {G4UMap} map
   */
  constructor (map) {
    /**
     * @type {G4UMap}
     * @private
     */
    this.map_ = map
    this.map_.on('change:mapConfig', this.configureUI.bind(this))

    /**
     * @type {boolean}
     * @private
     */
    this.initialized_ = false

    /**
     * Counts how many cssFiles are getting loaded
     * @type {number}
     * @private
     */
    this.pending_ = 0
  }

  /**
   * Fill the given css String with the rigth colors
   * @param {string} css
   * @param {Color[]} colors
   * @returns {string}
   */
  static templateCSS (css, colors) {
    // find the used index of the color template
    let colorTemplateIndex = (c) => {
      let channels = 0
      let index = -1
      for (let i = 0; i < 3; i++) {
        if (c[i] !== 0) {
          channels++
          index = i
        }
      }
      if (channels > 1) {
        return -1
      } else {
        return index
      }
    }

    let regExp = /(rgba?\([^)]*\))|(#[0-9a-f]{6})/g

    colors = colors.map(parseCSSColor)

    return css.replace(regExp, match => {
      let templateColor = parseCSSColor(match)
      let index = colorTemplateIndex(templateColor)
      if (index > -1) {
        let aFac = templateColor[3]
        let cFac = templateColor[index] / 120
        let newColor = [
          colors[index][0] * cFac,
          colors[index][1] * cFac,
          colors[index][2] * cFac,
          colors[index][3] * aFac
        ]
        return `rgba(${newColor[0]}, ${newColor[1]}, ${newColor[2]}, ${newColor[3]})`
      }
      return match
    })
  }

  /**
   * Fixes all urls in the css string to the right path
   * @param css
   * @param cssPath
   * @returns {string}
   */
  static fixUrls (css, cssPath) {
    let dirname = urlDirname(cssPath)
    return css.replace(/url\("([^"]*)"\)/g, (match, url) => {
      return `url("${urlJoin(dirname, url)}")`
    })
  }

  /**
   * Loads the from cssFile the given conf (if any is given) and inserts into a style tag in the head of the document
   * @param {MapConfig} conf
   * @returns {Promise}
   */
  loadCSS (conf) {
    return new Promise(resolve => {
      if (conf.hasOwnProperty('cssFile')) {
        const id = 'g4u-css'
        let $style = $('#' + id)

        if ($style.length === 0) {
          $style = $('<style>', {
            'id': id
          })
          $('head').append($style)
        }

        const same = this.cssFile_ === conf.cssFile
        if (!same) {
          $.ajax(conf.cssFile).done(data => {
            $style.empty()
            data = UIConfigurator.fixUrls(data, conf.cssFile)
            if (conf.hasOwnProperty('cssTemplate')) {
              this.map_.set('cssTemplateFile', data)
              $style.html(UIConfigurator.templateCSS(data, conf.cssTemplate))
            } else {
              $style.html(data)
            }
            resolve()
          }).fail(() => {
            Debug.error('Failed to load css file.')
            resolve()
          })
          this.cssFile_ = conf.cssFile
        } else {
          if (conf.hasOwnProperty('cssTemplate')) {
            $style.html(UIConfigurator.templateCSS(this.map_.get('cssTemplateFile'), conf.cssTemplate))
          }
          resolve()
        }
      } else {
        resolve()
      }
    })
  }

  /**
   * This functions is called the first time the configureUI function is called
   * @param {MapConfig} mapConfigCopy
   * @private
   */
  initialize_ (mapConfigCopy) {
    //
    // Control positioning
    //

    /**
     * @type {PositioningOptions}
     */
    let positioningOptions = mapConfigCopy.positioning || {}
    positioningOptions.viewport = this.map_.getViewport()

    this.map_.set('controlPositioning', new Positioning(positioningOptions))

    let positionCallBuffer = new FunctionCallBuffer(() => {
      return this.map_.get('controlPositioning').positionElements()
    })

    this.map_.on('ready', () => positionCallBuffer.call())

    this.map_.asSoonAs('ready', true, () => {
      this.map_.on('resize', () => positionCallBuffer.call())
      this.map_.on('ready:ui', () => {
        if (this.map_.get('ready:ui')) {
          positionCallBuffer.call()
        }
      })
      this.map_.on('change:mobile', () => positionCallBuffer.call())

      this.map_.on('ready:layers', () => {
        positionCallBuffer.call()
        this.map_.getLayerGroup().forEachOn('change:visible', () => setTimeout(() => positionCallBuffer.call(), 200))
      })

      this.map_.getLayerGroup().forEachOn('change:visible', () => setTimeout(() => positionCallBuffer.call(), 200))
    })

    //
    //  Responsiveness / Mobile Layout
    //

    this.map_.set('mobile', false)
    $(this.map_.getTarget()).children().addClass(cssClasses.desktop)

    let lastMatch
    let oldScaleIcons
    let oldAnimations

    let checkMobileLayoutQuery = () => {
      /**
       * @type {MobileLayoutOptions}
       */
      let mobileLayout = this.map_.get('mobileLayout')
      if (mobileLayout && mobileLayout.mediaQueries && window.matchMedia) {
        let match = false
        mobileLayout.mediaQueries.forEach((query) => {
          match = match || window.matchMedia(query).matches
        })

        if (match !== lastMatch) {
          if (match) {
            $(this.map_.getTarget()).children().addClass(cssClasses.mobile)
            $(this.map_.getTarget()).children().removeClass(cssClasses.desktop)

            this.map_.set('mobile', true)

            if (mobileLayout.hasOwnProperty('animations')) {
              oldAnimations = this.map_.get('move').getAnimations()
              this.map_.get('move').setAnimations(mobileLayout.animations)
            }

            if (mobileLayout.hasOwnProperty('scaleIcons')) {
              oldScaleIcons = this.map_.get('scaleIcons')
              this.map_.set('scaleIcons', mobileLayout.scaleIcons)
            }
          } else {
            $(this.map_.getTarget()).children().addClass(cssClasses.desktop)
            $(this.map_.getTarget()).children().removeClass(cssClasses.mobile)

            this.map_.set('mobile', false)

            if (oldAnimations) {
              this.map_.get('move').setAnimations(oldAnimations)
            }
            if (oldScaleIcons) {
              this.map_.set('scaleIcons', oldScaleIcons)
            }
          }
        }
        lastMatch = match
      }
    }

    //
    // Enabling/Disabling responsiveness
    //

    let oldResponsive

    let onChangeResponsive = () => {
      if (this.map_.get('responsive') !== oldResponsive) {
        if (this.map_.get('responsive')) {
          checkMobileLayoutQuery()
          this.map_.on('resize', checkMobileLayoutQuery)
        } else {
          this.map_.un('resize', checkMobileLayoutQuery)
        }
        oldResponsive = this.map_.get('responsive')
      }
    }

    this.map_.once('ready', onChangeResponsive)

    this.map_.on('change:responsive', onChangeResponsive)

    this.map_.on('ready:ui', onChangeResponsive)

    //
    // Icon Scaling
    //

    this.map_.on('change:scaleIcons', () => {
      this.map_.get('styling').forEachStyle((style) => {
        let image = style.getImage()
        if (image) {
          image.setScale(this.map_.get('scaleIcons'))
        }
      })

      this.map_.getLayerGroup().recursiveForEach((layer) => {
        layer.changed()
      })
    })

    this.initialized_ = true
  }

  /**
   * @public
   */
  configureUI () {
    this.map_.set('ready:ui', false)
    this.pending_++

    let mapConfigCopy = copyDeep(this.map_.get('mapConfig'))

    if (!this.initialized_) {
      this.initialize_(mapConfigCopy)
    }

    let curConfig

    // //////////////////////////////////////////////////////////////////////////////////////// //
    //                              Load CSS if neccessary                                      //
    // //////////////////////////////////////////////////////////////////////////////////////// //

    this.loadCSS(mapConfigCopy).then(() => {
      this.pending_--
      if (this.pending_ === 0) {
        // clear
        this.map_.removeControls()
        this.map_.controlsByName = {}
        this.map_.removeInteractions()

        this.map_.get('controlPositioning').init()

        // //////////////////////////////////////////////////////////////////////////////////////// //
        //                           Move Class (before mobileLayout)                               //
        // //////////////////////////////////////////////////////////////////////////////////////// //

        let moveOptions = copyDeep(getConfig(mapConfigCopy, 'move'))
        moveOptions.map = this.map_

        this.map_.set('move', new Move(moveOptions))

        // //////////////////////////////////////////////////////////////////////////////////////// //
        //                                     HTML-Shield                                          //
        // //////////////////////////////////////////////////////////////////////////////////////// //

        if (!this.map_.get('shield')) {
          this.map_.set('shield', new Shield({ map: this.map_ }))
        }

        // //////////////////////////////////////////////////////////////////////////////////////// //
        //                                MobileLayoutMediaQuery                                    //
        // //////////////////////////////////////////////////////////////////////////////////////// //

        this.map_.set('mobileLayout', mapConfigCopy.mobileLayout)

        this.map_.set('responsive', this.map_.get('responsive') || !!this.map_.get('mobileLayout'))

        // //////////////////////////////////////////////////////////////////////////////////////// //
        //                                       MODULES                                            //
        // //////////////////////////////////////////////////////////////////////////////////////// //

        // should be before adding controls so the controls don't have to wait for any other ui elements

        for (let module of this.map_.getModules()) {
          module.configureUI(mapConfigCopy)
        }

        // //////////////////////////////////////////////////////////////////////////////////////// //
        //                                       Controls                                           //
        // //////////////////////////////////////////////////////////////////////////////////////// //

        if (!this.controlFactory) {
          this.controlFactory = new ControlFactory({
            map: this.map_,
            localiser: this.map_.get('localiser')
          })
        } else {
          this.controlFactory.setLocaliser(this.map_.get('localiser'))
        }

        this.controlFactory.addControls()

        let deactivate = control => {
          if (control.setActive) {
            control.setActive(false)
          }
          if (control.getControls) {
            control.getControls().forEach(deactivate)
          }
        }

        this.map_.on('change:mobile', () => this.map_.getControls().forEach(deactivate))

        // //////////////////////////////////////////////////////////////////////////////////////// //
        //                                     Interactions                                         //
        // //////////////////////////////////////////////////////////////////////////////////////// //

        if (checkFor(mapConfigCopy, 'interactions')) {
          if (checkFor(mapConfigCopy.interactions, 'doubleClickZoom')) {
            this.map_.addDefaultInteraction('dblclick', new ol.interaction.DoubleClickZoom())
          }

          if (checkFor(mapConfigCopy.interactions, 'dragPan')) {
            if (mapConfigCopy.kinetic !== false) {
              let decay = -0.002
              let minVelocity = 0.02
              let delay = 100
              if (typeof mapConfigCopy.kinetic === 'object') {
                decay = mapConfigCopy.kinetic.decay || decay
                minVelocity = mapConfigCopy.kinetic.minVelocity || minVelocity
                delay = mapConfigCopy.kinetic.delay || delay
              }
              this.map_.addDefaultInteraction('drag', new ol.interaction.DragPan({
                kinetic: new ol.Kinetic(decay, minVelocity, delay)
              }))
            } else {
              this.map_.addDefaultInteraction('drag', new ol.interaction.DragPan())
            }
          }

          if (checkFor(mapConfigCopy.interactions, 'dragRotate')) {
            // using default condition: ol.events.condition.altShiftKeysOnly
            this.map_.addDefaultInteraction('altShiftDrag', new ol.interaction.DragRotate())
          }

          if (checkFor(mapConfigCopy.interactions, 'dragZoom')) {
            // using default condition: ol.events.condition.shiftKeyOnly
            this.map_.addDefaultInteraction('shiftDrag', new ol.interaction.DragZoom())
          }

          if (checkFor(mapConfigCopy.interactions, 'keyboardPan')) {
            this.map_.addDefaultInteraction('keyboard', new ol.interaction.KeyboardPan())
          }

          if (checkFor(mapConfigCopy.interactions, 'keyboardZoom')) {
            this.map_.addDefaultInteraction('keyboard', new ol.interaction.KeyboardZoom())
          }

          if (checkFor(mapConfigCopy.interactions, 'mouseWheelZoom')) {
            this.map_.addDefaultInteraction('mouseWheel', new ol.interaction.MouseWheelZoom())
          }

          if (checkFor(mapConfigCopy.interactions, 'pinchRotate')) {
            this.map_.addDefaultInteraction('pinchRotate', new ol.interaction.PinchRotate())
          }

          if (checkFor(mapConfigCopy.interactions, 'pinchZoom')) {
            this.map_.addDefaultInteraction('pinchZoom', new ol.interaction.PinchZoom())
          }
        }

        this.map_.addDefaultInteraction('singleclick', new FeatureSelect({
          condition: e => ol.events.condition.singleClick(e) && $(e.originalEvent.target).is('canvas'),
          style: null,
          multi: true
        }))

        let moveInteraction = new FeatureSelect({
          condition: e => ol.events.condition.pointerMove(e) && $(e.originalEvent.target).is('canvas'),
          style: null,
          multi: true
        })
        this.map_.addDefaultInteraction('pointermove', moveInteraction)

        let $viewport = $(this.map_.getViewport())

        // if the map is left the features should get deselected
        $viewport.find('canvas').on('mouseleave', e => {
          if (!$(e.relatedTarget).is('canvas')) {
            if (moveInteraction.getFeatures().getLength() > 0) {
              moveInteraction.deselect(moveInteraction.getFeatures().getArray())
            }
          }
        })

        // //////////////////////////////////////////////////////////////////////////////////////// //
        //                                     Feature Popups                                       //
        // //////////////////////////////////////////////////////////////////////////////////////// //

        let featurePopup = this.map_.get('featurePopup')
        if (featurePopup) {
          featurePopup.setMap(null)
        }
        curConfig = getConfig(mapConfigCopy, 'featurePopup')
        if (curConfig) {
          featurePopup = new FeaturePopup(curConfig)
          featurePopup.setMap(this.map_)
          this.map_.set('featurePopup', featurePopup)
        } else {
          this.map_.set('featurePopup', undefined)
        }

        let featureTooltip = this.map_.get('featureTooltip')
        if (featureTooltip) {
          featureTooltip.setMap(null)
        }
        curConfig = getConfig(mapConfigCopy, 'featureTooltip')
        if (curConfig) {
          featureTooltip = new FeatureTooltip(curConfig)
          featureTooltip.setMap(this.map_)
          this.map_.set('featureTooltip', featureTooltip)
        } else {
          this.map_.set('featureTooltip', undefined)
        }

        let showWMSFeatureInfo = this.map_.get('showWMSFeatureInfo')
        if (showWMSFeatureInfo) {
          showWMSFeatureInfo.setMap(null)
        }
        curConfig = getConfig(mapConfigCopy, 'showWMSFeatureInfo')
        if (curConfig) {
          showWMSFeatureInfo = new ShowWMSFeatureInfo(curConfig)
          showWMSFeatureInfo.setMap(this.map_)
          this.map_.set('showWMSFeatureInfo', showWMSFeatureInfo)
        } else {
          this.map_.set('showWMSFeatureInfo', undefined)
        }

        // //////////////////////////////////////////////////////////////////////////////////////// //
        //                                     UserExit (2/2)                                       //
        // //////////////////////////////////////////////////////////////////////////////////////// //
        if (this.map_.get('userActionTracking')) {
          let map = this.map_

          this.map_.on('moveend', function () {
            map.dispatchEvent({
              type: 'userActionTracking',
              action: 'move'
            })
          })

          this.map_.get('baseLayers').getLayers().forEach(function (layer) {
            layer.on('change:visible', function () {
              if (layer.getVisible()) { // only if changed to visible
                map.dispatchEvent({
                  type: 'userActionTracking',
                  action: 'baseLayerChange',
                  value: layer.get('title')
                })
              }
            })
          })

          this.map_.get('featureLayers').recursiveForEach(function (layer) {
            layer.on('change:visible', function () {
              if (layer.getVisible()) { // only if changed to visible
                map.dispatchEvent({
                  type: 'userActionTracking',
                  action: 'featureLayerChange',
                  valule: layer.get('title')
                })
              }
            })
          })

          if (this.map_.get('featurePopup')) {
            this.map_.get('featurePopup').on('change:visible', function () {
              if (this.getVisible()) { // only if changed to visible
                map.dispatchEvent({
                  type: 'userActionTracking',
                  action: 'popupOpen',
                  value: this.getFeature()
                })
              }
            })
          }

          for (let module of this.map_.getModules()) {
            module.enableUserActionTracking()
          }

          this.map_.getControls().forEach(function (control) {
            if (control instanceof PrintButton) {
              control.on('click', function () {
                map.dispatchEvent({
                  type: 'userActionTracking',
                  action: 'print'
                })
              })
            }

            if (control instanceof MeasurementButton) {
              if (control.getType() === 'LineString') {
                control.on('measurement', function () {
                  map.dispatchEvent({
                    type: 'userActionTracking',
                    action: 'measureLine'
                  })
                })
              } else if (control.getType() === 'Polygon') {
                control.on('measurement', function () {
                  map.dispatchEvent({
                    type: 'userActionTracking',
                    action: 'measureArea'
                  })
                })
              }
            }
          })
        }
        this.map_.set('ready:ui', true)
      }
    }).catch(function (reason) {
      Debug.error(reason)
    })
  }
}
