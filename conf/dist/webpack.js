'use strict'

let path = require('path')
let baseDir = process.cwd()

module.exports = {
  entry: {
    'g4u.js': [ path.join(baseDir, './conf/dist/entry.js') ]
  },
  output: {
    path: path.join(baseDir, './dist')
  },
  resolve: {
    alias: {
      'lessConfig.less': path.join(baseDir, './conf/clouds.less')
    }
  },
  mustacheEvalLoader: {
    templateVars: {
      svgColor: 'rgba(255,255,255,1)',
      languageFile: 'node_modules/guide4you/dist/files/l10n.json'
    }
  }
}
