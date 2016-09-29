import ol from 'openlayers'

import {LayerTile} from './LayerTile'
import {BaseLayerMixin} from './BaseLayerMixin'
//import {LayerLoadProcessCountMixin} from './LayerLoadProcessCountMixin'
import { mixin } from '../utilities'
//import {ProvideMapMixin} from './ProvideMapMixin'

export const BaseLayerTile =
  //mixin(mixin(mixin(ol.layer.Tile, ProvideMapMixin), BaseLayerMixin), LayerLoadProcessCountMixin)
    mixin(LayerTile, BaseLayerMixin)
