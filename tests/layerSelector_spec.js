import {By, until} from 'selenium-webdriver'
import phantomDriver from './customPhantomDriver'
import {describe, before, after, it} from 'selenium-webdriver/testing/'
import assert from 'selenium-webdriver/testing/assert.js'
import config from './config.js'
import {executeFunctionInPage, waitUntilMapReady} from './testUtils'

// globals in browser
var map

function waitUntilSetFeatureLayers (driver, featureLayers) {
  function setFeatureLayers (_featureLayers) {
    var layerConf = map.get('layerConfig')
    layerConf.baseLayers = []
    layerConf.featureLayers = _featureLayers
    map.get('configurator').configureMap()
  }

  return executeFunctionInPage(driver, setFeatureLayers, featureLayers)
    .then(waitUntilMapReady(driver))
}

describe('LayerSelector', function () {
  this.timeout(config.mochaTimeout)
  let driver

  before(function () {
    driver = phantomDriver()
    driver.manage().window().setSize(1200, 800)
    driver.manage().timeouts().implicitlyWait(config.seleniumTimeout)
    driver.manage().timeouts().pageLoadTimeout(config.seleniumTimeout)
  })

  after(function () {
    driver.quit()
  })

  it('should show a layerSelector', function (done) {
    driver.get(config.testClient).then(
      waitUntilMapReady(driver)
    ).then(
      waitUntilSetFeatureLayers(driver, [
        {
          id: 0,
          title: 'layer1',
          type: 'Intern',
          source: {}
        }
      ])
    ).then(
      driver.wait(until.elementLocated(By.className('g4u-layerselector')), config.seleniumTimeout,
        'layerSelector should be visible in time')
    ).then(function () {
      var layerButton = driver.findElement(By.className('g4u-layerselector-layerbutton'))
      assert(layerButton.getText()).equalTo('layer1')
    }).then(
      done
    )
  })

  it('should show a category button', function (done) {
    driver.get(config.testClient).then(
      waitUntilMapReady(driver)
    ).then(
      waitUntilSetFeatureLayers(driver, [
        {
          id: 0,
          title: 'cat1',
          type: 'Category',
          layers: [
            {
              id: 1,
              title: 'layer1',
              type: 'Intern',
              source: {}
            }
          ]
        }
      ])
    ).then(
      driver.wait(until.elementLocated(By.className('g4u-layerselector')), config.seleniumTimeout,
        'layerSelector should be visible in time')
    ).then(function () {
      var category = driver.findElement(By.className('g4u-layerselector-menu'))
      var titleButton = category.findElement(By.className('g4u-layerselector-menu-titlebutton'))
      assert(titleButton.isDisplayed()).equalTo(true)
      assert(titleButton.getText()).equalTo('cat1')
      var collapseButton = category.findElement(By.className('g4u-layerselector-menu-collapsebutton'))
      assert(collapseButton.isDisplayed()).equalTo(true)
      return collapseButton.click().then(function () {
        var layerButton = category.findElement(By.className('g4u-layerselector-layerbutton'))
        assert(layerButton.isDisplayed()).equalTo(true)
        assert(layerButton.getText()).equalTo('layer1')
        return layerButton.click().then(function () {
          assert(layerButton.getAttribute('class')).contains('g4u-layerselector-menu-active')
        })
      })
    }).then(
      done
    )
  })
})
