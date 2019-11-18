import $ from 'jquery'
import WKT from 'ol/format/WKT'
import { get as getProj, transform, transformExtent } from 'ol/proj'
import BaseObject from 'ol/Object'
import { boundingExtent } from 'ol/extent'

import { cssClasses, keyCodes } from '../globals'
import { Debug } from '../Debug'
import { FeatureAPI } from './FeatureAPI'
import { GeometryAPI } from './GeometryAPI'
import { KMLAPI } from './KMLAPI'
import { MeasureAPI } from './MeasureAPI'
import { PlacesAPI } from './PlacesAPI'
import { PrintToScaleAPI } from './PrintToScaleAPI'

// NOTE:
// Access to a source factory would be nice

/**
 * @typedef {object} APIOptions
 * @property {StyleLike} [drawStyle='#drawStyle']
 */

export class API extends BaseObject {
  /**
   * @param {G4UMap} map
   * @param {object} options
   */
  constructor (map, options = {}) {
    super()

    /**
     * @type {boolean}
     * @private
     */
    this.featureManipulationActive_ = false

    this.extentPadding_ = options.extentPadding

    /**
     * @type {StyleLike}
     * @private
     */
    this.drawStyle_ = options.drawStyle || '#drawStyle'

    /**
     * @type {G4UMap}
     * @private
     */
    this.map_ = map

    this.map_.once('ready', () => {
      this.layerConfigurator_ = this.map_.get('configurator').layerConfigurator_
    })

    $(this.map_.getViewport()).on('keydown', this.onKeyDown_.bind(this))

    this.geometryAPI_ = new GeometryAPI(this, map)
    this.printToScaleAPI_ = new PrintToScaleAPI(this, map)
    this.featureAPI_ = new FeatureAPI(this, map)
    this.kmlAPI_ = new KMLAPI(this, map)
    this.measureAPI_ = new MeasureAPI(this, map)
    this.placesAPI_ = new PlacesAPI(this, map)

    this.setApiAccessObject()
  }

  cancelInteractions () {
    this.dispatchEvent('cancelInteractions')
  }

  getDrawStyle () {
    return this.drawStyle_
  }

  // printToScale: {
  //   showFrame: this.showPrintToScaleFrame.bind(this),
  //   getFrame: this.getPrintToScaleFrame.bind(this),
  //   hideFrame: this.hidePrintToScaleFrame.bind(this)
  // },

