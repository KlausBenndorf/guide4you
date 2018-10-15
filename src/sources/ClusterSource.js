import ol from 'ol'
import { Debug } from '../Debug'

export class ClusterSource extends ol.source.Cluster {
  /**
   * @param {ol.source.Vector} source
   * @param {olx.} options
   */
  constructor (source, options) {
    options.source = source
    options.geometryFunction = options.geometryFunction || ClusterSource.defaultGeometryFunction
    super(options)
  }

  static defaultGeometryFunction (feature) {
    let geom = feature.getGeometry()
    if (geom instanceof ol.geom.Point) {
      return geom
    } else if (geom instanceof ol.geom.LineString) {
      return new ol.geom.Point(ol.extent.getCenter(geom.getExtent()))
    } else if (geom instanceof ol.geom.Polygon) {
      return new ol.geom.Point(ol.extent.getCenter(geom.getExtent()))
    } else if (geom instanceof ol.geom.Circle) {
      return new ol.Point(geom.getCenter())
    } else {
      Debug.warn('Trying to cluster unsupported geometry type.')
      return null
    }
  }
}
