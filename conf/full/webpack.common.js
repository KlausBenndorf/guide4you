'use strict'

const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const mustacheLoader = require('guide4you-builder/mustache-loader')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

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
    'a.tile.openstreetmap.org',
    'b.tile.openstreetmap.org',
    'c.tile.openstreetmap.org',
    'stadtplan.bonn.de',
    'www.wmts.nrw.de',
    'www.wms.nrw.de'
  ]
})

module.exports = webpackMerge.smartStrategy({ plugins: 'prepend' })(
  require('guide4you-builder/webpack.common'),
  {
    entry: {
      'g4u': [ path.join(baseDir, 'conf/full/entry.js') ]
    },
    output: {
      path: path.join(baseDir, 'build/full')
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
        title: 'Full Guide4You'
      }),
      new CopyWebpackPlugin([
        { from: 'node_modules/jquery/dist/jquery.min.js', to: 'js/jquery.min.js' },
        { from: 'node_modules/openlayers/dist/ol.js', to: 'js/ol.js' }
      ]),
      new HtmlWebpackIncludeAssetsPlugin({
        assets: [
          'js/jquery.min.js',
          'js/ol.js'
        ],
        append: false
      })
    ]
  })
