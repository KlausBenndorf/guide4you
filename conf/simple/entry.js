import { createG4U } from '../../src/main'

import defaultClientConf from 'guide4you-builder/mustache-eval-loader?name=conf/[name].[ext]!./client.commented.json'
import defaultLayerConf from 'guide4you-builder/mustache-eval-loader?name=conf/[name].[ext]!./layers.commented.json'

import 'guide4you-builder/tojson-file-loader?name=files/[name]!../../files/l10n.json.js'

import 'file?name=files/[name].[ext]!../../files/hotelsbonn.kml'
import 'file?name=files/[name].[ext]!../../files/restaurantsbonn.kml'

window.createG4U = function (target, clientConf = defaultClientConf, layerConf = defaultLayerConf) {
  return createG4U(target, clientConf, layerConf)
}
