import webdriver from 'selenium-webdriver'
import fs from 'fs'

let By = webdriver.By
let until = webdriver.until

export function stringifyFunctionCall (func, ...params) {
  return `return (${func.toString()})(` + params.map(JSON.stringify).join(',') + ')'
}

export function executeFunctionInPage (driver, func, ...params) {
  return driver.executeScript(stringifyFunctionCall(func, ...params))
}

export function waitUntilMapReady (driver) {
  function addReadyElement () {
    var readyMessage = document.getElementById('map-ready')
    if (readyMessage) {
      document.body.removeChild(readyMessage)
    }

    setTimeout(function () {
      var readyMessage = document.createElement('div')
      readyMessage.id = 'map-ready'
      if (!window.map) {
        throw new Error('Map does not exist after 20 ms')
      }
      window.map.asSoonAs('ready', true, function () {
        document.body.appendChild(readyMessage)
      })
    }, 20)
  }

  return new webdriver.promise.Promise(function (fulfill, reject) {
    driver.executeScript(stringifyFunctionCall(addReadyElement)).then(function () {
      driver.wait(until.elementLocated(By.id('map-ready')), 5000).then(function () {
        fulfill()
      }).thenCatch(function (err) {
        reject(err)
      })
    })
  })
}

export function saveScreenshot (driver) {
  driver.takeScreenshot()
    .then(picture => {
      fs.writeFile('screenshot.png', picture, 'base64', err => {
        throw err
      })
    })
}

export function createUid () {
  return Math.random().toString(36).substr(2, 9)
}
