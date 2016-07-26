import webdriver from 'selenium-webdriver'
import firefox from 'selenium-webdriver/firefox/'
import test from 'selenium-webdriver/testing/'
import assert from 'selenium-webdriver/testing/assert.js'

import config from './config.js'

let By = webdriver.By

import waitUntilMapReady from './waitUntilMapReady'

// TODO: check if map is defined
let addLayerWithPointAtMapCenterFunctionString = function (name, description) {
  let addFeature = function (pName, pDescription) {
    map.addLayer(new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [new ol.Feature({
          name: pName,
          description: pDescription,
          geometry: new ol.geom.Point(map.getView().getCenter())
        })]
      }),
      visible: true
    }))
  }
  return '(' + addFeature.toString() + ')("' + name.toString() + '", "' + description.toString() + '");'
}

// TODO: check if map is defined
let addLayerWithLineThroughMapCenter = function (name, description, edgeLength) {
  let addFeature = function (pName, pDescription, pEdgeLength) {
    let center = map.getView().getCenter()
    let points = [
      [center[0] - pEdgeLength / 2, center[1] - pEdgeLength / 2],
      [center[0] + pEdgeLength / 2, center[1] + pEdgeLength / 2]
    ]
    map.addLayer(new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [new ol.Feature({
          name: pName,
          description: pDescription,
          geometry: new ol.geom.LineString(points)
        })]
      }),
      visible: true
    }))
  }
  return '(' + addFeature.toString() + ')("' + name.toString() + '", "' + description.toString() + '", ' + edgeLength.toString() + ');'
}

// TODO: check if map is defined
let addLayerWithPolygonAroundMapCenter = function (name, description, edgeLength) {
  let addFeature = function (pName, pDescription, pEdgeLength) {
    let center = map.getView().getCenter()
    let points = [[
      [center[0] - pEdgeLength / 2, center[1] - pEdgeLength / 2],
      [center[0] - pEdgeLength / 2, center[1] + pEdgeLength / 2],
      [center[0] + pEdgeLength / 2, center[1] + pEdgeLength / 2],
      [center[0] + pEdgeLength / 2, center[1] - pEdgeLength / 2]
    ]]
    map.addLayer(new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [new ol.Feature({
          name: pName,
          description: pDescription,
          geometry: new ol.geom.Polygon(points)
        })]
      }),
      visible: true
    }))
  }
  return '(' + addFeature.toString() + ')("' + name.toString() + '", "' + description.toString() + '", ' + edgeLength.toString() + ');'
}

test.describe('FeatureTooltip', function () {
  let driver

  test.before(function () {
    this.timeout(config.mochaTimeout)
    driver = new firefox.Driver()
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

  test.it('should 1: show a tooltip with the name of the feature if there is a point feature under the mouse and 2: should hide the tooltip if the mouse moves somewhere else', function (done) {
    this.timeout(config.mochaTimeout)

    driver.get(config.testClient).then(function () {
      waitUntilMapReady(driver).then(function () {
        driver.executeScript(addLayerWithPointAtMapCenterFunctionString('name', 'description')).then(function () {
          let viewport = driver.findElement(By.className('ol-viewport'))
          // 1:
          driver.actions()
            .mouseMove(viewport)
            .perform()
            .then(function () {
              let featureTooltip = driver.findElement(By.className('g4u-featuretooltip'))
              assert(featureTooltip.isDisplayed()).equalTo(true)
              assert(featureTooltip.getText()).contains('name')
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

  test.it('should 1: show a tooltip with the name of the feature if there is a line feature under the mouse and 2: hide the tooltip again if the mouse moves somewhere else', function (done) {
    this.timeout(config.mochaTimeout)

    driver.get(config.testClient).then(function () {
      waitUntilMapReady(driver).then(function () {
        driver.executeScript(addLayerWithLineThroughMapCenter('name', 'description', 1000)).then(function () {
          let viewport = driver.findElement(By.className('ol-viewport'))

          // 1:
          driver.actions()
            .mouseMove(viewport)
            .perform().then(function () {
              let featureTooltip = driver.findElement(By.className('g4u-featuretooltip'))
              assert(featureTooltip.isDisplayed()).equalTo(true)
              assert(featureTooltip.getText()).contains('name')
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

  test.it('should 1: show a tooltip with the name of the feature if there is a polygon feature under the mouse and 2: hide the tooltip again if the mouse moves somewhere else', function (done) {
    this.timeout(config.mochaTimeout)

    driver.get(config.testClient).then(function () {
      waitUntilMapReady(driver).then(function () {
        driver.executeScript(addLayerWithPolygonAroundMapCenter('name', 'description', 1000)).then(function () {
          let viewport = driver.findElement(By.className('ol-viewport'))
          let featureTooltip = driver.findElement(By.className('g4u-featuretooltip'))

          // 1:
          driver.actions()
            .mouseMove(viewport)
            .perform()
            .then(function () {
              assert(featureTooltip.isDisplayed()).equalTo(true)
              assert(featureTooltip.getText()).contains('name')
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
        driver.executeScript(addLayerWithPointAtMapCenterFunctionString('namePoint', 'description')).then(function () {
          driver.executeScript(addLayerWithPolygonAroundMapCenter('namePolygon', 'description', 1000)).then(function () {
            let viewport = driver.findElement(By.className('ol-viewport'))

            viewport.getSize().then(function (size) {
              // 1:
              driver.actions()
                .mouseMove(viewport, { x: size.width / 2 - 15, y: size.height / 2 - 15 }) // TODO: check if width and height are defined
                .perform()
                .then(function () {
                  let featureTooltip = driver.findElement(By.className('g4u-featuretooltip'))
                  assert(featureTooltip.isDisplayed()).equalTo(true)
                  assert(featureTooltip.getText()).contains('namePolygon')
                  // 2:
                  driver.actions()
                    .mouseMove(viewport)
                    .perform()
                    .then(function () {
                      assert(featureTooltip.isDisplayed()).equalTo(true)
                      assert(featureTooltip.getText()).contains('namePoint')
                      done()
                    })
                })
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
        driver.executeScript(addLayerWithLineThroughMapCenter('nameLine', 'description', 1000)).then(function () {
          driver.executeScript(addLayerWithPolygonAroundMapCenter('namePolygon', 'description', 1000)).then(function () {
            let viewport = driver.findElement(By.className('ol-viewport'))

            viewport.getSize().then(function (size) {
              driver.actions()
                .mouseMove(viewport, { x: size.width / 2 - 15, y: size.height / 2 - 15 }) // TODO: check if width and height are defined
                .perform()
                .then(function () {
                  let featureTooltip = driver.findElement(By.className('g4u-featuretooltip'))
                  assert(featureTooltip.isDisplayed()).equalTo(true)
                  assert(featureTooltip.getText()).contains('namePolygon')
                  driver.actions()
                    .mouseMove(viewport)
                    .perform()
                    .then(function () {
                      assert(featureTooltip.isDisplayed()).equalTo(true)
                      assert(featureTooltip.getText()).contains('nameLine')
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
