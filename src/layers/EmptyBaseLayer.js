import ol from 'ol'

import {BaseLayerImage} from './ImageLayer'

export class EmptyBaseLayer extends BaseLayerImage {
  /**
   * @param {object} [options={}]
   */
  constructor (options = {}) {
    options.source = new ol.source.ImageCanvas({
      state: 'ready',
      canvasFunction: () => {} // not loading any canvas
    })
    super(options)
  }
}
