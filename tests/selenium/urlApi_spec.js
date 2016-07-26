import webdriver from 'selenium-webdriver'
import firefox from 'selenium-webdriver/firefox/'
import test from 'selenium-webdriver/testing/'
import assert from 'selenium-webdriver/testing/assert'

import config from './config.js'
let By = webdriver.By
let until = webdriver.until

let waitUntilMapReady = function (driver) {
  return new webdriver.promise.Promise(function (fulfill, reject) {
    let script = 'var readyMessage = document.createElement("div");' +
      'readyMessage.className = "map-ready";' +
      'if (!window.map) { throw new Error("Map does not exist at document ready"); }' +
      'window.map.asSoonAs("ready", true, function () { document.body.appendChild(readyMessage); });'

    driver.executeScript(script).then(function () {
      driver.wait(until.elementLocated(By.className('map-ready')), 5000).then(function () {
        fulfill()
      }).thenCatch(function (err) {
        reject(err)
      })
    })
  })
}

test.describe('URLAPI', function () {
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

  test.it('[lat, lon] should set the center of the map to the with lon and lat specified coordinates', function (done) {
    this.timeout(config.mochaTimeout)
    driver.get(config.testClient + '?lon=' + config.testVisibleCoordinate[0] + '&lat=' + config.testVisibleCoordinate[1]).then(function () {
      waitUntilMapReady(driver).then(function () {
        driver.executeScript('return ol.proj.transform(map.getView().getCenter(), "EPSG:3857", "EPSG:4326");').then(function (center) {
          assert(center[0]).closeTo(config.testVisibleCoordinate[0], 0.0001)
          assert(center[1]).closeTo(config.testVisibleCoordinate[1], 0.0001)
          done()
        })
      })
    })
  })

  // test.it('[lat, lon] if lon is missing it should not set the center of the map to the specified coordinates', function (done) {
  //   this.timeout(config.mochaTimeout)
  //   driver.get(config.testClient + '?lon=' + config.testVisibleCoordinate[0]).then(function () {
  //     waitUntilMapReady(driver).then(function () {
  //       driver.executeScript('return ol.proj.transform(map.getView().getCenter(), "EPSG:3857", "EPSG:4326");').then(function (center) {
  //         assert(Math.abs(center[0] - config.testVisibleCoordinate[0])).atLeast(0.001)
  //         assert(Math.abs(center[1] - config.testVisibleCoordinate[1])).atLeast(0.001)
  //         done()
  //       })
  //     })
  //   })
  // })
  //
  // test.it('[lat, lon] if lat is missing it should not set the center of the map to the specified coordinates', function (done) {
  //   this.timeout(config.mochaTimeout)
  //   driver.get(config.testClient + '?lat=' + config.testVisibleCoordinate[1]).then(function () {
  //     waitUntilMapReady(driver).then(function () {
  //       driver.executeScript('return ol.proj.transform(map.getView().getCenter(), "EPSG:3857", "EPSG:4326");').then(function (center) {
  //         assert(Math.abs(center[0] - config.testVisibleCoordinate[0])).atLeast(0.001)
  //         assert(Math.abs(center[1] - config.testVisibleCoordinate[1])).atLeast(0.001)
  //         done()
  //       })
  //     })
  //   })
  // })
  //
  // test.it('[rot] should rotate the map in the specified angle', function (done) {
  //   this.timeout(config.mochaTimeout)
  //   driver.get(config.testClient + '?rot=0.314').then(function () {
  //     waitUntilMapReady(driver).then(function () {
  //       driver.executeScript('return map.getView().getRotation();').then(function (rotation) {
  //         assert(rotation).closeTo(Math.PI * (0.314 / 180), 0.001)
  //         done()
  //       })
  //     })
  //   })
  // })
  //
  // test.it('[zoom] should zoom to the specified zoomfactor', function (done) {
  //   this.timeout(config.mochaTimeout)
  //   driver.get(config.testClient + '?zoom=' + config.testZoomBigger10).then(function () {
  //     waitUntilMapReady(driver).then(function () {
  //       driver.executeScript('return window.map.getView().getZoom();').then(function (zoom) {
  //         assert(zoom - 10).equalTo(config.testZoomSmaller10)
  //         done()
  //       })
  //     })
  //   })
  // })
  //
  // test.it('[marklat, marklon, marktext] should set the marker active if either marklat, marklon or marktext are set to something', function (done) {
  //   this.timeout(config.mochaTimeout)
  //   driver.get(config.testClient + '?marktext= text ').then(function () {
  //     waitUntilMapReady(driver).then(function () {
  //       driver.executeScript('return map.get("marker").getActive();').then(function (active) {
  //         assert(active).equalTo(true)
  //       })
  //     })
  //   }).then(function () {
  //     // Ist das so gewollt? Sollte das nicht analog zu lat/lon nur funktionieren, wenn beide gesetzt sind?
  //
  //     driver.get(config.testClient + '?marklon=' + config.testVisibleCoordinate[0]).then(function () {
  //       waitUntilMapReady(driver).then(function () {
  //         driver.executeScript('return map.get("marker").getActive();').then(function (active) {
  //           assert(active).equalTo(true)
  //         })
  //       })
  //     })
  //   }).then(function () {
  //     driver.get(config.testClient + '?marklat=' + config.testVisibleCoordinate[1]).then(function () {
  //       waitUntilMapReady(driver).then(function () {
  //         driver.executeScript('return map.get("marker").getActive();').then(function (active) {
  //           assert(active).equalTo(true)
  //           done()
  //         })
  //       })
  //     })
  //   })
  // })
  //
  // test.it('[marklat, marklon] should set the position of the marker to the specified coordinate', function (done) {
  //   this.timeout(config.mochaTimeout)
  //   driver.get(config.testClient + '?marklon=' + config.testVisibleCoordinate[0] + '&marklat=' + config.testVisibleCoordinate[1]).then(function () {
  //     waitUntilMapReady(driver).then(function () {
  //       driver.executeScript('return ol.proj.transform(map.get("marker").getPosition(), "EPSG:3857", "EPSG:4326");').then(function (center) {
  //         assert(center[0]).closeTo(config.testVisibleCoordinate[0], 0.0001)
  //         assert(center[1]).closeTo(config.testVisibleCoordinate[1], 0.0001)
  //         done()
  //       })
  //     })
  //   })
  // })
  //
  // test.it("[markpop, marktext] should show a feature popup on the marker if marktext is set and markpop isn't set or set to true", function (done) {
  //   this.timeout(config.mochaTimeout)
  //   driver.get(config.testClient + '?marktext= text ').then(function () {
  //     let featurePopup = driver.findElement(By.className('g4u-featurepopup'))
  //     assert(featurePopup.isDisplayed()).equalTo(true)
  //   }).then(function () {
  //     driver.get(config.testClient + '?marktext= text &markpop=true').then(function () {
  //       let featurePopup = driver.findElement(By.className('g4u-featurepopup'))
  //       assert(featurePopup.isDisplayed()).equalTo(true)
  //       done()
  //     })
  //   })
  // })
  //
  // test.it('[markpop, marktext] should not show a feature popup if marktext is not set', function (done) {
  //   this.timeout(config.mochaTimeout)
  //   driver.get(config.testClient + '?marklon=' + config.testVisibleCoordinate[0] + '&marklat=' + config.testVisibleCoordinate[1]).then(function () {
  //     let featurePopup = driver.findElement(By.className('g4u-featurepopup'))
  //     assert(featurePopup.isDisplayed()).equalTo(false)
  //   }).then(function () {
  //     driver.get(config.testClient).then(function () {
  //       let featurePopup = driver.findElement(By.className('g4u-featurepopup'))
  //       assert(featurePopup.isDisplayed()).equalTo(false)
  //       done()
  //     })
  //   })
  // })
  //
  // test.it('[markpop, marktext] should not show a feature popup if marktext is set, but markpop is set to false', function (done) {
  //   this.timeout(config.mochaTimeout)
  //   driver.get(config.testClient + '?marktext= text &markpop=false').then(function () {
  //     waitUntilMapReady(driver).then(function () {
  //       let featurePopup = driver.findElement(By.className('g4u-featurepopup'))
  //       assert(featurePopup.isDisplayed()).equalTo(false)
  //       done()
  //     })
  //   })
  // })
  //
  // test.it('[marktext] should show the text inside the feature popup that was specified with marktext', function (done) {
  //   this.timeout(config.mochaTimeout)
  //   driver.get(config.testClient + '?marktext= text text ').then(function () {
  //     waitUntilMapReady(driver).then(function () {
  //       let featurePopup = driver.findElement(By.className('g4u-featurepopup'))
  //       let content = featurePopup.findElement(By.className('g4u-window-content'))
  //       assert(content.getText()).contains('text text')
  //       done()
  //     })
  //   })
  // })
  //
  // test.it('[markpop, marktext] marker popup should have updated its size', function (done) {
  //   this.timeout(config.mochaTimeout)
  //   driver.get(config.testClient + '?marktext=texttexttexttexttext').then(function () {
  //     waitUntilMapReady(driver).then(function () {
  //       let featurePopup = driver.findElement(By.className('g4u-featurepopup'))
  //       featurePopup.getSize().then(function () {
  //         driver.executeScript('map.get("featurePopup").update();').then(function () {
  //           featurePopup.getSize().then(function (newSize) {
  //             assert(newSize).equalTo(newSize, 'comparing popup sizes')
  //             done()
  //           })
  //         })
  //       })
  //     })
  //   })
  // })
  //
  // test.it('[clsbtn] should have a close button if the parameter "clsbtn" was set to true (not neccessarily visible)', function (done) {
  //   this.timeout(config.mochaTimeout)
  //   driver.get(config.testClient + '?clsbtn=true').then(function () {
  //     waitUntilMapReady(driver).then(function () {
  //       assert(driver.isElementPresent(By.className('g4u-close-window-button'))).equalTo(true)
  //       done()
  //     })
  //   })
  // })
  //
  // test.it('[clsbtn] should not have a close button if the parameter "clsbtn" was not set or not set to true (not neccessarily visible)', function (done) {
  //   this.timeout(config.mochaTimeout)
  //   driver.get(config.testClient + '?clsbtn=false').then(function () {
  //     waitUntilMapReady(driver).then(function () {
  //       assert(driver.isElementPresent(By.className('g4u-close-window-button'))).equalTo(false)
  //     })
  //   })
  //   driver.get(config.testClient).then(function () {
  //     waitUntilMapReady(driver).then(function () {
  //       assert(driver.isElementPresent(By.className('g4u-close-window-button'))).equalTo(false)
  //       done()
  //     })
  //   })
  // })
  //
  // test.it('[avalay] should have only the (base-&feature-)layers available that were setted with the "avalay" parameter (plus the layers which have alwaysVisible)', function (done) {
  //   this.timeout(config.mochaTimeout)
  //   driver.get(config.testClient + '?avalay=' + config.testLayerIds.join(',')).then(function () {
  //     waitUntilMapReady(driver).then(function () {
  //       driver.executeScript(
  //         'var result = { available: [], alwaysVisible: [] }; ' +
  //         'window.map.get("baseLayers").recursiveForEach(function (layer) { if (layer.get("available")) { result.available.push(layer.get("id")); } if (layer.get("alwaysVisible")) { result.alwaysVisible.push(layer.get("id")); } });' +
  //         'window.map.get("featureLayers").recursiveForEach(function (layer) { if (layer.get("available")) { result.available.push(layer.get("id")); } if (layer.get("alwaysVisible")) { result.alwaysVisible.push(layer.get("id")); } });' +
  //         'return result;'
  //       ).then(function (result) {
  //         // console.log(JSON.stringify(result, null, 2))
  //         config.testLayerIds.forEach(function (id) {
  //           assert(result.available).contains(id) // TODO: check if available is available
  //         })
  //         result.available.forEach(function (id) { // TODO: check if available is available
  //           if (result.alwaysVisible.indexOf(id) < 0) { // TODO: check if alwaysVisible is available
  //             assert(config.testLayerIds).contains(id)
  //           }
  //         })
  //         done()
  //       })
  //     })
  //   })
  // })
  //
  // test.it('[avalay] if no baselayer is specified in avalay, a default baselayer should be shown.', function (done) {
  //   this.timeout(config.mochaTimeout)
  //   driver.get(config.testClient + '?avalay=' + config.testLayerIds[2]).then(function () {
  //     waitUntilMapReady(driver).then(function () {
  //       driver.executeScript(
  //         'var result = 0; ' +
  //         'window.map.get("baseLayers").recursiveForEach(function (layer) { if (layer.get("available")) { result++; } });' +
  //         'return result;'
  //       ).then(function (result) {
  //         assert(result === 1)
  //         done()
  //       })
  //     })
  //   })
  // })
  //
  // test.it('[vislay] should have only the (base- & feature-)layers visible that were setted with the "vislay" parameter', function (done) {
  //   this.timeout(config.mochaTimeout)
  //   driver.get(config.testClient + '?vislay=' + config.testLayerIds.join(',')).then(function () {
  //     waitUntilMapReady(driver).then(function () {
  //       driver.executeScript(
  //         'var vislay=[]; ' +
  //         'map.get("baseLayers").getLayers().forEach(function (layer) { if (!layer.recursiveForEach && layer.getVisible() && !layer.get("alwaysVisible")) { vislay.push(layer.get("id")); } });' +
  //         'map.get("featureLayers").recursiveForEach(function (layer) { if (!layer.recursiveForEach && layer.getVisible() && !layer.get("alwaysVisible")) { vislay.push(layer.get("id")); } });' +
  //         'return vislay;'
  //       ).then(function (vislay) {
  //         config.testLayerIds.forEach(function (id) {
  //           assert(vislay).contains(id)
  //         })
  //         vislay.forEach(function (id) { // TODO: check if foreEach is available
  //           assert(config.testLayerIds).contains(id)
  //         })
  //         done()
  //       })
  //     })
  //   })
  // })
  //
  // test.it('[responsive] should be responsive if the parameter "responsive" was set to true', function (done) {
  //   this.timeout(config.mochaTimeout)
  //   driver.get(config.testClient + '?responsive=true').then(function () {
  //     waitUntilMapReady(driver).then(function () {
  //       driver.executeScript('return map.get("responsive");').then(function (responsive) {
  //         assert(responsive).equalTo(true)
  //         done()
  //       })
  //     })
  //   })
  // })
  //
  // test.it('[responsive] should not be responsive if the parameter "responsive" was set to false', function (done) {
  //   this.timeout(config.mochaTimeout)
  //   driver.get(config.testClient + '?responsive=false').then(function () {
  //     waitUntilMapReady(driver).then(function () {
  //       driver.executeScript('return map.get("responsive");').then(function (responsive) {
  //         assert(responsive).equalTo(false)
  //         done()
  //       })
  //     })
  //   })
  // })
  //
  // // test.it('[conf] should use the with "conf" specified config file', function (done) {
  // //   this.timeout(config.mochaTimeout)
  // //   driver.get(config.testClient + '?conf=' + config.testMiniMapConfigFile).then(function () {
  // //     waitUntilMapReady(driver).then(function () {
  // //       driver.executeScript('return map.get("configFileName");').then(function (configFileName) {
  // //         assert(configFileName).equalTo(config.testMiniMapConfigFile)
  // //         assert(driver.isElementPresent(By.className('g4u-layerselector'))).equalTo(false)
  // //         done()
  // //       })
  // //     })
  // //   })
  // // })
  // //
  // // test.it('[layconf] should use the alternative layer conf specified with the "layconf" parameter', function (done) {
  // //   this.timeout(config.mochaTimeout)
  // //   driver.get(config.testClient + '?layconf=' + config.testLayerConfigFile).then(function () {
  // //     waitUntilMapReady(driver).then(function () {
  // //       driver.executeScript('return map.get("layerConfigFileName");').then(function (layerConfigFileName) {
  // //         assert(layerConfigFileName).equalTo(config.testLayerConfigFile)
  // //         done()
  // //       })
  // //     })
  // //   })
  // // })
  //
  // test.it('[lang] should set the language of the map to the language provided with the "lang" parameter', function (done) {
  //   this.timeout(config.mochaTimeout)
  //   driver.get(config.testClient + '?lang=en').then(function () {
  //     waitUntilMapReady(driver).then(function () {
  //       driver.executeScript('return map.get("localiser").getCurrentLang();').then(function (lang) {
  //         assert(lang).equalTo('en')
  //       })
  //     })
  //   })
  //   driver.get(config.testClient + '?lang=de').then(function () {
  //     waitUntilMapReady(driver).then(function () {
  //       driver.executeScript('return map.get("localiser").getCurrentLang();').then(function (lang) {
  //         assert(lang).equalTo('de')
  //       })
  //     })
  //   })
  //   done()
  // })
})
