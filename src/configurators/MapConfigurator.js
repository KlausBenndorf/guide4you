import $ from 'jquery'
import proj4 from 'proj4/dist/proj4'
import { register } from 'ol/proj/proj4'
import { getTransform, get as getProj, transform, transformExtent } from 'ol/proj'
import { applyTransform } from 'ol/extent'
import View from 'ol/View'

import { Styling } from '../Styling'
import { LayerConfigurator } from './LayerConfigurator'
import { UIConfigurator } from './UIConfigurator'
import { copyDeep } from '../utilitiesObject'
import { checkFor } from '../utilities'
import { API } from '../API'
import { Debug } from '../Debug'

/**
 * @typedef {Object} MapConfig
 * @property {string} [proxy] A proxy url. It should have an {url} string which will be replaced with the proxied url.
 *    Example: 'proxy.php?csurl={url}'.
 * @property {Boolean} [userActionTracking=false] if checked the map tracks certain user actions and
 *    fires 'userActionTracking' events that contain this information. Tracked actions are: move, layer activation,
 *    clicks on features, printing, measurements.
 * @property {L10NOptions} [languageSettings] settings regarding the display language.
 * @property {string} [interfaceProjection='EPSG:4326'] the projection the interface will use to interact with the
 *    user or the api.
 * @property {string} [mapProjection] the projection that is used internally. Will be infered from map data if not set.
 * @property {string} [measurementProjection] the projection measurements will calculated in.
 * @property {boolean} [enableContextMenu=false] enables the contextMenu outside of textinput fields
 * @property {g4uViewOptions} view View options.
 * @property {number} [scaleIcons] a default scaling for all used feature icons
 * @property {number} [hitTolerance=0] a default hit tolerance that will be used for all interactions
 *    (except show wms feature info).
 * @property {boolean} [manageStyles=true] set this to false to disable style managing. This disables scaleIcons,
 *    mobileScaleIcons, feature hiding and adjustable style opacity
 * @property {MobileLayoutOptions} [mobileLayout] special layout options for mobile use.
 * @property {ProjectionConfig[]} [additionalProjections] if any other projections than 'EPSG:4326' or 'EPSG:3857' are
 *    needed they can be specified here.
 * @property {APIOptions} [api] API-Options
 * @property {FeaturePopupOptions} [featurePopup] Options regarding the feature popup.
 * @property {FeatureTooltipOptions} [featureTooltip] Options regarding the feature tooltip.
 * @property {ShowWMSFeatureInfoOptions} [showWMSFeatureInfo] Options regarding WMS GetFeatureInfo.
 * @property {Object.<string, boolean>} [interactions] Specifies which map interactions should be turned on by default.
 *    Possible interactions are: 'doubleClickZoom', 'dragPan' (to which the {KineticOptions} are applied), 'dragRotate',
 *    'dragZoom', 'keyboardPan', 'keyboardZoom', 'mouseWheelZoom', 'pinchRotate', 'pinchZoom'
 * @property {KineticOptions|boolean} [kinetic] This influences the DragPan behaviour. If set to false no kinetic
 *    options are applied, if not set, the defaults are used.
 * @property {MoveOptions} [move] Options regarding the behaviour of movements on the maps.
 * @property {PositioningOptions} [positioning] Options regarding the positioning of the controls.
 * @property {string} [loadingStrategy='ALL'] Global default loading strategy. Can have the values 'BBOX' or 'ALL'.
 * @property {boolean} [ignoreLayerAvailability=false] If set all layers are added to the map, regardless of their
 *    available config option.
 * @property {string} [cssFile] a cssFile to load and insert in the head dynamically.
 * @property {Color[]} [cssTemplate] if 3 colors are given, the colors used in the text of the loaded cssFile will be
 *    replaced by this colors. The colors in the cssFile need to be pure red, blue and green.
 * @property {Object.<string, StyleObject>} [styleMap] the style objects which will be mapped to certain identifiers. It
 *    is recommended that identifiers start with a #. The {{StyleObject}} with the identifier '#defaultStyle' will be
 *    used as a default Style in the whole Software.
 * @property {ControlsConfig} controls
 */

/**
 * @typedef {object} KineticOptions
 * @property {number} [decay]
 * @property {number} [minVelocity]
 * @property {number} [delay]
 */

