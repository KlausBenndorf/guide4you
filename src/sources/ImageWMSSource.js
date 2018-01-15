import ol from 'openlayers'
import $ from 'jquery'

import { asyncImageLoad, mixin } from '../utilities'
import { Debug } from '../Debug'

export class WMSFeatureInfoMixin {
  initialize (options) {
    this.featureInfo_ = options.featureInfo !== undefined

    if (this.featureInfo_) {
      if (options.featureInfoProxy !== undefined) {
        this.switchedUrl = options.originalUrl.clone()
        this.switchedUrl.proxy = options.featureInfo.proxy
      }
      this.featureInfoParams_ = options.featureInfo.params || {}
      this.featureInfoCheckable_ = options.featureInfo.checkable
      this.featureInfoMutators_ = options.featureInfo.mutators
    }
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

  updateFeatureInfoParams (newParams) {
    Object.assign(this.featureInfoParams_, newParams)
  }

  getFeatureInfo (coordinate, resolution, projection) {
    return new Promise((resolve, reject) => {
      let params = this.featureInfoParams_
      if (!params['QUERY_LAYERS'] || params['QUERY_LAYERS'].length === 0) {
        resolve('')
      } else {
        let normalUrls
        if (this.switchedUrl) {
          normalUrls = this.getUrls()
          this.setUrl(this.switchedUrl.finalize())
        }
        $.ajax({
          url: this.getGetFeatureInfoUrl(coordinate, resolution, projection, params),
          success: resolve,
          error: reject,
          dataType: 'text'
        })
        if (this.switchedUrl) {
          this.setUrls(normalUrls)
        }
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

export class ImageWMSSource extends mixin(ol.source.ImageWMS, WMSFeatureInfoMixin) {
  constructor (options) {
    options.originalUrl = options.url
    options.url = options.url.finalize()
    options.imageLoadFunction = (image, src) => {
      asyncImageLoad(image.getImage(), options.originalUrl, src)
        .catch(err => Debug.error(err))
    }
    super(options)
  }
}

export class TileWMSSource extends mixin(ol.source.TileWMS, WMSFeatureInfoMixin) {
  constructor (options) {
    options.originalUrl = options.url
    options.url = options.url.finalize()
    options.tileLoadFunction = (tile, src) => {
      asyncImageLoad(tile.getImage(), options.originalUrl, src)
        .catch(err => Debug.error(err))
    }
    super(options)
  }
}
