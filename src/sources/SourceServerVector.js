import ol from 'ol'
import $ from 'jquery'

import { copy, take } from '../utilitiesObject'
import { Debug } from '../Debug'

/**
 * @typedef {olx.source.VectorOptions} SourceServerVectorOptions
 * @property {string} type the format to use
 * @property {URLLike} url
 * @property {StyleLike} [defaultStyle] a default style to fallback to
 * @property {boolean} [extractStyles=true] if styles should get extracted from the KML
 * @property {string} [loadingStrategy='ALL'] Either 'BBOX' or 'ALL' (Synonym: 'FIXED').
 *    If BBOX the given url has to contain the parameters {bboxleft}, {bboxbottom}, {bboxright}, {bboxtop}.
 * @property {number} [bboxRatio=1] If set the bbox loading strategy will increase the load extent by this factor
 * @property {ol.ProjectionLike} [bboxProjection] coordinates will be inserted into the url in this format. defaults to
 *    the interfaceProjection
 * @property {boolean} [cache=] true, false for dataType 'script' and 'jsonp'
 * @property {number} [refresh] if set the layer will refresh itself in the specified time (in ms)
 * @property {L10N} localiser
 * @property {boolean} localised
 * @property {Styling} styling
 */

/**
 * A custom Source class handling Vector Sources.
 *
 * Let you set the loading loadingStrategy, if a proxy is used and you should specify in which format it comes in.
 *
 * **IMPORTANT:** You can't set the projection of the source! This is **always** determined by the data received. If you
 * set projection here you force the source to assume that this is the projection of the view.
 *
 * This class defines a custom loader function which makes it possible to use different loading strategies.
 */
export class SourceServerVector extends ol.source.Vector {
  /**
   * @param {SourceServerVectorOptions} [options={}]
   */
  constructor (options = {}) {
    const parentOptions = copy(options)

    let urlTemplate = take(options, 'url')

    const type = take(options, 'type') || ''

    parentOptions.loader = (...args) => this.loader(...args)

    const loadingStrategy = options.loadingStrategy || 'ALL'

    if (loadingStrategy === 'BBOX') {
      let bboxRatio = options.bboxRatio || 1

      if (bboxRatio < 1) {
        throw new Error('The bboxRatio should not be smaller than 1')
      }

      let lastScaledExtent = [0, 0, 0, 0]

      parentOptions.strategy = (extent) => {
        if (ol.extent.containsExtent(lastScaledExtent, extent)) {
          return [extent]
        } else {
          let deltaX = ((extent[2] - extent[0]) / 2) * (bboxRatio - 1)
          let deltaY = ((extent[3] - extent[1]) / 2) * (bboxRatio - 1)

          lastScaledExtent = [
            extent[0] - deltaX,
            extent[1] - deltaY,
            extent[2] + deltaX,
            extent[3] + deltaY
          ]

          return [lastScaledExtent]
        }
      }
    } else {
      parentOptions.strategy = ol.loadingstrategy.all
    }

    super(parentOptions)

    /**
     * @type {L10N}
     * @private
     */
    this.localiser_ = options.localiser

    this.localised_ = options.localised || false

    /**
     * @type {string}
     * @private
     */
    this.loadingStrategy_ = loadingStrategy

    /**
     * @type {URL}
     * @protected
     */
    this.urlTemplate = urlTemplate

    /**
     * @type {string}
     * @private
     */
    this.type_ = type

    let formatOptions = {}

    if (options.hasOwnProperty('defaultStyle')) {
      formatOptions.defaultStyle = options.defaultStyle
    }

    if (options.hasOwnProperty('extractStyles')) {
      formatOptions.extractStyles = options.extractStyles
    }

    switch (this.type_) {
      case 'KML':
        formatOptions.showPointNames = false
        this.format_ = new ol.format.KML(formatOptions)
        this.dataType_ = 'text xml' // for $.ajax (GET-request)
        break
      case 'GeoJSON':
        this.format_ = new ol.format.GeoJSON(formatOptions)
        this.dataType_ = 'text json' // for $.ajax (GET-request)
        break
      default:
        throw new Error(`${this.type_} is not supported by SourceServerVector!`)
    }

    /**
     * @type {number}
     * @private
     */
    this.refresh_ = 0

    if (options.hasOwnProperty('refresh')) {
      this.setRefresh(options.refresh)
    }

    this.refreshTimeoutId_ = null

    /**
     * indicates if the source needs to be emptied
     * @type {boolean}
     * @private
     */
    this.doClear_ = false

    /**
     * @type {ol.ProjectionLike}
     * @private
     */
    this.bboxProjection_ = options.bboxProjection
  }

