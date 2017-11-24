import { createMapInternal } from 'guide4you/src/main'
import {registerModule} from 'guide4you/src/moduleRegistration'

import 'file-loader?name=conf/[name].[ext]!mustache-loader!conf/build/client.commented.json'
import 'file-loader?name=conf/[name].[ext]!mustache-loader!guide4you/conf/dist/layers.commented.json'

import 'tojson-file-loader?name=files/[name]!files/l10n.json.js'

import {URLAPIModule} from 'src/URLAPIModule'

registerModule(new URLAPIModule())

export function createMap (target, clientConf = './conf/client.commented.json',
                           layerConf = './conf/layers.commented.json', options) {
  return createMapInternal(target, clientConf, layerConf, options)
}

export * from 'guide4you/src/exports'
