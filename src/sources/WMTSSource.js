import WMTS from 'ol/source/WMTS'

import { asyncImageLoad } from '../utilities'
import { Debug } from '../Debug'

export class WMTSSource extends WMTS {
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
