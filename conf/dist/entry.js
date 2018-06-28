import {createMapInternal} from '../../src/main'

import 'file-loader?name=conf/[name].[ext]!mustache-loader!../full/client.commented.json'
import 'file-loader?name=conf/[name].[ext]!./layers.commented.json'

import 'tojson-file-loader?name=files/[name]!../../files/l10n.json.js'

// exports

export function createMap (target, clientConf = './conf/client.commented.json',
                           layerConf = './conf/layers.commented.json', options) {
  return createMapInternal(target, clientConf, layerConf, options)
}

export * from '../../src/exports'
