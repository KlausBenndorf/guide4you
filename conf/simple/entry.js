import { createG4UInternal } from '../../src/main'

import defaultClientConf from 'mustache-eval-loader?name=conf/[name].[ext]!./client.commented.json'
import defaultLayerConf from 'mustache-eval-loader?name=conf/[name].[ext]!./layers.commented.json'

import 'tojson-file-loader?name=files/[name]!../../files/l10n.json.js'

import 'file-loader?name=files/[name].[ext]!../../files/hotelsbonn.kml'
import 'file-loader?name=files/[name].[ext]!../../files/restaurantsbonn.kml'

export function createMap (target, clientConf = defaultClientConf, layerConf = defaultLayerConf) {
  return createG4UInternal(target, clientConf, layerConf)
}
