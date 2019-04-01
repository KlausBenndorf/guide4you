const selenium = require('selenium-webdriver')
const By = selenium.By
const customDriver = require('./customDriver')
const testing = require('selenium-webdriver/testing/')
const describe = testing.describe
const before = testing.before
const after = testing.after
const it = testing.it
const config = require('./config.js')
const assert = require('selenium-webdriver/testing/assert.js')
const waitUntilMapReady = require('./testUtils').waitUntilMapReady

function getPixelFromCoordinate (coordinate) {
  return window.map.getPixelFromCoordinate(coordinate)
}

describe('measurementButton', function () {
  // before and after ///////////////////////////////////////////////////////

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
  // functions //////////////////////////////////////////////////////////////

  // let checkButtonIsPresent = function (name) {
  //   it(`should have ${name} measurement button`, function (done) {
  //     this.timeout(config.mochaTimeout)
  //     driver.get(config.testClient)
  //       .then(function () {
  //         waitUntilMapReady(driver)
  //           .then(function () {
  //             driver
  //               .findElement(By.css(`.g4u-window-decorator.g4u-${name}-measurement`))
  //             done()
  //           })
  //       })
  //   })
  // }
  //
  // let windowInitallyHidden = function (name) {
  //   it(`should initially hide ${name} measurement window `, function (done) {
  //     this.timeout(config.mochaTimeout)
  //     driver.get(config.testClient)
  //       .then(function () {
  //         waitUntilMapReady(driver)
  //           .then(function () {
  //             driver
  //               .findElement(
  //                 By.css(`.g4u-window-decorator.g4u-${name}-measurement`)
  //             )
  //               .then(function () {
  //                 driver
  //                   .findElement(
  //                     By.css(`.g4u-window-component.g4u-${name}-measurement`)
  //                 )
  //                   .isDisplayed()
  //                   .then(
  //                     function (visible) {
  //                       if (!visible) {
  //                         done()
  //                       }
  //                     })
  //               })
  //           })
  //       })
  //   })
  // }
  //
  // let windowDisplaysWhenButtonIsClicked = function (name) {
  //   it('should display area measurement window when corresponding button is clicked', function (done) {
  //     this.timeout(config.mochaTimeout)
  //     driver.get(config.testClient)
  //       .then(function () {
  //         waitUntilMapReady(driver)
  //           .then(function () {
  //             driver
  //               .findElement(
  //                 By.css(`.g4u-window-decorator.g4u-${name}-measurement`)
  //             )
  //               .click()
  //               .then(function () {
  //                 driver
  //                   .findElement(
  //                     By.css(`.g4u-window-component.g4u-${name}-measurement`)
  //                 )
  //                   .isDisplayed()
  //                   .then(
  //                     function (visible) {
  //                       if (visible) {
  //                         done()
  //                       }
  //                     })
  //               })
  //           })
  //       })
  //   })
  // }

  // perform tests //////////////////////////////////////////////////////////
  /*
      ['area', 'distance'].forEach( name => {
          checkButtonIsPresent(name)
          windowInitallyHidden(name)
          windowDisplaysWhenButtonIsClicked(name)
      })
  */

  it('distance measurement tool returns reasonable', async function (done) {
    await driver.get(config.testClient)
    await waitUntilMapReady(driver)
    await driver.findElement(By.css('.g4u-distance-measurement .g4u-control-mainbutton'))
      .click()
    const visible = await driver
      .findElement(By.css('.g4u-distance-measurement .g4u-window'))
      .isDisplayed()
    assert(visible, 'distance measurement window should be visible').isEqualTo(true)
    const point1 = await driver.executeScript(getPixelFromCoordinate, [773466.7463450996, 6610915.166693036])
    const point2 = driver.executeScript(getPixelFromCoordinate, [775715.4000591239, 6610915.166693036])
    const element = await driver.findElement(By.className('ol-viewport'))
    await driver.actions()
      .mouseMove(element, { x: point1[0], y: point1[1] })
      .click()
      .mouseMove(element, { x: point2[0], y: point2[1] })
      .click()
      .perform()

    await driver.findElement(By.css('.g4u-distance-measurement-value > span')).getText()
    done()
  })
})
