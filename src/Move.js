import ol from 'openlayers'

/**
 * @typedef {object} MoveOptions
 * @property {G4UMap} map
 * @property {number} [pixelPadding=0] a default padding around the target extent in pixels
 * @property {number} [meterMinSize=0] the minimal size of the target extent in meters
 * @property {number} [animationDuration=4000]
 * @property {boolean} [animations=true]
 * @property {boolean} [bouncing=false] if the animation should bounce or not
 */

/**
 * @typedef {olx.view.FitOptions} SingleMoveOptions
 * @property {boolean} [animated] if specified overwrites the default settings
 * @property {number[]|string} [padding] can be set to 'default' to use the default settings
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
    this.pixelPadding_ = (typeof options.meterMinSize != 'undefined') ? 50 : options.pixelPadding

    /**
     * @type {number}
     * @private
     */
    this.meterMinSize_ = (typeof options.meterMinSize != 'undefined') ? options.meterMinSize : 500

    /**
     * @type {number}
     * @private
     */
    this.animationDuration_ = options.animationDuration || 2000

    /**
     * @type {boolean}
     * @private
     */
    this.animations_ = options.hasOwnProperty('animations') ? options.animations : true

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
   * @param {ol.Coordinate} point
   * @param {SingleMoveOptions} [options={}]
   */
  toPoint (point, options = {}) {
    // calculate extent
    let tmpView = new ol.View({
      projection: this.map_.getView().getProjection(),
      center: point,
      resolution: this.map_.getView().getResolution()
    })
    let extent = tmpView.calculateExtent(this.map_.getSize())

    this.toExtent(extent, options)
  }

  /**
   * @param {ol.Extent} extent
   * @param {SingleMoveOptions} [options={}]
   */
  toExtent (extent, options = {}) {
    let newExtent = extent
    if (this.meterMinSize_) {
      newExtent = this.bufferUpToMinSize_(extent)
    }
    if (this.animations_ && options.animated) {
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
    this.toExtent(ol.extent.boundingExtent([point]), options)
  }

  /**
   * @param {ol.Extent} extent
   * @returns {ol.Extent}
   * @private
   */
  bufferUpToMinSize_ (extent) {
    let smallerSize = Math.min(ol.extent.getWidth(extent), ol.extent.getHeight(extent))
    if (smallerSize < this.meterMinSize_) {
      return ol.extent.buffer(extent, this.meterMinSize_ - smallerSize / 2)
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
    if (options.padding === 'default') {
      options.padding = [this.pixelPadding_, this.pixelPadding_, this.pixelPadding_, this.pixelPadding_]
    }

    options.constrainResolution = false

    // using fit's padding option
    let geometry = new ol.geom.MultiPoint([[extent[0], extent[1]], [extent[2], extent[3]]])
    this.map_.getView().fit(geometry, this.map_.getSize(), options)
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
    let startPoint = view.getCenter()

    let startResolution = view.getResolution()
    let moveExtent = ol.extent.extend(startExtent.slice(0), endExtent) // a extent where both extents are contained.
    let duration = ol.extent.intersects(startExtent, endExtent) ? this.animationDuration_ / 2 : this.animationDuration_

    if (this.bouncing_ && !ol.extent.intersects(startExtent, endExtent)) {
      let pan1 = ol.animation.pan({
        duration: duration,
        source: startPoint
      })

      let zoom1 = ol.animation.zoom({
        duration: duration,
        resolution: startResolution,
        easing: ol.easing.easeOut
      })

      map.beforeRender(pan1, zoom1)
      this.fit_(moveExtent, options)

      window.setTimeout(() => {
        let pan2 = ol.animation.pan({
          duration: duration,
          source: view.getCenter() // ,
        })

        let zoom2 = ol.animation.zoom({
          duration: duration,
          resolution: view.getResolution(),
          easing: ol.easing.easeIn
        })

        map.beforeRender(pan2, zoom2)

        this.fit_(endExtent, options)
      }, duration)
    } else {
      let pan = ol.animation.pan({
        duration: duration,
        source: startPoint
      })

      let zoom = ol.animation.zoom({
        duration: duration,
        resolution: startResolution
      })

      map.beforeRender(pan, zoom)

      this.fit_(endExtent, options)
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
