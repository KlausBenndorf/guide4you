'use strict'

const HtmlWebpackPlugin = require('html-webpack-plugin')

let path = require('path')
let baseDir = process.cwd()

module.exports = {
  entry: {
    'lib/g4u.js': [ path.join(baseDir, './conf/simple/entry.js') ]
  },
  output: {
    path: path.join(baseDir, './build/simple')
  },
  resolve: {
    alias: {
      'lessConfig.less': path.join(baseDir, './conf/clouds.less')
    }
  },
  mustacheEvalLoader: {
    templateVars: {
      ajaxProxy: {
        prod: 'proxy/proxy.php?csurl={url}',
        dev: '/proxy/{url}'
      },
      languageFile: 'files/l10n.json',
      svgColor: 'rgba(255,255,255,1)',
      proxyAjaxFilters: 'true',
      proxyFilterDomain: 'true',
      proxyAjaxDebug: 'true',
      proxyValidRequests: [
        'www.wms.nrw.de'
      ]
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'html/client.html',
      inject: 'head',
      favicon: 'images/g4u-logo.png',
      title: 'Simple g4u3'
    })
  ]
}
