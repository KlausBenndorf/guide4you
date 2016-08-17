import webdriver from 'selenium-webdriver'
import phantomDriver from 'guide4you/tests/selenium/customPhantomDriver'
import test from 'selenium-webdriver/testing/'
import assert from 'selenium-webdriver/testing/assert'
import until from 'selenium-webdriver/lib/until'

import config from './config.js'
let By = webdriver.By

import {waitUntilMapReady} from 'guide4you/tests/selenium/testUtils'

test.describe('Search', function () {
  let driver

  test.before(function () {
    this.timeout(config.mochaTimeout)
    driver = phantomDriver()
    driver.manage().window().setSize(1200, 800)
    driver.manage().timeouts().implicitlyWait(config.seleniumTimeout)
  })

  test.after(function () {
    driver.quit()
  })

  test.it('should appear a searchbar', function (done) {
    driver.get(config.testClient).then(() => {
      return waitUntilMapReady(driver)
    }).then(() => {
      let searchControl = driver.wait(
        until.elementLocated(By.css('.ol-overlaycontainer-stopevent > .g4u-search-control')))
      assert(searchControl.isDisplayed()).equalTo(true)
      done()
    })
  })
})
