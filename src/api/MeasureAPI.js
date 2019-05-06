import WKT from 'ol/format/WKT'
import LineString from 'ol/geom/LineString'
import Polygon from 'ol/geom/Polygon'
import { getArea, getDistance, getLength } from 'ol/sphere'

export class MeasureAPI {
  constructor (mainAPI, map) {
    this.mainAPI_ = mainAPI
    this.map_ = map

    this.wktParser_ = new WKT()
  }

  getLength (geom, options = {}) {
    if (options.format && options.format === 'array') {
      geom = new LineString(geom)
    } else {
      geom = this.wktParser_.readGeometryFromText(geom)
    }

    return getLength(geom, options)
  }

  getDistance (pointA, pointB, options = {}) {
    if (!options.format || options.format !== 'array') {
      pointA = this.wktParser_.readGeometryFromText(pointA).getFirstCoordinate()
      pointB = this.wktParser_.readGeometryFromText(pointB).getFirstCoordinate()
    }

    return getDistance(pointA, pointB, options)
  }

  getArea (geom, options) {
    if (options.format && options.format === 'array') {
      geom = new Polygon(geom)
    } else {
      geom = this.wktParser_.readGeometryFromText(geom)
    }

    return getArea(geom, options)
  }
}
