import {createMapInternal} from '../../src/main'

import defaultClientConf from 'file-loader?name=conf/[name].[ext]!mustache-loader!./client.commented.json'
import defaultLayerConf from 'file-loader?name=conf/[name].[ext]!mustache-loader!./layers.commented.json'

import 'file-loader?name=files/[name].[ext]!../../files/hotelsbonn.kml'
import 'file-loader?name=files/[name].[ext]!../../files/restaurantsbonn.kml'

import 'tojson-file-loader?name=files/[name]!../../files/l10n.json.js'
import 'tojson-file-loader?name=files/[name]!../../files/helptext.json.js'
import 'file-loader?name=files/[name].[ext]!../../files/infos_de.html'
import 'file-loader?name=files/[name].[ext]!../../files/infos_en.html'

import 'file-loader?name=images/doc/[name].[ext]!../../images/doc/arrowbuttons.png'
import 'file-loader?name=images/doc/[name].[ext]!../../images/doc/attribution-collapsed.png'
import 'file-loader?name=images/doc/[name].[ext]!../../images/doc/attribution-expanded-de.png'
import 'file-loader?name=images/doc/[name].[ext]!../../images/doc/attribution-expanded-en.png'
import 'file-loader?name=images/doc/[name].[ext]!../../images/doc/button-area.png'
import 'file-loader?name=images/doc/[name].[ext]!../../images/doc/button-documentation.png'
import 'file-loader?name=images/doc/[name].[ext]!../../images/doc/button-geolocation-active.png'
import 'file-loader?name=images/doc/[name].[ext]!../../images/doc/button-geolocation-inactive.png'
import 'file-loader?name=images/doc/[name].[ext]!../../images/doc/button-home.png'
import 'file-loader?name=images/doc/[name].[ext]!../../images/doc/button-info.png'
import 'file-loader?name=images/doc/[name].[ext]!../../images/doc/button-lang-de.png'
import 'file-loader?name=images/doc/[name].[ext]!../../images/doc/button-lang-en.png'
import 'file-loader?name=images/doc/[name].[ext]!../../images/doc/button-line.png'
import 'file-loader?name=images/doc/[name].[ext]!../../images/doc/button-print.png'
import 'file-loader?name=images/doc/[name].[ext]!../../images/doc/layerselector-de.png'
import 'file-loader?name=images/doc/[name].[ext]!../../images/doc/layerselector-en.png'
import 'file-loader?name=images/doc/[name].[ext]!../../images/doc/layermenu-mobile.png'
import 'file-loader?name=images/doc/[name].[ext]!../../images/doc/overviewmap.png'
import 'file-loader?name=images/doc/[name].[ext]!../../images/doc/overviewmap-collapsed.png'
import 'file-loader?name=images/doc/[name].[ext]!../../images/doc/scaleline.png'
import 'file-loader?name=images/doc/[name].[ext]!../../images/doc/zoom.png'

import 'file-loader?name=proxy/[name].[ext]!mustache-loader!guide4you-proxy/proxy.php'
import 'file-loader?name=proxy/AjaxProxy.[ext]!guide4you-proxy/LICENSE.txt'

export function createMap (target, clientConf = defaultClientConf, layerConf = defaultLayerConf, options) {
  return createMapInternal(target, clientConf, layerConf, options)
}

export * from '../../src/exports'
