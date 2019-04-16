import ol from 'openlayers'
import $ from 'jquery'

import { copy, take } from '../utilitiesObject'
import { Debug } from '../Debug'

/**
 * @typedef {module:ol/source/Vector~Options} SourceServerVectorOptions
 * @property {string} type the format to use
 * @property {URLLike} url
 * @property {module:ol/proj~ProjectionLike} [urlProjection] coordinates will be inserted into the url in this format.
 *    defaults to the sourceProjection
 * @property {StyleLike} [defaultStyle] a default style to fallback to
 * @property {boolean} [extractStyles=true] if styles should get extracted from the KML
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

    super(parentOptions)

    /**
     * @type {string}
     * @private
     */
    this.strategyType_ = options.loadingStrategyType

    /**
     * @type {L10N}
     * @private
     */
    this.localiser_ = options.localiser

    this.localised_ = options.localised || false

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

    let formatProjection
    switch (this.type_) {
      case 'KML':
        formatOptions.showPointNames = false
        this.format_ = new ol.format.KML(formatOptions)
        this.dataType_ = 'text xml' // for $.ajax (GET-request)
        formatProjection = 'EPSG:4326'
        break
      case 'GeoJSON':
        this.format_ = new ol.format.GeoJSON(formatOptions)
        this.dataType_ = 'text json' // for $.ajax (GET-request)
        formatProjection = 'EPSG:4326'
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
     * @type {module:ol/proj~ProjectionLike}
     * @private
     */
    this.urlProjection_ = options.urlProjection || formatProjection
  }

  /**
   * @param {module:ol/extent~Extent} extent
   * @param {number} resolution
   * @param {module:ol/proj~Projection} projection
   */
  loader (extent, resolution, projection) {
    let url = this.urlTemplate.clone()

    if (this.strategyType_ === 'BBOX' || this.strategyType_ === 'TILE') {
      let transformedExtent = ol.proj.transformExtent(extent, projection, this.urlProjection_)

      if (url.url.includes('{bbox')) {
        Debug.warn('The {bbox...} url parameters are deprecated, please use {minx}, {miny}, {maxx}, {maxy} instead.')
        url.url.replace(/{bboxleft}/g, '{minx}')
        url.url.replace(/{bboxbottom}/g, '{miny}')
        url.url.replace(/{bboxright}/g, '{maxx}')
        url.url.replace(/{bboxtop}/g, '{maxy}')
      }

      url.expandTemplate('minx', transformedExtent[0].toString())
        .expandTemplate('miny', transformedExtent[1].toString())
        .expandTemplate('maxx', transformedExtent[2].toString())
        .expandTemplate('maxy', transformedExtent[3].toString())
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
          this.clear()
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
        throw new Error('Can\'t prepend proxy inside KML (textContent and innerHTML missing)')
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