  setApiAccessObject () {
    const api = {
      cancelInteractions: this.cancelInteractions.bind(this),
      geometry: {
        draw: this.geometryAPI_.drawGeometry.bind(this.geometryAPI_),
        show: this.geometryAPI_.showGeometry.bind(this.geometryAPI_),
        hide: this.geometryAPI_.hideGeometry.bind(this.geometryAPI_),
        clear: this.geometryAPI_.clear.bind(this.geometryAPI_),
        extent: this.geometryAPI_.getExtent.bind(this.geometryAPI_)
      },
      printToScale: {
        showFrame: this.printToScaleAPI_.showFrame.bind(this.printToScaleAPI_),
        getFrame: this.printToScaleAPI_.getFrame.bind(this.printToScaleAPI_),
        hideFrame: this.printToScaleAPI_.hideFrame.bind(this.printToScaleAPI_)
      },
      feature: {
        // create: this.createFeature.bind(this),
        // show: this.showFeature.bind(this),
        // hide: this.hideFeature.bind(this)
        modify: this.featureAPI_.modifyFeature.bind(this.featureAPI_),
        select: this.featureAPI_.selectFeature.bind(this.featureAPI_),
        draw: this.featureAPI_.drawFeature.bind(this.featureAPI_)
      },
      kml: {
        add: this.kmlAPI_.add.bind(this.kmlAPI_),
        update: this.kmlAPI_.update.bind(this.kmlAPI_),
        remove: this.kmlAPI_.remove.bind(this.kmlAPI_)
      },
      places: {
        add: this.placesAPI_.addPlace.bind(this.placesAPI_),
        clear: this.placesAPI_.clear.bind(this.placesAPI_),
        openPopup: this.placesAPI_.openPopup.bind(this.placesAPI_),
        closePopup: this.placesAPI_.closePopup.bind(this.placesAPI_),
        hasPopup: this.placesAPI_.hasPopup.bind(this.placesAPI_),
        onPopup: this.placesAPI_.onPopup.bind(this.placesAPI_),
        extent: this.placesAPI_.getExtent.bind(this.placesAPI_),
        activate: this.placesAPI_.activate.bind(this.placesAPI_),
        deactivate: this.placesAPI_.deactivate.bind(this.placesAPI_),
        isActive: this.placesAPI_.isActive.bind(this.placesAPI_),
        style: this.placesAPI_.changeStyle.bind(this.placesAPI_),
        cluster: this.placesAPI_.activateClustering.bind(this.placesAPI_)
      },
      // 'userInteraction': {
      //   'get': {
      //     'position': function (callback, options) {
      //       options = options || {}
      //
      //       const savedCursorStyle = $(this.map_.getViewport()).css('cursor')
      //       $(this.map_.getViewport()).css('cursor', options.pointerStyle || 'pointer')
      //
      //       this.map_.once('singleclick', (e) => {
      //         $(this.map_.getViewport()).css('cursor', savedCursorStyle)
      //         var coordinate = e.coordinate
      //         if (options.projection) {
      //           coordinate = transform(
      //             coordinate,
      //             options.map.getView().getProjection(),
      //             options.projection
      //           )
      //         }
      //         callback(coordinate)
      //       })
      //     }
      //   }
      // },
      // 'layer': {
      //   'add': map.addLayer,
      //   'addFeature': function(layer, feature) {
      //     layer.getSource().addFeature(feature)
      //   },
      //   'base': {
      //     'add': api.addBaseLayer,
      //     'setVisible': api.setVisibleBaseLayer
      //   },
      //   'feature': {
      //     'add': api.addFeatureLayer
      //   },
      //   'fixedFeature': {
      //     'add': api.addFixedFeatureLayer
      //   },
      //   'loadFromServer': api.loadLayerFromServer,
      //   'remove': api.removeLayer,
      //   'removeFeature': function(layer, feature) {
      //     layer.getSource().removeFeature(feature)
      //   },
      //   'updateWms': api.updateWmsLayer
      // },
      view: {
        getExtent: this.transformResult(() => this.map_.getView().calculateExtent(), transformExtent),
        fitExtent: this.transformInput(input => this.map_.getView().fit(input, {
          padding: this.extentPadding_
        }), transformExtent),
        getCenter: this.transformResult(() => this.map_.getView().getCenter(), transform),
        setCenter: this.transformInput(input => this.map_.getView().setCenter(input), transform),
        getZoom: () => this.map_.getView().getZoom(),
        setZoom: input => this.map_.getView().setZoom(input)
      },
      move: {
        toExtent: this.moveToExtent.bind(this),
        toPoint: this.moveToPoint.bind(this)
      },
      transform: {
        coordinate: transform,
        extent: transformExtent,
        WKT: this.transformWKT.bind(this)
      },
      measure: {
        length: this.measureAPI_.getLength.bind(this.measureAPI_),
        area: this.measureAPI_.getArea.bind(this.measureAPI_),
        distance: this.measureAPI_.getDistance.bind(this.measureAPI_)
      },
      popupModifier: {
        register: (name, popupModifier) => this.map_.get('popupModifiers').register(name, popupModifier)
      },
      // 'style': {
      //   'collection': styling.styleCollection,
      //   'feature': styling.styleFeature,
      //   'layer': styling.styleLayer
      // },
      version: this.getVersion.bind(this)
    }

    this.map_.api = Object.assign(this.map_.api || {}, api)
  }

  getVersion () {
    return this.map_.get('guide4youVersion')
  }

  transformResult (func, transform) {
    return options => {
      let result = func()
      if (options && options.projection) {
        result = transform(result, this.map_.getView().getProjection(), options.projection)
      }
      return result
    }
  }

  transformInput (func, transform) {
    return (input, options = {}) => {
      if (options.projection) {
        input = transform(input, options.projection, this.map_.getView().getProjection())
      }
      return func(input)
    }
  }

  moveToExtent (extent, options = {}) {
    if (options.projection) {
      extent = transformExtent(extent, options.projection, this.map_.getView().getProjection())
    }
    if (!options.padding) {
      options.padding = this.extentPadding_
    }
    this.map_.get('move').toExtent(extent, options)
  }

  moveToPoint (coordinate, options = {}) {
    if (options.projection) {
      coordinate = transform(coordinate, options.projection, this.map_.getView().getProjection())
    }
    this.map_.get('move').toPoint(coordinate, options)
  }

  // zoomToExtent (extent, options) {
  //   if (options && options.projection) {
  //     extent = transformExtent(extent, options.projection, this.map_.getView().getProjection())
  //   }
  //   toPoint: this.zoomToPoint.bind(this)
  // }

  // //////////////  FEATURE MANIPULATION ////////////////

