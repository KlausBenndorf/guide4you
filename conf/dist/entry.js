import 'file-loader?name=[name].[ext]!./g4u.d.ts'

import { createG4UInternal } from '../../src/main'

import 'guide4you-builder/mustache-eval-loader?name=conf/[name].[ext]!../full/client.commented.json'
import 'file-loader?name=conf/[name].[ext]!./layers.commented.json'

import 'guide4you-builder/tojson-file-loader?name=files/[name]!../../files/l10n.json.js'
import {SourceServerVector} from '../../src/sources/SourceServerVector'
import {G4UMap as G4UMapImport} from '../../src/G4UMap'

// exports

export function createMap (element, config = './conf/client.commented.json',
  layerConfig = './conf/layers.commented.json') {
  return createG4UInternal(element, config, layerConfig)
}

export const source = {
  ServerVector: SourceServerVector
}

export const G4UMap = G4UMapImport
