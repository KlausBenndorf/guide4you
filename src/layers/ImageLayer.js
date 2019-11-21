import OlImageLayer from 'ol/layer/Image'

import { LayerLoadProcessCountMixin } from './LayerLoadProcessCountMixin'
import { BaseLayerMixin } from './BaseLayerMixin'
import { mixin } from '../utilities'
import { ProvideMapMixin } from './ProvideMapMixin'

export const ImageLayer = mixin(OlImageLayer, [ProvideMapMixin, LayerLoadProcessCountMixin])

export const BaseLayerImage = mixin(ImageLayer, BaseLayerMixin)
