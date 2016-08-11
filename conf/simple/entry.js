import { createG4U } from '../../src/main'

import clientConf from 'guide4you-builder/mustache-eval-loader?name=conf/[name].[ext]!./client.commented.json'
import layerConf from 'guide4you-builder/mustache-eval-loader?name=conf/[name].[ext]!./layers.commented.json'

import 'guide4you-builder/tojson-file-loader?name=files/[name]!../../files/l10n.json.js'

import 'file?name=files/[name].[ext]!../../files/hotelsbonn.kml'
import 'file?name=files/[name].[ext]!../../files/restaurantsbonn.kml'

createG4U('#mymap', clientConf, layerConf)
