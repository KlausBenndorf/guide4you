import { By, until } from 'selenium-webdriver'
import customDriver from 'guide4you/tests/customDriver'
import { describe, before, after, it } from 'selenium-webdriver/testing/'
import assert from 'selenium-webdriver/testing/assert'

import config from './config.js'

import { waitUntilMapReady } from 'guide4you/tests/testUtils'

describe('Search', function () {
  let driver

  before(function () {
    this.timeout(config.mochaTimeout)
    driver = customDriver()
    driver.manage().window().setSize(1200, 800)
    driver.manage().timeouts(config.seleniumTimeouts)
  })

  after(function () {
    driver.quit()
  })

  it('should appear a searchbar', function (done) {
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
