import ol from 'ol'

import { LayerLoadProcessCountMixin } from './LayerLoadProcessCountMixin'
import { mixin } from '../utilities'
import { ProvideMapMixin } from './ProvideMapMixin'

/**
 * @typedef {object} VectorLayerOptions
 * @property {string[]} [mutators=[]] list of mutators (changes featurepopup content) to use for this layer.
 */

export class VectorLayer extends mixin(mixin(ol.layer.Vector, ProvideMapMixin), LayerLoadProcessCountMixin) {
  constructor (options = {}) {
    super(options)

    this.on('change:visible', () => {
      if (this.getSource().setRefreshing) {
        this.getSource().setRefreshing(this.getVisible())
      }
    })

    // saving text mutators
    this.set('mutators', options.mutators || [])
  }
}
