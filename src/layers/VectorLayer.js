import OlVectorLayer from 'ol/layer/Vector'
import OlVectorImageLayer from 'ol/layer/VectorImage'

import { LayerLoadProcessCountMixin } from './LayerLoadProcessCountMixin'
import { mixin } from '../utilities'
import { ProvideMapMixin } from './ProvideMapMixin'

class UpdateRefreshingMixin {
  initialize (options = {}) {
    this.on('change:visible', () => {
      if (this.getSource().setRefreshing) {
        this.getSource().setRefreshing(this.getVisible())
      }
    })

    // saving text mutators
    this.set('mutators', options.mutators || [])
  }
}

/**
 * @typedef {object} VectorLayerOptions
 * @property {string[]} [mutators=[]] list of mutators (changes featurepopup content) to use for this layer.
 */

export class VectorLayer extends
  mixin(OlVectorLayer, [ProvideMapMixin, LayerLoadProcessCountMixin, UpdateRefreshingMixin]) { }

export class VectorImageLayer extends
  mixin(OlVectorImageLayer, [ProvideMapMixin, LayerLoadProcessCountMixin, UpdateRefreshingMixin]) { }
