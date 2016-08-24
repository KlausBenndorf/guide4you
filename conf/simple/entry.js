import { createG4UInternal } from 'guide4you/src/main'

import defaultClientConf from 'guide4you-builder/mustache-eval-loader?name=conf/[name].[ext]!./client.commented.json'
import defaultLayerConf from 'guide4you-builder/mustache-eval-loader?name=conf/[name].[ext]!./layers.commented.json'

import 'guide4you-builder/tojson-file-loader?name=files/[name]!guide4you-module-search/files/l10n.json.js'

import 'file?name=files/[name].[ext]!guide4you/files/hotelsbonn.kml'
import 'file?name=files/[name].[ext]!guide4you/files/restaurantsbonn.kml'

import 'guide4you-builder/mustache-eval-loader?name=proxy/[name].[ext]!guide4you-proxy/proxy.php'
import 'file?name=proxy/AjaxProxy.[ext]!guide4you-proxy/LICENSE.txt'

import SearchModule from 'guide4you-module-search/src/SearchModule'
import {G4USearchV2} from '../../src/G4USearchV2Parser';

window.createG4U = function (target, clientConf = defaultClientConf, layerConf = defaultLayerConf) {
  return createG4UInternal('#g4u-map', clientConf, layerConf, [
    new SearchModule({ parsers: { G4USearchV2: G4USearchV2 }})
  ])
}

export default window.createG4U
