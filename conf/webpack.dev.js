'use strict'

const path = require('path')

const webpackMerge = require('webpack-merge')
const mustacheLoader = require('guide4you-builder/mustache-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const baseDir = process.cwd()
const developing = process.env.DEVELOPMENT ? JSON.parse(process.env.DEVELOPMENT) : false

mustacheLoader.setTemplateVars({
  pageTitle: 'guide4you module search server plugin',
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
    'nominatim.openstreetmap.org',
    'mapper.benndorf.de'
  ]
})

const common = webpackMerge.smartStrategy({ plugins: 'prepend' })(
  require('guide4you-builder/webpack.common'),
  {
    entry: {
      'g4u': [ path.join(baseDir, 'conf/entry.js') ]
    },
    output: {
      path: path.join(baseDir, 'build')
    },
    resolve: {
      modules: [
        'node_modules/guide4you'
      ],
      alias: {
        'config.less': path.join(baseDir, 'node_modules/guide4you/conf/clouds.less')
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'node_modules/guide4you/html/client.html',
        inject: 'head'
      })
    ]
  })

module.exports = webpackMerge.smart(
  common,
  require('guide4you-builder/webpack.dev'))
