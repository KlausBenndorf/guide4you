import $ from 'jquery'
import ol from 'openlayers'

import { get as getProj, transformExtent } from 'ol/proj'
import { Debug } from '../Debug'
import { take } from '../utilitiesObject'

/**
 * Please note that a 'BBOX' or 'Tile'
 * @typedef {module:ol/source/Vector~Options} ArcGISRESTFeatureSourceOptions
 * @property {object} [params] the params to be passed to the ArcGIS REST Feature Service. The params f, returnGeometry,
 *    geometry, geometryType, inSR and outSr can not be set as they are filled automatically. The SR parameters will
 *    be set to the projection of the source. geometry and geometryType will always be an 'esriGeometryEnvelope'. f will
 *    be json and returnGeometry true.
 *    The parameters spatialRel and outFields can be altered and default to 'esriSpatialRelIntersects' and '*'.
 * @property {string} [dataType=json] can be json or jsonp
 */

export class ArcGISRESTFeatureSource extends ol.source.Vector {
  constructor (options) {
    const url = take(options, 'url')
    const params = take(options, 'params')
    // const geometrySR = take(options, 'geometrySR')

    options.loader = (...args) => this.loader(...args)

    super(options)

    this.url_ = url
    this.params_ = params || {}
    this.projection_ = options.projection ? ol.proj.get(options.projection) : undefined
    this.format_ = new ol.format.EsriJSON()
    this.dataType_ = options.dataType || 'json'
  }

  /**
   * @param {module:ol/extent~Extent} extent
   * @param {number} resolution
   * @param {module:ol/proj/Projection} projection
   */
  loader (extent, resolution, projection) {
    let sr
    if (this.projection_) {
      extent = ol.proj.transformExtent(extent, projection, this.projection_)
      sr = parseInt(this.projection_.getCode().split(':')[1])
    }

    const geometry = {
      xmin: extent[0],
      ymin: extent[1],
      xmax: extent[2],
      ymax: extent[3]
    }
    if (this.projection_) {
      geometry.spatialReference = {
        wkid: sr
      }
    }

    const params = Object.assign({
      spatialRel: 'esriSpatialRelIntersects',
      outFields: '*'
    }, this.params_, {
      f: 'json',
      returnGeometry: 'true',
      geometry: JSON.stringify(geometry),
      geometryType: 'esriGeometryEnvelope'
    })

    if (this.projection_) {
      params.inSR = sr
      params.outSR = sr
    }

    const url = this.url_.clone()
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        url.addParam(`${key}=${params[key]}`)
      }
    }

    $.ajax({
      url: url.finalize(),
      dataType: this.dataType_,
      success: response => {
        if (response.error) {
          Debug.error(response.error.message + '\n' +
            response.error.details.join('\n'))
        } else {
          // dataProjection will be read from document
          var features = this.format_.readFeatures(response, {
            dataProjection: this.projection_,
            featureProjection: projection
          })
          if (features.length > 0) {
            this.addFeatures(features)
          }
        }
      }
    })
  }
}
