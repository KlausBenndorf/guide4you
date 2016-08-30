import BaseLayerMixin from './BaseLayerMixin'
import {ImageLayer} from './ImageLayer'

export class WMSLayer extends ImageLayer {
  constructor(options) {

  }
}

export class BaseWMSLayer extends (mixin(WMSLayer, BaseLayerMixin)) {
}
