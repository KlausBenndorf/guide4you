import Tile from 'ol/layer/Tile'

import { LayerLoadProcessCountMixin } from './LayerLoadProcessCountMixin'
import { mixin } from '../utilities'
import { ProvideMapMixin } from './ProvideMapMixin'

export const TileLayer = mixin(Tile, [ProvideMapMixin, LayerLoadProcessCountMixin])
