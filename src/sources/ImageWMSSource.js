import ol from 'openlayers'
import $ from 'jquery'
import {mixin} from '../utilities'

export class WMSFeatureInfoMixin {
  initialize (options) {
    this.featureInfo_ = options.featureInfo !== undefined
    if (this.featureInfo_) {
      this.featureInfoParams_ = options.featureInfo.params
      this.featureInfoCheckable_ = options.featureInfo.checkable
      this.featureInfoMutators_ = options.featureInfo.mutators
    }
  }

  getFeatureInfoMutators () {
    return this.featureInfoMutators_
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
        $.ajax({
          url: this.getGetFeatureInfoUrl(coordinate, resolution, projection, params),
          success: resolve,
          error: reject,
          dataType: 'text'
        })
      }
    })
  }
}

export const ImageWMSSource = mixin(ol.source.ImageWMS, WMSFeatureInfoMixin)

export const TileWMSSource = mixin(ol.source.TileWMS, WMSFeatureInfoMixin)
