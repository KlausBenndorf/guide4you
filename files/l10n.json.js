// As the webpack loader's exec method is broken we need to do plain ES5 here

var merge = require('lodash/merge')

module.exports = merge(require('guide4you/files/l10n.json.js'), require('guide4you-module-search/files/l10n.json.js'))
