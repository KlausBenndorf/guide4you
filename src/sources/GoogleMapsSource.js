import ol from 'openlayers'

import {URL} from '../URLHelper'

/**
 * @typedef {olx.source.TileImageOptionss} GoogleMapsSourceOptions
 * @property {string} apiKey
 * @property {string} mapType
 * @property {[number,number]} [tileSize=[512,512]]
 */

export class GoogleMapsTileSource extends ol.source.TileImage {
  /**
   * @param {GoogleMapsSourceOptions} options
   */
  constructor (options) {
    options.tileUrlFunction = (...args) => this.tileUrlFunction_(...args)
    options.tileGrid = ol.tilegrid.createXYZ({
      tileSize: options.tileSize || [512, 512]
    })

    super(options)

    this.apiKey_ = options.apiKey
    this.mapType_ = options.mapType
  }

  tileUrlFunction_ (tileCoord, pixelRatio, projection) {
    let zoom = tileCoord[0]
    let tileGrid = this.getTileGrid()
    let center = ol.proj.transform(ol.extent.getCenter(tileGrid.getTileCoordExtent(tileCoord)), projection, 'EPSG:4326')
    center = [Number(center[1]).toFixed(6), Number(center[0]).toFixed(6)]

    let url = new URL({
      url: 'https://maps.googleapis.com/maps/api/staticmap'
    })
      .addParam('key=' + this.apiKey_)
      .addParam('maptype=' + this.mapType_)
      .addParam('size=256x256')
      .addParam('center=' + center.join(','))
      .addParam('zoom=' + zoom)
      .addParam('format=png')
      .addParam('scale=' + ol.size.toSize(tileGrid.getTileSize(zoom))[0] / 256)

    return url.finalize()
  }
}
