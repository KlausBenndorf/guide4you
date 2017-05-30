'use strict'

const mustacheEvalLoader = require('guide4you-builder/mustache-eval-loader')

let path = require('path')
let baseDir = process.cwd()

mustacheEvalLoader.setTemplateVars({
  svgColor: 'rgba(255,255,255,1)',
  languageFile: 'node_modules/guide4you/dist/files/l10n.json'
})

module.exports = {
  entry: {
    'g4u': [ path.join(baseDir, './conf/dist/entry.js') ]
  },
  output: {
    path: path.join(baseDir, './dist')
  },
  resolve: {
    alias: {
      'lessConfig': path.join(baseDir, './conf/clouds.less')
    }
  }
}
