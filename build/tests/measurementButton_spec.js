/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("selenium-webdriver");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stringifyFunctionCall = stringifyFunctionCall;
exports.executeFunctionInPage = executeFunctionInPage;
exports.waitUntilMapReady = waitUntilMapReady;
exports.saveScreenshot = saveScreenshot;
exports.createUid = createUid;

var _seleniumWebdriver = __webpack_require__(0);

var _fs = __webpack_require__(1);

function stringifyFunctionCall(func) {
  for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }

  return 'return (' + func.toString() + ')(' + params.map(JSON.stringify).join(',') + ')';
}

function executeFunctionInPage(driver, func) {
  for (var _len2 = arguments.length, params = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    params[_key2 - 2] = arguments[_key2];
  }

  return driver.executeScript(stringifyFunctionCall.apply(undefined, [func].concat(params)));
}

function waitUntilMapReady(driver) {
  return new _seleniumWebdriver.promise.Promise(function (fulfill, reject) {
    driver.executeAsyncScript(function (callback) {
      setTimeout(function () {
        if (window.test) {
          callback(null);
        }
        if (!window.map) {
          callback(new Error('Map does not exist after 20 ms'));
        }
        var t = setTimeout(function () {
          callback(new Error('Map not ready after 2000 ms'));
        }, 2000);
        window.map.asSoonAs('ready', true, function () {
          clearTimeout(t);
          callback(null);
        });
      }, 20);
    }).then(function (err) {
      if (err === null) {
        fulfill();
      } else {
        driver.manage().logs().get('browser').then(function (logs) {
          if (logs) {
            logs.forEach(function (log) {
              console.log('g4u log ' + log.level + ': ' + log.message); // eslint-disable-line no-console
            });
          }
        });
        reject(err);
      }
    });
  });
}

function saveScreenshot(driver) {
  driver.takeScreenshot().then(function (picture) {
    (0, _fs.writeFile)('screenshot.png', picture, 'base64', function (err) {
      throw err;
    });
  });
}

function createUid() {
  return Math.random().toString(36).substr(2, 9);
}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("selenium-webdriver/testing/");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("phantomjs-prebuilt");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return new _seleniumWebdriver2.default.Builder().withCapabilities(customPhantom).build();
  // return new webdriver.Builder().forBrowser('firefox').build()
};

var _seleniumWebdriver = __webpack_require__(0);

var _seleniumWebdriver2 = _interopRequireDefault(_seleniumWebdriver);

var _phantomjsPrebuilt = __webpack_require__(4);

var _phantomjsPrebuilt2 = _interopRequireDefault(_phantomjsPrebuilt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var customPhantom = _seleniumWebdriver2.default.Capabilities.phantomjs();
customPhantom.set('phantomjs.binary.path', _phantomjsPrebuilt2.default.path);

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("selenium-webdriver/testing/assert.js");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  testClient: 'http://localhost:8089/dist/',
  mochaTimeout: 10000,
  seleniumTimeouts: {
    script: 1000,
    implicit: 1000,
    pageLoad: 1000
  }
};

/***/ }),
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _seleniumWebdriver = __webpack_require__(0);

var _seleniumWebdriver2 = _interopRequireDefault(_seleniumWebdriver);

var _customDriver = __webpack_require__(5);

var _customDriver2 = _interopRequireDefault(_customDriver);

var _testing = __webpack_require__(3);

var _testing2 = _interopRequireDefault(_testing);

var _assert = __webpack_require__(6);

var _assert2 = _interopRequireDefault(_assert);

var _config = __webpack_require__(7);

var _config2 = _interopRequireDefault(_config);

var _testUtils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var By = _seleniumWebdriver2.default.By;
var ActionSequence = _seleniumWebdriver2.default.ActionSequence;

function getPixelFromCoordinate(coordinate) {
  return window.map.getPixelFromCoordinate(coordinate);
}

