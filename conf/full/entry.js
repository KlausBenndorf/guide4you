import {createMapInternal} from '../../src/main'

import defaultClientConf from 'file-loader?name=conf/[name].[ext]!mustache-loader!./client.commented.json'
import defaultLayerConf from 'file-loader?name=conf/[name].[ext]!mustache-loader!./layers.commented.json'

import 'file-loader?name=files/[name].[ext]!../../files/hotelsbonn.kml'
import 'file-loader?name=files/[name].[ext]!../../files/restaurantsbonn.kml'

import 'tojson-file-loader?name=files/[name]!../../files/l10n.json.js'
import 'tojson-file-loader?name=files/[name]!../../files/helptext.json.js'
import 'file-loader?name=files/[name].[ext]!../../files/infos_de.html'
import 'file-loader?name=files/[name].[ext]!../../files/infos_en.html'

import '../../images/doc/arrowbuttons.png'
import '../../images/doc/attribution-collapsed.png'
import '../../images/doc/attribution-expanded-de.png'
import '../../images/doc/attribution-expanded-en.png'
import '../../images/doc/button-area.png'
import '../../images/doc/button-documentation.png'
import '../../images/doc/button-geolocation-active.png'
import '../../images/doc/button-geolocation-inactive.png'
import '../../images/doc/button-home.png'
import '../../images/doc/button-info.png'
import '../../images/doc/button-lang-de.png'
import '../../images/doc/button-lang-en.png'
import '../../images/doc/button-line.png'
import '../../images/doc/button-print.png'
import '../../images/doc/layerselector-de.png'
import '../../images/doc/layerselector-en.png'
import '../../images/doc/layermenu-mobile.png'
import '../../images/doc/overviewmap.png'
import '../../images/doc/overviewmap-collapsed.png'
import '../../images/doc/scaleline.png'
import '../../images/doc/zoom.png'

import 'file-loader?name=proxy/[name].[ext]!mustache-loader!guide4you-proxy/proxy.php'
import 'file-loader?name=proxy/AjaxProxy.[ext]!guide4you-proxy/LICENSE.txt'

export function createMap (target, clientConf = defaultClientConf, layerConf = defaultLayerConf, options) {
  return createMapInternal(target, clientConf, layerConf, options)
}

export * from '../../src/exports'
