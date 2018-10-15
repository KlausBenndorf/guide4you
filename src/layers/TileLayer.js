import ol from 'ol'

import { LayerLoadProcessCountMixin } from './LayerLoadProcessCountMixin'
import { mixin } from '../utilities'
import { ProvideMapMixin } from './ProvideMapMixin'

export const TileLayer = mixin(ol.layer.Tile, [ ProvideMapMixin, LayerLoadProcessCountMixin ])
