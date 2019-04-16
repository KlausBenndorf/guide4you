import ol from 'openlayers'

import { LayerLoadProcessCountMixin } from './LayerLoadProcessCountMixin'
import { BaseLayerMixin } from './BaseLayerMixin'
import { mixin } from '../utilities'
import { ProvideMapMixin } from './ProvideMapMixin'

export const ImageLayer = mixin(ol.layer.Image, [ProvideMapMixin, LayerLoadProcessCountMixin])

export const BaseLayerImage = mixin(ImageLayer, BaseLayerMixin)
