import { createMapInternal } from 'guide4you/src/main'

import 'mustache-eval-loader?name=conf/[name].[ext]!conf/build/client.commented.json'
import 'mustache-eval-loader?name=conf/[name].[ext]!guide4you/conf/dist/layers.commented.json'

import 'tojson-file-loader?name=files/[name]!files/l10n.json.js'

import {URLAPIModule} from 'src/URLAPIModule'

export function createMap (target, clientConf = './conf/client.commented.json',
                           layerConf = './conf/layers.commented.json') {
  return createMapInternal(target, clientConf, layerConf, [new URLAPIModule()])
}

export * from 'guide4you/src/exports'