_testing2.default.describe('measurementButton', function () {
  // before and after ///////////////////////////////////////////////////////

  var driver = void 0;

  _testing2.default.before(function () {
    this.timeout(_config2.default.mochaTimeout);
    driver = (0, _customDriver2.default)();
    driver.manage().window().setSize(1200, 800);
    driver.manage().setTimeouts(_config2.default.seleniumTimeouts);
  });

  _testing2.default.after(function () {
    driver.quit();
  });
  // functions //////////////////////////////////////////////////////////////

  // let checkButtonIsPresent = function (name) {
  //   test.it(`should have ${name} measurement button`, function (done) {
  //     this.timeout(config.mochaTimeout)
  //     driver.get(config.testClient)
  //       .then(function () {
  //         waitUntilMapReady(driver)
  //           .then(function () {
  //             driver
  //               .findElement(By.css(`.g4u-window-decorator.g4u-${name}-measurement`))
  //             done()
  //           })
  //       })
  //   })
  // }
  //
  // let windowInitallyHidden = function (name) {
  //   test.it(`should initially hide ${name} measurement window `, function (done) {
  //     this.timeout(config.mochaTimeout)
  //     driver.get(config.testClient)
  //       .then(function () {
  //         waitUntilMapReady(driver)
  //           .then(function () {
  //             driver
  //               .findElement(
  //                 By.css(`.g4u-window-decorator.g4u-${name}-measurement`)
  //             )
  //               .then(function () {
  //                 driver
  //                   .findElement(
  //                     By.css(`.g4u-window-component.g4u-${name}-measurement`)
  //                 )
  //                   .isDisplayed()
  //                   .then(
  //                     function (visible) {
  //                       if (!visible) {
  //                         done()
  //                       }
  //                     })
  //               })
  //           })
  //       })
  //   })
  // }
  //
  // let windowDisplaysWhenButtonIsClicked = function (name) {
  //   test.it('should display area measurement window when corresponding button is clicked', function (done) {
  //     this.timeout(config.mochaTimeout)
  //     driver.get(config.testClient)
  //       .then(function () {
  //         waitUntilMapReady(driver)
  //           .then(function () {
  //             driver
  //               .findElement(
  //                 By.css(`.g4u-window-decorator.g4u-${name}-measurement`)
  //             )
  //               .click()
  //               .then(function () {
  //                 driver
  //                   .findElement(
  //                     By.css(`.g4u-window-component.g4u-${name}-measurement`)
  //                 )
  //                   .isDisplayed()
  //                   .then(
  //                     function (visible) {
  //                       if (visible) {
  //                         done()
  //                       }
  //                     })
  //               })
  //           })
  //       })
  //   })
  // }

  // perform tests //////////////////////////////////////////////////////////
  /*
      ['area', 'distance'].forEach( name => {
          checkButtonIsPresent(name)
          windowInitallyHidden(name)
          windowDisplaysWhenButtonIsClicked(name)
      })
  */

  _testing2.default.it('distance measurement tool returns reasonable', function (done) {
    this.timeout(_config2.default.mochaTimeout);
    driver.get(_config2.default.testClient).then(function () {
      return (0, _testUtils.waitUntilMapReady)(driver);
    }).then(function () {
      return driver.findElement(By.css('.g4u-distance-measurement .g4u-control-mainbutton')).click();
    }).then(function () {
      var visible = driver.findElement(By.css('.g4u-distance-measurement .g4u-window')).isDisplayed();
      (0, _assert2.default)(visible, 'distance measurement window should be visible').isEqualTo(true);
      driver.executeScript((0, _testUtils.stringifyFunctionCall)(getPixelFromCoordinate, [773466.7463450996, 6610915.166693036])).then(function (point1) {
        driver.executeScript((0, _testUtils.stringifyFunctionCall)(getPixelFromCoordinate, [775715.4000591239, 6610915.166693036])).then(function (point2) {
          return driver.findElement(By.className('ol-viewport')).then(function (element) {
            // console.log(point1)
            // console.log(point2)
            return new ActionSequence(driver).mouseMove(element, { x: point1[0], y: point1[1] }).click().mouseMove(element, { x: point2[0], y: point2[1] }).click().perform();
          }).then(function () {
            return driver.findElement(By.css('.g4u-distance-measurement-value > span')).getText();
          }).then(function (text) {
            // console.log('>' + text + '<')
            done();
          });
        });
      });
    });
  });
});

/***/ })
/******/ ]);