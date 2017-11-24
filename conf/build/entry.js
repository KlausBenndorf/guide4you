import { createMapInternal } from 'guide4you/src/main'
import { registerModule } from 'guide4you/src/moduleRegistration'

import defaultClientConf from 'file-loader?name=conf/[name].[ext]!mustache-loader!./client.commented.json'
import defaultLayerConf from 'file-loader?name=conf/[name].[ext]!mustache-loader!./layers.json'

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

import 'file-loader?name=images/doc/[name].[ext]!images/doc/button-link.png'

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
