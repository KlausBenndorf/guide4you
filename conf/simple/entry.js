import {createMapInternal} from '../../src/main'

import defaultClientConf from 'file-loader?name=conf/[name].[ext]!mustache-loader!./client.commented.json'
import defaultLayerConf from 'file-loader?name=conf/[name].[ext]!mustache-loader!./layers.commented.json'

import defaultTranslations from 'tojson-file-loader?name=files/[name]!../../files/l10n.json.js'

import 'file-loader?name=files/[name].[ext]!../../files/hotelsbonn.kml'
import 'file-loader?name=files/[name].[ext]!../../files/restaurantsbonn.kml'

export function createMap (target, ...args) {
  return createMapInternal(target, args, {
    client: defaultClientConf,
    layer: defaultLayerConf,
    translations: defaultTranslations
  })
}

export * from '../../src/exports'