  endFeatureManipulationInternal_ () {
    if (this.featureManipulationInteraction_) {
      this.featureManipulationInteraction_.setActive(false)

      this.map_.removeInteraction(this.featureManipulationInteraction_)
    }

    $(this.map_.getViewport()).removeClass(cssClasses.crosshair)
    $(this.map_.getViewport()).removeClass(cssClasses.arrow)
    // and any other cursor changes

    this.featureManipulationActive_ = false

    this.dispatchEvent('endManipulation')
  }

  /**
   * cancel the current feature manipulation
   */
  cancelFeatureManipulation () {
    if (this.featureManipulationActive_) {
      this.endFeatureManipulationInternal_()
    }
  }

  fitRectangle (coordinates, opt = {}) {
    if (!opt.hasOwnProperty('projection')) {
      opt.projection = 'EPSG:4326'
    }
    if (!opt.hasOwnProperty('constrainResolution')) {
      opt.constrainResolution = false
    }
    if (!opt.hasOwnProperty('padding')) {
      opt.padding = [0, 0, 0, 0]
    }
    if (getProj(opt.projection)) {
      this.map_.getView().fit(
        boundingExtent(
          [
            transform(
              [parseFloat(coordinates[0][0]), parseFloat(coordinates[0][1])],
              opt.projection,
              this.map_.get('mapProjection').getCode()
            ),
            transform(
              [parseFloat(coordinates[1][0]), parseFloat(coordinates[1][1])],
              opt.projection,
              this.map_.get('mapProjection').getCode()
            )
          ]
        ),
        opt
      )
    } else {
      Debug.error(`Unknown Projection '${opt.projection}'`)
    }
  }

  setVisibleLayer (id) {
    this.map_.getLayerGroup().recursiveForEach((layer) => {
      if (layer.get('id') === id) {
        layer.setVisible(true)
      }
    })
  }

  onKeyDown_ (e) {
    if (this.featureManipulationActive_ && e.which === keyCodes.ESCAPE) {
      this.endFeatureManipulationInternal_()
    }
  }

  /**
   * This function creates a layer from the given layerOptions and adds it the map
   * @param {g4uLayerOptions} layerOptions
   * @param {boolean} [atBottom=false] specifies if layer is added at bottom or top
   * @returns {VectorLayer}
   */
  addLayer (layerOptions, atBottom = false) {
    const layer = this.layerConfigurator_.getFactory().createLayer(layerOptions)
    if (!atBottom) {
      this.map_.addLayer(layer)
    } else {
      this.map_.getLayers().insertAt(0, layer)
    }
  }

  /**
   * This function creates a layer from the given layerOptions, adds it as a VectorLayere and returns a promise which
   * is resolved as soon as the layer is loaded fully.
   * @param {g4uLayerOptions} layerOptions
   * @returns {Promise.<VectorLayer>}
   */
  loadLayerFromServer (layerOptions) {
    layerOptions = layerOptions || {}
    layerOptions.visible = true
    layerOptions.source = layerOptions.source || {}

    return new Promise((resolve, reject) => {
      let layer = this.addLayer(layerOptions)
      let source = layer.getSource()
      let loadEndHandler = () => {
        source.un('vectorloadend', loadErrorHandler)
        resolve(layer)
      }
      let loadErrorHandler = () => {
        source.un('vectorloaderror', loadEndHandler)
        reject(new Error('vector load error'))
      }
      source.once('vectorloadend', loadEndHandler)
      source.once('vectorloaderror', loadErrorHandler)
    })
  }

  /**
   * Creates a Feature from the given config
   * @param {FeatureConfig} config
   * @returns {ol.Feature}
   */
  createFeature (config) {
    return this.layerConfigurator_.getFactory().createFeature(config)
  }

  /**
   * Removes a layer from the map
   * @param {ol.layer.Base} layer
   */
  removeLayer (layer) {
    this.map_.getLayerGroup().removeLayer(layer)
  }

  /**
   * Updates the layers parameter of a WMS Layer
   * @param {string|number} layerId
   * @param {string[]} layers
   */
  updateWmsLayer (layerId, layers) {
    this.map_.getLayerGroup().recursiveForEach(layer => {
      if (layer.get('id') === layerId) {
        layer.getSource().updateParams({
          LAYERS: layers
        })
      }
    })
  }

  /**
   * Transforms WKT from one projection to another
   */
  transformWKT (wkt, fromProj, toProj) {
    const wktParser = new WKT()
    return wktParser.writeGeometry(wktParser.readGeometry(wkt).transform(fromProj, toProj))
  }
}
