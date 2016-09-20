import { createG4UInternal } from 'guide4you/src/main'

import defaultClientConf from 'guide4you-builder/mustache-eval-loader?name=conf/[name].[ext]!./client.commented.json'
import defaultLayerConf from 'guide4you-builder/mustache-eval-loader?name=conf/[name].[ext]!./layers.commented.json'

import 'guide4you-builder/tojson-file-loader?name=files/[name]!../../files/l10n.json.js'

import 'file?name=files/[name].[ext]!guide4you/files/hotelsbonn.kml'
import 'file?name=files/[name].[ext]!guide4you/files/restaurantsbonn.kml'

import 'guide4you-builder/mustache-eval-loader?name=proxy/[name].[ext]!guide4you-proxy/proxy.php'
import 'file?name=proxy/AjaxProxy.[ext]!guide4you-proxy/LICENSE.txt'

import {URLAPIModule} from '../../src/URLAPIModule'

window.createG4U = function (target, clientConf = defaultClientConf, layerConf = defaultLayerConf) {
  return createG4UInternal(target, clientConf, layerConf, [new URLAPIModule()])
}

export default window.createG4U
