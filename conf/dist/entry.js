import { createMapInternal } from '../../src/main'
import { registerModule } from '../../src/moduleRegistration'

import { SearchModule } from 'src/search/SearchModule'
import { NominatimSearchConnector } from 'src/search/connectors/NominatimSearchConnector'
import { URLAPIModule } from 'src/urlapi/URLAPIModule'

import 'file-loader?name=conf/[name].[ext]!mustache-loader!../full/client.json5'
import 'file-loader?name=conf/[name].[ext]!./layers.json5'

import 'tojson-file-loader?name=files/[name]!files/l10n.json.js'

registerModule(new SearchModule({
  connectors: { nominatim: NominatimSearchConnector }
}))

registerModule(new URLAPIModule())

export function createMap (target, clientConf = './conf/client.commented.json',
    layerConf = './conf/layers.commented.json', options) {
  return createMapInternal(target, clientConf, layerConf, options)
}

export * from '../../src/exports'
