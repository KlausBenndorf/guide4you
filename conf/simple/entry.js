import {createMapInternal} from '../../src/main'

import defaultClientConf from 'file-loader?name=conf/[name].[ext]!mustache-loader!./client.commented.json'
import defaultLayerConf from 'file-loader?name=conf/[name].[ext]!mustache-loader!./layers.commented.json'

import 'tojson-file-loader?name=files/[name]!../../files/l10n.json.js'

import 'file-loader?name=files/[name].[ext]!../../files/hotelsbonn.kml'
import 'file-loader?name=files/[name].[ext]!../../files/restaurantsbonn.kml'

export function createMap (target, clientConf = defaultClientConf, layerConf = defaultLayerConf) {
  return createMapInternal(target, clientConf, layerConf)
}

export * from '../../src/exports'
