import { createMapInternal } from 'guide4you/src/main'

import 'mustache-eval-loader?name=conf/[name].[ext]!build/client.commented.json'
import 'mustache-eval-loader?name=conf/[name].[ext]!guide4you/conf/dist/layers.commented.json'

import 'tojson-file-loader?name=files/[name]!files/l10n.json.js'

import {SearchModule} from 'src/SearchModule'
import {NominatimSearchConnector} from 'src/NominatimSearchConnector'

export function createMap (target, clientConf = './conf/client.commented.json',
                           layerConf = './conf/layers.commented.json') {
  return createMapInternal('#g4u-map', clientConf, layerConf, [
    new SearchModule({ connectors: { nominatim: NominatimSearchConnector } })
  ])
}

export * from 'guide4you/src/exports'
