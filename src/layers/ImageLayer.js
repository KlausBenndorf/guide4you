import OlImageLayer from 'ol/layer/Image'

import { LayerLoadProcessCountMixin } from './LayerLoadProcessCountMixin'
import { mixin } from '../utilities'
import { ProvideMapMixin } from './ProvideMapMixin'

export const ImageLayer = mixin(OlImageLayer, [ProvideMapMixin, LayerLoadProcessCountMixin])
