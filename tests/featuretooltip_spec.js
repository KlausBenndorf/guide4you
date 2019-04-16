import webdriver from 'selenium-webdriver'
import phantomDriver from './customPhantomDriver'
import test from 'selenium-webdriver/testing/'
import assert from 'selenium-webdriver/testing/assert.js'
import config from './config.js'
import until from 'selenium-webdriver/lib/until'

import { stringifyFunctionCall, waitUntilMapReady } from './testUtils'

let By = webdriver.By

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
  this.timeout(config.mochaTimeout)
  let driver

  test.before(function () {
    driver = phantomDriver()
    driver.manage().window().setSize(1200, 800)
    driver.manage().timeouts().implicitlyWait(config.seleniumTimeout)
    driver.manage().timeouts().pageLoadTimeout(config.seleniumTimeout)
  })

  test.after(function () {
    driver.quit()
  })

  test.it('should show no tooltip if there is no feature under the mouse', function (done) {
    driver.get(config.testClient).then(function () {
      waitUntilMapReady(driver).then(function () {
        driver.actions()
          .mouseMove(driver.findElement(By.className('ol-viewport')))
          .perform()
          .then(function () {
            assert(driver.findElement(By.className('g4u-featuretooltip'),
              'Tooltip should not be visible').isDisplayed()).equalTo(false)
            done()
          })
      })
    })
  })

  test.it('should 1: show a tooltip with the name of the feature if there is a point feature under the mouse and 2:' +
    ' should hide the tooltip if the mouse moves somewhere else', function (done) {
    driver.get(config.testClient).then(() => {
      return waitUntilMapReady(driver)
    }).then(() => {
      return driver.executeScript(stringifyFunctionCall(addLayerWithPointAtMapCenter, 'name', 'description'))
    }).then(() => {
      let viewport = driver.findElement(By.className('ol-viewport'))
      let featureTooltip = driver.findElement(By.className('g4u-featuretooltip'))
      // 1:
      driver.actions()
        .mouseMove(viewport)
        .perform()
        .then(() => {
          driver.wait(until.elementIsVisible(featureTooltip),
            config.seleniumTimeout, 'Tooltip should be visible in time')
          assert(featureTooltip.getText(), 'Tooltip should show "name"').equalTo('name')
          // 2:
          return driver.actions()
            .mouseMove(viewport, { x: 0, y: 0 })
            .perform()
        }).then(() => {
          driver.wait(until.elementIsNotVisible(featureTooltip),
            config.seleniumTimeout, 'Tooltip should be hidden in time')
          done()
        })
    })
  })

  test.it('should 1: show a tooltip with the name of the feature if there is a line feature under the mouse ' +
    'and 2: hide the tooltip again if the mouse moves somewhere else', function (done) {
    driver.get(config.testClient).then(() => {
      return waitUntilMapReady(driver)
    }).then(() => {
      return driver.executeScript(stringifyFunctionCall(addLayerWithLineThroughMapCenter, 'name', 'description', 1000))
    }).then(() => {
      let viewport = driver.findElement(By.className('ol-viewport'))
      let featureTooltip = driver.findElement(By.className('g4u-featuretooltip'))
      // 1:
      driver.actions()
        .mouseMove(viewport)
        .perform()
        .then(() => {
          driver.wait(until.elementIsVisible(featureTooltip),
            config.seleniumTimeout, 'Tooltip should be visible in time')
          assert(featureTooltip.getText(), 'Tooltip should show "name"').equalTo('name')
          // 2:
          return driver.actions()
            .mouseMove(viewport, { x: 0, y: 0 })
            .perform()
        }).then(() => {
          driver.wait(until.elementIsNotVisible(featureTooltip),
            config.seleniumTimeout, 'Tooltip should be hidden in time')
          done()
        })
    })
  })

  test.it('should 1: show a tooltip with the name of the feature if there is a polygon feature under the mouse ' +
    'and 2: hide the tooltip again if the mouse moves somewhere else', function (done) {
    driver.get(config.testClient).then(() => {
      return waitUntilMapReady(driver)
    }).then(() => {
      return driver.executeScript(
        stringifyFunctionCall(addLayerWithPolygonAroundMapCenter, 'name', 'description', 1000))
    }).then(() => {
      let viewport = driver.findElement(By.className('ol-viewport'))
      let featureTooltip = driver.findElement(By.className('g4u-featuretooltip'))
      // 1:
      driver.actions()
        .mouseMove(viewport)
        .perform()
        .then(() => {
          driver.wait(until.elementIsVisible(featureTooltip),
            config.seleniumTimeout, 'Tooltip should be visible in time')
          assert(featureTooltip.getText(), 'Tooltip should show "name"').equalTo('name')
          // 2:
          return driver.actions()
            .mouseMove(viewport, { x: 0, y: 0 })
            .perform()
        }).then(() => {
          driver.wait(until.elementIsNotVisible(featureTooltip),
            config.seleniumTimeout, 'Tooltip should be hidden in time')
          done()
        })
    })
  })

  test.it('should show the tooltip of a point lying under a polygon', function (done) {
    driver.get(config.testClient).then(function () {
      waitUntilMapReady(driver).then(() => {
        return driver.executeScript(stringifyFunctionCall(addLayerWithPointAtMapCenter, 'namePoint', 'description'))
      }).then(() => {
        return driver.executeScript(
          stringifyFunctionCall(addLayerWithPolygonAroundMapCenter, 'namePolygon', 'description', 1000))
      }).then(() => {
        let viewport = driver.findElement(By.className('ol-viewport'))
        let featureTooltip = driver.findElement(By.className('g4u-featuretooltip'))
        viewport.getSize().then(size => {
          // 1:
          driver.actions()
            .mouseMove(viewport, { x: Math.round(size.width / 2 + 15), y: Math.round(size.height / 2 + 15) })
            .perform()
            .then(() => {
              driver.wait(until.elementIsVisible(featureTooltip),
                config.seleniumTimeout, 'Tooltip should be visible in time')
              assert(featureTooltip.getText(), 'Tooltip should show "namePolygon"').equalTo('namePolygon')
              // 2:
              return driver.actions()
                .mouseMove(viewport)
                .perform()
            }).then(() => {
              driver.wait(until.elementTextIs(featureTooltip, 'namePoint'),
                config.seleniumTimeout, 'Tooltip should show "namePoint"')
              assert(featureTooltip.isDisplayed(), 'Tooltip should be visible').equalTo(true)
              done()
            })
        })
      })
    })
  })

  test.it('should show the tooltip of a line lying under a polygon', function (done) {
    driver.get(config.testClient).then(() => {
      waitUntilMapReady(driver).then(() => {
        return driver.executeScript(
          stringifyFunctionCall(addLayerWithLineThroughMapCenter, 'nameLine', 'description', 1000))
      }).then(() => {
        return driver.executeScript(
          stringifyFunctionCall(addLayerWithPolygonAroundMapCenter, 'namePolygon', 'description', 1000))
      }).then(() => {
        let viewport = driver.findElement(By.className('ol-viewport'))
        let featureTooltip = driver.findElement(By.className('g4u-featuretooltip'))
        viewport.getSize().then(size => {
          driver.actions()
            .mouseMove(viewport, { x: Math.round(size.width / 2 + 15), y: Math.round(size.height / 2 + 15) })
            .perform()
            .then(() => {
              driver.wait(until.elementIsVisible(featureTooltip),
                config.seleniumTimeout, 'Tooltip should be visible in time')
              assert(featureTooltip.getText(), 'Tooltip should show "namePolygon"').equalTo('namePolygon')
              return driver.actions()
                .mouseMove(viewport)
                .perform()
            }).then(() => {
              driver.wait(until.elementTextIs(featureTooltip, 'nameLine'),
                config.seleniumTimeout, 'Tooltip should show "nameLine"')
              assert(featureTooltip.isDisplayed(), 'Tooltip should be visible').equalTo(true)
              done()
            })
        })
      })
    })
  })
})