  /**
   * This method returns a promise which is triggered after the loader successfully loaded a source.
   * @param {ol.Extent} extent
   * @param {number} resolution
   * @param {ol.ProjectionLike} projection
   */
  loader (extent, resolution, projection) {
    // Problem with BBOX: if features are already in the layer, they shouldn't be added. Not trivial

    let url = this.urlTemplate.clone()

    if (this.loadingStrategy_ === 'BBOX') {
      let transformedExtent = ol.proj.transformExtent(extent, projection, this.bboxProjection_)

      url.expandTemplate('bboxleft', transformedExtent[0].toString())
        .expandTemplate('bboxbottom', transformedExtent[1].toString())
        .expandTemplate('bboxright', transformedExtent[2].toString())
        .expandTemplate('bboxtop', transformedExtent[3].toString())
        .expandTemplate('resolution', resolution.toString(), false)
    }

    if (this.refresh_) {
      if (this.refreshTimeoutId_) {
        clearTimeout(this.refreshTimeoutId_)
      }
      this.refreshTimeoutId_ = setTimeout(() => {
        this.doClear_ = true // clears the source
        this.loader(extent, resolution, projection) // calls the loader recursively
      }, this.refresh_)
    }

    if (this.localised_) {
      url.cache = false
    }

    let finalUrl = url.finalize()

    $.ajax({
      url: finalUrl,
      dataType: this.dataType_,
      beforeSend: () => this.dispatchEvent('vectorloadstart'),
      success: (response) => {
        // processing urls in the xml-Data (e.g. for images)
        if (url.useProxy && /xml$/.test(this.dataType_)) {
          response = this.addProxyToHrefTags(response)
        }

        if (this.doClear_) {
          this.clear(true)
          this.doClear_ = false
        }

        let features = this.format_.readFeatures(response, { featureProjection: projection })

        this.addFeatures(features)

        this.dispatchEvent('vectorloadend')
      },
      error: () => {
        Debug.error(`Getting Feature resource failed with url ${finalUrl}`)
        this.dispatchEvent('vectorloaderror')
      },
      headers: this.localiser_ ? {
        'Accept-Language': this.localiser_.getCurrentLang()
      } : {}
    })
  }

  /**
   * This sets the refresh rate. A value of 0 or smaller turns refresh off.
   * @param {number} refresh
   */
  setRefresh (refresh) {
    this.refresh_ = (refresh > 0) ? refresh : 0
  }

  /**
   * makes all urls in href-tags inside of a xmlDocument use the proxy address.
   * this function needs to extended with all Tags which could contain urls
   * @param {HTMLElement} text an xml-Document
   * @returns {HTMLElement} the xmlDocument
   */
  addProxyToHrefTags (text) {
    let hrefTags = text.getElementsByTagName('href') // not working in IE11

    let i, ii
    for (i = 0, ii = hrefTags.length; i < ii; i++) {
      if (hrefTags[i].textContent) {
        hrefTags[i].textContent = this.urlTemplate.useProxyFor(hrefTags[i].textContent.trim()).finalize()
      } else if (hrefTags[i].innerHTML) {
        hrefTags[i].innerHTML = this.urlTemplate.useProxyFor(hrefTags[i].innerHTML.trim()).finalize()
      } else {
        throw new Error("Can't prepend proxy inside KML (textContent and innerHTML missing)")
      }
    }

    return text
  }

  /**
   * @returns {URL}
   */
  getUrlTemplate () {
    return this.urlTemplate
  }

  /**
   * @param {URL} urlTemplate
   */
  setUrlTemplate (urlTemplate) {
    this.urlTemplate = urlTemplate
  }
}
