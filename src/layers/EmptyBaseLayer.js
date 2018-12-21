import ImageCanvas from 'ol/source/ImageCanvas'

import { BaseLayerImage } from './ImageLayer'

export class EmptyBaseLayer extends BaseLayerImage {
  /**
   * @param {object} [options={}]
   */
  constructor (options = {}) {
    options.source = new ImageCanvas({
      state: 'ready',
      canvasFunction: () => {} // not loading any canvas
    })
    super(options)
  }
}
