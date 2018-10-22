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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
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
  mochaTimeout: 5000,
  seleniumTimeout: 5000
};

/***/ }),
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _seleniumWebdriver = __webpack_require__(0);

var _customPhantomDriver = __webpack_require__(5);

var _customPhantomDriver2 = _interopRequireDefault(_customPhantomDriver);

var _testing = __webpack_require__(3);

var _config = __webpack_require__(7);

var _config2 = _interopRequireDefault(_config);

var _assert = __webpack_require__(6);

var _assert2 = _interopRequireDefault(_assert);

var _testUtils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// globals in browser
var map, ol;

function addLayerWithPointAtMapCenter(name, description) {
  map.addLayer(new ol.layer.Vector({
    source: new ol.source.Vector({
      features: [new ol.Feature({
        name: name,
        description: description,
        geometry: new ol.geom.Point(map.getView().getCenter())
      })]
    }),
    visible: true
  }));
}

function addLayerWithLineThroughMapCenter(name, description, edgeLength) {
  var center = map.getView().getCenter();
  var points = [[center[0] - edgeLength / 2, center[1] - edgeLength / 2], [center[0] + edgeLength / 2, center[1] + edgeLength / 2]];
  map.addLayer(new ol.layer.Vector({
    source: new ol.source.Vector({
      features: [new ol.Feature({
        name: name,
        description: description,
        geometry: new ol.geom.LineString(points)
      })]
    }),
    visible: true
  }));
}

function addLayerWithPolygonAroundMapCenter(name, description, edgeLength) {
  var center = map.getView().getCenter();
  var points = [[[center[0] - edgeLength / 2, center[1] - edgeLength / 2], [center[0] - edgeLength / 2, center[1] + edgeLength / 2], [center[0] + edgeLength / 2, center[1] + edgeLength / 2], [center[0] + edgeLength / 2, center[1] - edgeLength / 2]]];
  map.addLayer(new ol.layer.Vector({
    source: new ol.source.Vector({
      features: [new ol.Feature({
        name: name,
        description: description,
        geometry: new ol.geom.Polygon(points)
      })]
    }),
    visible: true
  }));
}

