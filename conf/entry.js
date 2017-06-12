import { createMapInternal } from 'guide4you/src/main'

import defaultClientConf from 'mustache-eval-loader?name=conf/[name].[ext]!guide4you/conf/simple/client.commented.json'
import defaultLayerConf from 'mustache-eval-loader?name=conf/[name].[ext]!guide4you/conf/simple/layers.commented.json'

import 'tojson-file-loader?name=files/[name]!files/l10n.json.js'
import 'tojson-file-loader?name=files/[name]!files/helptext.json.js'
import 'file-loader?name=images/doc/[name].[ext]!guide4you/images/doc/attribution-collapsed.png'
import 'file-loader?name=images/doc/[name].[ext]!guide4you/images/doc/attribution-expanded-de.png'
import 'file-loader?name=images/doc/[name].[ext]!guide4you/images/doc/attribution-expanded-en.png'
import 'file-loader?name=images/doc/[name].[ext]!guide4you/images/doc/button-documentation.png'
import 'file-loader?name=images/doc/[name].[ext]!guide4you-module-search/images/doc/search-inactive-de.png'
import 'file-loader?name=images/doc/[name].[ext]!guide4you-module-search/images/doc/search-inactive-en.png'
import 'file-loader?name=images/doc/[name].[ext]!guide4you-module-search/images/doc/search-active.png'
import 'file-loader?name=images/doc/[name].[ext]!guide4you/images/doc/zoom.png'

import 'mustache-eval-loader?name=proxy/[name].[ext]!guide4you-proxy/proxy.php'
import 'file-loader?name=proxy/AjaxProxy.[ext]!guide4you-proxy/LICENSE.txt'

import {SearchModule} from 'guide4you-module-search/src/SearchModule'
import {G4USearchV2Connector} from '../src/G4USearchV2Connector'

export function createMap (target, clientConf = defaultClientConf, layerConf = defaultLayerConf) {
  return createMapInternal(target, clientConf, layerConf, [
    new SearchModule({ connectors: { G4USearchV2: G4USearchV2Connector }})
  ])
}

export * from 'guide4you/src/exports'
