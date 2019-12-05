import { createMapInternal } from '../../src/main'
import { registerModule } from '../../src/moduleRegistration'

import { SearchModule } from 'src/search/SearchModule'
import { NominatimSearchConnector } from 'src/search/connectors/NominatimSearchConnector'
import { PhotonSearchConnector } from '../../src/search/connectors/PhotonSearchConnector'

import { URLAPIModule } from 'src/urlapi/URLAPIModule'

import defaultClientConf from 'file-loader?name=conf/[name].[ext]!mustache-loader!./client.json5'
import defaultLayerConf from 'file-loader?name=conf/[name].[ext]!mustache-loader!./layers.json5'
import defaultStylesConf from 'file-loader?name=conf/[name].[ext]!./styles.json5'
import defaultLanguageConf from 'tojson-file-loader?name=files/[name]!../../files/l10n.json.js'

import 'file-loader?name=files/[name].[ext]!../../files/hotelsbonn.kml'
import 'file-loader?name=files/[name].[ext]!../../files/restaurantsbonn.kml'

import 'tojson-file-loader?name=files/[name]!../../files/helptext.json.js'
import 'file-loader?name=files/[name].[ext]!../../files/infos_de.html'
import 'file-loader?name=files/[name].[ext]!../../files/infos_en.html'
import 'file-loader?name=files/[name].[ext]!../../files/osm_info_de.html'
import 'file-loader?name=files/[name].[ext]!../../files/osm_info_en.html'

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

import 'images/doc/button-link.png'

import '../../images/doc/search-active.png'
import '../../images/doc/search-inactive-de.png'
import '../../images/doc/search-inactive-en.png'

import 'file-loader?name=proxy/[name].[ext]!mustache-loader!guide4you-proxy/proxy.php'
import 'file-loader?name=proxy/AjaxProxy.[ext]!guide4you-proxy/LICENSE.txt'

registerModule(new SearchModule({
  connectors: {
    nominatim: NominatimSearchConnector,
    photon: PhotonSearchConnector
  }
}))

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

export function createMap (target, ...args) {
  return createMapInternal(target, args, {
    client: defaultClientConf,
    layer: defaultLayerConf,
    translations: defaultLanguageConf,
    styles: defaultStylesConf
  }).then(map => {
    map.api.popupModifier.register('test', () => { return { name: 'test', description: 'testest' } })
    return map
  })
}

export * from '../../src/exports'
