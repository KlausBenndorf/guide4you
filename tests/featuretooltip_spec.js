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

function addPoint (name, description, done) {
  map.getView().setCenter([1, 1])
  map.api.places.add('POINT(1 1)', name, description)
  window.requestAnimationFrame(done)
}

function addLine (name, description, done) {
  map.getView().setCenter([1, 1])
  map.api.places.add('LINESTRING(-500 -500, 500 500)', name, description)
  window.requestAnimationFrame(done)
}

function addPolygon (name, description, done) {
  map.getView().setCenter([1, 1])
  map.api.places.add('POLYGON((-500 -500, -500 500, 500 500, 500 -500, -500 -500))', name, description)
  window.requestAnimationFrame(done)
}

describe('FeatureTooltip', function () {
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

  it('should show no tooltip if there is no feature under the mouse', async function (done) {
    await driver.get(config.testClient)
    await waitUntilMapReady(driver)
    await driver.actions()
      .mouseMove(driver.findElement(By.className('ol-viewport')))
      .perform()
    const element = await driver.findElement(By.className('g4u-featuretooltip'))
    const displayed = await element.isDisplayed()
    assert(displayed, 'Tooltip should not be visible').equalTo(false)
    done()
  })

  it('should 1: show a tooltip with the name of the feature if there is a point feature under the mouse and 2:' +
    ' should hide the tooltip if the mouse moves somewhere else', async function (done) {
    await driver.get(config.testClient)
    await waitUntilMapReady(driver)
    await driver.executeAsyncScript(addPoint, 'name', 'description')
    const viewport = await driver.findElement(By.className('ol-viewport'))
    const featureTooltip = await driver.findElement(By.className('g4u-featuretooltip'))
    // 1:
    await driver.actions()
      .mouseMove(viewport)
      .perform()
    await driver.wait(until.elementIsVisible(featureTooltip),
      config.seleniumTimeouts.script, 'Tooltip should be visible in time')
    assert(await featureTooltip.getText(), 'Tooltip should show "name"').equalTo('name')
    // 2:
    await driver.actions()
      .mouseMove(viewport, { x: 0, y: 0 })
      .perform()

    await driver.wait(until.elementIsNotVisible(featureTooltip),
      config.seleniumTimeouts.script, 'Tooltip should be hidden in time')
    done()
  })

  it('should 1: show a tooltip with the name of the feature if there is a line feature under the mouse ' +
    'and 2: hide the tooltip again if the mouse moves somewhere else', async function (done) {
    await driver.get(config.testClient)
    await waitUntilMapReady(driver)
    await driver.executeAsyncScript(addLine, 'name', 'description')

    const viewport = await driver.findElement(By.className('ol-viewport'))
    const featureTooltip = await driver.findElement(By.className('g4u-featuretooltip'))
    // 1:
    await driver.actions()
      .mouseMove(viewport)
      .perform()
    await driver.wait(until.elementIsVisible(featureTooltip),
      config.seleniumTimeouts.script, 'Tooltip should be visible in time')
    assert(await featureTooltip.getText(), 'Tooltip should show "name"').equalTo('name')
    // 2:
    await driver.actions()
      .mouseMove(viewport, { x: 0, y: 0 })
      .perform()

    await driver.wait(until.elementIsNotVisible(featureTooltip),
      config.seleniumTimeouts.script, 'Tooltip should be hidden in time')
    done()
  })

  it('should 1: show a tooltip with the name of the feature if there is a polygon feature under the mouse ' +
    'and 2: hide the tooltip again if the mouse moves somewhere else', async function (done) {
    await driver.get(config.testClient)
    await waitUntilMapReady(driver)
    await driver.executeAsyncScript(addPolygon, 'name', 'description')

    const viewport = await driver.findElement(By.className('ol-viewport'))
    const featureTooltip = await driver.findElement(By.className('g4u-featuretooltip'))
    // 1:
    await driver.actions()
      .mouseMove(viewport)
      .perform()
    await driver.wait(until.elementIsVisible(featureTooltip),
      config.seleniumTimeouts.script, 'Tooltip should be visible in time')
    assert(await featureTooltip.getText(), 'Tooltip should show "name"').equalTo('name')
    // 2:
    await driver.actions()
      .mouseMove(viewport, { x: 0, y: 0 })
      .perform()

    await driver.wait(until.elementIsNotVisible(featureTooltip),
      config.seleniumTimeouts.script, 'Tooltip should be hidden in time')
    done()
  })

  it('should show the tooltip of a point lying under a polygon', async function (done) {
    await driver.get(config.testClient)
    await waitUntilMapReady(driver)
    await driver.executeAsyncScript(addPoint, 'namePoint', 'description')
    await driver.executeAsyncScript(addPolygon, 'namePolygon', 'description')

    const viewport = await driver.findElement(By.className('ol-viewport'))
    const featureTooltip = await driver.findElement(By.className('g4u-featuretooltip'))

    const size = await viewport.getSize()
    // 1:
    await driver.actions()
      .mouseMove(viewport, { x: Math.round(size.width / 2 + 15), y: Math.round(size.height / 2 + 15) })
      .perform()

    await driver.wait(until.elementIsVisible(featureTooltip),
      config.seleniumTimeouts.script, 'Tooltip should be visible in time')
    assert(await featureTooltip.getText(), 'Tooltip should show "namePolygon"').equalTo('namePolygon')
    // 2:
    await driver.actions()
      .mouseMove(viewport)
      .perform()

    await driver.wait(until.elementTextIs(featureTooltip, 'namePoint'),
      config.seleniumTimeouts.script, 'Tooltip should show "namePoint"')
    assert(await featureTooltip.isDisplayed(), 'Tooltip should be visible').equalTo(true)
    done()
  })

  it('should show the tooltip of a line lying under a polygon', async function (done) {
    await driver.get(config.testClient)
    await waitUntilMapReady(driver)
    await driver.executeAsyncScript(addLine, 'nameLine', 'description')
    await driver.executeAsyncScript(addPolygon, 'namePolygon', 'description')

    const viewport = await driver.findElement(By.className('ol-viewport'))
    const featureTooltip = await driver.findElement(By.className('g4u-featuretooltip'))

    const size = await viewport.getSize()
    await driver.actions()
      .mouseMove(viewport, { x: Math.round(size.width / 2 + 15), y: Math.round(size.height / 2 + 15) })
      .perform()

    await driver.wait(until.elementIsVisible(featureTooltip),
      config.seleniumTimeouts.script, 'Tooltip should be visible in time')
    assert(await featureTooltip.getText(), 'Tooltip should show "namePolygon"').equalTo('namePolygon')
    await driver.actions()
      .mouseMove(viewport)
      .perform()

    await driver.wait(until.elementTextIs(featureTooltip, 'nameLine'),
      config.seleniumTimeouts.script, 'Tooltip should show "nameLine"')
    assert(await featureTooltip.isDisplayed(), 'Tooltip should be visible').equalTo(true)
    done()
  })
})
