function waitUntilMapReady (driver) {
  return new Promise(function (resolve, reject) {
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
        resolve()
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

// export function saveScreenshot (driver) {
//   driver.takeScreenshot()
//     .then(picture => {
//       writeFile('screenshot.png', picture, 'base64', err => {
//         throw err
//       })
//     })
// }
//
// export function createUid () {
//   return Math.random().toString(36).substr(2, 9)
// }

module.exports = {
  waitUntilMapReady
}
