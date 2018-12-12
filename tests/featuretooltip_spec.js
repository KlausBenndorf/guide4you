import { By, until } from 'selenium-webdriver'
import customDriver from './customDriver'
import { describe, before, after, it } from 'selenium-webdriver/testing/'
import config from './config.js'
import assert from 'selenium-webdriver/testing/assert.js'

import { stringifyFunctionCall, waitUntilMapReady } from './testUtils'

// globals in browser
var map

function addLayerWithPointAtMapCenter (name, description) {
  map.getView().setCenter([0, 0])
  map.get('api').addFeatureLayer({
    id: 42,
    type: 'Intern',
    source: {
      features: [
        {
          name: name,
          description: description,
          geometryWKT: 'POINT(0 0)'
        }
      ]
    },
    visible: true
  })
}

function addLayerWithLineThroughMapCenter (name, description) {
  map.getView().setCenter([0, 0])
  map.get('api').addFeatureLayer({
    id: 43,
    type: 'Intern',
    source: {
      features: [
        {
          name: name,
          description: description,
          geometryWKT: 'LINESTRING(-1000 -1000,1000 1000)'
        }
      ]
    },
    visible: true
  })
}

function addLayerWithPolygonAroundMapCenter (name, description) {
  map.getView().setCenter([0, 0])
  map.get('api').addFeatureLayer({
    id: 44,
    type: 'Intern',
    source: {
      features: [
        {
          name: name,
          description: description,
          geometryWKT: 'POLYGON((-1000 -1000,-1000 1000,1000 1000,1000 -1000,-1000 -1000))'
        }
      ]
    },
    visible: true
  })
}

describe('FeatureTooltip', function () {
  this.timeout(config.mochaTimeout)
  let driver

  before(function () {
    driver = customDriver()
    driver.manage().window().setSize(1200, 800)
    driver.manage().setTimeouts({
      script: config.seleniumTimeout,
      implicit: config.seleniumTimeout,
      pageLoad: config.seleniumTimeout
    })
  })

  after(function () {
    driver.quit()
  })

  it('should show no tooltip if there is no feature under the mouse', function (done) {
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

  it('should 1: show a tooltip with the name of the feature if there is a point feature under the mouse and 2:' +
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

  it('should 1: show a tooltip with the name of the feature if there is a line feature under the mouse ' +
    'and 2: hide the tooltip again if the mouse moves somewhere else', function (done) {
    driver.get(config.testClient).then(() => {
      return waitUntilMapReady(driver)
    }).then(() => {
      return driver.executeScript(stringifyFunctionCall(addLayerWithLineThroughMapCenter, 'name', 'description'))
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

  it('should 1: show a tooltip with the name of the feature if there is a polygon feature under the mouse ' +
    'and 2: hide the tooltip again if the mouse moves somewhere else', function (done) {
    driver.get(config.testClient).then(() => {
      return waitUntilMapReady(driver)
    }).then(() => {
      return driver.executeScript(
        stringifyFunctionCall(addLayerWithPolygonAroundMapCenter, 'name', 'description'))
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

  it('should show the tooltip of a point lying under a polygon', function (done) {
    driver.get(config.testClient).then(function () {
      waitUntilMapReady(driver).then(() => {
        return driver.executeScript(stringifyFunctionCall(addLayerWithPointAtMapCenter, 'namePoint', 'description'))
      }).then(() => {
        return driver.executeScript(
          stringifyFunctionCall(addLayerWithPolygonAroundMapCenter, 'namePolygon', 'description'))
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

  it('should show the tooltip of a line lying under a polygon', function (done) {
    driver.get(config.testClient).then(() => {
      waitUntilMapReady(driver).then(() => {
        return driver.executeScript(
          stringifyFunctionCall(addLayerWithLineThroughMapCenter, 'nameLine', 'description'))
      }).then(() => {
        return driver.executeScript(
          stringifyFunctionCall(addLayerWithPolygonAroundMapCenter, 'namePolygon', 'description'))
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
