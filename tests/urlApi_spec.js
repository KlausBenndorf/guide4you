const selenium = require('selenium-webdriver')
const By = selenium.By
const until = selenium.until
const customDriver = require('./customDriver')
const testing = require('selenium-webdriver/testing/')
const describe = testing.describe
const before = testing.before
const after = testing.after
const it = testing.it
const xit = testing.xit
const config = require('./config.js')
const assert = require('selenium-webdriver/testing/assert.js')
const waitUntilMapReady = require('./testUtils').waitUntilMapReady

// globals in browser
var map

describe('URLAPI', function () {
  this.timeout(config.mochaTimeout)
  let driver

  before(function () {
    driver = customDriver()
    driver.manage().window().setSize(1200, 800)
    driver.manage().setTimeouts(config.seleniumTimeouts)
  })

  after(function () {
    driver.quit()
  })

  it('[lat, lon] should set the center of the map to the specified coordinates',
    async function (done) {
      await driver.get(config.testClient + '?lon=0&lat=0')
      await waitUntilMapReady(driver)
      const center = await driver.executeScript(function () {
        return map.getView().getCenter()
      })

      assert(center[0]).closeTo(0, 0.0001)
      assert(center[1]).closeTo(0, 0.0001)
      done()
    })

  it('[lat, lon] if lon is missing it should not set the center of the map to the specified coordinates',
    async function (done) {
      await driver.get(config.testClient + '?lon=0')
      await waitUntilMapReady(driver)
      const center = driver.executeScript(function () {
        return map.getView().getCenter()
      })
      assert(Math.abs(center[0])).atLeast(0.001)
      assert(Math.abs(center[1])).atLeast(0.001)
      done()
    })

  it('[lat, lon] if lat is missing it should not set the center of the map to the specified coordinates',
    async function (done) {
      await driver.get(config.testClient + '?lat=0')
      await waitUntilMapReady(driver)
      const center = driver.executeScript(function () {
        return map.getView().getCenter()
      })
      assert(Math.abs(center[0])).atLeast(0.001)
      assert(Math.abs(center[1])).atLeast(0.001)
      done()
    })

  it('[rot] should rotate the map in the specified angle', async function (done) {
    driver.get(config.testClient + '?rot=0.314')
    await waitUntilMapReady(driver)

    const rotation = driver.executeScript(function () {
      return map.getView().getRotation()
    })

    assert(rotation).closeTo(Math.PI * (0.314 / 180), 0.001)
    done()
  })

  xit('[zoom] should zoom to 16', async function (done) {
    await driver.get(config.testClient + '?zoom=16')
    await waitUntilMapReady(driver)

    const zoom = await driver.executeScript(function () {
      return window.map.getView().getZoom()
    })
    assert(zoom).equalTo(16)
    done()
  })

  it('[zoom] should zoom to 8', async function (done) {
    await driver.get(config.testClient + '?zoom=8')
    await waitUntilMapReady(driver)

    const zoom = driver.executeScript(function () {
      return window.map.getView().getZoom()
    })
    assert(zoom).equalTo(8)
    done()
  })

  it('[marktext] should set the marker active', async function (done) {
    await driver.get(config.testClient + '?marktext= text ')
    await waitUntilMapReady(driver)

    const active = driver.executeScript(function () {
      return map.get('marker').getActive()
    })
    assert(active).equalTo(true)
    done()
  })

  it('[marklat] should set the marker active', async function (done) {
    await driver.get(config.testClient + '?marklat=0')
    await waitUntilMapReady(driver)

    const active = driver.executeScript(function () {
      return map.get('marker').getActive()
    })
    assert(active).equalTo(true)
    done()
  })

  it('[marklon] should set the marker active', async function (done) {
    await driver.get(config.testClient + '?marklon=0')
    await waitUntilMapReady(driver)
    const active = driver.executeScript(function () {
      return map.get('marker').getActive()
    })
    assert(active).equalTo(true)
    done()
  })

  it('[marklat, marklon] should set the position of the marker to the specified coordinate', async function (done) {
    await driver.get(config.testClient + '?marklon=0&marklat=0')
    await waitUntilMapReady(driver)

    const markerPos = await driver.executeScript(function () {
      return map.get('marker').getPosition() //, 'EPSG:3857', 'EPSG:4326')
    })

    assert(markerPos[0]).closeTo(0, 0.0001)
    assert(markerPos[1]).closeTo(0, 0.0001)
    done()
  })

  it('[markpop, marktext] should show a feature popup on the marker if marktext is set and markpop isn\'t set',
    async function (done) {
      await driver.get(config.testClient + '?marktext= text ')
      await waitUntilMapReady(driver)

      await driver.wait(until.elementIsVisible(driver.findElement(By.className('g4u-featurepopup'))))
      done()
    })

  it('[markpop, marktext] should show a feature popup on the marker if marktext is set and markpop is set to true',
    async function (done) {
      await driver.get(config.testClient + '?marktext= text &markpop=true')
      await waitUntilMapReady(driver)

      await driver.wait(until.elementIsVisible(driver.findElement(By.className('g4u-featurepopup'))))
      done()
    })

  it('[markpop, marktext] should not show a feature popup if marktext is not set (1)', async function (done) {
    await driver.get(config.testClient + '?marklon=0&marklat=0')
    await waitUntilMapReady(driver)

    const featurePopup = await driver.findElement(By.className('g4u-featurepopup'))
    assert(await featurePopup.isDisplayed()).equalTo(false)
    done()
  })

  it('[markpop, marktext] should not show a feature popup if marktext is not set (2)', async function (done) {
    await driver.get(config.testClient)
    await waitUntilMapReady(driver)

    const featurePopup = await driver.findElement(By.className('g4u-featurepopup'))
    assert(await featurePopup.isDisplayed()).equalTo(false)
    done()
  })

  it('[markpop, marktext] should not show a feature popup if marktext is set, but markpop is set to false',
    async function (done) {
      await driver.get(config.testClient + '?marktext= text &markpop=false')
      await waitUntilMapReady(driver)

      const featurePopup = driver.findElement(By.className('g4u-featurepopup'))
      assert(await featurePopup.isDisplayed()).equalTo(false)
      done()
    })

  it('[marktext] should show the text inside the feature popup that was specified with marktext',
    async function (done) {
      await driver.get(config.testClient + '?marktext= text text ')
      await waitUntilMapReady(driver)

      const featurePopup = await driver.findElement(By.className('g4u-featurepopup'))
      await driver.wait(until.elementIsVisible(featurePopup))
      const content = await featurePopup.findElement(By.className('g4u-window-content'))
      assert(await content.getText()).contains('text text')
      done()
    })

  it('[markpop, marktext] marker popup should have updated its size', async function (done) {
    await driver.get(config.testClient + '?marktext=texttexttexttexttext')
    await waitUntilMapReady(driver)

    const featurePopup = await driver.findElement(By.className('g4u-featurepopup'))
    driver.wait(until.elementIsVisible(featurePopup))
    const oldSize = await featurePopup.getSize()
    await driver.executeScript(function () {
      map.get('featurePopup').update()
    })

    const newSize = await featurePopup.getSize()
    assert(oldSize[0]).equalTo(newSize[0], 'comparing popup width')
    assert(oldSize[1]).equalTo(newSize[1], 'comparing popup height')
    done()
  })

  it('[clsbtn] should have a close button if the parameter "clsbtn" was set to true (not neccessarily visible)',
    async function (done) {
      await driver.get(config.testClient + '?clsbtn=true')
      await waitUntilMapReady(driver)

      driver.wait(until.elementLocated(By.className('g4u-close-window-button')))
      done()
    })

  it('[clsbtn] should not have a close button if the parameter "clsbtn" was not set to true ' +
    '(not neccessarily visible)', async function (done) {
    await driver.get(config.testClient + '?clsbtn=false')
    await waitUntilMapReady(driver)

    // return assert(driver.isElementPresent(By.className('g4u-close-window-button'))).equalTo(false)
    const found = await driver.findElements(By.className('g4u-close-window-button'))
    assert(found.length).equalTo(0)
    done()
  })

  it('[clsbtn] should not have a close button if the parameter "clsbtn" was not set ' +
    '(not neccessarily visible)', async function (done) {
    await driver.get(config.testClient)
    await waitUntilMapReady(driver)

    // return assert(driver.isElementPresent(By.className('g4u-close-window-button'))).equalTo(false)
    const found = await driver.findElements(By.className('g4u-close-window-button'))
    assert(found.length).equalTo(0)
    done()
  })

  it('[avalay] should have only the (base-&feature-)layers available that were setted with the "avalay"' +
    ' parameter (plus the layers which have alwaysVisible)', async function (done) {
    function getLayerAvailabilities () {
      var result = { available: [], alwaysVisible: [] }
      var forEachLayer = function (layer) {
        if (layer.get('available')) {
          result.available.push(layer.get('id'))
        }
        if (layer.get('alwaysVisible')) {
          result.alwaysVisible.push(layer.get('id'))
        }
      }
      map.getLayerGroup().recursiveForEach(forEachLayer)
      return result
    }

    await driver.get(config.testClient + '?avalay=' + config.testLayerIds.join(','))
    await waitUntilMapReady(driver)

    const result = await driver.executeScript(getLayerAvailabilities)

    // console.log(JSON.stringify(result, null, 2))
    config.testLayerIds.forEach(function (id) {
      assert(result.available).contains(id)
    })
    result.available.forEach(function (id) {
      if (result.alwaysVisible.indexOf(id) < 0) {
        assert(config.testLayerIds).contains(id)
      }
    })
    done()
  })

  xit('[avalay] if no baselayer is specified in avalay, a default baselayer should be shown.', async function (done) {
    function countAvailableBaseLayers () {
      var result = 0
      map.get('baseLayers').recursiveForEach(function (layer) {
        if (layer.get('available')) {
          result++
        }
      })
      return result
    }

    await driver.get(config.testClient + '?avalay=' + config.testLayerIds[2])
    await waitUntilMapReady(driver)

    const result = await driver.executeScript(countAvailableBaseLayers)

    assert(result).equalTo(1)
    done()
  })

  it('[vislay] should have only the (base- & feature-)layers visible that were setted with the "vislay" parameter',
    async function (done) {
      function getLayerVisibilities () {
        var vislay = []
        map.getLayerGroup().recursiveForEach(function (layer) {
          if (!layer.recursiveForEach && layer.getVisible() && !layer.get('alwaysVisible') &&
            layer.get('id') !== undefined) {
            vislay.push(layer.get('id'))
          }
        })
        return vislay
      }

      await driver.get(config.testClient + '?vislay=' + config.testLayerIds.join(','))
      await waitUntilMapReady(driver)

      const vislay = await driver.executeScript(getLayerVisibilities)

      config.testLayerIds.forEach(id => assert(vislay).contains(id))
      vislay.forEach(id => assert(config.testLayerIds).contains(id))
      done()
    })

  it('[responsive] should be responsive if the parameter "responsive" was set to true', async function (done) {
    await driver.get(config.testClient + '?responsive=true')
    await waitUntilMapReady(driver)

    const responsive = await driver.executeScript(function () {
      return map.get('responsive')
    })

    assert(responsive).equalTo(true)
    done()
  })

  it('[responsive] should not be responsive if the parameter "responsive" was set to false', async function (done) {
    this.timeout(config.mochaTimeout)
    await driver.get(config.testClient + '?responsive=false')
    await waitUntilMapReady(driver)

    const responsive = await driver.executeScript(function () {
      return map.get('responsive')
    })
    assert(responsive).equalTo(false)
    done()
  })

  // it('[conf] should use the with "conf" specified config file', async function (done) {
  //   this.timeout(config.mochaTimeout)
  //   await driver.get(config.testClient + '?conf=' + config.testMiniMapConfigFile)
  //     waitUntilMapReady(driver).then(function () {
  //       driver.executeScript('return map.get("configFileName");').then(function (configFileName) {
  //         assert(configFileName).equalTo(config.testMiniMapConfigFile)
  //         //assert(driver.isElementPresent(By.className('g4u-layerselector'))).equalTo(false)
  //         assert(driver.findElements(By.className('g4u-layerselector')).then(found => !!found.length)).equalTo(false)
  //         done()
  //       })
  //     })
  //   })
  // })
  //
  // it('[layconf] should use the alternative layer conf specified with the "layconf" parameter',
  // async function (done) {
  //   this.timeout(config.mochaTimeout)
  //   await driver.get(config.testClient + '?layconf=' + config.testLayerConfigFile)
  //     waitUntilMapReady(driver).then(function () {
  //       driver.executeScript('return map.get("layerConfigFileName");').then(function (layerConfigFileName) {
  //         assert(layerConfigFileName).equalTo(config.testLayerConfigFile)
  //         done()
  //       })
  //     })
  //   })
  // })

  it('[lang] should set the language of the map to the language provided with the "lang" parameter',
    async function (done) {
      await driver.get(config.testClient + '?lang=en')
      await waitUntilMapReady(driver)

      let lang = await driver.executeScript(function () {
        return map.get('localiser').getCurrentLang()
      })

      assert(lang).equalTo('en')

      await driver.get(config.testClient + '?lang=de')

      await waitUntilMapReady(driver)

      lang = await driver.executeScript(function () {
        return map.get('localiser').getCurrentLang()
      })
      assert(lang).equalTo('de')
      done()
    })
})
