import {createMapInternal} from 'guide4you/src/main'

import defaultClientConf from 'mustache-eval-loader?name=conf/[name].[ext]!./client.commented.json'
import defaultLayerConf from 'mustache-eval-loader?name=conf/[name].[ext]!guide4you/conf/simple/layers.commented.json'

import 'tojson-file-loader?name=files/[name]!files/l10n.json.js'
import 'tojson-file-loader?name=files/[name]!files/helptext.json.js'

import 'file-loader?name=images/doc/[name].[ext]!guide4you/images/doc/arrowbuttons.png'
import 'file-loader?name=images/doc/[name].[ext]!guide4you/images/doc/attribution-collapsed.png'
import 'file-loader?name=images/doc/[name].[ext]!guide4you/images/doc/attribution-expanded-de.png'
import 'file-loader?name=images/doc/[name].[ext]!guide4you/images/doc/attribution-expanded-en.png'
import 'file-loader?name=images/doc/[name].[ext]!guide4you/images/doc/button-area.png'
import 'file-loader?name=images/doc/[name].[ext]!guide4you/images/doc/button-documentation.png'
import 'file-loader?name=images/doc/[name].[ext]!guide4you/images/doc/button-geolocation-active.png'
import 'file-loader?name=images/doc/[name].[ext]!guide4you/images/doc/button-geolocation-inactive.png'
import 'file-loader?name=images/doc/[name].[ext]!guide4you/images/doc/button-info.png'
import 'file-loader?name=images/doc/[name].[ext]!guide4you/images/doc/button-lang-de.png'
import 'file-loader?name=images/doc/[name].[ext]!guide4you/images/doc/button-lang-en.png'
import 'file-loader?name=images/doc/[name].[ext]!guide4you/images/doc/button-line.png'
import 'file-loader?name=images/doc/[name].[ext]!guide4you/images/doc/button-print.png'
import 'file-loader?name=images/doc/[name].[ext]!guide4you/images/doc/layerselector-de.png'
import 'file-loader?name=images/doc/[name].[ext]!guide4you/images/doc/layerselector-en.png'
import 'file-loader?name=images/doc/[name].[ext]!guide4you/images/doc/overviewmap.png'
import 'file-loader?name=images/doc/[name].[ext]!guide4you/images/doc/overviewmap-collapsed.png'
import 'file-loader?name=images/doc/[name].[ext]!guide4you/images/doc/scaleline.png'
import 'file-loader?name=images/doc/[name].[ext]!guide4you/images/doc/zoom.png'

import 'file-loader?name=images/doc/[name].[ext]!images/doc/search-active.png'
import 'file-loader?name=images/doc/[name].[ext]!images/doc/search-inactive-de.png'
import 'file-loader?name=images/doc/[name].[ext]!images/doc/search-inactive-en.png'

import 'file-loader?name=files/[name].[ext]!guide4you/files/hotelsbonn.kml'
import 'file-loader?name=files/[name].[ext]!guide4you/files/restaurantsbonn.kml'

import 'mustache-eval-loader?name=proxy/[name].[ext]!guide4you-proxy/proxy.php'
import 'file-loader?name=proxy/AjaxProxy.[ext]!guide4you-proxy/LICENSE.txt'

import {SearchModule} from 'src/SearchModule'
import {NominatimSearchConnector} from 'src/NominatimSearchConnector'

export function createMap (target, clientConf = defaultClientConf, layerConf = defaultLayerConf) {
  return createMapInternal('#g4u-map', clientConf, layerConf, [
    new SearchModule({ connectors: { nominatim: NominatimSearchConnector } })
  ])
}

export * from 'guide4you/src/exports'
