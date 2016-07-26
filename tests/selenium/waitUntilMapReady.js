import webdriver from 'selenium-webdriver'

let By = webdriver.By
let until = webdriver.until

module.exports = function (driver) {
  return new webdriver.promise.Promise(function (fulfill, reject) {
    let script = 'setTimeout(function () {' +
      'var readyMessage = document.createElement("div");' +
      'readyMessage.className = "map-ready";' +
      'if (!window.map) { throw new Error("Map does not exist at document ready"); }' +
      'window.map.asSoonAs("ready", true, function () { document.body.appendChild(readyMessage); });' +
      '}, 20)'

    driver.executeScript(script).then(function () {
      driver.wait(until.elementLocated(By.className('map-ready')), 5000).then(function () {
        fulfill()
      }).thenCatch(function (err) {
        reject(err)
      })
    })
  })
}
