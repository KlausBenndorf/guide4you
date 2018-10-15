import ol from 'ol'
import $ from 'jquery'

import { asyncImageLoad, mixin } from '../utilities'
import { Debug } from '../Debug'

/**
 * @typedef {object} WMSFeatureInfoOptions
 * @property {object.<string, string>} [params] the params to be used with the GetFeatureInfo call.
 *    Needs to include INFO_FORMAT.
 *    If the layer does not use the buttons options than needs to include QUERY_LAYERS.
 * @property {boolean} [checkable=false] If the layer does not use the buttons options, this options specifies if an
 *    extra button on the layer button appears to toggle the feature info.
 * @property {boolean} [checked=true] If the layer does not use the buttons options and checkable is true, this option
 *    specifies if the feature info button appears activated or not.
 */

export class WMSFeatureInfoMixin {
  /**
   * @param {object} options
   * @param {WMSFeatureInfoOptions} options.featureInfo
   */
  initialize (options) {
    this.featureInfo_ = options.featureInfo !== undefined

    if (this.featureInfo_) {
      this.featureInfoParams_ = options.featureInfo.params || {}
      this.featureInfoCheckable_ = options.featureInfo.checkable
      this.featureInfoMutators_ = options.featureInfo.mutators
      this.featureInfoChecked_ = options.featureInfo.checked
    }
  }

  getFeatureInfoParams () {
    return this.featureInfoParams_
  }

  getQueryable () {
    return this.featureInfoParams_['QUERY_LAYERS'] && this.featureInfoParams_['QUERY_LAYERS'].length
  }

  getFeatureInfoMutators () {
    return this.featureInfoMutators_ || []
  }

  hasFeatureInfo () {
    return this.featureInfo_
  }

  isFeatureInfoCheckable () {
    return this.featureInfoCheckable_
  }

  isFeatureInfoChecked () {
    return this.featureInfoChecked_
  }

  updateFeatureInfoParams (newParams) {
    Object.assign(this.featureInfoParams_, newParams)
  }

  getFeatureInfo (coordinate, resolution, projection) {
    return new Promise((resolve, reject) => {
      let params = this.featureInfoParams_
      if (!params['QUERY_LAYERS'] || params['QUERY_LAYERS'].length === 0) {
        resolve('')
      } else {
        const gfiExt = this.getGetFeatureInfoUrl(coordinate, resolution, projection, params).slice(1)
        $.ajax({
          url: this.originalUrlObject.extend(gfiExt).finalize(),
          success: resolve,
          error: reject,
          dataType: 'text'
        })
      }
    })
  }

  toggleArrayEntries_ (obj, prop, names, toggle) {
    let arr = obj[prop] || []
    if (toggle) {
      // the call of toggleWMSLayers in TemplatePrintControl causes an polyfill error in
      // internet explorer / microsoft edge related to Symbol.iterator which is used for
      // the for-of loop
      names.forEach(name => {
        if (arr.indexOf(name) < 0) {
          arr.push(name)
        }
      })
      // for (let name of names) {
      //   if (arr.indexOf(name) < 0) {
      //     arr.push(name)
      //   }
      // }
    } else {
      for (let name of names) {
        let index = arr.indexOf(name)
        if (index >= 0) {
          arr.splice(index, 1)
        }
      }
    }
    obj[prop] = arr
    return obj
  }

  toggleWMSLayers (names, toggle) {
    this.updateParams(this.toggleArrayEntries_(this.getParams(), 'LAYERS', names, toggle))
  }

  toggleWMSQueryLayers (names, toggle) {
    this.updateFeatureInfoParams(this.toggleArrayEntries_(this.featureInfoParams_, 'QUERY_LAYERS', names, toggle))
  }

  arrayContainsAll (arr, contains) {
    return contains.every(needle => arr.indexOf(needle) >= 0)
  }

  getWMSLayersVisible (names) {
    return this.arrayContainsAll(this.getParams().LAYERS || [], names)
  }

  getWMSQueryLayersVisible (names) {
    return this.arrayContainsAll(this.featureInfoParams_.QUERY_LAYERS || [], names)
  }
}

/**
 * A wms source config.
 * @typedef {SourceConfig} WMSSSourceConfig
 * @property {object} params required. needs to contain a `LAYERS` parameter. For other
 *    parameters see: http://openlayers.org/en/latest/apidoc/ol.source.ImageWMS.html -> Constructor options -> params
 * @property {WMSFeatureInfoOptions} featureInfo
 */

export class ImageWMSSource extends mixin(ol.source.ImageWMS, WMSFeatureInfoMixin) {
  constructor (options) {
    const originalUrl = options.url
    options.url = '_' // dummy value that gets sliced out
    options.imageLoadFunction = (image, src) => {
      asyncImageLoad(image.getImage(), this.originalUrlObject.extend(src.slice(1)))
        .catch(err => Debug.error(err))
    }
    super(options)
    this.originalUrlObject = originalUrl
  }
}

export class TileWMSSource extends mixin(ol.source.TileWMS, WMSFeatureInfoMixin) {
  constructor (options) {
    const origUrl = options.url
    options.url = '_' // dummy value that gets sliced out
    options.tileLoadFunction = (tile, src) => {
      asyncImageLoad(tile.getImage(), this.originalUrlObject.extend(src.slice(1)))
        .catch(err => Debug.error(err))
    }
    super(options)
    this.originalUrlObject = origUrl
  }
}