/**
 * @typedef {Object} ProjectionConfig
 * @property {string} code
 * @property {string} definition
 */

/**
 * @typedef {Object} g4uViewOptions
 * @property {ol.Coordinate} center the initial center of the map
 * @property {ol.Extent} [extent] the max extent the center can lay in
 * @property {number} [resolution]
 * @property {number} [zoom]
 * @property {number} [rotation]
 * @property {number} [fit] an extent to fit the map initialy to, overwrites center settings
 * @property {ol.ProjectionLike} [projection]
 */

/**
 * @typedef {object} MobileLayoutOptions
 * @property {string[]} mediaQueries these will enable the mobile layout including removing the g4u-desktop class from
 *    the ol-viewport and adding the g4u-mobile class
 * @property {number} [scaleIcons=1] a value to scale all icons by
 * @property {boolean} [animations=true] if animations should be disabled
 * @property {number} [hitTolerance]
 */

/**
 * This class configures a map once the configureMap method is called.
 * configureMap initializes the map and can only be called once.
 * it delegates the configureUI and configureLayers to the {{UIConfigurator}} and {{LayerConfigurator}} classes.
 */
export class MapConfigurator {
  /**
   * @param {G4UMap} map
   * @public
   */
  constructor (map) {
    /**
     * @type {G4UMap}
     * @private
     */
    this.map_ = map

    /**
     * @type {LayerConfigurator}
     * @private
     */
    this.layerConfigurator_ = new LayerConfigurator(map)

    /**
     * @type {UIConfigurator}
     * @private
     */
    this.UIConfigurator_ = new UIConfigurator(map)

    map.set('layerConfigurator', this.layerConfigurator_)
    map.set('UIConfigurator', this.UIConfigurator_)

    this.configureMap()

    /**
     * @type {boolean}
     * @private
     */
    this.firstRun_ = false
  }

  /**
   * Delegate call to {{LayerConfigurator}}
   * @public
   */
  configureLayers () {
    this.layerConfigurator_.configureLayers()
  }

  /**
   * Delegate call to {{UIConfigurator}}
   * @public
   */
  configureUI () {
    this.UIConfigurator_.configureUI()
  }

