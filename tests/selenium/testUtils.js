import webdriver from 'selenium-webdriver'
import fs from 'fs'

let By = webdriver.By
let until = webdriver.until

export function stringifyFunctionCall (func, ...params) {
  return `return (${func.toString()})(` + params.map(JSON.stringify).join(',') + ')'
}

export function waitUntilMapReady (driver) {
  function addReadyElement () {
    setTimeout(function () {
      var readyMessage = document.createElement('div')
      readyMessage.className = 'map-ready'
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
      driver.wait(until.elementLocated(By.className('map-ready')), 5000).then(function () {
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
        console.log(err)
      })
    })
}
