import webdriver from 'selenium-webdriver'
import phantomDriver from './customPhantomDriver'
import test from 'selenium-webdriver/testing/'
import assert from 'selenium-webdriver/testing/assert.js'
import config from './config.js'

let By = webdriver.By

import {stringifyFunctionCall, waitUntilMapReady} from './testUtils'

// globals in browser
var map, ol

function addLayerWithPointAtMapCenter (name, description) {
  map.addLayer(new ol.layer.Vector({
    source: new ol.source.Vector({
      features: [new ol.Feature({
        name: name,
        description: description,
        geometry: new ol.geom.Point(map.getView().getCenter())
      })]
    }),
    visible: true
  }))
}

function addLayerWithLineThroughMapCenter (name, description, edgeLength) {
  let center = map.getView().getCenter()
  let points = [
    [center[0] - edgeLength / 2, center[1] - edgeLength / 2],
    [center[0] + edgeLength / 2, center[1] + edgeLength / 2]
  ]
  map.addLayer(new ol.layer.Vector({
    source: new ol.source.Vector({
      features: [new ol.Feature({
        name: name,
        description: description,
        geometry: new ol.geom.LineString(points)
      })]
    }),
    visible: true
  }))
}

function addLayerWithPolygonAroundMapCenter (name, description, edgeLength) {
  let center = map.getView().getCenter()
  let points = [[
    [center[0] - edgeLength / 2, center[1] - edgeLength / 2],
    [center[0] - edgeLength / 2, center[1] + edgeLength / 2],
    [center[0] + edgeLength / 2, center[1] + edgeLength / 2],
    [center[0] + edgeLength / 2, center[1] - edgeLength / 2]
  ]]
  map.addLayer(new ol.layer.Vector({
    source: new ol.source.Vector({
      features: [new ol.Feature({
        name: name,
        description: description,
        geometry: new ol.geom.Polygon(points)
      })]
    }),
    visible: true
  }))
}

