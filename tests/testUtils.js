import {promise} from 'selenium-webdriver'
import {writeFile} from 'fs'

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
          callback('READY')
        }
        if (!window.map) {
          callback('NOEXIST')
        }
        const t = setTimeout(function () {
          callback('NOREADY')
        }, 2000)
        window.map.asSoonAs('ready', true, function () {
          clearTimeout(t)
          callback('READY')
        })
      }, 20)
    }).then(function (val) {
      if (val === 'READY') {
        fulfill()
      } else {
        driver.manage().logs().get('browser').then(function (logs) {
          if (logs) {
            logs.forEach(function (log) {
              console.log('g4u log ' + log.level + ': ' + log.message) // eslint-disable-line no-console
            })
          }
        })
        if (val === 'NOEXIST') {
          reject('Map does not exist after 20 ms')
        } else if (val === 'NOREADY') {
          reject('Map not ready after 2000 ms')
        } else {
          reject('Unknown value')
        }
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
