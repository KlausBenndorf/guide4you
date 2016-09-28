import ol from 'openlayers'
import $ from 'jquery'
import proj4 from 'proj4/dist/proj4'

ol.proj.setProj4(proj4)

import {Styling} from '../Styling'
import {LayerConfigurator} from './LayerConfigurator'
import {UIConfigurator} from './UIConfigurator'

import { copyDeep } from '../utilitiesObject'
import { checkFor } from '../utilities'

import {API} from '../API'

import {Debug} from '../Debug'

/**
 * @typedef {Object} MapConfig
 * @property {Boolean} [userActionTracking]
 * @property {g4uViewOptions} view
 * @property {string} [interfaceProjection='EPSG:4326']
 * @property {string} [mapProjection] will be infered from map data if not set
 * @property {string} [measurementProjection] the projection measurements will calculated in
 * @property {string} [proxy] A proxy url. It should be an url with a {url} part where the proxied url is to be
 *    inserted.
 * @property {Object.<string,StyleObject>} [styleMap] the style objects which will be mapped to certain identifiers. It
 *    is recommended that identifiers start with a #. The {{StyleObject}} with the identifier '#defaultStyle' will be
 *    used as a default Style in the whole Software
 * @property {number} [scaleIcons] a default scaling for all used feature icons
 * @property {ProjectionConfig[]} [additionalProjections]
 * @property {Object} [api] API-Options
 * @property {string} [loadingStrategy='ALL'] global loading strategy. Can have the values 'BBOX' or 'ALL'.
 * @property {boolean} [ignoreLayerAvailability=false] if set all layers are added to the map, regardless of their
 *    available config option
 * @property {string} [cssFile] a cssFile to load and insert in the head dynamically.
 * @property {Color[]} [cssTemplate] if 3 colors are given, the colors used in the text of the loaded cssFile will be
 *    replaced by this colors. The colors in the cssFile need to be pure red, blue and green.
 * @property {MobileLayoutOptions} [mobileLayout]
 * @property {PositioningOptions} [positioning={}]
 * @property {KineticOptions|boolean} [kinetic] This influences the DragPan behaviour. If set to false no kinetic
 *    options are applied, if not set, the defaults are used.
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
 * @typedef {Object} LayerConfig
 * @property {Object[]} baseLayers
 * @property {Object[]} featureLayers
 * @property {Object[]} fixedFeatureLayers
 * @property {Object[]} queryLayers
 */

/**
 * @typedef {object} MobileLayoutOptions
 * @property {string[]} mediaQueries these will enable the mobile layout including removing the g4u-desktop class from
 *    the ol-viewport and adding the g4u-mobile class
 * @property {number} [scaleIcons=1] a value to scale all icons by
 * @property {boolean} [animations=true] if animations should be disabled
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

    this.map_.set('userActionTracking', mapConfigCopy.userActionTracking)

    let interfaceProjection = mapConfigCopy.hasOwnProperty('interfaceProjection')
      ? mapConfigCopy.interfaceProjection
      : 'EPSG:4326'

    this.map_.set('interfaceProjection', interfaceProjection)

    this.map_.set('proxy', (mapConfigCopy.hasOwnProperty('proxy')) ? mapConfigCopy.proxy : false)

    // //////////////////////////////////////////////////////////////////////////////////////// //
    //                                       Styling                                            //
    // //////////////////////////////////////////////////////////////////////////////////////// //

    // has to be done before configureLayers ... -> promise?

    if (mapConfigCopy.hasOwnProperty('styleMap')) {
      this.map_.set('styling', new Styling({ styleConfigMap: mapConfigCopy.styleMap }))
    } else {
      this.map_.set('styling', new Styling())
    }

    this.map_.set('scaleIcons', (mapConfigCopy.hasOwnProperty('scaleIcons')) ? mapConfigCopy.scaleIcons : undefined)
    this.map_.get('styling').setGlobalIconScale(this.map_.get('scaleIcons'))

    // //////////////////////////////////////////////////////////////////////////////////////// //
    //                                      Projections                                         //
    // //////////////////////////////////////////////////////////////////////////////////////// //

    let additionalProjectionsConf = mapConfigCopy.hasOwnProperty('additionalProjections')
      ? mapConfigCopy.additionalProjections
      : []

    for (let i = 0, ii = additionalProjectionsConf.length; i < ii; i++) {
      proj4.defs(additionalProjectionsConf[i].code, additionalProjectionsConf[i].definition)
    }

    if (checkFor(mapConfigCopy, 'measurementProjection')) {
      try {
        this.map_.set('measurementProjection', ol.proj.get(mapConfigCopy.measurementProjection))
      } catch (e) {
        throw new Error('measurementProjection is not available, check for spelling or try to add it to' +
          ' additionalProjections with a proj4 definition.')
      }
    }

    this.configureLayers()

    let mapProjection = this.map_.get('mapProjection') // mapProjection is determined by the baseLayers

    // //////////////////////////////////////////////////////////////////////////////////////// //
    //                                    Creating View                                         //
    // //////////////////////////////////////////////////////////////////////////////////////// //

    /**
     * @type {g4uViewOptions}
     */
    let viewOptions = mapConfigCopy.view || {}

    viewOptions.projection = mapProjection

    if (checkFor(mapConfigCopy.view, 'center')) {
      viewOptions.center = ol.proj.transform(mapConfigCopy.view.center, interfaceProjection, mapProjection)
    }

    if (checkFor(mapConfigCopy.view, 'extent')) {
      viewOptions.extent = ol.extent.applyTransform(
        mapConfigCopy.view.extent,
        ol.proj.getTransform(interfaceProjection, mapProjection)
      )
    }

    let oldView = this.map_.getView()
    if (oldView) {
      viewOptions.center = oldView.getCenter() || mapConfigCopy.view.center
      viewOptions.resolution = oldView.getResolution() || mapConfigCopy.view.resolution
      viewOptions.rotation = oldView.getRotation() || mapConfigCopy.view.rotation
    }

    // creating the view
    let view = new ol.View(viewOptions)

    // setting the extent overwrites any settings about zoom and start coordinates
    if (!oldView && checkFor(mapConfigCopy.view, 'fit')) {
      view.fit(ol.proj.transformExtent(mapConfigCopy.view.fit, interfaceProjection, mapProjection), this.map_.getSize())
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
