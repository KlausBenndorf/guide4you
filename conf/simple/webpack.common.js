'use strict'

const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const mustacheLoader = require('guide4you-builder/mustache-loader')

const baseDir = process.cwd()
const developing = process.env.DEVELOPMENT ? JSON.parse(process.env.DEVELOPMENT) : false

mustacheLoader.setTemplateVars({
  ajaxProxy: developing ? '/proxy/{url}' : 'proxy/proxy.php?csurl={url}',
  languageFile: 'files/l10n.json',
  svgColor: 'rgba(255,255,255,1)',
  proxyAjaxFilters: 'true',
  proxyFilterDomain: 'true',
  proxyAjaxDebug: 'true',
  proxyValidRequests: [
    'www.wms.nrw.de',
    'geotiles.verkehr.nrw'
  ]
})

module.exports = webpackMerge.smartStrategy({ plugins: 'prepend' })(
  require('guide4you-builder/webpack.common'),
  {
    entry: {
      'g4u': [ path.join(baseDir, 'conf/simple/entry.js') ]
    },
    output: {
      path: path.join(baseDir, 'build/simple')
    },
    resolve: {
      alias: {
        'config.less': path.join(baseDir, 'conf/clouds.less')
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(baseDir, 'html/client.html'),
        inject: 'head',
        favicon: 'images/g4u-logo.png',
        title: 'Simple Guide4You'
      })
    ]
  })
