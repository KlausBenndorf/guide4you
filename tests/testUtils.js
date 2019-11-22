function waitUntilMapReady (driver) {
  return driver.executeAsyncScript(function (callback) {
    setTimeout(function () {
      if (!window.map) {
        // eslint-disable-next-line standard/no-callback-literal
        callback('Map does not exist after 20 ms')
        return
      }
      const t = setTimeout(function () {
        // eslint-disable-next-line standard/no-callback-literal
        callback('Map not ready after 5000 ms')
      }, 5000)
      window.map.asSoonAs('ready', true, function () {
        clearTimeout(t)
        callback(null)
      })
    }, 20)
  }).then(function (message) {
    if (message !== null) {
      driver.manage().logs().get('browser').then(function (logs) {
        if (logs) {
          logs.forEach(function (log) {
            console.log('browser log: ' + log.level + ': ' + log.message) // eslint-disable-line no-console
          })
        }
      })
      throw new Error(message)
    }
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
