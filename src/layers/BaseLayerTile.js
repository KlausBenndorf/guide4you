import {LayerTile} from './LayerTile'
import {BaseLayerMixin} from './BaseLayerMixin'
import { mixin } from '../utilities'

export const BaseLayerTile =
    mixin(LayerTile, BaseLayerMixin)