test.describe('FeatureTooltip', function () {
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

  test.it('should show no tooltip if there is no feature under the mouse', function (done) {
    this.timeout(config.mochaTimeout)
    driver.get(config.testClient).then(function () {
      waitUntilMapReady(driver).then(function () {
        driver.actions()
          .mouseMove(driver.findElement(By.className('ol-viewport')))
          .perform()
          .then(function () {
            assert(driver.findElement(By.className('g4u-featuretooltip')).isDisplayed()).equalTo(false)
            done()
          })
      })
    })
  })

  test.it('should 1: show a tooltip with the name of the feature if there is a point feature under the mouse and 2:' +
    ' should hide the tooltip if the mouse moves somewhere else', function (done) {
    this.timeout(config.mochaTimeout)
    driver.get(config.testClient).then(() => {
      return waitUntilMapReady(driver)
    }).then(() => {
      return driver.executeScript(stringifyFunctionCall(addLayerWithPointAtMapCenter, 'name', 'description'))
    }).then(() => {
      return driver.findElement(By.className('ol-viewport'))
    }).then(viewport => {
      // 1:
      driver.actions()
        .mouseMove(viewport)
        .perform()
        .then(function () {
          return driver.findElement(By.className('g4u-featuretooltip'))
        }).then(featureTooltip => {
          assert(featureTooltip.isDisplayed()).equalTo(true)
          assert(featureTooltip.getText()).equalTo('name')
          // 2:
          driver.actions()
            .mouseMove(viewport, { x: 0, y: 0 })
            .perform()
            .then(() => {
              assert(featureTooltip.isDisplayed()).equalTo(false)
              done()
            })
        })
    })
  })

  test.it('should 1: show a tooltip with the name of the feature if there is a line feature under the mouse ' +
    'and 2: hide the tooltip again if the mouse moves somewhere else', function (done) {
    this.timeout(config.mochaTimeout)

    driver.get(config.testClient).then(function () {
      waitUntilMapReady(driver).then(function () {
        driver.executeScript(stringifyFunctionCall(addLayerWithLineThroughMapCenter, 'name', 'description', 1000))
          .then(function () {
            let viewport = driver.findElement(By.className('ol-viewport'))
            // 1:
            driver.actions()
              .mouseMove(viewport)
              .perform().then(function () {
                let featureTooltip = driver.findElement(By.className('g4u-featuretooltip'))
                assert(featureTooltip.isDisplayed()).equalTo(true)
                assert(featureTooltip.getText()).equalTo('name')
                // 2:
                driver.actions()
                  .mouseMove(viewport, { x: 0, y: 0 })
                  .perform()
                  .then(function () {
                    assert(featureTooltip.isDisplayed()).equalTo(false)
                    done()
                  })
              })
          })
      })
    })
  })

  test.it('should 1: show a tooltip with the name of the feature if there is a polygon feature under the mouse ' +
    'and 2: hide the tooltip again if the mouse moves somewhere else', function (done) {
    this.timeout(config.mochaTimeout)

    driver.get(config.testClient).then(function () {
      waitUntilMapReady(driver).then(function () {
        driver.executeScript(stringifyFunctionCall(addLayerWithPolygonAroundMapCenter, 'name', 'description', 1000))
          .then(function () {
            let viewport = driver.findElement(By.className('ol-viewport'))
            let featureTooltip = driver.findElement(By.className('g4u-featuretooltip'))
            // 1:
            driver.actions()
              .mouseMove(viewport)
              .perform()
              .then(function () {
                assert(featureTooltip.isDisplayed()).equalTo(true)
                assert(featureTooltip.getText()).equalTo('name')
                // 2:
                driver.actions()
                  .mouseMove(viewport, { x: 0, y: 0 })
                  .perform()
                  .then(function () {
                    assert(featureTooltip.isDisplayed()).equalTo(false)
                    done()
                  })
              })
          })
      })
    })
  })

  test.it('should show the tooltip of a point lying under a polygon', function (done) {
    this.timeout(config.mochaTimeout)

    driver.get(config.testClient).then(function () {
      waitUntilMapReady(driver).then(function () {
        return driver.executeScript(stringifyFunctionCall(addLayerWithPointAtMapCenter, 'namePoint', 'description'))
      }).then(function () {
        return driver.executeScript(
          stringifyFunctionCall(addLayerWithPolygonAroundMapCenter, 'namePolygon', 'description', 1000))
      }).then(function () {
        let viewport = driver.findElement(By.className('ol-viewport'))
        viewport.getSize().then(function (size) {
          // console.log(JSON.stringify(size, null, 2))
          // 1:
          driver.actions()
            .mouseMove(viewport, { x: Math.round(size.width / 2 + 15), y: Math.round(size.height / 2 + 15) })
            .perform()
            .then(function () {
              let featureTooltip = driver.findElement(By.className('g4u-featuretooltip'))
              assert(featureTooltip.isDisplayed()).equalTo(true)
              assert(featureTooltip.getText()).equalTo('namePolygon')
              // 2:
              driver.actions()
                .mouseMove(viewport)
                .perform()
                .then(function () {
                  assert(featureTooltip.isDisplayed()).equalTo(true)
                  assert(featureTooltip.getText()).equalTo('namePoint')
                  done()
                })
            })
        })
      })
    })
  })

  test.it('should show the tooltip of a line lying under a polygon', function (done) {
    this.timeout(config.mochaTimeout)

    driver.get(config.testClient).then(function () {
      waitUntilMapReady(driver).then(function () {
        driver.executeScript(stringifyFunctionCall(addLayerWithLineThroughMapCenter, 'nameLine', 'description', 1000))
          .then(function () {
            driver.executeScript(
              stringifyFunctionCall(addLayerWithPolygonAroundMapCenter, 'namePolygon', 'description', 1000))
              .then(function () {
                let viewport = driver.findElement(By.className('ol-viewport'))
                viewport.getSize().then(function (size) {
                  driver.actions()
                    .mouseMove(viewport, { x: Math.round(size.width / 2 + 15), y: Math.round(size.height / 2 + 15) })
                    .perform()
                    .then(function () {
                      let featureTooltip = driver.findElement(By.className('g4u-featuretooltip'))
                      assert(featureTooltip.isDisplayed()).equalTo(true)
                      assert(featureTooltip.getText()).equalTo('namePolygon')
                      driver.actions()
                        .mouseMove(viewport)
                        .perform()
                        .then(function () {
                          assert(featureTooltip.isDisplayed()).equalTo(true)
                          assert(featureTooltip.getText()).equalTo('nameLine')
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
