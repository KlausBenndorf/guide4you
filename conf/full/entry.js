import { createG4UInternal } from '../../src/main'

import defaultClientConf from 'guide4you-builder/mustache-eval-loader?name=conf/[name].[ext]!./client.commented.json'
import defaultLayerConf from 'guide4you-builder/mustache-eval-loader?name=conf/[name].[ext]!./layers.commented.json'

import 'file?name=files/[name].[ext]!../../files/hotelsbonn.kml'
import 'file?name=files/[name].[ext]!../../files/restaurantsbonn.kml'

import 'guide4you-builder/tojson-file-loader?name=files/[name]!../../files/l10n.json.js'
import 'guide4you-builder/tojson-file-loader?name=files/[name]!../../files/helptext.json.js'
import 'file?name=files/[name].[ext]!../../files/infos_de.html'
import 'file?name=files/[name].[ext]!../../files/infos_en.html'

import 'file?name=images/doc/[name].[ext]!../../images/doc/arrowbuttons.png'
import 'file?name=images/doc/[name].[ext]!../../images/doc/attribution-collapsed.png'
import 'file?name=images/doc/[name].[ext]!../../images/doc/attribution-expanded-de.png'
import 'file?name=images/doc/[name].[ext]!../../images/doc/attribution-expanded-en.png'
import 'file?name=images/doc/[name].[ext]!../../images/doc/button-area.png'
import 'file?name=images/doc/[name].[ext]!../../images/doc/button-documentation.png'
import 'file?name=images/doc/[name].[ext]!../../images/doc/button-geolocation-active.png'
import 'file?name=images/doc/[name].[ext]!../../images/doc/button-geolocation-inactive.png'
import 'file?name=images/doc/[name].[ext]!../../images/doc/button-home.png'
import 'file?name=images/doc/[name].[ext]!../../images/doc/button-info.png'
import 'file?name=images/doc/[name].[ext]!../../images/doc/button-lang-de.png'
import 'file?name=images/doc/[name].[ext]!../../images/doc/button-lang-en.png'
import 'file?name=images/doc/[name].[ext]!../../images/doc/button-line.png'
import 'file?name=images/doc/[name].[ext]!../../images/doc/button-print.png'
import 'file?name=images/doc/[name].[ext]!../../images/doc/layerselector-de.png'
import 'file?name=images/doc/[name].[ext]!../../images/doc/layerselector-en.png'
import 'file?name=images/doc/[name].[ext]!../../images/doc/overviewmap.png'
import 'file?name=images/doc/[name].[ext]!../../images/doc/overviewmap-collapsed.png'
import 'file?name=images/doc/[name].[ext]!../../images/doc/scaleline.png'
import 'file?name=images/doc/[name].[ext]!../../images/doc/zoom.png'

import 'guide4you-builder/mustache-eval-loader?name=proxy/[name].[ext]!guide4you-proxy/proxy.php'
import 'file?name=proxy/AjaxProxy.[ext]!guide4you-proxy/LICENSE.txt'

window.createG4U = function (target, clientConf = defaultClientConf, layerConf = defaultLayerConf) {
  return createG4UInternal(target, clientConf, layerConf)
}

export default window.createG4U