  /**
   * @public
   */
  configureMap () {
    if (this.firstRun_) {
      Debug.error('configureMap is supposed to be called only once')
      Debug.warn('If you would like to change that, please think about something because of the asynchronous nature' +
        ' of "ready", "ready:ui" and "ready:layers"')
      throw new Error()
    }

    /**
     * @type {MapConfig}
     */
    let mapConfigCopy = copyDeep(this.map_.get('mapConfig'))

    if (!mapConfigCopy.enableContextMenu) {
      $(this.map_.getTarget()).on('contextmenu', e => {
        if (!$(e.target).is('input[type=text]') && !$(e.target).is('textarea')) {
          e.preventDefault()
        }
      })
    }

    this.map_.set('userActionTracking', mapConfigCopy.userActionTracking)

    // //////////////////////////////////////////////////////////////////////////////////////// //
    //                                       Styling                                            //
    // //////////////////////////////////////////////////////////////////////////////////////// //

    // has to be done before configureLayers ... -> promise?

    let stylingOptions = {}

    if (mapConfigCopy.hasOwnProperty('manageStyles')) {
      stylingOptions.manageStyles = mapConfigCopy.manageStyles
    }

    if (mapConfigCopy.hasOwnProperty('styleMap')) {
      stylingOptions.styleConfigMap = mapConfigCopy.styleMap
    }

    let scaleIcons = mapConfigCopy.hasOwnProperty('scaleIcons') ? mapConfigCopy.scaleIcons : 1
    stylingOptions.scaleIcons = scaleIcons

    this.map_.set('scaleIcons', scaleIcons)
    this.map_.set('styling', new Styling(stylingOptions))

    // //////////////////////////////////////////////////////////////////////////////////////// //
    //                                      Projections                                         //
    // //////////////////////////////////////////////////////////////////////////////////////// //

    let additionalProjectionsConf = mapConfigCopy.hasOwnProperty('additionalProjections')
      ? mapConfigCopy.additionalProjections
      : []

    for (let i = 0, ii = additionalProjectionsConf.length; i < ii; i++) {
      proj4.defs(additionalProjectionsConf[i].code, additionalProjectionsConf[i].definition)
    }

    if (additionalProjectionsConf.length > 0) {
      register(proj4)
    }

    let mapProjection
    if (!mapConfigCopy.hasOwnProperty('mapProjection')) {
      Debug.warn('map should have set a `mapProjection`. Assuming default `EPSG:3857`.')
      mapProjection = getProj('EPSG:3857')
    } else {
      mapProjection = getProj(mapConfigCopy.mapProjection)
    }
    this.map_.set('mapProjection', mapProjection)

    let interfaceProjection = mapConfigCopy.hasOwnProperty('interfaceProjection')
      ? mapConfigCopy.interfaceProjection
      : 'EPSG:4326'

    this.map_.set('interfaceProjection', interfaceProjection)

    if (checkFor(mapConfigCopy, 'measurementProjection')) {
      try {
        this.map_.set('measurementProjection', getProj(mapConfigCopy.measurementProjection))
      } catch (e) {
        throw new Error('measurementProjection is not available, check for spelling or try to add it to' +
          ' additionalProjections with a proj4 definition.')
      }
    }

    this.configureLayers()

    // //////////////////////////////////////////////////////////////////////////////////////// //
    //                                    Creating View                                         //
    // //////////////////////////////////////////////////////////////////////////////////////// //

    /**
     * @type {g4uViewOptions}
     */
    let viewOptions = mapConfigCopy.view || {}

    viewOptions.projection = mapProjection

    if (checkFor(mapConfigCopy.view, 'center')) {
      viewOptions.center = transform(mapConfigCopy.view.center, interfaceProjection, mapProjection)
    }

    if (checkFor(mapConfigCopy.view, 'extent')) {
      viewOptions.extent = applyTransform(
        mapConfigCopy.view.extent,
        getTransform(interfaceProjection, mapProjection)
      )
    }

    let oldView = this.map_.getView()
    if (oldView) {
      viewOptions.center = oldView.getCenter() || mapConfigCopy.view.center
      viewOptions.resolution = oldView.getResolution() || mapConfigCopy.view.resolution
      viewOptions.rotation = oldView.getRotation() || mapConfigCopy.view.rotation
    }

    // creating the view
    let view = new View(viewOptions)

    // setting the extent overwrites any settings about zoom and start coordinates
    if (!oldView && checkFor(mapConfigCopy.view, 'fit')) {
      view.fit(transformExtent(mapConfigCopy.view.fit, interfaceProjection, mapProjection), {
        size: this.map_.getSize()
      })
    }

    // //////////////////////////////////////////////////////////////////////////////////////// //
    //                                   Setting View                                           //
    // //////////////////////////////////////////////////////////////////////////////////////// //

    this.map_.setView(view)

    // //////////////////////////////////////////////////////////////////////////////////////// //
    //                                       Resize                                             //
    // //////////////////////////////////////////////////////////////////////////////////////// //

    $(window).on('resize', () => { // NOTE: could get depricated with 'change:size'
      this.map_.dispatchEvent('resize')
    })

    // //////////////////////////////////////////////////////////////////////////////////////// //
    //                              Generic global handlers                                     //
    // //////////////////////////////////////////////////////////////////////////////////////// //

    let $viewport = $(this.map_.getViewport())

    // applying a mousedown class to the viewport if the mouse is down
    let mousedownClass = 'mousedown'
    $viewport.on('mousedown', () => {
      $viewport.addClass(mousedownClass)
    })
    $viewport.on('mouseup', () => {
      $viewport.removeClass(mousedownClass)
    })

    // Sets the Keyboardfocus on the Map
    $viewport.focus()

    // Let the keyboardfocus stay with the Map
    $viewport.on('click', () => {
      $viewport.focus()
    })

    // //////////////////////////////////////////////////////////////////////////////////////// //
    //                             UI (Interactions and Controls)                               //
    // //////////////////////////////////////////////////////////////////////////////////////// //

    Debug.tryOrThrow(() => {
      this.configureUI()
    })

    this.map_.set('api', new API(this.map_, mapConfigCopy.api))

    for (let module of this.map_.getModules()) {
      module.configureMap(mapConfigCopy)
    }
  }
}
