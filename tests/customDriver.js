import webdriver from 'selenium-webdriver'
import phantomjs from 'phantomjs-prebuilt'

let customPhantom = webdriver.Capabilities.phantomjs()
customPhantom.set('phantomjs.binary.path', phantomjs.path)

export default function () {
  // return new webdriver.Builder().withCapabilities(customPhantom).build()
  return new webdriver.Builder().forBrowser('chrome').build()
}
