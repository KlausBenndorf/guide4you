import ImageCanvas from 'ol/source/ImageCanvas'

import { ImageLayer } from './ImageLayer'

export class EmptyImageLayer extends ImageLayer {
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
