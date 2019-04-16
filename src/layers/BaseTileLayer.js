import { TileLayer } from './TileLayer'
import { BaseLayerMixin } from './BaseLayerMixin'
import { mixin } from '../utilities'

export const BaseTileLayer = mixin(TileLayer, BaseLayerMixin)
