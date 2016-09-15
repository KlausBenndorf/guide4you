import ol from 'openlayers'
import $ from 'jquery'
import {copyDeep} from '../utilitiesObject'

export class ImageWMSSource extends ol.source.ImageWMS {
  constructor (options) {
    super(options)
    this.featureInfo_ = options.featureInfo !== undefined
    if (this.featureInfo_) {
      this.featureInfoParams_ = options.featureInfo.params
      this.featureInfoCheckable_ = options.featureInfo.checkable
    }
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
