import 'file-loader?name=[name].[ext]!./g4u.d.ts'

import {createMapInternal} from '../../src/main'

import 'mustache-eval-loader?name=conf/[name].[ext]!../full/client.commented.json'
import 'file-loader?name=conf/[name].[ext]!./layers.commented.json'

import 'tojson-file-loader?name=files/[name]!../../files/l10n.json.js'

// exports

export function createMap (target, clientConf = './conf/client.commented.json',
                           layerConf = './conf/layers.commented.json') {
  return createMapInternal(target, clientConf, layerConf)
}

export * from '../../src/exports'
