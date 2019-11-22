import { createMapInternal } from '../../src/main'
import { registerModule } from '../../src/moduleRegistration'

import { SearchModule } from 'src/search/SearchModule'
import { NominatimSearchConnector } from 'src/search/connectors/NominatimSearchConnector'
import { URLAPIModule } from 'src/urlapi/URLAPIModule'

import defaultClientConf from 'file-loader?name=conf/[name].[ext]!mustache-loader!../full/client.json5'
import defaultLayerConf from 'file-loader?name=conf/[name].[ext]!./layers.json5'
import defaultLanguageConf from 'tojson-file-loader?name=files/[name]!../../files/l10n.json.js'
import defaultStylesConf from 'file-loader?name=conf/[name].[ext]!../full/styles.json5'

registerModule(new SearchModule({
  connectors: { nominatim: NominatimSearchConnector }
}))

registerModule(new URLAPIModule())

export function createMap (target, ...args) {
  return createMapInternal(target, args, {
    client: defaultClientConf,
    layer: defaultLayerConf,
    translations: defaultLanguageConf,
    styles: defaultStylesConf
  })
}

export * from '../../src/exports'
