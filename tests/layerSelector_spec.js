const selenium = require('selenium-webdriver')
const By = selenium.By
const until = selenium.until
const customDriver = require('./customDriver')
const testing = require('selenium-webdriver/testing/')
const describe = testing.describe
const before = testing.before
const after = testing.after
const it = testing.it
const config = require('./config.js')
const assert = require('selenium-webdriver/testing/assert.js')
const waitUntilMapReady = require('./testUtils').waitUntilMapReady

// globals in browser
var map

function setLayerConfig (config, callback) {
  map.set('layerConfig', config)
  map.get('configurator').configureUI()
  map.asSoonAs('ready:ui', true, callback)
}

describe('LayerSelector', function () {
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

  it('should show a layerSelector', async function (done) {
    await driver.get(config.testClient)
    await waitUntilMapReady(driver)
    await driver.executeAsyncScript(setLayerConfig, {
      menus: {
        baseLayers: [],
        featureLayers: [{
          type: 'layer',
          refId: 0
        }]
      },
      layers: [{
        id: 0,
        title: 'layer1',
        type: 'Intern'
      }]
    })
    await driver.wait(until.elementLocated(By.className('g4u-layerselector')), config.seleniumTimeouts.script,
      'layerSelector should be visible in time')
    const layerButton = await driver.findElement(By.className('g4u-layerselector-layerbutton'))
    assert(await layerButton.getText()).equalTo('layer1')
    done()
  })

  it('should show a category button', async function (done) {
    await driver.get(config.testClient)
    await waitUntilMapReady(driver)
    await driver.executeAsyncScript(setLayerConfig, {
      menus: {
        baseLayers: [],
        featureLayers: {
          type: 'group',
          title: 'cat1',
          buttons: [
            {
              type: 'layer',
              refId: 0
            }
          ]
        }
      },
      layers: [{
        id: 0,
        title: 'layer1',
        type: 'Intern'
      }]
    })

    await driver.wait(until.elementLocated(By.className('g4u-layerselector')), config.seleniumTimeouts.script,
      'layerSelector should be visible in time')

    const category = await driver.findElement(By.className('g4u-layerselector-menu'))
    const titleButton = await category.findElement(By.className('g4u-layerselector-menu-titlebutton'))
    assert(await titleButton.isDisplayed()).equalTo(true)
    assert(await titleButton.getText()).equalTo('cat1')
    const collapseButton = await category.findElement(By.className('g4u-layerselector-menu-collapsebutton'))
    assert(await collapseButton.isDisplayed()).equalTo(true)
    await collapseButton.click()
    const layerButton = await category.findElement(By.className('g4u-layerselector-layerbutton'))
    assert(await layerButton.isDisplayed()).equalTo(true)
    assert(await layerButton.getText()).equalTo('layer1')
    await layerButton.click()
    assert(await layerButton.getAttribute('class')).contains('g4u-layerselector-menu-active')

    done()
  })
})
