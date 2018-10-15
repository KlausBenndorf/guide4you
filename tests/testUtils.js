import { promise } from 'selenium-webdriver'
import { writeFile } from 'fs'

export function stringifyFunctionCall (func, ...params) {
  return `return (${func.toString()})(` + params.map(JSON.stringify).join(',') + ')'
}

export function executeFunctionInPage (driver, func, ...params) {
  return driver.executeScript(stringifyFunctionCall(func, ...params))
}

export function waitUntilMapReady (driver) {
  return new promise.Promise(function (fulfill, reject) {
    driver.executeAsyncScript(function (callback) {
      setTimeout(function () {
        if (window.test) {
          callback(null)
        }
        if (!window.map) {
          callback(new Error('Map does not exist after 20 ms'))
        }
        const t = setTimeout(function () {
          callback(new Error('Map not ready after 2000 ms'))
        }, 2000)
        window.map.asSoonAs('ready', true, function () {
          clearTimeout(t)
          callback(null)
        })
      }, 20)
    }).then(function (err) {
      if (err === null) {
        fulfill()
      } else {
        driver.manage().logs().get('browser').then(function (logs) {
          if (logs) {
            logs.forEach(function (log) {
              console.log('g4u log ' + log.level + ': ' + log.message) // eslint-disable-line no-console
            })
          }
        })
        reject(err)
      }
    })
  })
}

export function saveScreenshot (driver) {
  driver.takeScreenshot()
    .then(picture => {
      writeFile('screenshot.png', picture, 'base64', err => {
        throw err
      })
    })
}

export function createUid () {
  return Math.random().toString(36).substr(2, 9)
}
