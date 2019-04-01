const webdriver = require('selenium-webdriver')
const phantomjs = require('phantomjs-prebuilt')

const customPhantom = webdriver.Capabilities.phantomjs()
customPhantom.set('phantomjs.binary.path', phantomjs.path)

module.exports = function () {
  return new webdriver.Builder().withCapabilities(customPhantom).build()
  // return new webdriver.Builder().forBrowser('chrome').build()
}
