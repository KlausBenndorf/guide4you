import { createG4UInternal } from 'guide4you/src/main'

import defaultClientConf from 'guide4you-builder/mustache-eval-loader?name=conf/[name].[ext]!./client.commented.json'
import defaultLayerConf from 'guide4you-builder/mustache-eval-loader?name=conf/[name].[ext]!./layers.commented.json'

import 'guide4you-builder/tojson-file-loader?name=files/[name]!../files/l10n.json.js'
import 'guide4you-builder/tojson-file-loader?name=files/[name]!../files/helptext.json.js'
import 'file?name=images/doc/[name].[ext]!guide4you/images/doc/attribution-collapsed.png'
import 'file?name=images/doc/[name].[ext]!guide4you/images/doc/attribution-expanded-de.png'
import 'file?name=images/doc/[name].[ext]!guide4you/images/doc/attribution-expanded-en.png'
import 'file?name=images/doc/[name].[ext]!guide4you/images/doc/button-documentation.png'
import 'file?name=images/doc/[name].[ext]!guide4you-module-search/images/doc/search-inactive-de.png'
import 'file?name=images/doc/[name].[ext]!guide4you-module-search/images/doc/search-inactive-en.png'
import 'file?name=images/doc/[name].[ext]!guide4you-module-search/images/doc/search-active.png'
import 'file?name=images/doc/[name].[ext]!guide4you/images/doc/zoom.png'

import 'guide4you-builder/mustache-eval-loader?name=proxy/[name].[ext]!guide4you-proxy/proxy.php'
import 'file?name=proxy/AjaxProxy.[ext]!guide4you-proxy/LICENSE.txt'

import {SearchModule} from 'guide4you-module-search/src/SearchModule'
import {G4USearchV2Connector} from '../src/G4USearchV2Connector'

window.createG4U = function (target, clientConf = defaultClientConf, layerConf = defaultLayerConf) {
  return createG4UInternal('#g4u-map', clientConf, layerConf, [
    new SearchModule({ connectors: { G4USearchV2: G4USearchV2Connector }})
  ])
}

export default window.createG4U
