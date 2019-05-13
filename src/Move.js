import { boundingExtent, buffer, extend, getHeight, getWidth, intersects } from 'ol/extent'
import { fromExtent } from 'ol/geom/Polygon'
import { transformExtent } from 'ol/proj'
import View from 'ol/View'

/**
 * @typedef {object} MoveOptions
 * @property {G4UMap} map
 * @property {number} [pixelPadding=50] a default padding around the target extent in pixels
 * @property {number} [meterMinSize=500] the minimal size of the target extent in meters
 * @property {number} [animationDuration=2000]
 * @property {boolean} [animations=true]
 * @property {boolean} [bouncing=false] if the animation should bounce or not
 */

/**
 * @typedef {FitOptions} SingleMoveOptions
 * @property {boolean} [animated] if specified overwrites the default settings
 * @property {number[]|string} [padding] if not set the default value (pixelPadding) is used
 * @property {number} [minSize] if not set the default value (meterMinSize) is used
 */

/**
 * Moves the map. Uses animations if desired.
 */
export class Move {
  /**
   * @param {MoveOptions} options
   */
  constructor (options) {
    /**
     * @type {G4UMap}
     * @private
     */
    this.map_ = options.map

    /**
     * @type {number}
     * @private
     */
    this.pixelPadding_ = options.pixelPadding !== undefined ? options.pixelPadding : 50

    /**
     * @type {number}
     * @private
     */
    this.meterMinSize_ = options.meterMinSize !== undefined ? options.meterMinSize : 500

    /**
     * @type {number}
     * @private
     */
    this.animationDuration_ = options.animationDuration || 2000

    /**
     * @type {boolean}
     * @private
     */
    this.animations_ = options.animations !== undefined ? options.animations : true

    /**
     * @type {boolean}
     * @private
     */
    this.bouncing_ = options.bouncing !== false
  }

  /**
   * Turns animations on or off
   * @param {boolean} animations
   */
  setAnimations (animations) {
    this.animations_ = animations
  }

  /**
   * @returns {boolean}
   */
  getAnimations () {
    return this.animations_
  }

  /**
   * @param {Coordinate} point
   * @param {SingleMoveOptions} [options={}]
   */
  toPoint (point, options = {}) {
    // calculate extent
    let tmpView = new View({
      projection: this.map_.getView().getProjection(),
      center: point,
      resolution: this.map_.getView().getResolution()
    })
    let extent = tmpView.calculateExtent(this.map_.getSize().map(s => s - 2))

    options.padding = [0, 0, 0, 0] // no padding around this extent

    this.toExtent(extent, options)
  }

  /**
   * @param {ol.Extent} extent
   * @param {SingleMoveOptions} [options={}]
   */
  toExtent (extent, options = {}) {
    let newExtent = extent
    const minSize = options.minSize !== undefined ? options.minSize : this.meterMinSize_
    if (minSize) {
      newExtent = this.bufferUpToMinSize_(extent, minSize)
    }
    if (options.padding === undefined) {
      options.padding = [this.pixelPadding_, this.pixelPadding_, this.pixelPadding_, this.pixelPadding_]
    }
    if (options.animated === undefined ? this.animations_ : options.animated) {
      this.animationZoomToExtent_(newExtent, options)
    } else {
      this.fit_(newExtent, options)
    }
  }

  /**
   * @param {ol.Point} point
   * @param {SingleMoveOptions} [options={}]
   */
  zoomToPoint (point, options = {}) {
    this.toExtent(boundingExtent([point]), options)
  }

  /**
   * @param {ol.Extent} extent
   * @param {number} minSize
   * @returns {ol.Extent}
   * @private
   */
  bufferUpToMinSize_ (extent, minSize) {
    // TODO: maybe use something more precise than transforming into 3857 to get meter size.
    let extentInMeters = transformExtent(extent, this.map_.getView().getProjection(), 'EPSG:3857')
    let smallerSize = Math.min(getWidth(extentInMeters), getHeight(extentInMeters))
    if (smallerSize < minSize) {
      extentInMeters = buffer(extentInMeters, minSize - smallerSize / 2)
      return transformExtent(extentInMeters, 'EPSG:3857', this.map_.getView().getProjection())
    } else {
      return extent
    }
  }

  /**
   * @param {ol.Extent} extent
   * @param {SingleMoveOptions} options
   * @private
   */
  fit_ (extent, options) {
    if (options.padding === undefined) {
      options.padding = [this.pixelPadding_, this.pixelPadding_, this.pixelPadding_, this.pixelPadding_]
    }

    // options.constrainResolution = false

    // using fit's padding option
    this.map_.getView().fit(fromExtent(extent), this.map_.getSize(), options)
  }

  /**
   * This function glides or bounces to an extent
   * @param {ol.Extent} endExtent
   * @param {SingleMoveOptions} options
   * @private
   */
  animationZoomToExtent_ (endExtent, options) {
    let map = this.map_
    let view = map.getView()
    let size = map.getSize()

    let startExtent = view.calculateExtent(size)

    let moveExtent = extend(startExtent.slice(0), endExtent) // a extent where both extents are contained.

    if (this.bouncing_ && !intersects(startExtent, endExtent)) {
      let moveOptions = Object.assign({
        duration: this.animationDuration_ / 2
      }, options)
      view.fit(moveExtent, moveOptions)
      setTimeout(() => {
        let endOptions = Object.assign({
          duration: this.animationDuration_ / 2
        }, options)
        view.fit(endExtent, endOptions)
      }, this.animationDuration_ / 2)
    } else {
      let endOptions = Object.assign({
        duration: this.animationDuration_ / 2
      }, options)
      view.fit(endExtent, endOptions)
    }
  }

  /**
   * Easing function based on a circle function
   * @param {number} t
   * @returns {number}
   * @private
   */
  earlyFastRiseEasing_ (t) {
    return Math.sqrt(2 * t - Math.pow(t, 2))
  }

  /**
   * Easing function based on a circle function
   * @param {number} t
   * @returns {number}
   * @private
   */
  lateFastRiseEasing_ (t) {
    return 1 - Math.sqrt(1 - Math.pow(t, 2))
  }

  /**
   * Easing function based on a parabolic function
   * @param {number} t
   * @returns {number}
   * @private
   */
  earlyFastRiseEasing2_ (t) {
    return -Math.pow((t - 1), 2) + 1
  }

  /**
   * Easing function based on a parabolic function
   * @param {number} t
   * @returns {number}
   * @private
   */
  lateFastRiseEasing2_ (t) {
    return Math.pow(t, 2)
  }
}
