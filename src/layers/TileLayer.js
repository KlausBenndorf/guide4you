import ol from 'openlayers'

import {LayerLoadProcessCountMixin} from './LayerLoadProcessCountMixin'
import { mixin } from '../utilities'
import {ProvideMapMixin} from './ProvideMapMixin'

export const TileLayer =
  mixin(mixin(ol.layer.Tile, ProvideMapMixin), LayerLoadProcessCountMixin)
