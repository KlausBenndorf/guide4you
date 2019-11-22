const webdriver = require('selenium-webdriver')
const phantomjs = require('phantomjs-prebuilt')
const chrome = require('selenium-webdriver/chrome')

const customPhantom = webdriver.Capabilities.phantomjs()
customPhantom.set('phantomjs.binary.path', phantomjs.path)

module.exports = function () {
  // return new webdriver.Builder().withCapabilities(customPhantom).build()
  const options = new chrome.Options()
  options.headless()
  return new webdriver.Builder().forBrowser('chrome')
    .setChromeOptions(options).build()
}
