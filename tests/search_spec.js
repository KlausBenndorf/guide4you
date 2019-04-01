const selenium = require('selenium-webdriver')
const By = selenium.By
const until = selenium.until
const customDriver = require('./customDriver')
const testing = require('selenium-webdriver/testing/')
const describe = testing.describe
const before = testing.before
const after = testing.after
const it = testing.it
const config = require('./config.js')
const assert = require('selenium-webdriver/testing/assert.js')
const waitUntilMapReady = require('./testUtils').waitUntilMapReady

describe('Search', function () {
  let driver

  before(function () {
    this.timeout(config.mochaTimeout)
    driver = customDriver()
    driver.manage().window().setSize(1200, 800)
    driver.manage().setTimeouts(config.seleniumTimeouts)
  })

  after(function () {
    driver.quit()
  })

  it('should appear a searchbar', async function (done) {
    await driver.get(config.testClient)
    await waitUntilMapReady(driver)

    const searchControl = await driver.wait(
      until.elementLocated(By.css('.ol-overlaycontainer-stopevent > .g4u-search-control')))
    assert(await searchControl.isDisplayed()).equalTo(true)
    done()
  })
})
