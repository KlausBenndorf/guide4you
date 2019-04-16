import webdriver from 'selenium-webdriver'
import phantomDriver from './customPhantomDriver'
import test from 'selenium-webdriver/testing/'
import assert from 'selenium-webdriver/testing/assert.js'

import config from './config.js'

import { waitUntilMapReady, stringifyFunctionCall } from './testUtils'

let By = webdriver.By
let ActionSequence = webdriver.ActionSequence

function getPixelFromCoordinate (coordinate) {
  return window.map.getPixelFromCoordinate(
    window.ol.proj.transform(coordinate, 'EPSG:4326', window.map.getView().getProjection()))
}

test.describe('measurementButton', function () {
  // before and after ///////////////////////////////////////////////////////

  let driver

  test.before(function () {
    this.timeout(config.mochaTimeout)
    driver = phantomDriver()
    driver.manage().window().setSize(1200, 800)
  })

  test.after(function () {
    driver.quit()
  })
  // functions //////////////////////////////////////////////////////////////

  // let checkButtonIsPresent = function (name) {
  //   test.it(`should have ${name} measurement button`, function (done) {
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
  //   test.it(`should initially hide ${name} measurement window `, function (done) {
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
  //   test.it('should display area measurement window when corresponding button is clicked', function (done) {
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

  test.it('distance measurement tool returns reasonable', function (done) {
    this.timeout(config.mochaTimeout)
    driver.get(config.testClient)
      .then(function () {
        return waitUntilMapReady(driver)
      })
      .then(function () {
        return driver.findElement(By.css('.g4u-distance-measurement .g4u-control-mainbutton'))
          .click()
      })
      .then(function () {
        let visible = driver
          .findElement(By.css('.g4u-distance-measurement .g4u-window'))
          .isDisplayed()
        assert(visible, 'distance measurement window should be visible').isEqualTo(true)
        driver.executeScript(stringifyFunctionCall(getPixelFromCoordinate, [6.94817, 50.94129]))
          .then(function (point1) {
            driver.executeScript(stringifyFunctionCall(getPixelFromCoordinate, [6.96837, 50.94129]))
              .then(function (point2) {
                return driver.findElement(By.className('ol-viewport'))
                  .then(function (element) {
                    // console.log(point1)
                    // console.log(point2)
                    return new ActionSequence(driver)
                      .mouseMove(element, { x: point1[0], y: point1[1] })
                      .click()
                      .mouseMove(element, { x: point2[0], y: point2[1] })
                      .click()
                      .perform()
                  })
                  .then(function () {
                    return driver.findElement(By.css('.g4u-distance-measurement-value > span'))
                      .getText()
                  })
                  .then(function (text) {
                    // console.log('>' + text + '<')
                    done()
                  })
              })
          })
      })
  })
})
