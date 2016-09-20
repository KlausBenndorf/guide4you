import webdriver from 'selenium-webdriver'
import phantomDriver from 'guide4you/tests/selenium/customPhantomDriver'
import test from 'selenium-webdriver/testing/'
import assert from 'selenium-webdriver/testing/assert'
import until from 'selenium-webdriver/lib/until'

import config from './config.js'
let By = webdriver.By

import {stringifyFunctionCall, waitUntilMapReady} from 'guide4you/tests/selenium/testUtils'

// globals in browser
var map, ol

function getMapCenter () {
  return ol.proj.transform(map.getView().getCenter(), 'EPSG:3857', 'EPSG:4326')
}

test.describe('URLAPI', function () {
  this.timeout(config.mochaTimeout)
  let driver

  test.before(function () {
    driver = phantomDriver()
    driver.manage().window().setSize(1200, 800)
    driver.manage().timeouts().implicitlyWait(config.seleniumTimeout)
  })

  test.after(function () {
    driver.quit()
  })

  test.it('[lat, lon] should set the center of the map to the with lon and lat specified coordinates', function (done) {
    driver.get(config.testClient + '?lon=' + config.testVisibleCoordinate[0] + '&lat=' +
      config.testVisibleCoordinate[1]).then(() => {
        return waitUntilMapReady(driver)
      }).then(() => {
        return driver.executeScript(stringifyFunctionCall(getMapCenter))
      }).then(center => {
        assert(center[0]).closeTo(config.testVisibleCoordinate[0], 0.0001)
        assert(center[1]).closeTo(config.testVisibleCoordinate[1], 0.0001)
        done()
      })
  })

  test.it('[lat, lon] if lon is missing it should not set the center of the map to the specified coordinates',
    function (done) {
      driver.get(config.testClient + '?lon=' + config.testVisibleCoordinate[0]).then(() => {
        return waitUntilMapReady(driver)
      }).then(() => {
        return driver.executeScript(stringifyFunctionCall(getMapCenter))
      }).then(center => {
        assert(Math.abs(center[0] - config.testVisibleCoordinate[0])).atLeast(0.001)
        assert(Math.abs(center[1] - config.testVisibleCoordinate[1])).atLeast(0.001)
        done()
      })
    })

  test.it('[lat, lon] if lat is missing it should not set the center of the map to the specified coordinates',
    function (done) {
      driver.get(config.testClient + '?lat=' + config.testVisibleCoordinate[1]).then(() => {
        return waitUntilMapReady(driver)
      }).then(() => {
        return driver.executeScript(stringifyFunctionCall(getMapCenter))
      }).then(center => {
        assert(Math.abs(center[0] - config.testVisibleCoordinate[0])).atLeast(0.001)
        assert(Math.abs(center[1] - config.testVisibleCoordinate[1])).atLeast(0.001)
        done()
      })
    })

  test.it('[rot] should rotate the map in the specified angle', function (done) {
    driver.get(config.testClient + '?rot=0.314').then(() => {
      return waitUntilMapReady(driver)
    }).then(() => {
      return driver.executeScript('return map.getView().getRotation();')
    }).then(rotation => {
      assert(rotation).closeTo(Math.PI * (0.314 / 180), 0.001)
      done()
    })
  })

  test.it('[zoom] should zoom to the specified zoomfactor', function (done) {
    driver.get(config.testClient + '?zoom=' + config.testZoomBigger10).then(() => {
      return waitUntilMapReady(driver)
    }).then(() => {
      return driver.executeScript('return window.map.getView().getZoom();')
    }).then(zoom => {
      assert(zoom - 10).equalTo(config.testZoomSmaller10)
      done()
    })
  })

  test.it('[marklat, marklon, marktext] should set the marker active if either marklat, marklon or marktext' +
    ' are set to something', function (done) {
    function getMarkerActive () {
      return driver.executeScript('return map.get("marker").getActive();')
    }

    driver.get(config.testClient + '?marktext= text ').then(
      waitUntilMapReady(driver)
    ).then(() => {
      return assert(getMarkerActive()).equalTo(true)
    }).then(() => {
      // Ist das so gewollt? Sollte das nicht analog zu lat/lon nur funktionieren, wenn beide gesetzt sind?
      return driver.get(config.testClient + '?marklon=' + config.testVisibleCoordinate[0]).then(
        waitUntilMapReady(driver)
      ).then(() => {
        return assert(getMarkerActive()).equalTo(true)
      })
    }).then(() => {
      return driver.get(config.testClient + '?marklat=' + config.testVisibleCoordinate[1]).then(
        waitUntilMapReady(driver)
      ).then(() => {
        return assert(getMarkerActive()).equalTo(true)
      })
    }).then(done)
  })

  test.it('[marklat, marklon] should set the position of the marker to the specified coordinate', function (done) {
    driver.get(config.testClient + '?marklon=' + config.testVisibleCoordinate[0] + '&marklat=' +
      config.testVisibleCoordinate[1]).then(() => {
        return waitUntilMapReady(driver)
      }).then(() => {
        return driver.executeScript(
          'return ol.proj.transform(map.get("marker").getPosition(), "EPSG:3857", "EPSG:4326");')
      }).then(markerPos => {
        assert(markerPos[0]).closeTo(config.testVisibleCoordinate[0], 0.0001)
        assert(markerPos[1]).closeTo(config.testVisibleCoordinate[1], 0.0001)
        done()
      })
  })

  test.it('[markpop, marktext] should show a feature popup on the marker if marktext is set and markpop isn\'t set',
    function (done) {
      driver.get(config.testClient + '?marktext= text ').then(
        waitUntilMapReady(driver)
      ).then(() => {
        driver.wait(until.elementIsVisible(driver.findElement(By.className('g4u-featurepopup'))))
      }).then(done)
    })

  test.it('[markpop, marktext] should show a feature popup on the marker if marktext is set and markpop is set to true',
    function (done) {
      driver.get(config.testClient + '?marktext= text &markpop=true').then(() => {
        return waitUntilMapReady(driver)
      }).then(() => {
        driver.wait(until.elementIsVisible(driver.findElement(By.className('g4u-featurepopup'))))
      }).then(done)
    })

  test.it('[markpop, marktext] should not show a feature popup if marktext is not set (1)', function (done) {
    driver.get(config.testClient + '?marklon=' + config.testVisibleCoordinate[0] + '&marklat=' +
      config.testVisibleCoordinate[1]).then(() => {
        return waitUntilMapReady(driver)
      }).then(() => {
        let featurePopup = driver.wait(until.elementLocated(By.className('g4u-featurepopup')))
        assert(featurePopup.isDisplayed()).equalTo(false)
      }).then(done)
  })

  test.it('[markpop, marktext] should not show a feature popup if marktext is not set (2)', function (done) {
    driver.get(config.testClient).then(() => {
      return waitUntilMapReady(driver)
    }).then(() => {
      let featurePopup = driver.wait(until.elementLocated(By.className('g4u-featurepopup')))
      assert(featurePopup.isDisplayed()).equalTo(false)
    }).then(done)
  })

  test.it('[markpop, marktext] should not show a feature popup if marktext is set, but markpop is set to false',
    function (done) {
      driver.get(config.testClient + '?marktext= text &markpop=false').then(() => {
        return waitUntilMapReady(driver)
      }).then(() => {
        let featurePopup = driver.wait(until.elementLocated(By.className('g4u-featurepopup')))
        assert(featurePopup.isDisplayed()).equalTo(false)
        done()
      })
    })

  test.it('[marktext] should show the text inside the feature popup that was specified with marktext',
    function (done) {
      driver.get(config.testClient + '?marktext= text text ').then(() => {
        return waitUntilMapReady(driver)
      }).then(() => {
        let featurePopup = driver.findElement(By.className('g4u-featurepopup'))
        driver.wait(until.elementIsVisible(featurePopup))
        let content = featurePopup.findElement(By.className('g4u-window-content'))
        assert(content.getText()).contains('text text')
        done()
      })
    })

  test.it('[markpop, marktext] marker popup should have updated its size', function (done) {
    driver.get(config.testClient + '?marktext=texttexttexttexttext').then(() => {
      return waitUntilMapReady(driver)
    }).then(() => {
      let featurePopup = driver.findElement(By.className('g4u-featurepopup'))
      driver.wait(until.elementIsVisible(featurePopup))
      featurePopup.getSize().then(oldSize => {
        driver.executeScript('map.get("featurePopup").update();').then(() => {
          featurePopup.getSize().then(newSize => {
            assert(oldSize[0]).equalTo(newSize[0], 'comparing popup width')
            assert(oldSize[1]).equalTo(newSize[1], 'comparing popup height')
            done()
          })
        })
      })
    })
  })

  test.it('[clsbtn] should have a close button if the parameter "clsbtn" was set to true (not neccessarily visible)',
    function (done) {
      driver.get(config.testClient + '?clsbtn=true').then(() => {
        return waitUntilMapReady(driver)
      }).then(() => {
        driver.wait(until.elementLocated(By.className('g4u-close-window-button')))
        done()
      })
    })

  test.it('[clsbtn] should not have a close button if the parameter "clsbtn" was not set to true ' +
    '(not neccessarily visible)', function (done) {
    driver.get(config.testClient + '?clsbtn=false').then(() => {
      return waitUntilMapReady(driver)
    }).then(() => {
      return assert(driver.isElementPresent(By.className('g4u-close-window-button'))).equalTo(false)
    }).then(done)
  })

  test.it('[clsbtn] should not have a close button if the parameter "clsbtn" was not set ' +
    '(not neccessarily visible)', function (done) {
    driver.get(config.testClient).then(() => {
      return waitUntilMapReady(driver)
    }).then(() => {
      return assert(driver.isElementPresent(By.className('g4u-close-window-button'))).equalTo(false)
    })
    .then(done)
  })

  test.it('[avalay] should have only the (base-&feature-)layers available that were setted with the "avalay"' +
    ' parameter (plus the layers which have alwaysVisible)', function (done) {
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
      map.get('baseLayers').recursiveForEach(forEachLayer)
      map.get('featureLayers').recursiveForEach(forEachLayer)
      return result
    }

    driver.get(config.testClient + '?avalay=' + config.testLayerIds.join(',')).then(() => {
      return waitUntilMapReady(driver)
    }).then(() => {
      return driver.executeScript(stringifyFunctionCall(getLayerAvailabilities))
    }).then(result => {
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
  })

  test.it('[avalay] if no baselayer is specified in avalay, a default baselayer should be shown.', function (done) {
    function countAvailableBaseLayers () {
      var result = 0
      map.get('baseLayers').recursiveForEach(function (layer) {
        if (layer.get('available')) {
          result++
        }
      })
      return result
    }

    driver.get(config.testClient + '?avalay=' + config.testLayerIds[2]).then(() => {
      return waitUntilMapReady(driver)
    }).then(() => {
      return driver.executeScript(stringifyFunctionCall(countAvailableBaseLayers))
    }).then(result => {
      assert(result).equalTo(1)
      done()
    })
  })

  test.it('[vislay] should have only the (base- & feature-)layers visible that were setted with the "vislay" parameter',
    function (done) {
      function getLayerVisibilities () {
        var vislay = []
        var forEachLayer = function (layer) {
          if (!layer.recursiveForEach && layer.getVisible() && !layer.get('alwaysVisible')) {
            vislay.push(layer.get('id'))
          }
        }
        map.get('baseLayers').recursiveForEach(forEachLayer)
        map.get('featureLayers').recursiveForEach(forEachLayer)
        return vislay
      }

      driver.get(config.testClient + '?vislay=' + config.testLayerIds.join(',')).then(() => {
        return waitUntilMapReady(driver)
      }).then(() => {
        return driver.executeScript(stringifyFunctionCall(getLayerVisibilities))
      }).then(vislay => {
        config.testLayerIds.forEach(id => assert(vislay).contains(id))
        vislay.forEach(id => assert(config.testLayerIds).contains(id))
        done()
      })
    })

  test.it('[responsive] should be responsive if the parameter "responsive" was set to true', function (done) {
    driver.get(config.testClient + '?responsive=true').then(() => {
      return waitUntilMapReady(driver)
    }).then(() => {
      return driver.executeScript('return map.get("responsive");')
    }).then(responsive => {
      assert(responsive).equalTo(true)
      done()
    })
  })

  test.it('[responsive] should not be responsive if the parameter "responsive" was set to false', function (done) {
    this.timeout(config.mochaTimeout)
    driver.get(config.testClient + '?responsive=false').then(() => {
      return waitUntilMapReady(driver)
    }).then(() => {
      return driver.executeScript('return map.get("responsive");')
    }).then(responsive => {
      assert(responsive).equalTo(false)
      done()
    })
  })

  // test.it('[conf] should use the with "conf" specified config file', function (done) {
  //   this.timeout(config.mochaTimeout)
  //   driver.get(config.testClient + '?conf=' + config.testMiniMapConfigFile).then(function () {
  //     waitUntilMapReady(driver).then(function () {
  //       driver.executeScript('return map.get("configFileName");').then(function (configFileName) {
  //         assert(configFileName).equalTo(config.testMiniMapConfigFile)
  //         assert(driver.isElementPresent(By.className('g4u-layerselector'))).equalTo(false)
  //         done()
  //       })
  //     })
  //   })
  // })
  //
  // test.it('[layconf] should use the alternative layer conf specified with the "layconf" parameter', function (done) {
  //   this.timeout(config.mochaTimeout)
  //   driver.get(config.testClient + '?layconf=' + config.testLayerConfigFile).then(function () {
  //     waitUntilMapReady(driver).then(function () {
  //       driver.executeScript('return map.get("layerConfigFileName");').then(function (layerConfigFileName) {
  //         assert(layerConfigFileName).equalTo(config.testLayerConfigFile)
  //         done()
  //       })
  //     })
  //   })
  // })

  test.it('[lang] should set the language of the map to the language provided with the "lang" parameter',
    function (done) {
      driver.get(config.testClient + '?lang=en').then(() => {
        return waitUntilMapReady(driver)
      }).then(() => {
        return driver.executeScript('return map.get("localiser").getCurrentLang();')
      }).then(lang => {
        assert(lang).equalTo('en')
      }).then(() => {
        return driver.get(config.testClient + '?lang=de')
      }).then(() => {
        return waitUntilMapReady(driver)
      }).then(() => {
        return driver.executeScript('return map.get("localiser").getCurrentLang();')
      }).then(lang => {
        assert(lang).equalTo('de')
      }).then(done)
    })
})
