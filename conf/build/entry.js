import { createMapInternal } from 'guide4you/src/main'
import { registerModule } from 'guide4you/src/moduleRegistration'

import defaultClientConf from 'file-loader?name=conf/[name].[ext]!mustache-loader!../client.commented.json'
import defaultLayerConf from 'file-loader?name=conf/[name].[ext]!mustache-loader!./layers.json'

import 'tojson-file-loader?name=files/[name]!files/helptext.json.js'

import 'guide4you/images/doc/arrowbuttons.png'
import 'guide4you/images/doc/attribution-collapsed.png'
import 'guide4you/images/doc/attribution-expanded-de.png'
import 'guide4you/images/doc/attribution-expanded-en.png'
import 'guide4you/images/doc/button-area.png'
import 'guide4you/images/doc/button-documentation.png'
import 'guide4you/images/doc/button-geolocation-active.png'
import 'guide4you/images/doc/button-geolocation-inactive.png'
import 'guide4you/images/doc/button-info.png'
import 'guide4you/images/doc/button-lang-de.png'
import 'guide4you/images/doc/button-lang-en.png'
import 'guide4you/images/doc/button-line.png'
import 'guide4you/images/doc/button-print.png'
import 'guide4you/images/doc/layerselector-de.png'
import 'guide4you/images/doc/layerselector-en.png'
import 'guide4you/images/doc/overviewmap.png'
import 'guide4you/images/doc/overviewmap-collapsed.png'
import 'guide4you/images/doc/scaleline.png'
import 'guide4you/images/doc/zoom.png'

import 'images/doc/button-link.png'

import 'tojson-file-loader?name=files/[name]!files/l10n.json.js'

import 'file-loader?name=files/[name].[ext]!guide4you/files/hotelsbonn.kml'
import 'file-loader?name=files/[name].[ext]!guide4you/files/restaurantsbonn.kml'

import 'file-loader?name=proxy/[name].[ext]!mustache-loader!guide4you-proxy/proxy.php'
import 'file-loader?name=proxy/AjaxProxy.[ext]!guide4you-proxy/LICENSE.txt'

import { URLAPIModule } from 'src/URLAPIModule'

registerModule(new URLAPIModule(
  /* {
   moduleParameters': [
   {
   'keys': [ 'lorem', 'ipsum', 'dolor', 'sit', 'amet' ],
   'setEvent': 'afterConfiguring',
   'setToMap': (that) => { },
   'getFromMap': (that) => { }
   }
   ]
   } */
))

export function createMap (target, clientConf = defaultClientConf, layerConf = defaultLayerConf, options) {
  return createMapInternal(target, clientConf, layerConf, options)
}

export * from 'guide4you/src/exports'
