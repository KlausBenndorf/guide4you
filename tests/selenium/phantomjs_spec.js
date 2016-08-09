import webdriver from 'selenium-webdriver'
import phantomDriver from './customPhantomDriver'
import test from 'selenium-webdriver/testing/'
import assert from 'selenium-webdriver/testing/assert.js'

import config from './config.js'

let By = webdriver.By

import {waitUntilMapReady, saveScreenshot} from './testUtils'

test.describe('test phantomjs capabilities', () => {
  let driver

  test.before(function () {
    this.timeout(config.mochaTimeout)
    driver = phantomDriver()
    driver.manage().window().setSize(1200, 800)
    driver.manage().timeouts().implicitlyWait(config.seleniumTimeout)
    driver.manage().timeouts().pageLoadTimeout(config.seleniumTimeout)
  })

  test.after(function () {
    driver.quit()
  })

  test.it('should display the map viewport', function (done) {
    this.timeout(config.mochaTimeout)
    driver.get(config.testClient).then(function () {
      waitUntilMapReady(driver).then(function () {
        return driver.findElement(By.className('ol-viewport'))
      }).then(viewport => {
        assert(viewport.isDisplayed()).equalTo(true)
        // viewport.getSize().then(size => console.log(JSON.stringify(size)))
        done()
      })
    })
  })

  test.it('should make a screenshot', function (done) {
    this.timeout(config.mochaTimeout)
    driver.get(config.testClient).then(function () {
      waitUntilMapReady(driver).then(function () {
        saveScreenshot(driver)
        done()
      })
    })
  })
})