(0, _testing.describe)('FeatureTooltip', function () {
  this.timeout(_config2.default.mochaTimeout);
  var driver = void 0;

  (0, _testing.before)(function () {
    driver = (0, _customPhantomDriver2.default)();
    driver.manage().window().setSize(1200, 800);
    driver.manage().setTimeouts({
      script: _config2.default.seleniumTimeout,
      implicit: _config2.default.seleniumTimeout,
      pageLoad: _config2.default.seleniumTimeout
    });
  });

  (0, _testing.after)(function () {
    driver.quit();
  });

  (0, _testing.it)('should show no tooltip if there is no feature under the mouse', function (done) {
    driver.get(_config2.default.testClient).then(function () {
      (0, _testUtils.waitUntilMapReady)(driver).then(function () {
        driver.actions().mouseMove(driver.findElement(_seleniumWebdriver.By.className('ol-viewport'))).perform().then(function () {
          (0, _assert2.default)(driver.findElement(_seleniumWebdriver.By.className('g4u-featuretooltip'), 'Tooltip should not be visible').isDisplayed()).equalTo(false);
          done();
        });
      });
    });
  });

  (0, _testing.it)('should 1: show a tooltip with the name of the feature if there is a point feature under the mouse and 2:' + ' should hide the tooltip if the mouse moves somewhere else', function (done) {
    driver.get(_config2.default.testClient).then(function () {
      return (0, _testUtils.waitUntilMapReady)(driver);
    }).then(function () {
      return driver.executeScript((0, _testUtils.stringifyFunctionCall)(addLayerWithPointAtMapCenter, 'name', 'description'));
    }).then(function () {
      var viewport = driver.findElement(_seleniumWebdriver.By.className('ol-viewport'));
      var featureTooltip = driver.findElement(_seleniumWebdriver.By.className('g4u-featuretooltip'));
      // 1:
      driver.actions().mouseMove(viewport).perform().then(function () {
        driver.wait(_seleniumWebdriver.until.elementIsVisible(featureTooltip), _config2.default.seleniumTimeout, 'Tooltip should be visible in time');
        (0, _assert2.default)(featureTooltip.getText(), 'Tooltip should show "name"').equalTo('name');
        // 2:
        return driver.actions().mouseMove(viewport, { x: 0, y: 0 }).perform();
      }).then(function () {
        driver.wait(_seleniumWebdriver.until.elementIsNotVisible(featureTooltip), _config2.default.seleniumTimeout, 'Tooltip should be hidden in time');
        done();
      });
    });
  });

  (0, _testing.it)('should 1: show a tooltip with the name of the feature if there is a line feature under the mouse ' + 'and 2: hide the tooltip again if the mouse moves somewhere else', function (done) {
    driver.get(_config2.default.testClient).then(function () {
      return (0, _testUtils.waitUntilMapReady)(driver);
    }).then(function () {
      return driver.executeScript((0, _testUtils.stringifyFunctionCall)(addLayerWithLineThroughMapCenter, 'name', 'description', 1000));
    }).then(function () {
      var viewport = driver.findElement(_seleniumWebdriver.By.className('ol-viewport'));
      var featureTooltip = driver.findElement(_seleniumWebdriver.By.className('g4u-featuretooltip'));
      // 1:
      driver.actions().mouseMove(viewport).perform().then(function () {
        driver.wait(_seleniumWebdriver.until.elementIsVisible(featureTooltip), _config2.default.seleniumTimeout, 'Tooltip should be visible in time');
        (0, _assert2.default)(featureTooltip.getText(), 'Tooltip should show "name"').equalTo('name');
        // 2:
        return driver.actions().mouseMove(viewport, { x: 0, y: 0 }).perform();
      }).then(function () {
        driver.wait(_seleniumWebdriver.until.elementIsNotVisible(featureTooltip), _config2.default.seleniumTimeout, 'Tooltip should be hidden in time');
        done();
      });
    });
  });

  (0, _testing.it)('should 1: show a tooltip with the name of the feature if there is a polygon feature under the mouse ' + 'and 2: hide the tooltip again if the mouse moves somewhere else', function (done) {
    driver.get(_config2.default.testClient).then(function () {
      return (0, _testUtils.waitUntilMapReady)(driver);
    }).then(function () {
      return driver.executeScript((0, _testUtils.stringifyFunctionCall)(addLayerWithPolygonAroundMapCenter, 'name', 'description', 1000));
    }).then(function () {
      var viewport = driver.findElement(_seleniumWebdriver.By.className('ol-viewport'));
      var featureTooltip = driver.findElement(_seleniumWebdriver.By.className('g4u-featuretooltip'));
      // 1:
      driver.actions().mouseMove(viewport).perform().then(function () {
        driver.wait(_seleniumWebdriver.until.elementIsVisible(featureTooltip), _config2.default.seleniumTimeout, 'Tooltip should be visible in time');
        (0, _assert2.default)(featureTooltip.getText(), 'Tooltip should show "name"').equalTo('name');
        // 2:
        return driver.actions().mouseMove(viewport, { x: 0, y: 0 }).perform();
      }).then(function () {
        driver.wait(_seleniumWebdriver.until.elementIsNotVisible(featureTooltip), _config2.default.seleniumTimeout, 'Tooltip should be hidden in time');
        done();
      });
    });
  });

  (0, _testing.it)('should show the tooltip of a point lying under a polygon', function (done) {
    driver.get(_config2.default.testClient).then(function () {
      (0, _testUtils.waitUntilMapReady)(driver).then(function () {
        return driver.executeScript((0, _testUtils.stringifyFunctionCall)(addLayerWithPointAtMapCenter, 'namePoint', 'description'));
      }).then(function () {
        return driver.executeScript((0, _testUtils.stringifyFunctionCall)(addLayerWithPolygonAroundMapCenter, 'namePolygon', 'description', 1000));
      }).then(function () {
        var viewport = driver.findElement(_seleniumWebdriver.By.className('ol-viewport'));
        var featureTooltip = driver.findElement(_seleniumWebdriver.By.className('g4u-featuretooltip'));
        viewport.getSize().then(function (size) {
          // 1:
          driver.actions().mouseMove(viewport, { x: Math.round(size.width / 2 + 15), y: Math.round(size.height / 2 + 15) }).perform().then(function () {
            driver.wait(_seleniumWebdriver.until.elementIsVisible(featureTooltip), _config2.default.seleniumTimeout, 'Tooltip should be visible in time');
            (0, _assert2.default)(featureTooltip.getText(), 'Tooltip should show "namePolygon"').equalTo('namePolygon');
            // 2:
            return driver.actions().mouseMove(viewport).perform();
          }).then(function () {
            driver.wait(_seleniumWebdriver.until.elementTextIs(featureTooltip, 'namePoint'), _config2.default.seleniumTimeout, 'Tooltip should show "namePoint"');
            (0, _assert2.default)(featureTooltip.isDisplayed(), 'Tooltip should be visible').equalTo(true);
            done();
          });
        });
      });
    });
  });

  (0, _testing.it)('should show the tooltip of a line lying under a polygon', function (done) {
    driver.get(_config2.default.testClient).then(function () {
      (0, _testUtils.waitUntilMapReady)(driver).then(function () {
        return driver.executeScript((0, _testUtils.stringifyFunctionCall)(addLayerWithLineThroughMapCenter, 'nameLine', 'description', 1000));
      }).then(function () {
        return driver.executeScript((0, _testUtils.stringifyFunctionCall)(addLayerWithPolygonAroundMapCenter, 'namePolygon', 'description', 1000));
      }).then(function () {
        var viewport = driver.findElement(_seleniumWebdriver.By.className('ol-viewport'));
        var featureTooltip = driver.findElement(_seleniumWebdriver.By.className('g4u-featuretooltip'));
        viewport.getSize().then(function (size) {
          driver.actions().mouseMove(viewport, { x: Math.round(size.width / 2 + 15), y: Math.round(size.height / 2 + 15) }).perform().then(function () {
            driver.wait(_seleniumWebdriver.until.elementIsVisible(featureTooltip), _config2.default.seleniumTimeout, 'Tooltip should be visible in time');
            (0, _assert2.default)(featureTooltip.getText(), 'Tooltip should show "namePolygon"').equalTo('namePolygon');
            return driver.actions().mouseMove(viewport).perform();
          }).then(function () {
            driver.wait(_seleniumWebdriver.until.elementTextIs(featureTooltip, 'nameLine'), _config2.default.seleniumTimeout, 'Tooltip should show "nameLine"');
            (0, _assert2.default)(featureTooltip.isDisplayed(), 'Tooltip should be visible').equalTo(true);
            done();
          });
        });
      });
    });
  });
});

/***/ })
/******/ ]);