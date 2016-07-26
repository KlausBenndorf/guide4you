import webdriver from 'selenium-webdriver'
import chrome from 'selenium-webdriver/chrome'
import test from 'selenium-webdriver/testing/'
import assert from 'selenium-webdriver/testing/assert.js'

import config from './config.js'

let By = webdriver.By
let until = webdriver.until
let ActionSequence = webdriver.ActionSequence
let driver

let waitUntilMapReady = function (driver) {
  return new webdriver.promise.Promise(function (fulfill, reject) {
    let script = 'var readyMessage = document.createElement("div");' +
      'readyMessage.className = "map-ready";' +
      'if (!window.map) { throw new Error("Map does not exist at document ready"); }' +
      'window.map.asSoonAs("ready", true, function () { document.body.appendChild(readyMessage); });'

    driver.executeScript(script)
      .then(function () {
        driver
          .wait(until.elementLocated(By.className('map-ready')), 5000)
          .then(function () {
            fulfill()
          })
          .thenCatch(function (err) {
            reject(err)
          })
      })
  })
}

test.describe('measurementButton', function () {
  // before and after ///////////////////////////////////////////////////////

  test.before(function () {
    this.timeout(config.mochaTimeout)
    driver = new chrome.Driver()
    driver.manage().timeouts().implicitlyWait(config.seleniumTimeout)
    driver.manage().timeouts().pageLoadTimeout(config.seleniumTimeout)
  })

  test.after(function () {
    driver.quit()
  })

  // functions //////////////////////////////////////////////////////////////

  let checkButtonIsPresent = function (name) {
    test.it(`should have ${name} measurement button`, function (done) {
      this.timeout(config.mochaTimeout)
      driver.get(config.testClient)
        .then(function () {
          waitUntilMapReady(driver)
            .then(function () {
              driver
                .findElement(By.css(`.g4u-window-decorator.g4u-${name}-measurement`))
              done()
            })
        })
    })
  }

  let windowInitallyHidden = function (name) {
    test.it(`should initially hide ${name} measurement window `, function (done) {
      this.timeout(config.mochaTimeout)
      driver.get(config.testClient)
        .then(function () {
          waitUntilMapReady(driver)
            .then(function () {
              driver
                .findElement(
                  By.css(`.g4u-window-decorator.g4u-${name}-measurement`)
              )
                .then(function () {
                  driver
                    .findElement(
                      By.css(`.g4u-window-component.g4u-${name}-measurement`)
                  )
                    .isDisplayed()
                    .then(
                      function (visible) {
                        if (!visible) {
                          done()
                        }
                      })
                })
            })
        })
    })
  }

  let windowDisplaysWhenButtonIsClicked = function (name) {
    test.it('should display area measurement window when corresponding button is clicked', function (done) {
      this.timeout(config.mochaTimeout)
      driver.get(config.testClient)
        .then(function () {
          waitUntilMapReady(driver)
            .then(function () {
              driver
                .findElement(
                  By.css(`.g4u-window-decorator.g4u-${name}-measurement`)
              )
                .click()
                .then(function () {
                  driver
                    .findElement(
                      By.css(`.g4u-window-component.g4u-${name}-measurement`)
                  )
                    .isDisplayed()
                    .then(
                      function (visible) {
                        if (visible) {
                          done()
                        }
                      })
                })
            })
        })
    })
  }

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
        waitUntilMapReady(driver)
          .then(function () {
            driver
              .findElement(
                By.css('.g4u-window-decorator.g4u-distance-measurement')
            )
              .click()
              .then(function () {
                driver
                  .findElement(
                    By.css('.g4u-window-component.g4u-distance-measurement')
                )
                  .isDisplayed()
                  .then(
                    function (visible) {
                      if (visible) {
                        done()
                      }
                      driver.executeScript(`var coordinate = [6.94817,50.94129];` +
                        'return window.map.getPixelFromCoordinate(ol.proj.transform(coordinate, "EPSG:4326", map.getView().getProjection()))')
                        .then(function (point1) {
                          driver.executeScript(`var coordinate = [6.96837,50.94129];` +
                            'return window.map.getPixelFromCoordinate(ol.proj.transform(coordinate, "EPSG:4326", map.getView().getProjection()))')
                            .then(function (point2) {
                              driver
                                .findElement(
                                  By.id('map')
                              )
                                .then(function (element) {
                                  // console.log(point1)
                                  // console.log(point2)
                                  new ActionSequence(driver)
                                    .mouseMove(element, {x: point1[0], y: point1[1]})
                                    .click()
                                    .mouseMove(element, {x: point2[0], y: point2[1]})
                                    .click()
                                    .perform()
                                    .then(function () {
                                      driver
                                        .findElement(
                                          By.css('.g4u-distance-measurement-value > span')
                                      )
                                        .getText()
                                        .then(function (text) {
                                          // console.log('>' + text + '<')
                                          done()
                                        })
                                    })
                                })
                            })
                        })
                    })
              })
          })
      })
  /*clickCoordinates(6.95817, 50.94129)
  clickCoordinates(6.96837, 50.94129)
  let positionToClick = function (lon, lat) {

          let script = `var coordinate = [6.94817,50.94129];` +
              'return window.map.getPixelFromCoordinate(ol.proj.transform(coordinate, "EPSG:4326", map.getView().getProjection()))'
          driver.executeScript(script)
              .then(function (result) {
                  console.log(result)
                  done()
              })
      });*/
  })
})
