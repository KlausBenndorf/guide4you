(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("ol"), require("jQuery"));
	else if(typeof define === 'function' && define.amd)
		define("g4u", ["ol", "jQuery"], factory);
	else if(typeof exports === 'object')
		exports["g4u"] = factory(require("ol"), require("jQuery"));
	else
		root["g4u"] = factory(root["ol"], root["jQuery"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_77__, __WEBPACK_EXTERNAL_MODULE_78__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		var m = modules[moduleId];
/******/ 		if (typeof m === 'number')
/******/ 		{
/******/ 		    if (!installedModules[m])
/******/ 		    {
/******/ 		        __webpack_require__(m);
/******/ 		    }
/******/ 		    module.exports = installedModules[m].exports;
/******/ 		}
/******/ 		else
/******/ 		{
/******/ 		    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 		}

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ((function(modules) {
	// Check all modules for deduplicated modules
	for(var i in modules) {
		if(Object.prototype.hasOwnProperty.call(modules, i)) {
			switch(typeof modules[i]) {
			case "function": break;
			case "object":
				// Module can be created from a template
				modules[i] = (function(_m) {
					var args = _m.slice(1), fn = modules[_m[0]];
					return function (a,b,c) {
						fn.apply(this, [a,b,c].concat(args));
					};
				}(modules[i]));
				break;
			default:
				// Module is a copy of another module
				// modules[i] = modules[modules[i]];
				break;
			}
		}
	}
	return modules;
}([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(9);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.source = exports.createMap = undefined;

	__webpack_require__(10);

	var _main = __webpack_require__(11);

	__webpack_require__(438);

	__webpack_require__(439);

	__webpack_require__(440);

	var _SourceServerVector = __webpack_require__(169);

	var createMap = exports.createMap = function createMap(element) {
	  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'node_modules/guide4you/dist/conf/client.commented.json';
	  var layerConfig = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'node_modules/guide4you/dist/conf/layers.commented.json';

	  return (0, _main.createG4UInternal)(element, config, layerConfig);
	};

	var source = exports.source = {
	  ServerVector: _SourceServerVector.SourceServerVector
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "g4u.d.ts";

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _promise = __webpack_require__(12);

	var _promise2 = _interopRequireDefault(_promise);

	exports.createG4UInternal = createG4UInternal;

	var _openlayers = __webpack_require__(77);

	var _openlayers2 = _interopRequireDefault(_openlayers);

	var _jquery = __webpack_require__(78);

	var _jquery2 = _interopRequireDefault(_jquery);

	__webpack_require__(79);

	__webpack_require__(80);

	var _G4UMap = __webpack_require__(81);

	var _Debug = __webpack_require__(151);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function createG4UInternal(element, clientConfPath, layerConfPath, options) {
	  if (Array.isArray(options)) {
	    // backwards compatibility
	    options = { modules: options };
	  }

	  return new _promise2.default(function (resolve, reject) {
	    (0, _jquery2.default)(document).ready(function () {
	      if (!_jquery2.default) {
	        reject('jQuery not available.');
	      } else {
	        var v = (0, _jquery2.default)().jquery.split('.');
	        if (+v[0] < 2 && +v[1] < 9) {
	          _Debug.Debug.error('You are using an outdated version of jQuery. Please use version 1.9 or higher.');
	        }
	      }

	      if (!_openlayers2.default) {
	        reject('OpenLayers not available.');
	      }

	      if (!_openlayers2.default.has.CANVAS) {
	        (0, _jquery2.default)('.g4u-browser-support-message').show();
	        reject('Browser does not support Canvas.');
	      }

	      (0, _jquery2.default)(element).empty();

	      // for remote analysis and debugging - not used inside of the software
	      window.map = new _G4UMap.G4UMap(element, clientConfPath, layerConfPath, options);

	      resolve(window.map);
	    });
	  });
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(13), __esModule: true };

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(14);
	__webpack_require__(15);
	__webpack_require__(59);
	__webpack_require__(63);
	module.exports = __webpack_require__(23).Promise;

/***/ },
/* 14 */
/***/ function(module, exports) {

	

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(16)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(19)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(17)
	  , defined   = __webpack_require__(18);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(20)
	  , $export        = __webpack_require__(21)
	  , redefine       = __webpack_require__(36)
	  , hide           = __webpack_require__(26)
	  , has            = __webpack_require__(37)
	  , Iterators      = __webpack_require__(38)
	  , $iterCreate    = __webpack_require__(39)
	  , setToStringTag = __webpack_require__(55)
	  , getPrototypeOf = __webpack_require__(57)
	  , ITERATOR       = __webpack_require__(56)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(22)
	  , core      = __webpack_require__(23)
	  , ctx       = __webpack_require__(24)
	  , hide      = __webpack_require__(26)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 22 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 23 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(25);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(27)
	  , createDesc = __webpack_require__(35);
	module.exports = __webpack_require__(31) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(28)
	  , IE8_DOM_DEFINE = __webpack_require__(30)
	  , toPrimitive    = __webpack_require__(34)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(31) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(29);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(31) && !__webpack_require__(32)(function(){
	  return Object.defineProperty(__webpack_require__(33)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(32)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(29)
	  , document = __webpack_require__(22).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(29);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(26);

/***/ },
/* 37 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(40)
	  , descriptor     = __webpack_require__(35)
	  , setToStringTag = __webpack_require__(55)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(26)(IteratorPrototype, __webpack_require__(56)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(28)
	  , dPs         = __webpack_require__(41)
	  , enumBugKeys = __webpack_require__(53)
	  , IE_PROTO    = __webpack_require__(50)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(33)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(54).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(27)
	  , anObject = __webpack_require__(28)
	  , getKeys  = __webpack_require__(42);

	module.exports = __webpack_require__(31) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(43)
	  , enumBugKeys = __webpack_require__(53);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(37)
	  , toIObject    = __webpack_require__(44)
	  , arrayIndexOf = __webpack_require__(47)(false)
	  , IE_PROTO     = __webpack_require__(50)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(45)
	  , defined = __webpack_require__(18);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(46);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 46 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(44)
	  , toLength  = __webpack_require__(48)
	  , toIndex   = __webpack_require__(49);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(17)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(17)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(51)('keys')
	  , uid    = __webpack_require__(52);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(22)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 52 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 53 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(22).document && document.documentElement;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(27).f
	  , has = __webpack_require__(37)
	  , TAG = __webpack_require__(56)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(51)('wks')
	  , uid        = __webpack_require__(52)
	  , Symbol     = __webpack_require__(22).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(37)
	  , toObject    = __webpack_require__(58)
	  , IE_PROTO    = __webpack_require__(50)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(18);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(60);
	var global        = __webpack_require__(22)
	  , hide          = __webpack_require__(26)
	  , Iterators     = __webpack_require__(38)
	  , TO_STRING_TAG = __webpack_require__(56)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(61)
	  , step             = __webpack_require__(62)
	  , Iterators        = __webpack_require__(38)
	  , toIObject        = __webpack_require__(44);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(19)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 61 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 62 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY            = __webpack_require__(20)
	  , global             = __webpack_require__(22)
	  , ctx                = __webpack_require__(24)
	  , classof            = __webpack_require__(64)
	  , $export            = __webpack_require__(21)
	  , isObject           = __webpack_require__(29)
	  , aFunction          = __webpack_require__(25)
	  , anInstance         = __webpack_require__(65)
	  , forOf              = __webpack_require__(66)
	  , speciesConstructor = __webpack_require__(70)
	  , task               = __webpack_require__(71).set
	  , microtask          = __webpack_require__(73)()
	  , PROMISE            = 'Promise'
	  , TypeError          = global.TypeError
	  , process            = global.process
	  , $Promise           = global[PROMISE]
	  , process            = global.process
	  , isNode             = classof(process) == 'process'
	  , empty              = function(){ /* empty */ }
	  , Internal, GenericPromiseCapability, Wrapper;

	var USE_NATIVE = !!function(){
	  try {
	    // correct subclassing with @@species support
	    var promise     = $Promise.resolve(1)
	      , FakePromise = (promise.constructor = {})[__webpack_require__(56)('species')] = function(exec){ exec(empty, empty); };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch(e){ /* empty */ }
	}();

	// helpers
	var sameConstructor = function(a, b){
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function(C){
	  return sameConstructor($Promise, C)
	    ? new PromiseCapability(C)
	    : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject  = aFunction(reject);
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(promise, isReject){
	  if(promise._n)return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function(){
	    var value = promise._v
	      , ok    = promise._s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , domain  = reaction.domain
	        , result, then;
	      try {
	        if(handler){
	          if(!ok){
	            if(promise._h == 2)onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if(handler === true)result = value;
	          else {
	            if(domain)domain.enter();
	            result = handler(value);
	            if(domain)domain.exit();
	          }
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if(isReject && !promise._h)onUnhandled(promise);
	  });
	};
	var onUnhandled = function(promise){
	  task.call(global, function(){
	    var value = promise._v
	      , abrupt, handler, console;
	    if(isUnhandled(promise)){
	      abrupt = perform(function(){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if(abrupt)throw abrupt.error;
	  });
	};
	var isUnhandled = function(promise){
	  if(promise._h == 1)return false;
	  var chain = promise._a || promise._c
	    , i     = 0
	    , reaction;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var onHandleUnhandled = function(promise){
	  task.call(global, function(){
	    var handler;
	    if(isNode){
	      process.emit('rejectionHandled', promise);
	    } else if(handler = global.onrejectionhandled){
	      handler({promise: promise, reason: promise._v});
	    }
	  });
	};
	var $reject = function(value){
	  var promise = this;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if(!promise._a)promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function(value){
	  var promise = this
	    , then;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if(promise === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      microtask(function(){
	        var wrapper = {_w: promise, _d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch(e){
	    $reject.call({_w: promise, _d: false}, e); // wrap
	  }
	};

	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor){
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch(err){
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor){
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__(74)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail   = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if(this._a)this._a.push(reaction);
	      if(this._s)notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function(){
	    var promise  = new Internal;
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject  = ctx($reject, promise, 1);
	  };
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
	__webpack_require__(55)($Promise, PROMISE);
	__webpack_require__(75)(PROMISE);
	Wrapper = __webpack_require__(23)[PROMISE];

	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = newPromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
	    var capability = newPromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(76)(function(iter){
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      var values    = []
	        , index     = 0
	        , remaining = 1;
	      forOf(iterable, false, function(promise){
	        var $index        = index++
	          , alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled  = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(46)
	  , TAG = __webpack_require__(56)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 65 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(24)
	  , call        = __webpack_require__(67)
	  , isArrayIter = __webpack_require__(68)
	  , anObject    = __webpack_require__(28)
	  , toLength    = __webpack_require__(48)
	  , getIterFn   = __webpack_require__(69)
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(28);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(38)
	  , ITERATOR   = __webpack_require__(56)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(64)
	  , ITERATOR  = __webpack_require__(56)('iterator')
	  , Iterators = __webpack_require__(38);
	module.exports = __webpack_require__(23).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(28)
	  , aFunction = __webpack_require__(25)
	  , SPECIES   = __webpack_require__(56)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(24)
	  , invoke             = __webpack_require__(72)
	  , html               = __webpack_require__(54)
	  , cel                = __webpack_require__(33)
	  , global             = __webpack_require__(22)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(46)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 72 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(22)
	  , macrotask = __webpack_require__(71).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(46)(process) == 'process';

	module.exports = function(){
	  var head, last, notify;

	  var flush = function(){
	    var parent, fn;
	    if(isNode && (parent = process.domain))parent.exit();
	    while(head){
	      fn   = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch(e){
	        if(head)notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if(parent)parent.enter();
	  };

	  // Node.js
	  if(isNode){
	    notify = function(){
	      process.nextTick(flush);
	    };
	  // browsers with MutationObserver
	  } else if(Observer){
	    var toggle = true
	      , node   = document.createTextNode('');
	    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	    notify = function(){
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if(Promise && Promise.resolve){
	    var promise = Promise.resolve();
	    notify = function(){
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function(){
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global, flush);
	    };
	  }

	  return function(fn){
	    var task = {fn: fn, next: undefined};
	    if(last)last.next = task;
	    if(!head){
	      head = task;
	      notify();
	    } last = task;
	  };
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(26);
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(22)
	  , core        = __webpack_require__(23)
	  , dP          = __webpack_require__(27)
	  , DESCRIPTORS = __webpack_require__(31)
	  , SPECIES     = __webpack_require__(56)('species');

	module.exports = function(KEY){
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(56)('iterator')
	  , SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }

	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 77 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_77__;

/***/ },
/* 78 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_78__;

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "images/g4u-logo.png";

/***/ },
/* 80 */
14,
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.G4UMap = undefined;

	var _promise = __webpack_require__(12);

	var _promise2 = _interopRequireDefault(_promise);

	var _typeof2 = __webpack_require__(82);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _keys = __webpack_require__(101);

	var _keys2 = _interopRequireDefault(_keys);

	var _getIterator2 = __webpack_require__(105);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _map = __webpack_require__(108);

	var _map2 = _interopRequireDefault(_map);

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(120);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(121);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _openlayers = __webpack_require__(77);

	var _openlayers2 = _interopRequireDefault(_openlayers);

	var _jquery = __webpack_require__(78);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _stripJsonComments = __webpack_require__(129);

	var _stripJsonComments2 = _interopRequireDefault(_stripJsonComments);

	var _MapConfigurator = __webpack_require__(130);

	__webpack_require__(433);

	var _L10N = __webpack_require__(434);

	var _utilitiesObject = __webpack_require__(137);

	var _globals = __webpack_require__(183);

	var _defaultconfig = __webpack_require__(435);

	var _Debug = __webpack_require__(151);

	__webpack_require__(436);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @typedef {object} G4UMapOptions
	 * @property {Module[]} [modules=[]]
	 * @property {L10N} [localiser]
	 * @property {object.<string, Mutator>} [mutators]
	 */

	/**
	 * Definition of the map-object
	 * Main task of the constructor is to load and read out the configuration.
	 * Uses the functions makeMapLayers, makeMapUI to create the map.
	 *
	 * Custom properties accessible via method .get('propertyName')
	 *
	 * @fires 'resize'
	 * @fires 'userActionTracking' only if build flag userActionTracking is set
	 * @fires 'beforeConfigLoad'
	 * @fires 'afterConfigLoad'
	 * @fires 'afterConfiguring'
	 * @fires 'change:ready'
	 * @fires 'change:ready:ui'
	 * @fires 'change:ready:layers'
	 */
	var G4UMap = exports.G4UMap = function (_ol$Map) {
	  (0, _inherits3.default)(G4UMap, _ol$Map);

	  /**
	   * @param {HTMLElement|jQuery|string} target element or id of an element
	   * @param {MapConfig|string} configOrFileName
	   * @param {LayerConfig|string} layerConfigOrFileName
	   * @param {G4UMapOptions} [options={}]
	   */
	  function G4UMap(target, configOrFileName, layerConfigOrFileName) {
	    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
	    (0, _classCallCheck3.default)(this, G4UMap);

	    var config = {};
	    var layerConfig = {};

	    // //////////////////////////////////////////////////////////////////////////////////////// //
	    //                     Call of the Parents Class Constructor                                //
	    // //////////////////////////////////////////////////////////////////////////////////////// //

	    var _this = (0, _possibleConstructorReturn3.default)(this, _ol$Map.call(this, {
	      controls: [],
	      interactions: [],
	      view: null
	    }));

	    _this.set('guide4youVersion', ('v1.2.9')); // eslint-disable-line

	    /**
	     * @type {Map.<string, ol.interaction.Interaction[]>}
	     * @private
	     */
	    _this.defaultInteractions_ = new _map2.default();

	    /**
	     * @type {Map.<string, ol.interaction.Interaction[]>}
	     * @private
	     */
	    _this.supersedingInteractions_ = new _map2.default();

	    /**
	     * @type {Module[]}
	     * @private
	     */
	    _this.modules_ = [];

	    _this.set('ready', false);

	    _this.on(['change:ready', 'change:ready:ui', 'change:ready:layers'], /** ol.ObjectEvent */function (e) {
	      if (_this.get(e.key)) {
	        _this.dispatchEvent(e.key);
	      }
	    });

	    if (options.modules) {
	      _this.addModules(options.modules);
	    }

	    // registering mutators

	    if (options.mutators) {
	      _this.on('change:featurePopup', function () {
	        var featurePopup = _this.get('featurePopup');
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	          for (var _iterator = (0, _getIterator3.default)((0, _keys2.default)(options.mutators)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var name = _step.value;

	            featurePopup.registerMutator(name, options.mutators[name]);
	          }
	        } catch (err) {
	          _didIteratorError = true;
	          _iteratorError = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	              _iterator.return();
	            }
	          } finally {
	            if (_didIteratorError) {
	              throw _iteratorError;
	            }
	          }
	        }
	      });
	    }

	    // Setting the target of the map

	    if (typeof target === 'string' && target[0] !== '#') {
	      _this.setTarget((0, _jquery2.default)('#' + target).get(0));
	    } else {
	      _this.setTarget((0, _jquery2.default)(target).get(0));
	    }

	    (0, _jquery2.default)(_this.getTarget()).on('contextmenu', function (e) {
	      if (!(0, _jquery2.default)(e.target).is('input[type=text]') && !(0, _jquery2.default)(e.target).is('textarea')) {
	        e.preventDefault();
	      }
	    });

	    // set the display mode to desktop initially to render overviewmpa correctly
	    (0, _jquery2.default)(_this.getTarget()).children().addClass(_globals.cssClasses.desktop);

	    // check type of mapConfig
	    if ((typeof configOrFileName === 'undefined' ? 'undefined' : (0, _typeof3.default)(configOrFileName)) === 'object') {
	      config = configOrFileName;
	    } else if (typeof configOrFileName === 'string') {
	      _this.set('configFileName', configOrFileName);
	      _this.set('defaultLayerConfigFileName', layerConfigOrFileName);
	    } else {
	      throw new Error('Unrecognised type for parameter configOrFileName!');
	    }

	    // check type of layerConfig
	    if ((typeof layerConfigOrFileName === 'undefined' ? 'undefined' : (0, _typeof3.default)(layerConfigOrFileName)) === 'object') {
	      layerConfig = layerConfigOrFileName;
	    } else if (typeof layerConfigOrFileName === 'string') {
	      _this.set('layerConfigFileName', layerConfigOrFileName);
	    } else {
	      throw new Error('Unrecognised type for parameter layerConfigOrFileName!');
	    }

	    // //////////////////////////////////////////////////////////////////////////////////////////
	    //                            Load config files if needed                                 //
	    // //////////////////////////////////////////////////////////////////////////////////////////

	    _this.dispatchEvent('beforeConfigLoad');

	    _this.set('mapConfigReady', false);
	    _this.set('layerConfigReady', false);

	    function loadConfigFile(fileName) {
	      return _jquery2.default.ajax({
	        url: fileName,
	        dataType: 'text'
	      }).then(function (data) {
	        try {
	          return JSON.parse((0, _stripJsonComments2.default)(data));
	        } catch (err) {
	          _Debug.Debug.error('The config file ' + fileName + ' couldn\'t be parsed.');
	          _Debug.Debug.error(err);
	        }
	      }).fail(function (err) {
	        _Debug.Debug.error('The config file ' + fileName + ' couldn\'t be loaded.');
	        _Debug.Debug.error(err);
	      });
	    }

	    var filesToLoad = [];

	    var configFileName = _this.get('configFileName');
	    if (configFileName) {
	      filesToLoad.push(loadConfigFile(configFileName).then(function (data) {
	        config = data;
	      }));
	    }

	    var layerConfigFileName = _this.get('layerConfigFileName');
	    if (layerConfigFileName) {
	      filesToLoad.push(loadConfigFile(layerConfigFileName).then(function (data) {
	        layerConfig = data;
	      }));
	    }

	    // wait for all promises in filesToLoad to resolve
	    _promise2.default.all(filesToLoad).then(function () {
	      _this.set('mapConfigReady', true);
	      _this.set('layerConfigReady', true);

	      // Merging the custom config with the default config
	      config = (0, _utilitiesObject.mergeWithDefaults)(config, _defaultconfig.defaults.config);

	      _this.set('mapConfig', config);
	      _this.set('layerConfig', layerConfig);

	      var loading = 0;

	      // issue reload of mapConfig if the name was changed
	      _this.on('change:configFileName', /** ol.ObjectEvent */function (e) {
	        _this.set('ready', false);
	        loading++;

	        _this.oldMapConfigs_ = _this.oldMapConfigs_ || {};
	        _this.oldMapConfigs_[e.oldValue] = _this.get('mapConfig');

	        if (_this.oldMapConfigs_.hasOwnProperty(_this.get('configFileName'))) {
	          _this.set('mapConfig', _this.oldMapConfigs_[_this.get('configFileName')]);
	        } else {
	          _this.set('mapConfigReady', false);
	          loadConfigFile(_this.get('configFileName')).then(function (data) {
	            _this.set('mapConfigReady', true);
	            _this.set('mapConfig', data);
	          }).always(function () {
	            loading--;
	            if (loading === 0) {
	              _this.set('ready', true);
	            }
	          });
	        }
	      });

	      // issue reload of layerConfig if the name was changed
	      _this.on('change:layerConfigFileName', /** ol.ObjectEvent */function (e) {
	        _this.set('ready', false);
	        loading++;

	        _this.oldLayerConfigs_ = _this.oldLayerConfigs_ || {};
	        _this.oldLayerConfigs_[e.oldValue] = _this.get('layerConfig');

	        if (_this.oldLayerConfigs_.hasOwnProperty(_this.get('layerConfigFileName'))) {
	          _this.set('layerConfig', _this.oldLayerConfigs_[_this.get('layerConfigFileName')]);
	        } else {
	          _this.set('layerConfigReady', false);
	          loadConfigFile(_this.get('layerConfigFileName')).then(function (data) {
	            _this.set('layerConfigReady', true);
	            _this.set('layerConfig', data);
	          }).always(function () {
	            loading--;
	            if (loading === 0) {
	              _this.set('ready', true);
	            }
	          });
	        }
	      });

	      // //////////////////////////////////////////////////////////////////////////////////////// //
	      //                                     Localization                                         //
	      // //////////////////////////////////////////////////////////////////////////////////////// //

	      var asyncLanguageFilePromise = void 0;

	      if (!options.localiser) {
	        var localiserOptions = {};

	        if (config.hasOwnProperty('languageSettings')) {
	          var l10nconf = config.languageSettings;

	          localiserOptions.currentLanguage = l10nconf.currentLanguage;

	          if (l10nconf.hasOwnProperty('defaultLanguage')) {
	            localiserOptions.defaultLanguage = l10nconf.defaultLanguage;
	          }

	          if (l10nconf.hasOwnProperty('languageFile')) {
	            localiserOptions.languageFile = l10nconf.languageFile;
	          }

	          if (l10nconf.hasOwnProperty('availableLanguages')) {
	            localiserOptions.availableLanguages = l10nconf.availableLanguages;
	          }
	        }

	        var localiser = new _L10N.L10N(localiserOptions);
	        _this.set('localiser', localiser);

	        asyncLanguageFilePromise = localiser.ajaxGetLanguageFile();
	      } else {
	        _this.set('localiser', options.localiser);
	      }

	      _this.dispatchEvent('afterConfigLoad');

	      return asyncLanguageFilePromise;
	    }).then(function () {
	      // //////////////////////////////////////////////////////////////////////////////////////// //
	      //                                    Configurator                                          //
	      // //////////////////////////////////////////////////////////////////////////////////////// //

	      _this.set('configurator', new _MapConfigurator.MapConfigurator(_this));

	      _this.dispatchEvent('afterConfiguring');

	      if (_this.get('ready:ui') && _this.get('ready:layers')) {
	        _this.set('ready', true);
	      }

	      _this.on(['change:ready:ui', 'change:ready:layers'], /** ol.ObjectEvent */function (e) {
	        if (!_this.get(e.key)) {
	          _this.set('ready', false);
	        }

	        if (_this.get('ready:ui') && _this.get('ready:layers')) {
	          _this.set('ready', true);
	        }
	      });
	    }).catch(_Debug.Debug.defaultErrorHandler);
	    return _this;
	  }

	  /**
	   * Searches all controls of the specified name
	   * @param {string} name
	   * @returns {Control[]}
	   */


	  G4UMap.prototype.getControlsByName = function getControlsByName(name) {
	    return this.controlsByName[name] || [];
	  };

	  /**
	   * @param {Module} module
	   */


	  G4UMap.prototype.addModule = function addModule(module) {
	    module.setMap(this);
	    this.modules_.push(module);
	  };

	  /**
	   * @param {Module[]} modules
	   */


	  G4UMap.prototype.addModules = function addModules(modules) {
	    var _iteratorNormalCompletion2 = true;
	    var _didIteratorError2 = false;
	    var _iteratorError2 = undefined;

	    try {
	      for (var _iterator2 = (0, _getIterator3.default)(modules), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	        var module = _step2.value;

	        this.addModule(module);
	      }
	    } catch (err) {
	      _didIteratorError2 = true;
	      _iteratorError2 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion2 && _iterator2.return) {
	          _iterator2.return();
	        }
	      } finally {
	        if (_didIteratorError2) {
	          throw _iteratorError2;
	        }
	      }
	    }
	  };

	  /**
	   * @returns {Module[]}
	   */


	  G4UMap.prototype.getModules = function getModules() {
	    return this.modules_;
	  };

	  /**
	   * @param {ol.interaction.Interaction} interaction
	   */


	  G4UMap.prototype.removeInteraction = function removeInteraction(interaction) {
	    var index = void 0;

	    this.defaultInteractions_.forEach(function (interactions) {
	      index = interactions.indexOf(interaction);
	      if (index > -1) {
	        interactions.splice(index, 1);
	      }
	    });

	    this.supersedingInteractions_.forEach(function (interactions) {
	      index = interactions.indexOf(interaction);
	      if (index > -1) {
	        interactions.splice(index, 1);
	      }
	    });

	    _ol$Map.prototype.removeInteraction.call(this, interaction);
	  };

	  /**
	   * Remove all interactions
	   */


	  G4UMap.prototype.removeInteractions = function removeInteractions() {
	    while (this.getInteractions() && this.getInteractions().getLength()) {
	      var _iteratorNormalCompletion3 = true;
	      var _didIteratorError3 = false;
	      var _iteratorError3 = undefined;

	      try {
	        for (var _iterator3 = (0, _getIterator3.default)(this.getInteractions().getArray()), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	          var interaction = _step3.value;

	          this.removeInteraction(interaction);
	        }
	      } catch (err) {
	        _didIteratorError3 = true;
	        _iteratorError3 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion3 && _iterator3.return) {
	            _iterator3.return();
	          }
	        } finally {
	          if (_didIteratorError3) {
	            throw _iteratorError3;
	          }
	        }
	      }
	    }
	  };

	  /**
	   * overwrite base method to notify developer about differing api
	   */


	  G4UMap.prototype.addInteraction = function addInteraction() {
	    throw new Error('Use addDefaultInteraction or addSupersedingInteraction');
	  };

	  /**
	   * Add an interaction that should be active by default (i.e. in the normal state of the map)
	   * @param {string} eventTypes a list of space separated eventtypes this interaction reacts on
	   * @param {ol.interaction.Interaction} interaction
	   */


	  G4UMap.prototype.addDefaultInteraction = function addDefaultInteraction(eventTypes, interaction) {
	    var _iteratorNormalCompletion4 = true;
	    var _didIteratorError4 = false;
	    var _iteratorError4 = undefined;

	    try {
	      for (var _iterator4 = (0, _getIterator3.default)(eventTypes.split(' ')), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	        var eventtype = _step4.value;

	        if (this.defaultInteractions_.has(eventtype)) {
	          this.defaultInteractions_.get(eventtype).push(interaction);
	        } else {
	          this.defaultInteractions_.set(eventtype, [interaction]);
	        }
	      }
	    } catch (err) {
	      _didIteratorError4 = true;
	      _iteratorError4 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion4 && _iterator4.return) {
	          _iterator4.return();
	        }
	      } finally {
	        if (_didIteratorError4) {
	          throw _iteratorError4;
	        }
	      }
	    }

	    _ol$Map.prototype.addInteraction.call(this, interaction);
	  };

	  /**
	   * This deactivates all interactions which use a given event type
	   * @param {string} eventType
	   */


	  G4UMap.prototype.deactivateInteractions = function deactivateInteractions(eventType) {
	    var _iteratorNormalCompletion5 = true;
	    var _didIteratorError5 = false;
	    var _iteratorError5 = undefined;

	    try {
	      for (var _iterator5 = (0, _getIterator3.default)(this.defaultInteractions_.get(eventType)), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	        var defInteraction = _step5.value;

	        defInteraction.setActive(false);
	      }
	    } catch (err) {
	      _didIteratorError5 = true;
	      _iteratorError5 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion5 && _iterator5.return) {
	          _iterator5.return();
	        }
	      } finally {
	        if (_didIteratorError5) {
	          throw _iteratorError5;
	        }
	      }
	    }

	    var _iteratorNormalCompletion6 = true;
	    var _didIteratorError6 = false;
	    var _iteratorError6 = undefined;

	    try {
	      for (var _iterator6 = (0, _getIterator3.default)(this.supersedingInteractions_.get(eventType)), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	        var supInteraction = _step6.value;

	        supInteraction.setActive(false);
	      }
	    } catch (err) {
	      _didIteratorError6 = true;
	      _iteratorError6 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion6 && _iterator6.return) {
	          _iterator6.return();
	        }
	      } finally {
	        if (_didIteratorError6) {
	          throw _iteratorError6;
	        }
	      }
	    }
	  };

	  /**
	   * Reactivates all default interactions which use a specified event type
	   * @param {string} eventType
	   */


	  G4UMap.prototype.activateInteractions = function activateInteractions(eventType) {
	    var _iteratorNormalCompletion7 = true;
	    var _didIteratorError7 = false;
	    var _iteratorError7 = undefined;

	    try {
	      for (var _iterator7 = (0, _getIterator3.default)(this.getDefaultInteractions(eventType)), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
	        var defInteraction = _step7.value;

	        defInteraction.setActive(true);
	      }
	    } catch (err) {
	      _didIteratorError7 = true;
	      _iteratorError7 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion7 && _iterator7.return) {
	          _iterator7.return();
	        }
	      } finally {
	        if (_didIteratorError7) {
	          throw _iteratorError7;
	        }
	      }
	    }
	  };

	  /**
	   * Gets all interactions which use the specified event type
	   * @param {string} eventType
	   * @returns {ol.interaction.Interaction[]}
	   */


	  G4UMap.prototype.getDefaultInteractions = function getDefaultInteractions(eventType) {
	    return this.defaultInteractions_.get(eventType);
	  };

	  /**
	   * This adds an interaction to the map which prohibits other interactions which use the same eventtype to be active
	   * at the same time. When the superseding interaction is activated all affected ones get deactivated and vice versa
	   * @param {string} eventTypes a list of space separated eventtypes this interaction reacts on
	   * @param {ol.interaction.Interaction} interaction
	   */


	  G4UMap.prototype.addSupersedingInteraction = function addSupersedingInteraction(eventTypes, interaction) {
	    var _this2 = this;

	    var eventTypes_ = eventTypes.split(' ');

	    var onActivation = function onActivation() {
	      // deactivation of all other interactions with the same eventtypes

	      var _iteratorNormalCompletion8 = true;
	      var _didIteratorError8 = false;
	      var _iteratorError8 = undefined;

	      try {
	        for (var _iterator8 = (0, _getIterator3.default)(eventTypes_), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
	          var eventType = _step8.value;
	          var _iteratorNormalCompletion9 = true;
	          var _didIteratorError9 = false;
	          var _iteratorError9 = undefined;

	          try {
	            for (var _iterator9 = (0, _getIterator3.default)(_this2.supersedingInteractions_.get(eventType)), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
	              var supersedingInteraction = _step9.value;

	              if (interaction !== supersedingInteraction) {
	                supersedingInteraction.setActive(false);
	              }
	            }
	          } catch (err) {
	            _didIteratorError9 = true;
	            _iteratorError9 = err;
	          } finally {
	            try {
	              if (!_iteratorNormalCompletion9 && _iterator9.return) {
	                _iterator9.return();
	              }
	            } finally {
	              if (_didIteratorError9) {
	                throw _iteratorError9;
	              }
	            }
	          }

	          if (_this2.defaultInteractions_.get(eventType)) {
	            var _iteratorNormalCompletion10 = true;
	            var _didIteratorError10 = false;
	            var _iteratorError10 = undefined;

	            try {
	              for (var _iterator10 = (0, _getIterator3.default)(_this2.defaultInteractions_.get(eventType)), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
	                var defaultInteraction = _step10.value;

	                defaultInteraction.setActive(false);
	              }
	            } catch (err) {
	              _didIteratorError10 = true;
	              _iteratorError10 = err;
	            } finally {
	              try {
	                if (!_iteratorNormalCompletion10 && _iterator10.return) {
	                  _iterator10.return();
	                }
	              } finally {
	                if (_didIteratorError10) {
	                  throw _iteratorError10;
	                }
	              }
	            }
	          }
	        }
	      } catch (err) {
	        _didIteratorError8 = true;
	        _iteratorError8 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion8 && _iterator8.return) {
	            _iterator8.return();
	          }
	        } finally {
	          if (_didIteratorError8) {
	            throw _iteratorError8;
	          }
	        }
	      }
	    };

	    var onDeactivation = function onDeactivation() {
	      // reactivation of the default interactions
	      // NOTE: if a superseding turned off another superseding interactions it won't reactivate it
	      var _iteratorNormalCompletion11 = true;
	      var _didIteratorError11 = false;
	      var _iteratorError11 = undefined;

	      try {
	        for (var _iterator11 = (0, _getIterator3.default)(eventTypes_), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
	          var eventType = _step11.value;

	          if (_this2.defaultInteractions_.get(eventType)) {
	            var _iteratorNormalCompletion12 = true;
	            var _didIteratorError12 = false;
	            var _iteratorError12 = undefined;

	            try {
	              for (var _iterator12 = (0, _getIterator3.default)(_this2.defaultInteractions_.get(eventType)), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
	                var defaultInteraction = _step12.value;

	                defaultInteraction.setActive(true);
	              }
	            } catch (err) {
	              _didIteratorError12 = true;
	              _iteratorError12 = err;
	            } finally {
	              try {
	                if (!_iteratorNormalCompletion12 && _iterator12.return) {
	                  _iterator12.return();
	                }
	              } finally {
	                if (_didIteratorError12) {
	                  throw _iteratorError12;
	                }
	              }
	            }
	          }
	        }
	      } catch (err) {
	        _didIteratorError11 = true;
	        _iteratorError11 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion11 && _iterator11.return) {
	            _iterator11.return();
	          }
	        } finally {
	          if (_didIteratorError11) {
	            throw _iteratorError11;
	          }
	        }
	      }
	    };

	    var _iteratorNormalCompletion13 = true;
	    var _didIteratorError13 = false;
	    var _iteratorError13 = undefined;

	    try {
	      for (var _iterator13 = (0, _getIterator3.default)(eventTypes_), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
	        var eventType = _step13.value;

	        if (this.supersedingInteractions_.has(eventType)) {
	          this.supersedingInteractions_.get(eventType).push(interaction);
	        } else {
	          this.supersedingInteractions_.set(eventType, [interaction]);
	        }
	      }
	    } catch (err) {
	      _didIteratorError13 = true;
	      _iteratorError13 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion13 && _iterator13.return) {
	          _iterator13.return();
	        }
	      } finally {
	        if (_didIteratorError13) {
	          throw _iteratorError13;
	        }
	      }
	    }

	    if (interaction.getActive()) {
	      onActivation();
	    }

	    interaction.on('change:active', /** ol.ObjectEvent */function (e) {
	      if (e.oldValue !== interaction.getActive()) {
	        if (interaction.getActive()) {
	          _this2.activating_ = true;
	          onActivation();
	          _this2.activating_ = false;
	        } else {
	          if (_this2.interactionDecativationTimeout_) {
	            clearTimeout(_this2.interactionDecativationTimeout_);
	          }

	          if (!_this2.activating_) {
	            _this2.interactionDecativationTimeout_ = setTimeout(onDeactivation, 500);
	          }
	        }
	      }
	    });

	    _ol$Map.prototype.addInteraction.call(this, interaction);
	  };

	  /**
	   * @param {GroupLayer} groupLayer
	   */


	  G4UMap.prototype.setLayerGroup = function setLayerGroup(groupLayer) {
	    groupLayer.provideMap(this);
	    _ol$Map.prototype.setLayerGroup.call(this, groupLayer);
	  };

	  /**
	   * Remove all controls
	   */


	  G4UMap.prototype.removeControls = function removeControls() {
	    var _this3 = this;

	    var controls = this.getControls();

	    if (controls) {
	      // its neccessary to loop, problem caused by the nesting?
	      while (controls.getLength() > 0) {
	        controls.forEach(function (control) {
	          return _this3.removeControl(control);
	        });
	        controls = this.getControls();
	      }
	    }
	  };

	  return G4UMap;
	}(_openlayers2.default.Map);

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(83);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(86);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(84), __esModule: true };

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(15);
	__webpack_require__(59);
	module.exports = __webpack_require__(85).f('iterator');

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(56);

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(87), __esModule: true };

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(88);
	__webpack_require__(14);
	__webpack_require__(99);
	__webpack_require__(100);
	module.exports = __webpack_require__(23).Symbol;

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(22)
	  , has            = __webpack_require__(37)
	  , DESCRIPTORS    = __webpack_require__(31)
	  , $export        = __webpack_require__(21)
	  , redefine       = __webpack_require__(36)
	  , META           = __webpack_require__(89).KEY
	  , $fails         = __webpack_require__(32)
	  , shared         = __webpack_require__(51)
	  , setToStringTag = __webpack_require__(55)
	  , uid            = __webpack_require__(52)
	  , wks            = __webpack_require__(56)
	  , wksExt         = __webpack_require__(85)
	  , wksDefine      = __webpack_require__(90)
	  , keyOf          = __webpack_require__(91)
	  , enumKeys       = __webpack_require__(92)
	  , isArray        = __webpack_require__(95)
	  , anObject       = __webpack_require__(28)
	  , toIObject      = __webpack_require__(44)
	  , toPrimitive    = __webpack_require__(34)
	  , createDesc     = __webpack_require__(35)
	  , _create        = __webpack_require__(40)
	  , gOPNExt        = __webpack_require__(96)
	  , $GOPD          = __webpack_require__(98)
	  , $DP            = __webpack_require__(27)
	  , $keys          = __webpack_require__(42)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(97).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(94).f  = $propertyIsEnumerable;
	  __webpack_require__(93).f = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(20)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(26)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(52)('meta')
	  , isObject = __webpack_require__(29)
	  , has      = __webpack_require__(37)
	  , setDesc  = __webpack_require__(27).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(32)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(22)
	  , core           = __webpack_require__(23)
	  , LIBRARY        = __webpack_require__(20)
	  , wksExt         = __webpack_require__(85)
	  , defineProperty = __webpack_require__(27).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(42)
	  , toIObject = __webpack_require__(44);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(42)
	  , gOPS    = __webpack_require__(93)
	  , pIE     = __webpack_require__(94);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 93 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 94 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(46);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(44)
	  , gOPN      = __webpack_require__(97).f
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(43)
	  , hiddenKeys = __webpack_require__(53).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(94)
	  , createDesc     = __webpack_require__(35)
	  , toIObject      = __webpack_require__(44)
	  , toPrimitive    = __webpack_require__(34)
	  , has            = __webpack_require__(37)
	  , IE8_DOM_DEFINE = __webpack_require__(30)
	  , gOPD           = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(31) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(90)('asyncIterator');

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(90)('observable');

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(102), __esModule: true };

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(103);
	module.exports = __webpack_require__(23).Object.keys;

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(58)
	  , $keys    = __webpack_require__(42);

	__webpack_require__(104)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(21)
	  , core    = __webpack_require__(23)
	  , fails   = __webpack_require__(32);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(106), __esModule: true };

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(59);
	__webpack_require__(15);
	module.exports = __webpack_require__(107);

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(28)
	  , get      = __webpack_require__(69);
	module.exports = __webpack_require__(23).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(109), __esModule: true };

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(14);
	__webpack_require__(15);
	__webpack_require__(59);
	__webpack_require__(110);
	__webpack_require__(116);
	module.exports = __webpack_require__(23).Map;

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(111);

	// 23.1 Map Objects
	module.exports = __webpack_require__(112)('Map', function(get){
	  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key){
	    var entry = strong.getEntry(this, key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value){
	    return strong.def(this, key === 0 ? 0 : key, value);
	  }
	}, strong, true);

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var dP          = __webpack_require__(27).f
	  , create      = __webpack_require__(40)
	  , redefineAll = __webpack_require__(74)
	  , ctx         = __webpack_require__(24)
	  , anInstance  = __webpack_require__(65)
	  , defined     = __webpack_require__(18)
	  , forOf       = __webpack_require__(66)
	  , $iterDefine = __webpack_require__(19)
	  , step        = __webpack_require__(62)
	  , setSpecies  = __webpack_require__(75)
	  , DESCRIPTORS = __webpack_require__(31)
	  , fastKey     = __webpack_require__(89).fastKey
	  , SIZE        = DESCRIPTORS ? '_s' : 'size';

	var getEntry = function(that, key){
	  // fast case
	  var index = fastKey(key), entry;
	  if(index !== 'F')return that._i[index];
	  // frozen object case
	  for(entry = that._f; entry; entry = entry.n){
	    if(entry.k == key)return entry;
	  }
	};

	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      anInstance(that, C, NAME, '_i');
	      that._i = create(null); // index
	      that._f = undefined;    // first entry
	      that._l = undefined;    // last entry
	      that[SIZE] = 0;         // size
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear(){
	        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
	          entry.r = true;
	          if(entry.p)entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function(key){
	        var that  = this
	          , entry = getEntry(that, key);
	        if(entry){
	          var next = entry.n
	            , prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if(prev)prev.n = next;
	          if(next)next.p = prev;
	          if(that._f == entry)that._f = next;
	          if(that._l == entry)that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /*, that = undefined */){
	        anInstance(this, C, 'forEach');
	        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
	          , entry;
	        while(entry = entry ? entry.n : this._f){
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while(entry && entry.r)entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key){
	        return !!getEntry(this, key);
	      }
	    });
	    if(DESCRIPTORS)dP(C.prototype, 'size', {
	      get: function(){
	        return defined(this[SIZE]);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var entry = getEntry(that, key)
	      , prev, index;
	    // change existing entry
	    if(entry){
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if(!that._f)that._f = entry;
	      if(prev)prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if(index !== 'F')that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function(C, NAME, IS_MAP){
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    $iterDefine(C, NAME, function(iterated, kind){
	      this._t = iterated;  // target
	      this._k = kind;      // kind
	      this._l = undefined; // previous
	    }, function(){
	      var that  = this
	        , kind  = that._k
	        , entry = that._l;
	      // revert to the last existing entry
	      while(entry && entry.r)entry = entry.p;
	      // get next entry
	      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
	        // or finish the iteration
	        that._t = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if(kind == 'keys'  )return step(0, entry.k);
	      if(kind == 'values')return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(NAME);
	  }
	};

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global         = __webpack_require__(22)
	  , $export        = __webpack_require__(21)
	  , meta           = __webpack_require__(89)
	  , fails          = __webpack_require__(32)
	  , hide           = __webpack_require__(26)
	  , redefineAll    = __webpack_require__(74)
	  , forOf          = __webpack_require__(66)
	  , anInstance     = __webpack_require__(65)
	  , isObject       = __webpack_require__(29)
	  , setToStringTag = __webpack_require__(55)
	  , dP             = __webpack_require__(27).f
	  , each           = __webpack_require__(113)(0)
	  , DESCRIPTORS    = __webpack_require__(31);

	module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
	  var Base  = global[NAME]
	    , C     = Base
	    , ADDER = IS_MAP ? 'set' : 'add'
	    , proto = C && C.prototype
	    , O     = {};
	  if(!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
	    new C().entries().next();
	  }))){
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    redefineAll(C.prototype, methods);
	    meta.NEED = true;
	  } else {
	    C = wrapper(function(target, iterable){
	      anInstance(target, C, NAME, '_c');
	      target._c = new Base;
	      if(iterable != undefined)forOf(iterable, IS_MAP, target[ADDER], target);
	    });
	    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','),function(KEY){
	      var IS_ADDER = KEY == 'add' || KEY == 'set';
	      if(KEY in proto && !(IS_WEAK && KEY == 'clear'))hide(C.prototype, KEY, function(a, b){
	        anInstance(this, C, KEY);
	        if(!IS_ADDER && IS_WEAK && !isObject(a))return KEY == 'get' ? undefined : false;
	        var result = this._c[KEY](a === 0 ? 0 : a, b);
	        return IS_ADDER ? this : result;
	      });
	    });
	    if('size' in proto)dP(C.prototype, 'size', {
	      get: function(){
	        return this._c.size;
	      }
	    });
	  }

	  setToStringTag(C, NAME);

	  O[NAME] = C;
	  $export($export.G + $export.W + $export.F, O);

	  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

	  return C;
	};

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var ctx      = __webpack_require__(24)
	  , IObject  = __webpack_require__(45)
	  , toObject = __webpack_require__(58)
	  , toLength = __webpack_require__(48)
	  , asc      = __webpack_require__(114);
	module.exports = function(TYPE, $create){
	  var IS_MAP        = TYPE == 1
	    , IS_FILTER     = TYPE == 2
	    , IS_SOME       = TYPE == 3
	    , IS_EVERY      = TYPE == 4
	    , IS_FIND_INDEX = TYPE == 6
	    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
	    , create        = $create || asc;
	  return function($this, callbackfn, that){
	    var O      = toObject($this)
	      , self   = IObject(O)
	      , f      = ctx(callbackfn, that, 3)
	      , length = toLength(self.length)
	      , index  = 0
	      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
	      , val, res;
	    for(;length > index; index++)if(NO_HOLES || index in self){
	      val = self[index];
	      res = f(val, index, O);
	      if(TYPE){
	        if(IS_MAP)result[index] = res;            // map
	        else if(res)switch(TYPE){
	          case 3: return true;                    // some
	          case 5: return val;                     // find
	          case 6: return index;                   // findIndex
	          case 2: result.push(val);               // filter
	        } else if(IS_EVERY)return false;          // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var speciesConstructor = __webpack_require__(115);

	module.exports = function(original, length){
	  return new (speciesConstructor(original))(length);
	};

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(29)
	  , isArray  = __webpack_require__(95)
	  , SPECIES  = __webpack_require__(56)('species');

	module.exports = function(original){
	  var C;
	  if(isArray(original)){
	    C = original.constructor;
	    // cross-realm fallback
	    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
	    if(isObject(C)){
	      C = C[SPECIES];
	      if(C === null)C = undefined;
	    }
	  } return C === undefined ? Array : C;
	};

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(21);

	$export($export.P + $export.R, 'Map', {toJSON: __webpack_require__(117)('Map')});

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var classof = __webpack_require__(64)
	  , from    = __webpack_require__(118);
	module.exports = function(NAME){
	  return function toJSON(){
	    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
	    return from(this);
	  };
	};

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	var forOf = __webpack_require__(66);

	module.exports = function(iter, ITERATOR){
	  var result = [];
	  forOf(iter, false, result.push, result, ITERATOR);
	  return result;
	};


/***/ },
/* 119 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _typeof2 = __webpack_require__(82);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _setPrototypeOf = __webpack_require__(122);

	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

	var _create = __webpack_require__(126);

	var _create2 = _interopRequireDefault(_create);

	var _typeof2 = __webpack_require__(82);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }

	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(123), __esModule: true };

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(124);
	module.exports = __webpack_require__(23).Object.setPrototypeOf;

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(21);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(125).set});

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(29)
	  , anObject = __webpack_require__(28);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(24)(Function.call, __webpack_require__(98).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(127), __esModule: true };

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(128);
	var $Object = __webpack_require__(23).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(21)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(40)});

/***/ },
/* 129 */
/***/ function(module, exports) {

	'use strict';
	var singleComment = 1;
	var multiComment = 2;

	function stripWithoutWhitespace() {
		return '';
	}

	function stripWithWhitespace(str, start, end) {
		return str.slice(start, end).replace(/\S/g, ' ');
	}

	module.exports = function (str, opts) {
		opts = opts || {};

		var currentChar;
		var nextChar;
		var insideString = false;
		var insideComment = false;
		var offset = 0;
		var ret = '';
		var strip = opts.whitespace === false ? stripWithoutWhitespace : stripWithWhitespace;

		for (var i = 0; i < str.length; i++) {
			currentChar = str[i];
			nextChar = str[i + 1];

			if (!insideComment && currentChar === '"') {
				var escaped = str[i - 1] === '\\' && str[i - 2] !== '\\';
				if (!escaped) {
					insideString = !insideString;
				}
			}

			if (insideString) {
				continue;
			}

			if (!insideComment && currentChar + nextChar === '//') {
				ret += str.slice(offset, i);
				offset = i;
				insideComment = singleComment;
				i++;
			} else if (insideComment === singleComment && currentChar + nextChar === '\r\n') {
				i++;
				insideComment = false;
				ret += strip(str, offset, i);
				offset = i;
				continue;
			} else if (insideComment === singleComment && currentChar === '\n') {
				insideComment = false;
				ret += strip(str, offset, i);
				offset = i;
			} else if (!insideComment && currentChar + nextChar === '/*') {
				ret += str.slice(offset, i);
				offset = i;
				insideComment = multiComment;
				i++;
				continue;
			} else if (insideComment === multiComment && currentChar + nextChar === '*/') {
				i++;
				insideComment = false;
				ret += strip(str, offset, i + 1);
				offset = i + 1;
				continue;
			}
		}

		return ret + (insideComment ? strip(str.substr(offset)) : str.substr(offset));
	};


/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.MapConfigurator = undefined;

	var _getIterator2 = __webpack_require__(105);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _openlayers = __webpack_require__(77);

	var _openlayers2 = _interopRequireDefault(_openlayers);

	var _jquery = __webpack_require__(78);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _proj = __webpack_require__(131);

	var _proj2 = _interopRequireDefault(_proj);

	var _Styling = __webpack_require__(132);

	var _LayerConfigurator = __webpack_require__(153);

	var _UIConfigurator = __webpack_require__(175);

	var _utilitiesObject = __webpack_require__(137);

	var _utilities = __webpack_require__(138);

	var _API = __webpack_require__(432);

	var _Debug = __webpack_require__(151);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_openlayers2.default.proj.setProj4(_proj2.default);

	/**
	 * @typedef {Object} MapConfig
	 * @property {Boolean} [userActionTracking]
	 * @property {g4uViewOptions} view
	 * @property {string} [interfaceProjection='EPSG:4326']
	 * @property {string} [mapProjection] will be infered from map data if not set
	 * @property {string} [measurementProjection] the projection measurements will calculated in
	 * @property {string} [proxy] A proxy url. It should be an url with a {url} part where the proxied url is to be
	 *    inserted.
	 * @property {Object.<string,StyleObject>} [styleMap] the style objects which will be mapped to certain identifiers. It
	 *    is recommended that identifiers start with a #. The {{StyleObject}} with the identifier '#defaultStyle' will be
	 *    used as a default Style in the whole Software
	 * @property {number} [scaleIcons] a default scaling for all used feature icons
	 * @property {ProjectionConfig[]} [additionalProjections]
	 * @property {Object} [api] API-Options
	 * @property {string} [loadingStrategy='ALL'] global loading strategy. Can have the values 'BBOX' or 'ALL'.
	 * @property {boolean} [ignoreLayerAvailability=false] if set all layers are added to the map, regardless of their
	 *    available config option
	 * @property {string} [cssFile] a cssFile to load and insert in the head dynamically.
	 * @property {Color[]} [cssTemplate] if 3 colors are given, the colors used in the text of the loaded cssFile will be
	 *    replaced by this colors. The colors in the cssFile need to be pure red, blue and green.
	 * @property {MobileLayoutOptions} [mobileLayout]
	 * @property {PositioningOptions} [positioning={}]
	 * @property {KineticOptions|boolean} [kinetic] This influences the DragPan behaviour. If set to false no kinetic
	 *    options are applied, if not set, the defaults are used.
	 */

	/**
	 * @typedef {object} KineticOptions
	 * @property {number} [decay]
	 * @property {number} [minVelocity]
	 * @property {number} [delay]
	 */

	/**
	 * @typedef {Object} ProjectionConfig
	 * @property {string} code
	 * @property {string} definition
	 */

	/**
	 * @typedef {Object} g4uViewOptions
	 * @property {ol.Coordinate} center the initial center of the map
	 * @property {ol.Extent} [extent] the max extent the center can lay in
	 * @property {number} [resolution]
	 * @property {number} [zoom]
	 * @property {number} [rotation]
	 * @property {number} [fit] an extent to fit the map initialy to, overwrites center settings
	 * @property {ol.ProjectionLike} [projection]
	 */

	/**
	 * @typedef {Object} LayerConfig
	 * @property {Object[]} baseLayers
	 * @property {Object[]} featureLayers
	 * @property {Object[]} fixedFeatureLayers
	 * @property {Object[]} queryLayers
	 */

	/**
	 * @typedef {object} MobileLayoutOptions
	 * @property {string[]} mediaQueries these will enable the mobile layout including removing the g4u-desktop class from
	 *    the ol-viewport and adding the g4u-mobile class
	 * @property {number} [scaleIcons=1] a value to scale all icons by
	 * @property {boolean} [animations=true] if animations should be disabled
	 */

	/**
	 * This class configures a map once the configureMap method is called.
	 * configureMap initializes the map and can only be called once.
	 * it delegates the configureUI and configureLayers to the {{UIConfigurator}} and {{LayerConfigurator}} classes.
	 */
	var MapConfigurator = exports.MapConfigurator = function () {
	  /**
	   * @param {G4UMap} map
	   * @public
	   */
	  function MapConfigurator(map) {
	    (0, _classCallCheck3.default)(this, MapConfigurator);

	    /**
	     * @type {G4UMap}
	     * @private
	     */
	    this.map_ = map;

	    /**
	     * @type {LayerConfigurator}
	     * @private
	     */
	    this.layerConfigurator_ = new _LayerConfigurator.LayerConfigurator(map);

	    /**
	     * @type {UIConfigurator}
	     * @private
	     */
	    this.UIConfigurator_ = new _UIConfigurator.UIConfigurator(map);

	    map.set('layerConfigurator', this.layerConfigurator_);
	    map.set('UIConfigurator', this.UIConfigurator_);

	    this.configureMap();

	    /**
	     * @type {boolean}
	     * @private
	     */
	    this.firstRun_ = false;
	  }

	  /**
	   * Delegate call to {{LayerConfigurator}}
	   * @public
	   */


	  MapConfigurator.prototype.configureLayers = function configureLayers() {
	    this.layerConfigurator_.configureLayers();
	  };

	  /**
	   * Delegate call to {{UIConfigurator}}
	   * @public
	   */


	  MapConfigurator.prototype.configureUI = function configureUI() {
	    this.UIConfigurator_.configureUI();
	  };

	  /**
	   * @public
	   */


	  MapConfigurator.prototype.configureMap = function configureMap() {
	    var _this = this;

	    if (this.firstRun_) {
	      _Debug.Debug.error('configureMap is supposed to be called only once');
	      _Debug.Debug.warn('If you would like to change that, please think about something because of the asynchronous nature' + ' of "ready", "ready:ui" and "ready:layers"');
	      throw new Error();
	    }

	    /**
	     * @type {MapConfig}
	     */
	    var mapConfigCopy = (0, _utilitiesObject.copyDeep)(this.map_.get('mapConfig'));

	    this.map_.set('userActionTracking', mapConfigCopy.userActionTracking);

	    var interfaceProjection = mapConfigCopy.hasOwnProperty('interfaceProjection') ? mapConfigCopy.interfaceProjection : 'EPSG:4326';

	    this.map_.set('interfaceProjection', interfaceProjection);

	    this.map_.set('proxy', mapConfigCopy.hasOwnProperty('proxy') ? mapConfigCopy.proxy : false);

	    // //////////////////////////////////////////////////////////////////////////////////////// //
	    //                                       Styling                                            //
	    // //////////////////////////////////////////////////////////////////////////////////////// //

	    // has to be done before configureLayers ... -> promise?

	    if (mapConfigCopy.hasOwnProperty('styleMap')) {
	      this.map_.set('styling', new _Styling.Styling({ styleConfigMap: mapConfigCopy.styleMap }));
	    } else {
	      this.map_.set('styling', new _Styling.Styling());
	    }

	    this.map_.set('scaleIcons', mapConfigCopy.hasOwnProperty('scaleIcons') ? mapConfigCopy.scaleIcons : 1);
	    this.map_.get('styling').setGlobalIconScale(this.map_.get('scaleIcons'));

	    // //////////////////////////////////////////////////////////////////////////////////////// //
	    //                                      Projections                                         //
	    // //////////////////////////////////////////////////////////////////////////////////////// //

	    var additionalProjectionsConf = mapConfigCopy.hasOwnProperty('additionalProjections') ? mapConfigCopy.additionalProjections : [];

	    for (var i = 0, ii = additionalProjectionsConf.length; i < ii; i++) {
	      _proj2.default.defs(additionalProjectionsConf[i].code, additionalProjectionsConf[i].definition);
	    }

	    if ((0, _utilities.checkFor)(mapConfigCopy, 'measurementProjection')) {
	      try {
	        this.map_.set('measurementProjection', _openlayers2.default.proj.get(mapConfigCopy.measurementProjection));
	      } catch (e) {
	        throw new Error('measurementProjection is not available, check for spelling or try to add it to' + ' additionalProjections with a proj4 definition.');
	      }
	    }

	    this.configureLayers();

	    var mapProjection = this.map_.get('mapProjection'); // mapProjection is determined by the baseLayers

	    // //////////////////////////////////////////////////////////////////////////////////////// //
	    //                                    Creating View                                         //
	    // //////////////////////////////////////////////////////////////////////////////////////// //

	    /**
	     * @type {g4uViewOptions}
	     */
	    var viewOptions = mapConfigCopy.view || {};

	    viewOptions.projection = mapProjection;

	    if ((0, _utilities.checkFor)(mapConfigCopy.view, 'center')) {
	      viewOptions.center = _openlayers2.default.proj.transform(mapConfigCopy.view.center, interfaceProjection, mapProjection);
	    }

	    if ((0, _utilities.checkFor)(mapConfigCopy.view, 'extent')) {
	      viewOptions.extent = _openlayers2.default.extent.applyTransform(mapConfigCopy.view.extent, _openlayers2.default.proj.getTransform(interfaceProjection, mapProjection));
	    }

	    var oldView = this.map_.getView();
	    if (oldView) {
	      viewOptions.center = oldView.getCenter() || mapConfigCopy.view.center;
	      viewOptions.resolution = oldView.getResolution() || mapConfigCopy.view.resolution;
	      viewOptions.rotation = oldView.getRotation() || mapConfigCopy.view.rotation;
	    }

	    // creating the view
	    var view = new _openlayers2.default.View(viewOptions);

	    // setting the extent overwrites any settings about zoom and start coordinates
	    if (!oldView && (0, _utilities.checkFor)(mapConfigCopy.view, 'fit')) {
	      view.fit(_openlayers2.default.proj.transformExtent(mapConfigCopy.view.fit, interfaceProjection, mapProjection), this.map_.getSize());
	    }

	    // //////////////////////////////////////////////////////////////////////////////////////// //
	    //                                   Setting View                                           //
	    // //////////////////////////////////////////////////////////////////////////////////////// //

	    this.map_.setView(view);

	    // //////////////////////////////////////////////////////////////////////////////////////// //
	    //                                       Resize                                             //
	    // //////////////////////////////////////////////////////////////////////////////////////// //

	    (0, _jquery2.default)(window).on('resize', function () {
	      // NOTE: could get depricated with 'change:size'
	      _this.map_.dispatchEvent('resize');
	    });

	    // //////////////////////////////////////////////////////////////////////////////////////// //
	    //                              Generic global handlers                                     //
	    // //////////////////////////////////////////////////////////////////////////////////////// //

	    var $viewport = (0, _jquery2.default)(this.map_.getViewport());

	    // applying a mousedown class to the viewport if the mouse is down
	    var mousedownClass = 'mousedown';
	    $viewport.on('mousedown', function () {
	      $viewport.addClass(mousedownClass);
	    });
	    $viewport.on('mouseup', function () {
	      $viewport.removeClass(mousedownClass);
	    });

	    // Sets the Keyboardfocus on the Map
	    $viewport.focus();

	    // Let the keyboardfocus stay with the Map
	    $viewport.on('click', function () {
	      $viewport.focus();
	    });

	    // //////////////////////////////////////////////////////////////////////////////////////// //
	    //                             UI (Interactions and Controls)                               //
	    // //////////////////////////////////////////////////////////////////////////////////////// //

	    _Debug.Debug.tryOrThrow(function () {
	      _this.configureUI();
	    });

	    this.map_.set('api', new _API.API(this.map_, mapConfigCopy.api));

	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	      for (var _iterator = (0, _getIterator3.default)(this.map_.getModules()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var module = _step.value;

	        module.configureMap(mapConfigCopy);
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator.return) {
	          _iterator.return();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }
	  };

	  return MapConfigurator;
	}();

/***/ },
/* 131 */
/***/ function(module, exports) {

	!function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.proj4=a()}}(function(){return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({"./includedProjections":[function(a,b,c){var d=[a("./lib/projections/tmerc"),a("./lib/projections/utm"),a("./lib/projections/sterea"),a("./lib/projections/stere"),a("./lib/projections/somerc"),a("./lib/projections/omerc"),a("./lib/projections/lcc"),a("./lib/projections/krovak"),a("./lib/projections/cass"),a("./lib/projections/laea"),a("./lib/projections/aea"),a("./lib/projections/gnom"),a("./lib/projections/cea"),a("./lib/projections/eqc"),a("./lib/projections/poly"),a("./lib/projections/nzmg"),a("./lib/projections/mill"),a("./lib/projections/sinu"),a("./lib/projections/moll"),a("./lib/projections/eqdc"),a("./lib/projections/vandg"),a("./lib/projections/aeqd"),a("./lib/projections/ortho")];b.exports=function(proj4){d.forEach(function(a){proj4.Proj.projections.add(a)})}},{"./lib/projections/aea":40,"./lib/projections/aeqd":41,"./lib/projections/cass":42,"./lib/projections/cea":43,"./lib/projections/eqc":44,"./lib/projections/eqdc":45,"./lib/projections/gnom":47,"./lib/projections/krovak":48,"./lib/projections/laea":49,"./lib/projections/lcc":50,"./lib/projections/mill":53,"./lib/projections/moll":54,"./lib/projections/nzmg":55,"./lib/projections/omerc":56,"./lib/projections/ortho":57,"./lib/projections/poly":58,"./lib/projections/sinu":59,"./lib/projections/somerc":60,"./lib/projections/stere":61,"./lib/projections/sterea":62,"./lib/projections/tmerc":63,"./lib/projections/utm":64,"./lib/projections/vandg":65}],1:[function(a,b,c){function Point(a,b,c){if(!(this instanceof Point))return new Point(a,b,c);if(Array.isArray(a))this.x=a[0],this.y=a[1],this.z=a[2]||0;else if("object"==typeof a)this.x=a.x,this.y=a.y,this.z=a.z||0;else if("string"==typeof a&&"undefined"==typeof b){var d=a.split(",");this.x=parseFloat(d[0],10),this.y=parseFloat(d[1],10),this.z=parseFloat(d[2],10)||0}else this.x=a,this.y=b,this.z=c||0;console.warn("proj4.Point will be removed in version 3, use proj4.toPoint")}var d=a("mgrs");Point.fromMGRS=function(a){return new Point(d.toPoint(a))},Point.prototype.toMGRS=function(a){return d.forward([this.x,this.y],a)},b.exports=Point},{mgrs:68}],2:[function(a,b,c){function Projection(a,b){if(!(this instanceof Projection))return new Projection(a);b=b||function(a){if(a)throw a};var c=d(a);if("object"!=typeof c)return void b(a);var f=g(c),h=Projection.projections.get(f.projName);h?(e(this,f),e(this,h),this.init(),b(null,this)):b(a)}var d=a("./parseCode"),e=a("./extend"),f=a("./projections"),g=a("./deriveConstants");Projection.projections=f,Projection.projections.start(),b.exports=Projection},{"./deriveConstants":33,"./extend":34,"./parseCode":37,"./projections":39}],3:[function(a,b,c){b.exports=function(a,b,c){var d,e,f,g=c.x,h=c.y,i=c.z||0;for(f=0;3>f;f++)if(!b||2!==f||void 0!==c.z)switch(0===f?(d=g,e="x"):1===f?(d=h,e="y"):(d=i,e="z"),a.axis[f]){case"e":c[e]=d;break;case"w":c[e]=-d;break;case"n":c[e]=d;break;case"s":c[e]=-d;break;case"u":void 0!==c[e]&&(c.z=d);break;case"d":void 0!==c[e]&&(c.z=-d);break;default:return null}return c}},{}],4:[function(a,b,c){var d=Math.PI/2,e=a("./sign");b.exports=function(a){return Math.abs(a)<d?a:a-e(a)*Math.PI}},{"./sign":21}],5:[function(a,b,c){var d=2*Math.PI,e=3.14159265359,f=a("./sign");b.exports=function(a){return Math.abs(a)<=e?a:a-f(a)*d}},{"./sign":21}],6:[function(a,b,c){b.exports=function(a){return Math.abs(a)>1&&(a=a>1?1:-1),Math.asin(a)}},{}],7:[function(a,b,c){b.exports=function(a){return 1-.25*a*(1+a/16*(3+1.25*a))}},{}],8:[function(a,b,c){b.exports=function(a){return.375*a*(1+.25*a*(1+.46875*a))}},{}],9:[function(a,b,c){b.exports=function(a){return.05859375*a*a*(1+.75*a)}},{}],10:[function(a,b,c){b.exports=function(a){return a*a*a*(35/3072)}},{}],11:[function(a,b,c){b.exports=function(a,b,c){var d=b*c;return a/Math.sqrt(1-d*d)}},{}],12:[function(a,b,c){b.exports=function(a,b,c,d,e){var f,g;f=a/b;for(var h=0;15>h;h++)if(g=(a-(b*f-c*Math.sin(2*f)+d*Math.sin(4*f)-e*Math.sin(6*f)))/(b-2*c*Math.cos(2*f)+4*d*Math.cos(4*f)-6*e*Math.cos(6*f)),f+=g,Math.abs(g)<=1e-10)return f;return NaN}},{}],13:[function(a,b,c){var d=Math.PI/2;b.exports=function(a,b){var c=1-(1-a*a)/(2*a)*Math.log((1-a)/(1+a));if(Math.abs(Math.abs(b)-c)<1e-6)return 0>b?-1*d:d;for(var e,f,g,h,i=Math.asin(.5*b),j=0;30>j;j++)if(f=Math.sin(i),g=Math.cos(i),h=a*f,e=Math.pow(1-h*h,2)/(2*g)*(b/(1-a*a)-f/(1-h*h)+.5/a*Math.log((1-h)/(1+h))),i+=e,Math.abs(e)<=1e-10)return i;return NaN}},{}],14:[function(a,b,c){b.exports=function(a,b,c,d,e){return a*e-b*Math.sin(2*e)+c*Math.sin(4*e)-d*Math.sin(6*e)}},{}],15:[function(a,b,c){b.exports=function(a,b,c){var d=a*b;return c/Math.sqrt(1-d*d)}},{}],16:[function(a,b,c){var d=Math.PI/2;b.exports=function(a,b){for(var c,e,f=.5*a,g=d-2*Math.atan(b),h=0;15>=h;h++)if(c=a*Math.sin(g),e=d-2*Math.atan(b*Math.pow((1-c)/(1+c),f))-g,g+=e,Math.abs(e)<=1e-10)return g;return-9999}},{}],17:[function(a,b,c){var d=1,e=.25,f=.046875,g=.01953125,h=.01068115234375,i=.75,j=.46875,k=.013020833333333334,l=.007120768229166667,m=.3645833333333333,n=.005696614583333333,o=.3076171875;b.exports=function(a){var b=[];b[0]=d-a*(e+a*(f+a*(g+a*h))),b[1]=a*(i-a*(f+a*(g+a*h)));var c=a*a;return b[2]=c*(j-a*(k+a*l)),c*=a,b[3]=c*(m-a*n),b[4]=c*a*o,b}},{}],18:[function(a,b,c){var d=a("./pj_mlfn"),e=1e-10,f=20;b.exports=function(a,b,c){for(var g=1/(1-b),h=a,i=f;i;--i){var j=Math.sin(h),k=1-b*j*j;if(k=(d(h,j,Math.cos(h),c)-a)*(k*Math.sqrt(k))*g,h-=k,Math.abs(k)<e)return h}return h}},{"./pj_mlfn":19}],19:[function(a,b,c){b.exports=function(a,b,c,d){return c*=b,b*=b,d[0]*a-c*(d[1]+b*(d[2]+b*(d[3]+b*d[4])))}},{}],20:[function(a,b,c){b.exports=function(a,b){var c;return a>1e-7?(c=a*b,(1-a*a)*(b/(1-c*c)-.5/a*Math.log((1-c)/(1+c)))):2*b}},{}],21:[function(a,b,c){b.exports=function(a){return 0>a?-1:1}},{}],22:[function(a,b,c){b.exports=function(a,b){return Math.pow((1-a)/(1+a),b)}},{}],23:[function(a,b,c){b.exports=function(a){var b={x:a[0],y:a[1]};return a.length>2&&(b.z=a[2]),a.length>3&&(b.m=a[3]),b}},{}],24:[function(a,b,c){var d=Math.PI/2;b.exports=function(a,b,c){var e=a*c,f=.5*a;return e=Math.pow((1-e)/(1+e),f),Math.tan(.5*(d-b))/e}},{}],25:[function(a,b,c){c.wgs84={towgs84:"0,0,0",ellipse:"WGS84",datumName:"WGS84"},c.ch1903={towgs84:"674.374,15.056,405.346",ellipse:"bessel",datumName:"swiss"},c.ggrs87={towgs84:"-199.87,74.79,246.62",ellipse:"GRS80",datumName:"Greek_Geodetic_Reference_System_1987"},c.nad83={towgs84:"0,0,0",ellipse:"GRS80",datumName:"North_American_Datum_1983"},c.nad27={nadgrids:"@conus,@alaska,@ntv2_0.gsb,@ntv1_can.dat",ellipse:"clrk66",datumName:"North_American_Datum_1927"},c.potsdam={towgs84:"606.0,23.0,413.0",ellipse:"bessel",datumName:"Potsdam Rauenberg 1950 DHDN"},c.carthage={towgs84:"-263.0,6.0,431.0",ellipse:"clark80",datumName:"Carthage 1934 Tunisia"},c.hermannskogel={towgs84:"653.0,-212.0,449.0",ellipse:"bessel",datumName:"Hermannskogel"},c.ire65={towgs84:"482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",ellipse:"mod_airy",datumName:"Ireland 1965"},c.rassadiran={towgs84:"-133.63,-157.5,-158.62",ellipse:"intl",datumName:"Rassadiran"},c.nzgd49={towgs84:"59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993",ellipse:"intl",datumName:"New Zealand Geodetic Datum 1949"},c.osgb36={towgs84:"446.448,-125.157,542.060,0.1502,0.2470,0.8421,-20.4894",ellipse:"airy",datumName:"Airy 1830"},c.s_jtsk={towgs84:"589,76,480",ellipse:"bessel",datumName:"S-JTSK (Ferro)"},c.beduaram={towgs84:"-106,-87,188",ellipse:"clrk80",datumName:"Beduaram"},c.gunung_segara={towgs84:"-403,684,41",ellipse:"bessel",datumName:"Gunung Segara Jakarta"},c.rnb72={towgs84:"106.869,-52.2978,103.724,-0.33657,0.456955,-1.84218,1",ellipse:"intl",datumName:"Reseau National Belge 1972"}},{}],26:[function(a,b,c){c.MERIT={a:6378137,rf:298.257,ellipseName:"MERIT 1983"},c.SGS85={a:6378136,rf:298.257,ellipseName:"Soviet Geodetic System 85"},c.GRS80={a:6378137,rf:298.257222101,ellipseName:"GRS 1980(IUGG, 1980)"},c.IAU76={a:6378140,rf:298.257,ellipseName:"IAU 1976"},c.airy={a:6377563.396,b:6356256.91,ellipseName:"Airy 1830"},c.APL4={a:6378137,rf:298.25,ellipseName:"Appl. Physics. 1965"},c.NWL9D={a:6378145,rf:298.25,ellipseName:"Naval Weapons Lab., 1965"},c.mod_airy={a:6377340.189,b:6356034.446,ellipseName:"Modified Airy"},c.andrae={a:6377104.43,rf:300,ellipseName:"Andrae 1876 (Den., Iclnd.)"},c.aust_SA={a:6378160,rf:298.25,ellipseName:"Australian Natl & S. Amer. 1969"},c.GRS67={a:6378160,rf:298.247167427,ellipseName:"GRS 67(IUGG 1967)"},c.bessel={a:6377397.155,rf:299.1528128,ellipseName:"Bessel 1841"},c.bess_nam={a:6377483.865,rf:299.1528128,ellipseName:"Bessel 1841 (Namibia)"},c.clrk66={a:6378206.4,b:6356583.8,ellipseName:"Clarke 1866"},c.clrk80={a:6378249.145,rf:293.4663,ellipseName:"Clarke 1880 mod."},c.clrk58={a:6378293.645208759,rf:294.2606763692654,ellipseName:"Clarke 1858"},c.CPM={a:6375738.7,rf:334.29,ellipseName:"Comm. des Poids et Mesures 1799"},c.delmbr={a:6376428,rf:311.5,ellipseName:"Delambre 1810 (Belgium)"},c.engelis={a:6378136.05,rf:298.2566,ellipseName:"Engelis 1985"},c.evrst30={a:6377276.345,rf:300.8017,ellipseName:"Everest 1830"},c.evrst48={a:6377304.063,rf:300.8017,ellipseName:"Everest 1948"},c.evrst56={a:6377301.243,rf:300.8017,ellipseName:"Everest 1956"},c.evrst69={a:6377295.664,rf:300.8017,ellipseName:"Everest 1969"},c.evrstSS={a:6377298.556,rf:300.8017,ellipseName:"Everest (Sabah & Sarawak)"},c.fschr60={a:6378166,rf:298.3,ellipseName:"Fischer (Mercury Datum) 1960"},c.fschr60m={a:6378155,rf:298.3,ellipseName:"Fischer 1960"},c.fschr68={a:6378150,rf:298.3,ellipseName:"Fischer 1968"},c.helmert={a:6378200,rf:298.3,ellipseName:"Helmert 1906"},c.hough={a:6378270,rf:297,ellipseName:"Hough"},c.intl={a:6378388,rf:297,ellipseName:"International 1909 (Hayford)"},c.kaula={a:6378163,rf:298.24,ellipseName:"Kaula 1961"},c.lerch={a:6378139,rf:298.257,ellipseName:"Lerch 1979"},c.mprts={a:6397300,rf:191,ellipseName:"Maupertius 1738"},c.new_intl={a:6378157.5,b:6356772.2,ellipseName:"New International 1967"},c.plessis={a:6376523,rf:6355863,ellipseName:"Plessis 1817 (France)"},c.krass={a:6378245,rf:298.3,ellipseName:"Krassovsky, 1942"},c.SEasia={a:6378155,b:6356773.3205,ellipseName:"Southeast Asia"},c.walbeck={a:6376896,b:6355834.8467,ellipseName:"Walbeck"},c.WGS60={a:6378165,rf:298.3,ellipseName:"WGS 60"},c.WGS66={a:6378145,rf:298.25,ellipseName:"WGS 66"},c.WGS7={a:6378135,rf:298.26,ellipseName:"WGS 72"},c.WGS84={a:6378137,rf:298.257223563,ellipseName:"WGS 84"},c.sphere={a:6370997,b:6370997,ellipseName:"Normal Sphere (r=6370997)"}},{}],27:[function(a,b,c){c.greenwich=0,c.lisbon=-9.131906111111,c.paris=2.337229166667,c.bogota=-74.080916666667,c.madrid=-3.687938888889,c.rome=12.452333333333,c.bern=7.439583333333,c.jakarta=106.807719444444,c.ferro=-17.666666666667,c.brussels=4.367975,c.stockholm=18.058277777778,c.athens=23.7163375,c.oslo=10.722916666667},{}],28:[function(a,b,c){c.ft={to_meter:.3048},c["us-ft"]={to_meter:1200/3937}},{}],29:[function(a,b,c){function d(a,b,c){var d;return Array.isArray(c)?(d=g(a,b,c),3===c.length?[d.x,d.y,d.z]:[d.x,d.y]):g(a,b,c)}function e(a){return a instanceof f?a:a.oProj?a.oProj:f(a)}function proj4(a,b,c){a=e(a);var f,g=!1;return"undefined"==typeof b?(b=a,a=h,g=!0):("undefined"!=typeof b.x||Array.isArray(b))&&(c=b,b=a,a=h,g=!0),b=e(b),c?d(a,b,c):(f={forward:function(c){return d(a,b,c)},inverse:function(c){return d(b,a,c)}},g&&(f.oProj=b),f)}var f=a("./Proj"),g=a("./transform"),h=f("WGS84");b.exports=proj4},{"./Proj":2,"./transform":66}],30:[function(a,b,c){var d=Math.PI/2,e=1,f=2,g=3,h=4,i=5,j=484813681109536e-20,k=1.0026,l=.3826834323650898,m=function(a){return this instanceof m?(this.datum_type=h,void(a&&(a.datumCode&&"none"===a.datumCode&&(this.datum_type=i),a.datum_params&&(this.datum_params=a.datum_params.map(parseFloat),0===this.datum_params[0]&&0===this.datum_params[1]&&0===this.datum_params[2]||(this.datum_type=e),this.datum_params.length>3&&(0===this.datum_params[3]&&0===this.datum_params[4]&&0===this.datum_params[5]&&0===this.datum_params[6]||(this.datum_type=f,this.datum_params[3]*=j,this.datum_params[4]*=j,this.datum_params[5]*=j,this.datum_params[6]=this.datum_params[6]/1e6+1))),this.datum_type=a.grids?g:this.datum_type,this.a=a.a,this.b=a.b,this.es=a.es,this.ep2=a.ep2,this.datum_type===g&&(this.grids=a.grids)))):new m(a)};m.prototype={compare_datums:function(a){return this.datum_type!==a.datum_type?!1:this.a!==a.a||Math.abs(this.es-a.es)>5e-11?!1:this.datum_type===e?this.datum_params[0]===a.datum_params[0]&&this.datum_params[1]===a.datum_params[1]&&this.datum_params[2]===a.datum_params[2]:this.datum_type===f?this.datum_params[0]===a.datum_params[0]&&this.datum_params[1]===a.datum_params[1]&&this.datum_params[2]===a.datum_params[2]&&this.datum_params[3]===a.datum_params[3]&&this.datum_params[4]===a.datum_params[4]&&this.datum_params[5]===a.datum_params[5]&&this.datum_params[6]===a.datum_params[6]:this.datum_type===g||a.datum_type===g?this.nadgrids===a.nadgrids:!0},geodetic_to_geocentric:function(a){var b,c,e,f,g,h,i,j=a.x,k=a.y,l=a.z?a.z:0,m=0;if(-d>k&&k>-1.001*d)k=-d;else if(k>d&&1.001*d>k)k=d;else if(-d>k||k>d)return null;return j>Math.PI&&(j-=2*Math.PI),g=Math.sin(k),i=Math.cos(k),h=g*g,f=this.a/Math.sqrt(1-this.es*h),b=(f+l)*i*Math.cos(j),c=(f+l)*i*Math.sin(j),e=(f*(1-this.es)+l)*g,a.x=b,a.y=c,a.z=e,m},geocentric_to_geodetic:function(a){var b,c,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t=1e-12,u=t*t,v=30,w=a.x,x=a.y,y=a.z?a.z:0;if(o=!1,b=Math.sqrt(w*w+x*x),c=Math.sqrt(w*w+x*x+y*y),b/this.a<t){if(o=!0,q=0,c/this.a<t)return r=d,void(s=-this.b)}else q=Math.atan2(x,w);e=y/c,f=b/c,g=1/Math.sqrt(1-this.es*(2-this.es)*f*f),j=f*(1-this.es)*g,k=e*g,p=0;do p++,i=this.a/Math.sqrt(1-this.es*k*k),s=b*j+y*k-i*(1-this.es*k*k),h=this.es*i/(i+s),g=1/Math.sqrt(1-h*(2-h)*f*f),l=f*(1-h)*g,m=e*g,n=m*j-l*k,j=l,k=m;while(n*n>u&&v>p);return r=Math.atan(m/Math.abs(l)),a.x=q,a.y=r,a.z=s,a},geocentric_to_geodetic_noniter:function(a){var b,c,e,f,g,h,i,j,m,n,o,p,q,r,s,t,u,v=a.x,w=a.y,x=a.z?a.z:0;if(v=parseFloat(v),w=parseFloat(w),x=parseFloat(x),u=!1,0!==v)b=Math.atan2(w,v);else if(w>0)b=d;else if(0>w)b=-d;else if(u=!0,b=0,x>0)c=d;else{if(!(0>x))return c=d,void(e=-this.b);c=-d}return g=v*v+w*w,f=Math.sqrt(g),h=x*k,j=Math.sqrt(h*h+g),n=h/j,p=f/j,o=n*n*n,i=x+this.b*this.ep2*o,t=f-this.a*this.es*p*p*p,m=Math.sqrt(i*i+t*t),q=i/m,r=t/m,s=this.a/Math.sqrt(1-this.es*q*q),e=r>=l?f/r-s:-l>=r?f/-r-s:x/q+s*(this.es-1),u===!1&&(c=Math.atan(q/r)),a.x=b,a.y=c,a.z=e,a},geocentric_to_wgs84:function(a){if(this.datum_type===e)a.x+=this.datum_params[0],a.y+=this.datum_params[1],a.z+=this.datum_params[2];else if(this.datum_type===f){var b=this.datum_params[0],c=this.datum_params[1],d=this.datum_params[2],g=this.datum_params[3],h=this.datum_params[4],i=this.datum_params[5],j=this.datum_params[6],k=j*(a.x-i*a.y+h*a.z)+b,l=j*(i*a.x+a.y-g*a.z)+c,m=j*(-h*a.x+g*a.y+a.z)+d;a.x=k,a.y=l,a.z=m}},geocentric_from_wgs84:function(a){if(this.datum_type===e)a.x-=this.datum_params[0],a.y-=this.datum_params[1],a.z-=this.datum_params[2];else if(this.datum_type===f){var b=this.datum_params[0],c=this.datum_params[1],d=this.datum_params[2],g=this.datum_params[3],h=this.datum_params[4],i=this.datum_params[5],j=this.datum_params[6],k=(a.x-b)/j,l=(a.y-c)/j,m=(a.z-d)/j;a.x=k+i*l-h*m,a.y=-i*k+l+g*m,a.z=h*k-g*l+m}}},b.exports=m},{}],31:[function(a,b,c){var d=1,e=2,f=3,g=5,h=6378137,i=.006694379990141316;b.exports=function(a,b,c){function j(a){return a===d||a===e}var k,l,m;if(a.compare_datums(b))return c;if(a.datum_type===g||b.datum_type===g)return c;var n=a.a,o=a.es,p=b.a,q=b.es,r=a.datum_type;if(r===f)if(0===this.apply_gridshift(a,0,c))a.a=h,a.es=i;else{if(!a.datum_params)return a.a=n,a.es=a.es,c;for(k=1,l=0,m=a.datum_params.length;m>l;l++)k*=a.datum_params[l];if(0===k)return a.a=n,a.es=a.es,c;r=a.datum_params.length>3?e:d}return b.datum_type===f&&(b.a=h,b.es=i),(a.es!==b.es||a.a!==b.a||j(r)||j(b.datum_type))&&(a.geodetic_to_geocentric(c),j(a.datum_type)&&a.geocentric_to_wgs84(c),j(b.datum_type)&&b.geocentric_from_wgs84(c),b.geocentric_to_geodetic(c)),b.datum_type===f&&this.apply_gridshift(b,1,c),a.a=n,a.es=o,b.a=p,b.es=q,c}},{}],32:[function(a,b,c){function d(a){var b=this;if(2===arguments.length){var c=arguments[1];"string"==typeof c?"+"===c.charAt(0)?d[a]=f(arguments[1]):d[a]=g(arguments[1]):d[a]=c}else if(1===arguments.length){if(Array.isArray(a))return a.map(function(a){Array.isArray(a)?d.apply(b,a):d(a)});if("string"==typeof a){if(a in d)return d[a]}else"EPSG"in a?d["EPSG:"+a.EPSG]=a:"ESRI"in a?d["ESRI:"+a.ESRI]=a:"IAU2000"in a?d["IAU2000:"+a.IAU2000]=a:console.log(a);return}}var e=a("./global"),f=a("./projString"),g=a("./wkt");e(d),b.exports=d},{"./global":35,"./projString":38,"./wkt":67}],33:[function(a,b,c){var d=a("./constants/Datum"),e=a("./constants/Ellipsoid"),f=a("./extend"),g=a("./datum"),h=1e-10,i=.16666666666666666,j=.04722222222222222,k=.022156084656084655;b.exports=function(a){if(a.datumCode&&"none"!==a.datumCode){var b=d[a.datumCode];b&&(a.datum_params=b.towgs84?b.towgs84.split(","):null,a.ellps=b.ellipse,a.datumName=b.datumName?b.datumName:a.datumCode)}if(!a.a){var c=e[a.ellps]?e[a.ellps]:e.WGS84;f(a,c)}return a.rf&&!a.b&&(a.b=(1-1/a.rf)*a.a),(0===a.rf||Math.abs(a.a-a.b)<h)&&(a.sphere=!0,a.b=a.a),a.a2=a.a*a.a,a.b2=a.b*a.b,a.es=(a.a2-a.b2)/a.a2,a.e=Math.sqrt(a.es),a.R_A&&(a.a*=1-a.es*(i+a.es*(j+a.es*k)),a.a2=a.a*a.a,a.b2=a.b*a.b,a.es=0),a.ep2=(a.a2-a.b2)/a.b2,a.k0||(a.k0=1),a.axis||(a.axis="enu"),a.datum||(a.datum=g(a)),a}},{"./constants/Datum":25,"./constants/Ellipsoid":26,"./datum":30,"./extend":34}],34:[function(a,b,c){b.exports=function(a,b){a=a||{};var c,d;if(!b)return a;for(d in b)c=b[d],void 0!==c&&(a[d]=c);return a}},{}],35:[function(a,b,c){b.exports=function(a){a("EPSG:4326","+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees"),a("EPSG:4269","+title=NAD83 (long/lat) +proj=longlat +a=6378137.0 +b=6356752.31414036 +ellps=GRS80 +datum=NAD83 +units=degrees"),a("EPSG:3857","+title=WGS 84 / Pseudo-Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs"),a.WGS84=a["EPSG:4326"],a["EPSG:3785"]=a["EPSG:3857"],a.GOOGLE=a["EPSG:3857"],a["EPSG:900913"]=a["EPSG:3857"],a["EPSG:102113"]=a["EPSG:3857"]}},{}],36:[function(a,b,c){var proj4=a("./core");proj4.defaultDatum="WGS84",proj4.Proj=a("./Proj"),proj4.WGS84=new proj4.Proj("WGS84"),proj4.Point=a("./Point"),proj4.toPoint=a("./common/toPoint"),proj4.defs=a("./defs"),proj4.transform=a("./transform"),proj4.mgrs=a("mgrs"),proj4.version=a("../package.json").version,a("./includedProjections")(proj4),b.exports=proj4},{"../package.json":69,"./Point":1,"./Proj":2,"./common/toPoint":23,"./core":29,"./defs":32,"./includedProjections":"./includedProjections","./transform":66,mgrs:68}],37:[function(a,b,c){function d(a){return"string"==typeof a}function e(a){return a in i}function f(a){var b=["GEOGCS","GEOCCS","PROJCS","LOCAL_CS"];return b.reduce(function(b,c){return b+1+a.indexOf(c)},0)}function g(a){return"+"===a[0]}function h(a){return d(a)?e(a)?i[a]:f(a)?j(a):g(a)?k(a):void 0:a}var i=a("./defs"),j=a("./wkt"),k=a("./projString");b.exports=h},{"./defs":32,"./projString":38,"./wkt":67}],38:[function(a,b,c){var d=.017453292519943295,e=a("./constants/PrimeMeridian"),f=a("./constants/units");b.exports=function(a){var b={},c={};a.split("+").map(function(a){return a.trim()}).filter(function(a){return a}).forEach(function(a){var b=a.split("=");b.push(!0),c[b[0].toLowerCase()]=b[1]});var g,h,i,j={proj:"projName",datum:"datumCode",rf:function(a){b.rf=parseFloat(a)},lat_0:function(a){b.lat0=a*d},lat_1:function(a){b.lat1=a*d},lat_2:function(a){b.lat2=a*d},lat_ts:function(a){b.lat_ts=a*d},lon_0:function(a){b.long0=a*d},lon_1:function(a){b.long1=a*d},lon_2:function(a){b.long2=a*d},alpha:function(a){b.alpha=parseFloat(a)*d},lonc:function(a){b.longc=a*d},x_0:function(a){b.x0=parseFloat(a)},y_0:function(a){b.y0=parseFloat(a)},k_0:function(a){b.k0=parseFloat(a)},k:function(a){b.k0=parseFloat(a)},a:function(a){b.a=parseFloat(a)},b:function(a){b.b=parseFloat(a)},r_a:function(){b.R_A=!0},zone:function(a){b.zone=parseInt(a,10)},south:function(){b.utmSouth=!0},towgs84:function(a){b.datum_params=a.split(",").map(function(a){return parseFloat(a)})},to_meter:function(a){b.to_meter=parseFloat(a)},units:function(a){b.units=a,f[a]&&(b.to_meter=f[a].to_meter)},from_greenwich:function(a){b.from_greenwich=a*d},pm:function(a){b.from_greenwich=(e[a]?e[a]:parseFloat(a))*d},nadgrids:function(a){"@null"===a?b.datumCode="none":b.nadgrids=a},axis:function(a){var c="ewnsud";3===a.length&&-1!==c.indexOf(a.substr(0,1))&&-1!==c.indexOf(a.substr(1,1))&&-1!==c.indexOf(a.substr(2,1))&&(b.axis=a)}};for(g in c)h=c[g],g in j?(i=j[g],"function"==typeof i?i(h):b[i]=h):b[g]=h;return"string"==typeof b.datumCode&&"WGS84"!==b.datumCode&&(b.datumCode=b.datumCode.toLowerCase()),b}},{"./constants/PrimeMeridian":27,"./constants/units":28}],39:[function(a,b,c){function d(a,b){var c=g.length;return a.names?(g[c]=a,a.names.forEach(function(a){f[a.toLowerCase()]=c}),this):(console.log(b),!0)}var e=[a("./projections/merc"),a("./projections/longlat")],f={},g=[];c.add=d,c.get=function(a){if(!a)return!1;var b=a.toLowerCase();return"undefined"!=typeof f[b]&&g[f[b]]?g[f[b]]:void 0},c.start=function(){e.forEach(d)}},{"./projections/longlat":51,"./projections/merc":52}],40:[function(a,b,c){var d=1e-10,e=a("../common/msfnz"),f=a("../common/qsfnz"),g=a("../common/adjust_lon"),h=a("../common/asinz");c.init=function(){Math.abs(this.lat1+this.lat2)<d||(this.temp=this.b/this.a,this.es=1-Math.pow(this.temp,2),this.e3=Math.sqrt(this.es),this.sin_po=Math.sin(this.lat1),this.cos_po=Math.cos(this.lat1),this.t1=this.sin_po,this.con=this.sin_po,this.ms1=e(this.e3,this.sin_po,this.cos_po),this.qs1=f(this.e3,this.sin_po,this.cos_po),this.sin_po=Math.sin(this.lat2),this.cos_po=Math.cos(this.lat2),this.t2=this.sin_po,this.ms2=e(this.e3,this.sin_po,this.cos_po),this.qs2=f(this.e3,this.sin_po,this.cos_po),this.sin_po=Math.sin(this.lat0),this.cos_po=Math.cos(this.lat0),this.t3=this.sin_po,this.qs0=f(this.e3,this.sin_po,this.cos_po),Math.abs(this.lat1-this.lat2)>d?this.ns0=(this.ms1*this.ms1-this.ms2*this.ms2)/(this.qs2-this.qs1):this.ns0=this.con,this.c=this.ms1*this.ms1+this.ns0*this.qs1,this.rh=this.a*Math.sqrt(this.c-this.ns0*this.qs0)/this.ns0)},c.forward=function(a){var b=a.x,c=a.y;this.sin_phi=Math.sin(c),this.cos_phi=Math.cos(c);var d=f(this.e3,this.sin_phi,this.cos_phi),e=this.a*Math.sqrt(this.c-this.ns0*d)/this.ns0,h=this.ns0*g(b-this.long0),i=e*Math.sin(h)+this.x0,j=this.rh-e*Math.cos(h)+this.y0;return a.x=i,a.y=j,a},c.inverse=function(a){var b,c,d,e,f,h;return a.x-=this.x0,a.y=this.rh-a.y+this.y0,this.ns0>=0?(b=Math.sqrt(a.x*a.x+a.y*a.y),d=1):(b=-Math.sqrt(a.x*a.x+a.y*a.y),d=-1),e=0,0!==b&&(e=Math.atan2(d*a.x,d*a.y)),d=b*this.ns0/this.a,this.sphere?h=Math.asin((this.c-d*d)/(2*this.ns0)):(c=(this.c-d*d)/this.ns0,h=this.phi1z(this.e3,c)),f=g(e/this.ns0+this.long0),a.x=f,a.y=h,a},c.phi1z=function(a,b){var c,e,f,g,i,j=h(.5*b);if(d>a)return j;for(var k=a*a,l=1;25>=l;l++)if(c=Math.sin(j),e=Math.cos(j),f=a*c,g=1-f*f,i=.5*g*g/e*(b/(1-k)-c/g+.5/a*Math.log((1-f)/(1+f))),j+=i,Math.abs(i)<=1e-7)return j;return null},c.names=["Albers_Conic_Equal_Area","Albers","aea"]},{"../common/adjust_lon":5,"../common/asinz":6,"../common/msfnz":15,"../common/qsfnz":20}],41:[function(a,b,c){var d=a("../common/adjust_lon"),e=Math.PI/2,f=1e-10,g=a("../common/mlfn"),h=a("../common/e0fn"),i=a("../common/e1fn"),j=a("../common/e2fn"),k=a("../common/e3fn"),l=a("../common/gN"),m=a("../common/asinz"),n=a("../common/imlfn");c.init=function(){this.sin_p12=Math.sin(this.lat0),this.cos_p12=Math.cos(this.lat0)},c.forward=function(a){var b,c,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H=a.x,I=a.y,J=Math.sin(a.y),K=Math.cos(a.y),L=d(H-this.long0);return this.sphere?Math.abs(this.sin_p12-1)<=f?(a.x=this.x0+this.a*(e-I)*Math.sin(L),a.y=this.y0-this.a*(e-I)*Math.cos(L),a):Math.abs(this.sin_p12+1)<=f?(a.x=this.x0+this.a*(e+I)*Math.sin(L),a.y=this.y0+this.a*(e+I)*Math.cos(L),a):(B=this.sin_p12*J+this.cos_p12*K*Math.cos(L),z=Math.acos(B),A=z/Math.sin(z),a.x=this.x0+this.a*A*K*Math.sin(L),a.y=this.y0+this.a*A*(this.cos_p12*J-this.sin_p12*K*Math.cos(L)),a):(b=h(this.es),c=i(this.es),m=j(this.es),n=k(this.es),Math.abs(this.sin_p12-1)<=f?(o=this.a*g(b,c,m,n,e),p=this.a*g(b,c,m,n,I),a.x=this.x0+(o-p)*Math.sin(L),a.y=this.y0-(o-p)*Math.cos(L),a):Math.abs(this.sin_p12+1)<=f?(o=this.a*g(b,c,m,n,e),p=this.a*g(b,c,m,n,I),a.x=this.x0+(o+p)*Math.sin(L),a.y=this.y0+(o+p)*Math.cos(L),a):(q=J/K,r=l(this.a,this.e,this.sin_p12),s=l(this.a,this.e,J),t=Math.atan((1-this.es)*q+this.es*r*this.sin_p12/(s*K)),u=Math.atan2(Math.sin(L),this.cos_p12*Math.tan(t)-this.sin_p12*Math.cos(L)),C=0===u?Math.asin(this.cos_p12*Math.sin(t)-this.sin_p12*Math.cos(t)):Math.abs(Math.abs(u)-Math.PI)<=f?-Math.asin(this.cos_p12*Math.sin(t)-this.sin_p12*Math.cos(t)):Math.asin(Math.sin(L)*Math.cos(t)/Math.sin(u)),v=this.e*this.sin_p12/Math.sqrt(1-this.es),w=this.e*this.cos_p12*Math.cos(u)/Math.sqrt(1-this.es),x=v*w,y=w*w,D=C*C,E=D*C,F=E*C,G=F*C,z=r*C*(1-D*y*(1-y)/6+E/8*x*(1-2*y)+F/120*(y*(4-7*y)-3*v*v*(1-7*y))-G/48*x),a.x=this.x0+z*Math.sin(u),a.y=this.y0+z*Math.cos(u),a))},c.inverse=function(a){a.x-=this.x0,a.y-=this.y0;var b,c,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I;if(this.sphere){if(b=Math.sqrt(a.x*a.x+a.y*a.y),b>2*e*this.a)return;return c=b/this.a,o=Math.sin(c),p=Math.cos(c),q=this.long0,Math.abs(b)<=f?r=this.lat0:(r=m(p*this.sin_p12+a.y*o*this.cos_p12/b),s=Math.abs(this.lat0)-e,q=d(Math.abs(s)<=f?this.lat0>=0?this.long0+Math.atan2(a.x,-a.y):this.long0-Math.atan2(-a.x,a.y):this.long0+Math.atan2(a.x*o,b*this.cos_p12*p-a.y*this.sin_p12*o))),a.x=q,a.y=r,a}return t=h(this.es),u=i(this.es),v=j(this.es),w=k(this.es),Math.abs(this.sin_p12-1)<=f?(x=this.a*g(t,u,v,w,e),b=Math.sqrt(a.x*a.x+a.y*a.y),y=x-b,r=n(y/this.a,t,u,v,w),q=d(this.long0+Math.atan2(a.x,-1*a.y)),a.x=q,a.y=r,a):Math.abs(this.sin_p12+1)<=f?(x=this.a*g(t,u,v,w,e),b=Math.sqrt(a.x*a.x+a.y*a.y),y=b-x,r=n(y/this.a,t,u,v,w),q=d(this.long0+Math.atan2(a.x,a.y)),a.x=q,a.y=r,a):(b=Math.sqrt(a.x*a.x+a.y*a.y),B=Math.atan2(a.x,a.y),z=l(this.a,this.e,this.sin_p12),C=Math.cos(B),D=this.e*this.cos_p12*C,E=-D*D/(1-this.es),F=3*this.es*(1-E)*this.sin_p12*this.cos_p12*C/(1-this.es),G=b/z,H=G-E*(1+E)*Math.pow(G,3)/6-F*(1+3*E)*Math.pow(G,4)/24,I=1-E*H*H/2-G*H*H*H/6,A=Math.asin(this.sin_p12*Math.cos(H)+this.cos_p12*Math.sin(H)*C),q=d(this.long0+Math.asin(Math.sin(B)*Math.sin(H)/Math.cos(A))),r=Math.atan((1-this.es*I*this.sin_p12/Math.sin(A))*Math.tan(A)/(1-this.es)),a.x=q,a.y=r,a)},c.names=["Azimuthal_Equidistant","aeqd"]},{"../common/adjust_lon":5,"../common/asinz":6,"../common/e0fn":7,"../common/e1fn":8,"../common/e2fn":9,"../common/e3fn":10,"../common/gN":11,"../common/imlfn":12,"../common/mlfn":14}],42:[function(a,b,c){var d=a("../common/mlfn"),e=a("../common/e0fn"),f=a("../common/e1fn"),g=a("../common/e2fn"),h=a("../common/e3fn"),i=a("../common/gN"),j=a("../common/adjust_lon"),k=a("../common/adjust_lat"),l=a("../common/imlfn"),m=Math.PI/2,n=1e-10;c.init=function(){this.sphere||(this.e0=e(this.es),this.e1=f(this.es),this.e2=g(this.es),this.e3=h(this.es),this.ml0=this.a*d(this.e0,this.e1,this.e2,this.e3,this.lat0))},c.forward=function(a){var b,c,e=a.x,f=a.y;if(e=j(e-this.long0),this.sphere)b=this.a*Math.asin(Math.cos(f)*Math.sin(e)),c=this.a*(Math.atan2(Math.tan(f),Math.cos(e))-this.lat0);else{var g=Math.sin(f),h=Math.cos(f),k=i(this.a,this.e,g),l=Math.tan(f)*Math.tan(f),m=e*Math.cos(f),n=m*m,o=this.es*h*h/(1-this.es),p=this.a*d(this.e0,this.e1,this.e2,this.e3,f);b=k*m*(1-n*l*(1/6-(8-l+8*o)*n/120)),c=p-this.ml0+k*g/h*n*(.5+(5-l+6*o)*n/24)}return a.x=b+this.x0,a.y=c+this.y0,a},c.inverse=function(a){a.x-=this.x0,a.y-=this.y0;var b,c,d=a.x/this.a,e=a.y/this.a;if(this.sphere){var f=e+this.lat0;b=Math.asin(Math.sin(f)*Math.cos(d)),c=Math.atan2(Math.tan(d),Math.cos(f))}else{var g=this.ml0/this.a+e,h=l(g,this.e0,this.e1,this.e2,this.e3);if(Math.abs(Math.abs(h)-m)<=n)return a.x=this.long0,a.y=m,0>e&&(a.y*=-1),a;var o=i(this.a,this.e,Math.sin(h)),p=o*o*o/this.a/this.a*(1-this.es),q=Math.pow(Math.tan(h),2),r=d*this.a/o,s=r*r;b=h-o*Math.tan(h)/p*r*r*(.5-(1+3*q)*r*r/24),c=r*(1-s*(q/3+(1+3*q)*q*s/15))/Math.cos(h)}return a.x=j(c+this.long0),a.y=k(b),a},c.names=["Cassini","Cassini_Soldner","cass"]},{"../common/adjust_lat":4,"../common/adjust_lon":5,"../common/e0fn":7,"../common/e1fn":8,"../common/e2fn":9,"../common/e3fn":10,"../common/gN":11,"../common/imlfn":12,"../common/mlfn":14}],43:[function(a,b,c){var d=a("../common/adjust_lon"),e=a("../common/qsfnz"),f=a("../common/msfnz"),g=a("../common/iqsfnz");c.init=function(){this.sphere||(this.k0=f(this.e,Math.sin(this.lat_ts),Math.cos(this.lat_ts)))},c.forward=function(a){var b,c,f=a.x,g=a.y,h=d(f-this.long0);if(this.sphere)b=this.x0+this.a*h*Math.cos(this.lat_ts),c=this.y0+this.a*Math.sin(g)/Math.cos(this.lat_ts);else{var i=e(this.e,Math.sin(g));b=this.x0+this.a*this.k0*h,c=this.y0+this.a*i*.5/this.k0}return a.x=b,a.y=c,a},c.inverse=function(a){a.x-=this.x0,a.y-=this.y0;var b,c;return this.sphere?(b=d(this.long0+a.x/this.a/Math.cos(this.lat_ts)),c=Math.asin(a.y/this.a*Math.cos(this.lat_ts))):(c=g(this.e,2*a.y*this.k0/this.a),b=d(this.long0+a.x/(this.a*this.k0))),a.x=b,a.y=c,a},c.names=["cea"]},{"../common/adjust_lon":5,"../common/iqsfnz":13,"../common/msfnz":15,"../common/qsfnz":20}],44:[function(a,b,c){var d=a("../common/adjust_lon"),e=a("../common/adjust_lat");c.init=function(){this.x0=this.x0||0,this.y0=this.y0||0,this.lat0=this.lat0||0,this.long0=this.long0||0,this.lat_ts=this.lat_ts||0,this.title=this.title||"Equidistant Cylindrical (Plate Carre)",this.rc=Math.cos(this.lat_ts)},c.forward=function(a){var b=a.x,c=a.y,f=d(b-this.long0),g=e(c-this.lat0);return a.x=this.x0+this.a*f*this.rc,a.y=this.y0+this.a*g,a},c.inverse=function(a){var b=a.x,c=a.y;return a.x=d(this.long0+(b-this.x0)/(this.a*this.rc)),a.y=e(this.lat0+(c-this.y0)/this.a),a},c.names=["Equirectangular","Equidistant_Cylindrical","eqc"]},{"../common/adjust_lat":4,"../common/adjust_lon":5}],45:[function(a,b,c){var d=a("../common/e0fn"),e=a("../common/e1fn"),f=a("../common/e2fn"),g=a("../common/e3fn"),h=a("../common/msfnz"),i=a("../common/mlfn"),j=a("../common/adjust_lon"),k=a("../common/adjust_lat"),l=a("../common/imlfn"),m=1e-10;c.init=function(){Math.abs(this.lat1+this.lat2)<m||(this.lat2=this.lat2||this.lat1,this.temp=this.b/this.a,this.es=1-Math.pow(this.temp,2),this.e=Math.sqrt(this.es),this.e0=d(this.es),this.e1=e(this.es),this.e2=f(this.es),this.e3=g(this.es),this.sinphi=Math.sin(this.lat1),this.cosphi=Math.cos(this.lat1),this.ms1=h(this.e,this.sinphi,this.cosphi),this.ml1=i(this.e0,this.e1,this.e2,this.e3,this.lat1),Math.abs(this.lat1-this.lat2)<m?this.ns=this.sinphi:(this.sinphi=Math.sin(this.lat2),this.cosphi=Math.cos(this.lat2),this.ms2=h(this.e,this.sinphi,this.cosphi),this.ml2=i(this.e0,this.e1,this.e2,this.e3,this.lat2),this.ns=(this.ms1-this.ms2)/(this.ml2-this.ml1)),this.g=this.ml1+this.ms1/this.ns,this.ml0=i(this.e0,this.e1,this.e2,this.e3,this.lat0),this.rh=this.a*(this.g-this.ml0))},c.forward=function(a){var b,c=a.x,d=a.y;if(this.sphere)b=this.a*(this.g-d);else{var e=i(this.e0,this.e1,this.e2,this.e3,d);b=this.a*(this.g-e)}var f=this.ns*j(c-this.long0),g=this.x0+b*Math.sin(f),h=this.y0+this.rh-b*Math.cos(f);return a.x=g,a.y=h,a},c.inverse=function(a){a.x-=this.x0,a.y=this.rh-a.y+this.y0;var b,c,d,e;this.ns>=0?(c=Math.sqrt(a.x*a.x+a.y*a.y),
	b=1):(c=-Math.sqrt(a.x*a.x+a.y*a.y),b=-1);var f=0;if(0!==c&&(f=Math.atan2(b*a.x,b*a.y)),this.sphere)return e=j(this.long0+f/this.ns),d=k(this.g-c/this.a),a.x=e,a.y=d,a;var g=this.g-c/this.a;return d=l(g,this.e0,this.e1,this.e2,this.e3),e=j(this.long0+f/this.ns),a.x=e,a.y=d,a},c.names=["Equidistant_Conic","eqdc"]},{"../common/adjust_lat":4,"../common/adjust_lon":5,"../common/e0fn":7,"../common/e1fn":8,"../common/e2fn":9,"../common/e3fn":10,"../common/imlfn":12,"../common/mlfn":14,"../common/msfnz":15}],46:[function(a,b,c){var d=Math.PI/4,e=a("../common/srat"),f=Math.PI/2,g=20;c.init=function(){var a=Math.sin(this.lat0),b=Math.cos(this.lat0);b*=b,this.rc=Math.sqrt(1-this.es)/(1-this.es*a*a),this.C=Math.sqrt(1+this.es*b*b/(1-this.es)),this.phic0=Math.asin(a/this.C),this.ratexp=.5*this.C*this.e,this.K=Math.tan(.5*this.phic0+d)/(Math.pow(Math.tan(.5*this.lat0+d),this.C)*e(this.e*a,this.ratexp))},c.forward=function(a){var b=a.x,c=a.y;return a.y=2*Math.atan(this.K*Math.pow(Math.tan(.5*c+d),this.C)*e(this.e*Math.sin(c),this.ratexp))-f,a.x=this.C*b,a},c.inverse=function(a){for(var b=1e-14,c=a.x/this.C,h=a.y,i=Math.pow(Math.tan(.5*h+d)/this.K,1/this.C),j=g;j>0&&(h=2*Math.atan(i*e(this.e*Math.sin(a.y),-.5*this.e))-f,!(Math.abs(h-a.y)<b));--j)a.y=h;return j?(a.x=c,a.y=h,a):null},c.names=["gauss"]},{"../common/srat":22}],47:[function(a,b,c){var d=a("../common/adjust_lon"),e=1e-10,f=a("../common/asinz");c.init=function(){this.sin_p14=Math.sin(this.lat0),this.cos_p14=Math.cos(this.lat0),this.infinity_dist=1e3*this.a,this.rc=1},c.forward=function(a){var b,c,f,g,h,i,j,k,l=a.x,m=a.y;return f=d(l-this.long0),b=Math.sin(m),c=Math.cos(m),g=Math.cos(f),i=this.sin_p14*b+this.cos_p14*c*g,h=1,i>0||Math.abs(i)<=e?(j=this.x0+this.a*h*c*Math.sin(f)/i,k=this.y0+this.a*h*(this.cos_p14*b-this.sin_p14*c*g)/i):(j=this.x0+this.infinity_dist*c*Math.sin(f),k=this.y0+this.infinity_dist*(this.cos_p14*b-this.sin_p14*c*g)),a.x=j,a.y=k,a},c.inverse=function(a){var b,c,e,g,h,i;return a.x=(a.x-this.x0)/this.a,a.y=(a.y-this.y0)/this.a,a.x/=this.k0,a.y/=this.k0,(b=Math.sqrt(a.x*a.x+a.y*a.y))?(g=Math.atan2(b,this.rc),c=Math.sin(g),e=Math.cos(g),i=f(e*this.sin_p14+a.y*c*this.cos_p14/b),h=Math.atan2(a.x*c,b*this.cos_p14*e-a.y*this.sin_p14*c),h=d(this.long0+h)):(i=this.phic0,h=0),a.x=h,a.y=i,a},c.names=["gnom"]},{"../common/adjust_lon":5,"../common/asinz":6}],48:[function(a,b,c){var d=a("../common/adjust_lon");c.init=function(){this.a=6377397.155,this.es=.006674372230614,this.e=Math.sqrt(this.es),this.lat0||(this.lat0=.863937979737193),this.long0||(this.long0=.4334234309119251),this.k0||(this.k0=.9999),this.s45=.785398163397448,this.s90=2*this.s45,this.fi0=this.lat0,this.e2=this.es,this.e=Math.sqrt(this.e2),this.alfa=Math.sqrt(1+this.e2*Math.pow(Math.cos(this.fi0),4)/(1-this.e2)),this.uq=1.04216856380474,this.u0=Math.asin(Math.sin(this.fi0)/this.alfa),this.g=Math.pow((1+this.e*Math.sin(this.fi0))/(1-this.e*Math.sin(this.fi0)),this.alfa*this.e/2),this.k=Math.tan(this.u0/2+this.s45)/Math.pow(Math.tan(this.fi0/2+this.s45),this.alfa)*this.g,this.k1=this.k0,this.n0=this.a*Math.sqrt(1-this.e2)/(1-this.e2*Math.pow(Math.sin(this.fi0),2)),this.s0=1.37008346281555,this.n=Math.sin(this.s0),this.ro0=this.k1*this.n0/Math.tan(this.s0),this.ad=this.s90-this.uq},c.forward=function(a){var b,c,e,f,g,h,i,j=a.x,k=a.y,l=d(j-this.long0);return b=Math.pow((1+this.e*Math.sin(k))/(1-this.e*Math.sin(k)),this.alfa*this.e/2),c=2*(Math.atan(this.k*Math.pow(Math.tan(k/2+this.s45),this.alfa)/b)-this.s45),e=-l*this.alfa,f=Math.asin(Math.cos(this.ad)*Math.sin(c)+Math.sin(this.ad)*Math.cos(c)*Math.cos(e)),g=Math.asin(Math.cos(c)*Math.sin(e)/Math.cos(f)),h=this.n*g,i=this.ro0*Math.pow(Math.tan(this.s0/2+this.s45),this.n)/Math.pow(Math.tan(f/2+this.s45),this.n),a.y=i*Math.cos(h)/1,a.x=i*Math.sin(h)/1,this.czech||(a.y*=-1,a.x*=-1),a},c.inverse=function(a){var b,c,d,e,f,g,h,i,j=a.x;a.x=a.y,a.y=j,this.czech||(a.y*=-1,a.x*=-1),g=Math.sqrt(a.x*a.x+a.y*a.y),f=Math.atan2(a.y,a.x),e=f/Math.sin(this.s0),d=2*(Math.atan(Math.pow(this.ro0/g,1/this.n)*Math.tan(this.s0/2+this.s45))-this.s45),b=Math.asin(Math.cos(this.ad)*Math.sin(d)-Math.sin(this.ad)*Math.cos(d)*Math.cos(e)),c=Math.asin(Math.cos(d)*Math.sin(e)/Math.cos(b)),a.x=this.long0-c/this.alfa,h=b,i=0;var k=0;do a.y=2*(Math.atan(Math.pow(this.k,-1/this.alfa)*Math.pow(Math.tan(b/2+this.s45),1/this.alfa)*Math.pow((1+this.e*Math.sin(h))/(1-this.e*Math.sin(h)),this.e/2))-this.s45),Math.abs(h-a.y)<1e-10&&(i=1),h=a.y,k+=1;while(0===i&&15>k);return k>=15?null:a},c.names=["Krovak","krovak"]},{"../common/adjust_lon":5}],49:[function(a,b,c){var d=Math.PI/2,e=Math.PI/4,f=1e-10,g=a("../common/qsfnz"),h=a("../common/adjust_lon");c.S_POLE=1,c.N_POLE=2,c.EQUIT=3,c.OBLIQ=4,c.init=function(){var a=Math.abs(this.lat0);if(Math.abs(a-d)<f?this.mode=this.lat0<0?this.S_POLE:this.N_POLE:Math.abs(a)<f?this.mode=this.EQUIT:this.mode=this.OBLIQ,this.es>0){var b;switch(this.qp=g(this.e,1),this.mmf=.5/(1-this.es),this.apa=this.authset(this.es),this.mode){case this.N_POLE:this.dd=1;break;case this.S_POLE:this.dd=1;break;case this.EQUIT:this.rq=Math.sqrt(.5*this.qp),this.dd=1/this.rq,this.xmf=1,this.ymf=.5*this.qp;break;case this.OBLIQ:this.rq=Math.sqrt(.5*this.qp),b=Math.sin(this.lat0),this.sinb1=g(this.e,b)/this.qp,this.cosb1=Math.sqrt(1-this.sinb1*this.sinb1),this.dd=Math.cos(this.lat0)/(Math.sqrt(1-this.es*b*b)*this.rq*this.cosb1),this.ymf=(this.xmf=this.rq)/this.dd,this.xmf*=this.dd}}else this.mode===this.OBLIQ&&(this.sinph0=Math.sin(this.lat0),this.cosph0=Math.cos(this.lat0))},c.forward=function(a){var b,c,i,j,k,l,m,n,o,p,q=a.x,r=a.y;if(q=h(q-this.long0),this.sphere){if(k=Math.sin(r),p=Math.cos(r),i=Math.cos(q),this.mode===this.OBLIQ||this.mode===this.EQUIT){if(c=this.mode===this.EQUIT?1+p*i:1+this.sinph0*k+this.cosph0*p*i,f>=c)return null;c=Math.sqrt(2/c),b=c*p*Math.sin(q),c*=this.mode===this.EQUIT?k:this.cosph0*k-this.sinph0*p*i}else if(this.mode===this.N_POLE||this.mode===this.S_POLE){if(this.mode===this.N_POLE&&(i=-i),Math.abs(r+this.phi0)<f)return null;c=e-.5*r,c=2*(this.mode===this.S_POLE?Math.cos(c):Math.sin(c)),b=c*Math.sin(q),c*=i}}else{switch(m=0,n=0,o=0,i=Math.cos(q),j=Math.sin(q),k=Math.sin(r),l=g(this.e,k),this.mode!==this.OBLIQ&&this.mode!==this.EQUIT||(m=l/this.qp,n=Math.sqrt(1-m*m)),this.mode){case this.OBLIQ:o=1+this.sinb1*m+this.cosb1*n*i;break;case this.EQUIT:o=1+n*i;break;case this.N_POLE:o=d+r,l=this.qp-l;break;case this.S_POLE:o=r-d,l=this.qp+l}if(Math.abs(o)<f)return null;switch(this.mode){case this.OBLIQ:case this.EQUIT:o=Math.sqrt(2/o),c=this.mode===this.OBLIQ?this.ymf*o*(this.cosb1*m-this.sinb1*n*i):(o=Math.sqrt(2/(1+n*i)))*m*this.ymf,b=this.xmf*o*n*j;break;case this.N_POLE:case this.S_POLE:l>=0?(b=(o=Math.sqrt(l))*j,c=i*(this.mode===this.S_POLE?o:-o)):b=c=0}}return a.x=this.a*b+this.x0,a.y=this.a*c+this.y0,a},c.inverse=function(a){a.x-=this.x0,a.y-=this.y0;var b,c,e,g,i,j,k,l=a.x/this.a,m=a.y/this.a;if(this.sphere){var n,o=0,p=0;if(n=Math.sqrt(l*l+m*m),c=.5*n,c>1)return null;switch(c=2*Math.asin(c),this.mode!==this.OBLIQ&&this.mode!==this.EQUIT||(p=Math.sin(c),o=Math.cos(c)),this.mode){case this.EQUIT:c=Math.abs(n)<=f?0:Math.asin(m*p/n),l*=p,m=o*n;break;case this.OBLIQ:c=Math.abs(n)<=f?this.phi0:Math.asin(o*this.sinph0+m*p*this.cosph0/n),l*=p*this.cosph0,m=(o-Math.sin(c)*this.sinph0)*n;break;case this.N_POLE:m=-m,c=d-c;break;case this.S_POLE:c-=d}b=0!==m||this.mode!==this.EQUIT&&this.mode!==this.OBLIQ?Math.atan2(l,m):0}else{if(k=0,this.mode===this.OBLIQ||this.mode===this.EQUIT){if(l/=this.dd,m*=this.dd,j=Math.sqrt(l*l+m*m),f>j)return a.x=0,a.y=this.phi0,a;g=2*Math.asin(.5*j/this.rq),e=Math.cos(g),l*=g=Math.sin(g),this.mode===this.OBLIQ?(k=e*this.sinb1+m*g*this.cosb1/j,i=this.qp*k,m=j*this.cosb1*e-m*this.sinb1*g):(k=m*g/j,i=this.qp*k,m=j*e)}else if(this.mode===this.N_POLE||this.mode===this.S_POLE){if(this.mode===this.N_POLE&&(m=-m),i=l*l+m*m,!i)return a.x=0,a.y=this.phi0,a;k=1-i/this.qp,this.mode===this.S_POLE&&(k=-k)}b=Math.atan2(l,m),c=this.authlat(Math.asin(k),this.apa)}return a.x=h(this.long0+b),a.y=c,a},c.P00=.3333333333333333,c.P01=.17222222222222222,c.P02=.10257936507936508,c.P10=.06388888888888888,c.P11=.0664021164021164,c.P20=.016415012942191543,c.authset=function(a){var b,c=[];return c[0]=a*this.P00,b=a*a,c[0]+=b*this.P01,c[1]=b*this.P10,b*=a,c[0]+=b*this.P02,c[1]+=b*this.P11,c[2]=b*this.P20,c},c.authlat=function(a,b){var c=a+a;return a+b[0]*Math.sin(c)+b[1]*Math.sin(c+c)+b[2]*Math.sin(c+c+c)},c.names=["Lambert Azimuthal Equal Area","Lambert_Azimuthal_Equal_Area","laea"]},{"../common/adjust_lon":5,"../common/qsfnz":20}],50:[function(a,b,c){var d=1e-10,e=a("../common/msfnz"),f=a("../common/tsfnz"),g=Math.PI/2,h=a("../common/sign"),i=a("../common/adjust_lon"),j=a("../common/phi2z");c.init=function(){if(this.lat2||(this.lat2=this.lat1),this.k0||(this.k0=1),this.x0=this.x0||0,this.y0=this.y0||0,!(Math.abs(this.lat1+this.lat2)<d)){var a=this.b/this.a;this.e=Math.sqrt(1-a*a);var b=Math.sin(this.lat1),c=Math.cos(this.lat1),g=e(this.e,b,c),h=f(this.e,this.lat1,b),i=Math.sin(this.lat2),j=Math.cos(this.lat2),k=e(this.e,i,j),l=f(this.e,this.lat2,i),m=f(this.e,this.lat0,Math.sin(this.lat0));Math.abs(this.lat1-this.lat2)>d?this.ns=Math.log(g/k)/Math.log(h/l):this.ns=b,isNaN(this.ns)&&(this.ns=b),this.f0=g/(this.ns*Math.pow(h,this.ns)),this.rh=this.a*this.f0*Math.pow(m,this.ns),this.title||(this.title="Lambert Conformal Conic")}},c.forward=function(a){var b=a.x,c=a.y;Math.abs(2*Math.abs(c)-Math.PI)<=d&&(c=h(c)*(g-2*d));var e,j,k=Math.abs(Math.abs(c)-g);if(k>d)e=f(this.e,c,Math.sin(c)),j=this.a*this.f0*Math.pow(e,this.ns);else{if(k=c*this.ns,0>=k)return null;j=0}var l=this.ns*i(b-this.long0);return a.x=this.k0*(j*Math.sin(l))+this.x0,a.y=this.k0*(this.rh-j*Math.cos(l))+this.y0,a},c.inverse=function(a){var b,c,d,e,f,h=(a.x-this.x0)/this.k0,k=this.rh-(a.y-this.y0)/this.k0;this.ns>0?(b=Math.sqrt(h*h+k*k),c=1):(b=-Math.sqrt(h*h+k*k),c=-1);var l=0;if(0!==b&&(l=Math.atan2(c*h,c*k)),0!==b||this.ns>0){if(c=1/this.ns,d=Math.pow(b/(this.a*this.f0),c),e=j(this.e,d),-9999===e)return null}else e=-g;return f=i(l/this.ns+this.long0),a.x=f,a.y=e,a},c.names=["Lambert Tangential Conformal Conic Projection","Lambert_Conformal_Conic","Lambert_Conformal_Conic_2SP","lcc"]},{"../common/adjust_lon":5,"../common/msfnz":15,"../common/phi2z":16,"../common/sign":21,"../common/tsfnz":24}],51:[function(a,b,c){function d(a){return a}c.init=function(){},c.forward=d,c.inverse=d,c.names=["longlat","identity"]},{}],52:[function(a,b,c){var d=a("../common/msfnz"),e=Math.PI/2,f=1e-10,g=57.29577951308232,h=a("../common/adjust_lon"),i=Math.PI/4,j=a("../common/tsfnz"),k=a("../common/phi2z");c.init=function(){var a=this.b/this.a;this.es=1-a*a,"x0"in this||(this.x0=0),"y0"in this||(this.y0=0),this.e=Math.sqrt(this.es),this.lat_ts?this.sphere?this.k0=Math.cos(this.lat_ts):this.k0=d(this.e,Math.sin(this.lat_ts),Math.cos(this.lat_ts)):this.k0||(this.k?this.k0=this.k:this.k0=1)},c.forward=function(a){var b=a.x,c=a.y;if(c*g>90&&-90>c*g&&b*g>180&&-180>b*g)return null;var d,k;if(Math.abs(Math.abs(c)-e)<=f)return null;if(this.sphere)d=this.x0+this.a*this.k0*h(b-this.long0),k=this.y0+this.a*this.k0*Math.log(Math.tan(i+.5*c));else{var l=Math.sin(c),m=j(this.e,c,l);d=this.x0+this.a*this.k0*h(b-this.long0),k=this.y0-this.a*this.k0*Math.log(m)}return a.x=d,a.y=k,a},c.inverse=function(a){var b,c,d=a.x-this.x0,f=a.y-this.y0;if(this.sphere)c=e-2*Math.atan(Math.exp(-f/(this.a*this.k0)));else{var g=Math.exp(-f/(this.a*this.k0));if(c=k(this.e,g),-9999===c)return null}return b=h(this.long0+d/(this.a*this.k0)),a.x=b,a.y=c,a},c.names=["Mercator","Popular Visualisation Pseudo Mercator","Mercator_1SP","Mercator_Auxiliary_Sphere","merc"]},{"../common/adjust_lon":5,"../common/msfnz":15,"../common/phi2z":16,"../common/tsfnz":24}],53:[function(a,b,c){var d=a("../common/adjust_lon");c.init=function(){},c.forward=function(a){var b=a.x,c=a.y,e=d(b-this.long0),f=this.x0+this.a*e,g=this.y0+this.a*Math.log(Math.tan(Math.PI/4+c/2.5))*1.25;return a.x=f,a.y=g,a},c.inverse=function(a){a.x-=this.x0,a.y-=this.y0;var b=d(this.long0+a.x/this.a),c=2.5*(Math.atan(Math.exp(.8*a.y/this.a))-Math.PI/4);return a.x=b,a.y=c,a},c.names=["Miller_Cylindrical","mill"]},{"../common/adjust_lon":5}],54:[function(a,b,c){var d=a("../common/adjust_lon"),e=1e-10;c.init=function(){},c.forward=function(a){for(var b=a.x,c=a.y,f=d(b-this.long0),g=c,h=Math.PI*Math.sin(c),i=0;!0;i++){var j=-(g+Math.sin(g)-h)/(1+Math.cos(g));if(g+=j,Math.abs(j)<e)break}g/=2,Math.PI/2-Math.abs(c)<e&&(f=0);var k=.900316316158*this.a*f*Math.cos(g)+this.x0,l=1.4142135623731*this.a*Math.sin(g)+this.y0;return a.x=k,a.y=l,a},c.inverse=function(a){var b,c;a.x-=this.x0,a.y-=this.y0,c=a.y/(1.4142135623731*this.a),Math.abs(c)>.999999999999&&(c=.999999999999),b=Math.asin(c);var e=d(this.long0+a.x/(.900316316158*this.a*Math.cos(b)));e<-Math.PI&&(e=-Math.PI),e>Math.PI&&(e=Math.PI),c=(2*b+Math.sin(2*b))/Math.PI,Math.abs(c)>1&&(c=1);var f=Math.asin(c);return a.x=e,a.y=f,a},c.names=["Mollweide","moll"]},{"../common/adjust_lon":5}],55:[function(a,b,c){var d=484813681109536e-20;c.iterations=1,c.init=function(){this.A=[],this.A[1]=.6399175073,this.A[2]=-.1358797613,this.A[3]=.063294409,this.A[4]=-.02526853,this.A[5]=.0117879,this.A[6]=-.0055161,this.A[7]=.0026906,this.A[8]=-.001333,this.A[9]=67e-5,this.A[10]=-34e-5,this.B_re=[],this.B_im=[],this.B_re[1]=.7557853228,this.B_im[1]=0,this.B_re[2]=.249204646,this.B_im[2]=.003371507,this.B_re[3]=-.001541739,this.B_im[3]=.04105856,this.B_re[4]=-.10162907,this.B_im[4]=.01727609,this.B_re[5]=-.26623489,this.B_im[5]=-.36249218,this.B_re[6]=-.6870983,this.B_im[6]=-1.1651967,this.C_re=[],this.C_im=[],this.C_re[1]=1.3231270439,this.C_im[1]=0,this.C_re[2]=-.577245789,this.C_im[2]=-.007809598,this.C_re[3]=.508307513,this.C_im[3]=-.112208952,this.C_re[4]=-.15094762,this.C_im[4]=.18200602,this.C_re[5]=1.01418179,this.C_im[5]=1.64497696,this.C_re[6]=1.9660549,this.C_im[6]=2.5127645,this.D=[],this.D[1]=1.5627014243,this.D[2]=.5185406398,this.D[3]=-.03333098,this.D[4]=-.1052906,this.D[5]=-.0368594,this.D[6]=.007317,this.D[7]=.0122,this.D[8]=.00394,this.D[9]=-.0013},c.forward=function(a){var b,c=a.x,e=a.y,f=e-this.lat0,g=c-this.long0,h=f/d*1e-5,i=g,j=1,k=0;for(b=1;10>=b;b++)j*=h,k+=this.A[b]*j;var l,m,n=k,o=i,p=1,q=0,r=0,s=0;for(b=1;6>=b;b++)l=p*n-q*o,m=q*n+p*o,p=l,q=m,r=r+this.B_re[b]*p-this.B_im[b]*q,s=s+this.B_im[b]*p+this.B_re[b]*q;return a.x=s*this.a+this.x0,a.y=r*this.a+this.y0,a},c.inverse=function(a){var b,c,e,f=a.x,g=a.y,h=f-this.x0,i=g-this.y0,j=i/this.a,k=h/this.a,l=1,m=0,n=0,o=0;for(b=1;6>=b;b++)c=l*j-m*k,e=m*j+l*k,l=c,m=e,n=n+this.C_re[b]*l-this.C_im[b]*m,o=o+this.C_im[b]*l+this.C_re[b]*m;for(var p=0;p<this.iterations;p++){var q,r,s=n,t=o,u=j,v=k;for(b=2;6>=b;b++)q=s*n-t*o,r=t*n+s*o,s=q,t=r,u+=(b-1)*(this.B_re[b]*s-this.B_im[b]*t),v+=(b-1)*(this.B_im[b]*s+this.B_re[b]*t);s=1,t=0;var w=this.B_re[1],x=this.B_im[1];for(b=2;6>=b;b++)q=s*n-t*o,r=t*n+s*o,s=q,t=r,w+=b*(this.B_re[b]*s-this.B_im[b]*t),x+=b*(this.B_im[b]*s+this.B_re[b]*t);var y=w*w+x*x;n=(u*w+v*x)/y,o=(v*w-u*x)/y}var z=n,A=o,B=1,C=0;for(b=1;9>=b;b++)B*=z,C+=this.D[b]*B;var D=this.lat0+C*d*1e5,E=this.long0+A;return a.x=E,a.y=D,a},c.names=["New_Zealand_Map_Grid","nzmg"]},{}],56:[function(a,b,c){var d=a("../common/tsfnz"),e=a("../common/adjust_lon"),f=a("../common/phi2z"),g=Math.PI/2,h=Math.PI/4,i=1e-10;c.init=function(){this.no_off=this.no_off||!1,this.no_rot=this.no_rot||!1,isNaN(this.k0)&&(this.k0=1);var a=Math.sin(this.lat0),b=Math.cos(this.lat0),c=this.e*a;this.bl=Math.sqrt(1+this.es/(1-this.es)*Math.pow(b,4)),this.al=this.a*this.bl*this.k0*Math.sqrt(1-this.es)/(1-c*c);var f=d(this.e,this.lat0,a),g=this.bl/b*Math.sqrt((1-this.es)/(1-c*c));1>g*g&&(g=1);var h,i;if(isNaN(this.longc)){var j=d(this.e,this.lat1,Math.sin(this.lat1)),k=d(this.e,this.lat2,Math.sin(this.lat2));this.lat0>=0?this.el=(g+Math.sqrt(g*g-1))*Math.pow(f,this.bl):this.el=(g-Math.sqrt(g*g-1))*Math.pow(f,this.bl);var l=Math.pow(j,this.bl),m=Math.pow(k,this.bl);h=this.el/l,i=.5*(h-1/h);var n=(this.el*this.el-m*l)/(this.el*this.el+m*l),o=(m-l)/(m+l),p=e(this.long1-this.long2);this.long0=.5*(this.long1+this.long2)-Math.atan(n*Math.tan(.5*this.bl*p)/o)/this.bl,this.long0=e(this.long0);var q=e(this.long1-this.long0);this.gamma0=Math.atan(Math.sin(this.bl*q)/i),this.alpha=Math.asin(g*Math.sin(this.gamma0))}else h=this.lat0>=0?g+Math.sqrt(g*g-1):g-Math.sqrt(g*g-1),this.el=h*Math.pow(f,this.bl),i=.5*(h-1/h),this.gamma0=Math.asin(Math.sin(this.alpha)/g),this.long0=this.longc-Math.asin(i*Math.tan(this.gamma0))/this.bl;this.no_off?this.uc=0:this.lat0>=0?this.uc=this.al/this.bl*Math.atan2(Math.sqrt(g*g-1),Math.cos(this.alpha)):this.uc=-1*this.al/this.bl*Math.atan2(Math.sqrt(g*g-1),Math.cos(this.alpha))},c.forward=function(a){var b,c,f,j=a.x,k=a.y,l=e(j-this.long0);if(Math.abs(Math.abs(k)-g)<=i)f=k>0?-1:1,c=this.al/this.bl*Math.log(Math.tan(h+f*this.gamma0*.5)),b=-1*f*g*this.al/this.bl;else{var m=d(this.e,k,Math.sin(k)),n=this.el/Math.pow(m,this.bl),o=.5*(n-1/n),p=.5*(n+1/n),q=Math.sin(this.bl*l),r=(o*Math.sin(this.gamma0)-q*Math.cos(this.gamma0))/p;c=Math.abs(Math.abs(r)-1)<=i?Number.POSITIVE_INFINITY:.5*this.al*Math.log((1-r)/(1+r))/this.bl,b=Math.abs(Math.cos(this.bl*l))<=i?this.al*this.bl*l:this.al*Math.atan2(o*Math.cos(this.gamma0)+q*Math.sin(this.gamma0),Math.cos(this.bl*l))/this.bl}return this.no_rot?(a.x=this.x0+b,a.y=this.y0+c):(b-=this.uc,a.x=this.x0+c*Math.cos(this.alpha)+b*Math.sin(this.alpha),a.y=this.y0+b*Math.cos(this.alpha)-c*Math.sin(this.alpha)),a},c.inverse=function(a){var b,c;this.no_rot?(c=a.y-this.y0,b=a.x-this.x0):(c=(a.x-this.x0)*Math.cos(this.alpha)-(a.y-this.y0)*Math.sin(this.alpha),b=(a.y-this.y0)*Math.cos(this.alpha)+(a.x-this.x0)*Math.sin(this.alpha),b+=this.uc);var d=Math.exp(-1*this.bl*c/this.al),h=.5*(d-1/d),j=.5*(d+1/d),k=Math.sin(this.bl*b/this.al),l=(k*Math.cos(this.gamma0)+h*Math.sin(this.gamma0))/j,m=Math.pow(this.el/Math.sqrt((1+l)/(1-l)),1/this.bl);return Math.abs(l-1)<i?(a.x=this.long0,a.y=g):Math.abs(l+1)<i?(a.x=this.long0,a.y=-1*g):(a.y=f(this.e,m),a.x=e(this.long0-Math.atan2(h*Math.cos(this.gamma0)-k*Math.sin(this.gamma0),Math.cos(this.bl*b/this.al))/this.bl)),a},c.names=["Hotine_Oblique_Mercator","Hotine Oblique Mercator","Hotine_Oblique_Mercator_Azimuth_Natural_Origin","Hotine_Oblique_Mercator_Azimuth_Center","omerc"]},{"../common/adjust_lon":5,"../common/phi2z":16,"../common/tsfnz":24}],57:[function(a,b,c){var d=a("../common/adjust_lon"),e=1e-10,f=a("../common/asinz"),g=Math.PI/2;c.init=function(){this.sin_p14=Math.sin(this.lat0),this.cos_p14=Math.cos(this.lat0)},c.forward=function(a){var b,c,f,g,h,i,j,k,l=a.x,m=a.y;return f=d(l-this.long0),b=Math.sin(m),c=Math.cos(m),g=Math.cos(f),i=this.sin_p14*b+this.cos_p14*c*g,h=1,(i>0||Math.abs(i)<=e)&&(j=this.a*h*c*Math.sin(f),k=this.y0+this.a*h*(this.cos_p14*b-this.sin_p14*c*g)),a.x=j,a.y=k,a},c.inverse=function(a){var b,c,h,i,j,k,l;return a.x-=this.x0,a.y-=this.y0,b=Math.sqrt(a.x*a.x+a.y*a.y),c=f(b/this.a),h=Math.sin(c),i=Math.cos(c),k=this.long0,Math.abs(b)<=e?(l=this.lat0,a.x=k,a.y=l,a):(l=f(i*this.sin_p14+a.y*h*this.cos_p14/b),j=Math.abs(this.lat0)-g,Math.abs(j)<=e?(k=d(this.lat0>=0?this.long0+Math.atan2(a.x,-a.y):this.long0-Math.atan2(-a.x,a.y)),a.x=k,a.y=l,a):(k=d(this.long0+Math.atan2(a.x*h,b*this.cos_p14*i-a.y*this.sin_p14*h)),a.x=k,a.y=l,a))},c.names=["ortho"]},{"../common/adjust_lon":5,"../common/asinz":6}],58:[function(a,b,c){var d=a("../common/e0fn"),e=a("../common/e1fn"),f=a("../common/e2fn"),g=a("../common/e3fn"),h=a("../common/adjust_lon"),i=a("../common/adjust_lat"),j=a("../common/mlfn"),k=1e-10,l=a("../common/gN"),m=20;c.init=function(){this.temp=this.b/this.a,this.es=1-Math.pow(this.temp,2),this.e=Math.sqrt(this.es),this.e0=d(this.es),this.e1=e(this.es),this.e2=f(this.es),this.e3=g(this.es),this.ml0=this.a*j(this.e0,this.e1,this.e2,this.e3,this.lat0)},c.forward=function(a){var b,c,d,e=a.x,f=a.y,g=h(e-this.long0);if(d=g*Math.sin(f),this.sphere)Math.abs(f)<=k?(b=this.a*g,c=-1*this.a*this.lat0):(b=this.a*Math.sin(d)/Math.tan(f),c=this.a*(i(f-this.lat0)+(1-Math.cos(d))/Math.tan(f)));else if(Math.abs(f)<=k)b=this.a*g,c=-1*this.ml0;else{var m=l(this.a,this.e,Math.sin(f))/Math.tan(f);b=m*Math.sin(d),c=this.a*j(this.e0,this.e1,this.e2,this.e3,f)-this.ml0+m*(1-Math.cos(d))}return a.x=b+this.x0,a.y=c+this.y0,a},c.inverse=function(a){var b,c,d,e,f,g,i,l,n;if(d=a.x-this.x0,e=a.y-this.y0,this.sphere)if(Math.abs(e+this.a*this.lat0)<=k)b=h(d/this.a+this.long0),c=0;else{g=this.lat0+e/this.a,i=d*d/this.a/this.a+g*g,l=g;var o;for(f=m;f;--f)if(o=Math.tan(l),n=-1*(g*(l*o+1)-l-.5*(l*l+i)*o)/((l-g)/o-1),l+=n,Math.abs(n)<=k){c=l;break}b=h(this.long0+Math.asin(d*Math.tan(l)/this.a)/Math.sin(c))}else if(Math.abs(e+this.ml0)<=k)c=0,b=h(this.long0+d/this.a);else{g=(this.ml0+e)/this.a,i=d*d/this.a/this.a+g*g,l=g;var p,q,r,s,t;for(f=m;f;--f)if(t=this.e*Math.sin(l),p=Math.sqrt(1-t*t)*Math.tan(l),q=this.a*j(this.e0,this.e1,this.e2,this.e3,l),r=this.e0-2*this.e1*Math.cos(2*l)+4*this.e2*Math.cos(4*l)-6*this.e3*Math.cos(6*l),s=q/this.a,n=(g*(p*s+1)-s-.5*p*(s*s+i))/(this.es*Math.sin(2*l)*(s*s+i-2*g*s)/(4*p)+(g-s)*(p*r-2/Math.sin(2*l))-r),l-=n,Math.abs(n)<=k){c=l;break}p=Math.sqrt(1-this.es*Math.pow(Math.sin(c),2))*Math.tan(c),b=h(this.long0+Math.asin(d*p/this.a)/Math.sin(c))}return a.x=b,a.y=c,a},c.names=["Polyconic","poly"]},{"../common/adjust_lat":4,"../common/adjust_lon":5,"../common/e0fn":7,"../common/e1fn":8,"../common/e2fn":9,"../common/e3fn":10,"../common/gN":11,"../common/mlfn":14}],59:[function(a,b,c){var d=a("../common/adjust_lon"),e=a("../common/adjust_lat"),f=a("../common/pj_enfn"),g=20,h=a("../common/pj_mlfn"),i=a("../common/pj_inv_mlfn"),j=Math.PI/2,k=1e-10,l=a("../common/asinz");c.init=function(){this.sphere?(this.n=1,this.m=0,this.es=0,this.C_y=Math.sqrt((this.m+1)/this.n),this.C_x=this.C_y/(this.m+1)):this.en=f(this.es)},c.forward=function(a){var b,c,e=a.x,f=a.y;if(e=d(e-this.long0),this.sphere){if(this.m)for(var i=this.n*Math.sin(f),j=g;j;--j){var l=(this.m*f+Math.sin(f)-i)/(this.m+Math.cos(f));if(f-=l,Math.abs(l)<k)break}else f=1!==this.n?Math.asin(this.n*Math.sin(f)):f;b=this.a*this.C_x*e*(this.m+Math.cos(f)),c=this.a*this.C_y*f}else{var m=Math.sin(f),n=Math.cos(f);c=this.a*h(f,m,n,this.en),b=this.a*e*n/Math.sqrt(1-this.es*m*m)}return a.x=b,a.y=c,a},c.inverse=function(a){var b,c,f,g;return a.x-=this.x0,f=a.x/this.a,a.y-=this.y0,b=a.y/this.a,this.sphere?(b/=this.C_y,f/=this.C_x*(this.m+Math.cos(b)),this.m?b=l((this.m*b+Math.sin(b))/this.n):1!==this.n&&(b=l(Math.sin(b)/this.n)),f=d(f+this.long0),b=e(b)):(b=i(a.y/this.a,this.es,this.en),g=Math.abs(b),j>g?(g=Math.sin(b),c=this.long0+a.x*Math.sqrt(1-this.es*g*g)/(this.a*Math.cos(b)),f=d(c)):j>g-k&&(f=this.long0)),a.x=f,a.y=b,a},c.names=["Sinusoidal","sinu"]},{"../common/adjust_lat":4,"../common/adjust_lon":5,"../common/asinz":6,"../common/pj_enfn":17,"../common/pj_inv_mlfn":18,"../common/pj_mlfn":19}],60:[function(a,b,c){c.init=function(){var a=this.lat0;this.lambda0=this.long0;var b=Math.sin(a),c=this.a,d=this.rf,e=1/d,f=2*e-Math.pow(e,2),g=this.e=Math.sqrt(f);this.R=this.k0*c*Math.sqrt(1-f)/(1-f*Math.pow(b,2)),this.alpha=Math.sqrt(1+f/(1-f)*Math.pow(Math.cos(a),4)),this.b0=Math.asin(b/this.alpha);var h=Math.log(Math.tan(Math.PI/4+this.b0/2)),i=Math.log(Math.tan(Math.PI/4+a/2)),j=Math.log((1+g*b)/(1-g*b));this.K=h-this.alpha*i+this.alpha*g/2*j},c.forward=function(a){var b=Math.log(Math.tan(Math.PI/4-a.y/2)),c=this.e/2*Math.log((1+this.e*Math.sin(a.y))/(1-this.e*Math.sin(a.y))),d=-this.alpha*(b+c)+this.K,e=2*(Math.atan(Math.exp(d))-Math.PI/4),f=this.alpha*(a.x-this.lambda0),g=Math.atan(Math.sin(f)/(Math.sin(this.b0)*Math.tan(e)+Math.cos(this.b0)*Math.cos(f))),h=Math.asin(Math.cos(this.b0)*Math.sin(e)-Math.sin(this.b0)*Math.cos(e)*Math.cos(f));return a.y=this.R/2*Math.log((1+Math.sin(h))/(1-Math.sin(h)))+this.y0,a.x=this.R*g+this.x0,a},c.inverse=function(a){for(var b=a.x-this.x0,c=a.y-this.y0,d=b/this.R,e=2*(Math.atan(Math.exp(c/this.R))-Math.PI/4),f=Math.asin(Math.cos(this.b0)*Math.sin(e)+Math.sin(this.b0)*Math.cos(e)*Math.cos(d)),g=Math.atan(Math.sin(d)/(Math.cos(this.b0)*Math.cos(d)-Math.sin(this.b0)*Math.tan(e))),h=this.lambda0+g/this.alpha,i=0,j=f,k=-1e3,l=0;Math.abs(j-k)>1e-7;){if(++l>20)return;i=1/this.alpha*(Math.log(Math.tan(Math.PI/4+f/2))-this.K)+this.e*Math.log(Math.tan(Math.PI/4+Math.asin(this.e*Math.sin(j))/2)),k=j,j=2*Math.atan(Math.exp(i))-Math.PI/2}return a.x=h,a.y=j,a},c.names=["somerc"]},{}],61:[function(a,b,c){var d=Math.PI/2,e=1e-10,f=a("../common/sign"),g=a("../common/msfnz"),h=a("../common/tsfnz"),i=a("../common/phi2z"),j=a("../common/adjust_lon");c.ssfn_=function(a,b,c){return b*=c,Math.tan(.5*(d+a))*Math.pow((1-b)/(1+b),.5*c)},c.init=function(){this.coslat0=Math.cos(this.lat0),this.sinlat0=Math.sin(this.lat0),this.sphere?1===this.k0&&!isNaN(this.lat_ts)&&Math.abs(this.coslat0)<=e&&(this.k0=.5*(1+f(this.lat0)*Math.sin(this.lat_ts))):(Math.abs(this.coslat0)<=e&&(this.lat0>0?this.con=1:this.con=-1),this.cons=Math.sqrt(Math.pow(1+this.e,1+this.e)*Math.pow(1-this.e,1-this.e)),1===this.k0&&!isNaN(this.lat_ts)&&Math.abs(this.coslat0)<=e&&(this.k0=.5*this.cons*g(this.e,Math.sin(this.lat_ts),Math.cos(this.lat_ts))/h(this.e,this.con*this.lat_ts,this.con*Math.sin(this.lat_ts))),this.ms1=g(this.e,this.sinlat0,this.coslat0),this.X0=2*Math.atan(this.ssfn_(this.lat0,this.sinlat0,this.e))-d,this.cosX0=Math.cos(this.X0),this.sinX0=Math.sin(this.X0))},c.forward=function(a){var b,c,f,g,i,k,l=a.x,m=a.y,n=Math.sin(m),o=Math.cos(m),p=j(l-this.long0);return Math.abs(Math.abs(l-this.long0)-Math.PI)<=e&&Math.abs(m+this.lat0)<=e?(a.x=NaN,a.y=NaN,a):this.sphere?(b=2*this.k0/(1+this.sinlat0*n+this.coslat0*o*Math.cos(p)),a.x=this.a*b*o*Math.sin(p)+this.x0,a.y=this.a*b*(this.coslat0*n-this.sinlat0*o*Math.cos(p))+this.y0,a):(c=2*Math.atan(this.ssfn_(m,n,this.e))-d,g=Math.cos(c),f=Math.sin(c),Math.abs(this.coslat0)<=e?(i=h(this.e,m*this.con,this.con*n),k=2*this.a*this.k0*i/this.cons,a.x=this.x0+k*Math.sin(l-this.long0),a.y=this.y0-this.con*k*Math.cos(l-this.long0),a):(Math.abs(this.sinlat0)<e?(b=2*this.a*this.k0/(1+g*Math.cos(p)),a.y=b*f):(b=2*this.a*this.k0*this.ms1/(this.cosX0*(1+this.sinX0*f+this.cosX0*g*Math.cos(p))),a.y=b*(this.cosX0*f-this.sinX0*g*Math.cos(p))+this.y0),a.x=b*g*Math.sin(p)+this.x0,a))},c.inverse=function(a){a.x-=this.x0,a.y-=this.y0;var b,c,f,g,h,k=Math.sqrt(a.x*a.x+a.y*a.y);if(this.sphere){var l=2*Math.atan(k/(.5*this.a*this.k0));return b=this.long0,c=this.lat0,e>=k?(a.x=b,a.y=c,a):(c=Math.asin(Math.cos(l)*this.sinlat0+a.y*Math.sin(l)*this.coslat0/k),b=j(Math.abs(this.coslat0)<e?this.lat0>0?this.long0+Math.atan2(a.x,-1*a.y):this.long0+Math.atan2(a.x,a.y):this.long0+Math.atan2(a.x*Math.sin(l),k*this.coslat0*Math.cos(l)-a.y*this.sinlat0*Math.sin(l))),a.x=b,a.y=c,a)}if(Math.abs(this.coslat0)<=e){if(e>=k)return c=this.lat0,b=this.long0,a.x=b,a.y=c,a;a.x*=this.con,a.y*=this.con,f=k*this.cons/(2*this.a*this.k0),c=this.con*i(this.e,f),b=this.con*j(this.con*this.long0+Math.atan2(a.x,-1*a.y))}else g=2*Math.atan(k*this.cosX0/(2*this.a*this.k0*this.ms1)),b=this.long0,e>=k?h=this.X0:(h=Math.asin(Math.cos(g)*this.sinX0+a.y*Math.sin(g)*this.cosX0/k),b=j(this.long0+Math.atan2(a.x*Math.sin(g),k*this.cosX0*Math.cos(g)-a.y*this.sinX0*Math.sin(g)))),c=-1*i(this.e,Math.tan(.5*(d+h)));return a.x=b,a.y=c,a},c.names=["stere","Stereographic_South_Pole","Polar Stereographic (variant B)"]},{"../common/adjust_lon":5,"../common/msfnz":15,"../common/phi2z":16,"../common/sign":21,"../common/tsfnz":24}],62:[function(a,b,c){var d=a("./gauss"),e=a("../common/adjust_lon");c.init=function(){d.init.apply(this),this.rc&&(this.sinc0=Math.sin(this.phic0),this.cosc0=Math.cos(this.phic0),this.R2=2*this.rc,this.title||(this.title="Oblique Stereographic Alternative"))},c.forward=function(a){var b,c,f,g;return a.x=e(a.x-this.long0),d.forward.apply(this,[a]),b=Math.sin(a.y),c=Math.cos(a.y),f=Math.cos(a.x),g=this.k0*this.R2/(1+this.sinc0*b+this.cosc0*c*f),a.x=g*c*Math.sin(a.x),a.y=g*(this.cosc0*b-this.sinc0*c*f),a.x=this.a*a.x+this.x0,a.y=this.a*a.y+this.y0,a},c.inverse=function(a){var b,c,f,g,h;if(a.x=(a.x-this.x0)/this.a,a.y=(a.y-this.y0)/this.a,a.x/=this.k0,a.y/=this.k0,h=Math.sqrt(a.x*a.x+a.y*a.y)){var i=2*Math.atan2(h,this.R2);b=Math.sin(i),c=Math.cos(i),g=Math.asin(c*this.sinc0+a.y*b*this.cosc0/h),f=Math.atan2(a.x*b,h*this.cosc0*c-a.y*this.sinc0*b)}else g=this.phic0,f=0;return a.x=f,a.y=g,d.inverse.apply(this,[a]),a.x=e(a.x+this.long0),a},c.names=["Stereographic_North_Pole","Oblique_Stereographic","Polar_Stereographic","sterea","Oblique Stereographic Alternative"]},{"../common/adjust_lon":5,"./gauss":46}],63:[function(a,b,c){var d=a("../common/e0fn"),e=a("../common/e1fn"),f=a("../common/e2fn"),g=a("../common/e3fn"),h=a("../common/mlfn"),i=a("../common/adjust_lon"),j=Math.PI/2,k=1e-10,l=a("../common/sign"),m=a("../common/asinz");c.init=function(){this.e0=d(this.es),this.e1=e(this.es),this.e2=f(this.es),this.e3=g(this.es),this.ml0=this.a*h(this.e0,this.e1,this.e2,this.e3,this.lat0)},c.forward=function(a){var b,c,d,e=a.x,f=a.y,g=i(e-this.long0),j=Math.sin(f),k=Math.cos(f);if(this.sphere){var l=k*Math.sin(g);if(Math.abs(Math.abs(l)-1)<1e-10)return 93;c=.5*this.a*this.k0*Math.log((1+l)/(1-l)),b=Math.acos(k*Math.cos(g)/Math.sqrt(1-l*l)),0>f&&(b=-b),d=this.a*this.k0*(b-this.lat0)}else{var m=k*g,n=Math.pow(m,2),o=this.ep2*Math.pow(k,2),p=Math.tan(f),q=Math.pow(p,2);b=1-this.es*Math.pow(j,2);var r=this.a/Math.sqrt(b),s=this.a*h(this.e0,this.e1,this.e2,this.e3,f);c=this.k0*r*m*(1+n/6*(1-q+o+n/20*(5-18*q+Math.pow(q,2)+72*o-58*this.ep2)))+this.x0,d=this.k0*(s-this.ml0+r*p*(n*(.5+n/24*(5-q+9*o+4*Math.pow(o,2)+n/30*(61-58*q+Math.pow(q,2)+600*o-330*this.ep2)))))+this.y0}return a.x=c,a.y=d,a},c.inverse=function(a){var b,c,d,e,f,g,h=6;if(this.sphere){var n=Math.exp(a.x/(this.a*this.k0)),o=.5*(n-1/n),p=this.lat0+a.y/(this.a*this.k0),q=Math.cos(p);b=Math.sqrt((1-q*q)/(1+o*o)),f=m(b),0>p&&(f=-f),g=0===o&&0===q?this.long0:i(Math.atan2(o,q)+this.long0)}else{var r=a.x-this.x0,s=a.y-this.y0;for(b=(this.ml0+s/this.k0)/this.a,c=b,e=0;!0&&(d=(b+this.e1*Math.sin(2*c)-this.e2*Math.sin(4*c)+this.e3*Math.sin(6*c))/this.e0-c,c+=d,!(Math.abs(d)<=k));e++)if(e>=h)return 95;if(Math.abs(c)<j){var t=Math.sin(c),u=Math.cos(c),v=Math.tan(c),w=this.ep2*Math.pow(u,2),x=Math.pow(w,2),y=Math.pow(v,2),z=Math.pow(y,2);b=1-this.es*Math.pow(t,2);var A=this.a/Math.sqrt(b),B=A*(1-this.es)/b,C=r/(A*this.k0),D=Math.pow(C,2);f=c-A*v*D/B*(.5-D/24*(5+3*y+10*w-4*x-9*this.ep2-D/30*(61+90*y+298*w+45*z-252*this.ep2-3*x))),g=i(this.long0+C*(1-D/6*(1+2*y+w-D/20*(5-2*w+28*y-3*x+8*this.ep2+24*z)))/u)}else f=j*l(s),g=this.long0}return a.x=g,a.y=f,a},c.names=["Transverse_Mercator","Transverse Mercator","tmerc"]},{"../common/adjust_lon":5,"../common/asinz":6,"../common/e0fn":7,"../common/e1fn":8,"../common/e2fn":9,"../common/e3fn":10,"../common/mlfn":14,"../common/sign":21}],64:[function(a,b,c){var d=.017453292519943295,e=a("./tmerc");c.dependsOn="tmerc",c.init=function(){this.zone&&(this.lat0=0,this.long0=(6*Math.abs(this.zone)-183)*d,this.x0=5e5,this.y0=this.utmSouth?1e7:0,this.k0=.9996,e.init.apply(this),this.forward=e.forward,this.inverse=e.inverse)},c.names=["Universal Transverse Mercator System","utm"]},{"./tmerc":63}],65:[function(a,b,c){var d=a("../common/adjust_lon"),e=Math.PI/2,f=1e-10,g=a("../common/asinz");c.init=function(){this.R=this.a},c.forward=function(a){var b,c,h=a.x,i=a.y,j=d(h-this.long0);Math.abs(i)<=f&&(b=this.x0+this.R*j,c=this.y0);var k=g(2*Math.abs(i/Math.PI));(Math.abs(j)<=f||Math.abs(Math.abs(i)-e)<=f)&&(b=this.x0,c=i>=0?this.y0+Math.PI*this.R*Math.tan(.5*k):this.y0+Math.PI*this.R*-Math.tan(.5*k));var l=.5*Math.abs(Math.PI/j-j/Math.PI),m=l*l,n=Math.sin(k),o=Math.cos(k),p=o/(n+o-1),q=p*p,r=p*(2/n-1),s=r*r,t=Math.PI*this.R*(l*(p-s)+Math.sqrt(m*(p-s)*(p-s)-(s+m)*(q-s)))/(s+m);0>j&&(t=-t),b=this.x0+t;var u=m+p;return t=Math.PI*this.R*(r*u-l*Math.sqrt((s+m)*(m+1)-u*u))/(s+m),c=i>=0?this.y0+t:this.y0-t,a.x=b,a.y=c,a},c.inverse=function(a){var b,c,e,g,h,i,j,k,l,m,n,o,p;return a.x-=this.x0,a.y-=this.y0,n=Math.PI*this.R,e=a.x/n,g=a.y/n,h=e*e+g*g,i=-Math.abs(g)*(1+h),
	j=i-2*g*g+e*e,k=-2*i+1+2*g*g+h*h,p=g*g/k+(2*j*j*j/k/k/k-9*i*j/k/k)/27,l=(i-j*j/3/k)/k,m=2*Math.sqrt(-l/3),n=3*p/l/m,Math.abs(n)>1&&(n=n>=0?1:-1),o=Math.acos(n)/3,c=a.y>=0?(-m*Math.cos(o+Math.PI/3)-j/3/k)*Math.PI:-(-m*Math.cos(o+Math.PI/3)-j/3/k)*Math.PI,b=Math.abs(e)<f?this.long0:d(this.long0+Math.PI*(h-1+Math.sqrt(1+2*(e*e-g*g)+h*h))/2/e),a.x=b,a.y=c,a},c.names=["Van_der_Grinten_I","VanDerGrinten","vandg"]},{"../common/adjust_lon":5,"../common/asinz":6}],66:[function(a,b,c){var d=.017453292519943295,e=57.29577951308232,f=1,g=2,h=a("./datum_transform"),i=a("./adjust_axis"),j=a("./Proj"),k=a("./common/toPoint");b.exports=function l(a,b,c){function m(a,b){return(a.datum.datum_type===f||a.datum.datum_type===g)&&"WGS84"!==b.datumCode}var n;return Array.isArray(c)&&(c=k(c)),a.datum&&b.datum&&(m(a,b)||m(b,a))&&(n=new j("WGS84"),l(a,n,c),a=n),"enu"!==a.axis&&i(a,!1,c),"longlat"===a.projName?(c.x*=d,c.y*=d):(a.to_meter&&(c.x*=a.to_meter,c.y*=a.to_meter),a.inverse(c)),a.from_greenwich&&(c.x+=a.from_greenwich),c=h(a.datum,b.datum,c),b.from_greenwich&&(c.x-=b.from_greenwich),"longlat"===b.projName?(c.x*=e,c.y*=e):(b.forward(c),b.to_meter&&(c.x/=b.to_meter,c.y/=b.to_meter)),"enu"!==b.axis&&i(b,!0,c),c}},{"./Proj":2,"./adjust_axis":3,"./common/toPoint":23,"./datum_transform":31}],67:[function(a,b,c){function d(a,b,c){a[b]=c.map(function(a){var b={};return e(a,b),b}).reduce(function(a,b){return j(a,b)},{})}function e(a,b){var c;return Array.isArray(a)?(c=a.shift(),"PARAMETER"===c&&(c=a.shift()),1===a.length?Array.isArray(a[0])?(b[c]={},e(a[0],b[c])):b[c]=a[0]:a.length?"TOWGS84"===c?b[c]=a:(b[c]={},["UNIT","PRIMEM","VERT_DATUM"].indexOf(c)>-1?(b[c]={name:a[0].toLowerCase(),convert:a[1]},3===a.length&&(b[c].auth=a[2])):"SPHEROID"===c?(b[c]={name:a[0],a:a[1],rf:a[2]},4===a.length&&(b[c].auth=a[3])):["GEOGCS","GEOCCS","DATUM","VERT_CS","COMPD_CS","LOCAL_CS","FITTED_CS","LOCAL_DATUM"].indexOf(c)>-1?(a[0]=["name",a[0]],d(b,c,a)):a.every(function(a){return Array.isArray(a)})?d(b,c,a):e(a,b[c])):b[c]=!0,void 0):void(b[a]=!0)}function f(a,b){var c=b[0],d=b[1];!(c in a)&&d in a&&(a[c]=a[d],3===b.length&&(a[c]=b[2](a[c])))}function g(a){return a*i}function h(a){function b(b){var c=a.to_meter||1;return parseFloat(b,10)*c}"GEOGCS"===a.type?a.projName="longlat":"LOCAL_CS"===a.type?(a.projName="identity",a.local=!0):"object"==typeof a.PROJECTION?a.projName=Object.keys(a.PROJECTION)[0]:a.projName=a.PROJECTION,a.UNIT&&(a.units=a.UNIT.name.toLowerCase(),"metre"===a.units&&(a.units="meter"),a.UNIT.convert&&("GEOGCS"===a.type?a.DATUM&&a.DATUM.SPHEROID&&(a.to_meter=parseFloat(a.UNIT.convert,10)*a.DATUM.SPHEROID.a):a.to_meter=parseFloat(a.UNIT.convert,10))),a.GEOGCS&&(a.GEOGCS.DATUM?a.datumCode=a.GEOGCS.DATUM.name.toLowerCase():a.datumCode=a.GEOGCS.name.toLowerCase(),"d_"===a.datumCode.slice(0,2)&&(a.datumCode=a.datumCode.slice(2)),"new_zealand_geodetic_datum_1949"!==a.datumCode&&"new_zealand_1949"!==a.datumCode||(a.datumCode="nzgd49"),"wgs_1984"===a.datumCode&&("Mercator_Auxiliary_Sphere"===a.PROJECTION&&(a.sphere=!0),a.datumCode="wgs84"),"_ferro"===a.datumCode.slice(-6)&&(a.datumCode=a.datumCode.slice(0,-6)),"_jakarta"===a.datumCode.slice(-8)&&(a.datumCode=a.datumCode.slice(0,-8)),~a.datumCode.indexOf("belge")&&(a.datumCode="rnb72"),a.GEOGCS.DATUM&&a.GEOGCS.DATUM.SPHEROID&&(a.ellps=a.GEOGCS.DATUM.SPHEROID.name.replace("_19","").replace(/[Cc]larke\_18/,"clrk"),"international"===a.ellps.toLowerCase().slice(0,13)&&(a.ellps="intl"),a.a=a.GEOGCS.DATUM.SPHEROID.a,a.rf=parseFloat(a.GEOGCS.DATUM.SPHEROID.rf,10)),~a.datumCode.indexOf("osgb_1936")&&(a.datumCode="osgb36")),a.b&&!isFinite(a.b)&&(a.b=a.a);var c=function(b){return f(a,b)},d=[["standard_parallel_1","Standard_Parallel_1"],["standard_parallel_2","Standard_Parallel_2"],["false_easting","False_Easting"],["false_northing","False_Northing"],["central_meridian","Central_Meridian"],["latitude_of_origin","Latitude_Of_Origin"],["latitude_of_origin","Central_Parallel"],["scale_factor","Scale_Factor"],["k0","scale_factor"],["latitude_of_center","Latitude_of_center"],["lat0","latitude_of_center",g],["longitude_of_center","Longitude_Of_Center"],["longc","longitude_of_center",g],["x0","false_easting",b],["y0","false_northing",b],["long0","central_meridian",g],["lat0","latitude_of_origin",g],["lat0","standard_parallel_1",g],["lat1","standard_parallel_1",g],["lat2","standard_parallel_2",g],["alpha","azimuth",g],["srsCode","name"]];d.forEach(c),a.long0||!a.longc||"Albers_Conic_Equal_Area"!==a.projName&&"Lambert_Azimuthal_Equal_Area"!==a.projName||(a.long0=a.longc),a.lat_ts||!a.lat1||"Stereographic_South_Pole"!==a.projName&&"Polar Stereographic (variant B)"!==a.projName||(a.lat0=g(a.lat1>0?90:-90),a.lat_ts=a.lat1)}var i=.017453292519943295,j=a("./extend");b.exports=function(a,b){var c=JSON.parse((","+a).replace(/\s*\,\s*([A-Z_0-9]+?)(\[)/g,',["$1",').slice(1).replace(/\s*\,\s*([A-Z_0-9]+?)\]/g,',"$1"]').replace(/,\["VERTCS".+/,"")),d=c.shift(),f=c.shift();c.unshift(["name",f]),c.unshift(["type",d]),c.unshift("output");var g={};return e(c,g),h(g.output),j(b,g.output)}},{"./extend":34}],68:[function(a,b,c){function d(a){return a*(Math.PI/180)}function e(a){return 180*(a/Math.PI)}function f(a){var b,c,e,f,g,i,j,k,l,m=a.lat,n=a.lon,o=6378137,p=.00669438,q=.9996,r=d(m),s=d(n);l=Math.floor((n+180)/6)+1,180===n&&(l=60),m>=56&&64>m&&n>=3&&12>n&&(l=32),m>=72&&84>m&&(n>=0&&9>n?l=31:n>=9&&21>n?l=33:n>=21&&33>n?l=35:n>=33&&42>n&&(l=37)),b=6*(l-1)-180+3,k=d(b),c=p/(1-p),e=o/Math.sqrt(1-p*Math.sin(r)*Math.sin(r)),f=Math.tan(r)*Math.tan(r),g=c*Math.cos(r)*Math.cos(r),i=Math.cos(r)*(s-k),j=o*((1-p/4-3*p*p/64-5*p*p*p/256)*r-(3*p/8+3*p*p/32+45*p*p*p/1024)*Math.sin(2*r)+(15*p*p/256+45*p*p*p/1024)*Math.sin(4*r)-35*p*p*p/3072*Math.sin(6*r));var t=q*e*(i+(1-f+g)*i*i*i/6+(5-18*f+f*f+72*g-58*c)*i*i*i*i*i/120)+5e5,u=q*(j+e*Math.tan(r)*(i*i/2+(5-f+9*g+4*g*g)*i*i*i*i/24+(61-58*f+f*f+600*g-330*c)*i*i*i*i*i*i/720));return 0>m&&(u+=1e7),{northing:Math.round(u),easting:Math.round(t),zoneNumber:l,zoneLetter:h(m)}}function g(a){var b=a.northing,c=a.easting,d=a.zoneLetter,f=a.zoneNumber;if(0>f||f>60)return null;var h,i,j,k,l,m,n,o,p,q,r=.9996,s=6378137,t=.00669438,u=(1-Math.sqrt(1-t))/(1+Math.sqrt(1-t)),v=c-5e5,w=b;"N">d&&(w-=1e7),o=6*(f-1)-180+3,h=t/(1-t),n=w/r,p=n/(s*(1-t/4-3*t*t/64-5*t*t*t/256)),q=p+(3*u/2-27*u*u*u/32)*Math.sin(2*p)+(21*u*u/16-55*u*u*u*u/32)*Math.sin(4*p)+151*u*u*u/96*Math.sin(6*p),i=s/Math.sqrt(1-t*Math.sin(q)*Math.sin(q)),j=Math.tan(q)*Math.tan(q),k=h*Math.cos(q)*Math.cos(q),l=s*(1-t)/Math.pow(1-t*Math.sin(q)*Math.sin(q),1.5),m=v/(i*r);var x=q-i*Math.tan(q)/l*(m*m/2-(5+3*j+10*k-4*k*k-9*h)*m*m*m*m/24+(61+90*j+298*k+45*j*j-252*h-3*k*k)*m*m*m*m*m*m/720);x=e(x);var y=(m-(1+2*j+k)*m*m*m/6+(5-2*k+28*j-3*k*k+8*h+24*j*j)*m*m*m*m*m/120)/Math.cos(q);y=o+e(y);var z;if(a.accuracy){var A=g({northing:a.northing+a.accuracy,easting:a.easting+a.accuracy,zoneLetter:a.zoneLetter,zoneNumber:a.zoneNumber});z={top:A.lat,right:A.lon,bottom:x,left:y}}else z={lat:x,lon:y};return z}function h(a){var b="Z";return 84>=a&&a>=72?b="X":72>a&&a>=64?b="W":64>a&&a>=56?b="V":56>a&&a>=48?b="U":48>a&&a>=40?b="T":40>a&&a>=32?b="S":32>a&&a>=24?b="R":24>a&&a>=16?b="Q":16>a&&a>=8?b="P":8>a&&a>=0?b="N":0>a&&a>=-8?b="M":-8>a&&a>=-16?b="L":-16>a&&a>=-24?b="K":-24>a&&a>=-32?b="J":-32>a&&a>=-40?b="H":-40>a&&a>=-48?b="G":-48>a&&a>=-56?b="F":-56>a&&a>=-64?b="E":-64>a&&a>=-72?b="D":-72>a&&a>=-80&&(b="C"),b}function i(a,b){var c="00000"+a.easting,d="00000"+a.northing;return a.zoneNumber+a.zoneLetter+j(a.easting,a.northing,a.zoneNumber)+c.substr(c.length-5,b)+d.substr(d.length-5,b)}function j(a,b,c){var d=k(c),e=Math.floor(a/1e5),f=Math.floor(b/1e5)%20;return l(e,f,d)}function k(a){var b=a%q;return 0===b&&(b=q),b}function l(a,b,c){var d=c-1,e=r.charCodeAt(d),f=s.charCodeAt(d),g=e+a-1,h=f+b,i=!1;g>x&&(g=g-x+t-1,i=!0),(g===u||u>e&&g>u||(g>u||u>e)&&i)&&g++,(g===v||v>e&&g>v||(g>v||v>e)&&i)&&(g++,g===u&&g++),g>x&&(g=g-x+t-1),h>w?(h=h-w+t-1,i=!0):i=!1,(h===u||u>f&&h>u||(h>u||u>f)&&i)&&h++,(h===v||v>f&&h>v||(h>v||v>f)&&i)&&(h++,h===u&&h++),h>w&&(h=h-w+t-1);var j=String.fromCharCode(g)+String.fromCharCode(h);return j}function m(a){if(a&&0===a.length)throw"MGRSPoint coverting from nothing";for(var b,c=a.length,d=null,e="",f=0;!/[A-Z]/.test(b=a.charAt(f));){if(f>=2)throw"MGRSPoint bad conversion from: "+a;e+=b,f++}var g=parseInt(e,10);if(0===f||f+3>c)throw"MGRSPoint bad conversion from: "+a;var h=a.charAt(f++);if("A">=h||"B"===h||"Y"===h||h>="Z"||"I"===h||"O"===h)throw"MGRSPoint zone letter "+h+" not handled: "+a;d=a.substring(f,f+=2);for(var i=k(g),j=n(d.charAt(0),i),l=o(d.charAt(1),i);l<p(h);)l+=2e6;var m=c-f;if(m%2!==0)throw"MGRSPoint has to have an even number \nof digits after the zone letter and two 100km letters - front \nhalf for easting meters, second half for \nnorthing meters"+a;var q,r,s,t,u,v=m/2,w=0,x=0;return v>0&&(q=1e5/Math.pow(10,v),r=a.substring(f,f+v),w=parseFloat(r)*q,s=a.substring(f+v),x=parseFloat(s)*q),t=w+j,u=x+l,{easting:t,northing:u,zoneLetter:h,zoneNumber:g,accuracy:q}}function n(a,b){for(var c=r.charCodeAt(b-1),d=1e5,e=!1;c!==a.charCodeAt(0);){if(c++,c===u&&c++,c===v&&c++,c>x){if(e)throw"Bad character: "+a;c=t,e=!0}d+=1e5}return d}function o(a,b){if(a>"V")throw"MGRSPoint given invalid Northing "+a;for(var c=s.charCodeAt(b-1),d=0,e=!1;c!==a.charCodeAt(0);){if(c++,c===u&&c++,c===v&&c++,c>w){if(e)throw"Bad character: "+a;c=t,e=!0}d+=1e5}return d}function p(a){var b;switch(a){case"C":b=11e5;break;case"D":b=2e6;break;case"E":b=28e5;break;case"F":b=37e5;break;case"G":b=46e5;break;case"H":b=55e5;break;case"J":b=64e5;break;case"K":b=73e5;break;case"L":b=82e5;break;case"M":b=91e5;break;case"N":b=0;break;case"P":b=8e5;break;case"Q":b=17e5;break;case"R":b=26e5;break;case"S":b=35e5;break;case"T":b=44e5;break;case"U":b=53e5;break;case"V":b=62e5;break;case"W":b=7e6;break;case"X":b=79e5;break;default:b=-1}if(b>=0)return b;throw"Invalid zone letter: "+a}var q=6,r="AJSAJS",s="AFAFAF",t=65,u=73,v=79,w=86,x=90;c.forward=function(a,b){return b=b||5,i(f({lat:a[1],lon:a[0]}),b)},c.inverse=function(a){var b=g(m(a.toUpperCase()));return b.lat&&b.lon?[b.lon,b.lat,b.lon,b.lat]:[b.left,b.bottom,b.right,b.top]},c.toPoint=function(a){var b=g(m(a.toUpperCase()));return b.lat&&b.lon?[b.lon,b.lat]:[(b.left+b.right)/2,(b.top+b.bottom)/2]}},{}],69:[function(a,b,c){b.exports={name:"proj4",version:"2.3.15",description:"Proj4js is a JavaScript library to transform point coordinates from one coordinate system to another, including datum transformations.",main:"lib/index.js",directories:{test:"test",doc:"docs"},scripts:{test:"./node_modules/istanbul/lib/cli.js test ./node_modules/mocha/bin/_mocha test/test.js"},repository:{type:"git",url:"git://github.com/proj4js/proj4js.git"},author:"",license:"MIT",jam:{main:"dist/proj4.js",include:["dist/proj4.js","README.md","AUTHORS","LICENSE.md"]},devDependencies:{"grunt-cli":"~0.1.13",grunt:"~0.4.2","grunt-contrib-connect":"~0.6.0","grunt-contrib-jshint":"~0.8.0",chai:"~1.8.1",mocha:"~1.17.1","grunt-mocha-phantomjs":"~0.4.0",browserify:"~12.0.1","grunt-browserify":"~4.0.1","grunt-contrib-uglify":"~0.11.1",curl:"git://github.com/cujojs/curl.git",istanbul:"~0.2.4",tin:"~0.4.0"},dependencies:{mgrs:"~0.0.2"}}},{}]},{},[36])(36)});

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Styling = undefined;

	var _set = __webpack_require__(133);

	var _set2 = _interopRequireDefault(_set);

	var _map = __webpack_require__(108);

	var _map2 = _interopRequireDefault(_map);

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _typeof2 = __webpack_require__(82);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _keys = __webpack_require__(101);

	var _keys2 = _interopRequireDefault(_keys);

	var _getIterator2 = __webpack_require__(105);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _openlayers = __webpack_require__(77);

	var _openlayers2 = _interopRequireDefault(_openlayers);

	var _jquery = __webpack_require__(78);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _utilitiesObject = __webpack_require__(137);

	var _utilities = __webpack_require__(138);

	var _Debug = __webpack_require__(151);

	var _csscolorparser = __webpack_require__(152);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @typedef {string|StyleObject|ol.style.Style} StyleLike
	 */

	/**
	 * @typedef {Object} StyleObject
	 */

	/**
	 * merges two style configs
	 * @param {StyleObject} configTarget
	 * @param {StyleObject} configSource
	 * @returns {StyleObject}
	 */
	function mergeStyleConfigs(configTarget, configSource) {
	  var mergedConf = (0, _utilitiesObject.copyDeep)(configTarget);
	  if (configSource) {
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	      for (var _iterator = (0, _getIterator3.default)((0, _keys2.default)(configSource)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var k = _step.value;

	        var sourceProp = configSource[k];

	        if (configTarget.hasOwnProperty(k)) {
	          var targetProp = configTarget[k];

	          if ((typeof targetProp === 'undefined' ? 'undefined' : (0, _typeof3.default)(targetProp)) === 'object' && !(targetProp instanceof Array)) {
	            // if it is another object, merge recursively
	            var _targetProp = configTarget[k];

	            if (_targetProp.hasOwnProperty('type')) {
	              if (sourceProp.hasOwnProperty('type')) {
	                if (configTarget[k].type === sourceProp.type) {
	                  mergedConf[k] = mergeStyleConfigs(_targetProp, sourceProp);
	                }
	              }
	            } else {
	              mergedConf[k] = mergeStyleConfigs(_targetProp, sourceProp);
	            }
	          }
	        } else {
	          // copy over if it doesn't exist in the target
	          if ((typeof sourceProp === 'undefined' ? 'undefined' : (0, _typeof3.default)(sourceProp)) === 'object' && !(sourceProp instanceof Array)) {
	            mergedConf[k] = (0, _utilitiesObject.copyDeep)(sourceProp);
	          } else {
	            mergedConf[k] = sourceProp;
	          }
	        }
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator.return) {
	          _iterator.return();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }
	  }
	  return mergedConf;
	}

	/**
	 * This class coordinates the styling.
	 */

	var Styling = exports.Styling = function () {
	  /**
	   * @param {Object} [options]
	   * @param {Object} [options.styleConfigMap]
	   * @param {number} [options.globalIconScale]
	   */
	  function Styling() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    (0, _classCallCheck3.default)(this, Styling);

	    /**
	     * @type {Map.<string,StyleObject>}
	     * @private
	     */
	    this.styleConfigMap_ = new _map2.default();

	    if (!this.styleConfigMap_.has('#defaultStyle')) {
	      // FallbackStyle
	      this.styleConfigMap_.set('#defaultStyle', {
	        'stroke': {
	          'color': 'rgba(0,0,0,0.9)',
	          'width': 2
	        },
	        'fill': {
	          'color': 'rgba(0,0,0,0.3)'
	        },
	        'image': {
	          'type': 'circle',
	          'stroke': {
	            'color': 'rgba(0,0,0,0.9)',
	            'width': 2
	          },
	          'fill': {
	            'color': 'rgba(0,0,0,0.3)'
	          }
	        }
	      });
	    }

	    if (options.styleConfigMap) {
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = (0, _getIterator3.default)((0, _keys2.default)(options.styleConfigMap)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var k = _step2.value;

	          this.styleConfigMap_.set(k, options.styleConfigMap[k]);
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }
	    }

	    /**
	     * @type {Map.<string,ol.style.Style>}
	     * @private
	     */
	    this.styleMap_ = new _map2.default();

	    /**
	     * @type {Set.<ol.style.Style>}
	     * @private
	     */
	    this.allStyles_ = new _set2.default();

	    if (options.globalIconScale) {
	      this.setGlobalIconScale(options.globalIconScale);
	    }
	  }

	  /**
	   * @param {ol.style.Style} style
	   */


	  Styling.prototype.saveStyle = function saveStyle(style) {
	    this.allStyles_.add(style);
	    style.saved = true;
	  };

	  /**
	   * Runs a callback on each saved style
	   * @param cb
	   */


	  Styling.prototype.forEachStyle = function forEachStyle(cb) {
	    this.allStyles_.forEach(cb);
	  };

	  /**
	   * @param {number} scale
	   */


	  Styling.prototype.setGlobalIconScale = function setGlobalIconScale(scale) {
	    /**
	     * @type {number}
	     * @private
	     */
	    this.globalIconScale_ = scale;
	  };

	  /**
	   * @returns {number}
	   */


	  Styling.prototype.getGlobalIconScale = function getGlobalIconScale() {
	    return this.globalIconScale_ || 1;
	  };

	  /**
	   * @param {StyleObject} styleConf
	   * @returns {ol.style.Style}
	   */


	  Styling.prototype.getStyleFromConfig = function getStyleFromConfig(styleConf) {
	    var filledStyleConf = mergeStyleConfigs(styleConf, this.styleConfigMap_.get('#default'));

	    function addFillsAndStrokes(subStyleConf) {
	      subStyleConf = subStyleConf || {};
	      var preparedOptions = (0, _utilitiesObject.copy)(subStyleConf);

	      if ((0, _utilities.checkFor)(subStyleConf, 'fill')) {
	        preparedOptions.fill = new _openlayers2.default.style.Fill(mergeStyleConfigs(subStyleConf.fill, filledStyleConf.fill));
	      } else {
	        preparedOptions.fill = new _openlayers2.default.style.Fill(filledStyleConf.fill);
	      }

	      if ((0, _utilities.checkFor)(subStyleConf, 'stroke')) {
	        preparedOptions.stroke = new _openlayers2.default.style.Stroke(mergeStyleConfigs(subStyleConf.stroke, filledStyleConf.stroke));
	      } else {
	        preparedOptions.stroke = new _openlayers2.default.style.Stroke(filledStyleConf.stroke);
	      }

	      return preparedOptions;
	    }

	    var styleOptions = addFillsAndStrokes(filledStyleConf);

	    styleOptions.text = new _openlayers2.default.style.Text(addFillsAndStrokes(filledStyleConf.text));

	    var scalable = false;

	    if (filledStyleConf.hasOwnProperty('image')) {
	      if (filledStyleConf.image.type === 'icon' && filledStyleConf.image.hasOwnProperty('src') && filledStyleConf.image.src) {
	        styleOptions.image = new _openlayers2.default.style.Icon(filledStyleConf.image);
	        scalable = true;
	      } else if (filledStyleConf.image.type === 'circle') {
	        styleOptions.image = new _openlayers2.default.style.Circle(addFillsAndStrokes(filledStyleConf.image));
	        scalable = true;
	      } else if (filledStyleConf.image.type === 'regularShape') {
	        styleOptions.image = new _openlayers2.default.style.RegularShape(addFillsAndStrokes(filledStyleConf.image));
	        scalable = true;
	      }

	      if (scalable) {
	        styleOptions.image.setScale((styleOptions.image.getScale() || 1) * this.getGlobalIconScale());
	      }
	    }

	    var style = new _openlayers2.default.style.Style(styleOptions);

	    this.saveStyle(style);

	    return style;
	  };

	  Styling.prototype.getConfigFromStyle = function getConfigFromStyle(style) {
	    throw new Error('Not implemented yet');
	  };

	  /**
	   * @param {string} id
	   * @returns {ol.style.Style}
	   */


	  Styling.prototype.getStyleById = function getStyleById(id) {
	    if (!this.styleMap_.has(id)) {
	      if (this.styleConfigMap_.has(id)) {
	        this.styleMap_.set(id, this.getStyleFromConfig(this.getConfigById(id)));
	      } else {
	        _Debug.Debug.error('No style found for id ' + id + '. Using default style.');
	        return this.styleMap_.get('#defaultStyle');
	      }
	    }
	    return this.styleMap_.get(id);
	  };

	  /**
	   * @param {string} id
	   * @returns {StyleObject}
	   */


	  Styling.prototype.getConfigById = function getConfigById(id) {
	    if (this.styleConfigMap_.has(id)) {
	      return this.styleConfigMap_.get(id);
	    } else {
	      _Debug.Debug.error('No style config found for id ' + id + '. Using default style.');
	      return this.styleConfigMap_.get('#defaultStyle');
	    }
	  };

	  /**
	   * @param {StyleLike} data
	   * @returns {ol.style.Style}
	   */


	  Styling.prototype.getStyle = function getStyle(data) {
	    if (data === undefined) {
	      return this.getStyleById('#defaultStyle');
	    } else if (data instanceof _openlayers2.default.style.Style || _jquery2.default.isFunction(data)) {
	      return data;
	    } else if ((typeof data === 'undefined' ? 'undefined' : (0, _typeof3.default)(data)) === 'object') {
	      return this.getStyleFromConfig(data);
	    } else {
	      return this.getStyleById(data);
	    }
	  };

	  /**
	   * adjust the styles opacity by a given value
	   * @param {ol.style.Style} style
	   * @param {number} opacity between 0 and 1
	   * @returns {ol.style.Style}
	   */


	  Styling.prototype.adjustColorOpacity = function adjustColorOpacity(style, opacity) {
	    var adjustColor = function adjustColor(style, opacity) {
	      var color = style.getColor();
	      if (color !== null) {
	        if (!(color instanceof Array)) {
	          if (typeof color === 'string') {
	            color = (0, _csscolorparser.parseCSSColor)(color);
	          } else {
	            throw new Error('Type not supported');
	          }
	        }

	        color[3] = color[3] * opacity;
	      }
	      style.setColor(color);
	    };

	    if (style.getImage()) {
	      style.getImage().setOpacity(opacity);
	    }
	    if (style.getFill()) {
	      adjustColor(style.getFill(), opacity);
	    }
	    if (style.getStroke()) {
	      adjustColor(style.getStroke(), opacity);
	    }
	    if (style.getText()) {
	      if (style.getText().getFill()) {
	        adjustColor(style.getText().getFill(), opacity);
	      }
	      if (style.getText().getStroke()) {
	        adjustColor(style.getText().getStroke(), opacity);
	      }
	    }

	    return style;
	  };

	  /**
	   * style a feature
	   * @param {ol.Feature} feature
	   * @param {StyleLike} styleData
	   */


	  Styling.prototype.styleFeature = function styleFeature(feature, styleData) {
	    var style = void 0;
	    if (styleData) {
	      style = this.getStyle(styleData);
	    } else {
	      style = this.getStyle('#defaultStyle');
	    }

	    var fStyle = feature.getStyleFunction();

	    var thisRef = this; // needed

	    var styleFunction = function styleFunction(resolution) {
	      var stylePrimitive = void 0;

	      if (_jquery2.default.isFunction(style)) {
	        stylePrimitive = style.call(this, resolution)[0];
	      } else {
	        stylePrimitive = style;
	      }

	      // what happens if the styleFunction returns the ol default style?
	      if (fStyle) {
	        var curStyles = fStyle.call(this, resolution);
	        if (curStyles && curStyles.length > 0) {
	          curStyles.forEach(function (curStyle) {
	            // adjust icon Scale
	            if (curStyle.getImage()) {
	              curStyle.getImage().setScale(stylePrimitive.getImage().getScale());
	            }
	            if (!curStyle.saved) {
	              thisRef.saveStyle(curStyle);
	            }
	          });
	          stylePrimitive = curStyles[0];
	        }
	      }
	      return [stylePrimitive];
	    };

	    if (fStyle !== styleFunction) {
	      // this does not seem to work, the function gets applied multiple times somehow.
	      feature.setStyle(styleFunction);
	    }
	  };

	  /**
	   * converts ol.StyleFunction to ol.FeatureStyleFunction
	   * @param {ol.style.StyleFunction} styleFunction
	   * @returns {ol.FeatureStyleFunction}
	   */


	  Styling.prototype.convertStyleFunction = function convertStyleFunction(styleFunction) {
	    return function (resolution) {
	      return styleFunction(this, resolution);
	    };
	  };

	  /**
	   * style a layer
	   * @param {VectorLayer} layer
	   * @param {StyleLike} styleData
	   */


	  Styling.prototype.styleLayer = function styleLayer(layer, styleData) {
	    var _this = this;

	    var style = void 0;
	    if (styleData) {
	      style = this.getStyle(styleData);
	    } else {
	      style = this.getStyle('#defaultStyle');
	    }

	    if (_jquery2.default.isFunction(style)) {
	      style = this.convertStyleFunction(style);
	    }

	    layer.getSource().getFeatures().forEach(function (feature) {
	      _this.styleFeature(feature, style);
	    });

	    layer.getSource().on('addfeature', function (e) {
	      _this.styleFeature(e.feature, style);
	    });

	    layer.setStyle(function (feature, resolution) {
	      if (feature.getStyleFunction() !== undefined) {
	        return feature.getStyleFunction().call(feature, resolution);
	      } else {
	        return feature.getStyle();
	      }
	    });
	  };

	  /**
	   * style a collection
	   * @param {ol.Collection} collection
	   * @param {StyleLike} styleData
	   */


	  Styling.prototype.styleCollection = function styleCollection(collection, styleData) {
	    var _this2 = this;

	    var style = void 0;
	    if (styleData) {
	      style = this.getStyle(styleData);
	    } else {
	      style = this.getStyle('#defaultStyle');
	    }

	    if (_jquery2.default.isFunction(style)) {
	      style = this.convertStyleFunction(style);
	    }

	    collection.forEach(function (feature) {
	      _this2.styleFeature(feature, style);
	    });

	    collection.on('add', /** ol.CollectionEvent */function (e) {
	      _this2.styleFeature(e.element, style);
	    });
	  };

	  /**
	   * @param {ol.style.Fill} fill
	   * @returns {ol.style.Fill}
	   */


	  Styling.prototype.cloneFill = function cloneFill(fill) {
	    if (fill) {
	      return new _openlayers2.default.style.Fill({
	        color: fill.getColor()
	      });
	    }
	  };

	  /**
	   * @param {ol.style.Stroke} stroke
	   * @returns {ol.style.Stroke}
	   */


	  Styling.prototype.cloneStroke = function cloneStroke(stroke) {
	    if (stroke) {
	      return new _openlayers2.default.style.Stroke({
	        color: stroke.getColor(),
	        lineCap: stroke.getLineCap(),
	        lineJoin: stroke.getLineJoin(),
	        lineDash: stroke.getLineDash(),
	        miterLimit: stroke.getMiterLimit(),
	        width: stroke.getWidth()
	      });
	    }
	  };

	  /**
	   * @param {ol.style.Style} style
	   * @returns {ol.style.Style}
	   */


	  Styling.prototype.cloneStyle = function cloneStyle(style) {
	    var image = void 0;
	    if (style.getImage()) {
	      if (style.getImage() instanceof _openlayers2.default.style.Icon) {
	        image = new _openlayers2.default.style.Icon({
	          anchor: style.getImage().getAnchor(),
	          anchorOrigin: style.getImage().getOrigin(),
	          anchorXUnits: 'pixels',
	          anchorYUnits: 'pixels',
	          img: style.getImage().getImage(),
	          imgSize: [style.getImage().getImage().width, style.getImage().getImage().height],
	          size: style.getImage().getSize(),
	          opacity: style.getImage().getOpacity(),
	          scale: style.getImage().getScale(),
	          snapToPixel: style.getImage().getSnapToPixel(),
	          rotation: style.getImage().getRotation(),
	          rotateWithView: style.getImage().getRotateWithView()
	        });

	        image.setRotation(style.getImage().getRotation());
	      } else if (style.getImage() instanceof _openlayers2.default.style.Circle) {
	        image = new _openlayers2.default.style.Circle({
	          fill: this.cloneFill(style.getImage().getFill()),
	          radius: style.getImage().getRadius(),
	          snapToPixel: style.getImage().getSnapToPixel(),
	          stroke: this.cloneStroke(style.getImage().getStroke())
	        });

	        image.setOpacity(style.getImage().getOpacity());
	        image.setRotation(style.getImage().getRotation());
	        image.setScale(style.getImage().getScale());
	      } else if (style.getImage() instanceof _openlayers2.default.style.RegularShape) {
	        var radius = void 0,
	            radius1 = void 0,
	            radius2 = void 0;

	        if (style.getImage().getRadius2()) {
	          radius1 = style.getImage().getRadius();
	          radius2 = style.getImage().getRadius2();
	        } else {
	          radius = style.getImage().getRadius();
	        }

	        image = new _openlayers2.default.style.RegularShape({
	          fill: this.cloneFill(style.getImage().getFill()),
	          points: style.getImage().getPoints(),
	          radius: radius,
	          radius1: radius1,
	          radius2: radius2,
	          angle: style.getImage().getAngle(),
	          snapToPixel: style.getImage().getSnapToPixel(),
	          stroke: this.cloneStroke(style.getImage().getStroke()),
	          rotation: style.getImage().getRotation(),
	          rotateWithView: style.getImage().getRotateWithView()
	        });

	        image.setOpacity(style.getImage().getOpacity());
	        image.setRotation(style.getImage().getRotation());
	        image.setScale(style.getImage().getScale());
	      }
	    }

	    var text = void 0;
	    if (style.getText()) {
	      text = new _openlayers2.default.style.Text({
	        font: style.getText().getFont(),
	        offsetX: style.getText().getOffsetX(),
	        offsetY: style.getText().getOffsetY(),
	        scale: style.getText().getScale(),
	        rotation: style.getText().getRotation(),
	        text: style.getText().getText(),
	        textAlign: style.getText().getTextAlign(),
	        textBaseline: style.getText().getTextBaseline(),
	        fill: this.cloneFill(style.getText().getFill()),
	        stroke: this.cloneStroke(style.getText().getStroke())
	      });
	    }

	    return new _openlayers2.default.style.Style({
	      geometry: style.getGeometry(),
	      fill: this.cloneFill(style.getFill()),
	      image: image,
	      stroke: this.cloneStroke(style.getStroke()),
	      text: text,
	      zIndex: style.getZIndex()
	    });
	  };

	  return Styling;
	}();

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(134), __esModule: true };

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(14);
	__webpack_require__(15);
	__webpack_require__(59);
	__webpack_require__(135);
	__webpack_require__(136);
	module.exports = __webpack_require__(23).Set;

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(111);

	// 23.2 Set Objects
	module.exports = __webpack_require__(112)('Set', function(get){
	  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value){
	    return strong.def(this, value = value === 0 ? 0 : value, value);
	  }
	}, strong);

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(21);

	$export($export.P + $export.R, 'Set', {toJSON: __webpack_require__(117)('Set')});

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _keys = __webpack_require__(101);

	var _keys2 = _interopRequireDefault(_keys);

	var _getIterator2 = __webpack_require__(105);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _typeof2 = __webpack_require__(82);

	var _typeof3 = _interopRequireDefault(_typeof2);

	exports.copy = copy;
	exports.copyDeep = copyDeep;
	exports.merge = merge;
	exports.mergeDeep = mergeDeep;
	exports.mergeWithDefaults = mergeWithDefaults;
	exports.take = take;

	var _jquery = __webpack_require__(78);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// //////////////////////////////////////////////////////////////////////////////////////// //
	//                                     Object Copying                                       //
	// //////////////////////////////////////////////////////////////////////////////////////// //

	/**
	 * Copy an object
	 * @param {Object} object
	 * @returns {Object}
	 */
	function copy(object) {
	  if (_jquery2.default.isArray(object)) {
	    return _jquery2.default.extend([], object);
	  } else if (_jquery2.default.isPlainObject(object)) {
	    return _jquery2.default.extend({}, object);
	  } else {
	    return object;
	  }
	}

	/**
	 * Deep copy an object
	 * @param {Object} object
	 * @returns {Object}
	 */
	/**
	 * @module utilitiesObject
	 * Helper- and Miscfunctions (object related)
	 */

	function copyDeep(object) {
	  if (_jquery2.default.isArray(object)) {
	    return _jquery2.default.extend(true, [], object);
	  } else if (_jquery2.default.isPlainObject(object)) {
	    return _jquery2.default.extend(true, {}, object);
	  } else {
	    return object;
	  }
	}

	// //////////////////////////////////////////////////////////////////////////////////////// //
	//                                    Object Merging                                        //
	// //////////////////////////////////////////////////////////////////////////////////////// //

	/**
	 * A simple object merge function. merges all keys of obj2 to obj1.
	 * @param {Object} obj1 the object which will be merged into
	 * @param {Object} obj2 the object that will be merged into obj1
	 * @returns {Object}
	 */
	function merge(obj1, obj2) {
	  return _jquery2.default.extend(obj1, obj2);
	}

	/**
	 * A simple reverse object merge function. merges all keys of obj2 to obj1.
	 * @param {Object} obj1 the object which will be merged into
	 * @param {Object} obj2 the object that will be merged into obj1
	 * @returns {Object}
	 */
	function mergeDeep(obj1, obj2) {
	  return _jquery2.default.extend(true, obj1, obj2);
	}

	/**
	 * basically adds all properties (key, value - pairs) from defaults to config whichs keys aren't keys of config.
	 *      (except for keys with 'Element' in their name)
	 * if the value is an object (on the left side, config) it is called recursively
	 * if the value is an array (on the left side, config) it is called with the key value+'Element' for each element
	 *      of the array
	 * @param {Object} config the config which should be mergeed with defaults
	 * @param {Object} defaults the defaults to be merged with config
	 * @returns {Object} the altered config
	 */
	function mergeWithDefaults(config, defaults) {
	  if ((typeof defaults === 'undefined' ? 'undefined' : (0, _typeof3.default)(defaults)) === 'object' && (typeof config === 'undefined' ? 'undefined' : (0, _typeof3.default)(config)) === 'object') {
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	      for (var _iterator = (0, _getIterator3.default)((0, _keys2.default)(defaults)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var k = _step.value;

	        if (!(k in config) && k.search('Element') < 0) {
	          config[k] = defaults[k];
	          // order of this branches is important because typeof Array equals object
	        } else if (config[k] instanceof Array) {
	          // if both arrays have the same length, it assumed that every element of the array in default is
	          //      the default for every element in the array in config
	          if (config[k].length === defaults[k].length) {
	            for (var i = 0; i < config[k].length; i += 1) {
	              mergeWithDefaults(config[k][i], defaults[k][i]);
	            }
	          } else {
	            // if there exists a key with the name k+'Element' then it is the default for every element of
	            //      the configuration
	            if (k + 'Element' in defaults) {
	              for (var _i = 0; _i < config[k].length; _i += 1) {
	                mergeWithDefaults(config[k][_i], defaults[k + 'Element']);
	              }
	            }
	          }
	        } else if ((0, _typeof3.default)(config[k]) === 'object') {
	          mergeWithDefaults(config[k], defaults[k]);
	        } else if ((0, _typeof3.default)(config[k]) !== 'object' && (0, _typeof3.default)(defaults[k]) === 'object' && config[k]) {
	          config[k] = {};
	          mergeWithDefaults(config[k], defaults[k]);
	        }
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator.return) {
	          _iterator.return();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }
	  } else {
	    if (!config) {
	      config = defaults;
	    }
	  }
	  return config;
	}

	/**
	 * Removes a property from an object and returns its value
	 * @param {Object} object
	 * @param {String} prop
	 * @returns {*}
	 */
	function take(object, prop) {
	  if (object.hasOwnProperty(prop)) {
	    var tmp = object[prop];
	    delete object[prop];
	    return tmp;
	  }
	}

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _defineProperty = __webpack_require__(139);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(120);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(121);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _getPrototypeOf = __webpack_require__(142);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _getOwnPropertyDescriptor = __webpack_require__(145);

	var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

	var _getOwnPropertyNames = __webpack_require__(148);

	var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

	var _promise = __webpack_require__(12);

	var _promise2 = _interopRequireDefault(_promise);

	var _typeof2 = __webpack_require__(82);

	var _typeof3 = _interopRequireDefault(_typeof2);

	exports.even = even;
	exports.odd = odd;
	exports.checkFor = checkFor;
	exports.asObject = asObject;
	exports.getConfig = getConfig;
	exports.encodeTemplate = encodeTemplate;
	exports.expandTemplate = expandTemplate;
	exports.addProxy = addProxy;
	exports.addParamToURL = addParamToURL;
	exports.finishAllImages = finishAllImages;
	exports.offset = offset;
	exports.recursiveSelect = recursiveSelect;
	exports.showInteractionActivity = showInteractionActivity;
	exports.urlDirname = urlDirname;
	exports.urlNormalize = urlNormalize;
	exports.urlJoin = urlJoin;
	exports.urlRelative = urlRelative;
	exports.urlIsAbsolute = urlIsAbsolute;
	exports.mixin = mixin;
	exports.html2Text = html2Text;

	var _jquery = __webpack_require__(78);

	var _jquery2 = _interopRequireDefault(_jquery);

	__webpack_require__(80);

	__webpack_require__(80);

	__webpack_require__(146);

	__webpack_require__(80);

	var _Debug = __webpack_require__(151);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Checks whether an argument can be interpreted as an even integer
	 * @param   {Object}  value A value of any type
	 * @returns {Boolean} True when value is numeric, parses as an integer (no matter if decimal, octal or sexadecimal)
	 */
	/**
	 * @module utilities
	 * Helper and misc functions
	 */

	function even(value) {
	  if (_jquery2.default.isNumeric(value)) {
	    var valueAsInteger = parseInt(value);
	    if (value === valueAsInteger && valueAsInteger % 2 === 0) {
	      return true;
	    }
	  }
	  return false;
	}

	/**
	 * Checks whether an argument can be interpreted as an even integer
	 * @param   {Object}  value A value of any type
	 * @returns {Boolean} True when value is numeric, parses as an integer (no matter if decimal, octal or sexadecimal)
	 */
	function odd(value) {
	  if (_jquery2.default.isNumeric(value)) {
	    var valueAsInteger = parseInt(value);
	    if (value === valueAsInteger && valueAsInteger % 2 === 1) {
	      return true;
	    }
	  }
	  return false;
	}

	/**
	 * Check for a label in a configuration object
	 * @param   {Object}  configurationObject a configuration object
	 * @param   {String}  label               a label to check for
	 * @returns {boolean} true if label present and true, false otherwise
	 */
	function checkFor(configurationObject, label) {
	  return label in configurationObject && configurationObject[label];
	}

	/**
	 * return argument as object (if it is no object the value is {})
	 * @returns {Object}
	 */
	function asObject(argument) {
	  return (typeof argument === 'undefined' ? 'undefined' : (0, _typeof3.default)(argument)) === 'object' ? argument : {};
	}

	/**
	 * Gets the subconfig or an empty object
	 * @param {object} config
	 * @param {string} name
	 * @returns {object}
	 */
	function getConfig(config, name) {
	  if (name in config && config[name]) {
	    if ((0, _typeof3.default)(config[name]) !== 'object') {
	      return {};
	    } else {
	      return config[name];
	    }
	  }
	}

	// //////////////////////////////////////////////////////////////////////////////////////// //
	//                                Proxy related functions                                   //
	// //////////////////////////////////////////////////////////////////////////////////////// //

	/**
	 * this function takes an (url) template and encodes everything except for the templated elements.
	 * @param {string} template an (url) template
	 * @returns {string} the encoded (url) template
	 */
	function encodeTemplate(template) {
	  var parts = template.split('}');

	  var encodedTemplate = '';

	  var i = void 0;
	  for (i = 0; i < parts.length - 1; i += 1) {
	    var partedParts = parts[i].split('{');
	    encodedTemplate += encodeURIComponent(partedParts[0]) + '{' + partedParts[1] + '}';
	  }

	  encodedTemplate += encodeURIComponent(parts[i]);

	  return encodedTemplate;
	}

	/**
	 * replaces a param enclosed in {} in a (url) template with a value. If the value is an array it will take any string
	 * not containing a '}' after the paramName to join the array, default ','.
	 * @param {string} template an (url) template
	 * @param {string} paramName the parameter that will be replaced (given without {}) f.e. 'example' will replace any
	 *    occurancy of '{example}' (after the word 'example' there might be given a string join an array value
	 *    i.e. '{example+}')
	 * @param {string|string[]|number} paramValue the value(s) which will be inserted
	 * @returns {string} the expanded string
	 */
	function expandTemplate(template, paramName, paramValue) {
	  var regexp = new RegExp('{' + paramName + '([^}]*)}');
	  var match = template.match(regexp);
	  if (match) {
	    if (_jquery2.default.type(paramValue) === 'string') {
	      return template.replace(regexp, paramValue);
	    } else if (_jquery2.default.type(paramValue) === 'array') {
	      var joinString = match[1] || ',';
	      return template.replace(regexp, paramValue.join(joinString));
	    } else if (_jquery2.default.type(paramValue) === 'number') {
	      var valReg = new RegExp('(?::|,)([^,])', 'g');
	      var nextMatch = valReg.exec(match[1]);
	      for (var i = 0; i < paramValue; i++) {
	        nextMatch = valReg.exec(match[1]);
	      }
	      return template.replace(regexp, nextMatch[1]);
	    }
	  } else {
	    throw new Error('parameter ' + paramName + ' (enclosed in {}) not found in string ' + template);
	  }
	}

	/**
	 * prepends the url with the proxy address and encodes the old url
	 * @param {string} url an url
	 * @param {string} proxy the proxy to prepend
	 * @returns {string} the composed url
	 */
	function addProxy(url, proxy) {
	  if (proxy) {
	    return expandTemplate(proxy, 'url', encodeTemplate(url));
	  } else {
	    return url;
	  }
	}

	/*
	 * this function will add an parameter to an url
	 * @param {string} url
	 * @param {string} parameter
	 * @returns {string} url
	 */
	function addParamToURL(url, param) {
	  if (url.search(/\?/) === -1) {
	    url += '?';
	  } else {
	    url += '&';
	  }
	  url += param;
	  return url;
	}

	// //////////////////////////////////////////////////////////////////////////////////////// //
	//                      finish all ajax requests then continue                              //
	// //////////////////////////////////////////////////////////////////////////////////////// //

	/**
	 * finishs loading all images contained in the given jQuery object.
	 * @param {jQuery} $object
	 * @returns {Promise}
	 */
	function finishAllImages($object) {
	  var imagePromises = [];

	  var $images = recursiveSelect($object, 'img');

	  $images.each(function () {
	    var image = this;

	    if (!image.complete) {
	      imagePromises.push(new _promise2.default(function (resolve) {
	        (0, _jquery2.default)(image).on('load', resolve);
	      }));
	    }
	  });

	  return _promise2.default.all(imagePromises);
	}

	/**
	 * calculates the distance between one and another jQuery element
	 * @param {jQuery} $one
	 * @param {jQuery} $other
	 * @returns {{top: number, left: number}}
	 */
	function offset($one, $other) {
	  var oneOff = $one.offset();
	  var otherOff = $other.offset();
	  return { top: oneOff.top - otherOff.top, left: oneOff.left - otherOff.left };
	}

	// //////////////////////////////////////////////////////////////////////////////////////////
	//                                   jQuery Extensions                                    //
	// //////////////////////////////////////////////////////////////////////////////////////////

	/**
	 * selects all matching elements and child elements
	 * @param {jQuery} $elem
	 * @param {string} query
	 * @returns {jQuery}
	 */
	function recursiveSelect($elem, query) {
	  return $elem.filter(query).add($elem.find(query));
	}

	// //////////////////////////////////////////////////////////////////////////////////////// //
	//                                Structural Functions                                      //
	// //////////////////////////////////////////////////////////////////////////////////////// //

	function showInteractionActivity(map) {
	  _Debug.Debug.info('superseding interactions:');
	  var k = void 0,
	      i = void 0;
	  var total = void 0;
	  var amountActive = void 0;

	  for (k in map.supersedingInteractions_) {
	    total = map.supersedingInteractions_[k].length;
	    amountActive = 0;
	    for (i = 0; i < total; i++) {
	      if (map.supersedingInteractions_[k][i].getActive()) {
	        amountActive += 1;
	      }
	    }

	    _Debug.Debug.info('  ' + k + ': total: ' + total + ' active: ' + amountActive);
	  }

	  _Debug.Debug.info('default interactions:');

	  for (k in map.defaultInteractions_) {
	    total = map.defaultInteractions_[k].length;
	    amountActive = 0;
	    for (i = 0; i < total; i++) {
	      if (map.defaultInteractions_[k][i].getActive()) {
	        amountActive += 1;
	      }
	    }

	    _Debug.Debug.info('  ' + k + ': total: ' + total + ' active: ' + amountActive);
	  }
	}

	// //////////////////////////////////////////////////////////////////////////////////////// //
	//                                     URL Functions                                        //
	// //////////////////////////////////////////////////////////////////////////////////////// //

	// the functions are designed to mimic the behaviour of the node path module.
	// differences: dirURLs will end in /'s
	// the are in no way complete and don't claim to be complete
	// NOTE: another way to solve this would be using String.split instead of regular expressions

	/**
	 * A function that tries to get the dir url of an url
	 * @param {string} url
	 * @returns {string}
	 */
	function urlDirname(url) {
	  return url.replace(/\/([^\/]*)(\?.*)?$/, '/');
	}

	/**
	 * A function that normalizes a url
	 * @param {string} url
	 * @returns {string}
	 */
	function urlNormalize(url) {
	  if (url.match(/^\.\//)) {
	    return urlNormalize(url.replace(/^\.\//, ''));
	  } else {
	    return url;
	  }
	}

	/**
	 * A function that adds urls
	 * @param {string} urlRoot
	 * @param {string} urlExt
	 * @returns {string}
	 */
	function urlJoin(urlRoot, urlExt) {
	  var normPathRoot = urlDirname(urlNormalize(urlRoot));
	  var normPathExt = urlNormalize(urlExt);

	  var lastPart = /[^\/]+\/$/;
	  var leadingDoubleDots = /^\.\.\//;

	  while (normPathRoot.match(lastPart) && normPathExt.match(leadingDoubleDots)) {
	    normPathRoot = normPathRoot.replace(lastPart, '');
	    normPathExt = normPathExt.replace(leadingDoubleDots, '');
	  }

	  return normPathRoot + normPathExt;
	}

	/**
	 * A function that tries to get the relative url between to urles
	 * @param {string} source
	 * @param {string} target
	 * @returns {string}
	 */
	function urlRelative(source, target) {
	  var sourceNorm = urlDirname(urlNormalize(source));
	  var targetNorm = urlNormalize(target);

	  var urlRelative = '';

	  var firstPart = /^\/?((\/\/)|[^/])+\//;

	  var firstSourcePart = void 0;
	  var firstTargetPart = void 0;

	  while (sourceNorm.match(firstPart) && targetNorm.match(firstPart)) {
	    firstSourcePart = sourceNorm.match(firstPart)[0];
	    firstTargetPart = targetNorm.match(firstPart)[0];

	    if (firstSourcePart.toUpperCase() !== firstTargetPart.toUpperCase()) {
	      break;
	    }

	    sourceNorm = sourceNorm.replace(firstPart, '');
	    targetNorm = targetNorm.replace(firstPart, '');
	  }

	  while (sourceNorm.match(firstPart)) {
	    firstSourcePart = sourceNorm.match(firstPart)[0];
	    sourceNorm = sourceNorm.replace(firstPart, '');
	    urlRelative += '../';
	  }

	  return urlRelative + targetNorm;
	}

	/**
	 * @param {string} url
	 * @returns {boolean}
	 */
	function urlIsAbsolute(url) {
	  return !!url.match(/^\/|.*:\/\//);
	}

	// //////////////////////////////////////////////////////////////////////////////////////// //
	//                                         Other                                            //
	// //////////////////////////////////////////////////////////////////////////////////////// //

	function getPropertyNamesAndDescriptions(obj) {
	  var props = {};

	  do {
	    (0, _getOwnPropertyNames2.default)(obj).forEach(function (prop) {
	      if (!props.hasOwnProperty(prop)) {
	        props[prop] = (0, _getOwnPropertyDescriptor2.default)(obj, prop);
	      }
	    });
	    obj = (0, _getPrototypeOf2.default)(obj);
	  } while (obj !== Object.prototype);

	  return props;
	}

	/**
	 * This creates a new class which inherits from the base class and mixes in every method (except any method named
	 * 'initialize') from the mixin class. The mixin class may not overwrite any existing method. If it has a method called
	 * 'initialize' this will be remembered and called after the constructor of the base class has finished
	 * @param baseClass
	 * @param mixinClass
	 * @returns {class}
	 */
	function mixin(baseClass, mixinClass) {
	  var initialize = mixinClass.prototype.initialize;

	  var m = function (_baseClass) {
	    (0, _inherits3.default)(m, _baseClass);

	    function m(options) {
	      (0, _classCallCheck3.default)(this, m);

	      var _this = (0, _possibleConstructorReturn3.default)(this, _baseClass.call(this, options));

	      if (initialize) {
	        initialize.call(_this, options);
	      }
	      return _this;
	    }

	    return m;
	  }(baseClass);

	  var propsAndDescriptions = getPropertyNamesAndDescriptions(mixinClass.prototype);

	  for (var name in propsAndDescriptions) {
	    if (name !== 'constructor' && name !== 'initialize') {
	      if (name in m.prototype) {
	        throw new Error('mixins should not overwrite methods');
	      }
	      (0, _defineProperty2.default)(m.prototype, name, propsAndDescriptions[name]);
	    }
	  }

	  return m;
	}

	var $p = (0, _jquery2.default)('<p>');

	/**
	 * Takes a string with HTML and returns the containing resulting text.
	 * @param stringWithHTML string with encoded HTML entities
	 * @returns {string}
	 */
	function html2Text(stringWithHTML) {
	  return $p.html(stringWithHTML).text();
	}

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(140), __esModule: true };

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(141);
	var $Object = __webpack_require__(23).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(21);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(31), 'Object', {defineProperty: __webpack_require__(27).f});

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(143), __esModule: true };

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(144);
	module.exports = __webpack_require__(23).Object.getPrototypeOf;

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject        = __webpack_require__(58)
	  , $getPrototypeOf = __webpack_require__(57);

	__webpack_require__(104)('getPrototypeOf', function(){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(146), __esModule: true };

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(147);
	var $Object = __webpack_require__(23).Object;
	module.exports = function getOwnPropertyDescriptor(it, key){
	  return $Object.getOwnPropertyDescriptor(it, key);
	};

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject                 = __webpack_require__(44)
	  , $getOwnPropertyDescriptor = __webpack_require__(98).f;

	__webpack_require__(104)('getOwnPropertyDescriptor', function(){
	  return function getOwnPropertyDescriptor(it, key){
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(149), __esModule: true };

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(150);
	var $Object = __webpack_require__(23).Object;
	module.exports = function getOwnPropertyNames(it){
	  return $Object.getOwnPropertyNames(it);
	};

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 Object.getOwnPropertyNames(O)
	__webpack_require__(104)('getOwnPropertyNames', function(){
	  return __webpack_require__(96).f;
	});

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Debug = undefined;

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * This class provides different debug behaviour based on the SWITCH_DEBUG build flag
	 */
	var Debug = exports.Debug = function () {
	  function Debug() {
	    (0, _classCallCheck3.default)(this, Debug);
	  }

	  /**
	   * if in release mode all thrown errors in the callback are catched and the program is continued
	   * @param {function} cb
	   */
	  Debug.tryOrThrow = function tryOrThrow(cb) {
	    if (true) {
	      // eslint-disable-line
	      cb();
	    } else if (SWITCH_DEBUG === 'PRODUCTION') {
	      // eslint-disable-line
	      try {
	        cb();
	      } catch (e) {
	        this.error(e);
	      }
	    }
	  };

	  /**
	   * Prints an info note if in debug mode
	   * @param {string} msg
	   */


	  Debug.info = function info(msg) {
	    if (true) {
	      // eslint-disable-line
	      console.log(msg); // eslint-disable-line
	    }
	  };

	  /**
	   * prints a warning
	   * @param {string} msg
	   */


	  Debug.warn = function warn(msg) {
	    console.warn(msg); // eslint-disable-line
	  };

	  /**
	   * prints an error
	   * @param {string} msg
	   */


	  Debug.error = function error(msg) {
	    console.error(msg); // eslint-disable-line
	  };

	  /**
	   * a default error handler for .catch functions
	   * @param {string} message
	   */


	  Debug.defaultErrorHandler = function defaultErrorHandler(message) {
	    Debug.error(message);
	    if (message.stack) {
	      Debug.error(message.stack);
	    }
	  };

	  return Debug;
	}();

/***/ },
/* 152 */
/***/ function(module, exports) {

	// (c) Dean McNamee <dean@gmail.com>, 2012.
	//
	// https://github.com/deanm/css-color-parser-js
	//
	// Permission is hereby granted, free of charge, to any person obtaining a copy
	// of this software and associated documentation files (the "Software"), to
	// deal in the Software without restriction, including without limitation the
	// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
	// sell copies of the Software, and to permit persons to whom the Software is
	// furnished to do so, subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be included in
	// all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
	// IN THE SOFTWARE.

	// http://www.w3.org/TR/css3-color/
	var kCSSColorTable = {
	  "transparent": [0,0,0,0], "aliceblue": [240,248,255,1],
	  "antiquewhite": [250,235,215,1], "aqua": [0,255,255,1],
	  "aquamarine": [127,255,212,1], "azure": [240,255,255,1],
	  "beige": [245,245,220,1], "bisque": [255,228,196,1],
	  "black": [0,0,0,1], "blanchedalmond": [255,235,205,1],
	  "blue": [0,0,255,1], "blueviolet": [138,43,226,1],
	  "brown": [165,42,42,1], "burlywood": [222,184,135,1],
	  "cadetblue": [95,158,160,1], "chartreuse": [127,255,0,1],
	  "chocolate": [210,105,30,1], "coral": [255,127,80,1],
	  "cornflowerblue": [100,149,237,1], "cornsilk": [255,248,220,1],
	  "crimson": [220,20,60,1], "cyan": [0,255,255,1],
	  "darkblue": [0,0,139,1], "darkcyan": [0,139,139,1],
	  "darkgoldenrod": [184,134,11,1], "darkgray": [169,169,169,1],
	  "darkgreen": [0,100,0,1], "darkgrey": [169,169,169,1],
	  "darkkhaki": [189,183,107,1], "darkmagenta": [139,0,139,1],
	  "darkolivegreen": [85,107,47,1], "darkorange": [255,140,0,1],
	  "darkorchid": [153,50,204,1], "darkred": [139,0,0,1],
	  "darksalmon": [233,150,122,1], "darkseagreen": [143,188,143,1],
	  "darkslateblue": [72,61,139,1], "darkslategray": [47,79,79,1],
	  "darkslategrey": [47,79,79,1], "darkturquoise": [0,206,209,1],
	  "darkviolet": [148,0,211,1], "deeppink": [255,20,147,1],
	  "deepskyblue": [0,191,255,1], "dimgray": [105,105,105,1],
	  "dimgrey": [105,105,105,1], "dodgerblue": [30,144,255,1],
	  "firebrick": [178,34,34,1], "floralwhite": [255,250,240,1],
	  "forestgreen": [34,139,34,1], "fuchsia": [255,0,255,1],
	  "gainsboro": [220,220,220,1], "ghostwhite": [248,248,255,1],
	  "gold": [255,215,0,1], "goldenrod": [218,165,32,1],
	  "gray": [128,128,128,1], "green": [0,128,0,1],
	  "greenyellow": [173,255,47,1], "grey": [128,128,128,1],
	  "honeydew": [240,255,240,1], "hotpink": [255,105,180,1],
	  "indianred": [205,92,92,1], "indigo": [75,0,130,1],
	  "ivory": [255,255,240,1], "khaki": [240,230,140,1],
	  "lavender": [230,230,250,1], "lavenderblush": [255,240,245,1],
	  "lawngreen": [124,252,0,1], "lemonchiffon": [255,250,205,1],
	  "lightblue": [173,216,230,1], "lightcoral": [240,128,128,1],
	  "lightcyan": [224,255,255,1], "lightgoldenrodyellow": [250,250,210,1],
	  "lightgray": [211,211,211,1], "lightgreen": [144,238,144,1],
	  "lightgrey": [211,211,211,1], "lightpink": [255,182,193,1],
	  "lightsalmon": [255,160,122,1], "lightseagreen": [32,178,170,1],
	  "lightskyblue": [135,206,250,1], "lightslategray": [119,136,153,1],
	  "lightslategrey": [119,136,153,1], "lightsteelblue": [176,196,222,1],
	  "lightyellow": [255,255,224,1], "lime": [0,255,0,1],
	  "limegreen": [50,205,50,1], "linen": [250,240,230,1],
	  "magenta": [255,0,255,1], "maroon": [128,0,0,1],
	  "mediumaquamarine": [102,205,170,1], "mediumblue": [0,0,205,1],
	  "mediumorchid": [186,85,211,1], "mediumpurple": [147,112,219,1],
	  "mediumseagreen": [60,179,113,1], "mediumslateblue": [123,104,238,1],
	  "mediumspringgreen": [0,250,154,1], "mediumturquoise": [72,209,204,1],
	  "mediumvioletred": [199,21,133,1], "midnightblue": [25,25,112,1],
	  "mintcream": [245,255,250,1], "mistyrose": [255,228,225,1],
	  "moccasin": [255,228,181,1], "navajowhite": [255,222,173,1],
	  "navy": [0,0,128,1], "oldlace": [253,245,230,1],
	  "olive": [128,128,0,1], "olivedrab": [107,142,35,1],
	  "orange": [255,165,0,1], "orangered": [255,69,0,1],
	  "orchid": [218,112,214,1], "palegoldenrod": [238,232,170,1],
	  "palegreen": [152,251,152,1], "paleturquoise": [175,238,238,1],
	  "palevioletred": [219,112,147,1], "papayawhip": [255,239,213,1],
	  "peachpuff": [255,218,185,1], "peru": [205,133,63,1],
	  "pink": [255,192,203,1], "plum": [221,160,221,1],
	  "powderblue": [176,224,230,1], "purple": [128,0,128,1],
	  "rebeccapurple": [102,51,153,1],
	  "red": [255,0,0,1], "rosybrown": [188,143,143,1],
	  "royalblue": [65,105,225,1], "saddlebrown": [139,69,19,1],
	  "salmon": [250,128,114,1], "sandybrown": [244,164,96,1],
	  "seagreen": [46,139,87,1], "seashell": [255,245,238,1],
	  "sienna": [160,82,45,1], "silver": [192,192,192,1],
	  "skyblue": [135,206,235,1], "slateblue": [106,90,205,1],
	  "slategray": [112,128,144,1], "slategrey": [112,128,144,1],
	  "snow": [255,250,250,1], "springgreen": [0,255,127,1],
	  "steelblue": [70,130,180,1], "tan": [210,180,140,1],
	  "teal": [0,128,128,1], "thistle": [216,191,216,1],
	  "tomato": [255,99,71,1], "turquoise": [64,224,208,1],
	  "violet": [238,130,238,1], "wheat": [245,222,179,1],
	  "white": [255,255,255,1], "whitesmoke": [245,245,245,1],
	  "yellow": [255,255,0,1], "yellowgreen": [154,205,50,1]}

	function clamp_css_byte(i) {  // Clamp to integer 0 .. 255.
	  i = Math.round(i);  // Seems to be what Chrome does (vs truncation).
	  return i < 0 ? 0 : i > 255 ? 255 : i;
	}

	function clamp_css_float(f) {  // Clamp to float 0.0 .. 1.0.
	  return f < 0 ? 0 : f > 1 ? 1 : f;
	}

	function parse_css_int(str) {  // int or percentage.
	  if (str[str.length - 1] === '%')
	    return clamp_css_byte(parseFloat(str) / 100 * 255);
	  return clamp_css_byte(parseInt(str));
	}

	function parse_css_float(str) {  // float or percentage.
	  if (str[str.length - 1] === '%')
	    return clamp_css_float(parseFloat(str) / 100);
	  return clamp_css_float(parseFloat(str));
	}

	function css_hue_to_rgb(m1, m2, h) {
	  if (h < 0) h += 1;
	  else if (h > 1) h -= 1;

	  if (h * 6 < 1) return m1 + (m2 - m1) * h * 6;
	  if (h * 2 < 1) return m2;
	  if (h * 3 < 2) return m1 + (m2 - m1) * (2/3 - h) * 6;
	  return m1;
	}

	function parseCSSColor(css_str) {
	  // Remove all whitespace, not compliant, but should just be more accepting.
	  var str = css_str.replace(/ /g, '').toLowerCase();

	  // Color keywords (and transparent) lookup.
	  if (str in kCSSColorTable) return kCSSColorTable[str].slice();  // dup.

	  // #abc and #abc123 syntax.
	  if (str[0] === '#') {
	    if (str.length === 4) {
	      var iv = parseInt(str.substr(1), 16);  // TODO(deanm): Stricter parsing.
	      if (!(iv >= 0 && iv <= 0xfff)) return null;  // Covers NaN.
	      return [((iv & 0xf00) >> 4) | ((iv & 0xf00) >> 8),
	              (iv & 0xf0) | ((iv & 0xf0) >> 4),
	              (iv & 0xf) | ((iv & 0xf) << 4),
	              1];
	    } else if (str.length === 7) {
	      var iv = parseInt(str.substr(1), 16);  // TODO(deanm): Stricter parsing.
	      if (!(iv >= 0 && iv <= 0xffffff)) return null;  // Covers NaN.
	      return [(iv & 0xff0000) >> 16,
	              (iv & 0xff00) >> 8,
	              iv & 0xff,
	              1];
	    }

	    return null;
	  }

	  var op = str.indexOf('('), ep = str.indexOf(')');
	  if (op !== -1 && ep + 1 === str.length) {
	    var fname = str.substr(0, op);
	    var params = str.substr(op+1, ep-(op+1)).split(',');
	    var alpha = 1;  // To allow case fallthrough.
	    switch (fname) {
	      case 'rgba':
	        if (params.length !== 4) return null;
	        alpha = parse_css_float(params.pop());
	        // Fall through.
	      case 'rgb':
	        if (params.length !== 3) return null;
	        return [parse_css_int(params[0]),
	                parse_css_int(params[1]),
	                parse_css_int(params[2]),
	                alpha];
	      case 'hsla':
	        if (params.length !== 4) return null;
	        alpha = parse_css_float(params.pop());
	        // Fall through.
	      case 'hsl':
	        if (params.length !== 3) return null;
	        var h = (((parseFloat(params[0]) % 360) + 360) % 360) / 360;  // 0 .. 1
	        // NOTE(deanm): According to the CSS spec s/l should only be
	        // percentages, but we don't bother and let float or percentage.
	        var s = parse_css_float(params[1]);
	        var l = parse_css_float(params[2]);
	        var m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
	        var m1 = l * 2 - m2;
	        return [clamp_css_byte(css_hue_to_rgb(m1, m2, h+1/3) * 255),
	                clamp_css_byte(css_hue_to_rgb(m1, m2, h) * 255),
	                clamp_css_byte(css_hue_to_rgb(m1, m2, h-1/3) * 255),
	                alpha];
	      default:
	        return null;
	    }
	  }

	  return null;
	}

	try { exports.parseCSSColor = parseCSSColor } catch(e) { }


/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.LayerConfigurator = undefined;

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _openlayers = __webpack_require__(77);

	var _openlayers2 = _interopRequireDefault(_openlayers);

	var _GroupLayer = __webpack_require__(154);

	var _utilitiesObject = __webpack_require__(137);

	var _utilities = __webpack_require__(138);

	var _Debug = __webpack_require__(151);

	var _LayerFactory = __webpack_require__(161);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * This is part of the MapConfigurator class
	 */
	var LayerConfigurator = exports.LayerConfigurator = function () {
	  /**
	   * @param {G4UMap} map
	   * @public
	   */
	  function LayerConfigurator(map) {
	    (0, _classCallCheck3.default)(this, LayerConfigurator);

	    /**
	     * @type {G4UMap}
	     * @private
	     */
	    this.map_ = map;
	    this.map_.on('change:layerConfig', this.configureLayers.bind(this));

	    /**
	     * @type {LayerFactory}
	     * @private
	     */
	    this.layerFactory_ = new _LayerFactory.LayerFactory(map);
	  }

	  /**
	   * configures the layers according to the layerConfig stored in the 'layerConfig' property stored in the map. If the
	   * config changes this method is called automatically.
	   * @public
	   */


	  LayerConfigurator.prototype.configureLayers = function configureLayers() {
	    var _this = this;

	    this.map_.set('ready:layers', false);

	    if (!(this.map_.getLayerGroup() instanceof _GroupLayer.GroupLayer)) {
	      this.map_.setLayerGroup(new _GroupLayer.GroupLayer());
	    }

	    var layers = this.map_.getLayerGroup();
	    layers.getLayers().clear();

	    /**
	     * @type {LayerConfig}
	     */
	    var layerConfigCopy = (0, _utilitiesObject.copyDeep)(this.map_.get('layerConfig'));

	    /**
	     * @type {MapConfig}
	     */
	    var mapConfig = this.map_.get('mapConfig');

	    this.map_.set('layerIds', []); // in layerIds all ids are stored to check if one is double.

	    this.layerFactory_.setMapConfigProjection(mapConfig.hasOwnProperty('mapProjection') ? _openlayers2.default.proj.get(mapConfig.mapProjection) : null);

	    this.map_.set('loadingStrategy', mapConfig.hasOwnProperty('loadingStrategy') ? mapConfig.loadingStrategy : 'ALL');

	    this.map_.set('ignoreLayerAvailability', mapConfig.hasOwnProperty('ignoreLayerAvailability') ? mapConfig.ignoreLayerAvailability : false);

	    // //////////////////////////////////////////////////////////////////////////////////////////
	    //                                      Baselayers                                        //
	    // //////////////////////////////////////////////////////////////////////////////////////////

	    // baseLayers before the view, because they determine the projection of the view.

	    /**
	     * @type {GroupLayer}
	     * @private
	     */
	    this.baseLayerGroup_ = this.map_.get('baseLayers') || new _GroupLayer.GroupLayer();

	    this.baseLayerGroup_.getLayers().clear();

	    if (layerConfigCopy.hasOwnProperty('baseLayers') && layerConfigCopy.baseLayers instanceof Array) {
	      (function () {
	        _Debug.Debug.tryOrThrow(function () {
	          _this.layerFactory_.addLayers(_this.baseLayerGroup_, layerConfigCopy.baseLayers, 'baseLayer');
	        });

	        if (_this.baseLayerGroup_.getLayers().getLength() === 0) {
	          if (layerConfigCopy.baseLayers.length !== 0) {
	            var confCp = (0, _utilitiesObject.copyDeep)(layerConfigCopy.baseLayers[0]);
	            confCp.alwaysVisible = true;
	            _this.layerFactory_.addLayers(_this.baseLayerGroup_, confCp, 'baseLayer', true);
	          } else {
	            _Debug.Debug.warn('There is no baselayer available!');
	          }
	        }

	        var visibleBaseLayer = void 0;

	        _this.baseLayerGroup_.recursiveForEach(function (layer) {
	          if (!(layer instanceof _GroupLayer.GroupLayer)) {
	            visibleBaseLayer = visibleBaseLayer || layer.getVisible();
	          }
	        });

	        if (!visibleBaseLayer && _this.baseLayerGroup_.getLayers().getLength()) {
	          (function () {
	            var setFirstVisible = function setFirstVisible(layer) {
	              if (layer instanceof _GroupLayer.GroupLayer) {
	                setFirstVisible(layer.getLayersArray()[0]);
	              } else {
	                layer.setVisible(true);
	              }
	            };

	            setFirstVisible(_this.baseLayerGroup_);
	          })();
	        }

	        if (!_this.map_.get('baseLayers')) {
	          _this.baseLayerGroup_.getLayers().on('remove', function (e) {
	            if (_this.baseLayerGroup_.getLayers().getLength() > 0) {
	              if (e.element.getVisible()) {
	                _this.baseLayerGroup_.getLayers().item(0).setVisible(true);
	              }
	            }
	          });
	        }

	        _this.map_.set('baseLayers', _this.baseLayerGroup_);
	        layers.getLayers().push(_this.baseLayerGroup_);
	      })();
	    } else {
	      _Debug.Debug.warn("The mapConfig option 'baseLayers' is not set or not an Array!");
	    }

	    // if no baselayer had a given projection, choose 'EPSG:3857'
	    this.map_.set('mapProjection', this.layerFactory_.getMapProjection() || _openlayers2.default.proj.get('EPSG:3857'));

	    // //////////////////////////////////////////////////////////////////////////////////////////
	    //                                    FeatureLayers                                       //
	    // //////////////////////////////////////////////////////////////////////////////////////////

	    /**
	     * @type {GroupLayer}
	     */
	    var featureLayers = this.map_.get('featureLayers') || new _GroupLayer.GroupLayer();

	    featureLayers.getLayers().clear();

	    this.layerFactory_.addLayers(featureLayers, layerConfigCopy.featureLayers || [], 'featureLayer');

	    this.map_.set('featureLayers', featureLayers);
	    layers.getLayers().push(featureLayers);

	    // //////////////////////////////////////////////////////////////////////////////////////////
	    //                                 FixedFeatureLayers                                     //
	    // //////////////////////////////////////////////////////////////////////////////////////////

	    /**
	     * @type {GroupLayer}
	     */
	    var fixedFeatureLayers = this.map_.get('fixedFeatureLayers') || new _GroupLayer.GroupLayer();

	    fixedFeatureLayers.getLayers().clear();

	    if ((0, _utilities.checkFor)(layerConfigCopy, 'fixedFeatureLayers')) {
	      this.layerFactory_.addLayers(fixedFeatureLayers, layerConfigCopy.fixedFeatureLayers, 'featureLayer');

	      this.map_.set('fixedFeatureLayers', fixedFeatureLayers);
	      layers.getLayers().push(fixedFeatureLayers);
	    }

	    // //////////////////////////////////////////////////////////////////////////////////////////
	    //                                      QueryLayer                                        //
	    // //////////////////////////////////////////////////////////////////////////////////////////

	    /**
	     * @type {GroupLayer}
	     */
	    var queryLayers = this.map_.get('queryLayers') || new _GroupLayer.GroupLayer();

	    queryLayers.getLayers().clear();

	    if (layerConfigCopy.hasOwnProperty('queryLayers') && layerConfigCopy.queryLayers instanceof Array) {
	      this.layerFactory_.addLayers(queryLayers, layerConfigCopy.queryLayers, 'queryLayer', true);

	      this.map_.set('queryLayers', queryLayers);
	      layers.getLayers().push(queryLayers);
	    }

	    this.map_.set('ready:layers', true);
	  };

	  /**
	   * @returns {GroupLayer}
	   */


	  LayerConfigurator.prototype.getBaseLayerGroup = function getBaseLayerGroup() {
	    return this.baseLayerGroup_;
	  };

	  /**
	   * @returns {LayerFactory}
	   */


	  LayerConfigurator.prototype.getFactory = function getFactory() {
	    return this.layerFactory_;
	  };

	  return LayerConfigurator;
	}();

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.GroupLayer = undefined;

	var _weakMap = __webpack_require__(155);

	var _weakMap2 = _interopRequireDefault(_weakMap);

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(120);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(121);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _openlayers = __webpack_require__(77);

	var _openlayers2 = _interopRequireDefault(_openlayers);

	var _ProvideMapMixin = __webpack_require__(160);

	var _utilities = __webpack_require__(138);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * This Class is a Wrap around {ol.layer.Group} providing some extra functionality. This class is normally used for a
	 * category of layers containing them.
	 */
	var GroupLayer = exports.GroupLayer = function (_mixin) {
	  (0, _inherits3.default)(GroupLayer, _mixin);

	  /**
	   * @param {object} [options={}]
	   */
	  function GroupLayer() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    (0, _classCallCheck3.default)(this, GroupLayer);

	    var _this = (0, _possibleConstructorReturn3.default)(this, _mixin.call(this, options));

	    var listenerKeys = new _weakMap2.default();

	    _this.getLayers().on('add', /** ol.CollectionEvent */function (e) {
	      var layer = e.element;
	      if (layer.provideMap) {
	        layer.provideMap(_this.getProvidedMap());
	      }
	      listenerKeys.set(layer, layer.on('change:visible', function () {
	        _this.dispatchEvent({
	          type: 'change:childVisible',
	          child: layer
	        });
	      }));
	    });

	    _this.getLayers().on('remove', /** ol.CollectionEvent */function (e) {
	      var layer = e.element;
	      if (layer.provideMap) {
	        layer.provideMap(null);
	      }
	      _openlayers2.default.Observable.unByKey(listenerKeys.get(layer));
	      listenerKeys.delete(layer);
	    });
	    return _this;
	  }

	  /**
	   * The provideMap methods of all contained children are called recursively
	   * @param {G4UMap} map
	   */


	  GroupLayer.prototype.provideMap = function provideMap(map) {
	    _mixin.prototype.provideMap.call(this, map);

	    this.getLayers().forEach(function (layer) {
	      if (layer.provideMap) {
	        layer.provideMap(map);
	      }
	    });
	  };

	  /**
	   * calls callback for every terminal, non-group Layer
	   * @param {Function} callback
	   */


	  GroupLayer.prototype.recursiveForEach = function recursiveForEach(callback) {
	    var _this2 = this;

	    this.getLayers().forEach(function (layer) {
	      callback(layer, _this2);
	      if (layer.recursiveForEach) {
	        layer.recursiveForEach(callback);
	      }
	    });
	  };

	  /**
	   * Attachs a listener to each layer and to each newly added listener and removes the listener if the layer gets
	   * removed.
	   * @param eventType
	   * @param listener
	   */


	  GroupLayer.prototype.forEachOn = function forEachOn(eventType, listener) {
	    var _this3 = this;

	    this.recursiveForEach(function (layer) {
	      layer.on(eventType, listener);
	      if (layer instanceof GroupLayer) {
	        _this3.getLayers().on('add', function (e) {
	          e.element.on(eventType, listener);
	        });
	        _this3.getLayers().on('remove', function (e) {
	          e.element.un(eventType, listener);
	        });
	      }
	    });
	  };

	  /**
	   * Checks how many children are visible. Doesn't check visibility of the group layer
	   * @returns {number}
	   */


	  GroupLayer.prototype.countChildrenVisible = function countChildrenVisible() {
	    var array = this.getLayersArray();
	    var count = 0;

	    for (var i = 0, ii = array.length; i < ii; i++) {
	      if (array[i] instanceof GroupLayer) {
	        count += array[i].countChildrenVisible();
	      } else if (array[i].getVisible()) {
	        count += 1;
	      }
	    }
	    return count;
	  };

	  GroupLayer.prototype.countChildren = function countChildren() {
	    var array = this.getLayersArray();
	    var count = 0;

	    for (var i = 0, ii = array.length; i < ii; i++) {
	      if (array[i] instanceof GroupLayer) {
	        count += array[i].countChildren();
	      } else {
	        count += 1;
	      }
	    }
	    return count;
	  };

	  /**
	   * Returns the layers inside as an array.
	   * @returns {ol.layer.Base[]}
	   */


	  GroupLayer.prototype.getLayersArray = function getLayersArray() {
	    return this.getLayers().getArray();
	  };

	  /**
	   * Returns the number of direct child layers
	   * @returns {number}
	   */


	  GroupLayer.prototype.getLength = function getLength() {
	    return this.getLayers().getLength();
	  };

	  /**
	   * checks if the given layer is a child of the grouplayer
	   * @param {ol.layer.Base} layer
	   * @returns {boolean}
	   */


	  GroupLayer.prototype.isParentOf = function isParentOf(layer) {
	    var found = false;
	    this.recursiveForEach(function (childLayer) {
	      if (layer === childLayer) {
	        found = true;
	      }
	    });
	    return found;
	  };

	  /**
	   * Returns all ids of all contained layers and its own.
	   * @returns {number[]}
	   */


	  GroupLayer.prototype.getIds = function getIds() {
	    var ids = [this.get('id')];

	    var array = this.getLayersArray();

	    for (var i = 0, ii = array.length; i < ii; i++) {
	      if (array[i].getIds) {
	        ids = ids.concat(array[i].getIds());
	      } else {
	        ids.push(array[i].get('id'));
	      }
	    }

	    return ids;
	  };

	  /**
	   * Returns all attributions of all visible layers.
	   * @returns {number[]}
	   */


	  GroupLayer.prototype.getAttributions = function getAttributions() {
	    var attributions = [];

	    this.recursiveForEach(function (layer) {
	      if (layer.getVisible()) {
	        if (layer.getSource) {
	          var atts = layer.getSource().getAttributions();
	          if (atts) {
	            attributions = attributions.concat(atts);
	          }
	        }
	      }
	    });

	    return attributions;
	  };

	  /**
	   * Remove layer by id
	   * @param {string|number} id
	   */


	  GroupLayer.prototype.removeLayerById = function removeLayerById(id) {
	    var layers = this.getLayers();
	    for (var i = 0; i < layers.getLength(); i++) {
	      if (layers.item(i).get('id') === id) {
	        return layers.removeAt(i);
	      } else if (layers.item(i).removeLayerById) {
	        var res = layers.item(i).removeLayerById(id);
	        if (res) {
	          return res;
	        }
	      }
	    }
	  };

	  /**
	   * Get layer by id
	   * @param {string|number} id
	   */


	  GroupLayer.prototype.getLayerById = function getLayerById(id) {
	    var layers = this.getLayers();
	    for (var i = 0; i < layers.getLength(); i++) {
	      if (layers.item(i).get('id') === id) {
	        return layers.item(i);
	      } else if (layers.item(i).getLayerById) {
	        var res = layers.item(i).getLayerById(id);
	        if (res) {
	          return res;
	        }
	      }
	    }
	  };

	  /**
	   * removes layer
	   * @param {ol.layer.Base} layer
	   */


	  GroupLayer.prototype.removeLayer = function removeLayer(layer) {
	    var found = this.getLayers().remove(layer);
	    if (!found) {
	      this.getLayers().forEach(function (subLayer) {
	        if (!found && subLayer.removeLayer) {
	          found = subLayer.removeLayer(layer);
	        }
	      });
	    }
	    return found;
	  };

	  /**
	   * gives an object with ids as keys and visibility as value
	   * @returns {Object.<string|number,boolean>}
	   */


	  GroupLayer.prototype.getIdsVisibilities = function getIdsVisibilities() {
	    var visibilities = {};
	    this.recursiveForEach(function (layer) {
	      if (layer.get('id')) {
	        visibilities[layer.get('id')] = layer.getVisible();
	      }
	    });
	    return visibilities;
	  };

	  /**
	   * Sets the visibility of the layers to the given visibility
	   * @param {Object.<string|number,boolean>} visibilities
	   */


	  GroupLayer.prototype.setIdsVisibilities = function setIdsVisibilities(visibilities) {
	    this.recursiveForEach(function (layer) {
	      if (layer.get('id')) {
	        layer.setVisible(visibilities[layer.get('id')]);
	      }
	    });
	  };

	  return GroupLayer;
	}((0, _utilities.mixin)(_openlayers2.default.layer.Group, _ProvideMapMixin.ProvideMapMixin));

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(156), __esModule: true };

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(14);
	__webpack_require__(59);
	__webpack_require__(157);
	module.exports = __webpack_require__(23).WeakMap;

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var each         = __webpack_require__(113)(0)
	  , redefine     = __webpack_require__(36)
	  , meta         = __webpack_require__(89)
	  , assign       = __webpack_require__(158)
	  , weak         = __webpack_require__(159)
	  , isObject     = __webpack_require__(29)
	  , getWeak      = meta.getWeak
	  , isExtensible = Object.isExtensible
	  , uncaughtFrozenStore = weak.ufstore
	  , tmp          = {}
	  , InternalMap;

	var wrapper = function(get){
	  return function WeakMap(){
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	};

	var methods = {
	  // 23.3.3.3 WeakMap.prototype.get(key)
	  get: function get(key){
	    if(isObject(key)){
	      var data = getWeak(key);
	      if(data === true)return uncaughtFrozenStore(this).get(key);
	      return data ? data[this._i] : undefined;
	    }
	  },
	  // 23.3.3.5 WeakMap.prototype.set(key, value)
	  set: function set(key, value){
	    return weak.def(this, key, value);
	  }
	};

	// 23.3 WeakMap Objects
	var $WeakMap = module.exports = __webpack_require__(112)('WeakMap', wrapper, methods, weak, true, true);

	// IE11 WeakMap frozen keys fix
	if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
	  InternalMap = weak.getConstructor(wrapper);
	  assign(InternalMap.prototype, methods);
	  meta.NEED = true;
	  each(['delete', 'has', 'get', 'set'], function(key){
	    var proto  = $WeakMap.prototype
	      , method = proto[key];
	    redefine(proto, key, function(a, b){
	      // store frozen objects on internal weakmap shim
	      if(isObject(a) && !isExtensible(a)){
	        if(!this._f)this._f = new InternalMap;
	        var result = this._f[key](a, b);
	        return key == 'set' ? this : result;
	      // store all the rest on native weakmap
	      } return method.call(this, a, b);
	    });
	  });
	}

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(42)
	  , gOPS     = __webpack_require__(93)
	  , pIE      = __webpack_require__(94)
	  , toObject = __webpack_require__(58)
	  , IObject  = __webpack_require__(45)
	  , $assign  = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(32)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var redefineAll       = __webpack_require__(74)
	  , getWeak           = __webpack_require__(89).getWeak
	  , anObject          = __webpack_require__(28)
	  , isObject          = __webpack_require__(29)
	  , anInstance        = __webpack_require__(65)
	  , forOf             = __webpack_require__(66)
	  , createArrayMethod = __webpack_require__(113)
	  , $has              = __webpack_require__(37)
	  , arrayFind         = createArrayMethod(5)
	  , arrayFindIndex    = createArrayMethod(6)
	  , id                = 0;

	// fallback for uncaught frozen keys
	var uncaughtFrozenStore = function(that){
	  return that._l || (that._l = new UncaughtFrozenStore);
	};
	var UncaughtFrozenStore = function(){
	  this.a = [];
	};
	var findUncaughtFrozen = function(store, key){
	  return arrayFind(store.a, function(it){
	    return it[0] === key;
	  });
	};
	UncaughtFrozenStore.prototype = {
	  get: function(key){
	    var entry = findUncaughtFrozen(this, key);
	    if(entry)return entry[1];
	  },
	  has: function(key){
	    return !!findUncaughtFrozen(this, key);
	  },
	  set: function(key, value){
	    var entry = findUncaughtFrozen(this, key);
	    if(entry)entry[1] = value;
	    else this.a.push([key, value]);
	  },
	  'delete': function(key){
	    var index = arrayFindIndex(this.a, function(it){
	      return it[0] === key;
	    });
	    if(~index)this.a.splice(index, 1);
	    return !!~index;
	  }
	};

	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      anInstance(that, C, NAME, '_i');
	      that._i = id++;      // collection id
	      that._l = undefined; // leak store for uncaught frozen objects
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.3.3.2 WeakMap.prototype.delete(key)
	      // 23.4.3.3 WeakSet.prototype.delete(value)
	      'delete': function(key){
	        if(!isObject(key))return false;
	        var data = getWeak(key);
	        if(data === true)return uncaughtFrozenStore(this)['delete'](key);
	        return data && $has(data, this._i) && delete data[this._i];
	      },
	      // 23.3.3.4 WeakMap.prototype.has(key)
	      // 23.4.3.4 WeakSet.prototype.has(value)
	      has: function has(key){
	        if(!isObject(key))return false;
	        var data = getWeak(key);
	        if(data === true)return uncaughtFrozenStore(this).has(key);
	        return data && $has(data, this._i);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var data = getWeak(anObject(key), true);
	    if(data === true)uncaughtFrozenStore(that).set(key, value);
	    else data[that._i] = value;
	    return that;
	  },
	  ufstore: uncaughtFrozenStore
	};

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ProvideMapMixin = undefined;

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ProvideMapMixin = exports.ProvideMapMixin = function () {
	  function ProvideMapMixin() {
	    (0, _classCallCheck3.default)(this, ProvideMapMixin);
	  }

	  /**
	   * @param {G4UMap} map
	   */
	  ProvideMapMixin.prototype.provideMap = function provideMap(map) {
	    /**
	     * @type {G4UMap|undefined}
	     * @private
	     */
	    this.providedMap_ = map;
	  };

	  /**
	   * @returns {G4UMap|undefined}
	   */


	  ProvideMapMixin.prototype.getProvidedMap = function getProvidedMap() {
	    return this.providedMap_;
	  };

	  return ProvideMapMixin;
	}();

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.LayerFactory = exports.LayerType = exports.SuperType = undefined;

	var _typeof2 = __webpack_require__(82);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _openlayers = __webpack_require__(77);

	var _openlayers2 = _interopRequireDefault(_openlayers);

	var _ImageLayer = __webpack_require__(162);

	var _EmptyBaseLayer = __webpack_require__(165);

	var _BaseLayerTile = __webpack_require__(166);

	var _LayerTile = __webpack_require__(167);

	var _GroupLayer = __webpack_require__(154);

	var _VectorLayer = __webpack_require__(168);

	var _SourceServerVector = __webpack_require__(169);

	var _QuerySource = __webpack_require__(170);

	var _utilitiesObject = __webpack_require__(137);

	var _utilities = __webpack_require__(138);

	var _Debug = __webpack_require__(151);

	var _ImageWMSSource = __webpack_require__(171);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SuperType = exports.SuperType = {
	  BASELAYER: 'baseLayer',
	  FEATURELAYER: 'featureLayer',
	  QUERYLAYER: 'queryLayer'
	};

	var LayerType = exports.LayerType = {
	  CATEGORY: 'Category',
	  GEOJSON: 'GeoJSON',
	  KML: 'KML',
	  WMS: 'WMS',
	  TILEWMS: 'TileWMS',
	  OSM: 'OSM',
	  INTERN: 'Intern',
	  EMPTY: 'Empty'
	};

	/**
	 * A config describing a layer
	 * @public
	 * @typedef {Object} g4uLayerOptions
	 * @property {string} type the LayerType
	 * @property {string|number} id unique in the whole config
	 * @property {string} title
	 * @property {SourceConfig} source
	 * @property {Boolean} available
	 * @property {Boolean} availableMobile overwrites available in mobile mode
	 * @property {Boolean} visible
	 * @property {Boolean} alwaysVisible overwrites visible, available and mobileAvailable
	 * @property {StyleLike} [style]
	 */

	/**
	 * A config describing the source of a layer
	 * @public
	 * @typedef {Object} SourceConfig
	 * @property {Localizable} [attribution]
	 * @property {ol.Attribution[]} [attributions] will be setted automatically.
	 * @property {null} [crossOrigin] will be setted automatically.
	 * @property {string} loadingStrategy
	 * @property {string} url
	 * @property {Boolean} [useProxy=false]
	 * @property {string} [proxy]
	 */

	/**
	 * @typedef {Object} FeatureConfig
	 * @public
	 * @property {string|number} id
	 * @property {StyleLike} style
	 * @property {string} geometryWKT
	 * @property {ol.geom.Geometry} geometry
	 */

	/**
	 * This class constructs a layer according to the given {{LayerOptions}}
	 */

	var LayerFactory = exports.LayerFactory = function () {
	  /**
	   * @param {G4UMap} map
	   */
	  function LayerFactory(map) {
	    (0, _classCallCheck3.default)(this, LayerFactory);

	    /**
	     * @type {G4UMap}
	     * @private
	     */
	    this.map_ = map;
	  }

	  /**
	   * @param {ol.ProjectionLike} mapConfigProjection
	   */


	  LayerFactory.prototype.setMapConfigProjection = function setMapConfigProjection(mapConfigProjection) {
	    this.mapProjection = mapConfigProjection;
	  };

	  /**
	   * @returns {ol.ProjectionLike}
	   */


	  LayerFactory.prototype.getMapProjection = function getMapProjection() {
	    return this.mapProjection;
	  };

	  /**
	   * Adds multiple layers according to their configs to the given layerGroup
	   * @param {LayerGroup} layerGroup
	   * @param {g4uLayerOptions[]} configs
	   * @param {string} superType
	   * @param {Boolean} skipIdCheck
	   * @returns {ol.Layer.Base[]}
	   */


	  LayerFactory.prototype.addLayers = function addLayers(layerGroup, configs, superType, skipIdCheck) {
	    var _this = this;

	    return configs.map(function (config) {
	      return _this.addLayer(layerGroup, config, superType, skipIdCheck);
	    });
	  };

	  /**
	   * Adds a layer defined by a given config to a given layerGroup
	   * @param {LayerGroup} layerGroup
	   * @param {g4uLayerOptions} options
	   * @param {string} superType
	   * @param {Boolean} skipIdCheck
	   * @returns {ol.layer.Base}
	   */


	  LayerFactory.prototype.addLayer = function addLayer(layerGroup, options, superType, skipIdCheck) {
	    var layer = void 0;
	    /**
	     * @type {g4uLayerOptions}
	     */
	    var optionsCopy = (0, _utilitiesObject.copyDeep)(options);

	    if (skipIdCheck || this.configureLayerIsIdOk_(optionsCopy.id)) {
	      // loading strategy

	      if (!optionsCopy.type) {
	        throw new Error('Layer needs a type. Layer id: ' + optionsCopy.id + '. Layer title: ' + optionsCopy.title + '.');
	      }

	      // availability
	      this.configureLayerAvailability_(optionsCopy);

	      // the title/name of the layer
	      this.configureLayerTitle_(optionsCopy);

	      if (superType === SuperType.BASELAYER) {
	        optionsCopy.groupLayer = this.map_.get('layerConfigurator').getBaseLayerGroup();
	      }

	      if (optionsCopy.source) {
	        this.configureLayerSourceAttribution_(optionsCopy.source);

	        if (optionsCopy.type !== LayerType.INTERN) {
	          // the url of the source
	          this.configureLayerSourceURL_(optionsCopy.source);
	        }
	      }

	      // visibility
	      this.configureLayerVisibility_(optionsCopy);

	      var style = (0, _utilitiesObject.take)(optionsCopy, 'style');

	      layer = this.createLayer(optionsCopy.type, optionsCopy, superType, skipIdCheck);

	      var forEachLayer = function forEachLayer(layer) {
	        layerGroup.getLayers().push(layer);
	      };

	      if (layer instanceof _openlayers2.default.Collection) {
	        layer.forEach(forEachLayer);
	      } else {
	        // styling
	        if (style) {
	          this.map_.get('styling').styleLayer(layer, style);
	        }

	        forEachLayer(layer);
	      }
	    }

	    return layer;
	  };

	  /**
	   * @param {string} type
	   * @param {string} superType
	   */


	  LayerFactory.prototype.superTypeNotSupported = function superTypeNotSupported(type, superType) {
	    throw new Error(type + ' is not configured for superType \'' + superType + '\'');
	  };

	  /**
	   * Creates a layer or a collection of layers from the config
	   * @param {string} layerType
	   * @param {g4uLayerOptions} optionsCopy
	   * @param {string} superType
	   * @param {Boolean} skipIdCheck
	   * @returns {ol.layer.Layer|ol.Collection.<ol.layer.Layer>}
	   */


	  LayerFactory.prototype.createLayer = function createLayer(layerType, optionsCopy, superType, skipIdCheck) {
	    var _this2 = this;

	    if (superType === SuperType.QUERYLAYER) {
	      if (!optionsCopy.hasOwnProperty('apiKey')) {
	        _Debug.Debug.error('Each query layer needs to have an apiKey.');
	      }
	      optionsCopy.source.projection = this.mapProjection;
	    }

	    var layer = void 0;

	    var _ret = function () {
	      switch (layerType) {
	        case LayerType.CATEGORY:

	          var layerConfigs = (0, _utilitiesObject.take)(optionsCopy, 'layers');

	          layer = new _GroupLayer.GroupLayer(optionsCopy);

	          _this2.addLayers(layer, layerConfigs, superType, skipIdCheck);

	          // availability
	          var childrenAvailable = false;
	          layer.getLayers().forEach(function (layer) {
	            childrenAvailable = childrenAvailable || layer.get('available');
	          });

	          var childrenCount = layer.getLayers().getLength();

	          if (childrenAvailable !== false) {
	            if (layer.get('available') !== false && childrenCount > 0) {
	              // category is shown

	              if (childrenAvailable === true) {
	                layer.set('available', true);
	              }

	              layer.setVisible(true);

	              if (superType === SuperType.BASELAYER) {
	                layer.set('activateChildren', false);
	              }

	              return {
	                v: layer
	              };
	            } else if (childrenAvailable === true) {
	              // only children are shown
	              return {
	                v: layer.getLayers()
	              };
	            }
	            // else neither are shown
	          }
	          break;
	        case LayerType.EMPTY:
	          if (superType === SuperType.BASELAYER) {
	            layer = new _EmptyBaseLayer.EmptyBaseLayer(optionsCopy);
	          } else {
	            _this2.superTypeNotSupported(layerType, superType);
	          }
	          break;
	        case LayerType.OSM:

	          optionsCopy.source = new _openlayers2.default.source.OSM(optionsCopy.source);

	          if (superType === SuperType.BASELAYER) {
	            layer = new _BaseLayerTile.BaseLayerTile(optionsCopy);
	          } else {
	            layer = new _LayerTile.LayerTile(optionsCopy);
	          }
	          break;
	        case LayerType.WMS:

	          if (optionsCopy.categoryButtons) {
	            optionsCopy.source.params.LAYERS = [];
	          }

	          optionsCopy.source = new _ImageWMSSource.ImageWMSSource(optionsCopy.source);

	          if (superType === SuperType.BASELAYER) {
	            layer = new _ImageLayer.BaseLayerImage(optionsCopy);
	          } else if (superType === SuperType.QUERYLAYER) {
	            _this2.superTypeNotSupported(layerType, superType);
	          } else {
	            layer = new _ImageLayer.ImageLayer(optionsCopy);
	          }

	          if (layer.getSource().hasFeatureInfo()) {
	            _this2.map_.asSoonAs('ready:ui', true, function () {
	              if (_this2.map_.get('showWMSFeatureInfo')) {
	                _this2.map_.get('showWMSFeatureInfo').addLayer(layer);
	              }
	            });
	          }

	          break;
	        case LayerType.TILEWMS:

	          if (optionsCopy.source.tileSize) {
	            optionsCopy.source.tileGrid = _openlayers2.default.tilegrid.createXYZ({ tileSize: optionsCopy.source.tileSize });
	            delete optionsCopy.source.tileSize;
	          }

	          optionsCopy.source = new _ImageWMSSource.TileWMSSource(optionsCopy.source);

	          if (superType === SuperType.BASELAYER) {
	            layer = new _BaseLayerTile.BaseLayerTile(optionsCopy);
	          } else if (superType === SuperType.QUERYLAYER) {
	            _this2.superTypeNotSupported(layerType, superType);
	          } else {
	            layer = new _LayerTile.LayerTile(optionsCopy);
	          }

	          if (layer.getSource().hasFeatureInfo()) {
	            _this2.map_.asSoonAs('ready:ui', true, function () {
	              if (_this2.map_.get('showWMSFeatureInfo')) {
	                _this2.map_.get('showWMSFeatureInfo').addLayer(layer);
	              }
	            });
	          }

	          break;
	        case LayerType.GEOJSON:
	          _this2.configureLayerSourceLoadingStrategy_(optionsCopy.source);
	          optionsCopy.source.defaultStyle = _this2.map_.get('styling').getStyle(optionsCopy.style || '#defaultStyle');

	          optionsCopy.source.type = 'GeoJSON';

	          optionsCopy.source.bboxProjection = optionsCopy.source.bboxProjection || _this2.map_.get('interfaceProjection');

	          if (superType === SuperType.QUERYLAYER) {
	            optionsCopy.source = new _QuerySource.QuerySource(optionsCopy.source);
	          } else {
	            optionsCopy.source = new _SourceServerVector.SourceServerVector(optionsCopy.source);
	          }
	          layer = new _VectorLayer.VectorLayer(optionsCopy);
	          break;
	        case LayerType.KML:

	          _this2.configureLayerSourceLoadingStrategy_(optionsCopy.source);

	          optionsCopy.source.defaultStyle = _this2.map_.get('styling').getStyle(optionsCopy.style || '#defaultStyle');

	          optionsCopy.source.type = 'KML';

	          optionsCopy.source.bboxProjection = optionsCopy.source.bboxProjection || _this2.map_.get('interfaceProjection');

	          if (superType === SuperType.QUERYLAYER) {
	            optionsCopy.source = new _QuerySource.QuerySource(optionsCopy.source);
	          } else {
	            optionsCopy.source = new _SourceServerVector.SourceServerVector(optionsCopy.source);
	          }

	          layer = new _VectorLayer.VectorLayer(optionsCopy);
	          break;
	        case LayerType.INTERN:

	          if (optionsCopy.source.hasOwnProperty('features')) {
	            for (var _i = 0; _i < optionsCopy.source.features.length; _i++) {
	              optionsCopy.source.features[_i] = _this2.createFeature(optionsCopy.source.features[_i]);
	            }
	          }

	          optionsCopy.source = new _openlayers2.default.source.Vector(optionsCopy.source);

	          if (superType === SuperType.QUERYLAYER) {
	            _this2.superTypeNotSupported(layerType, superType);
	          } else {
	            return {
	              v: new _VectorLayer.VectorLayer(optionsCopy)
	            };
	          }
	          break;
	      }
	    }();

	    if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
	    var modules = this.map_.getModules();

	    for (var i = 0, ii = modules.length; i < ii && layer === undefined; i++) {
	      layer = modules[i].createLayer(optionsCopy.type, optionsCopy, superType, skipIdCheck);
	    }

	    if (!layer) {
	      throw new Error('layer with type \'' + optionsCopy.type + '\' could not be created.');
	    }

	    // if layer is a baselayer, check for mapProjection
	    if (superType === SuperType.BASELAYER && optionsCopy.source) {
	      if (layer.getSource().getProjection()) {
	        if (!this.mapProjection) {
	          this.mapProjection = layer.getSource().getProjection();
	        } else if (this.mapProjection && this.mapProjection !== layer.getSource().getProjection()) {
	          throw new Error('The baseLayers are not in mapProjection or a baseLayers has a different projection than' + ' another! This is not supported.');
	        }
	      }
	    } else if (superType === SuperType.QUERYLAYER) {
	      this.map_.get('urlApi').addApiLayer(layer, optionsCopy.apiKey);
	    }

	    return layer;
	  };

	  /**
	   * A function that checks if a layer id is setted and not a duplicate of another.
	   * Throws an error if this is the case.
	   * @param {string|number} id
	   * @private
	   */


	  LayerFactory.prototype.configureLayerIsIdOk_ = function configureLayerIsIdOk_(id) {
	    /**
	     * @type {string[]|number[]}
	     */
	    var layerIds = this.map_.get('layerIds');

	    if (id === 0 || id && (typeof id === 'string' || !isNaN(id))) {
	      for (var j = 0, jj = layerIds.length; j < jj; j++) {
	        if (id === layerIds[j]) {
	          _Debug.Debug.error('Each layer needs a unique id! Otherwise the layer won\'t be shown. Layer id: ' + id);
	          return false;
	        }
	      }
	      layerIds.push(id);
	      this.map_.set('layerIds', layerIds);
	      return true;
	    } else {
	      _Debug.Debug.error('Each layer needs a unique id! Otherwise the layer won\'t be shown. Layer id: ' + id);
	      return false;
	    }
	  };

	  /**
	   * @param {g4uLayerOptions} config
	   * @returns {g4uLayerOptions}
	   * @private
	   */


	  LayerFactory.prototype.configureLayerAvailability_ = function configureLayerAvailability_(config) {
	    // if available is set to false explicitely, the layer won't be available
	    config.available = config.available !== false;

	    if (!config.alwaysVisible) {
	      config.available = config.hasOwnProperty('availableMobile') ? config.availableMobile : config.available;
	      if (this.map_.get('ignoreLayerAvailability')) {
	        config.available = true;
	      }
	    }
	    return config;
	  };

	  /**
	   * @param {SourceConfig} sourceConfig
	   * @returns {SourceConfig}
	   * @private
	   */


	  LayerFactory.prototype.configureLayerSourceAttribution_ = function configureLayerSourceAttribution_(sourceConfig) {
	    if ((0, _utilities.checkFor)(sourceConfig, 'attribution')) {
	      sourceConfig.attributions = [new _openlayers2.default.Attribution({
	        html: this.map_.get('localiser').selectL10N(sourceConfig.attribution)
	      })];
	    }
	    return sourceConfig;
	  };

	  /**
	   * @param {SourceConfig} sourceConfig
	   * @returns {SourceConfig}
	   * @private
	   */


	  LayerFactory.prototype.configureLayerSourceLoadingStrategy_ = function configureLayerSourceLoadingStrategy_(sourceConfig) {
	    sourceConfig.loadingStrategy = sourceConfig.hasOwnProperty('loadingStrategy') ? sourceConfig.loadingStrategy : this.map_.get('loadingStrategy');
	    return sourceConfig;
	  };

	  /**
	   * @param {g4uLayerOptions} config
	   * @returns {g4uLayerOptions}
	   * @private
	   */


	  LayerFactory.prototype.configureLayerTitle_ = function configureLayerTitle_(config) {
	    if (!config.hasOwnProperty('title')) {
	      config.title = 'No title given';
	    } else {
	      config.title = this.map_.get('localiser').selectL10N(config.title);
	    }
	    return config;
	  };

	  /**
	   * @param {SourceConfig} sourceConfig
	   * @returns {SourceConfig}
	   * @private
	   */


	  LayerFactory.prototype.configureLayerSourceURL_ = function configureLayerSourceURL_(sourceConfig) {
	    sourceConfig.url = this.map_.get('localiser').selectL10N(sourceConfig.url);

	    sourceConfig.originalUrl = sourceConfig.url;

	    sourceConfig.crossOrigin = null; // this strangely enables crossOrigin requests

	    var useProxy = sourceConfig.useProxy === true || sourceConfig.useProxy === undefined && !!sourceConfig.proxy;

	    if (useProxy) {
	      sourceConfig.proxy = sourceConfig.proxy || this.map_.get('proxy');

	      if (!sourceConfig.proxy) {
	        throw new Error('No proxy configured. Either configure a local or global proxy if you want to use the option' + ' useProxy.');
	      }

	      sourceConfig.url = (0, _utilities.addProxy)(sourceConfig.url, sourceConfig.proxy);
	    }

	    return sourceConfig;
	  };

	  /**
	   * @param {g4uLayerOptions} config
	   * @returns {g4uLayerOptions}
	   * @private
	   */


	  LayerFactory.prototype.configureLayerVisibility_ = function configureLayerVisibility_(config) {
	    if (config.alwaysVisible === true) {
	      config.visible = true;
	    } else {
	      config.visible = config.visible === true;
	    }

	    return config;
	  };

	  /**
	   * @param {FeatureConfig} featureConf
	   * @returns {ol.Feature}
	   */


	  LayerFactory.prototype.createFeature = function createFeature(featureConf) {
	    /**
	     * @type {FeatureConfig}
	     */
	    var featureConfCopy = (0, _utilitiesObject.copyDeep)(featureConf);

	    var id = (0, _utilitiesObject.take)(featureConfCopy, 'id');

	    var style = (0, _utilitiesObject.take)(featureConfCopy, 'style');

	    var format = new _openlayers2.default.format.WKT();
	    var wkt = (0, _utilitiesObject.take)(featureConfCopy, 'geometryWKT') || (0, _utilitiesObject.take)(featureConfCopy, 'geographyWKT');
	    featureConfCopy.geometry = format.readGeometry(wkt).transform(this.map_.get('interfaceProjection'), this.map_.get('mapProjection'));

	    var feature = new _openlayers2.default.Feature(featureConfCopy);

	    if (style) {
	      this.map_.get('styling').styleFeature(feature, style);
	    }

	    if (id) {
	      feature.setId(featureConfCopy.id);
	    }

	    return feature;
	  };

	  return LayerFactory;
	}();

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.BaseLayerImage = exports.ImageLayer = undefined;

	var _openlayers = __webpack_require__(77);

	var _openlayers2 = _interopRequireDefault(_openlayers);

	var _LayerLoadProcessCountMixin = __webpack_require__(163);

	var _BaseLayerMixin = __webpack_require__(164);

	var _utilities = __webpack_require__(138);

	var _ProvideMapMixin = __webpack_require__(160);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ImageLayer = exports.ImageLayer = (0, _utilities.mixin)((0, _utilities.mixin)(_openlayers2.default.layer.Image, _ProvideMapMixin.ProvideMapMixin), _LayerLoadProcessCountMixin.LayerLoadProcessCountMixin);

	var BaseLayerImage = exports.BaseLayerImage = (0, _utilities.mixin)(ImageLayer, _BaseLayerMixin.BaseLayerMixin);

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.LayerLoadProcessCountMixin = undefined;

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * A mixin to keep track the amount of load processes a source is currently waiting for
	 */
	var LayerLoadProcessCountMixin = exports.LayerLoadProcessCountMixin = function () {
	  function LayerLoadProcessCountMixin() {
	    (0, _classCallCheck3.default)(this, LayerLoadProcessCountMixin);
	  }

	  LayerLoadProcessCountMixin.prototype.initialize = function initialize() {
	    var _this = this;

	    /**
	     * @type {number}
	     * @private
	     */
	    this.loadProcessCount_ = 0;

	    this.getSource().on(['vectorloadstart', 'tileloadstart', 'imageloadstart'], function () {
	      _this.loadProcessCount_ += 1;
	    });

	    this.getSource().on(['vectorloadend', 'vectorloaderror', 'tileloadend', 'tileloaderror', 'imageloadend', 'imageloaderror'], function () {
	      _this.loadProcessCount_ -= 1;
	    });
	  };

	  /**
	   * @returns {number}
	   */


	  LayerLoadProcessCountMixin.prototype.getLoadProcessCount = function getLoadProcessCount() {
	    return this.loadProcessCount_;
	  };

	  /**
	   * Resets load process count to 0
	   */


	  LayerLoadProcessCountMixin.prototype.resetLoadProcessCount = function resetLoadProcessCount() {
	    this.loadProcessCount_ = 0;
	  };

	  return LayerLoadProcessCountMixin;
	}();

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.BaseLayerMixin = undefined;

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _GroupLayer = __webpack_require__(154);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @typedef {object} BaseLayerMixinOptions
	 * @property {GroupLayer} groupLayer the group this baseLayer belongs to
	 */

	/**
	 * This mixin provides baselayer functionality to any layer
	 */
	var BaseLayerMixin = exports.BaseLayerMixin = function () {
	  function BaseLayerMixin() {
	    (0, _classCallCheck3.default)(this, BaseLayerMixin);
	  }

	  /**
	   * @param {BaseLayerMixinOptions} options
	   */
	  BaseLayerMixin.prototype.initialize = function initialize(options) {
	    /**
	     * @type {GroupLayer}
	     * @private
	     */
	    this.groupLayer_ = options.groupLayer;

	    this.on('change:available', this.onChangeAvailable.bind(this));
	    this.on('change:visible', this.onChangeVisible.bind(this));

	    this.isBaseLayer = true;
	  };

	  /**
	   * This method sets the next available layer visible if this layer gets unavailable and was the visible baselayer
	   */


	  BaseLayerMixin.prototype.onChangeAvailable = function onChangeAvailable() {
	    if (!this.get('available') && this.getVisible()) {
	      this.groupLayer_.recursiveForEach(function (layer) {
	        if (!(layer instanceof _GroupLayer.GroupLayer) && layer.get('available')) {
	          layer.setVisible(true);
	        }
	      });
	    }
	  };

	  /**
	   * This method sets all other baselayers not visible if set true.
	   */


	  BaseLayerMixin.prototype.onChangeVisible = function onChangeVisible() {
	    var _this = this;

	    if (this.getVisible()) {
	      this.groupLayer_.recursiveForEach(function (layer) {
	        if (!(layer instanceof _GroupLayer.GroupLayer) && layer !== _this) {
	          layer.setVisible(false);
	        }
	      });
	    } else {
	      var found = false;
	      this.groupLayer_.recursiveForEach(function (layer) {
	        if (!(layer instanceof _GroupLayer.GroupLayer) && layer.getVisible()) {
	          found = true;
	        }
	      });

	      if (!found) {
	        this.setVisible(true);
	      }
	    }
	  };

	  return BaseLayerMixin;
	}();

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.EmptyBaseLayer = undefined;

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(120);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(121);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _openlayers = __webpack_require__(77);

	var _openlayers2 = _interopRequireDefault(_openlayers);

	var _ImageLayer = __webpack_require__(162);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var EmptyBaseLayer = exports.EmptyBaseLayer = function (_BaseLayerImage) {
	  (0, _inherits3.default)(EmptyBaseLayer, _BaseLayerImage);

	  /**
	   * @param {object} [options={}]
	   */
	  function EmptyBaseLayer() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    (0, _classCallCheck3.default)(this, EmptyBaseLayer);

	    options.source = new _openlayers2.default.source.ImageCanvas({
	      state: 'ready',
	      canvasFunction: function canvasFunction() {} // not loading any canvas
	    });
	    return (0, _possibleConstructorReturn3.default)(this, _BaseLayerImage.call(this, options));
	  }

	  return EmptyBaseLayer;
	}(_ImageLayer.BaseLayerImage);

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.BaseLayerTile = undefined;

	var _LayerTile = __webpack_require__(167);

	var _BaseLayerMixin = __webpack_require__(164);

	var _utilities = __webpack_require__(138);

	var BaseLayerTile = exports.BaseLayerTile = (0, _utilities.mixin)(_LayerTile.LayerTile, _BaseLayerMixin.BaseLayerMixin);

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.LayerTile = undefined;

	var _openlayers = __webpack_require__(77);

	var _openlayers2 = _interopRequireDefault(_openlayers);

	var _LayerLoadProcessCountMixin = __webpack_require__(163);

	var _utilities = __webpack_require__(138);

	var _ProvideMapMixin = __webpack_require__(160);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var LayerTile = exports.LayerTile = (0, _utilities.mixin)((0, _utilities.mixin)(_openlayers2.default.layer.Tile, _ProvideMapMixin.ProvideMapMixin), _LayerLoadProcessCountMixin.LayerLoadProcessCountMixin);

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.VectorLayer = undefined;

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(120);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(121);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _openlayers = __webpack_require__(77);

	var _openlayers2 = _interopRequireDefault(_openlayers);

	var _LayerLoadProcessCountMixin = __webpack_require__(163);

	var _utilities = __webpack_require__(138);

	var _ProvideMapMixin = __webpack_require__(160);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @typedef {object} VectorLayerOptions
	 * @property {string[]} [mutators=[]] list of mutators (changes featurepopup content) to use for this layer.
	 */

	var VectorLayer = exports.VectorLayer = function (_mixin) {
	  (0, _inherits3.default)(VectorLayer, _mixin);

	  function VectorLayer() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    (0, _classCallCheck3.default)(this, VectorLayer);

	    var _this = (0, _possibleConstructorReturn3.default)(this, _mixin.call(this, options));

	    _this.on('change:visible', function () {
	      if (_this.getSource().setRefreshing) {
	        _this.getSource().setRefreshing(_this.getVisible());
	      }
	    });

	    // saving text mutators
	    _this.set('mutators', options.mutators || []);
	    return _this;
	  }

	  return VectorLayer;
	}((0, _utilities.mixin)((0, _utilities.mixin)(_openlayers2.default.layer.Vector, _ProvideMapMixin.ProvideMapMixin), _LayerLoadProcessCountMixin.LayerLoadProcessCountMixin));

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SourceServerVector = undefined;

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(120);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(121);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _openlayers = __webpack_require__(77);

	var _openlayers2 = _interopRequireDefault(_openlayers);

	var _jquery = __webpack_require__(78);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _utilities = __webpack_require__(138);

	var _utilitiesObject = __webpack_require__(137);

	var _Debug = __webpack_require__(151);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @typedef {olx.source.VectorOptions} SourceServerVectorOptions
	 * @property {string} type the format to use
	 * @property {string} url
	 * @property {boolean} [useProxy=false]
	 * @property {string} [proxy] If no proxy is set the proxy of the map is used.
	 * @property {StyleLike} [defaultStyle] a default style to fallback to
	 * @property {boolean} [extractStyles=true] if styles should get extracted from the KML
	 * @property {string} [loadingStrategy='ALL'] Either 'BBOX' or 'ALL' (Synonym: 'FIXED').
	 *    If BBOX the given url has to contain the parameters {bboxleft}, {bboxbottom}, {bboxright}, {bboxtop}.
	 * @property {number} [bboxRatio=1] If set the bbox loading strategy will increase the load extent by this factor
	 * @property {ol.ProjectionLike} [bboxProjection] coordinates will be inserted into the url in this format. defaults to
	 *    the interfaceProjection
	 * @property {boolean} [cache=] true, false for dataType 'script' and 'jsonp'
	 * @property {number} [refresh] if set the layer will refresh itself in the specified time (in ms)
	 */

	/**
	 * A custom Source class handling Vector Sources.
	 *
	 * Let you set the loading loadingStrategy, if a proxy is used and you should specify in which format it comes in.
	 *
	 * **IMPORTANT:** You can't set the projection of the source! This is **always** determined by the data received. If you
	 * set projection here you force the source to assume that this is the projection of the view.
	 *
	 * This class defines a custom loader function which makes it possible to use different loading strategies.
	 */
	var SourceServerVector = exports.SourceServerVector = function (_ol$source$Vector) {
	  (0, _inherits3.default)(SourceServerVector, _ol$source$Vector);

	  /**
	   * @param {SourceServerVectorOptions} [options={}]
	   */
	  function SourceServerVector() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    (0, _classCallCheck3.default)(this, SourceServerVector);

	    var parentOptions = (0, _utilitiesObject.copy)(options);

	    var urlTemplate = options.url;

	    if (!urlTemplate) {
	      throw new Error('No url specified for the SourceServerVector Object!');
	    }

	    delete parentOptions.url;

	    var type = options.type || '';

	    delete parentOptions.type;

	    parentOptions.loader = function () {
	      return _this.loader.apply(_this, arguments);
	    };

	    var loadingStrategy = options.loadingStrategy || 'ALL';

	    if (loadingStrategy === 'BBOX') {
	      (function () {
	        var bboxRatio = options.bboxRatio || 1;

	        if (bboxRatio < 1) {
	          throw new Error('The bboxRatio should not be smaller than 1');
	        }

	        var lastScaledExtent = [0, 0, 0, 0];

	        parentOptions.strategy = function (extent) {
	          if (_openlayers2.default.extent.containsExtent(lastScaledExtent, extent)) {
	            return [extent];
	          } else {
	            var deltaX = (extent[2] - extent[0]) / 2 * (bboxRatio - 1);
	            var deltaY = (extent[3] - extent[1]) / 2 * (bboxRatio - 1);

	            lastScaledExtent = [extent[0] - deltaX, extent[1] - deltaY, extent[2] + deltaX, extent[3] + deltaY];

	            return [lastScaledExtent];
	          }
	        };
	      })();
	    } else {
	      parentOptions.strategy = _openlayers2.default.loadingstrategy.all;
	    }

	    /**
	     * @type {Boolean}
	     * @private
	     */
	    var _this = (0, _possibleConstructorReturn3.default)(this, _ol$source$Vector.call(this, parentOptions));

	    _this.useProxy_ = _this.useProxy_ = options.useProxy || !options.hasOwnProperty('useProxy') && options.proxy;

	    /**
	     * @type {string}
	     * @private
	     */
	    _this.proxy_ = options.proxy;

	    /**
	     * @type {string}
	     * @private
	     */
	    _this.loadingStrategy_ = loadingStrategy;

	    /**
	     * @type {string}
	     * @private
	     */
	    _this.urlTemplate_ = urlTemplate;

	    /**
	     * @type {string}
	     * @private
	     */
	    _this.type_ = type;

	    var formatOptions = {};

	    if (options.hasOwnProperty('defaultStyle')) {
	      formatOptions.defaultStyle = options.defaultStyle;
	    }

	    if (options.hasOwnProperty('extractStyles')) {
	      formatOptions.extractStyles = options.extractStyles;
	    }

	    /**
	     * @type {boolean}
	     * @private
	     */
	    _this.cache_ = options.cache;

	    switch (_this.type_) {
	      case 'KML':
	        formatOptions.showPointNames = false;
	        _this.format_ = new _openlayers2.default.format.KML(formatOptions);
	        _this.dataType_ = 'text xml'; // for $.ajax (GET-request)
	        break;
	      case 'GeoJSON':
	        _this.format_ = new _openlayers2.default.format.GeoJSON(formatOptions);
	        _this.dataType_ = 'text json'; // for $.ajax (GET-request)
	        break;
	      default:
	        throw new Error(_this.type_ + ' is not supported by SourceServerVector!');
	    }

	    /**
	     * @type {number}
	     * @private
	     */
	    _this.refresh_ = 0;

	    if (options.hasOwnProperty('refresh')) {
	      _this.setRefresh(options.refresh);
	    }

	    _this.refreshTimeoutId_ = null;

	    /**
	     * indicates if the source needs to be emptied
	     * @type {boolean}
	     * @private
	     */
	    _this.doClear_ = false;

	    /**
	     * @type {ol.ProjectionLike}
	     * @private
	     */
	    _this.bboxProjection_ = options.bboxProjection;
	    return _this;
	  }

	  /**
	   * This method returns a promise which is triggered after the loader successfully loaded a source.
	   * @param {ol.Extent} extent
	   * @param {number} resolution
	   * @param {ol.ProjectionLike} projection
	   */


	  SourceServerVector.prototype.loader = function loader(extent, resolution, projection) {
	    var _this2 = this;

	    // Problem with BBOX: if features are already in the layer, they shouldn't be added. Not trivial

	    var url = this.urlTemplate_;

	    if (this.loadingStrategy_ === 'BBOX') {
	      var transformedExtent = _openlayers2.default.proj.transformExtent(extent, projection, this.bboxProjection_);

	      url = url.replace(/\{bboxleft}/, transformedExtent[0].toString());
	      url = url.replace(/\{bboxbottom}/, transformedExtent[1].toString());
	      url = url.replace(/\{bboxright}/, transformedExtent[2].toString());
	      url = url.replace(/\{bboxtop}/, transformedExtent[3].toString());
	      url = url.replace(/\{resolution}/, resolution.toString());
	    }

	    if (this.refresh_) {
	      if (this.refreshTimeoutId_) {
	        clearTimeout(this.refreshTimeoutId_);
	      }
	      this.refreshTimeoutId_ = setTimeout(function () {
	        _this2.doClear_ = true; // clears the source
	        _this2.loader(extent, resolution, projection); // calls the loader recursively
	      }, this.refresh_);
	    }

	    _jquery2.default.ajax({
	      url: url,
	      dataType: this.dataType_,
	      beforeSend: function beforeSend() {
	        return _this2.dispatchEvent('vectorloadstart');
	      },
	      success: function success(response) {
	        // processing urls in the xml-Data (e.g. for images)
	        if (_this2.useProxy_ && /xml$/.test(_this2.dataType_)) {
	          response = _this2.addProxyToHrefTags(response);
	        }

	        if (_this2.doClear_) {
	          _this2.clear();
	          _this2.doClear_ = false;
	        }

	        var features = _this2.format_.readFeatures(response, { featureProjection: projection });

	        _this2.addFeatures(features);

	        _this2.dispatchEvent('vectorloadend');
	      },
	      error: function error() {
	        _Debug.Debug.error('Getting Feature resource failed with url ' + url);
	        _this2.dispatchEvent('vectorloaderror');
	      },
	      cache: this.cache_
	    });
	  };

	  /**
	   * This sets the refresh rate. A value of 0 or smaller turns refresh off.
	   * @param {number} refresh
	   */


	  SourceServerVector.prototype.setRefresh = function setRefresh(refresh) {
	    this.refresh_ = refresh > 0 ? refresh : 0;
	  };

	  /**
	   * makes all urls in href-tags inside of a xmlDocument use the proxy address.
	   * this function needs to extended with all Tags which could contain urls
	   * @param {HTMLElement} text an xml-Document
	   * @returns {HTMLElement} the xmlDocument
	   */


	  SourceServerVector.prototype.addProxyToHrefTags = function addProxyToHrefTags(text) {
	    var hrefTags = text.getElementsByTagName('href'); // not working in IE11

	    var i = void 0,
	        ii = void 0;
	    for (i = 0, ii = hrefTags.length; i < ii; i++) {
	      if (hrefTags[i].textContent) {
	        hrefTags[i].textContent = (0, _utilities.addProxy)(hrefTags[i].textContent, this.proxy_);
	      } else if (hrefTags[i].innerHTML) {
	        hrefTags[i].innerHTML = (0, _utilities.addProxy)(hrefTags[i].innerHTML, this.proxy_);
	      } else {
	        throw new Error("Can't prepend proxy inside KML (textContent and innerHTML missing)");
	      }
	    }

	    return text;
	  };

	  /**
	   * @returns {string}
	   */


	  SourceServerVector.prototype.getUrlTemplate = function getUrlTemplate() {
	    return this.urlTemplate_;
	  };

	  /**
	   * @param {string} urlTemplate
	   */


	  SourceServerVector.prototype.setUrlTemplate = function setUrlTemplate(urlTemplate) {
	    this.urlTemplate_ = urlTemplate;
	  };

	  return SourceServerVector;
	}(_openlayers2.default.source.Vector);

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.QuerySource = undefined;

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(120);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(121);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _SourceServerVector2 = __webpack_require__(169);

	var _utilities = __webpack_require__(138);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @typedef {SourceServerVectorOptions} QuerySourceOptions
	 * @property {String[]} [queryValues=[]]
	 */

	/**
	 * A source for a VectorLayer which address is controlled by the urlapi and which is not shown in the LayerSelector
	 */
	var QuerySource = exports.QuerySource = function (_SourceServerVector) {
	  (0, _inherits3.default)(QuerySource, _SourceServerVector);

	  /**
	   * @param {QuerySourceOptions} options
	   */
	  function QuerySource() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    (0, _classCallCheck3.default)(this, QuerySource);

	    /**
	     * @type {string}
	     * @private
	     */
	    var _this = (0, _possibleConstructorReturn3.default)(this, _SourceServerVector.call(this, options));

	    _this.origUrlTemplate_ = _this.getUrlTemplate();

	    /**
	     * @type {number}
	     * @private
	     */
	    _this.changedQueryValuesCount_ = 0;

	    _this.setQueryValues(options.queryValues || []);
	    return _this;
	  }

	  /**
	   * @param {string[]} values
	   */


	  QuerySource.prototype.setQueryValues = function setQueryValues(values) {
	    /**
	     * @type {string[]}
	     * @private
	     */
	    this.queryValues_ = values;
	    this.setUrlTemplate((0, _utilities.expandTemplate)(this.origUrlTemplate_, 'apiValue', this.queryValues_));

	    this.changedQueryValuesCount_++;
	    this.changed();
	  };

	  QuerySource.prototype.addFeatures = function addFeatures(features) {
	    if (this.changedQueryValuesCount_ > 0) {
	      this.changedQueryValuesCount_--;
	      this.clear();
	    }
	    _SourceServerVector.prototype.addFeatures.call(this, features);
	  };

	  /**
	   * @returns {string[]}
	   */


	  QuerySource.prototype.getQueryValues = function getQueryValues() {
	    return this.queryValues_;
	  };

	  return QuerySource;
	}(_SourceServerVector2.SourceServerVector);

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.TileWMSSource = exports.ImageWMSSource = exports.WMSFeatureInfoMixin = undefined;

	var _promise = __webpack_require__(12);

	var _promise2 = _interopRequireDefault(_promise);

	var _assign = __webpack_require__(172);

	var _assign2 = _interopRequireDefault(_assign);

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _openlayers = __webpack_require__(77);

	var _openlayers2 = _interopRequireDefault(_openlayers);

	var _jquery = __webpack_require__(78);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _utilities = __webpack_require__(138);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var WMSFeatureInfoMixin = exports.WMSFeatureInfoMixin = function () {
	  function WMSFeatureInfoMixin() {
	    (0, _classCallCheck3.default)(this, WMSFeatureInfoMixin);
	  }

	  WMSFeatureInfoMixin.prototype.initialize = function initialize(options) {
	    this.featureInfo_ = options.featureInfo !== undefined;
	    if (this.featureInfo_) {
	      this.featureInfoParams_ = options.featureInfo.params;
	      this.featureInfoCheckable_ = options.featureInfo.checkable;
	      this.featureInfoMutators_ = options.featureInfo.mutators;
	      this.featureInfoProxy_ = options.featureInfo.proxy;
	    }

	    this.originalUrl_ = options.originalUrl;
	  };

	  WMSFeatureInfoMixin.prototype.getFeatureInfoMutators = function getFeatureInfoMutators() {
	    return this.featureInfoMutators_ || [];
	  };

	  WMSFeatureInfoMixin.prototype.hasFeatureInfo = function hasFeatureInfo() {
	    return this.featureInfo_;
	  };

	  WMSFeatureInfoMixin.prototype.isFeatureInfoCheckable = function isFeatureInfoCheckable() {
	    return this.featureInfoCheckable_;
	  };

	  WMSFeatureInfoMixin.prototype.updateFeatureInfoParams = function updateFeatureInfoParams(newParams) {
	    (0, _assign2.default)(this.featureInfoParams_, newParams);
	  };

	  WMSFeatureInfoMixin.prototype.getFeatureInfo = function getFeatureInfo(coordinate, resolution, projection) {
	    var _this = this;

	    return new _promise2.default(function (resolve, reject) {
	      var params = _this.featureInfoParams_;
	      if (!params['QUERY_LAYERS'] || params['QUERY_LAYERS'].length === 0) {
	        resolve('');
	      } else {
	        var switchProxies = _this.featureInfoProxy_ !== undefined;
	        var normalUrls = void 0;
	        if (switchProxies) {
	          normalUrls = _this.getUrls();
	          _this.setUrl((0, _utilities.addProxy)(_this.originalUrl_, _this.featureInfoProxy_));
	        }
	        _jquery2.default.ajax({
	          url: _this.getGetFeatureInfoUrl(coordinate, resolution, projection, params),
	          success: resolve,
	          error: reject,
	          dataType: 'text'
	        });
	        if (switchProxies) {
	          _this.setUrls(normalUrls);
	        }
	      }
	    });
	  };

	  return WMSFeatureInfoMixin;
	}();

	var ImageWMSSource = exports.ImageWMSSource = (0, _utilities.mixin)(_openlayers2.default.source.ImageWMS, WMSFeatureInfoMixin);

	var TileWMSSource = exports.TileWMSSource = (0, _utilities.mixin)(_openlayers2.default.source.TileWMS, WMSFeatureInfoMixin);

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(173), __esModule: true };

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(174);
	module.exports = __webpack_require__(23).Object.assign;

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(21);

	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(158)});

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.UIConfigurator = undefined;

	var _getIterator2 = __webpack_require__(105);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _typeof2 = __webpack_require__(82);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _promise = __webpack_require__(12);

	var _promise2 = _interopRequireDefault(_promise);

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _openlayers = __webpack_require__(77);

	var _openlayers2 = _interopRequireDefault(_openlayers);

	var _jquery = __webpack_require__(78);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _Positioning = __webpack_require__(176);

	var _Move = __webpack_require__(184);

	var _FeaturePopup = __webpack_require__(185);

	var _FeatureTooltip = __webpack_require__(207);

	var _Shield = __webpack_require__(210);

	var _ControlFactory = __webpack_require__(213);

	var _Debug = __webpack_require__(151);

	var _utilitiesObject = __webpack_require__(137);

	var _utilities = __webpack_require__(138);

	var _MeasurementButton = __webpack_require__(259);

	var _PrintButton = __webpack_require__(285);

	var _globals = __webpack_require__(183);

	var _FeatureSelect = __webpack_require__(308);

	var _csscolorparser = __webpack_require__(152);

	var _FunctionCallBuffer = __webpack_require__(429);

	var _ShowWMSFeatureInfo = __webpack_require__(430);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * This class configures the UI of a map according to its mapconfig
	 */
	var UIConfigurator = exports.UIConfigurator = function () {
	  /**
	   * @param {G4UMap} map
	   */
	  function UIConfigurator(map) {
	    (0, _classCallCheck3.default)(this, UIConfigurator);

	    /**
	     * @type {G4UMap}
	     * @private
	     */
	    this.map_ = map;
	    this.map_.on('change:mapConfig', this.configureUI.bind(this));

	    /**
	     * @type {boolean}
	     * @private
	     */
	    this.initialized_ = false;

	    /**
	     * Counts how many cssFiles are getting loaded
	     * @type {number}
	     * @private
	     */
	    this.pending_ = 0;
	  }

	  /**
	   * Fill the given css String with the rigth colors
	   * @param {string} css
	   * @param {Color[]} colors
	   * @returns {string}
	   */


	  UIConfigurator.templateCSS = function templateCSS(css, colors) {
	    // find the used index of the color template
	    var colorTemplateIndex = function colorTemplateIndex(c) {
	      var channels = 0;
	      var index = -1;
	      for (var i = 0; i < 3; i++) {
	        if (c[i] !== 0) {
	          channels++;
	          index = i;
	        }
	      }
	      if (channels > 1) {
	        return -1;
	      } else {
	        return index;
	      }
	    };

	    var regExp = /(rgba?\([^)]*\))|(#[0-9a-f]{6})/g;

	    colors = colors.map(_csscolorparser.parseCSSColor);

	    return css.replace(regExp, function (match) {
	      var templateColor = (0, _csscolorparser.parseCSSColor)(match);
	      var index = colorTemplateIndex(templateColor);
	      if (index > -1) {
	        var aFac = templateColor[3];
	        var cFac = templateColor[index] / 120;
	        var newColor = [colors[index][0] * cFac, colors[index][1] * cFac, colors[index][2] * cFac, colors[index][3] * aFac];
	        return 'rgba(' + newColor[0] + ', ' + newColor[1] + ', ' + newColor[2] + ', ' + newColor[3] + ')';
	      }
	      return match;
	    });
	  };

	  /**
	   * Fixes all urls in the css string to the right path
	   * @param css
	   * @param cssPath
	   * @returns {string}
	   */


	  UIConfigurator.fixUrls = function fixUrls(css, cssPath) {
	    var dirname = (0, _utilities.urlDirname)(cssPath);
	    return css.replace(/url\("([^"]*)"\)/g, function (match, url) {
	      return 'url("' + (0, _utilities.urlJoin)(dirname, url) + '")';
	    });
	  };

	  /**
	   * Loads the from cssFile the given conf (if any is given) and inserts into a style tag in the head of the document
	   * @param {MapConfig} conf
	   * @returns {Promise}
	   */


	  UIConfigurator.prototype.loadCSS = function loadCSS(conf) {
	    var _this = this;

	    return new _promise2.default(function (resolve) {
	      if (conf.hasOwnProperty('cssFile')) {
	        (function () {
	          var id = 'g4u-css';
	          var $style = (0, _jquery2.default)('#' + id);

	          if ($style.length === 0) {
	            $style = (0, _jquery2.default)('<style>', {
	              'id': id
	            });
	            (0, _jquery2.default)('head').append($style);
	          }

	          var same = _this.cssFile_ === conf.cssFile;
	          if (!same) {
	            _jquery2.default.ajax(conf.cssFile).done(function (data) {
	              $style.empty();
	              data = UIConfigurator.fixUrls(data, conf.cssFile);
	              if (conf.hasOwnProperty('cssTemplate')) {
	                _this.map_.set('cssTemplateFile', data);
	                $style.html(UIConfigurator.templateCSS(data, conf.cssTemplate));
	              } else {
	                $style.html(data);
	              }
	              resolve();
	            }).fail(function () {
	              _Debug.Debug.error('Failed to load css file.');
	              resolve();
	            });
	            _this.cssFile_ = conf.cssFile;
	          } else {
	            if (conf.hasOwnProperty('cssTemplate')) {
	              $style.html(UIConfigurator.templateCSS(_this.map_.get('cssTemplateFile'), conf.cssTemplate));
	            }
	            resolve();
	          }
	        })();
	      } else {
	        resolve();
	      }
	    });
	  };

	  /**
	   * This functions is called the first time the configureUI function is called
	   * @param {MapConfig} mapConfigCopy
	   * @private
	   */


	  UIConfigurator.prototype.initialize_ = function initialize_(mapConfigCopy) {
	    var _this2 = this;

	    //
	    // Control positioning
	    //

	    /**
	     * @type {PositioningOptions}
	     */
	    var positioningOptions = mapConfigCopy.positioning || {};
	    positioningOptions.viewport = this.map_.getViewport();

	    this.map_.set('controlPositioning', new _Positioning.Positioning(positioningOptions));

	    var positionCallBuffer = new _FunctionCallBuffer.FunctionCallBuffer(function () {
	      return _this2.map_.get('controlPositioning').positionElements();
	    });

	    this.map_.on('ready', function () {
	      return positionCallBuffer.call();
	    });

	    this.map_.asSoonAs('ready', true, function () {
	      _this2.map_.on('resize', function () {
	        return positionCallBuffer.call();
	      });
	      _this2.map_.on('ready:ui', function () {
	        if (_this2.map_.get('ready:ui')) {
	          positionCallBuffer.call();
	        }
	      });
	      _this2.map_.on('change:mobile', function () {
	        return positionCallBuffer.call();
	      });

	      _this2.map_.on('ready:layers', function () {
	        positionCallBuffer.call();
	        _this2.map_.getLayerGroup().forEachOn('change:visible', function () {
	          return setTimeout(function () {
	            return positionCallBuffer.call();
	          }, 200);
	        });
	      });

	      _this2.map_.getLayerGroup().forEachOn('change:visible', function () {
	        return setTimeout(function () {
	          return positionCallBuffer.call();
	        }, 200);
	      });
	    });

	    //
	    //  Responsiveness / Mobile Layout
	    //

	    this.map_.set('mobile', false);
	    (0, _jquery2.default)(this.map_.getTarget()).children().addClass(_globals.cssClasses.desktop);

	    var lastMatch = void 0;
	    var oldScaleIcons = void 0;
	    var oldAnimations = void 0;

	    var checkMobileLayoutQuery = function checkMobileLayoutQuery() {
	      /**
	       * @type {MobileLayoutOptions}
	       */
	      var mobileLayout = _this2.map_.get('mobileLayout');
	      var featurePopup = _this2.map_.get('featurePopup');
	      var wmsFeatureInfo = _this2.map_.get('showWMSFeatureInfo');

	      if (mobileLayout && mobileLayout.mediaQueries && window.matchMedia) {
	        (function () {
	          var match = false;
	          mobileLayout.mediaQueries.forEach(function (query) {
	            match = match || window.matchMedia(query).matches;
	          });

	          if (match !== lastMatch) {
	            if (match) {
	              (function () {
	                (0, _jquery2.default)(_this2.map_.getTarget()).children().addClass(_globals.cssClasses.mobile);
	                (0, _jquery2.default)(_this2.map_.getTarget()).children().removeClass(_globals.cssClasses.desktop);

	                _this2.map_.set('mobile', true);

	                if (mobileLayout.hasOwnProperty('animations')) {
	                  oldAnimations = _this2.map_.get('move').getAnimations();
	                  _this2.map_.get('move').setAnimations(mobileLayout.animations);
	                }

	                if (mobileLayout.hasOwnProperty('scaleIcons')) {
	                  oldScaleIcons = _this2.map_.get('scaleIcons');
	                  _this2.map_.set('scaleIcons', mobileLayout.scaleIcons);
	                }

	                var restoreWmsFeatureInfoPoint = wmsFeatureInfo && wmsFeatureInfo.getPointVisible();

	                if (featurePopup && featurePopup.getVisible()) {
	                  featurePopup.setVisible(false);
	                  setTimeout(function () {
	                    featurePopup.setVisible(true);
	                    if (restoreWmsFeatureInfoPoint) {
	                      wmsFeatureInfo.setPointVisible(true);
	                    }
	                  }, 0);
	                }
	              })();
	            } else {
	              (function () {
	                (0, _jquery2.default)(_this2.map_.getTarget()).children().addClass(_globals.cssClasses.desktop);
	                (0, _jquery2.default)(_this2.map_.getTarget()).children().removeClass(_globals.cssClasses.mobile);

	                _this2.map_.set('mobile', false);

	                if (oldAnimations) {
	                  _this2.map_.get('move').setAnimations(oldAnimations);
	                }
	                if (oldScaleIcons) {
	                  _this2.map_.set('scaleIcons', oldScaleIcons);
	                }

	                var restoreWmsFeatureInfoPoint = wmsFeatureInfo && wmsFeatureInfo.getPointVisible();

	                if (featurePopup && featurePopup.getVisible()) {
	                  featurePopup.setVisible(false);
	                  setTimeout(function () {
	                    featurePopup.setVisible(true);
	                    if (restoreWmsFeatureInfoPoint) {
	                      wmsFeatureInfo.setPointVisible(true);
	                    }
	                  }, 0);
	                }
	              })();
	            }
	          }
	          lastMatch = match;
	        })();
	      }
	    };

	    //
	    // Enabling/Disabling responsiveness
	    //

	    var oldResponsive = void 0;

	    var onChangeResponsive = function onChangeResponsive() {
	      if (_this2.map_.get('responsive') !== oldResponsive) {
	        if (_this2.map_.get('responsive')) {
	          checkMobileLayoutQuery();
	          _this2.map_.on('resize', checkMobileLayoutQuery);
	        } else {
	          _this2.map_.un('resize', checkMobileLayoutQuery);
	        }
	        oldResponsive = _this2.map_.get('responsive');
	      }
	    };

	    this.map_.once('ready', onChangeResponsive);

	    this.map_.on('change:responsive', onChangeResponsive);

	    this.map_.on('ready:ui', onChangeResponsive);

	    //
	    // Icon Scaling
	    //

	    this.map_.on('change:scaleIcons', function (e) {
	      _this2.map_.get('styling').forEachStyle(function (style) {
	        var image = style.getImage();
	        if (image) {
	          image.setScale((image.getScale() || 1) / e.oldValue * _this2.map_.get('scaleIcons'));
	        }
	      });

	      _this2.map_.getLayerGroup().recursiveForEach(function (layer) {
	        layer.changed();
	      });
	    });

	    this.initialized_ = true;
	  };

	  /**
	   * @public
	   */


	  UIConfigurator.prototype.configureUI = function configureUI() {
	    var _this3 = this;

	    this.map_.set('ready:ui', false);
	    this.pending_++;

	    var mapConfigCopy = (0, _utilitiesObject.copyDeep)(this.map_.get('mapConfig'));

	    if (!this.initialized_) {
	      this.initialize_(mapConfigCopy);
	    }

	    var curConfig = void 0;

	    // //////////////////////////////////////////////////////////////////////////////////////// //
	    //                              Load CSS if neccessary                                      //
	    // //////////////////////////////////////////////////////////////////////////////////////// //

	    this.loadCSS(mapConfigCopy).then(function () {
	      _this3.pending_--;
	      if (_this3.pending_ === 0) {
	        (function () {
	          // clear
	          _this3.map_.removeControls();
	          _this3.map_.controlsByName = {};
	          _this3.map_.removeInteractions();

	          _this3.map_.get('controlPositioning').init();

	          // //////////////////////////////////////////////////////////////////////////////////////// //
	          //                           Move Class (before mobileLayout)                               //
	          // //////////////////////////////////////////////////////////////////////////////////////// //

	          var moveOptions = (0, _utilitiesObject.copyDeep)((0, _utilities.getConfig)(mapConfigCopy, 'move'));
	          moveOptions.map = _this3.map_;

	          _this3.map_.set('move', new _Move.Move(moveOptions));

	          // //////////////////////////////////////////////////////////////////////////////////////// //
	          //                                     HTML-Shield                                          //
	          // //////////////////////////////////////////////////////////////////////////////////////// //

	          if (!_this3.map_.get('shield')) {
	            _this3.map_.set('shield', new _Shield.Shield({ map: _this3.map_ }));
	          }

	          // //////////////////////////////////////////////////////////////////////////////////////// //
	          //                                MobileLayoutMediaQuery                                    //
	          // //////////////////////////////////////////////////////////////////////////////////////// //

	          _this3.map_.set('mobileLayout', mapConfigCopy.mobileLayout);

	          _this3.map_.set('responsive', _this3.map_.get('responsive') || !!_this3.map_.get('mobileLayout'));

	          // //////////////////////////////////////////////////////////////////////////////////////// //
	          //                                       MODULES                                            //
	          // //////////////////////////////////////////////////////////////////////////////////////// //

	          // should be before adding controls so the controls don't have to wait for any other ui elements

	          var _iteratorNormalCompletion = true;
	          var _didIteratorError = false;
	          var _iteratorError = undefined;

	          try {
	            for (var _iterator = (0, _getIterator3.default)(_this3.map_.getModules()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	              var module = _step.value;

	              module.configureUI(mapConfigCopy);
	            }

	            // //////////////////////////////////////////////////////////////////////////////////////// //
	            //                                       Controls                                           //
	            // //////////////////////////////////////////////////////////////////////////////////////// //
	          } catch (err) {
	            _didIteratorError = true;
	            _iteratorError = err;
	          } finally {
	            try {
	              if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	              }
	            } finally {
	              if (_didIteratorError) {
	                throw _iteratorError;
	              }
	            }
	          }

	          if (!_this3.controlFactory) {
	            _this3.controlFactory = new _ControlFactory.ControlFactory({
	              map: _this3.map_,
	              localiser: _this3.map_.get('localiser')
	            });
	          } else {
	            _this3.controlFactory.setLocaliser(_this3.map_.get('localiser'));
	          }

	          _this3.controlFactory.addControls();

	          var deactivate = function deactivate(control) {
	            if (control.setActive) {
	              control.setActive(false);
	            }
	            if (control.getControls) {
	              control.getControls().forEach(deactivate);
	            }
	          };

	          _this3.map_.on('change:mobile', function () {
	            return _this3.map_.getControls().forEach(deactivate);
	          });

	          // //////////////////////////////////////////////////////////////////////////////////////// //
	          //                                     Interactions                                         //
	          // //////////////////////////////////////////////////////////////////////////////////////// //

	          if ((0, _utilities.checkFor)(mapConfigCopy, 'interactions')) {
	            if ((0, _utilities.checkFor)(mapConfigCopy.interactions, 'doubleClickZoom')) {
	              _this3.map_.addDefaultInteraction('dblclick', new _openlayers2.default.interaction.DoubleClickZoom());
	            }

	            if ((0, _utilities.checkFor)(mapConfigCopy.interactions, 'dragPan')) {
	              if (mapConfigCopy.kinetic !== false) {
	                var decay = -0.002;
	                var minVelocity = 0.02;
	                var delay = 100;
	                if ((0, _typeof3.default)(mapConfigCopy.kinetic) === 'object') {
	                  decay = mapConfigCopy.kinetic.decay || decay;
	                  minVelocity = mapConfigCopy.kinetic.minVelocity || minVelocity;
	                  delay = mapConfigCopy.kinetic.delay || delay;
	                }
	                _this3.map_.addDefaultInteraction('drag', new _openlayers2.default.interaction.DragPan({
	                  kinetic: new _openlayers2.default.Kinetic(decay, minVelocity, delay)
	                }));
	              } else {
	                _this3.map_.addDefaultInteraction('drag', new _openlayers2.default.interaction.DragPan());
	              }
	            }

	            if ((0, _utilities.checkFor)(mapConfigCopy.interactions, 'dragRotate')) {
	              // using default condition: ol.events.condition.altShiftKeysOnly
	              _this3.map_.addDefaultInteraction('altShiftDrag', new _openlayers2.default.interaction.DragRotate());
	            }

	            if ((0, _utilities.checkFor)(mapConfigCopy.interactions, 'dragZoom')) {
	              // using default condition: ol.events.condition.shiftKeyOnly
	              _this3.map_.addDefaultInteraction('shiftDrag', new _openlayers2.default.interaction.DragZoom());
	            }

	            if ((0, _utilities.checkFor)(mapConfigCopy.interactions, 'keyboardPan')) {
	              _this3.map_.addDefaultInteraction('keyboard', new _openlayers2.default.interaction.KeyboardPan());
	            }

	            if ((0, _utilities.checkFor)(mapConfigCopy.interactions, 'keyboardZoom')) {
	              _this3.map_.addDefaultInteraction('keyboard', new _openlayers2.default.interaction.KeyboardZoom());
	            }

	            if ((0, _utilities.checkFor)(mapConfigCopy.interactions, 'mouseWheelZoom')) {
	              _this3.map_.addDefaultInteraction('mouseWheel', new _openlayers2.default.interaction.MouseWheelZoom());
	            }

	            if ((0, _utilities.checkFor)(mapConfigCopy.interactions, 'pinchRotate')) {
	              _this3.map_.addDefaultInteraction('pinchRotate', new _openlayers2.default.interaction.PinchRotate());
	            }

	            if ((0, _utilities.checkFor)(mapConfigCopy.interactions, 'pinchZoom')) {
	              _this3.map_.addDefaultInteraction('pinchZoom', new _openlayers2.default.interaction.PinchZoom());
	            }
	          }

	          _this3.map_.addDefaultInteraction('singleclick', new _FeatureSelect.FeatureSelect({
	            condition: function condition(e) {
	              return _openlayers2.default.events.condition.singleClick(e) && (0, _jquery2.default)(e.originalEvent.target).is('canvas');
	            },
	            style: null,
	            multi: true
	          }));

	          var moveInteraction = new _FeatureSelect.FeatureSelect({
	            condition: function condition(e) {
	              return _openlayers2.default.events.condition.pointerMove(e) && (0, _jquery2.default)(e.originalEvent.target).is('canvas');
	            },
	            style: null,
	            multi: true
	          });
	          _this3.map_.addDefaultInteraction('pointermove', moveInteraction);

	          var $viewport = (0, _jquery2.default)(_this3.map_.getViewport());

	          // if the map is left the features should get deselected
	          $viewport.find('canvas').on('mouseleave', function (e) {
	            if (!(0, _jquery2.default)(e.relatedTarget).is('canvas')) {
	              if (moveInteraction.getFeatures().getLength() > 0) {
	                moveInteraction.deselect(moveInteraction.getFeatures().getArray());
	              }
	            }
	          });

	          // //////////////////////////////////////////////////////////////////////////////////////// //
	          //                                     Feature Popups                                       //
	          // //////////////////////////////////////////////////////////////////////////////////////// //

	          var featurePopup = _this3.map_.get('featurePopup');
	          if (featurePopup) {
	            featurePopup.setMap(null);
	          }
	          curConfig = (0, _utilities.getConfig)(mapConfigCopy, 'featurePopup');
	          if (curConfig) {
	            featurePopup = new _FeaturePopup.FeaturePopup(curConfig);
	            featurePopup.setMap(_this3.map_);
	            _this3.map_.set('featurePopup', featurePopup);
	          } else {
	            _this3.map_.set('featurePopup', undefined);
	          }

	          var featureTooltip = _this3.map_.get('featureTooltip');
	          if (featureTooltip) {
	            featureTooltip.setMap(null);
	          }
	          curConfig = (0, _utilities.getConfig)(mapConfigCopy, 'featureTooltip');
	          if (curConfig) {
	            featureTooltip = new _FeatureTooltip.FeatureTooltip(curConfig);
	            featureTooltip.setMap(_this3.map_);
	            _this3.map_.set('featureTooltip', featureTooltip);
	          } else {
	            _this3.map_.set('featureTooltip', undefined);
	          }

	          var showWMSFeatureInfo = _this3.map_.get('showWMSFeatureInfo');
	          if (showWMSFeatureInfo) {
	            showWMSFeatureInfo.setMap(null);
	          }
	          curConfig = (0, _utilities.getConfig)(mapConfigCopy, 'showWMSFeatureInfo');
	          if (curConfig) {
	            showWMSFeatureInfo = new _ShowWMSFeatureInfo.ShowWMSFeatureInfo(curConfig);
	            showWMSFeatureInfo.setMap(_this3.map_);
	            _this3.map_.set('showWMSFeatureInfo', showWMSFeatureInfo);
	          } else {
	            _this3.map_.set('showWMSFeatureInfo', undefined);
	          }

	          // //////////////////////////////////////////////////////////////////////////////////////// //
	          //                                     UserExit (2/2)                                       //
	          // //////////////////////////////////////////////////////////////////////////////////////// //
	          if (_this3.map_.get('userActionTracking')) {
	            (function () {
	              var map = _this3.map_;

	              _this3.map_.on('moveend', function () {
	                map.dispatchEvent({
	                  type: 'userActionTracking',
	                  action: 'move'
	                });
	              });

	              _this3.map_.get('baseLayers').getLayers().forEach(function (layer) {
	                layer.on('change:visible', function () {
	                  if (layer.getVisible()) {
	                    // only if changed to visible
	                    map.dispatchEvent({
	                      type: 'userActionTracking',
	                      action: 'baseLayerChange',
	                      value: layer.get('title')
	                    });
	                  }
	                });
	              });

	              _this3.map_.get('featureLayers').recursiveForEach(function (layer) {
	                layer.on('change:visible', function () {
	                  if (layer.getVisible()) {
	                    // only if changed to visible
	                    map.dispatchEvent({
	                      type: 'userActionTracking',
	                      action: 'featureLayerChange',
	                      valule: layer.get('title')
	                    });
	                  }
	                });
	              });

	              if (_this3.map_.get('featurePopup')) {
	                _this3.map_.get('featurePopup').on('change:visible', function () {
	                  if (this.getVisible()) {
	                    // only if changed to visible
	                    map.dispatchEvent({
	                      type: 'userActionTracking',
	                      action: 'popupOpen',
	                      value: this.getFeature()
	                    });
	                  }
	                });
	              }

	              var _iteratorNormalCompletion2 = true;
	              var _didIteratorError2 = false;
	              var _iteratorError2 = undefined;

	              try {
	                for (var _iterator2 = (0, _getIterator3.default)(_this3.map_.getModules()), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                  var module = _step2.value;

	                  module.enableUserActionTracking();
	                }
	              } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	              } finally {
	                try {
	                  if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                    _iterator2.return();
	                  }
	                } finally {
	                  if (_didIteratorError2) {
	                    throw _iteratorError2;
	                  }
	                }
	              }

	              _this3.map_.getControls().forEach(function (control) {
	                if (control instanceof _PrintButton.PrintButton) {
	                  control.on('click', function () {
	                    map.dispatchEvent({
	                      type: 'userActionTracking',
	                      action: 'print'
	                    });
	                  });
	                }

	                if (control instanceof _MeasurementButton.MeasurementButton) {
	                  if (control.getType() === 'LineString') {
	                    control.on('measurement', function () {
	                      map.dispatchEvent({
	                        type: 'userActionTracking',
	                        action: 'measureLine'
	                      });
	                    });
	                  } else if (control.getType() === 'Polygon') {
	                    control.on('measurement', function () {
	                      map.dispatchEvent({
	                        type: 'userActionTracking',
	                        action: 'measureArea'
	                      });
	                    });
	                  }
	                }
	              });
	            })();
	          }
	          _this3.map_.set('ready:ui', true);
	        })();
	      }
	    }).catch(function (reason) {
	      _Debug.Debug.error(reason);
	    });
	  };

	  return UIConfigurator;
	}();

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Positioning = undefined;

	var _defineProperty2 = __webpack_require__(177);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _set = __webpack_require__(133);

	var _set2 = _interopRequireDefault(_set);

	var _toConsumableArray2 = __webpack_require__(178);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	var _typeof2 = __webpack_require__(82);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _getIterator2 = __webpack_require__(105);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _jquery = __webpack_require__(78);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _globals = __webpack_require__(183);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * This describes the floating directions of an element. It can be an array, then it will move from the center to the
	 * first specified direction and after that it moves in the second direction. If it is set to 'fixed' it is not
	 * positioned via Positioning.
	 * @typedef {string[]|string} Float
	 */

	/**
	 * @typedef {Object} HideableElement
	 * @property {Control} control
	 * @property {Boolean} visible
	 * @property {number} importance
	 * @property {number} order
	 * @property {Float} [float] first and second direction or special value 'fixed'
	 * @property {HideableElement[]} [hideableChildren]
	 */

	/**
	 * @typedef {HideableElement} PositionedElement
	 * @property {string[]} float first and second direction or special value 'fixed'
	 * @property {number} minWidth
	 * @property {number} minHeight
	 * @property {{width: number, height: number}} size
	 */

	/**
	 * @typedef {object} PositioningOptions
	 * @property {number} [padding=5]
	 * @property {number} [spacing=10]
	 * @property {HTMLElement} viewport
	 */

	var Positioning = exports.Positioning = function () {
	  /**
	   * @param {PositioningOptions} options
	   */
	  function Positioning(options) {
	    (0, _classCallCheck3.default)(this, Positioning);

	    /**
	     * @type {jQuery|HTMLElement}
	     * @private
	     */
	    this.$viewport_ = (0, _jquery2.default)(options.viewport);

	    /**
	     * The padding between the controls
	     * @type {number}
	     * @private
	     */
	    this.padding_ = options.padding || 5;

	    /**
	     * The space between the controls and the edges of the map
	     * @type {number}
	     * @private
	     */
	    this.spacing_ = options.spacing || 10;

	    this.init();
	  }

	  Positioning.prototype.init = function init() {
	    /**
	     * @type {HideableElement[]}
	     * @private
	     */
	    this.all_ = [];

	    /**
	     * All Controls stored according their position on the map
	     * @type {object}
	     * @private
	     */
	    this.corners_ = {
	      'left': {
	        'top': {
	          counterclockwise: [],
	          clockwise: []
	        },
	        'bottom': {
	          counterclockwise: [],
	          clockwise: []
	        }
	      },
	      'right': {
	        'top': {
	          counterclockwise: [],
	          clockwise: []
	        },
	        'bottom': {
	          counterclockwise: [],
	          clockwise: []
	        }
	      }
	    };

	    /**
	     * This number tracks the order in which controls are added
	     * @type {number}
	     * @private
	     */
	    this.order_ = 0;
	  };

	  /**
	   * Add a control to the positioning.
	   * @param {Control} control
	   * @param {Object} [parentMeta] the meta information of the parent control
	   */


	  Positioning.prototype.addControl = function addControl(control, parentMeta) {
	    var _this = this;

	    // check if control needs to be positioned
	    if (control.get$Element().parents().hasClass('ol-viewport')) {
	      if (!parentMeta || !parentMeta.control.isWindowed()) {
	        var _ret = function () {
	          // gather metainformation
	          /** @type {HideableElement} */
	          var metaElem = {
	            control: control,
	            order: _this.order_++,
	            visible: true,
	            importance: control.getImportance()
	          };

	          // repositioning if collapsible elements get clicked
	          var $elem = control.get$Element();
	          if (control.getCollapsible && control.getCollapsible()) {
	            (function () {
	              var width = $elem.width();
	              var height = $elem.height();

	              $elem.on('click', function () {
	                // TODO: introduce events to react to. beware of the loops.
	                if ($elem.width() !== width || $elem.height() !== height) {
	                  _this.positionElements();
	                  width = $elem.width();
	                  height = $elem.height();
	                }
	              });
	            })();
	          }

	          if (!parentMeta) {
	            metaElem.float = metaElem.control.getFloat() || ['top', 'left'];

	            if (metaElem.float === 'fixed') {
	              return {
	                v: void 0
	              };
	            }

	            var x = void 0,
	                y = void 0,
	                direction = void 0;
	            switch (metaElem.float[0]) {
	              case 'top':
	                y = 'top';
	                x = metaElem.float[1];
	                if (x === 'left') {
	                  direction = 'clockwise';
	                } else if (x === 'right') {
	                  direction = 'counterclockwise';
	                }
	                break;
	              case 'right':
	                x = 'right';
	                y = metaElem.float[1];
	                if (y === 'top') {
	                  direction = 'clockwise';
	                } else if (y === 'bottom') {
	                  direction = 'counterclockwise';
	                }
	                break;
	              case 'bottom':
	                y = 'bottom';
	                x = metaElem.float[1];
	                if (x === 'left') {
	                  direction = 'counterclockwise';
	                } else {
	                  direction = 'clockwise';
	                }
	                break;
	              case 'left':
	                x = 'left';
	                y = metaElem.float[1];
	                if (y === 'top') {
	                  direction = 'counterclockwise';
	                } else {
	                  direction = 'clockwise';
	                }
	            }

	            _this.corners_[x][y][direction].push(metaElem);

	            _this.all_.push(metaElem);

	            if (metaElem.control.getControls) {
	              metaElem.hideableChildren = [];
	              var _iteratorNormalCompletion = true;
	              var _didIteratorError = false;
	              var _iteratorError = undefined;

	              try {
	                for (var _iterator = (0, _getIterator3.default)(metaElem.control.getControls()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                  var child = _step.value;

	                  _this.addControl(child, metaElem);
	                }
	              } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	              } finally {
	                try {
	                  if (!_iteratorNormalCompletion && _iterator.return) {
	                    _iterator.return();
	                  }
	                } finally {
	                  if (_didIteratorError) {
	                    throw _iteratorError;
	                  }
	                }
	              }
	            }
	          } else if (!parentMeta.control.isWindowed()) {
	            metaElem.importance = control.getImportance();
	            parentMeta.hideableChildren.push(metaElem);
	            _this.all_.push(metaElem);
	          }
	        }();

	        if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
	      }
	    }
	  };

	  /**
	   * Gets the element in a corner
	   * @param {string} x
	   * @param {string} y
	   * @returns {HideableElement}
	   * @private
	   */


	  Positioning.prototype.getCorner_ = function getCorner_(x, y) {
	    var cwi = 0;
	    var ccwi = 0;

	    var cwElem = this.corners_[x][y].clockwise[cwi++];
	    var ccwElem = this.corners_[x][y].counterclockwise[ccwi++];

	    while (cwElem && !cwElem.visible) {
	      cwElem = this.corners_[x][y].clockwise[cwi++];
	    }

	    while (ccwElem && !ccwElem.visible) {
	      ccwElem = this.corners_[x][y].counterclockwise[ccwi++];
	    }

	    if (cwElem || ccwElem) {
	      if (!cwElem) {
	        return ccwElem;
	      } else if (!ccwElem) {
	        return cwElem;
	      } else {
	        if (cwElem.order < ccwElem.order) {
	          return cwElem;
	        } else {
	          return ccwElem;
	        }
	      }
	    }
	  };

	  /**
	   * Gets all elements at one edge
	   * @param edge
	   * @returns {*|Array.<Element>}
	   * @private
	   */


	  Positioning.prototype.getEdge_ = function getEdge_(edge) {
	    var x1 = void 0,
	        x2 = void 0,
	        y1 = void 0,
	        y2 = void 0;
	    if (edge === 'top') {
	      x1 = 'left';
	      x2 = 'right';
	      y1 = y2 = 'top';
	    } else if (edge === 'right') {
	      x1 = x2 = 'right';
	      y1 = 'top';
	      y2 = 'bottom';
	    } else if (edge === 'bottom') {
	      x1 = 'right';
	      x2 = 'left';
	      y1 = y2 = 'bottom';
	    } else if (edge === 'left') {
	      x1 = x2 = 'left';
	      y1 = 'bottom';
	      y2 = 'top';
	    }

	    var clockwise = _jquery2.default.grep(this.corners_[x1][y1].clockwise, function (el) {
	      return el.visible;
	    });
	    var counterclockwise = _jquery2.default.grep(this.corners_[x2][y2].counterclockwise, function (el) {
	      return el.visible;
	    });

	    var arr = [];
	    var c = this.getCorner_(x1, y1);
	    if (c) {
	      arr.push(c);
	    }
	    arr.push.apply(arr, (0, _toConsumableArray3.default)(clockwise));
	    arr.push.apply(arr, (0, _toConsumableArray3.default)(counterclockwise));
	    c = this.getCorner_(x2, y2);
	    if (c) {
	      arr.push(c);
	    }
	    return _jquery2.default.unique(arr);
	  };

	  /**
	   * Initializes all elements
	   * @private
	   */


	  Positioning.prototype.initElements_ = function initElements_() {
	    var _this2 = this;

	    var elems = new _set2.default(this.all_);

	    /**
	     * @param {PositionedElement} elem
	     */
	    var forEach = function forEach(elem) {
	      if (elem.hideableChildren) {
	        var _iteratorNormalCompletion2 = true;
	        var _didIteratorError2 = false;
	        var _iteratorError2 = undefined;

	        try {
	          for (var _iterator2 = (0, _getIterator3.default)(elem.hideableChildren), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	            var child = _step2.value;

	            forEach(child);
	          }
	        } catch (err) {
	          _didIteratorError2 = true;
	          _iteratorError2 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion2 && _iterator2.return) {
	              _iterator2.return();
	            }
	          } finally {
	            if (_didIteratorError2) {
	              throw _iteratorError2;
	            }
	          }
	        }
	      }

	      var $elem = elem.control.get$Element();
	      $elem.removeClass(_globals.cssClasses.hidden);
	      $elem.position({ top: 0, left: 0 });
	      elem.visible = $elem.is(':visible');
	      if (elem.visible) {
	        if (elem.control.release) {
	          elem.control.release('height');
	          elem.control.release('width');
	        }
	        elem.size = _this2.measureExpandedElement_(elem);
	      }

	      elems.delete(elem);
	    };

	    var _iteratorNormalCompletion3 = true;
	    var _didIteratorError3 = false;
	    var _iteratorError3 = undefined;

	    try {
	      for (var _iterator3 = (0, _getIterator3.default)(elems), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	        var elem = _step3.value;

	        forEach(elem);
	      }
	    } catch (err) {
	      _didIteratorError3 = true;
	      _iteratorError3 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion3 && _iterator3.return) {
	          _iterator3.return();
	        }
	      } finally {
	        if (_didIteratorError3) {
	          throw _iteratorError3;
	        }
	      }
	    }
	  };

	  /**
	   * Calculates summed length of all elements on one edge
	   * @param {PositionedElement[]} edgeElems
	   * @param {string} side
	   * @returns {number}
	   * @private
	   */


	  Positioning.prototype.calculateLength_ = function calculateLength_(edgeElems, side) {
	    var length = this.padding_ * 2;

	    var firstElement = true;

	    var _iteratorNormalCompletion4 = true;
	    var _didIteratorError4 = false;
	    var _iteratorError4 = undefined;

	    try {
	      for (var _iterator4 = (0, _getIterator3.default)(edgeElems), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	        var elem = _step4.value;

	        length += elem.size[side];
	        if (firstElement) {
	          firstElement = false;
	        } else {
	          length += this.spacing_;
	        }
	      }
	    } catch (err) {
	      _didIteratorError4 = true;
	      _iteratorError4 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion4 && _iterator4.return) {
	          _iterator4.return();
	        }
	      } finally {
	        if (_didIteratorError4) {
	          throw _iteratorError4;
	        }
	      }
	    }

	    return length;
	  };

	  /**
	   * (Re-)Position the controls on the map
	   */


	  Positioning.prototype.positionElements = function positionElements() {
	    var _this3 = this;

	    var width = this.$viewport_.innerWidth();
	    var height = this.$viewport_.innerHeight();

	    this.initElements_();

	    var changed = void 0;

	    var processSides = new _set2.default(['top', 'left', 'bottom', 'right']);

	    while (processSides.size) {
	      // calculation

	      if (processSides.has('top')) {
	        var topElems = this.getEdge_('top');
	        var topWidth = this.calculateLength_(topElems, 'width');

	        changed = false;
	        while (topElems.length && topWidth > width && !this.squeezeElements_(topElems, 'width', topWidth - width)) {
	          this.hideLeastImportant_(topElems);
	          topElems = this.getEdge_('top');
	          topWidth = this.calculateLength_(topElems, 'width');
	          changed = true;
	        }
	        if (changed) {
	          processSides.add('left');
	          processSides.add('right');
	        }

	        processSides.delete('top');
	      }

	      if (processSides.has('right')) {
	        var rightElems = this.getEdge_('right');
	        var rightHeight = this.calculateLength_(rightElems, 'height');

	        if (rightElems.length && rightHeight > height) {
	          changed = false;
	          var squeezable = this.squeezeElements_(rightElems, 'height', rightHeight - height);
	          while (rightElems.length && rightHeight > height && !squeezable) {
	            this.hideLeastImportant_(rightElems);
	            rightElems = this.getEdge_('right');
	            rightHeight = this.calculateLength_(rightElems, 'height');
	            changed = true;
	            squeezable = this.squeezeElements_(rightElems, 'height', rightHeight - height);
	          }
	          if (changed) {
	            processSides.add('top');
	            processSides.add('bottom');
	          }
	        }

	        processSides.delete('right');
	      }

	      if (processSides.has('bottom')) {
	        var bottomElems = this.getEdge_('bottom');
	        var bottomWidth = this.calculateLength_(bottomElems, 'width');

	        changed = false;
	        while (bottomElems.length && bottomWidth > width && !this.squeezeElements_(bottomElems, 'width', bottomWidth - width)) {
	          this.hideLeastImportant_(bottomElems);
	          bottomElems = this.getEdge_('bottom');
	          bottomWidth = this.calculateLength_(bottomElems, 'width');
	          changed = true;
	        }
	        if (changed) {
	          processSides.add('left');
	          processSides.add('right');
	        }

	        processSides.delete('bottom');
	      }

	      if (processSides.has('left')) {
	        var leftElems = this.getEdge_('left');
	        var leftHeight = this.calculateLength_(leftElems, 'height');

	        changed = false;
	        while (leftElems.length && leftHeight > height && !this.squeezeElements_(leftElems, 'height', leftHeight - height)) {
	          this.hideLeastImportant_(leftElems);
	          leftElems = this.getEdge_('left');
	          leftHeight = this.calculateLength_(leftElems, 'height');
	          changed = true;
	        }
	        if (changed) {
	          processSides.add('top');
	          processSides.add('bottom');
	        }

	        processSides.delete('left');
	      }
	    }

	    // positioning

	    var positionCorner = function positionCorner(x, y) {
	      var corner = _this3.getCorner_(x, y);
	      if (corner) {
	        var _$elem$removeClass$cs;

	        var xLength = _this3.padding_;
	        var yLength = _this3.padding_;
	        var $elem = corner.control.get$Element();
	        $elem.removeClass(_globals.cssClasses.hidden).css((_$elem$removeClass$cs = {}, (0, _defineProperty3.default)(_$elem$removeClass$cs, x, xLength), (0, _defineProperty3.default)(_$elem$removeClass$cs, y, yLength), _$elem$removeClass$cs));

	        xLength += $elem.outerWidth() + _this3.spacing_;
	        yLength += $elem.outerHeight() + _this3.spacing_;

	        var xDirection = void 0,
	            yDirection = void 0;

	        if (x === 'left' && y === 'top') {
	          xDirection = 'clockwise';
	          yDirection = 'counterclockwise';
	        } else if (x === 'right' && y === 'top') {
	          xDirection = 'counterclockwise';
	          yDirection = 'clockwise';
	        } else if (x === 'right' && y === 'bottom') {
	          xDirection = 'clockwise';
	          yDirection = 'counterclockwise';
	        } else if (x === 'left' && y === 'bottom') {
	          xDirection = 'counterclockwise';
	          yDirection = 'clockwise';
	        }

	        // x
	        var _iteratorNormalCompletion5 = true;
	        var _didIteratorError5 = false;
	        var _iteratorError5 = undefined;

	        try {
	          for (var _iterator5 = (0, _getIterator3.default)(_jquery2.default.grep(_this3.corners_[x][y][xDirection], function (el) {
	            return el.visible && el !== corner;
	          })), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	            var _$elem$css;

	            var elem = _step5.value;

	            $elem = elem.control.get$Element();
	            $elem.css((_$elem$css = {}, (0, _defineProperty3.default)(_$elem$css, x, xLength), (0, _defineProperty3.default)(_$elem$css, y, _this3.padding_), _$elem$css));
	            xLength += $elem.outerWidth() + _this3.spacing_;
	          }

	          // y
	        } catch (err) {
	          _didIteratorError5 = true;
	          _iteratorError5 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion5 && _iterator5.return) {
	              _iterator5.return();
	            }
	          } finally {
	            if (_didIteratorError5) {
	              throw _iteratorError5;
	            }
	          }
	        }

	        var _iteratorNormalCompletion6 = true;
	        var _didIteratorError6 = false;
	        var _iteratorError6 = undefined;

	        try {
	          for (var _iterator6 = (0, _getIterator3.default)(_jquery2.default.grep(_this3.corners_[x][y][yDirection], function (el) {
	            return el.visible && el !== corner;
	          })), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	            var _$elem$css2;

	            var _elem = _step6.value;

	            $elem = _elem.control.get$Element();
	            $elem.css((_$elem$css2 = {}, (0, _defineProperty3.default)(_$elem$css2, x, _this3.padding_), (0, _defineProperty3.default)(_$elem$css2, y, yLength), _$elem$css2));
	            yLength += $elem.outerHeight() + _this3.spacing_;
	          }
	        } catch (err) {
	          _didIteratorError6 = true;
	          _iteratorError6 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion6 && _iterator6.return) {
	              _iterator6.return();
	            }
	          } finally {
	            if (_didIteratorError6) {
	              throw _iteratorError6;
	            }
	          }
	        }
	      }
	    };

	    positionCorner('left', 'top');

	    positionCorner('right', 'top');

	    positionCorner('right', 'bottom');

	    positionCorner('left', 'bottom');
	  };

	  /**
	   * Tries to squeeze the elements on one edge to fit the space. Returns true if it did work, false otherwise.
	   * @param {PositionedElement[]} elems
	   * @param {string} side
	   * @param {number} neededSpace
	   * @private
	   * @returns {boolean}
	   */


	  Positioning.prototype.squeezeElements_ = function squeezeElements_(elems, side, neededSpace) {
	    var squeezableElements = [];

	    function insert(item) {
	      var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	      var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : squeezableElements.length;

	      if (y === x) {
	        squeezableElements.splice(x, 0, item);
	      } else {
	        var p = Math.floor((x + y) / 2);
	        if (item.importance <= squeezableElements[p].importance) {
	          insert(item, x, p);
	        } else {
	          insert(item, p + 1, y);
	        }
	      }
	    }

	    /**
	     * @param {PositionedElement[]} elems
	     */
	    function findSqueezables(elems) {
	      var _iteratorNormalCompletion7 = true;
	      var _didIteratorError7 = false;
	      var _iteratorError7 = undefined;

	      try {
	        for (var _iterator7 = (0, _getIterator3.default)(elems), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
	          var elem = _step7.value;

	          if (elem.control.isSqueezable && elem.control.isSqueezable(side)) {
	            insert(elem);
	          }
	          if (elem.hideableChildren) {
	            findSqueezables(elem.hideableChildren);
	          }
	        }
	      } catch (err) {
	        _didIteratorError7 = true;
	        _iteratorError7 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion7 && _iterator7.return) {
	            _iterator7.return();
	          }
	        } finally {
	          if (_didIteratorError7) {
	            throw _iteratorError7;
	          }
	        }
	      }
	    }

	    findSqueezables(elems);

	    var squeezed = 0;

	    var _iteratorNormalCompletion8 = true;
	    var _didIteratorError8 = false;
	    var _iteratorError8 = undefined;

	    try {
	      for (var _iterator8 = (0, _getIterator3.default)(squeezableElements), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
	        var elem = _step8.value;

	        squeezed += elem.control.squeezeBy(side, neededSpace);

	        if (squeezed >= neededSpace) {
	          return true;
	        }
	      }
	    } catch (err) {
	      _didIteratorError8 = true;
	      _iteratorError8 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion8 && _iterator8.return) {
	          _iterator8.return();
	        }
	      } finally {
	        if (_didIteratorError8) {
	          throw _iteratorError8;
	        }
	      }
	    }

	    var _iteratorNormalCompletion9 = true;
	    var _didIteratorError9 = false;
	    var _iteratorError9 = undefined;

	    try {
	      for (var _iterator9 = (0, _getIterator3.default)(squeezableElements), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
	        var _elem2 = _step9.value;

	        _elem2.control.release(side);
	      }
	    } catch (err) {
	      _didIteratorError9 = true;
	      _iteratorError9 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion9 && _iterator9.return) {
	          _iterator9.return();
	        }
	      } finally {
	        if (_didIteratorError9) {
	          throw _iteratorError9;
	        }
	      }
	    }

	    return false;
	  };

	  /**
	   * Expands element to maximum size
	   * @param {PositionedElement} elem
	   * @returns {Array}
	   * @private
	   */


	  Positioning.prototype.expandElement_ = function expandElement_(elem) {
	    var expanded = [];

	    if (elem.hideableChildren) {
	      var _iteratorNormalCompletion10 = true;
	      var _didIteratorError10 = false;
	      var _iteratorError10 = undefined;

	      try {
	        for (var _iterator10 = (0, _getIterator3.default)(elem.hideableChildren), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
	          var child = _step10.value;

	          expanded.push.apply(expanded, (0, _toConsumableArray3.default)(this.expandElement_(child)));
	        }
	      } catch (err) {
	        _didIteratorError10 = true;
	        _iteratorError10 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion10 && _iterator10.return) {
	            _iterator10.return();
	          }
	        } finally {
	          if (_didIteratorError10) {
	            throw _iteratorError10;
	          }
	        }
	      }
	    }
	    if (elem.control.getCollapsible && elem.control.getCollapsible()) {
	      if (elem.control.getCollapsed()) {
	        elem.control.setCollapsed(false);
	        expanded.push(elem.control);
	      }
	    }

	    return expanded;
	  };

	  /**
	   * measures size of the element
	   * @param {PositionedElement} elem
	   * @returns {{width: number, height: number}}
	   * @private
	   */


	  Positioning.prototype.measureExpandedElement_ = function measureExpandedElement_(elem) {
	    var expanded = this.expandElement_(elem);
	    var $elem = elem.control.get$Element();
	    var size = { width: $elem.outerWidth(), height: $elem.outerHeight() };
	    var _iteratorNormalCompletion11 = true;
	    var _didIteratorError11 = false;
	    var _iteratorError11 = undefined;

	    try {
	      for (var _iterator11 = (0, _getIterator3.default)(expanded), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
	        var exp = _step11.value;

	        exp.setCollapsed(true);
	      }
	    } catch (err) {
	      _didIteratorError11 = true;
	      _iteratorError11 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion11 && _iterator11.return) {
	          _iterator11.return();
	        }
	      } finally {
	        if (_didIteratorError11) {
	          throw _iteratorError11;
	        }
	      }
	    }

	    return size;
	  };

	  /**
	   * Hides the least important element of the given ones.
	   * @param {PositionedElement[]} elems visible elements
	   * @private
	   */


	  Positioning.prototype.hideLeastImportant_ = function hideLeastImportant_(elems) {
	    /**
	     * @param {PositionedElement[]} elems
	     * @returns {PositionedElement}
	     */
	    var findLeastImportant = function findLeastImportant(elems) {
	      var leastImportant = void 0;
	      var _iteratorNormalCompletion12 = true;
	      var _didIteratorError12 = false;
	      var _iteratorError12 = undefined;

	      try {
	        for (var _iterator12 = (0, _getIterator3.default)(elems), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
	          var elem = _step12.value;

	          if (!leastImportant) {
	            leastImportant = elem;
	          } else {
	            if (elem.importance < leastImportant.importance) {
	              leastImportant = elem;
	            }
	          }

	          if (elem.hideableChildren) {
	            var hideableChildren = _jquery2.default.grep(elem.hideableChildren, function (el) {
	              return el.visible;
	            });
	            if (hideableChildren.length) {
	              var leastImportantChild = findLeastImportant(hideableChildren);
	              if (leastImportantChild.importance < leastImportant.importance) {
	                leastImportant = leastImportantChild;
	              }
	            }
	          }
	        }
	      } catch (err) {
	        _didIteratorError12 = true;
	        _iteratorError12 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion12 && _iterator12.return) {
	            _iterator12.return();
	          }
	        } finally {
	          if (_didIteratorError12) {
	            throw _iteratorError12;
	          }
	        }
	      }

	      return leastImportant;
	    };

	    var leastImportant = findLeastImportant(elems);
	    leastImportant.visible = false;
	    leastImportant.control.get$Element().addClass(_globals.cssClasses.hidden);
	  };

	  return Positioning;
	}();

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(139);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (obj, key, value) {
	  if (key in obj) {
	    (0, _defineProperty2.default)(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	};

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _from = __webpack_require__(179);

	var _from2 = _interopRequireDefault(_from);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }

	    return arr2;
	  } else {
	    return (0, _from2.default)(arr);
	  }
	};

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(180), __esModule: true };

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(15);
	__webpack_require__(181);
	module.exports = __webpack_require__(23).Array.from;

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx            = __webpack_require__(24)
	  , $export        = __webpack_require__(21)
	  , toObject       = __webpack_require__(58)
	  , call           = __webpack_require__(67)
	  , isArrayIter    = __webpack_require__(68)
	  , toLength       = __webpack_require__(48)
	  , createProperty = __webpack_require__(182)
	  , getIterFn      = __webpack_require__(69);

	$export($export.S + $export.F * !__webpack_require__(76)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $defineProperty = __webpack_require__(27)
	  , createDesc      = __webpack_require__(35);

	module.exports = function(object, index, value){
	  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};

/***/ },
/* 183 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Globals
	 */

	/**
	 * Descriptive identifiers for some keyCodes
	 * @type {object.<string, number>}
	 */
	var keyCodes = exports.keyCodes = {
	  ESCAPE: 27,
	  TAB: 9,
	  ARROW_DOWN: 40,
	  ARROW_UP: 38,
	  ENTER: 13,
	  SHIFT: 16,
	  CTRL: 17
	};

	/**
	 * Names of globally used cssClasses are stored here
	 * @type {object.<string, string>}
	 */
	var cssClasses = exports.cssClasses = {
	  mousedown: 'g4u-mouse-down',
	  clickable: 'g4u-clickable',
	  crosshair: 'g4u-crosshair',
	  hidden: 'g4u-hidden',
	  arrow: 'g4u-arrow',
	  mobile: 'g4u-mobile',
	  desktop: 'g4u-desktop',
	  move: 'g4u-move',
	  active: 'g4u-active',
	  mainButton: 'g4u-control-mainbutton',
	  hasTooltip: 'g4u-has-tooltip',
	  upperCase: 'g4u-uppercase',
	  collapsed: 'g4u-collapsed'
	};

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Move = undefined;

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _openlayers = __webpack_require__(77);

	var _openlayers2 = _interopRequireDefault(_openlayers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @typedef {object} MoveOptions
	 * @property {G4UMap} map
	 * @property {number} [pixelPadding=0] a default padding around the target extent in pixels
	 * @property {number} [meterMinSize=0] the minimal size of the target extent in meters
	 * @property {number} [animationDuration=4000]
	 * @property {boolean} [animations=true]
	 * @property {boolean} [bouncing=false] if the animation should bounce or not
	 */

	/**
	 * @typedef {olx.view.FitOptions} SingleMoveOptions
	 * @property {boolean} [animated] if specified overwrites the default settings
	 * @property {number[]|string} [padding] can be set to 'default' to use the default settings
	 */

	/**
	 * Moves the map. Uses animations if desired.
	 */
	var Move = exports.Move = function () {
	  /**
	   * @param {MoveOptions} options
	   */
	  function Move(options) {
	    (0, _classCallCheck3.default)(this, Move);

	    /**
	     * @type {G4UMap}
	     * @private
	     */
	    this.map_ = options.map;

	    /**
	     * @type {number}
	     * @private
	     */
	    this.pixelPadding_ = options.meterMinSize !== undefined ? 50 : options.pixelPadding;

	    /**
	     * @type {number}
	     * @private
	     */
	    this.meterMinSize_ = options.meterMinSize !== undefined ? options.meterMinSize : 500;

	    /**
	     * @type {number}
	     * @private
	     */
	    this.animationDuration_ = options.animationDuration || 2000;

	    /**
	     * @type {boolean}
	     * @private
	     */
	    this.animations_ = options.animations !== undefined ? options.animations : true;

	    /**
	     * @type {boolean}
	     * @private
	     */
	    this.bouncing_ = options.bouncing !== false;
	  }

	  /**
	   * Turns animations on or off
	   * @param {boolean} animations
	   */


	  Move.prototype.setAnimations = function setAnimations(animations) {
	    this.animations_ = animations;
	  };

	  /**
	   * @returns {boolean}
	   */


	  Move.prototype.getAnimations = function getAnimations() {
	    return this.animations_;
	  };

	  /**
	   * @param {ol.Coordinate} point
	   * @param {SingleMoveOptions} [options={}]
	   */


	  Move.prototype.toPoint = function toPoint(point) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    // calculate extent
	    var tmpView = new _openlayers2.default.View({
	      projection: this.map_.getView().getProjection(),
	      center: point,
	      resolution: this.map_.getView().getResolution()
	    });
	    var extent = tmpView.calculateExtent(this.map_.getSize().map(function (s) {
	      return s - 1;
	    }));

	    options.padding = [0, 0, 0, 0]; // no padding around this extent

	    this.toExtent(extent, options);
	  };

	  /**
	   * @param {ol.Extent} extent
	   * @param {SingleMoveOptions} [options={}]
	   */


	  Move.prototype.toExtent = function toExtent(extent) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    var newExtent = extent;
	    if (this.meterMinSize_) {
	      newExtent = this.bufferUpToMinSize_(extent);
	    }
	    if (options.animated === undefined ? this.animations_ : options.animated) {
	      this.animationZoomToExtent_(newExtent, options);
	    } else {
	      this.fit_(newExtent, options);
	    }
	  };

	  /**
	   * @param {ol.Point} point
	   * @param {SingleMoveOptions} [options={}]
	   */


	  Move.prototype.zoomToPoint = function zoomToPoint(point) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    this.toExtent(_openlayers2.default.extent.boundingExtent([point]), options);
	  };

	  /**
	   * @param {ol.Extent} extent
	   * @returns {ol.Extent}
	   * @private
	   */


	  Move.prototype.bufferUpToMinSize_ = function bufferUpToMinSize_(extent) {
	    var smallerSize = Math.min(_openlayers2.default.extent.getWidth(extent), _openlayers2.default.extent.getHeight(extent));
	    if (smallerSize < this.meterMinSize_) {
	      return _openlayers2.default.extent.buffer(extent, this.meterMinSize_ - smallerSize / 2);
	    } else {
	      return extent;
	    }
	  };

	  /**
	   * @param {ol.Extent} extent
	   * @param {SingleMoveOptions} options
	   * @private
	   */


	  Move.prototype.fit_ = function fit_(extent, options) {
	    if (options.padding === 'default') {
	      options.padding = [this.pixelPadding_, this.pixelPadding_, this.pixelPadding_, this.pixelPadding_];
	    }

	    // options.constrainResolution = false

	    // using fit's padding option
	    this.map_.getView().fit(_openlayers2.default.geom.Polygon.fromExtent(extent), this.map_.getSize(), options);
	  };

	  /**
	   * This function glides or bounces to an extent
	   * @param {ol.Extent} endExtent
	   * @param {SingleMoveOptions} options
	   * @private
	   */


	  Move.prototype.animationZoomToExtent_ = function animationZoomToExtent_(endExtent, options) {
	    var _this = this;

	    var map = this.map_;
	    var view = map.getView();
	    var size = map.getSize();

	    var startExtent = view.calculateExtent(size);
	    var startPoint = view.getCenter();

	    var startResolution = view.getResolution();
	    var moveExtent = _openlayers2.default.extent.extend(startExtent.slice(0), endExtent); // a extent where both extents are contained.
	    var duration = _openlayers2.default.extent.intersects(startExtent, endExtent) ? this.animationDuration_ / 2 : this.animationDuration_;

	    if (this.bouncing_ && !_openlayers2.default.extent.intersects(startExtent, endExtent)) {
	      var pan1 = _openlayers2.default.animation.pan({
	        duration: duration,
	        source: startPoint
	      });

	      var zoom1 = _openlayers2.default.animation.zoom({
	        duration: duration,
	        resolution: startResolution,
	        easing: _openlayers2.default.easing.easeOut
	      });

	      map.beforeRender(pan1, zoom1);
	      this.fit_(moveExtent, options);

	      window.setTimeout(function () {
	        var pan2 = _openlayers2.default.animation.pan({
	          duration: duration,
	          source: view.getCenter() // ,
	        });

	        var zoom2 = _openlayers2.default.animation.zoom({
	          duration: duration,
	          resolution: view.getResolution(),
	          easing: _openlayers2.default.easing.easeIn
	        });

	        map.beforeRender(pan2, zoom2);

	        _this.fit_(endExtent, options);
	      }, duration);
	    } else {
	      var pan = _openlayers2.default.animation.pan({
	        duration: duration,
	        source: startPoint
	      });

	      var zoom = _openlayers2.default.animation.zoom({
	        duration: duration,
	        resolution: startResolution
	      });

	      map.beforeRender(pan, zoom);

	      this.fit_(endExtent, options);
	    }
	  };

	  /**
	   * Easing function based on a circle function
	   * @param {number} t
	   * @returns {number}
	   * @private
	   */


	  Move.prototype.earlyFastRiseEasing_ = function earlyFastRiseEasing_(t) {
	    return Math.sqrt(2 * t - Math.pow(t, 2));
	  };

	  /**
	   * Easing function based on a circle function
	   * @param {number} t
	   * @returns {number}
	   * @private
	   */


	  Move.prototype.lateFastRiseEasing_ = function lateFastRiseEasing_(t) {
	    return 1 - Math.sqrt(1 - Math.pow(t, 2));
	  };

	  /**
	   * Easing function based on a parabolic function
	   * @param {number} t
	   * @returns {number}
	   * @private
	   */


	  Move.prototype.earlyFastRiseEasing2_ = function earlyFastRiseEasing2_(t) {
	    return -Math.pow(t - 1, 2) + 1;
	  };

	  /**
	   * Easing function based on a parabolic function
	   * @param {number} t
	   * @returns {number}
	   * @private
	   */


	  Move.prototype.lateFastRiseEasing2_ = function lateFastRiseEasing2_(t) {
	    return Math.pow(t, 2);
	  };

	  return Move;
	}();

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.FeaturePopup = undefined;

	var _promise = __webpack_require__(12);

	var _promise2 = _interopRequireDefault(_promise);

	var _toConsumableArray2 = __webpack_require__(178);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	var _getIterator2 = __webpack_require__(105);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _map = __webpack_require__(108);

	var _map2 = _interopRequireDefault(_map);

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(120);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(121);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _openlayers = __webpack_require__(77);

	var _openlayers2 = _interopRequireDefault(_openlayers);

	var _jquery = __webpack_require__(78);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _flatten = __webpack_require__(186);

	var _flatten2 = _interopRequireDefault(_flatten);

	var _Window = __webpack_require__(197);

	var _globals = __webpack_require__(183);

	var _utilities = __webpack_require__(138);

	var _Debug = __webpack_require__(151);

	__webpack_require__(205);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @typedef {object} FeaturePopupOptions
	 * @property {string} [className='g4u-featurepopup']
	 * @property {number[]} [offset=[0,0]]
	 * @property {ol.OverlayPositioning} [positioning='center-center']
	 * @property {number[]} [iconSizedOffset=[0,0]]
	 * @property {boolean} [centerOnPopup=false]
	 * @property {boolean} [animated=true]
	 * @property {string[]} [mutators] default mutators to use
	 */

	/**
	 * @typedef {function} Mutator
	 * @param {string} text
	 * @returns {string}
	 */

	/**
	 * Displays a Popup bound to a geographical position via an ol.Overlay
	 */
	var FeaturePopup = exports.FeaturePopup = function (_ol$Object) {
	  (0, _inherits3.default)(FeaturePopup, _ol$Object);

	  /**
	   * @param {FeaturePopupOptions} options
	   */
	  function FeaturePopup() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    (0, _classCallCheck3.default)(this, FeaturePopup);

	    /**
	     * @type {string}
	     * @private
	     */
	    var _this = (0, _possibleConstructorReturn3.default)(this, _ol$Object.call(this));

	    _this.className_ = options.hasOwnProperty('className') ? options.className : 'g4u-featurepopup';

	    /**
	     * @type {string}
	     * @private
	     */
	    _this.classNameFeatureName_ = _this.className_ + '-feature-name';

	    /**
	     * @type {string}
	     * @private
	     */
	    _this.classNameFeatureDescription_ = _this.className_ + '-feature-description';

	    /**
	     * @type {jQuery}
	     * @private
	     */
	    _this.$name_ = (0, _jquery2.default)('<h3>').addClass(_this.classNameFeatureName_);

	    /**
	     * @type {jQuery}
	     * @private
	     */
	    _this.$description_ = (0, _jquery2.default)('<p>').addClass(_this.classNameFeatureDescription_);

	    /**
	     * @type {null|ol.Feature}
	     * @private
	     */
	    _this.feature_ = null;

	    /**
	     * @type {boolean}
	     * @private
	     */
	    _this.visible_ = false;

	    /**
	     * @type {VectorLayer[]}
	     * @private
	     */
	    _this.referencingVisibleLayers_ = [];

	    /**
	     * @type {number[]}
	     * @private
	     */
	    _this.pixelOffset_ = options.hasOwnProperty('offset') ? options.offset : [0, 0];

	    /**
	     * @type {number[]}
	     * @private
	     */
	    _this.iconSizedOffset_ = options.hasOwnProperty('iconSizedOffset') ? options.iconSizedOffset : [0, 0];

	    /**
	     * @type {boolean}
	     * @private
	     */
	    _this.centerOnPopup_ = options.hasOwnProperty('centerOnPopup') ? options.centerOnPopup : true;

	    /**
	     * @type {boolean}
	     * @private
	     */
	    _this.centerOnPopupInitial_ = _this.centerOnPopup_;

	    /**
	     * @type {boolean}
	     * @private
	     */
	    _this.animated_ = options.hasOwnProperty('animated') ? options.animated : true;

	    /**
	     * @type {jQuery}
	     * @private
	     */
	    _this.$element_ = (0, _jquery2.default)('<div>').addClass(_this.className_).addClass(_globals.cssClasses.hidden);

	    /**
	     * @type {ol.Overlay}
	     * @private
	     */
	    _this.overlay_ = new _openlayers2.default.Overlay({
	      element: _this.$element_.get(0),
	      offset: _this.pixelOffset_,
	      positioning: options.hasOwnProperty('positioning') ? options.positioning : 'center-center',
	      stopEvent: false
	    });

	    _this.overlay_.setOffset(_this.pixelOffset_);

	    /**
	     * @type {Map.<string,function>}
	     * @private
	     */
	    _this.mutators_ = new _map2.default();

	    /**
	     * @type {string[]}
	     * @private
	     */
	    _this.defaultMutators_ = options.mutators || [];

	    /**
	     * @type {string[]}
	     * @private
	     */
	    _this.useMutators_ = [];

	    /**
	     * @type {?Window}
	     * @private
	     */
	    _this.window_ = null;

	    /**
	     * @type {?G4UMap}
	     * @private
	     */
	    _this.map__ = null;
	    return _this;
	  }

	  /**
	   * @param {ol.Feature} feature
	   * @returns {boolean}
	   */


	  FeaturePopup.canDisplay = function canDisplay(feature) {
	    return !feature.get('disabled') && (feature.get('name') || feature.get('description'));
	  };

	  /**
	   * @param {G4UMap} map
	   */


	  FeaturePopup.prototype.setMap = function setMap(map) {
	    var _this3 = this;

	    var popup = this;

	    var sourceOnFeatureRemove = function sourceOnFeatureRemove(e) {
	      var _this2 = this;

	      if (e.feature === popup.getFeature()) {
	        (function () {
	          var source = _this2;
	          popup.referencingVisibleLayers_.forEach(function (layer) {
	            if (layer.getSource() === source) {
	              popup.removeReferencingLayer_(layer);
	            }
	          });
	        })();
	      }
	    };

	    var layerOnChangeVisible = function layerOnChangeVisible() {
	      if (this.getVisible() === false) {
	        if (this.getSource().getFeatures().indexOf(popup.getFeature()) > -1) {
	          popup.removeReferencingLayer_(this);
	        }
	      } else {
	        if (this.getSource().getFeatures().indexOf(popup.getFeature()) > -1) {
	          popup.referencingVisibleLayers_.push(this);
	        }
	      }
	    };

	    var onForEachLayer = function onForEachLayer(layer) {
	      if (layer.getSource && layer.getSource().getFeatures) {
	        layer.getSource().on('removefeature', sourceOnFeatureRemove);
	        layer.on('change:visible', layerOnChangeVisible);
	      }
	    };

	    var unForEachLayer = function unForEachLayer(layer) {
	      if (layer.getSource && layer.getSource().getFeatures) {
	        layer.getSource().un('removefeature', sourceOnFeatureRemove);
	        layer.un('change:visible', layerOnChangeVisible);
	      }
	    };

	    var onLayerAdd = function onLayerAdd(e) {
	      onForEachLayer(e.element);
	    };

	    var onMapChangeMobile = function onMapChangeMobile() {
	      if (map.get('mobile')) {
	        _this3.centerOnPopup_ = false;
	      } else {
	        _this3.centerOnPopup_ = _this3.centerOnPopupInitial_;
	      }
	    };

	    if (this.getMap()) {
	      this.getMap().removeInteraction(this.featureClick_);
	      this.getMap().getLayerGroup().recursiveForEach(unForEachLayer);
	      this.getMap().getLayerGroup().un('add', onLayerAdd);
	      this.getMap().removeInteraction(this.featureHover_);
	      this.getMap().removeOverlay(this.overlay_);
	      this.getMap().un('change:mobile', onMapChangeMobile);
	    }

	    if (map) {
	      this.window_ = new _Window.Window({ draggable: false, fixedPosition: true, map: map });

	      this.window_.get$Body().append(this.$name_).append(this.$description_);

	      this.window_.on('change:visible', function () {
	        if (!_this3.window_.getVisible()) {
	          _this3.setVisible(false); // notifying the featurepopup about the closing of the window
	        }
	      });

	      this.$element_.append(this.window_.get$Element());

	      // feature click

	      map.getDefaultInteractions('singleclick')[0].on('select', function (e) {
	        var selected = e.selected.filter(FeaturePopup.canDisplay);
	        if (selected.length) {
	          _this3.onFeatureClick_(selected[0]);
	          e.target.getFeatures().remove(selected[0]); // remove feature to be able to select feature again
	          e.target.changed();
	        }
	      });

	      // feature hover

	      map.getDefaultInteractions('pointermove')[0].on('select', function (e) {
	        var selected = e.selected.filter(FeaturePopup.canDisplay);
	        var deselected = e.deselected.filter(FeaturePopup.canDisplay);
	        if (selected.length) {
	          (0, _jquery2.default)(map.getViewport()).addClass(_globals.cssClasses.clickable);
	        } else if (deselected.length) {
	          (0, _jquery2.default)(map.getViewport()).removeClass(_globals.cssClasses.clickable);
	        }
	      });

	      // hiding feature Popup if the layer gets hidden or the feature gets removed

	      map.getLayerGroup().recursiveForEach(onForEachLayer);
	      map.getLayerGroup().getLayers().on('add', onLayerAdd);

	      map.addOverlay(this.overlay_);

	      this.$element_.parent().addClass(this.className_ + '-container');

	      // disable scrolling of body and zooming into map while in the feature popup
	      this.window_.get$Element().on('mousewheel wheel DOMMouseScroll', function (e) {
	        e.stopPropagation();
	        e.preventDefault();
	      });

	      onMapChangeMobile();
	      map.on('change:mobile', onMapChangeMobile);

	      // limiting size

	      map.once('postrender', function () {
	        _this3.window_.updateSize();
	      });
	    }

	    this.map__ = map;
	  };

	  /**
	   * @param {ol.Feature} feature
	   * @private
	   */


	  FeaturePopup.prototype.onFeatureClick_ = function onFeatureClick_(feature) {
	    var _this4 = this;

	    this.referencingVisibleLayers_ = [];

	    this.getMap().getLayerGroup().recursiveForEach(function (layer) {
	      if (layer.getVisible() && layer.getSource && layer.getSource().getFeatures) {
	        if (layer.getSource().getFeatures().indexOf(feature) > -1) {
	          _this4.referencingVisibleLayers_.push(layer);
	        }
	      }
	    });

	    this.setFeature(feature);
	    this.setVisible(true);

	    if (this.centerOnPopup_) {
	      this.centerMapOnPopup();
	    }
	  };

	  /**
	   * @param {VectorLayer} layer
	   * @private
	   */


	  FeaturePopup.prototype.removeReferencingLayer_ = function removeReferencingLayer_(layer) {
	    this.referencingVisibleLayers_.splice(this.referencingVisibleLayers_.indexOf(layer), 1);
	    if (this.referencingVisibleLayers_.length === 0) {
	      this.setVisible(false);
	    }
	  };

	  /**
	   * @returns {G4UMap}
	   */


	  FeaturePopup.prototype.getMap = function getMap() {
	    return this.map__;
	  };

	  /**
	   * @returns {null|ol.Feature}
	   */


	  FeaturePopup.prototype.getFeature = function getFeature() {
	    return this.feature_;
	  };

	  /**
	   * register a text mutator with a name. Which mutator is finally used can be adjusted via the config files.
	   * @param {string} name
	   * @param {Mutator} mutator
	   */


	  FeaturePopup.prototype.registerMutator = function registerMutator(name, mutator) {
	    this.mutators_.set(name, mutator);
	  };

	  /**
	   * Update the Popup. Call this if something in the feature has changed
	   */


	  FeaturePopup.prototype.update = function update() {
	    var _this5 = this;

	    if (this.getFeature()) {
	      (function () {
	        var feature = _this5.getFeature();

	        var updateContent = function updateContent() {
	          var name = feature.get('name');
	          var description = feature.get('description');

	          if (name) {
	            _this5.$name_.html(name);
	          }

	          if (description) {
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	              for (var _iterator = (0, _getIterator3.default)(_this5.useMutators_), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                var m = _step.value;

	                var mutator = _this5.mutators_.get(m);
	                if (mutator) {
	                  description = mutator(description);
	                } else {
	                  _Debug.Debug.error('Trying to use unregistered mutator ' + m);
	                }
	              }
	            } catch (err) {
	              _didIteratorError = true;
	              _iteratorError = err;
	            } finally {
	              try {
	                if (!_iteratorNormalCompletion && _iterator.return) {
	                  _iterator.return();
	                }
	              } finally {
	                if (_didIteratorError) {
	                  throw _iteratorError;
	                }
	              }
	            }

	            _this5.$description_.html(description);
	          }

	          if (_this5.getVisible() && _this5.window_ && _this5.window_.updateSize) {
	            _this5.window_.updateSize();
	          }
	        };

	        _this5.$name_.empty();
	        _this5.$description_.empty();

	        updateContent(); // this produces one unnecessary call to window.updateSize()

	        if (!feature.get('observedByPopup')) {
	          feature.on('change:name', updateContent);
	          feature.on('change:description', updateContent);
	          feature.set('observedByPopup', true);
	        }

	        _this5.once('change:feature', function () {
	          feature.un('change:name', updateContent);
	          feature.un('change:description', updateContent);
	          feature.set('observedByPopup', false);
	        });

	        if (!_this5.getMap().get('mobile')) {
	          var resolution = _this5.getMap().getView().getResolution();

	          _this5.addIconSizedOffset(_this5.getFeature(), resolution);
	        }

	        // apply default offset

	        if (_this5.getVisible()) {
	          setTimeout(function () {
	            return _this5.window_.updateSize();
	          }, 0);
	        }
	      })();
	    }
	  };

	  /**
	   * The feature should have a property 'name' and/or 'description' to be shown inside of the popup.
	   * @param {ol.Feature} feature
	   * @param {string[]} [optMutators=[]]
	   */


	  FeaturePopup.prototype.setFeature = function setFeature(feature) {
	    var _this6 = this;

	    var optMutators = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	    var oldValue = this.feature_;
	    if (oldValue !== feature) {
	      var geometry = feature.getGeometry();
	      var coord = _openlayers2.default.extent.getCenter(geometry.getExtent());

	      this.overlay_.setPosition(coord);

	      if (this.feature_) {
	        this.feature_.un('change:geometry', this.geometryChangeHandler_);
	      }
	      this.feature_ = feature;
	      this.useMutators_ = [].concat((0, _toConsumableArray3.default)(this.defaultMutators_), (0, _toConsumableArray3.default)(optMutators));
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = (0, _getIterator3.default)(this.referencingVisibleLayers_), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var layer = _step2.value;

	          this.useMutators_ = this.useMutators_.concat((0, _flatten2.default)(layer.get('mutators')));
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }

	      this.geometryChangeHandler_ = function () {
	        _this6.overlay_.setPosition(_openlayers2.default.extent.getCenter(_this6.feature_.getGeometry().getExtent()));
	        if (_this6.getVisible()) {
	          _this6.update();
	        }
	      };
	      this.feature_.on('change:geometry', this.geometryChangeHandler_);
	      this.dispatchEvent({
	        type: 'change:feature',
	        oldValue: oldValue,
	        key: 'feature'
	      });

	      this.update();
	    }
	  };

	  /**
	   * @returns {boolean}
	   */


	  FeaturePopup.prototype.getVisible = function getVisible() {
	    return this.visible_;
	  };

	  /**
	   * @param {boolean} visible
	   */


	  FeaturePopup.prototype.setVisible = function setVisible(visible) {
	    var _this7 = this;

	    var oldValue = this.visible_;
	    if (oldValue !== visible) {
	      if (visible === true && this.getFeature()) {
	        this.$element_.removeClass(_globals.cssClasses.hidden);
	        this.window_.setVisible(true);
	      } else {
	        this.$element_.addClass(_globals.cssClasses.hidden);
	        this.window_.setVisible(false);
	      }

	      this.visible_ = visible;

	      this.dispatchEvent({
	        type: 'change:visible',
	        oldValue: oldValue,
	        key: 'visible'
	      });
	    }

	    if (visible) {
	      setTimeout(function () {
	        return _this7.window_.updateSize();
	      }, 0);
	    }
	  };

	  /**
	   * calculates iconSized Offset and applies it
	   * @param {ol.Feature} feature
	   * @param {number} resolution
	   */

	  FeaturePopup.prototype.addIconSizedOffset = function addIconSizedOffset(feature, resolution) {
	    var _this8 = this;

	    if (this.iconSizedOffset_[0] !== 0 || this.iconSizedOffset_[1] !== 0) {
	      var featureStyleFunction = feature.getStyleFunction();
	      if (featureStyleFunction) {
	        var style = featureStyleFunction.call(feature, resolution)[0];
	        if (style) {
	          (function () {
	            var imageStyle = style.getImage();
	            if (imageStyle instanceof _openlayers2.default.style.Icon) {
	              new _promise2.default(function (resolve) {
	                var img = imageStyle.getImage();
	                if (img.complete && img.src) {
	                  resolve();
	                } else {
	                  img.addEventListener('load', function () {
	                    _this8.getMap().render(); // initiate styles with size and anchor
	                    _this8.getMap().once('postcompose', resolve);
	                  });
	                  imageStyle.load();
	                }
	              }).then(function () {
	                var iconSize = imageStyle.getSize();

	                var totalOffset = [_this8.pixelOffset_[0] + _this8.iconSizedOffset_[0] * iconSize[0] * imageStyle.getScale(), _this8.pixelOffset_[1] + _this8.iconSizedOffset_[1] * iconSize[1] * imageStyle.getScale()];

	                _this8.overlay_.setOffset(totalOffset);
	              });
	            }
	          })();
	        }
	      }
	    }
	  };

	  /**
	   * Centers the map on the popup after all images have been loaded
	   */


	  FeaturePopup.prototype.centerMapOnPopup = function centerMapOnPopup(animated) {
	    var _this9 = this;

	    animated = animated === undefined ? this.animated_ : animated;

	    var _centerMap = function _centerMap() {
	      _this9.window_.updateSize();
	      _this9.getMap().get('move').toPoint(_this9.getCenter(), { animated: animated });
	    };

	    (0, _utilities.finishAllImages)(this.window_.get$Body()).then(function () {
	      // we need to do this trick to find out if map is already visible/started rendering
	      if (_this9.getMap().getPixelFromCoordinate([0, 0])) {
	        _centerMap();
	      } else {
	        _this9.getMap().once('postrender', _centerMap);
	      }
	    });
	  };

	  /**
	   * calculates Center of the Popup. Be careful, this calculation repositions the popup to calculate the center
	   * properly and repostions to the initial Position again.
	   * This does only work if the popup is already visible!
	   * @returns {ol.Coordinate}
	   */


	  FeaturePopup.prototype.getCenter = function getCenter() {
	    var offset = this.overlay_.getOffset();

	    var pixelPosition = this.getMap().getPixelFromCoordinate(this.overlay_.getPosition());

	    // apply offset
	    pixelPosition[0] += offset[0];
	    pixelPosition[1] += offset[1];

	    // applay width/height depending on positioning
	    var positioning = this.overlay_.getPositioning().split('-');

	    var width = this.$element_.outerWidth();
	    var height = this.$element_.outerHeight();

	    if (positioning[1] === 'left') {
	      pixelPosition[0] += width / 2;
	    }
	    if (positioning[1] === 'right') {
	      pixelPosition[0] -= width / 2;
	    }

	    if (positioning[0] === 'top') {
	      pixelPosition[1] += height / 2;
	    }
	    if (positioning[0] === 'bottom') {
	      pixelPosition[1] -= height / 2;
	    }

	    return this.getMap().getCoordinateFromPixel(pixelPosition);
	  };

	  return FeaturePopup;
	}(_openlayers2.default.Object);

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	var baseFlatten = __webpack_require__(187);

	/**
	 * Flattens `array` a single level deep.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {Array} array The array to flatten.
	 * @returns {Array} Returns the new flattened array.
	 * @example
	 *
	 * _.flatten([1, [2, [3, [4]], 5]]);
	 * // => [1, 2, [3, [4]], 5]
	 */
	function flatten(array) {
	  var length = array ? array.length : 0;
	  return length ? baseFlatten(array, 1) : [];
	}

	module.exports = flatten;


/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(188),
	    isFlattenable = __webpack_require__(189);

	/**
	 * The base implementation of `_.flatten` with support for restricting flattening.
	 *
	 * @private
	 * @param {Array} array The array to flatten.
	 * @param {number} depth The maximum recursion depth.
	 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
	 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
	 * @param {Array} [result=[]] The initial result value.
	 * @returns {Array} Returns the new flattened array.
	 */
	function baseFlatten(array, depth, predicate, isStrict, result) {
	  var index = -1,
	      length = array.length;

	  predicate || (predicate = isFlattenable);
	  result || (result = []);

	  while (++index < length) {
	    var value = array[index];
	    if (depth > 0 && predicate(value)) {
	      if (depth > 1) {
	        // Recursively flatten arrays (susceptible to call stack limits).
	        baseFlatten(value, depth - 1, predicate, isStrict, result);
	      } else {
	        arrayPush(result, value);
	      }
	    } else if (!isStrict) {
	      result[result.length] = value;
	    }
	  }
	  return result;
	}

	module.exports = baseFlatten;


/***/ },
/* 188 */
/***/ function(module, exports) {

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;

	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}

	module.exports = arrayPush;


/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(190),
	    isArguments = __webpack_require__(193),
	    isArray = __webpack_require__(196);

	/** Built-in value references. */
	var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

	/**
	 * Checks if `value` is a flattenable `arguments` object or array.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
	 */
	function isFlattenable(value) {
	  return isArray(value) || isArguments(value) ||
	    !!(spreadableSymbol && value && value[spreadableSymbol]);
	}

	module.exports = isFlattenable;


/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(191);

	/** Built-in value references. */
	var Symbol = root.Symbol;

	module.exports = Symbol;


/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(192);

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	module.exports = root;


/***/ },
/* 192 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	module.exports = freeGlobal;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsArguments = __webpack_require__(194),
	    isObjectLike = __webpack_require__(195);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
	  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
	    !propertyIsEnumerable.call(value, 'callee');
	};

	module.exports = isArguments;


/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(195);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * The base implementation of `_.isArguments`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 */
	function baseIsArguments(value) {
	  return isObjectLike(value) && objectToString.call(value) == argsTag;
	}

	module.exports = baseIsArguments;


/***/ },
/* 195 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 196 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	module.exports = isArray;


/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Window = undefined;

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(120);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(121);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _openlayers = __webpack_require__(77);

	var _openlayers2 = _interopRequireDefault(_openlayers);

	var _jquery = __webpack_require__(78);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _utilities = __webpack_require__(138);

	var _html = __webpack_require__(198);

	var _globals = __webpack_require__(183);

	var _iscroll = __webpack_require__(199);

	var _iscroll2 = _interopRequireDefault(_iscroll);

	__webpack_require__(200);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @typedef {object} WindowOptions
	 * @property {boolean} [draggable=false]
	 * @property {string} [id] an html id for the outer window element
	 * @property {string} [className] an alternative html class name to use instead of 'g4u-window', not recommended
	 * @property {G4UMap} [map] the map the window should be shown on. The viewport will be set as the context of the window
	 * @property {jQuery} [$context] context the window is shown in
	 * @property {boolean} [visible=false] the visibility of the window on start up
	 * @property {boolean} [fixedPosition=false] if the window is movable or not
	 */

	/**
	 * A HTML Window
	 */
	var Window = exports.Window = function (_ol$Object) {
	  (0, _inherits3.default)(Window, _ol$Object);

	  /**
	   * @param {WindowOptions} options
	   */
	  function Window() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    (0, _classCallCheck3.default)(this, Window);

	    /**
	     * @type {string}
	     * @private
	     */
	    var _this = (0, _possibleConstructorReturn3.default)(this, _ol$Object.call(this));

	    _this.className_ = options.hasOwnProperty('className') ? options.className : 'g4u-window';

	    /**
	     * @type {string}
	     * @private
	     */
	    _this.classNameBody_ = _this.className_ + '-content';

	    /**
	     * @type {string}
	     * @private
	     */
	    _this.classNameButtonClose_ = _this.className_ + '-button-close';

	    /**
	     * @type {jQuery}
	     * @private
	     */
	    _this.$element_ = (0, _jquery2.default)('<div>').addClass(_this.className_).on('click', function (e) {
	      return e.stopPropagation();
	    });

	    /**
	     * @type {jQuery}
	     * @private
	     */
	    _this.$positionWrapper_ = (0, _jquery2.default)('<div>').addClass(_this.className_ + '-inner-position');

	    /**
	     * @type {jQuery}
	     * @private
	     */
	    _this.$scrollWrapper_ = (0, _jquery2.default)('<div>').addClass(_this.className_ + '-scroll-wrap');

	    /**
	     * @type {jQuery}
	     * @private
	     */
	    _this.$body_ = (0, _jquery2.default)('<div>').addClass(_this.classNameBody_);

	    /**
	     * @type {jQuery}
	     * @private
	     */
	    _this.$button_ = (0, _jquery2.default)('<button>').addClass(_this.classNameButtonClose_);

	    _this.$element_.append(_this.$button_).append(_this.$positionWrapper_.append(_this.$scrollWrapper_.append(_this.$body_))).addClass(_globals.cssClasses.hidden);

	    if (options.hasOwnProperty('id')) {
	      _this.$element_.attr('id', options.id);
	    }

	    _this.$button_.on('click', function () {
	      return _this.setVisible(false);
	    });

	    /**
	     * @type {boolean}
	     * @private
	     */
	    _this.draggable_ = options.hasOwnProperty('draggable') ? options.draggable : true;

	    /**
	     * @type {boolean}
	     * @private
	     */
	    _this.fixedPosition_ = options.fixedPosition === true;

	    /**
	     * @type {G4UMap}
	     * @private
	     */
	    _this.map_ = options.map;

	    /**
	     * @type {jQuery}
	     * @private
	     */
	    _this.$context_ = (0, _jquery2.default)(_this.map_.getTarget());
	    var initialDraggable = _this.draggable_;

	    _this.map_.asSoonAs('ready', true, function () {
	      _this.map_.on('resize', function () {
	        return _this.updateSize(true);
	      });

	      var onChangeMobile = function onChangeMobile() {
	        if (_this.map_.get('mobile')) {
	          _this.draggable_ = false;
	          _this.setIScrollEnabled_(true);
	        } else {
	          _this.draggable_ = initialDraggable;
	          _this.setIScrollEnabled_(false);
	        }
	        _this.updateSize();
	      };

	      onChangeMobile();
	      _this.map_.on('change:mobile', onChangeMobile);
	    });

	    _this.makeWindowDraggable_();

	    // get window in front if clicked

	    _this.$element_.on('mousedown', function () {
	      _this.getInFront();
	    });

	    /**
	     * @type {boolean}
	     * @private
	     */
	    _this.visible_ = false;
	    _this.setVisible(options.hasOwnProperty('visible') ? options.visible : false);

	    /**
	     * @type {boolean}
	     * @private
	     */
	    _this.shieldActivated_ = false;
	    return _this;
	  }

	  /**
	   * Makes the Window draggable
	   * @private
	   */


	  Window.prototype.makeWindowDraggable_ = function makeWindowDraggable_() {
	    var _this2 = this;

	    var clickPosX = 0;
	    var clickPosY = 0;

	    var preventClick = false;
	    var moving = false;

	    this.$context_.on('mousemove', function (e) {
	      if (moving) {
	        if (e.clientY - clickPosY !== _this2.$element_.offset().top || e.clientX - clickPosX !== _this2.$element_.offset().left) {
	          preventClick = true;
	          _this2.$element_.css('position', 'absolute');
	          _this2.$element_.offset({ top: e.clientY - clickPosY, left: e.clientX - clickPosX });
	          e.stopPropagation();
	        }
	      }
	    });

	    this.$button_.on('mousedown', function (e) {
	      if (!(0, _jquery2.default)(e.target).is('input, textarea') && _this2.draggable_) {
	        clickPosX = e.clientX - _this2.$element_.offset().left;
	        clickPosY = e.clientY - _this2.$element_.offset().top;
	        moving = true;
	      }
	    });

	    this.$element_.get(0).addEventListener('click', function (e) {
	      if (preventClick && _this2.draggable_) {
	        preventClick = false;
	        e.preventDefault();
	        e.stopPropagation();
	      }
	    }, true);

	    this.$context_.on('mouseup', function () {
	      moving = false;
	    });
	  };

	  /**
	   * Enables/Disables the iscroll needed for mobile scrolling
	   * @param {boolean} scrollable
	   * @private
	   */


	  Window.prototype.setIScrollEnabled_ = function setIScrollEnabled_(scrollable) {
	    if (scrollable) {
	      if (!this.scroll_) {
	        this.scroll_ = new _iscroll2.default(this.$scrollWrapper_.get(0), {
	          mouseWheel: true,
	          scrollbars: true,
	          momentum: false,
	          interactiveScrollbars: true,
	          // bounce: true,
	          click: true,
	          keyBindings: true,
	          disablePointer: true,
	          disableTouch: true,
	          disableMouse: false,
	          eventPassthrough: false
	        });
	      }
	    } else {
	      if (this.scroll_) {
	        this.scroll_.scrollTo(0, 0, 0);
	        this.scroll_.destroy();
	      }
	      this.scroll_ = null;
	    }
	  };

	  /**
	   * Moves the window in front of all other elements inside its context
	   */


	  Window.prototype.getInFront = function getInFront() {
	    (0, _html.getInFront)(this.$element_, this.$context_);
	  };

	  /**
	   * @param {boolean} visible
	   */


	  Window.prototype.setVisible = function setVisible(visible) {
	    var oldValue = this.visible_;
	    if (oldValue !== visible) {
	      if (visible) {
	        this.$element_.removeClass(_globals.cssClasses.hidden);
	        if (this.map_.get('mobile')) {
	          this.map_.get('shield').setActive(true);
	          this.map_.get('shield').add$OnTop(this.$element_);
	          this.shieldActivated_ = true;
	        } else if (!this.map_.get('shield').getActive()) {
	          this.getInFront();
	        }
	      } else {
	        if (this.shieldActivated_) {
	          this.map_.get('shield').setActive(false);
	          this.map_.get('shield').remove$OnTop(this.$element_);
	          this.shieldActivated_ = false;
	        }

	        this.$element_.addClass(_globals.cssClasses.hidden);
	        this.$element_.css('top', '');
	        this.$element_.css('left', '');
	      }
	      this.visible_ = visible;
	      this.updateSize(true);
	      this.dispatchEvent({ type: 'change:visible', oldValue: oldValue, newValue: visible });
	    }
	  };

	  /**
	   * @returns {boolean}
	   */


	  Window.prototype.getVisible = function getVisible() {
	    return this.visible_;
	  };

	  /**
	   * @returns {jQuery}
	   */


	  Window.prototype.get$Body = function get$Body() {
	    return this.$body_;
	  };

	  /**
	   * @returns {jQuery}
	   */


	  Window.prototype.get$Element = function get$Element() {
	    return this.$element_;
	  };

	  /**
	   * Fixes width and height depending on the current content on the popup.
	   * needs to be called when the window is visible.
	   * @param {boolean} [initialize=false]
	   */


	  Window.prototype.updateSize = function updateSize() {
	    var initialize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	    var margin = 0;

	    if (this.getVisible()) {
	      if (!this.map_.get('mobile')) {
	        // desktop
	        margin = 50;

	        var maxWidth = this.$context_.innerWidth() - 2 * margin;
	        var maxHeight = this.$context_.innerHeight() - 2 * margin;

	        // storing values
	        var position = this.$element_.css('position');
	        var top = this.$element_.css('top');
	        var left = this.$element_.css('left');

	        // reset position to get default value
	        this.$element_.css('position', '');

	        // resetting all directly setted values
	        this.$element_.css('top', '');
	        this.$element_.css('left', '');
	        this.$element_.css('width', '');
	        this.$element_.css('height', '');

	        this.get$Body().css('max-height', '');

	        // position element so it can be measured
	        this.$element_.css('position', 'fixed');
	        this.$element_.css('top', '0px');
	        this.$element_.css('left', '0px');

	        // clearing fixed size and height

	        this.$element_.css('width', 'auto');
	        this.$element_.css('height', 'auto');

	        // calculate width & height

	        var calcWidth = this.$element_.outerWidth();
	        var calcHeight = this.$element_.outerHeight();

	        var width = Math.min(calcWidth, maxWidth);
	        var height = Math.min(calcHeight, maxHeight);

	        this.$element_.css('width', width);
	        this.$element_.css('height', height);

	        // setting max-height for the scroll bar
	        // i assume here there is no margin and no padding on the parent element
	        var padding = parseInt(this.get$Body().css('padding-top').split('px')[0]) + parseInt(this.get$Body().css('padding-bottom').split('px')[0]);
	        this.get$Body().css('max-height', this.get$Element().innerHeight() - this.$button_.outerHeight() - padding);

	        this.$element_.css('position', position);

	        if (initialize && !this.fixedPosition_) {
	          // getting initial values
	          top = this.$element_.css('top');
	          left = this.$element_.css('left');

	          // initialize_ at top middle
	          var off = (0, _utilities.offset)(this.$context_, this.$element_);

	          var sideDist = (this.$context_.width() - width) / 2;
	          var topDist = margin;

	          var topPixel = top === 'auto' ? 0 : parseInt(top);
	          var leftPixel = left === 'auto' ? 0 : parseInt(left);

	          this.$element_.css('top', topPixel + off.top + topDist);
	          this.$element_.css('left', leftPixel + off.left + sideDist);
	        } else {
	          // move back to old position
	          this.$element_.css('top', top);
	          this.$element_.css('left', left);
	        }
	      } else {
	        // mobile
	        margin = 10;

	        var _maxWidth = this.$context_.innerWidth() - 2 * margin;
	        var _maxHeight = this.$context_.innerHeight() - 2 * margin;

	        this.get$Body().css('max-height', '');
	        this.$element_.css('width', _maxWidth);
	        this.$element_.css('height', _maxHeight);

	        var contextOff = this.$context_.offset();

	        this.$element_.css('left', margin + contextOff.left);
	        this.$element_.css('top', margin + contextOff.top);
	      }

	      if (this.get$Body().children(':not(.' + _globals.cssClasses.hidden + ')').length === 0) {
	        this.$element_.addClass(_globals.cssClasses.hidden);
	      }

	      if (this.scroll_) {
	        this.scroll_.refresh();
	      }
	    }
	  };

	  return Window;
	}(_openlayers2.default.Object);

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getInFront = getInFront;
	exports.addTooltip = addTooltip;

	var _jquery = __webpack_require__(78);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _globals = __webpack_require__(183);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * This function gets an $element inside a $context in fornt of all of them
	 * @param {jQuery} $element
	 * @param {jQuery} $context
	 */
	/**
	 * @module html
	 * html helper functions
	 */

	function getInFront($element, $context) {
	  var highest = 0;

	  $context = $context || (0, _jquery2.default)(document);

	  var foundAbsolute = false;

	  $element.parents().each(function (i, el) {
	    if (!(0, _jquery2.default)(el).is($context)) {
	      if ((0, _jquery2.default)(el).css('position') === 'absolute') {
	        foundAbsolute = true;
	        getInFront((0, _jquery2.default)(el), $context);
	        getInFront($element, (0, _jquery2.default)(el));
	      }
	    }
	  });

	  if (!foundAbsolute) {
	    $context.find('*:visible').not(function (i, el) {
	      return el !== $element[0] && (0, _jquery2.default)(el).parents().is($element);
	    }).each(function () {
	      var current = parseInt((0, _jquery2.default)(this).css('z-index'), 10);
	      if (current && highest < current) {
	        highest = current;
	      }
	    });

	    $element.css('z-index', highest + 1);
	  }
	}

	/**
	 * @param {jQuery} $element
	 * @param {string} text
	 */
	function addTooltip($element, text) {
	  $element.addClass(_globals.cssClasses.hasTooltip).append((0, _jquery2.default)('<span role="tooltip">').html(text));
	}

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*! iScroll v5.2.0 ~ (c) 2008-2016 Matteo Spinelli ~ http://cubiq.org/license */
	(function (window, document, Math) {
	var rAF = window.requestAnimationFrame	||
		window.webkitRequestAnimationFrame	||
		window.mozRequestAnimationFrame		||
		window.oRequestAnimationFrame		||
		window.msRequestAnimationFrame		||
		function (callback) { window.setTimeout(callback, 1000 / 60); };

	var utils = (function () {
		var me = {};

		var _elementStyle = document.createElement('div').style;
		var _vendor = (function () {
			var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
				transform,
				i = 0,
				l = vendors.length;

			for ( ; i < l; i++ ) {
				transform = vendors[i] + 'ransform';
				if ( transform in _elementStyle ) return vendors[i].substr(0, vendors[i].length-1);
			}

			return false;
		})();

		function _prefixStyle (style) {
			if ( _vendor === false ) return false;
			if ( _vendor === '' ) return style;
			return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
		}

		me.getTime = Date.now || function getTime () { return new Date().getTime(); };

		me.extend = function (target, obj) {
			for ( var i in obj ) {
				target[i] = obj[i];
			}
		};

		me.addEvent = function (el, type, fn, capture) {
			el.addEventListener(type, fn, !!capture);
		};

		me.removeEvent = function (el, type, fn, capture) {
			el.removeEventListener(type, fn, !!capture);
		};

		me.prefixPointerEvent = function (pointerEvent) {
			return window.MSPointerEvent ?
				'MSPointer' + pointerEvent.charAt(7).toUpperCase() + pointerEvent.substr(8):
				pointerEvent;
		};

		me.momentum = function (current, start, time, lowerMargin, wrapperSize, deceleration) {
			var distance = current - start,
				speed = Math.abs(distance) / time,
				destination,
				duration;

			deceleration = deceleration === undefined ? 0.0006 : deceleration;

			destination = current + ( speed * speed ) / ( 2 * deceleration ) * ( distance < 0 ? -1 : 1 );
			duration = speed / deceleration;

			if ( destination < lowerMargin ) {
				destination = wrapperSize ? lowerMargin - ( wrapperSize / 2.5 * ( speed / 8 ) ) : lowerMargin;
				distance = Math.abs(destination - current);
				duration = distance / speed;
			} else if ( destination > 0 ) {
				destination = wrapperSize ? wrapperSize / 2.5 * ( speed / 8 ) : 0;
				distance = Math.abs(current) + destination;
				duration = distance / speed;
			}

			return {
				destination: Math.round(destination),
				duration: duration
			};
		};

		var _transform = _prefixStyle('transform');

		me.extend(me, {
			hasTransform: _transform !== false,
			hasPerspective: _prefixStyle('perspective') in _elementStyle,
			hasTouch: 'ontouchstart' in window,
			hasPointer: !!(window.PointerEvent || window.MSPointerEvent), // IE10 is prefixed
			hasTransition: _prefixStyle('transition') in _elementStyle
		});

		/*
		This should find all Android browsers lower than build 535.19 (both stock browser and webview)
		- galaxy S2 is ok
	    - 2.3.6 : `AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1`
	    - 4.0.4 : `AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30`
	   - galaxy S3 is badAndroid (stock brower, webview)
	     `AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30`
	   - galaxy S4 is badAndroid (stock brower, webview)
	     `AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30`
	   - galaxy S5 is OK
	     `AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Mobile Safari/537.36 (Chrome/)`
	   - galaxy S6 is OK
	     `AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Mobile Safari/537.36 (Chrome/)`
	  */
		me.isBadAndroid = (function() {
			var appVersion = window.navigator.appVersion;
			// Android browser is not a chrome browser.
			if (/Android/.test(appVersion) && !(/Chrome\/\d/.test(appVersion))) {
				var safariVersion = appVersion.match(/Safari\/(\d+.\d)/);
				if(safariVersion && typeof safariVersion === "object" && safariVersion.length >= 2) {
					return parseFloat(safariVersion[1]) < 535.19;
				} else {
					return true;
				}
			} else {
				return false;
			}
		})();

		me.extend(me.style = {}, {
			transform: _transform,
			transitionTimingFunction: _prefixStyle('transitionTimingFunction'),
			transitionDuration: _prefixStyle('transitionDuration'),
			transitionDelay: _prefixStyle('transitionDelay'),
			transformOrigin: _prefixStyle('transformOrigin')
		});

		me.hasClass = function (e, c) {
			var re = new RegExp("(^|\\s)" + c + "(\\s|$)");
			return re.test(e.className);
		};

		me.addClass = function (e, c) {
			if ( me.hasClass(e, c) ) {
				return;
			}

			var newclass = e.className.split(' ');
			newclass.push(c);
			e.className = newclass.join(' ');
		};

		me.removeClass = function (e, c) {
			if ( !me.hasClass(e, c) ) {
				return;
			}

			var re = new RegExp("(^|\\s)" + c + "(\\s|$)", 'g');
			e.className = e.className.replace(re, ' ');
		};

		me.offset = function (el) {
			var left = -el.offsetLeft,
				top = -el.offsetTop;

			// jshint -W084
			while (el = el.offsetParent) {
				left -= el.offsetLeft;
				top -= el.offsetTop;
			}
			// jshint +W084

			return {
				left: left,
				top: top
			};
		};

		me.preventDefaultException = function (el, exceptions) {
			for ( var i in exceptions ) {
				if ( exceptions[i].test(el[i]) ) {
					return true;
				}
			}

			return false;
		};

		me.extend(me.eventType = {}, {
			touchstart: 1,
			touchmove: 1,
			touchend: 1,

			mousedown: 2,
			mousemove: 2,
			mouseup: 2,

			pointerdown: 3,
			pointermove: 3,
			pointerup: 3,

			MSPointerDown: 3,
			MSPointerMove: 3,
			MSPointerUp: 3
		});

		me.extend(me.ease = {}, {
			quadratic: {
				style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
				fn: function (k) {
					return k * ( 2 - k );
				}
			},
			circular: {
				style: 'cubic-bezier(0.1, 0.57, 0.1, 1)',	// Not properly "circular" but this looks better, it should be (0.075, 0.82, 0.165, 1)
				fn: function (k) {
					return Math.sqrt( 1 - ( --k * k ) );
				}
			},
			back: {
				style: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
				fn: function (k) {
					var b = 4;
					return ( k = k - 1 ) * k * ( ( b + 1 ) * k + b ) + 1;
				}
			},
			bounce: {
				style: '',
				fn: function (k) {
					if ( ( k /= 1 ) < ( 1 / 2.75 ) ) {
						return 7.5625 * k * k;
					} else if ( k < ( 2 / 2.75 ) ) {
						return 7.5625 * ( k -= ( 1.5 / 2.75 ) ) * k + 0.75;
					} else if ( k < ( 2.5 / 2.75 ) ) {
						return 7.5625 * ( k -= ( 2.25 / 2.75 ) ) * k + 0.9375;
					} else {
						return 7.5625 * ( k -= ( 2.625 / 2.75 ) ) * k + 0.984375;
					}
				}
			},
			elastic: {
				style: '',
				fn: function (k) {
					var f = 0.22,
						e = 0.4;

					if ( k === 0 ) { return 0; }
					if ( k == 1 ) { return 1; }

					return ( e * Math.pow( 2, - 10 * k ) * Math.sin( ( k - f / 4 ) * ( 2 * Math.PI ) / f ) + 1 );
				}
			}
		});

		me.tap = function (e, eventName) {
			var ev = document.createEvent('Event');
			ev.initEvent(eventName, true, true);
			ev.pageX = e.pageX;
			ev.pageY = e.pageY;
			e.target.dispatchEvent(ev);
		};

		me.click = function (e) {
			var target = e.target,
				ev;

			if ( !(/(SELECT|INPUT|TEXTAREA)/i).test(target.tagName) ) {
				ev = document.createEvent('MouseEvents');
				ev.initMouseEvent('click', true, true, e.view, 1,
					target.screenX, target.screenY, target.clientX, target.clientY,
					e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
					0, null);

				ev._constructed = true;
				target.dispatchEvent(ev);
			}
		};

		return me;
	})();
	function IScroll (el, options) {
		this.wrapper = typeof el == 'string' ? document.querySelector(el) : el;
		this.scroller = this.wrapper.children[0];
		this.scrollerStyle = this.scroller.style;		// cache style for better performance

		this.options = {

			resizeScrollbars: true,

			mouseWheelSpeed: 20,

			snapThreshold: 0.334,

	// INSERT POINT: OPTIONS
			disablePointer : !utils.hasPointer,
			disableTouch : utils.hasPointer || !utils.hasTouch,
			disableMouse : utils.hasPointer || utils.hasTouch,
			startX: 0,
			startY: 0,
			scrollY: true,
			directionLockThreshold: 5,
			momentum: true,

			bounce: true,
			bounceTime: 600,
			bounceEasing: '',

			preventDefault: true,
			preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ },

			HWCompositing: true,
			useTransition: true,
			useTransform: true,
			bindToWrapper: typeof window.onmousedown === "undefined"
		};

		for ( var i in options ) {
			this.options[i] = options[i];
		}

		// Normalize options
		this.translateZ = this.options.HWCompositing && utils.hasPerspective ? ' translateZ(0)' : '';

		this.options.useTransition = utils.hasTransition && this.options.useTransition;
		this.options.useTransform = utils.hasTransform && this.options.useTransform;

		this.options.eventPassthrough = this.options.eventPassthrough === true ? 'vertical' : this.options.eventPassthrough;
		this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault;

		// If you want eventPassthrough I have to lock one of the axes
		this.options.scrollY = this.options.eventPassthrough == 'vertical' ? false : this.options.scrollY;
		this.options.scrollX = this.options.eventPassthrough == 'horizontal' ? false : this.options.scrollX;

		// With eventPassthrough we also need lockDirection mechanism
		this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough;
		this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold;

		this.options.bounceEasing = typeof this.options.bounceEasing == 'string' ? utils.ease[this.options.bounceEasing] || utils.ease.circular : this.options.bounceEasing;

		this.options.resizePolling = this.options.resizePolling === undefined ? 60 : this.options.resizePolling;

		if ( this.options.tap === true ) {
			this.options.tap = 'tap';
		}

		if ( this.options.shrinkScrollbars == 'scale' ) {
			this.options.useTransition = false;
		}

		this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1;

	// INSERT POINT: NORMALIZATION

		// Some defaults
		this.x = 0;
		this.y = 0;
		this.directionX = 0;
		this.directionY = 0;
		this._events = {};

	// INSERT POINT: DEFAULTS

		this._init();
		this.refresh();

		this.scrollTo(this.options.startX, this.options.startY);
		this.enable();
	}

	IScroll.prototype = {
		version: '5.2.0',

		_init: function () {
			this._initEvents();

			if ( this.options.scrollbars || this.options.indicators ) {
				this._initIndicators();
			}

			if ( this.options.mouseWheel ) {
				this._initWheel();
			}

			if ( this.options.snap ) {
				this._initSnap();
			}

			if ( this.options.keyBindings ) {
				this._initKeys();
			}

	// INSERT POINT: _init

		},

		destroy: function () {
			this._initEvents(true);
			clearTimeout(this.resizeTimeout);
	 		this.resizeTimeout = null;
			this._execEvent('destroy');
		},

		_transitionEnd: function (e) {
			if ( e.target != this.scroller || !this.isInTransition ) {
				return;
			}

			this._transitionTime();
			if ( !this.resetPosition(this.options.bounceTime) ) {
				this.isInTransition = false;
				this._execEvent('scrollEnd');
			}
		},

		_start: function (e) {
			// React to left mouse button only
			if ( utils.eventType[e.type] != 1 ) {
			  // for button property
			  // http://unixpapa.com/js/mouse.html
			  var button;
		    if (!e.which) {
		      /* IE case */
		      button = (e.button < 2) ? 0 :
		               ((e.button == 4) ? 1 : 2);
		    } else {
		      /* All others */
		      button = e.button;
		    }
				if ( button !== 0 ) {
					return;
				}
			}

			if ( !this.enabled || (this.initiated && utils.eventType[e.type] !== this.initiated) ) {
				return;
			}

			if ( this.options.preventDefault && !utils.isBadAndroid && !utils.preventDefaultException(e.target, this.options.preventDefaultException) ) {
				e.preventDefault();
			}

			var point = e.touches ? e.touches[0] : e,
				pos;

			this.initiated	= utils.eventType[e.type];
			this.moved		= false;
			this.distX		= 0;
			this.distY		= 0;
			this.directionX = 0;
			this.directionY = 0;
			this.directionLocked = 0;

			this.startTime = utils.getTime();

			if ( this.options.useTransition && this.isInTransition ) {
				this._transitionTime();
				this.isInTransition = false;
				pos = this.getComputedPosition();
				this._translate(Math.round(pos.x), Math.round(pos.y));
				this._execEvent('scrollEnd');
			} else if ( !this.options.useTransition && this.isAnimating ) {
				this.isAnimating = false;
				this._execEvent('scrollEnd');
			}

			this.startX    = this.x;
			this.startY    = this.y;
			this.absStartX = this.x;
			this.absStartY = this.y;
			this.pointX    = point.pageX;
			this.pointY    = point.pageY;

			this._execEvent('beforeScrollStart');
		},

		_move: function (e) {
			if ( !this.enabled || utils.eventType[e.type] !== this.initiated ) {
				return;
			}

			if ( this.options.preventDefault ) {	// increases performance on Android? TODO: check!
				e.preventDefault();
			}

			var point		= e.touches ? e.touches[0] : e,
				deltaX		= point.pageX - this.pointX,
				deltaY		= point.pageY - this.pointY,
				timestamp	= utils.getTime(),
				newX, newY,
				absDistX, absDistY;

			this.pointX		= point.pageX;
			this.pointY		= point.pageY;

			this.distX		+= deltaX;
			this.distY		+= deltaY;
			absDistX		= Math.abs(this.distX);
			absDistY		= Math.abs(this.distY);

			// We need to move at least 10 pixels for the scrolling to initiate
			if ( timestamp - this.endTime > 300 && (absDistX < 10 && absDistY < 10) ) {
				return;
			}

			// If you are scrolling in one direction lock the other
			if ( !this.directionLocked && !this.options.freeScroll ) {
				if ( absDistX > absDistY + this.options.directionLockThreshold ) {
					this.directionLocked = 'h';		// lock horizontally
				} else if ( absDistY >= absDistX + this.options.directionLockThreshold ) {
					this.directionLocked = 'v';		// lock vertically
				} else {
					this.directionLocked = 'n';		// no lock
				}
			}

			if ( this.directionLocked == 'h' ) {
				if ( this.options.eventPassthrough == 'vertical' ) {
					e.preventDefault();
				} else if ( this.options.eventPassthrough == 'horizontal' ) {
					this.initiated = false;
					return;
				}

				deltaY = 0;
			} else if ( this.directionLocked == 'v' ) {
				if ( this.options.eventPassthrough == 'horizontal' ) {
					e.preventDefault();
				} else if ( this.options.eventPassthrough == 'vertical' ) {
					this.initiated = false;
					return;
				}

				deltaX = 0;
			}

			deltaX = this.hasHorizontalScroll ? deltaX : 0;
			deltaY = this.hasVerticalScroll ? deltaY : 0;

			newX = this.x + deltaX;
			newY = this.y + deltaY;

			// Slow down if outside of the boundaries
			if ( newX > 0 || newX < this.maxScrollX ) {
				newX = this.options.bounce ? this.x + deltaX / 3 : newX > 0 ? 0 : this.maxScrollX;
			}
			if ( newY > 0 || newY < this.maxScrollY ) {
				newY = this.options.bounce ? this.y + deltaY / 3 : newY > 0 ? 0 : this.maxScrollY;
			}

			this.directionX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
			this.directionY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;

			if ( !this.moved ) {
				this._execEvent('scrollStart');
			}

			this.moved = true;

			this._translate(newX, newY);

	/* REPLACE START: _move */

			if ( timestamp - this.startTime > 300 ) {
				this.startTime = timestamp;
				this.startX = this.x;
				this.startY = this.y;
			}

	/* REPLACE END: _move */

		},

		_end: function (e) {
			if ( !this.enabled || utils.eventType[e.type] !== this.initiated ) {
				return;
			}

			if ( this.options.preventDefault && !utils.preventDefaultException(e.target, this.options.preventDefaultException) ) {
				e.preventDefault();
			}

			var point = e.changedTouches ? e.changedTouches[0] : e,
				momentumX,
				momentumY,
				duration = utils.getTime() - this.startTime,
				newX = Math.round(this.x),
				newY = Math.round(this.y),
				distanceX = Math.abs(newX - this.startX),
				distanceY = Math.abs(newY - this.startY),
				time = 0,
				easing = '';

			this.isInTransition = 0;
			this.initiated = 0;
			this.endTime = utils.getTime();

			// reset if we are outside of the boundaries
			if ( this.resetPosition(this.options.bounceTime) ) {
				return;
			}

			this.scrollTo(newX, newY);	// ensures that the last position is rounded

			// we scrolled less than 10 pixels
			if ( !this.moved ) {
				if ( this.options.tap ) {
					utils.tap(e, this.options.tap);
				}

				if ( this.options.click ) {
					utils.click(e);
				}

				this._execEvent('scrollCancel');
				return;
			}

			if ( this._events.flick && duration < 200 && distanceX < 100 && distanceY < 100 ) {
				this._execEvent('flick');
				return;
			}

			// start momentum animation if needed
			if ( this.options.momentum && duration < 300 ) {
				momentumX = this.hasHorizontalScroll ? utils.momentum(this.x, this.startX, duration, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : { destination: newX, duration: 0 };
				momentumY = this.hasVerticalScroll ? utils.momentum(this.y, this.startY, duration, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : { destination: newY, duration: 0 };
				newX = momentumX.destination;
				newY = momentumY.destination;
				time = Math.max(momentumX.duration, momentumY.duration);
				this.isInTransition = 1;
			}


			if ( this.options.snap ) {
				var snap = this._nearestSnap(newX, newY);
				this.currentPage = snap;
				time = this.options.snapSpeed || Math.max(
						Math.max(
							Math.min(Math.abs(newX - snap.x), 1000),
							Math.min(Math.abs(newY - snap.y), 1000)
						), 300);
				newX = snap.x;
				newY = snap.y;

				this.directionX = 0;
				this.directionY = 0;
				easing = this.options.bounceEasing;
			}

	// INSERT POINT: _end

			if ( newX != this.x || newY != this.y ) {
				// change easing function when scroller goes out of the boundaries
				if ( newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY ) {
					easing = utils.ease.quadratic;
				}

				this.scrollTo(newX, newY, time, easing);
				return;
			}

			this._execEvent('scrollEnd');
		},

		_resize: function () {
			var that = this;

			clearTimeout(this.resizeTimeout);

			this.resizeTimeout = setTimeout(function () {
				that.refresh();
			}, this.options.resizePolling);
		},

		resetPosition: function (time) {
			var x = this.x,
				y = this.y;

			time = time || 0;

			if ( !this.hasHorizontalScroll || this.x > 0 ) {
				x = 0;
			} else if ( this.x < this.maxScrollX ) {
				x = this.maxScrollX;
			}

			if ( !this.hasVerticalScroll || this.y > 0 ) {
				y = 0;
			} else if ( this.y < this.maxScrollY ) {
				y = this.maxScrollY;
			}

			if ( x == this.x && y == this.y ) {
				return false;
			}

			this.scrollTo(x, y, time, this.options.bounceEasing);

			return true;
		},

		disable: function () {
			this.enabled = false;
		},

		enable: function () {
			this.enabled = true;
		},

		refresh: function () {
			var rf = this.wrapper.offsetHeight;		// Force reflow

			this.wrapperWidth	= this.wrapper.clientWidth;
			this.wrapperHeight	= this.wrapper.clientHeight;

	/* REPLACE START: refresh */

			this.scrollerWidth	= this.scroller.offsetWidth;
			this.scrollerHeight	= this.scroller.offsetHeight;

			this.maxScrollX		= this.wrapperWidth - this.scrollerWidth;
			this.maxScrollY		= this.wrapperHeight - this.scrollerHeight;

	/* REPLACE END: refresh */

			this.hasHorizontalScroll	= this.options.scrollX && this.maxScrollX < 0;
			this.hasVerticalScroll		= this.options.scrollY && this.maxScrollY < 0;

			if ( !this.hasHorizontalScroll ) {
				this.maxScrollX = 0;
				this.scrollerWidth = this.wrapperWidth;
			}

			if ( !this.hasVerticalScroll ) {
				this.maxScrollY = 0;
				this.scrollerHeight = this.wrapperHeight;
			}

			this.endTime = 0;
			this.directionX = 0;
			this.directionY = 0;

			this.wrapperOffset = utils.offset(this.wrapper);

			this._execEvent('refresh');

			this.resetPosition();

	// INSERT POINT: _refresh

		},

		on: function (type, fn) {
			if ( !this._events[type] ) {
				this._events[type] = [];
			}

			this._events[type].push(fn);
		},

		off: function (type, fn) {
			if ( !this._events[type] ) {
				return;
			}

			var index = this._events[type].indexOf(fn);

			if ( index > -1 ) {
				this._events[type].splice(index, 1);
			}
		},

		_execEvent: function (type) {
			if ( !this._events[type] ) {
				return;
			}

			var i = 0,
				l = this._events[type].length;

			if ( !l ) {
				return;
			}

			for ( ; i < l; i++ ) {
				this._events[type][i].apply(this, [].slice.call(arguments, 1));
			}
		},

		scrollBy: function (x, y, time, easing) {
			x = this.x + x;
			y = this.y + y;
			time = time || 0;

			this.scrollTo(x, y, time, easing);
		},

		scrollTo: function (x, y, time, easing) {
			easing = easing || utils.ease.circular;

			this.isInTransition = this.options.useTransition && time > 0;
			var transitionType = this.options.useTransition && easing.style;
			if ( !time || transitionType ) {
					if(transitionType) {
						this._transitionTimingFunction(easing.style);
						this._transitionTime(time);
					}
				this._translate(x, y);
			} else {
				this._animate(x, y, time, easing.fn);
			}
		},

		scrollToElement: function (el, time, offsetX, offsetY, easing) {
			el = el.nodeType ? el : this.scroller.querySelector(el);

			if ( !el ) {
				return;
			}

			var pos = utils.offset(el);

			pos.left -= this.wrapperOffset.left;
			pos.top  -= this.wrapperOffset.top;

			// if offsetX/Y are true we center the element to the screen
			if ( offsetX === true ) {
				offsetX = Math.round(el.offsetWidth / 2 - this.wrapper.offsetWidth / 2);
			}
			if ( offsetY === true ) {
				offsetY = Math.round(el.offsetHeight / 2 - this.wrapper.offsetHeight / 2);
			}

			pos.left -= offsetX || 0;
			pos.top  -= offsetY || 0;

			pos.left = pos.left > 0 ? 0 : pos.left < this.maxScrollX ? this.maxScrollX : pos.left;
			pos.top  = pos.top  > 0 ? 0 : pos.top  < this.maxScrollY ? this.maxScrollY : pos.top;

			time = time === undefined || time === null || time === 'auto' ? Math.max(Math.abs(this.x-pos.left), Math.abs(this.y-pos.top)) : time;

			this.scrollTo(pos.left, pos.top, time, easing);
		},

		_transitionTime: function (time) {
			time = time || 0;

			var durationProp = utils.style.transitionDuration;
			this.scrollerStyle[durationProp] = time + 'ms';

			if ( !time && utils.isBadAndroid ) {
				this.scrollerStyle[durationProp] = '0.0001ms';
				// remove 0.0001ms
				var self = this;
				rAF(function() {
					if(self.scrollerStyle[durationProp] === '0.0001ms') {
						self.scrollerStyle[durationProp] = '0s';
					}
				});
			}


			if ( this.indicators ) {
				for ( var i = this.indicators.length; i--; ) {
					this.indicators[i].transitionTime(time);
				}
			}


	// INSERT POINT: _transitionTime

		},

		_transitionTimingFunction: function (easing) {
			this.scrollerStyle[utils.style.transitionTimingFunction] = easing;


			if ( this.indicators ) {
				for ( var i = this.indicators.length; i--; ) {
					this.indicators[i].transitionTimingFunction(easing);
				}
			}


	// INSERT POINT: _transitionTimingFunction

		},

		_translate: function (x, y) {
			if ( this.options.useTransform ) {

	/* REPLACE START: _translate */

				this.scrollerStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.translateZ;

	/* REPLACE END: _translate */

			} else {
				x = Math.round(x);
				y = Math.round(y);
				this.scrollerStyle.left = x + 'px';
				this.scrollerStyle.top = y + 'px';
			}

			this.x = x;
			this.y = y;


		if ( this.indicators ) {
			for ( var i = this.indicators.length; i--; ) {
				this.indicators[i].updatePosition();
			}
		}


	// INSERT POINT: _translate

		},

		_initEvents: function (remove) {
			var eventType = remove ? utils.removeEvent : utils.addEvent,
				target = this.options.bindToWrapper ? this.wrapper : window;

			eventType(window, 'orientationchange', this);
			eventType(window, 'resize', this);

			if ( this.options.click ) {
				eventType(this.wrapper, 'click', this, true);
			}

			if ( !this.options.disableMouse ) {
				eventType(this.wrapper, 'mousedown', this);
				eventType(target, 'mousemove', this);
				eventType(target, 'mousecancel', this);
				eventType(target, 'mouseup', this);
			}

			if ( utils.hasPointer && !this.options.disablePointer ) {
				eventType(this.wrapper, utils.prefixPointerEvent('pointerdown'), this);
				eventType(target, utils.prefixPointerEvent('pointermove'), this);
				eventType(target, utils.prefixPointerEvent('pointercancel'), this);
				eventType(target, utils.prefixPointerEvent('pointerup'), this);
			}

			if ( utils.hasTouch && !this.options.disableTouch ) {
				eventType(this.wrapper, 'touchstart', this);
				eventType(target, 'touchmove', this);
				eventType(target, 'touchcancel', this);
				eventType(target, 'touchend', this);
			}

			eventType(this.scroller, 'transitionend', this);
			eventType(this.scroller, 'webkitTransitionEnd', this);
			eventType(this.scroller, 'oTransitionEnd', this);
			eventType(this.scroller, 'MSTransitionEnd', this);
		},

		getComputedPosition: function () {
			var matrix = window.getComputedStyle(this.scroller, null),
				x, y;

			if ( this.options.useTransform ) {
				matrix = matrix[utils.style.transform].split(')')[0].split(', ');
				x = +(matrix[12] || matrix[4]);
				y = +(matrix[13] || matrix[5]);
			} else {
				x = +matrix.left.replace(/[^-\d.]/g, '');
				y = +matrix.top.replace(/[^-\d.]/g, '');
			}

			return { x: x, y: y };
		},
		_initIndicators: function () {
			var interactive = this.options.interactiveScrollbars,
				customStyle = typeof this.options.scrollbars != 'string',
				indicators = [],
				indicator;

			var that = this;

			this.indicators = [];

			if ( this.options.scrollbars ) {
				// Vertical scrollbar
				if ( this.options.scrollY ) {
					indicator = {
						el: createDefaultScrollbar('v', interactive, this.options.scrollbars),
						interactive: interactive,
						defaultScrollbars: true,
						customStyle: customStyle,
						resize: this.options.resizeScrollbars,
						shrink: this.options.shrinkScrollbars,
						fade: this.options.fadeScrollbars,
						listenX: false
					};

					this.wrapper.appendChild(indicator.el);
					indicators.push(indicator);
				}

				// Horizontal scrollbar
				if ( this.options.scrollX ) {
					indicator = {
						el: createDefaultScrollbar('h', interactive, this.options.scrollbars),
						interactive: interactive,
						defaultScrollbars: true,
						customStyle: customStyle,
						resize: this.options.resizeScrollbars,
						shrink: this.options.shrinkScrollbars,
						fade: this.options.fadeScrollbars,
						listenY: false
					};

					this.wrapper.appendChild(indicator.el);
					indicators.push(indicator);
				}
			}

			if ( this.options.indicators ) {
				// TODO: check concat compatibility
				indicators = indicators.concat(this.options.indicators);
			}

			for ( var i = indicators.length; i--; ) {
				this.indicators.push( new Indicator(this, indicators[i]) );
			}

			// TODO: check if we can use array.map (wide compatibility and performance issues)
			function _indicatorsMap (fn) {
				if (that.indicators) {
					for ( var i = that.indicators.length; i--; ) {
						fn.call(that.indicators[i]);
					}
				}
			}

			if ( this.options.fadeScrollbars ) {
				this.on('scrollEnd', function () {
					_indicatorsMap(function () {
						this.fade();
					});
				});

				this.on('scrollCancel', function () {
					_indicatorsMap(function () {
						this.fade();
					});
				});

				this.on('scrollStart', function () {
					_indicatorsMap(function () {
						this.fade(1);
					});
				});

				this.on('beforeScrollStart', function () {
					_indicatorsMap(function () {
						this.fade(1, true);
					});
				});
			}


			this.on('refresh', function () {
				_indicatorsMap(function () {
					this.refresh();
				});
			});

			this.on('destroy', function () {
				_indicatorsMap(function () {
					this.destroy();
				});

				delete this.indicators;
			});
		},

		_initWheel: function () {
			utils.addEvent(this.wrapper, 'wheel', this);
			utils.addEvent(this.wrapper, 'mousewheel', this);
			utils.addEvent(this.wrapper, 'DOMMouseScroll', this);

			this.on('destroy', function () {
				clearTimeout(this.wheelTimeout);
				this.wheelTimeout = null;
				utils.removeEvent(this.wrapper, 'wheel', this);
				utils.removeEvent(this.wrapper, 'mousewheel', this);
				utils.removeEvent(this.wrapper, 'DOMMouseScroll', this);
			});
		},

		_wheel: function (e) {
			if ( !this.enabled ) {
				return;
			}

			e.preventDefault();

			var wheelDeltaX, wheelDeltaY,
				newX, newY,
				that = this;

			if ( this.wheelTimeout === undefined ) {
				that._execEvent('scrollStart');
			}

			// Execute the scrollEnd event after 400ms the wheel stopped scrolling
			clearTimeout(this.wheelTimeout);
			this.wheelTimeout = setTimeout(function () {
				if(!that.options.snap) {
					that._execEvent('scrollEnd');
				}
				that.wheelTimeout = undefined;
			}, 400);

			if ( 'deltaX' in e ) {
				if (e.deltaMode === 1) {
					wheelDeltaX = -e.deltaX * this.options.mouseWheelSpeed;
					wheelDeltaY = -e.deltaY * this.options.mouseWheelSpeed;
				} else {
					wheelDeltaX = -e.deltaX;
					wheelDeltaY = -e.deltaY;
				}
			} else if ( 'wheelDeltaX' in e ) {
				wheelDeltaX = e.wheelDeltaX / 120 * this.options.mouseWheelSpeed;
				wheelDeltaY = e.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
			} else if ( 'wheelDelta' in e ) {
				wheelDeltaX = wheelDeltaY = e.wheelDelta / 120 * this.options.mouseWheelSpeed;
			} else if ( 'detail' in e ) {
				wheelDeltaX = wheelDeltaY = -e.detail / 3 * this.options.mouseWheelSpeed;
			} else {
				return;
			}

			wheelDeltaX *= this.options.invertWheelDirection;
			wheelDeltaY *= this.options.invertWheelDirection;

			if ( !this.hasVerticalScroll ) {
				wheelDeltaX = wheelDeltaY;
				wheelDeltaY = 0;
			}

			if ( this.options.snap ) {
				newX = this.currentPage.pageX;
				newY = this.currentPage.pageY;

				if ( wheelDeltaX > 0 ) {
					newX--;
				} else if ( wheelDeltaX < 0 ) {
					newX++;
				}

				if ( wheelDeltaY > 0 ) {
					newY--;
				} else if ( wheelDeltaY < 0 ) {
					newY++;
				}

				this.goToPage(newX, newY);

				return;
			}

			newX = this.x + Math.round(this.hasHorizontalScroll ? wheelDeltaX : 0);
			newY = this.y + Math.round(this.hasVerticalScroll ? wheelDeltaY : 0);

			this.directionX = wheelDeltaX > 0 ? -1 : wheelDeltaX < 0 ? 1 : 0;
			this.directionY = wheelDeltaY > 0 ? -1 : wheelDeltaY < 0 ? 1 : 0;

			if ( newX > 0 ) {
				newX = 0;
			} else if ( newX < this.maxScrollX ) {
				newX = this.maxScrollX;
			}

			if ( newY > 0 ) {
				newY = 0;
			} else if ( newY < this.maxScrollY ) {
				newY = this.maxScrollY;
			}

			this.scrollTo(newX, newY, 0);

	// INSERT POINT: _wheel
		},

		_initSnap: function () {
			this.currentPage = {};

			if ( typeof this.options.snap == 'string' ) {
				this.options.snap = this.scroller.querySelectorAll(this.options.snap);
			}

			this.on('refresh', function () {
				var i = 0, l,
					m = 0, n,
					cx, cy,
					x = 0, y,
					stepX = this.options.snapStepX || this.wrapperWidth,
					stepY = this.options.snapStepY || this.wrapperHeight,
					el;

				this.pages = [];

				if ( !this.wrapperWidth || !this.wrapperHeight || !this.scrollerWidth || !this.scrollerHeight ) {
					return;
				}

				if ( this.options.snap === true ) {
					cx = Math.round( stepX / 2 );
					cy = Math.round( stepY / 2 );

					while ( x > -this.scrollerWidth ) {
						this.pages[i] = [];
						l = 0;
						y = 0;

						while ( y > -this.scrollerHeight ) {
							this.pages[i][l] = {
								x: Math.max(x, this.maxScrollX),
								y: Math.max(y, this.maxScrollY),
								width: stepX,
								height: stepY,
								cx: x - cx,
								cy: y - cy
							};

							y -= stepY;
							l++;
						}

						x -= stepX;
						i++;
					}
				} else {
					el = this.options.snap;
					l = el.length;
					n = -1;

					for ( ; i < l; i++ ) {
						if ( i === 0 || el[i].offsetLeft <= el[i-1].offsetLeft ) {
							m = 0;
							n++;
						}

						if ( !this.pages[m] ) {
							this.pages[m] = [];
						}

						x = Math.max(-el[i].offsetLeft, this.maxScrollX);
						y = Math.max(-el[i].offsetTop, this.maxScrollY);
						cx = x - Math.round(el[i].offsetWidth / 2);
						cy = y - Math.round(el[i].offsetHeight / 2);

						this.pages[m][n] = {
							x: x,
							y: y,
							width: el[i].offsetWidth,
							height: el[i].offsetHeight,
							cx: cx,
							cy: cy
						};

						if ( x > this.maxScrollX ) {
							m++;
						}
					}
				}

				this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0);

				// Update snap threshold if needed
				if ( this.options.snapThreshold % 1 === 0 ) {
					this.snapThresholdX = this.options.snapThreshold;
					this.snapThresholdY = this.options.snapThreshold;
				} else {
					this.snapThresholdX = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold);
					this.snapThresholdY = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold);
				}
			});

			this.on('flick', function () {
				var time = this.options.snapSpeed || Math.max(
						Math.max(
							Math.min(Math.abs(this.x - this.startX), 1000),
							Math.min(Math.abs(this.y - this.startY), 1000)
						), 300);

				this.goToPage(
					this.currentPage.pageX + this.directionX,
					this.currentPage.pageY + this.directionY,
					time
				);
			});
		},

		_nearestSnap: function (x, y) {
			if ( !this.pages.length ) {
				return { x: 0, y: 0, pageX: 0, pageY: 0 };
			}

			var i = 0,
				l = this.pages.length,
				m = 0;

			// Check if we exceeded the snap threshold
			if ( Math.abs(x - this.absStartX) < this.snapThresholdX &&
				Math.abs(y - this.absStartY) < this.snapThresholdY ) {
				return this.currentPage;
			}

			if ( x > 0 ) {
				x = 0;
			} else if ( x < this.maxScrollX ) {
				x = this.maxScrollX;
			}

			if ( y > 0 ) {
				y = 0;
			} else if ( y < this.maxScrollY ) {
				y = this.maxScrollY;
			}

			for ( ; i < l; i++ ) {
				if ( x >= this.pages[i][0].cx ) {
					x = this.pages[i][0].x;
					break;
				}
			}

			l = this.pages[i].length;

			for ( ; m < l; m++ ) {
				if ( y >= this.pages[0][m].cy ) {
					y = this.pages[0][m].y;
					break;
				}
			}

			if ( i == this.currentPage.pageX ) {
				i += this.directionX;

				if ( i < 0 ) {
					i = 0;
				} else if ( i >= this.pages.length ) {
					i = this.pages.length - 1;
				}

				x = this.pages[i][0].x;
			}

			if ( m == this.currentPage.pageY ) {
				m += this.directionY;

				if ( m < 0 ) {
					m = 0;
				} else if ( m >= this.pages[0].length ) {
					m = this.pages[0].length - 1;
				}

				y = this.pages[0][m].y;
			}

			return {
				x: x,
				y: y,
				pageX: i,
				pageY: m
			};
		},

		goToPage: function (x, y, time, easing) {
			easing = easing || this.options.bounceEasing;

			if ( x >= this.pages.length ) {
				x = this.pages.length - 1;
			} else if ( x < 0 ) {
				x = 0;
			}

			if ( y >= this.pages[x].length ) {
				y = this.pages[x].length - 1;
			} else if ( y < 0 ) {
				y = 0;
			}

			var posX = this.pages[x][y].x,
				posY = this.pages[x][y].y;

			time = time === undefined ? this.options.snapSpeed || Math.max(
				Math.max(
					Math.min(Math.abs(posX - this.x), 1000),
					Math.min(Math.abs(posY - this.y), 1000)
				), 300) : time;

			this.currentPage = {
				x: posX,
				y: posY,
				pageX: x,
				pageY: y
			};

			this.scrollTo(posX, posY, time, easing);
		},

		next: function (time, easing) {
			var x = this.currentPage.pageX,
				y = this.currentPage.pageY;

			x++;

			if ( x >= this.pages.length && this.hasVerticalScroll ) {
				x = 0;
				y++;
			}

			this.goToPage(x, y, time, easing);
		},

		prev: function (time, easing) {
			var x = this.currentPage.pageX,
				y = this.currentPage.pageY;

			x--;

			if ( x < 0 && this.hasVerticalScroll ) {
				x = 0;
				y--;
			}

			this.goToPage(x, y, time, easing);
		},

		_initKeys: function (e) {
			// default key bindings
			var keys = {
				pageUp: 33,
				pageDown: 34,
				end: 35,
				home: 36,
				left: 37,
				up: 38,
				right: 39,
				down: 40
			};
			var i;

			// if you give me characters I give you keycode
			if ( typeof this.options.keyBindings == 'object' ) {
				for ( i in this.options.keyBindings ) {
					if ( typeof this.options.keyBindings[i] == 'string' ) {
						this.options.keyBindings[i] = this.options.keyBindings[i].toUpperCase().charCodeAt(0);
					}
				}
			} else {
				this.options.keyBindings = {};
			}

			for ( i in keys ) {
				this.options.keyBindings[i] = this.options.keyBindings[i] || keys[i];
			}

			utils.addEvent(window, 'keydown', this);

			this.on('destroy', function () {
				utils.removeEvent(window, 'keydown', this);
			});
		},

		_key: function (e) {
			if ( !this.enabled ) {
				return;
			}

			var snap = this.options.snap,	// we are using this alot, better to cache it
				newX = snap ? this.currentPage.pageX : this.x,
				newY = snap ? this.currentPage.pageY : this.y,
				now = utils.getTime(),
				prevTime = this.keyTime || 0,
				acceleration = 0.250,
				pos;

			if ( this.options.useTransition && this.isInTransition ) {
				pos = this.getComputedPosition();

				this._translate(Math.round(pos.x), Math.round(pos.y));
				this.isInTransition = false;
			}

			this.keyAcceleration = now - prevTime < 200 ? Math.min(this.keyAcceleration + acceleration, 50) : 0;

			switch ( e.keyCode ) {
				case this.options.keyBindings.pageUp:
					if ( this.hasHorizontalScroll && !this.hasVerticalScroll ) {
						newX += snap ? 1 : this.wrapperWidth;
					} else {
						newY += snap ? 1 : this.wrapperHeight;
					}
					break;
				case this.options.keyBindings.pageDown:
					if ( this.hasHorizontalScroll && !this.hasVerticalScroll ) {
						newX -= snap ? 1 : this.wrapperWidth;
					} else {
						newY -= snap ? 1 : this.wrapperHeight;
					}
					break;
				case this.options.keyBindings.end:
					newX = snap ? this.pages.length-1 : this.maxScrollX;
					newY = snap ? this.pages[0].length-1 : this.maxScrollY;
					break;
				case this.options.keyBindings.home:
					newX = 0;
					newY = 0;
					break;
				case this.options.keyBindings.left:
					newX += snap ? -1 : 5 + this.keyAcceleration>>0;
					break;
				case this.options.keyBindings.up:
					newY += snap ? 1 : 5 + this.keyAcceleration>>0;
					break;
				case this.options.keyBindings.right:
					newX -= snap ? -1 : 5 + this.keyAcceleration>>0;
					break;
				case this.options.keyBindings.down:
					newY -= snap ? 1 : 5 + this.keyAcceleration>>0;
					break;
				default:
					return;
			}

			if ( snap ) {
				this.goToPage(newX, newY);
				return;
			}

			if ( newX > 0 ) {
				newX = 0;
				this.keyAcceleration = 0;
			} else if ( newX < this.maxScrollX ) {
				newX = this.maxScrollX;
				this.keyAcceleration = 0;
			}

			if ( newY > 0 ) {
				newY = 0;
				this.keyAcceleration = 0;
			} else if ( newY < this.maxScrollY ) {
				newY = this.maxScrollY;
				this.keyAcceleration = 0;
			}

			this.scrollTo(newX, newY, 0);

			this.keyTime = now;
		},

		_animate: function (destX, destY, duration, easingFn) {
			var that = this,
				startX = this.x,
				startY = this.y,
				startTime = utils.getTime(),
				destTime = startTime + duration;

			function step () {
				var now = utils.getTime(),
					newX, newY,
					easing;

				if ( now >= destTime ) {
					that.isAnimating = false;
					that._translate(destX, destY);

					if ( !that.resetPosition(that.options.bounceTime) ) {
						that._execEvent('scrollEnd');
					}

					return;
				}

				now = ( now - startTime ) / duration;
				easing = easingFn(now);
				newX = ( destX - startX ) * easing + startX;
				newY = ( destY - startY ) * easing + startY;
				that._translate(newX, newY);

				if ( that.isAnimating ) {
					rAF(step);
				}
			}

			this.isAnimating = true;
			step();
		},
		handleEvent: function (e) {
			switch ( e.type ) {
				case 'touchstart':
				case 'pointerdown':
				case 'MSPointerDown':
				case 'mousedown':
					this._start(e);
					break;
				case 'touchmove':
				case 'pointermove':
				case 'MSPointerMove':
				case 'mousemove':
					this._move(e);
					break;
				case 'touchend':
				case 'pointerup':
				case 'MSPointerUp':
				case 'mouseup':
				case 'touchcancel':
				case 'pointercancel':
				case 'MSPointerCancel':
				case 'mousecancel':
					this._end(e);
					break;
				case 'orientationchange':
				case 'resize':
					this._resize();
					break;
				case 'transitionend':
				case 'webkitTransitionEnd':
				case 'oTransitionEnd':
				case 'MSTransitionEnd':
					this._transitionEnd(e);
					break;
				case 'wheel':
				case 'DOMMouseScroll':
				case 'mousewheel':
					this._wheel(e);
					break;
				case 'keydown':
					this._key(e);
					break;
				case 'click':
					if ( this.enabled && !e._constructed ) {
						e.preventDefault();
						e.stopPropagation();
					}
					break;
			}
		}
	};
	function createDefaultScrollbar (direction, interactive, type) {
		var scrollbar = document.createElement('div'),
			indicator = document.createElement('div');

		if ( type === true ) {
			scrollbar.style.cssText = 'position:absolute;z-index:9999';
			indicator.style.cssText = '-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px';
		}

		indicator.className = 'iScrollIndicator';

		if ( direction == 'h' ) {
			if ( type === true ) {
				scrollbar.style.cssText += ';height:7px;left:2px;right:2px;bottom:0';
				indicator.style.height = '100%';
			}
			scrollbar.className = 'iScrollHorizontalScrollbar';
		} else {
			if ( type === true ) {
				scrollbar.style.cssText += ';width:7px;bottom:2px;top:2px;right:1px';
				indicator.style.width = '100%';
			}
			scrollbar.className = 'iScrollVerticalScrollbar';
		}

		scrollbar.style.cssText += ';overflow:hidden';

		if ( !interactive ) {
			scrollbar.style.pointerEvents = 'none';
		}

		scrollbar.appendChild(indicator);

		return scrollbar;
	}

	function Indicator (scroller, options) {
		this.wrapper = typeof options.el == 'string' ? document.querySelector(options.el) : options.el;
		this.wrapperStyle = this.wrapper.style;
		this.indicator = this.wrapper.children[0];
		this.indicatorStyle = this.indicator.style;
		this.scroller = scroller;

		this.options = {
			listenX: true,
			listenY: true,
			interactive: false,
			resize: true,
			defaultScrollbars: false,
			shrink: false,
			fade: false,
			speedRatioX: 0,
			speedRatioY: 0
		};

		for ( var i in options ) {
			this.options[i] = options[i];
		}

		this.sizeRatioX = 1;
		this.sizeRatioY = 1;
		this.maxPosX = 0;
		this.maxPosY = 0;

		if ( this.options.interactive ) {
			if ( !this.options.disableTouch ) {
				utils.addEvent(this.indicator, 'touchstart', this);
				utils.addEvent(window, 'touchend', this);
			}
			if ( !this.options.disablePointer ) {
				utils.addEvent(this.indicator, utils.prefixPointerEvent('pointerdown'), this);
				utils.addEvent(window, utils.prefixPointerEvent('pointerup'), this);
			}
			if ( !this.options.disableMouse ) {
				utils.addEvent(this.indicator, 'mousedown', this);
				utils.addEvent(window, 'mouseup', this);
			}
		}

		if ( this.options.fade ) {
			this.wrapperStyle[utils.style.transform] = this.scroller.translateZ;
			var durationProp = utils.style.transitionDuration;
			this.wrapperStyle[durationProp] = utils.isBadAndroid ? '0.0001ms' : '0ms';
			// remove 0.0001ms
			var self = this;
			if(utils.isBadAndroid) {
				rAF(function() {
					if(self.wrapperStyle[durationProp] === '0.0001ms') {
						self.wrapperStyle[durationProp] = '0s';
					}
				});
			}
			this.wrapperStyle.opacity = '0';
		}
	}

	Indicator.prototype = {
		handleEvent: function (e) {
			switch ( e.type ) {
				case 'touchstart':
				case 'pointerdown':
				case 'MSPointerDown':
				case 'mousedown':
					this._start(e);
					break;
				case 'touchmove':
				case 'pointermove':
				case 'MSPointerMove':
				case 'mousemove':
					this._move(e);
					break;
				case 'touchend':
				case 'pointerup':
				case 'MSPointerUp':
				case 'mouseup':
				case 'touchcancel':
				case 'pointercancel':
				case 'MSPointerCancel':
				case 'mousecancel':
					this._end(e);
					break;
			}
		},

		destroy: function () {
			if ( this.options.fadeScrollbars ) {
				clearTimeout(this.fadeTimeout);
				this.fadeTimeout = null;
			}
			if ( this.options.interactive ) {
				utils.removeEvent(this.indicator, 'touchstart', this);
				utils.removeEvent(this.indicator, utils.prefixPointerEvent('pointerdown'), this);
				utils.removeEvent(this.indicator, 'mousedown', this);

				utils.removeEvent(window, 'touchmove', this);
				utils.removeEvent(window, utils.prefixPointerEvent('pointermove'), this);
				utils.removeEvent(window, 'mousemove', this);

				utils.removeEvent(window, 'touchend', this);
				utils.removeEvent(window, utils.prefixPointerEvent('pointerup'), this);
				utils.removeEvent(window, 'mouseup', this);
			}

			if ( this.options.defaultScrollbars ) {
				this.wrapper.parentNode.removeChild(this.wrapper);
			}
		},

		_start: function (e) {
			var point = e.touches ? e.touches[0] : e;

			e.preventDefault();
			e.stopPropagation();

			this.transitionTime();

			this.initiated = true;
			this.moved = false;
			this.lastPointX	= point.pageX;
			this.lastPointY	= point.pageY;

			this.startTime	= utils.getTime();

			if ( !this.options.disableTouch ) {
				utils.addEvent(window, 'touchmove', this);
			}
			if ( !this.options.disablePointer ) {
				utils.addEvent(window, utils.prefixPointerEvent('pointermove'), this);
			}
			if ( !this.options.disableMouse ) {
				utils.addEvent(window, 'mousemove', this);
			}

			this.scroller._execEvent('beforeScrollStart');
		},

		_move: function (e) {
			var point = e.touches ? e.touches[0] : e,
				deltaX, deltaY,
				newX, newY,
				timestamp = utils.getTime();

			if ( !this.moved ) {
				this.scroller._execEvent('scrollStart');
			}

			this.moved = true;

			deltaX = point.pageX - this.lastPointX;
			this.lastPointX = point.pageX;

			deltaY = point.pageY - this.lastPointY;
			this.lastPointY = point.pageY;

			newX = this.x + deltaX;
			newY = this.y + deltaY;

			this._pos(newX, newY);

	// INSERT POINT: indicator._move

			e.preventDefault();
			e.stopPropagation();
		},

		_end: function (e) {
			if ( !this.initiated ) {
				return;
			}

			this.initiated = false;

			e.preventDefault();
			e.stopPropagation();

			utils.removeEvent(window, 'touchmove', this);
			utils.removeEvent(window, utils.prefixPointerEvent('pointermove'), this);
			utils.removeEvent(window, 'mousemove', this);

			if ( this.scroller.options.snap ) {
				var snap = this.scroller._nearestSnap(this.scroller.x, this.scroller.y);

				var time = this.options.snapSpeed || Math.max(
						Math.max(
							Math.min(Math.abs(this.scroller.x - snap.x), 1000),
							Math.min(Math.abs(this.scroller.y - snap.y), 1000)
						), 300);

				if ( this.scroller.x != snap.x || this.scroller.y != snap.y ) {
					this.scroller.directionX = 0;
					this.scroller.directionY = 0;
					this.scroller.currentPage = snap;
					this.scroller.scrollTo(snap.x, snap.y, time, this.scroller.options.bounceEasing);
				}
			}

			if ( this.moved ) {
				this.scroller._execEvent('scrollEnd');
			}
		},

		transitionTime: function (time) {
			time = time || 0;
			var durationProp = utils.style.transitionDuration;
			this.indicatorStyle[durationProp] = time + 'ms';

			if ( !time && utils.isBadAndroid ) {
				this.indicatorStyle[durationProp] = '0.0001ms';
				// remove 0.0001ms
				var self = this;
				rAF(function() {
					if(self.indicatorStyle[durationProp] === '0.0001ms') {
						self.indicatorStyle[durationProp] = '0s';
					}
				});
			}
		},

		transitionTimingFunction: function (easing) {
			this.indicatorStyle[utils.style.transitionTimingFunction] = easing;
		},

		refresh: function () {
			this.transitionTime();

			if ( this.options.listenX && !this.options.listenY ) {
				this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? 'block' : 'none';
			} else if ( this.options.listenY && !this.options.listenX ) {
				this.indicatorStyle.display = this.scroller.hasVerticalScroll ? 'block' : 'none';
			} else {
				this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? 'block' : 'none';
			}

			if ( this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll ) {
				utils.addClass(this.wrapper, 'iScrollBothScrollbars');
				utils.removeClass(this.wrapper, 'iScrollLoneScrollbar');

				if ( this.options.defaultScrollbars && this.options.customStyle ) {
					if ( this.options.listenX ) {
						this.wrapper.style.right = '8px';
					} else {
						this.wrapper.style.bottom = '8px';
					}
				}
			} else {
				utils.removeClass(this.wrapper, 'iScrollBothScrollbars');
				utils.addClass(this.wrapper, 'iScrollLoneScrollbar');

				if ( this.options.defaultScrollbars && this.options.customStyle ) {
					if ( this.options.listenX ) {
						this.wrapper.style.right = '2px';
					} else {
						this.wrapper.style.bottom = '2px';
					}
				}
			}

			var r = this.wrapper.offsetHeight;	// force refresh

			if ( this.options.listenX ) {
				this.wrapperWidth = this.wrapper.clientWidth;
				if ( this.options.resize ) {
					this.indicatorWidth = Math.max(Math.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8);
					this.indicatorStyle.width = this.indicatorWidth + 'px';
				} else {
					this.indicatorWidth = this.indicator.clientWidth;
				}

				this.maxPosX = this.wrapperWidth - this.indicatorWidth;

				if ( this.options.shrink == 'clip' ) {
					this.minBoundaryX = -this.indicatorWidth + 8;
					this.maxBoundaryX = this.wrapperWidth - 8;
				} else {
					this.minBoundaryX = 0;
					this.maxBoundaryX = this.maxPosX;
				}

				this.sizeRatioX = this.options.speedRatioX || (this.scroller.maxScrollX && (this.maxPosX / this.scroller.maxScrollX));
			}

			if ( this.options.listenY ) {
				this.wrapperHeight = this.wrapper.clientHeight;
				if ( this.options.resize ) {
					this.indicatorHeight = Math.max(Math.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8);
					this.indicatorStyle.height = this.indicatorHeight + 'px';
				} else {
					this.indicatorHeight = this.indicator.clientHeight;
				}

				this.maxPosY = this.wrapperHeight - this.indicatorHeight;

				if ( this.options.shrink == 'clip' ) {
					this.minBoundaryY = -this.indicatorHeight + 8;
					this.maxBoundaryY = this.wrapperHeight - 8;
				} else {
					this.minBoundaryY = 0;
					this.maxBoundaryY = this.maxPosY;
				}

				this.maxPosY = this.wrapperHeight - this.indicatorHeight;
				this.sizeRatioY = this.options.speedRatioY || (this.scroller.maxScrollY && (this.maxPosY / this.scroller.maxScrollY));
			}

			this.updatePosition();
		},

		updatePosition: function () {
			var x = this.options.listenX && Math.round(this.sizeRatioX * this.scroller.x) || 0,
				y = this.options.listenY && Math.round(this.sizeRatioY * this.scroller.y) || 0;

			if ( !this.options.ignoreBoundaries ) {
				if ( x < this.minBoundaryX ) {
					if ( this.options.shrink == 'scale' ) {
						this.width = Math.max(this.indicatorWidth + x, 8);
						this.indicatorStyle.width = this.width + 'px';
					}
					x = this.minBoundaryX;
				} else if ( x > this.maxBoundaryX ) {
					if ( this.options.shrink == 'scale' ) {
						this.width = Math.max(this.indicatorWidth - (x - this.maxPosX), 8);
						this.indicatorStyle.width = this.width + 'px';
						x = this.maxPosX + this.indicatorWidth - this.width;
					} else {
						x = this.maxBoundaryX;
					}
				} else if ( this.options.shrink == 'scale' && this.width != this.indicatorWidth ) {
					this.width = this.indicatorWidth;
					this.indicatorStyle.width = this.width + 'px';
				}

				if ( y < this.minBoundaryY ) {
					if ( this.options.shrink == 'scale' ) {
						this.height = Math.max(this.indicatorHeight + y * 3, 8);
						this.indicatorStyle.height = this.height + 'px';
					}
					y = this.minBoundaryY;
				} else if ( y > this.maxBoundaryY ) {
					if ( this.options.shrink == 'scale' ) {
						this.height = Math.max(this.indicatorHeight - (y - this.maxPosY) * 3, 8);
						this.indicatorStyle.height = this.height + 'px';
						y = this.maxPosY + this.indicatorHeight - this.height;
					} else {
						y = this.maxBoundaryY;
					}
				} else if ( this.options.shrink == 'scale' && this.height != this.indicatorHeight ) {
					this.height = this.indicatorHeight;
					this.indicatorStyle.height = this.height + 'px';
				}
			}

			this.x = x;
			this.y = y;

			if ( this.scroller.options.useTransform ) {
				this.indicatorStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.scroller.translateZ;
			} else {
				this.indicatorStyle.left = x + 'px';
				this.indicatorStyle.top = y + 'px';
			}
		},

		_pos: function (x, y) {
			if ( x < 0 ) {
				x = 0;
			} else if ( x > this.maxPosX ) {
				x = this.maxPosX;
			}

			if ( y < 0 ) {
				y = 0;
			} else if ( y > this.maxPosY ) {
				y = this.maxPosY;
			}

			x = this.options.listenX ? Math.round(x / this.sizeRatioX) : this.scroller.x;
			y = this.options.listenY ? Math.round(y / this.sizeRatioY) : this.scroller.y;

			this.scroller.scrollTo(x, y);
		},

		fade: function (val, hold) {
			if ( hold && !this.visible ) {
				return;
			}

			clearTimeout(this.fadeTimeout);
			this.fadeTimeout = null;

			var time = val ? 250 : 500,
				delay = val ? 0 : 300;

			val = val ? '1' : '0';

			this.wrapperStyle[utils.style.transitionDuration] = time + 'ms';

			this.fadeTimeout = setTimeout((function (val) {
				this.wrapperStyle.opacity = val;
				this.visible = +val;
			}).bind(this, val), delay);
		}
	};

	IScroll.utils = utils;

	if ( typeof module != 'undefined' && module.exports ) {
		module.exports = IScroll;
	} else if ( true ) {
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () { return IScroll; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.IScroll = IScroll;
	}

	})(window, document, Math);


/***/ },
/* 200 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */
200,
/* 206 */,
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.FeatureTooltip = undefined;

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _openlayers = __webpack_require__(77);

	var _openlayers2 = _interopRequireDefault(_openlayers);

	var _jquery = __webpack_require__(78);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _globals = __webpack_require__(183);

	__webpack_require__(208);

	var _utilities = __webpack_require__(138);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @typedef {object} FeatureTooltipOptions
	 * @property {string} [className='g4u-featuretooltip']
	 * @property {number[]} [offset=[0,0]]
	 * @property {ol.OverlayPositioning} [positioning='center-center']
	 */

	/**
	 * Displays a tooltip if a feature with a name is hovered.
	 */
	var FeatureTooltip = exports.FeatureTooltip = function () {
	  /**
	   * @param {FeatureTooltipOptions} [options={}]
	   */
	  function FeatureTooltip() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    (0, _classCallCheck3.default)(this, FeatureTooltip);

	    /**
	     * @type {string}
	     * @private
	     */
	    this.className_ = options.hasOwnProperty('className') ? options.className : 'g4u-featuretooltip';

	    /**
	     * @type {jQuery}
	     * @private
	     */
	    this.$element_ = (0, _jquery2.default)('<span></span>').addClass(this.className_).addClass(_globals.cssClasses.hidden);

	    /**
	     * @type {ol.Overlay}
	     * @private
	     */
	    this.overlay_ = new _openlayers2.default.Overlay({
	      element: this.$element_.get(0),
	      offset: options.hasOwnProperty('offset') ? options.offset : [0, 0],
	      positioning: options.hasOwnProperty('positioning') ? options.positioning : 'center-center',
	      stopEvent: false
	    });

	    /**
	     * @type {?ol.Feature}
	     * @private
	     */
	    this.feature_ = null;

	    this.$element_.parent().addClass(this.className_ + '-container');
	  }

	  FeatureTooltip.filter_ = function filter_(feature) {
	    return !feature.get('disabled') && feature.get('name');
	  };

	  /**
	   * @param {G4UMap} map
	   */


	  FeatureTooltip.prototype.setMap = function setMap(map) {
	    var _this = this;

	    if (this.getMap()) {
	      this.getMap().removeOverlay(this.overlay_);
	    }

	    if (map) {
	      map.addOverlay(this.overlay_);

	      var interaction = map.getDefaultInteractions('pointermove')[0];
	      interaction.on('select', function (e) {
	        var selected = e.selected.filter(FeatureTooltip.filter_);
	        if (selected.length) {
	          _this.setFeature(selected[0]);
	        } else {
	          _this.setFeature(null);
	        }
	      });

	      /**
	       * @type {?G4UMap}
	       * @private
	       */
	      this.map_ = map;
	    }
	  };

	  /**
	   * @returns {?ol.Feature}
	   */


	  FeatureTooltip.prototype.getFeature = function getFeature() {
	    return this.feature_;
	  };

	  /**
	   * @param {?ol.Feature} feature
	   */


	  FeatureTooltip.prototype.setFeature = function setFeature(feature) {
	    if (feature) {
	      this.$element_.html((0, _utilities.html2Text)(feature.get('name')));
	      var geometry = feature.getGeometry();
	      var coord = _openlayers2.default.extent.getCenter(geometry.getExtent());
	      this.overlay_.setPosition(coord);
	      this.$element_.removeClass(_globals.cssClasses.hidden);
	    } else {
	      this.$element_.addClass(_globals.cssClasses.hidden);
	    }
	    this.feature_ = feature;
	  };

	  /**
	   * @returns {G4UMap}
	   */


	  FeatureTooltip.prototype.getMap = function getMap() {
	    return this.map_;
	  };

	  return FeatureTooltip;
	}();

/***/ },
/* 208 */
200,
/* 209 */,
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Shield = undefined;

	var _map = __webpack_require__(108);

	var _map2 = _interopRequireDefault(_map);

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(120);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(121);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _openlayers = __webpack_require__(77);

	var _openlayers2 = _interopRequireDefault(_openlayers);

	var _jquery = __webpack_require__(78);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _globals = __webpack_require__(183);

	var _html = __webpack_require__(198);

	__webpack_require__(211);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @typedef {object} ShieldOptions
	 * @property {G4UMap} map
	 * @property {string} [className='g4u-shield']
	 */

	/**
	 * @typedef {object} ElementPosition
	 * @property {jQuery} $actualElement
	 * @property {jQuery} $oldParent
	 * @property {number} oldIndex
	 */

	/**
	 * A shield that sets itself in front of all other elements in a context if activated, hides itself if deactivated.
	 * It can get another element in front of it (Attention: it gets removed from its context temporarly)
	 */
	var Shield = exports.Shield = function (_ol$Object) {
	  (0, _inherits3.default)(Shield, _ol$Object);

	  /**
	   * @param {ShieldOptions} options
	   */
	  function Shield(options) {
	    (0, _classCallCheck3.default)(this, Shield);

	    /**
	     * @type {string}
	     * @private
	     */
	    var _this = (0, _possibleConstructorReturn3.default)(this, _ol$Object.call(this));

	    _this.className_ = options.className || 'g4u-shield';

	    /**
	     * @type {G4UMap}
	     * @private
	     */
	    _this.map_ = options.map;

	    /**
	     * @type {jQuery}
	     * @private
	     */
	    _this.$context_ = (0, _jquery2.default)(_this.map_.getTarget());

	    /**
	     * @type {jQuery}
	     * @private
	     */
	    _this.$element_ = (0, _jquery2.default)('<div>').addClass(_this.className_);

	    _this.$context_.append(_this.$element_);

	    _this.setActive(options.hasOwnProperty('active') ? options.active : false);

	    _this.$element_.on('keydown', function (e) {
	      if (e.which === _globals.keyCodes.ESCAPE) {
	        if (_this.getActive()) {
	          _this.setActive(false);
	        }
	      }
	    });

	    /**
	     * @type {Map<jQuery, ElementPosition>}
	     * @private
	     */
	    _this.elementsOnTop_ = new _map2.default();
	    return _this;
	  }

	  /**
	   * @param {boolean} active
	   */


	  Shield.prototype.setActive = function setActive(active) {
	    var oldValue = this.active_;
	    if (oldValue !== active) {
	      if (active) {
	        this.$element_.removeClass(_globals.cssClasses.hidden);
	        (0, _html.getInFront)(this.$element_, this.$context_);
	      } else {
	        this.$element_.addClass(_globals.cssClasses.hidden);
	      }
	      this.active_ = active;
	      this.dispatchEvent({
	        type: 'change:active',
	        oldValue: oldValue,
	        key: 'active'
	      });
	    }
	  };

	  /**
	   * @returns {boolean}
	   */


	  Shield.prototype.getActive = function getActive() {
	    return this.active_;
	  };

	  /**
	   * Gets the given element in front of the shield. The element is removed from its context temporarily
	   * @param {jQuery} $element
	   */


	  Shield.prototype.add$OnTop = function add$OnTop($element) {
	    var $actualElement = $element;

	    var $window = $element.parents().filter('.g4u-window');
	    if ($window.length > 0) {
	      $actualElement = $window;
	    }

	    var $oldParent = $actualElement.parent();

	    this.elementsOnTop_.set($element[0], {
	      $actualElement: $actualElement,
	      $oldParent: $oldParent,
	      oldIndex: $oldParent.children().index($element)
	    });

	    this.$element_.append($actualElement);
	  };

	  /**
	   * Returns the given element in front of the shield to the previous context
	   * @param {jQuery} $element
	   */


	  Shield.prototype.remove$OnTop = function remove$OnTop($element) {
	    var elementPosition = this.elementsOnTop_.get($element[0]);
	    this.elementsOnTop_.delete($element[0]);

	    if (elementPosition.oldIndex === 0) {
	      elementPosition.$oldParent.prepend(elementPosition.$actualElement);
	    } else {
	      elementPosition.$oldParent.children().eq(elementPosition.oldIndex - 1).after(elementPosition.$actualElement);
	    }
	  };

	  /**
	   * Returns all children in front of the shield
	   * @returns {jQuery}
	   */


	  Shield.prototype.get$ElementsInFront = function get$ElementsInFront() {
	    return this.$element_.children();
	  };

	  return Shield;
	}(_openlayers2.default.Object);

/***/ },
/* 211 */
200,
/* 212 */,
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ControlFactory = undefined;

	var _map = __webpack_require__(108);

	var _map2 = _interopRequireDefault(_map);

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _openlayers = __webpack_require__(77);

	var _openlayers2 = _interopRequireDefault(_openlayers);

	var _Attribution = __webpack_require__(214);

	var _ComposedControl = __webpack_require__(222);

	var _ArrowButtons = __webpack_require__(228);

	var _CombinedZoom = __webpack_require__(236);

	var _LayerSelector = __webpack_require__(242);

	var _GeoLocationButton = __webpack_require__(250);

	var _MeasurementButton = __webpack_require__(259);

	var _LanguageSwitcherButton = __webpack_require__(264);

	var _LanguageSwitcherMenu = __webpack_require__(267);

	var _MobileControls = __webpack_require__(271);

	var _InfoButton = __webpack_require__(278);

	var _LinkButton = __webpack_require__(281);

	var _PrintButton = __webpack_require__(285);

	var _Logo = __webpack_require__(289);

	var _HelpButton = __webpack_require__(292);

	var _WindowDecorator = __webpack_require__(273);

	var _utilities = __webpack_require__(138);

	var _utilitiesObject = __webpack_require__(137);

	var _G4UMap = __webpack_require__(81);

	var _Debug = __webpack_require__(151);

	var _ActiveGroup = __webpack_require__(296);

	var _MousePosition = __webpack_require__(297);

	var _ScaleLine = __webpack_require__(300);

	var _OverviewMap = __webpack_require__(303);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @typedef {Object} ControlFactoryOptions
	 * @property {L10N} localiser
	 * @property {G4UMap} map
	 */

	/**
	 * A Factory that takes a control config as an object and returns the correspondig control. Modules can expand the
	 * functionality of this class via the createControl method
	 */
	var ControlFactory = exports.ControlFactory = function () {
	  /**
	   * @param {ControlFactoryOptions} options
	   * @public
	   */
	  function ControlFactory(options) {
	    (0, _classCallCheck3.default)(this, ControlFactory);

	    /**
	     * @type {L10N}
	     * @private
	     * */
	    this.localiser_ = options.localiser;

	    /**
	     * @type {G4UMap}
	     * @private
	     */
	    this.map_ = options.map;

	    /**
	     * @type {Map.<string, ActiveGroup>}
	     * @private
	     */
	    this.activeGroups_ = new _map2.default();
	  }

	  /**
	   * @returns {Positioning}
	   */


	  ControlFactory.prototype.getPositioning = function getPositioning() {
	    return this.map_.get('controlPositioning');
	  };

	  /**
	   * The factory function
	   * @param {string} controlType
	   * @param {g4uControlOptions} options
	   * @returns {Control}
	   * @public
	   */


	  ControlFactory.prototype.createControl = function createControl(controlType, options) {
	    switch (controlType) {
	      case 'mousePosition':
	        options.projection = options.projection || this.map_.get('interfaceProjection');
	        return new _MousePosition.MousePosition(options);
	      case 'attribution':
	        return new _Attribution.Attribution(options);
	      case 'zoom':
	        return new _CombinedZoom.CombinedZoom(options);
	      case 'scaleLine':
	        return new _ScaleLine.ScaleLine(options);
	      case 'logo':
	        return new _Logo.Logo(options);
	      case 'linkButton':
	        return new _LinkButton.LinkButton(options);
	      case 'mobileControls':
	        return new _MobileControls.MobileControls(options);
	      case 'overviewMap':
	        var projection = options.projection || this.map_.get('mapProjection');
	        options.view = new _openlayers2.default.View({ projection: projection });
	        options.layers = this.map_.get('baseLayers').getLayers();
	        return new _OverviewMap.OverviewMap(options);
	      case 'infoButton':
	        return new _WindowDecorator.WindowDecorator({
	          component: new _InfoButton.InfoButton(options)
	        });
	      case 'arrowButtons':
	        var mapConfig = this.map_.get('mapConfig');
	        if (mapConfig.view) {
	          if (mapConfig.view.center) {
	            options.initCenter = _openlayers2.default.proj.transform(mapConfig.view.center, this.map_.get('interfaceProjection'), this.map_.get('mapProjection'));
	          }
	          if (mapConfig.view.zoom) {
	            options.initZoom = mapConfig.view.zoom;
	          }
	        }
	        return new _ArrowButtons.ArrowButtons(options);
	      case 'layerSelector':
	        return new _LayerSelector.LayerSelector(options);
	      case 'geolocationButton':
	        return new _GeoLocationButton.GeolocationButton(options);
	      case 'languageSwitcherButton':
	        return new _LanguageSwitcherButton.LanguageSwitcherButton(options);
	      case 'languageSwitcherMenu':
	        return new _LanguageSwitcherMenu.LanguageSwitcherMenu(options);
	      case 'printButton':
	        return new _PrintButton.PrintButton(options);
	      case 'distanceMeasurementButton':
	        options.className = options.className || 'g4u-distance-measurement';
	        options.type = 'LineString';
	        options.dimension = 1;
	        return new _WindowDecorator.WindowDecorator({
	          component: new _MeasurementButton.MeasurementButton(options)
	        });
	      case 'areaMeasurementButton':
	        options.className = options.className || 'g4u-area-measurement';
	        options.type = 'Polygon';
	        options.dimension = 2;
	        return new _WindowDecorator.WindowDecorator({
	          component: new _MeasurementButton.MeasurementButton(options)
	        });
	      case 'helpButton':
	        options.configControls = this.map_.get('mapConfig').controls;
	        return new _WindowDecorator.WindowDecorator({
	          component: new _HelpButton.HelpButton(options)
	        });
	      case 'toolbox':
	        options.className = options.className || 'g4u-toolbox';
	        return new _ComposedControl.ComposedControl(options);
	      case 'layerMenu':
	        options.className = options.className || 'g4u-layermenu';
	        return new _ComposedControl.ComposedControl(options);
	    }
	  };

	  /**
	   * Function to add a control by its name to a certain receiver
	   * @param {ComposedControl|G4UMap} receiver
	   * @param {string} controlName
	   * @public
	   */


	  ControlFactory.prototype.addControlTo = function addControlTo(receiver, controlName) {
	    /**
	     * @type {g4uControlOptions}
	     */
	    var config = (0, _utilitiesObject.copyDeep)((0, _utilities.asObject)(this.controlsConfig[controlName]));

	    var controlType = config.controlType || controlName;

	    config.controlName = controlName;

	    config.localiser = this.localiser_;

	    if (!config.hasOwnProperty('importance') && receiver.getImportance) {
	      config.importance = receiver.getImportance();
	    }

	    var control = this.createControl(controlType, config, receiver);

	    var modules = this.map_.getModules();

	    for (var i = 0, ii = modules.length; i < ii && control === undefined; i++) {
	      control = modules[i].createControl(controlType, config, receiver);
	    }

	    if (control) {
	      if (config.activeGroup) {
	        if (!this.activeGroups_.has(config.activeGroup)) {
	          this.activeGroups_.set(config.activeGroup, new _ActiveGroup.ActiveGroup());
	        }
	        this.activeGroups_.get(config.activeGroup).addControl(control);
	      }

	      if (!this.map_.controlsByName[controlName]) {
	        this.map_.controlsByName[controlName] = [control];
	      } else {
	        this.map_.controlsByName[controlName].push(control);
	      }

	      receiver.addControl(control);

	      if (config.contains) {
	        this.addControlMultipleInternal_(control, config.contains);
	      }

	      if (control.rewire) {
	        control.rewire();
	      }

	      if (receiver instanceof _G4UMap.G4UMap) {
	        this.getPositioning().addControl(control);
	      }
	    } else if (control === undefined) {
	      throw new Error('Unrecognized control type ' + controlType + ', maybe you did forget to set the property type of the control?');
	    }
	  };

	  /**
	   * Adds multiple controls to one receiver
	   * @param {ComposedControl|G4UMap} receiver
	   * @param {string[]} controlNames
	   * @private
	   */


	  ControlFactory.prototype.addControlMultipleInternal_ = function addControlMultipleInternal_(receiver, controlNames) {
	    var _this = this;

	    controlNames.forEach(function (controlName) {
	      _Debug.Debug.tryOrThrow(function () {
	        _this.addControlTo(receiver, controlName);
	      });
	    });
	  };

	  /**
	   * Add all configured Controls to the map
	   * @public
	   */


	  ControlFactory.prototype.addControls = function addControls() {
	    this.controlsConfig = this.map_.get('mapConfig').controls;
	    if ((0, _utilities.checkFor)(this.controlsConfig, 'onMap')) {
	      this.addControlMultipleInternal_(this.map_, this.controlsConfig.onMap);
	    }
	  };

	  /**
	   * Sets the localiser to pass on to the controls
	   * @param {L10N} loc
	   * @public
	   */


	  ControlFactory.prototype.setLocaliser = function setLocaliser(loc) {
	    this.localiser_ = loc;
	  };

	  return ControlFactory;
	}();

/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Attribution = undefined;

	var _getIterator2 = __webpack_require__(105);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _map = __webpack_require__(108);

	var _map2 = _interopRequireDefault(_map);

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(120);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(121);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _jquery = __webpack_require__(78);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _Control = __webpack_require__(215);

	var _ListenerOrganizerMixin = __webpack_require__(217);

	var _utilities = __webpack_require__(138);

	var _globals = __webpack_require__(183);

	var _html = __webpack_require__(198);

	__webpack_require__(218);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Attribution = exports.Attribution = function (_mixin) {
	  (0, _inherits3.default)(Attribution, _mixin);

	  function Attribution(options) {
	    (0, _classCallCheck3.default)(this, Attribution);

	    options.className = options.className || 'g4u-attribution';
	    options.singleButton = false;
	    options.element = (0, _jquery2.default)('<div>').get(0);

	    var _this = (0, _possibleConstructorReturn3.default)(this, _mixin.call(this, options));

	    _this.setTipLabel(_this.getTipLabel() || _this.getLocaliser().localiseUsingDictionary('Attribution tipLabel'));

	    /**
	     * Attribution -> LayerNames
	     */
	    _this.visibleAttributions_ = new _map2.default();

	    _this.createStaticHTML(options);

	    _this.setCollapsed(options.collapsed === true);
	    return _this;
	  }

	  Attribution.prototype.setCollapsed = function setCollapsed(collapsed) {
	    var oldValue = this.collapsed_;
	    if (oldValue !== collapsed) {
	      this.collapsed_ = collapsed;
	      this.dispatchEvent({
	        type: 'change:collapsed',
	        oldValue: oldValue
	      });
	      this.get$Element().toggleClass(_globals.cssClasses.collapsed, collapsed);
	    }
	  };

	  Attribution.prototype.getCollapsed = function getCollapsed() {
	    return this.collapsed_;
	  };

	  Attribution.prototype.createStaticHTML = function createStaticHTML(options) {
	    var _this2 = this;

	    var $button = (0, _jquery2.default)('<button>').on('click', function () {
	      _this2.setCollapsed(!_this2.getCollapsed());
	    });
	    (0, _html.addTooltip)($button, this.getTipLabel());

	    this.$list_ = (0, _jquery2.default)('<ul>');

	    this.get$Element().append($button).append(this.$list_);

	    /**
	     * @type {boolean}
	     * @private
	     */
	    this.showPoweredBy_ = options.poweredBy !== false;
	    if (this.showPoweredBy_) {
	      var content = options.poweredBy === undefined ? '<a href="https://github.com/KlausBenndorf/guide4you" target="_blank">Guide4You</a>' : options.poweredBy;

	      /**
	       * @type {jQuery}
	       * @private
	       */
	      this.$poweredBy_ = (0, _jquery2.default)('<li>').append(content).addClass(this.className_ + '-poweredby');
	    }
	  };

	  Attribution.prototype.updateList = function updateList() {
	    var _this3 = this;

	    this.$list_.empty();
	    if (this.showPoweredBy_) {
	      this.$list_.append(this.$poweredBy_);
	    }
	    this.visibleAttributions_.forEach(function (layerTitles, attribution) {
	      var text = void 0;
	      if (layerTitles.length === 1) {
	        text = layerTitles[0];
	      } else {
	        text = layerTitles.slice(0, -1).join(', ') + ' & ' + layerTitles[layerTitles.length - 1];
	      }
	      text += ': ' + attribution;
	      _this3.$list_.append((0, _jquery2.default)('<li>').html(text));
	    });
	  };

	  Attribution.prototype.forEachLayer = function forEachLayer(layer) {
	    var _this4 = this;

	    if (layer.getLayers) {
	      this.listenAt(layer.getLayers()).on('add', function (e) {
	        _this4.forEachLayer(e.element);
	        _this4.updateList();
	      }).on('remove', function (e) {
	        _this4.detachFrom(e.element);
	        _this4.updateList();
	      });
	      layer.getLayers().forEach(function (l) {
	        return _this4.forEachLayer(l);
	      });
	    } else {
	      if (layer.getVisible()) {
	        this.addLayer(layer);
	      }
	      layer.on('change:visible', function () {
	        if (layer.getVisible()) {
	          _this4.addLayer(layer);
	        } else {
	          _this4.removeLayer(layer);
	        }
	        _this4.updateList();
	      });
	    }
	  };

	  Attribution.prototype.addLayer = function addLayer(layer) {
	    var attributions = layer.getSource().getAttributions();
	    var label = layer.isBaseLayer ? this.getLocaliser().localiseUsingDictionary('Attribution baseLayerLabel') : layer.get('title');
	    if (attributions) {
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = (0, _getIterator3.default)(attributions), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var attribution = _step.value;

	          attribution = attribution.getHTML();
	          var layerTitles = this.visibleAttributions_.get(attribution);
	          if (!layerTitles) {
	            layerTitles = [];
	            this.visibleAttributions_.set(attribution, layerTitles);
	          }
	          layerTitles.push(label);
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    }
	  };

	  Attribution.prototype.removeLayer = function removeLayer(layer) {
	    var attributions = layer.getSource().getAttributions();
	    var label = layer.isBaseLayer ? this.getLocaliser().localiseUsingDictionary('Attribution baseLayerLabel') : layer.get('title');
	    if (attributions) {
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = (0, _getIterator3.default)(attributions), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var attribution = _step2.value;

	          attribution = attribution.getHTML();
	          var layerTitles = this.visibleAttributions_.get(attribution);
	          layerTitles.splice(layerTitles.indexOf(label), 1);
	          if (layerTitles.length === 0) {
	            this.visibleAttributions_.delete(attribution);
	          }
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }
	    }
	  };

	  Attribution.prototype.setMap = function setMap(map) {
	    if (this.getMap()) {
	      this.detachAllListeners();
	    }

	    _mixin.prototype.setMap.call(this, map);

	    if (map) {
	      this.forEachLayer(map.getLayerGroup());
	      this.updateList();
	    }
	  };

	  return Attribution;
	}((0, _utilities.mixin)(_Control.Control, _ListenerOrganizerMixin.ListenerOrganizerMixin));

/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Control = undefined;

	var _openlayers = __webpack_require__(77);

	var _openlayers2 = _interopRequireDefault(_openlayers);

	var _utilities = __webpack_require__(138);

	var _ControlLogicMixin = __webpack_require__(216);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @typedef {object} g4uControlOptions
	 * @property {string} [controlType] the type of the control. If not given the name of the control is used
	 * @property {number} [importance] how important the control is on the map. the higher this value is, the longer it
	 *    will be kept on the map if the viewport gets smaller.
	 * @property {string} [activeGroup] if controls are in the same active group only one of them can be active at the same
	 *    time
	 * @property {string} [className]
	 * @property {HTMLElement} element
	 * @property {L10N} localiser the localiser to use by the control.
	 * @property {string} controlName the name of the control.
	 * @property {boolean} [singleButton=false] if the control only consists of one button
	 * @property {String|HTMLElement|jQuery} [target]
	 * @property {Localizable} [title] not used by every control
	 * @property {Localizable} [tipLabel] not used by every control
	 * @property {Float} [float]
	 * @property {boolean} [windowed=false] whether the control resides inside a window or not
	 */

	/**
	 * This is a customized ol.control.Control class, all logic is in the ol.control.ControlLogic
	 * @class Control
	 * @extends {ControlLogicMixin}
	 * @extends {ol.control.Control}
	 */

	var Control = exports.Control = (0, _utilities.mixin)(_openlayers2.default.control.Control, _ControlLogicMixin.ControlLogicMixin);

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ControlLogicMixin = undefined;

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _jquery = __webpack_require__(78);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _globals = __webpack_require__(183);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * This class contains logic which should be part of any Control in the Software. Any custom controls
	 * should inherit from Control which inherits from this class AND from ol.cont
	 */
	var ControlLogicMixin = exports.ControlLogicMixin = function () {
	  function ControlLogicMixin() {
	    (0, _classCallCheck3.default)(this, ControlLogicMixin);
	  }

	  /**
	   * @param {g4uControlOptions} options
	   */
	  ControlLogicMixin.prototype.initialize = function initialize() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    /**
	     * @type {string}
	     * @private
	     */
	    this.className_ = options.hasOwnProperty('className') ? options.className : '';

	    if (options.hasOwnProperty('target')) {
	      var $target = void 0;
	      if (typeof options.target === 'string' && options.target[0] !== '#') {
	        $target = (0, _jquery2.default)('#' + options.target);
	      } else {
	        $target = (0, _jquery2.default)(options.target);
	      }
	      this.set$Target($target);
	    }

	    if (options.hasOwnProperty('element')) {
	      (0, _jquery2.default)(options.element).addClass(this.className_).addClass('ol-unselectable ol-control');
	    }

	    /**
	     * @type {boolean}
	     */
	    this.singleButton = options.singleButton === true;
	    if (this.singleButton) {
	      (0, _jquery2.default)(options.element).addClass(_globals.cssClasses.mainButton);
	    }

	    /**
	     * @type {string|undefined}
	     * @private
	     */
	    this.controlName_ = options.controlName;

	    /**
	     * @type {boolean}
	     * @private
	     */
	    this.windowed_ = options.hasOwnProperty('windowed') ? options.windowed : false;

	    /**
	     * @type {L10N}
	     * @private
	     */
	    this.localiser_ = options.localiser;

	    /**
	     * @type {string|undefined}
	     * @private
	     */
	    this.title_ = options.hasOwnProperty('title') ? this.getLocaliser().selectL10N(options.title) : undefined;

	    /**
	     * @type {string|undefined}
	     * @private
	     */
	    this.tipLabel_ = options.hasOwnProperty('tipLabel') ? this.getLocaliser().selectL10N(options.tipLabel) : undefined;

	    /**
	     * @type {string[]| string}
	     * @private
	     */
	    this.float_ = options.float === undefined ? ['top', 'left'] : options.float;

	    /**
	     * @type {number}
	     * @private
	     */
	    this.importance_ = options.importance || 0;
	  };

	  /**
	   * Returns the floating directions of the control
	   * @returns {string[]|string}
	   */


	  ControlLogicMixin.prototype.getFloat = function getFloat() {
	    return this.float_;
	  };

	  /**
	   * @returns {number}
	   */


	  ControlLogicMixin.prototype.getImportance = function getImportance() {
	    return this.importance_;
	  };

	  /**
	   * @returns {L10N}
	   */


	  ControlLogicMixin.prototype.getLocaliser = function getLocaliser() {
	    return this.localiser_;
	  };

	  /**
	   * Returns true if the element consists only of a single button
	   * @returns {Boolean} element it is created in
	   */


	  ControlLogicMixin.prototype.isSingleButton = function isSingleButton() {
	    return this.singleButton;
	  };

	  /**
	   * @returns {boolean}
	   */


	  ControlLogicMixin.prototype.isWindowed = function isWindowed() {
	    return this.windowed_;
	  };

	  /**
	   * Returns the name of the control if given to the constructor
	   * @returns {string}
	   */


	  ControlLogicMixin.prototype.getControlName = function getControlName() {
	    return this.controlName_;
	  };

	  /**
	   * Returns the title of the control if given to the constructor
	   * @returns {string}
	   */


	  ControlLogicMixin.prototype.getTitle = function getTitle() {
	    return this.title_;
	  };

	  /**
	   * @param {Localizable} title
	   */


	  ControlLogicMixin.prototype.setTitle = function setTitle(title) {
	    this.title_ = this.getLocaliser().selectL10N(title);
	  };

	  /**
	   * Returns the tipLabel of the control if given to the constructor
	   * @returns {string} title
	   */


	  ControlLogicMixin.prototype.getTipLabel = function getTipLabel() {
	    return this.tipLabel_;
	  };

	  /**
	   * @param {Localizable} tipLabel
	   */


	  ControlLogicMixin.prototype.setTipLabel = function setTipLabel(tipLabel) {
	    this.tipLabel_ = this.getLocaliser().selectL10N(tipLabel);
	  };

	  /**
	   * Returns the element of the control
	   * @returns {jQuery} element it is created in
	   */


	  ControlLogicMixin.prototype.get$Element = function get$Element() {
	    return (0, _jquery2.default)(this.element);
	  };

	  /**
	   * Returns the target of the control
	   * @returns {jQuery} element it is created in
	   */


	  ControlLogicMixin.prototype.get$Target = function get$Target() {
	    if (this.catched$Target_) {
	      return this.catched$Target_;
	    } else if (this.getMap()) {
	      this.catched$Target_ = (0, _jquery2.default)(this.getMap().getViewport()).children('.ol-overlaycontainer-stopevent');
	      return this.catched$Target_;
	    }
	  };

	  /**
	   * Returns the CSS-className of the control
	   * @returns {string} CSS-className
	   */


	  ControlLogicMixin.prototype.getClassName = function getClassName() {
	    return this.className_;
	  };

	  /**
	   * Sets a new target for the control
	   * @param {jQuery} $target element it is moved to
	   */


	  ControlLogicMixin.prototype.set$Target = function set$Target($target) {
	    /**
	     * @type {jQuery}
	     * @private
	     */
	    this.catched$Target_ = $target;
	    this.setTarget($target[0]);
	    $target.append(this.get$Element());
	  };

	  return ControlLogicMixin;
	}();

/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ListenerOrganizerMixin = undefined;

	var _getIterator2 = __webpack_require__(105);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _openlayers = __webpack_require__(77);

	var _openlayers2 = _interopRequireDefault(_openlayers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var DOMListener = function () {
	  function DOMListener(element, event, listener, useCapture) {
	    (0, _classCallCheck3.default)(this, DOMListener);

	    this.element = element;
	    this.event = event;
	    this.listener = listener;
	    this.useCapture = useCapture;
	    element.addEventListener(event, listener, useCapture);
	  }

	  DOMListener.prototype.detach = function detach() {
	    this.element.removeEventListener(this.event, this.listener, this.useCapture);
	  };

	  DOMListener.usable = function usable(element) {
	    return element.addEventListener;
	  };

	  return DOMListener;
	}();

	var JQueryListener = function () {
	  function JQueryListener(element, event, listener) {
	    (0, _classCallCheck3.default)(this, JQueryListener);

	    this.element = element;
	    this.event = event;
	    this.listener = listener;
	    element.on(event, listener);
	  }

	  JQueryListener.prototype.detach = function detach() {
	    this.element.off(this.event, this.listener);
	  };

	  JQueryListener.usable = function usable(element) {
	    return element.on && element.off;
	  };

	  return JQueryListener;
	}();

	var OLListener = function () {
	  function OLListener(element, event, listener) {
	    (0, _classCallCheck3.default)(this, OLListener);

	    this.key_ = element.on(event, listener);
	  }

	  OLListener.prototype.detach = function detach() {
	    _openlayers2.default.Observable.unByKey(this.key_);
	  };

	  OLListener.usable = function usable(element) {
	    return element.on && element.un;
	  };

	  return OLListener;
	}();

	var ListenerOrganizerMixin = exports.ListenerOrganizerMixin = function () {
	  function ListenerOrganizerMixin() {
	    (0, _classCallCheck3.default)(this, ListenerOrganizerMixin);
	  }

	  ListenerOrganizerMixin.prototype.initialize = function initialize() {
	    this.organizedListeners_ = [];
	  };

	  ListenerOrganizerMixin.prototype.listenAt = function listenAt(elements) {
	    var _this = this;

	    elements = Array.isArray(elements) ? elements : [elements];
	    var _on = {
	      on: function on(event, listener, useCapture) {
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	          for (var _iterator = (0, _getIterator3.default)(elements), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var element = _step.value;
	            var _arr = [DOMListener, JQueryListener, OLListener];

	            for (var _i = 0; _i < _arr.length; _i++) {
	              var TypeListener = _arr[_i];
	              if (TypeListener.usable(element)) {
	                _this.organizedListeners_.push(new TypeListener(element, event, listener, useCapture));
	              }
	            }
	          }
	        } catch (err) {
	          _didIteratorError = true;
	          _iteratorError = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	              _iterator.return();
	            }
	          } finally {
	            if (_didIteratorError) {
	              throw _iteratorError;
	            }
	          }
	        }

	        return _on;
	      }
	    };
	    return _on;
	  };

	  ListenerOrganizerMixin.prototype.detachFrom = function detachFrom(element) {
	    var _iteratorNormalCompletion2 = true;
	    var _didIteratorError2 = false;
	    var _iteratorError2 = undefined;

	    try {
	      for (var _iterator2 = (0, _getIterator3.default)(this.organizedListeners_.filter(function (l) {
	        return l.element === element;
	      })), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	        var listener = _step2.value;

	        listener.detach();
	      }
	    } catch (err) {
	      _didIteratorError2 = true;
	      _iteratorError2 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion2 && _iterator2.return) {
	          _iterator2.return();
	        }
	      } finally {
	        if (_didIteratorError2) {
	          throw _iteratorError2;
	        }
	      }
	    }
	  };

	  ListenerOrganizerMixin.prototype.detachAllListeners = function detachAllListeners() {
	    var _iteratorNormalCompletion3 = true;
	    var _didIteratorError3 = false;
	    var _iteratorError3 = undefined;

	    try {
	      for (var _iterator3 = (0, _getIterator3.default)(this.organizedListeners_), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	        var listener = _step3.value;

	        listener.detach();
	      }
	    } catch (err) {
	      _didIteratorError3 = true;
	      _iteratorError3 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion3 && _iterator3.return) {
	          _iterator3.return();
	        }
	      } finally {
	        if (_didIteratorError3) {
	          throw _iteratorError3;
	        }
	      }
	    }

	    this.organizedListeners_ = [];
	  };

	  return ListenerOrganizerMixin;
	}();

/***/ },
/* 218 */
200,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ComposedControl = undefined;

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(120);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(121);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _jquery = __webpack_require__(78);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _Window = __webpack_require__(197);

	var _Control2 = __webpack_require__(215);

	var _globals = __webpack_require__(183);

	__webpack_require__(223);

	__webpack_require__(225);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @typedef {g4uControlOptions} ComposedControlOptions
	 * @property {string} [containerClassName]
	 */

	/**
	 * This is a class ComposedControl which provides some functionality for controls which are composed out of several
	 * other controls. It makes use of the composite pattern.
	 */

	var ComposedControl = exports.ComposedControl = function (_Control) {
	  (0, _inherits3.default)(ComposedControl, _Control);

	  /**
	   * @param {ComposedControlOptions} [options={}]
	   */
	  function ComposedControl() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    (0, _classCallCheck3.default)(this, ComposedControl);

	    var $container = (0, _jquery2.default)('<div>');

	    if (options.hasOwnProperty('element')) {
	      (0, _jquery2.default)(options.element).append($container);
	    } else {
	      options.element = $container.get(0);
	    }

	    options.singleButton = false;

	    /**
	     * @type {Control[]}
	     * @private
	     */
	    var _this = (0, _possibleConstructorReturn3.default)(this, _Control.call(this, options));

	    _this.controls_ = [];

	    /**
	     * @type {jQuery}
	     * @private
	     */
	    _this.$container_ = $container;

	    if (options.hasOwnProperty('containerClassName')) {
	      _this.$container_.addClass(options.containerClassName);
	    }

	    /**
	     * @type {string}
	     * @private
	     */
	    _this.classNameItem_ = _this.getClassName() + '-item';
	    /**
	     * @type {string}
	     * @private
	     */
	    _this.classNameItemFirst_ = _this.classNameItem_ + '-first';
	    /**
	     * @type {string}
	     * @private
	     */
	    _this.classNameItemLast_ = _this.classNameItem_ + '-last';
	    return _this;
	  }

	  /**
	   * @returns {Control[]}
	   */


	  ComposedControl.prototype.getControls = function getControls() {
	    return this.controls_;
	  };

	  /**
	   * @returns {jQuery}
	   */


	  ComposedControl.prototype.get$Container = function get$Container() {
	    return this.$container_;
	  };

	  /**
	   * @param {Control} control
	   * @private
	   */


	  ComposedControl.prototype.setWindowForControl_ = function setWindowForControl_(control) {
	    var aWindow = new _Window.Window({ $context: (0, _jquery2.default)(this.getMap().getViewport()) });
	    control.setWindow(aWindow, true);
	  };

	  /**
	   * This method adds some helping css classes to the items
	   * @param {jQuery} $item
	   * @returns {jQuery}
	   * @private
	   */


	  ComposedControl.prototype.addClasses_ = function addClasses_($item) {
	    $item.addClass(this.classNameItemLast_);

	    if (this.$container_.children().length === 0) {
	      $item.addClass(this.classNameItemFirst_);
	    } else {
	      this.$container_.children(':last-child').removeClass(this.classNameItemLast_);
	    }

	    return $item;
	  };

	  /**
	   *
	   * @param {Control} control
	   * @param {Object} options
	   * @param {Boolean} [options.claim=true] if claim is set to false the control won't add anything to the container
	   * @param {Boolean} [options.wrap=true] if wrap is set to true a span will be put arround the element
	   *    if set to false the element of the control will be inserted directly
	   * @param {Boolean} [options.cssPosition=true] if this is set to true the wrap or the element will get css classes
	   *    indicating its position inside the container
	   * @param {HTMLElement} [options.element] if this is set it will be put inside the container instead calling
	   *    control.set$Target()
	   */


	  ComposedControl.prototype.addControl = function addControl(control) {
	    var _this2 = this;

	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    var map = this.getMap();
	    if (map) {
	      map.addControl(control);
	    } else {
	      throw new Error('composed controls needs to be added to the map before they can get any controls');
	    }

	    if (control.setWindow) {
	      this.setWindowForControl_(control);
	    }

	    if (!options.hasOwnProperty('claim') || !options.claim) {
	      if (!options.hasOwnProperty('wrap') || options.wrap) {
	        var $wrap = (0, _jquery2.default)('<div>');

	        if (options.hasOwnProperty('element')) {
	          $wrap.append((0, _jquery2.default)(options.element));
	        } else {
	          control.set$Target($wrap);
	        }

	        $wrap.addClass(this.classNameItem_);

	        if (!options.hasOwnProperty('cssPosition') || options.cssPosition) {
	          this.addClasses_($wrap);
	        }

	        if (control.getVisible && !control.getVisible()) {
	          $wrap.addClass(_globals.cssClasses.hidden);
	        }

	        this.$container_.append($wrap);
	      } else {
	        (0, _jquery2.default)(options.element).addClass(this.classNameItem_);

	        if (!options.hasOwnProperty('cssPosition') || options.cssPosition) {
	          this.addClasses_((0, _jquery2.default)(options.element));
	        }

	        if (options.hasOwnProperty('element')) {
	          this.$container_.append((0, _jquery2.default)(options.element));
	        } else {
	          control.set$Target(this.$container_);
	        }
	      }

	      control.on('change', function () {
	        return _this2.changed();
	      });
	    }

	    control.on('change', function (e) {
	      return _this2.dispatchEvent(e);
	    });

	    this.controls_.push(control);

	    this.changed();
	  };

	  /**
	   * @param {Control} control
	   */


	  ComposedControl.prototype.removeControl = function removeControl(control) {
	    if (control.get$Element().hasClass(this.classNameItem_)) {
	      control.get$Element().remove();
	    } else if (control.get$Element().parent().hasClass(this.classNameItem_)) {
	      control.get$Element().parent().remove();
	    }

	    this.controls_.splice(this.controls_.indexOf(control), 1);
	    this.getMap().removeControl(control);

	    this.changed();
	  };

	  /**
	   * @param {G4UMap} map
	   */


	  ComposedControl.prototype.setMap = function setMap(map) {
	    var _this3 = this;

	    if (this.getMap()) {
	      this.controls_.forEach(function (control) {
	        _this3.getMap().removeControl(control);
	      });

	      this.controls_ = [];
	    }

	    _Control.prototype.setMap.call(this, map);
	  };

	  return ComposedControl;
	}(_Control2.Control);

/***/ },
/* 223 */
200,
/* 224 */,
/* 225 */
200,
/* 226 */,
/* 227 */,
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ArrowButtons = undefined;

	var _getIterator2 = __webpack_require__(105);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(120);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(121);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _openlayers = __webpack_require__(77);

	var _openlayers2 = _interopRequireDefault(_openlayers);

	var _jquery = __webpack_require__(78);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _utilitiesObject = __webpack_require__(137);

	var _Control2 = __webpack_require__(215);

	var _html = __webpack_require__(198);

	__webpack_require__(229);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @typedef {g4uControlOptions} ArrowButtonOptions
	 * @property {number} [pixelDelta=128] how many pixels should one click move the map
	 * @property {ol.Extent|undefined} [initExtent=undefined] the initial Extent to move the map back to (center button)
	 * @property {number} [animationDuration=100] duration of the animation
	 * @property {boolean} [animated=true] if the move should be done with an animation or without
	 * @property {{up: string, right: string, down: string, left: string, center: string}} [labels={}]
	 *  unicode labels for the buttons (only shown if pictures are not loaded)
	 */

	/**
	 * ArrowButtons shows Buttons on the map which let you move in all 4 directions and a button to return to the initial
	 * position of the map. It provides an Interface class with an produceOlControl returning an
	 * {ol.control.Control} - Object. This can be added as normal controls to the map
	 * (e.g. ``map.addControl(arrowButtons.produceOlControl)`` ).
	 *
	 * The Options are passed as an Object (e.g. ``{ initCenter : map.getView().getCenter(),
	 *      initZoom : map.getView().getZoom() }``.
	 */
	var ArrowButtons = exports.ArrowButtons = function (_Control) {
	  (0, _inherits3.default)(ArrowButtons, _Control);

	  /**
	   * @param {ArrowButtonOptions} [options={}]
	   */
	  function ArrowButtons() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    (0, _classCallCheck3.default)(this, ArrowButtons);

	    options.className = options.className || 'g4u-arrowbuttons';
	    options.element = (0, _jquery2.default)('<div class="ol-unselectable ol-control"></div>')[0];
	    options.singleButton = false;

	    var _this = (0, _possibleConstructorReturn3.default)(this, _Control.call(this, options));

	    var description = {
	      'left': _this.getLocaliser().localiseUsingDictionary('ArrowButtons leftward'),
	      'right': _this.getLocaliser().localiseUsingDictionary('ArrowButtons rightward'),
	      'up': _this.getLocaliser().localiseUsingDictionary('ArrowButtons upward'),
	      'down': _this.getLocaliser().localiseUsingDictionary('ArrowButtons downward'),
	      'center': _this.getLocaliser().localiseUsingDictionary('ArrowButtons centerward')
	    };

	    /**
	     * @type {number}
	     * @private
	     */
	    _this.pixelDelta_ = options.pixelDelta || 128;

	    /**
	     * @type {ol.Extent|undefined}
	     * @private
	     */
	    _this.initExtent_ = options.initExtent || undefined;

	    /**
	     * @type {number}
	     * @private
	     */
	    _this.animationDuration_ = options.animationDuration || 100;

	    /**
	     * @type {boolean}
	     * @private
	     */
	    _this.animated_ = options.animated || true;

	    /**
	     * @type {string[]}
	     * @private
	     */
	    _this.directions_ = ['center', 'left', 'up', 'right', 'down'];

	    /**
	     * @type {{left: number[], up: number[], right: number[], down: number[]}}
	     * @private
	     */
	    _this.vectors_ = { left: [-1, 0], up: [0, 1], right: [1, 0], down: [0, -1] };

	    /**
	     * @type {{up: string, right: string, down: string, left: string, center: string}}
	     * @private
	     */
	    _this.labels_ = (0, _utilitiesObject.merge)(options.labels || {}, {
	      left: '&#9665;',
	      up: '&#9651;',
	      right: '&#9655;',
	      down: '&#9661;',
	      center: '&#9675;'
	    });

	    // creating the HTML-Elements and registering Event-Handlers

	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	      var _loop = function _loop() {
	        var direction = _step.value;

	        // HTML

	        var $button = (0, _jquery2.default)('<button>').addClass(_this.className_ + '-' + direction).html(_this.labels_[direction]);

	        (0, _html.addTooltip)($button, description[direction]);

	        // Handler
	        $button.on('click', function () {
	          _this.onClick_(direction);
	          $button.blur();
	        });

	        // adding button
	        _this.get$Element().append($button);
	      };

	      for (var _iterator = (0, _getIterator3.default)(_this.directions_), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        _loop();
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator.return) {
	          _iterator.return();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }

	    return _this;
	  }

	  /**
	   * @param {G4UMap} map
	   */


	  ArrowButtons.prototype.setMap = function setMap(map) {
	    _Control.prototype.setMap.call(this, map);

	    if (map) {
	      if (!this.initExtent_) {
	        this.initExtent_ = map.getView().calculateExtent(map.getSize());
	      }
	    }
	  };

	  /**
	   * This method is called when a button is clicked and makes a move on the map corresponding to the direction.
	   * @param {string} direction
	   * @private
	   */


	  ArrowButtons.prototype.onClick_ = function onClick_(direction) {
	    var map = this.getMap();
	    var view = map.getView();

	    if (direction === 'center') {
	      map.get('move').toExtent(this.initExtent_, { animated: this.animated_ });
	    } else {
	      var resolution = view.getResolution();
	      var rotation = view.getRotation();

	      // a vector that points in the direction the move should be going
	      var dirVec = this.vectors_[direction];

	      // this calculates the 'move'-vector out of the direction and pixelDelta (-> length, how many pixels per move)
	      var delta = [dirVec[0] * resolution * this.pixelDelta_, dirVec[1] * resolution * this.pixelDelta_];

	      // this rotates if needed
	      _openlayers2.default.coordinate.rotate(delta, rotation);

	      var oldPosition = view.getCenter();

	      if (this.animated_) {
	        // creating a pan-animation
	        var pan = _openlayers2.default.animation.pan({
	          duration: this.animationDuration_,
	          source: oldPosition
	        });
	        map.beforeRender(pan);
	      }

	      // adding the delta to the actual center
	      view.setCenter(view.constrainCenter([oldPosition[0] + delta[0], oldPosition[1] + delta[1]]));
	    }
	    (0, _jquery2.default)(map.getViewport()).focus();
	  };

	  return ArrowButtons;
	}(_Control2.Control);

/***/ },
/* 229 */
200,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ZoomSlider = exports.Zoom = exports.CombinedZoom = undefined;

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(120);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(121);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _openlayers = __webpack_require__(77);

	var _openlayers2 = _interopRequireDefault(_openlayers);

	var _jquery = __webpack_require__(78);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _ComposedControl2 = __webpack_require__(222);

	var _globals = __webpack_require__(183);

	var _utilitiesObject = __webpack_require__(137);

	__webpack_require__(237);

	var _utilities = __webpack_require__(138);

	var _RewireMixin = __webpack_require__(241);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @typedef {ComposedControlOptions} CombinedZoomOptions
	 * @property {boolean} [buttons=true] visibility of the zoombuttons
	 * @property {boolean} [slider=true] visibility of the zoomslider
	 * @property {number} [buttonImportance] importance of the buttons
	 * @property {number} [sliderImportance] importance of the slider
	 * @property {string} [zoomInTipLabel]
	 * @property {string} [zoomOutTipLabel]
	 */

	/**
	 * This combines the two zoom controls (zoomslider and zoombuttons)
	 */
	var CombinedZoom = exports.CombinedZoom = function (_ComposedControl) {
	  (0, _inherits3.default)(CombinedZoom, _ComposedControl);

	  /**
	   * @param {CombinedZoomOptions} [options={}]
	   */
	  function CombinedZoom() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    (0, _classCallCheck3.default)(this, CombinedZoom);

	    options.element = (0, _jquery2.default)('<div>').get(0);
	    options.className = options.className || 'g4u-zoom';
	    options.singleButton = false;

	    var _this = (0, _possibleConstructorReturn3.default)(this, _ComposedControl.call(this, options));

	    delete options.element;

	    /**
	     * @type {boolean}
	     * @private
	     */
	    _this.hasButtons_ = options.buttons || !options.hasOwnProperty('buttons');

	    /**
	     * @type {boolean}
	     * @private
	     */
	    _this.hasSlider_ = options.slider || !options.hasOwnProperty('slider');

	    if (_this.hasButtons_) {
	      _this.zoomButtonOptions = (0, _utilitiesObject.copy)(options);
	      _this.zoomButtonOptions.importance = options.buttonImportance || options.importance;
	      _this.zoomButtonOptions.zoomInTipLabel = options.hasOwnProperty('zoomInTipLabel') ? _this.getLocaliser().selectL10N(options.zoomInTipLabel) : _this.getLocaliser().localiseUsingDictionary('Zoom zoomInTipLabel');

	      _this.zoomButtonOptions.zoomOutTipLabel = options.hasOwnProperty('zoomOutTipLabel') ? _this.getLocaliser().selectL10N(options.zoomOutTipLabel) : _this.getLocaliser().localiseUsingDictionary('Zoom zoomOutTipLabel');
	    }

	    if (_this.hasSlider_) {
	      _this.zoomSliderOptions = (0, _utilitiesObject.copy)(options);
	      _this.zoomSliderOptions.importance = options.sliderImportance;
	      _this.zoomSliderOptions.className = 'g4u-zoomslider';
	    }
	    return _this;
	  }

	  /**
	   * @param {G4UMap} map
	   */


	  CombinedZoom.prototype.setMap = function setMap(map) {
	    _ComposedControl.prototype.setMap.call(this, map);

	    if (map) {
	      if (this.hasSlider_) {
	        this.addZoomSlider();
	      }

	      if (this.hasButtons_) {
	        this.addZoomButtons();
	      }
	    }
	  };

	  CombinedZoom.prototype.addZoomButtons = function addZoomButtons() {
	    /**
	     * @type {Zoom}
	     * @private
	     */
	    this.zoomButtons_ = new Zoom(this.zoomButtonOptions);

	    this.addControl(this.zoomButtons_, { wrap: false });

	    var $zoomIn = this.zoomButtons_.get$Element().children('.g4u-zoom-in');
	    var $zoomOut = this.zoomButtons_.get$Element().children('.g4u-zoom-out');

	    this.get$Container().prepend($zoomIn);
	    this.get$Container().append($zoomOut);

	    this.zoomButtons_.get$Element().remove();
	  };

	  CombinedZoom.prototype.addZoomSlider = function addZoomSlider() {
	    /**
	     * @type {ZoomSlider}
	     * @private
	     */
	    this.zoomSlider_ = new ZoomSlider(this.zoomSliderOptions);

	    this.addControl(this.zoomSlider_, { wrap: false });

	    var $zoomSlider = this.zoomSlider_.get$Element();

	    $zoomSlider.on('mousedown', function () {
	      $zoomSlider.addClass(_globals.cssClasses.mousedown);
	    });
	    $zoomSlider.on('mouseup', function () {
	      $zoomSlider.removeClass(_globals.cssClasses.mousedown);
	    });

	    var $zoomIn = this.get$Container().filter('.g4u-zoom-in');

	    if ($zoomIn.length) {
	      $zoomSlider.insertAfter($zoomIn);
	    } else {
	      this.get$Container().append($zoomSlider);
	    }
	  };

	  return CombinedZoom;
	}(_ComposedControl2.ComposedControl);

	/**
	 * @typedef {g4uControlOptions} ZoomOptions
	 * @property {Localizable} [zoomInTipLabel]
	 * @property {Localizable} [zoomOutTipLabel]
	 */

	/**
	 * @extends Control
	 */


	var Zoom = exports.Zoom = function (_mixin) {
	  (0, _inherits3.default)(Zoom, _mixin);

	  /**
	   * @param {g4uControlOptions} [options={}]
	   */
	  function Zoom() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    (0, _classCallCheck3.default)(this, Zoom);

	    options.className = options.hasOwnProperty('className') ? options.className : 'g4u-zoom';

	    options.zoomInTipLabel = options.hasOwnProperty('zoomInTipLabel') ? options.localiser.selectL10N(options.zoomInTipLabel) : options.localiser.localiseUsingDictionary('Zoom zoomInTipLabel');

	    options.zoomOutTipLabel = options.hasOwnProperty('zoomOutTipLabel') ? options.localiser.selectL10N(options.zoomOutTipLabel) : options.localiser.localiseUsingDictionary('Zoom zoomOutTipLabel');

	    return (0, _possibleConstructorReturn3.default)(this, _mixin.call(this, options));
	  }

	  return Zoom;
	}((0, _utilities.mixin)(_openlayers2.default.control.Zoom, _RewireMixin.RewireMixin));

	/**
	 * @extends Control
	 */


	var ZoomSlider = exports.ZoomSlider = function (_mixin2) {
	  (0, _inherits3.default)(ZoomSlider, _mixin2);

	  /**
	   * @param {g4uControlOptions} [options={}]
	   */
	  function ZoomSlider() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    (0, _classCallCheck3.default)(this, ZoomSlider);

	    options.className = options.hasOwnProperty('className') ? options.className : 'g4u-zoomslider';

	    return (0, _possibleConstructorReturn3.default)(this, _mixin2.call(this, options));
	  }

	  ZoomSlider.prototype.rewire = function rewire() {
	    _mixin2.prototype.rewire.call(this);

	    this.get$Element().on('mousedown', function () {
	      (0, _jquery2.default)(this).addClass(_globals.cssClasses.mousedown);
	    });
	    this.get$Element().on('mouseup', function () {
	      (0, _jquery2.default)(this).removeClass(_globals.cssClasses.mousedown);
	    });
	  };

	  return ZoomSlider;
	}((0, _utilities.mixin)(_openlayers2.default.control.ZoomSlider, _RewireMixin.RewireMixin));

/***/ },
/* 237 */
200,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.RewireMixin = undefined;

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(120);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(121);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _jquery = __webpack_require__(78);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _ControlLogicMixin2 = __webpack_require__(216);

	var _globals = __webpack_require__(183);

	var _utilities = __webpack_require__(138);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * This class does all generic rewiring including catching the target and restyling the tooltips
	 * It is important to provide a className in the control because else it will not be possible to find the control in
	 * the ol-viewport
	 */
	var RewireMixin = exports.RewireMixin = function (_ControlLogicMixin) {
	  (0, _inherits3.default)(RewireMixin, _ControlLogicMixin);

	  function RewireMixin() {
	    (0, _classCallCheck3.default)(this, RewireMixin);
	    return (0, _possibleConstructorReturn3.default)(this, _ControlLogicMixin.apply(this, arguments));
	  }

	  /**
	   * @param {g4uControlOptions} [options={}]
	   */
	  RewireMixin.prototype.initialize = function initialize() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    options.singleButton = false;

	    _ControlLogicMixin.prototype.initialize.call(this, options);

	    this.rewire();
	  };

	  /**
	   * This function tweaks the control a little bit
	   */


	  RewireMixin.prototype.rewire = function rewire() {
	    (0, _utilities.recursiveSelect)(this.get$Element(), 'button[title]').each(function () {
	      var title = (0, _jquery2.default)(this).attr('title');
	      (0, _jquery2.default)(this).addClass(_globals.cssClasses.hasTooltip).removeAttr('title').append('<span role=\'tooltip\'>' + title + '</span>');
	    });
	  };

	  return RewireMixin;
	}(_ControlLogicMixin2.ControlLogicMixin);

/***/ },
/* 242 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.LayerSelector = undefined;

	var _getIterator2 = __webpack_require__(105);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(120);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(121);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _jquery = __webpack_require__(78);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _openlayers = __webpack_require__(77);

	var _openlayers2 = _interopRequireDefault(_openlayers);

	var _flatten = __webpack_require__(186);

	var _flatten2 = _interopRequireDefault(_flatten);

	var _GroupLayer = __webpack_require__(154);

	var _ButtonBox = __webpack_require__(243);

	var _Control2 = __webpack_require__(215);

	var _utilities = __webpack_require__(138);

	var _globals = __webpack_require__(183);

	__webpack_require__(244);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @typedef {g4uControlOptions} LayerSelectorOptions
	 * @property {boolean} [toggle=true] if the layers are toggable
	 * @property {boolean} [collapsible=true] if the menu should be collapsible
	 * @property {boolean} [collapsed=false] if the menu starts collapsed
	 * @property {number} [minVisibleEntries=6] amount of minimal visible elements
	 * @property {string} layerGroupName the name of the layerGroup this selector is connected to. For example 'baseLayers'
	 * @property {number} [minLayerAmount=1] the minimum number of layers which should be visible to show this selector
	 */

	/**
	 * This control shows Buttons to let you select the layer you want to see on the map.
	 * It supports categories and nested categories - each {GroupLayer}-Object will be interpreted as a category.
	 */
	var LayerSelector = exports.LayerSelector = function (_Control) {
	  (0, _inherits3.default)(LayerSelector, _Control);

	  /**
	   * @param {LayerSelectorOptions} options
	   */
	  function LayerSelector() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    (0, _classCallCheck3.default)(this, LayerSelector);

	    options.className = options.className || 'g4u-layerselector';
	    options.element = (0, _jquery2.default)('<div>')[0];
	    options.singleButton = false;

	    /**
	     * @type {String}
	     * @private
	     */
	    var _this = (0, _possibleConstructorReturn3.default)(this, _Control.call(this, options));

	    _this.layerGroupName_ = options.layerGroupName;

	    /**
	     * @type {number}
	     * @private
	     */
	    _this.minLayerAmount_ = options.hasOwnProperty('minLayerAmount') ? options.minLayerAmount : 1;

	    /**
	     * @type {boolean}
	     * @private
	     */
	    _this.collapsible_ = !options.hasOwnProperty('collapsible') || options.collapsible;

	    /**
	     * @type {boolean}
	     * @private
	     */
	    _this.collapsed_ = options.collapsed || false;

	    /**
	     * classNames
	     * @type {object.<string, string>}
	     * @private
	     */
	    _this.classNames_ = {
	      menu: _this.className_ + '-menu',
	      layerButton: _this.className_ + '-layerbutton'
	    };

	    /**
	     * @type {ButtonBox}
	     * @private
	     */
	    _this.menu_ = new _ButtonBox.ButtonBox({
	      element: _this.get$Element(),
	      className: _this.getClassName(),
	      title: _this.getLocaliser().selectL10N(_this.getTitle()),
	      collapsible: _this.collapsible_,
	      collapsed: _this.collapsed_
	    });

	    _this.get$Element().append(_this.menu_.get$Element());

	    /**
	     * @type {boolean}
	     * @private
	     */
	    _this.toggle_ = options.toggle || true;

	    /**
	     * @type {number}
	     * @private
	     */
	    _this.minVisibleButtons_ = options.minVisibleEntries || 6;

	    /**
	     * @type {boolean}
	     * @private
	     */
	    _this.visible_ = true;

	    /**
	     * @type {Array}
	     * @private
	     */
	    _this.listenerKeys_ = [];
	    return _this;
	  }

	  /**
	   * @returns {boolean}
	   */


	  LayerSelector.prototype.getCollapsible = function getCollapsible() {
	    return this.collapsible_;
	  };

	  /**
	   * @returns {boolean}
	   */


	  LayerSelector.prototype.getCollapsed = function getCollapsed() {
	    return this.menu_.getCollapsed();
	  };

	  /**
	   * @param {boolean} collapsed
	   */


	  LayerSelector.prototype.setCollapsed = function setCollapsed(collapsed) {
	    this.menu_.setCollapsed(collapsed);
	  };

	  /**
	   * this method builds a button for a layer. It toggles visibility if you click on it
	   * @param {ol.layer.Base} layer
	   * @param {jQuery} $target
	   */


	  LayerSelector.prototype.buildLayerButton = function buildLayerButton(layer, $target) {
	    var _this2 = this;

	    this.loadProcessCount = this.loadProcessCount || {};
	    if (layer.get('available')) {
	      (function () {
	        var layerSource = layer.getSource();
	        var $button = (0, _jquery2.default)('<button>').addClass(_this2.classNames_.layerButton).html(layer.get('title'));

	        var activeClassName = _this2.classNames_.menu + '-active';

	        $button.on('click', function (e) {
	          if (_this2.toggle_) {
	            layer.setVisible(!layer.getVisible());
	          } else {
	            layer.setVisible(true);
	          }
	        });

	        if (layer.getVisible()) {
	          $button.addClass(activeClassName);
	        }

	        _this2.listenerKeys_.push(layer.on('change:visible', function () {
	          $button.toggleClass(activeClassName, layer.getVisible());
	          if (!layer.getVisible()) {
	            layer.resetLoadProcessCount();
	            $button.removeClass('g4u-layer-loading');
	          }
	        }));

	        _this2.listenerKeys_.push(layerSource.on(['vectorloadstart', 'tileloadstart', 'imageloadstart'], function () {
	          $button.addClass('g4u-layer-loading');
	        }));

	        _this2.listenerKeys_.push(layerSource.on(['vectorloadend', 'vectorloaderror', 'tileloadend', 'tileloaderror', 'imageloadend', 'imageloaderror'], function () {
	          if (layer.getLoadProcessCount() === 0) {
	            $button.removeClass('g4u-layer-loading');
	          }
	        }));

	        $target.append($button);
	      })();
	    }
	  };

	  /**
	   * builds a category button which collapses on click
	   * @param {GroupLayer} categoryLayer
	   * @param {jQuery} $target
	   */


	  LayerSelector.prototype.buildCategoryButton = function buildCategoryButton(categoryLayer, $target) {
	    var _this3 = this;

	    var $nextTarget = $target;

	    if (categoryLayer.get('available')) {
	      (function () {
	        var activateChildren = categoryLayer.get('activateChildren') !== false;

	        var menu = new _ButtonBox.ButtonBox({
	          className: _this3.classNames_.menu,
	          title: _this3.getLocaliser().selectL10N(categoryLayer.get('title')),
	          titleButton: activateChildren,
	          collapsed: !categoryLayer.countChildrenVisible() && categoryLayer.get('collapsed') !== false
	        });

	        var countChildren = categoryLayer.countChildren();
	        var countVisibleChildren = categoryLayer.countChildrenVisible();

	        var updateButtonActivities = function updateButtonActivities() {
	          if (countVisibleChildren === 0) {
	            menu.setCollapseButtonActive(false);
	            if (activateChildren) {
	              menu.setTitleButtonActive(false);
	            }
	          } else if (countVisibleChildren === countChildren) {
	            menu.setCollapseButtonActive(true);
	            if (activateChildren) {
	              menu.setTitleButtonActive(true);
	            }
	          } else {
	            menu.setCollapseButtonActive(true);
	            if (activateChildren) {
	              menu.setTitleButtonActive(false);
	            }
	          }
	        };

	        updateButtonActivities();

	        var forEachChildLayer = function forEachChildLayer(childLayer) {
	          _this3.listenerKeys_.push(childLayer.on(['change:visible', 'change:childVisible'], function (e) {
	            var changedLayer = e.child || childLayer;

	            if (changedLayer.getVisible()) {
	              countVisibleChildren++;
	            } else {
	              countVisibleChildren--;
	            }

	            updateButtonActivities();
	          }));
	        };

	        _this3.listenerKeys_.push(categoryLayer.getLayers().forEach(forEachChildLayer));

	        _this3.listenerKeys_.push(categoryLayer.getLayers().on('add', function (e) {
	          return forEachChildLayer(e.element);
	        }));

	        menu.on('title:click', function () {
	          var visible = countVisibleChildren < countChildren;
	          categoryLayer.recursiveForEach(function (childLayer) {
	            if (!(childLayer instanceof _GroupLayer.GroupLayer)) {
	              childLayer.setVisible(visible);
	            }
	          });
	        });

	        $target.append(menu.get$Element());

	        $nextTarget = menu.get$Body();

	        menu.on('change:collapsed', function () {
	          return _this3.changed();
	        });
	      })();
	    }

	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	      for (var _iterator = (0, _getIterator3.default)(categoryLayer.getLayers().getArray()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var childLayer = _step.value;

	        this.chooseButtonBuilder(childLayer, $nextTarget);
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator.return) {
	          _iterator.return();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }
	  };

	  LayerSelector.prototype.buildWMSButton = function buildWMSButton(wmsLayer, $target) {
	    var _this4 = this;

	    if (wmsLayer.get('available')) {
	      (function () {
	        var layerButtons = wmsLayer.get('buttons');

	        var ActiveButtons = function () {
	          function ActiveButtons() {
	            (0, _classCallCheck3.default)(this, ActiveButtons);

	            this.buttons_ = [];
	          }

	          ActiveButtons.prototype.isActive = function isActive(button) {
	            return this.buttons_.indexOf(button) > -1;
	          };

	          ActiveButtons.prototype.add = function add(button) {
	            if (Array.isArray(button)) {
	              var _iteratorNormalCompletion2 = true;
	              var _didIteratorError2 = false;
	              var _iteratorError2 = undefined;

	              try {
	                for (var _iterator2 = (0, _getIterator3.default)(button), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                  var b = _step2.value;

	                  this.add(b);
	                }
	              } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	              } finally {
	                try {
	                  if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                    _iterator2.return();
	                  }
	                } finally {
	                  if (_didIteratorError2) {
	                    throw _iteratorError2;
	                  }
	                }
	              }
	            } else {
	              if (!this.isActive(button)) {
	                this.buttons_.push(button);
	              }
	            }
	          };

	          ActiveButtons.prototype.remove = function remove(button) {
	            if (Array.isArray(button)) {
	              var _iteratorNormalCompletion3 = true;
	              var _didIteratorError3 = false;
	              var _iteratorError3 = undefined;

	              try {
	                for (var _iterator3 = (0, _getIterator3.default)(button), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                  var b = _step3.value;

	                  this.remove(b);
	                }
	              } catch (err) {
	                _didIteratorError3 = true;
	                _iteratorError3 = err;
	              } finally {
	                try {
	                  if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                    _iterator3.return();
	                  }
	                } finally {
	                  if (_didIteratorError3) {
	                    throw _iteratorError3;
	                  }
	                }
	              }
	            } else {
	              var index = this.buttons_.indexOf(button);
	              if (index > -1) {
	                this.buttons_.splice(index, 1);
	              }
	            }
	          };

	          ActiveButtons.prototype.clear = function clear() {
	            this.buttons_ = [];
	          };

	          ActiveButtons.prototype.getFlatProp = function getFlatProp(prop) {
	            return (0, _flatten2.default)(this.buttons_.map(function (a) {
	              return a[prop] || [];
	            }));
	          };

	          ActiveButtons.prototype.count = function count() {
	            return this.buttons_.length;
	          };

	          ActiveButtons.prototype.toggle = function toggle(button, value) {
	            if (value) {
	              this.add(button);
	            } else {
	              this.remove(button);
	            }
	          };

	          return ActiveButtons;
	        }();

	        var activeLayerButtons = new ActiveButtons();
	        var updateLayersParam = function updateLayersParam() {
	          wmsLayer.getSource().updateParams({ LAYERS: activeLayerButtons.getFlatProp('LAYERS') });
	        };

	        var featureInfoCheckable = wmsLayer.getSource().isFeatureInfoCheckable();
	        var activeQueryLayerButtons = new ActiveButtons();
	        var updateQueryLayersParam = function updateQueryLayersParam() {
	          var featureInfoParams = void 0;
	          if (featureInfoCheckable) {
	            featureInfoParams = { QUERY_LAYERS: activeQueryLayerButtons.getFlatProp('QUERY_LAYERS') };
	          } else {
	            featureInfoParams = { QUERY_LAYERS: activeLayerButtons.getFlatProp('QUERY_LAYERS') };
	          }
	          wmsLayer.getSource().updateFeatureInfoParams(featureInfoParams);
	        };

	        if (layerButtons) {
	          (function () {
	            var menu = new _ButtonBox.ButtonBox({
	              className: _this4.classNames_.menu,
	              title: _this4.getLocaliser().selectL10N(wmsLayer.get('title')),
	              titleButton: true,
	              collapsed: wmsLayer.get('collapsed') !== false
	            });

	            $target.append(menu.get$Element());

	            menu.on('change:collapsed', function () {
	              return _this4.changed();
	            });

	            var activeClassName = _this4.classNames_.menu + '-active';

	            var $buttons = (0, _jquery2.default)();

	            var _iteratorNormalCompletion4 = true;
	            var _didIteratorError4 = false;
	            var _iteratorError4 = undefined;

	            try {
	              var _loop = function _loop() {
	                var layerButton = _step4.value;

	                var $button = (0, _jquery2.default)('<button>').addClass(_this4.classNames_.layerButton).html(_this4.getLocaliser().selectL10N(layerButton.title));
	                var $checkbox = (0, _jquery2.default)('<input type="checkbox">');

	                var buttonActive = void 0,
	                    checkboxActive = void 0;

	                buttonActive = function buttonActive(active) {
	                  activeLayerButtons.toggle(layerButton, active);
	                  $button.toggleClass(activeClassName, active);

	                  if (!active && featureInfoCheckable) {
	                    checkboxActive(false);
	                  }

	                  if (activeLayerButtons.count() === 0) {
	                    wmsLayer.setVisible(false);
	                    menu.setCollapseButtonActive(false);
	                    menu.setTitleButtonActive(false);
	                  } else if (activeLayerButtons.count() === layerButtons.length) {
	                    wmsLayer.setVisible(true);
	                    menu.setCollapseButtonActive(true);
	                    menu.setTitleButtonActive(true);
	                  } else {
	                    wmsLayer.setVisible(true);
	                    menu.setCollapseButtonActive(true);
	                    menu.setTitleButtonActive(false);
	                  }

	                  updateLayersParam();
	                  updateQueryLayersParam();
	                };

	                checkboxActive = function checkboxActive(active) {
	                  activeQueryLayerButtons.toggle(layerButton, active);
	                  if (active && !activeLayerButtons.isActive(layerButton)) {
	                    buttonActive(true);
	                  }

	                  updateQueryLayersParam();
	                  $checkbox.prop('checked', active);
	                };

	                $button.on('click', function () {
	                  return buttonActive(!activeLayerButtons.isActive(layerButton));
	                });

	                if (featureInfoCheckable) {
	                  $button.append($checkbox);
	                  $checkbox.on('click', function (e) {
	                    checkboxActive($checkbox.is(':checked'));
	                    e.stopPropagation();
	                  });
	                }

	                $buttons = $buttons.add($button);
	                menu.get$Body().append($button);
	              };

	              for (var _iterator4 = (0, _getIterator3.default)(layerButtons), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                _loop();
	              }
	            } catch (err) {
	              _didIteratorError4 = true;
	              _iteratorError4 = err;
	            } finally {
	              try {
	                if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                  _iterator4.return();
	                }
	              } finally {
	                if (_didIteratorError4) {
	                  throw _iteratorError4;
	                }
	              }
	            }

	            menu.on('title:click', function () {
	              var activateAll = activeLayerButtons.count() < layerButtons.length;
	              if (activateAll) {
	                activeLayerButtons.add(layerButtons);
	              } else {
	                activeLayerButtons.clear();
	                if (featureInfoCheckable) {
	                  activeQueryLayerButtons.clear();
	                  $buttons.find('input[type=checkbox]').prop('checked', false);
	                }
	              }

	              $buttons.toggleClass(activeClassName, activateAll);
	              wmsLayer.setVisible(activateAll);
	              menu.setCollapseButtonActive(activateAll);
	              menu.setTitleButtonActive(activateAll);

	              updateLayersParam();
	            });
	          })();
	        } else {
	          _this4.buildLayerButton(wmsLayer, $target);
	        }
	      })();
	    }
	  };

	  /**
	   * This method chooses the right builder function
	   * @param {ol.layer.Base} layer
	   * @param {jQuery} $target
	   */


	  LayerSelector.prototype.chooseButtonBuilder = function chooseButtonBuilder(layer, $target) {
	    if (layer instanceof _GroupLayer.GroupLayer) {
	      this.buildCategoryButton(layer, $target);
	    } else if (layer.getSource().isFeatureInfoCheckable) {
	      this.buildWMSButton(layer, $target);
	    } else {
	      this.buildLayerButton(layer, $target);
	    }
	  };

	  /**
	   * @param {G4UMap} map
	   */


	  LayerSelector.prototype.setMap = function setMap(map) {
	    if (this.getMap()) {
	      _openlayers2.default.Observable.unByKey(this.listenerKeys_);
	    }

	    _Control.prototype.setMap.call(this, map);

	    if (map) {
	      this.layers_ = map.get(this.layerGroupName_).getLayers();
	      if (this.layers_.getLength() >= this.minLayerAmount_) {
	        var menuFunctions = new _ButtonBox.ButtonBox({ className: this.classNames_.menu });
	        var _iteratorNormalCompletion5 = true;
	        var _didIteratorError5 = false;
	        var _iteratorError5 = undefined;

	        try {
	          for (var _iterator5 = (0, _getIterator3.default)(this.layers_.getArray()), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	            var layer = _step5.value;

	            this.chooseButtonBuilder(layer, this.menu_.get$Body());
	          }
	        } catch (err) {
	          _didIteratorError5 = true;
	          _iteratorError5 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion5 && _iterator5.return) {
	              _iterator5.return();
	            }
	          } finally {
	            if (_didIteratorError5) {
	              throw _iteratorError5;
	            }
	          }
	        }

	        menuFunctions.giveLastVisible(this.get$Element().children(':last-child').children(':last-child'));
	      } else {
	        this.setVisible(false);
	      }
	    }
	  };

	  /**
	   * @param {boolean} visible
	   */


	  LayerSelector.prototype.setVisible = function setVisible(visible) {
	    this.get$Element().toggleClass(_globals.cssClasses.hidden, !visible);
	    this.visible_ = visible;
	  };

	  /**
	   * @returns {boolean}
	   */


	  LayerSelector.prototype.getVisible = function getVisible() {
	    return this.visible_;
	  };

	  /**
	   * Returns true if the control is squeezable in the given dimension. Used by Positioning.
	   * @param {string} dimension
	   * @returns {boolean}
	   */


	  LayerSelector.prototype.isSqueezable = function isSqueezable(dimension) {
	    return dimension === 'height';
	  };

	  /**
	   * Squeezes the control in the given dimenstion by the provided value. Used by Positioning
	   * Returns the value the control could get squeezed by.
	   * @param {string} dimension
	   * @param {number} value
	   * @returns {number}
	   */


	  LayerSelector.prototype.squeezeBy = function squeezeBy(dimension, value) {
	    if (dimension === 'height') {
	      var $contentBox = this.get$Element().find('.' + this.getClassName() + '-content');
	      var $buttons = $contentBox.find('button:visible');

	      if ($buttons.length > 1) {
	        var height = $contentBox.height();
	        var buttonHeight = (0, _utilities.offset)($buttons.eq(1), $buttons.eq(0)).top;

	        var newHeight = Math.max(buttonHeight * this.minVisibleButtons_, height - value);

	        if (height > newHeight) {
	          $contentBox.css('max-height', newHeight);
	          return height - newHeight;
	        }
	      }
	    }

	    return 0;
	  };

	  /**
	   * Removes the squeeze. Used by Positioning.
	   * @param {string} dimension
	   */


	  LayerSelector.prototype.release = function release(dimension) {
	    if (dimension === 'height') {
	      this.get$Element().find('.' + this.getClassName() + '-content').css('max-height', '');
	    }
	  };

	  return LayerSelector;
	}(_Control2.Control);

/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ButtonBox = undefined;

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(120);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(121);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _jquery = __webpack_require__(78);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _openlayers = __webpack_require__(77);

	var _openlayers2 = _interopRequireDefault(_openlayers);

	var _globals = __webpack_require__(183);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @typedef {object} ButtonBoxOptions
	 * @property {string} [className='g4u-menu']
	 * @property {HTMLElement|jQuery} [content] the content of the body of the button box
	 * @property {boolean} [collapsible]
	 * @property {boolean} [collapsed]
	 * @property {boolean} [titleButton=false] displays an extra button with a title firing an 'title:click' event
	 * @property {string} [title] the title appearing on the button
	 */

	/**
	 * An Element to easily construct nested HTML Menus
	 * It contains of a button followed by a body below the button. The button can toggle the visibility of the body.
	 * If multiple elements with the same classname are nested it gives the last visible element a special class name.
	 * It can also marks one or multiple element in the tree to be active (same classname is needed, too).
	 * After a ButtonBox has been added all child elements the method finish should be called.
	 */
	var ButtonBox = exports.ButtonBox = function (_ol$Object) {
	  (0, _inherits3.default)(ButtonBox, _ol$Object);

	  /**
	   * @param {ButtonBoxOptions} [options={}]
	   */
	  function ButtonBox() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    (0, _classCallCheck3.default)(this, ButtonBox);

	    /**
	     * @type {string}
	     * @private
	     */
	    var _this = (0, _possibleConstructorReturn3.default)(this, _ol$Object.call(this));

	    _this.className_ = options.className || 'g4u-menu';

	    _this.classNames_ = {
	      body: _this.className_ + '-content',
	      collapseButton: _this.className_ + '-collapsebutton',
	      titleButton: _this.className_ + '-titlebutton',
	      title: _this.className_ + '-title',
	      active: _this.className_ + '-active',
	      collapsed: _this.className_ + '-collapsed',
	      lastVisible: _this.className_ + '-last-visible'
	    };

	    /**
	     * @type {jQuery}
	     * @private
	     */
	    _this.$element_ = (0, _jquery2.default)('<div>').addClass(_this.className_);

	    if (options.hasOwnProperty('id')) {
	      _this.$element_.attr('id', options.id);
	    }

	    /**
	     * @type {boolean}
	     * @private
	     */
	    _this.titleButton_ = options.titleButton || false;

	    /**
	     * @type {boolean}
	     * @private
	     */
	    _this.collapsible_ = options.hasOwnProperty('collapsible') ? options.collapsible : true;

	    /**
	     * @type {boolean}
	     * @private
	     */
	    _this.collapsed_ = options.hasOwnProperty('collapsed') ? options.collapsed : false;

	    /**
	     * @type {jQuery}
	     * @private
	     */
	    _this.$body_ = (0, _jquery2.default)('<div>').addClass(_this.classNames_.body);

	    if (options.hasOwnProperty('content')) {
	      _this.$body_.append(options.content);
	    }

	    if (options.hasOwnProperty('title')) {
	      /**
	       * @type {jQuery}
	       * @private
	       */
	      _this.$title_ = (0, _jquery2.default)('<div>').addClass(_this.classNames_.title);

	      _this.$element_.append(_this.$title_);

	      if (_this.collapsible_) {
	        (function () {
	          var $collapseButton = (0, _jquery2.default)('<button>').addClass(_this.classNames_.collapseButton);

	          $collapseButton.on('click', function () {
	            _this.setCollapsed(!_this.collapsed_);
	            $collapseButton.blur();
	          });

	          if (_this.titleButton_) {
	            (function () {
	              var $titleButton = (0, _jquery2.default)('<button>').addClass(_this.classNames_.titleButton).on('click', function () {
	                _this.dispatchEvent('title:click');
	                $titleButton.blur();
	              }).html(options.title);

	              _this.$title_.append($collapseButton).append($titleButton);
	            })();
	          } else {
	            $collapseButton.addClass(_this.classNames_.titleButton).html(options.title);
	            _this.$title_.append($collapseButton);
	          }
	        })();
	      } else {
	        _this.$title_.html(options.title);
	      }
	    } else {
	      _this.collapsible_ = false;
	      _this.collapsed_ = false;
	    }

	    _this.$element_.append(_this.$body_);

	    // this.$element_.collapsed_ will be setted in the following functions
	    if (!_this.collapsed_) {
	      _this.setCollapsed(false);
	    } else {
	      _this.setCollapsed(true);
	    }
	    return _this;
	  }

	  /**
	   * @param {boolean} collapsed
	   */


	  ButtonBox.prototype.setCollapsed = function setCollapsed(collapsed) {
	    if (collapsed) {
	      this.$body_.addClass(_globals.cssClasses.hidden);
	      this.$element_.addClass(this.classNames_.collapsed);
	    } else {
	      this.$body_.removeClass(_globals.cssClasses.hidden);
	      this.$element_.removeClass(this.classNames_.collapsed);
	    }

	    this.collapsed_ = collapsed;

	    this.lastVisibleClass_();
	    this.dispatchEvent('change:collapsed');
	  };

	  /**
	   * @returns {boolean}
	   */


	  ButtonBox.prototype.getCollapsed = function getCollapsed() {
	    return this.collapsed_;
	  };

	  /**
	   * distribute the last visible class to the correct element
	   * @private
	   */


	  ButtonBox.prototype.lastVisibleClass_ = function lastVisibleClass_() {
	    // first take the last visible class name away
	    if (this.takeLastVisible(this.$element_)) {
	      // if the last visible class name was taken, distribute it to the correct element
	      this.giveLastVisible(this.$element_);
	    }
	  };

	  /**
	   * Returns the body element
	   * @returns {jQuery}
	   */


	  ButtonBox.prototype.get$Body = function get$Body() {
	    return this.$body_;
	  };

	  /**
	   * Returns the element itself
	   * @returns {jQuery}
	   */


	  ButtonBox.prototype.get$Element = function get$Element() {
	    return this.$element_;
	  };

	  /**
	   * finds and returns the last child in the body of the given element if it is of the same classname as this ButtonBox
	   * @param {jQuery} $element
	   * @returns {jQuery}
	   * @private
	   */


	  ButtonBox.prototype.get$LastChild_ = function get$LastChild_($element) {
	    return $element.children('.' + this.classNames_.body).children(':last-child');
	  };

	  ButtonBox.prototype.setCollapseButtonActive = function setCollapseButtonActive(active) {
	    this.$title_.children('.' + this.classNames_.collapseButton).toggleClass(this.classNames_.active, active);
	  };

	  ButtonBox.prototype.setTitleButtonActive = function setTitleButtonActive(active) {
	    this.$title_.children('.' + this.classNames_.titleButton).toggleClass(this.classNames_.active, active);
	  };

	  /**
	   * Gives the last element in the element the last visible class
	   * @param $element
	   */


	  ButtonBox.prototype.giveLastVisible = function giveLastVisible($element) {
	    if ($element.hasClass(this.classNames_.collapsed)) {
	      // if the element is collapsed itself is the last visible element
	      $element.addClass(this.classNames_.lastVisible);
	    } else {
	      if ($element.hasClass(this.className_)) {
	        // the element is a button box (with the same className) and not collapsed
	        var $lastChild = this.get$LastChild_($element);
	        if ($lastChild) {
	          // -> recursively call this method on the last element
	          this.giveLastVisible($lastChild);
	        } else {
	          // no last element exists
	          $element.addClass(this.classNames_.lastVisible);
	        }
	      } else {
	        // the element is no buttonbox with the same classname it is declared the last visible element
	        $element.addClass(this.classNames_.lastVisible);
	      }
	    }
	  };

	  /**
	   * Searches for the last visible class in its child elements and removes it.
	   * Returns true if it was removed.
	   * @param {jQuery} $element
	   * @returns {boolean}
	   */


	  ButtonBox.prototype.takeLastVisible = function takeLastVisible($element) {
	    if ($element.hasClass(this.classNames_.lastVisible)) {
	      $element.removeClass(this.classNames_.lastVisible);
	      return true;
	    } else if ($element.hasClass(this.className_)) {
	      var $lastChild = this.get$LastChild_($element);
	      // reverse call
	      if ($lastChild) {
	        return this.takeLastVisible($lastChild);
	      } else {
	        return false;
	      }
	    } else {
	      return false;
	    }
	  };

	  /**
	   * This method should be called after all child elements have been added to the button box
	   */


	  ButtonBox.prototype.finish = function finish() {
	    this.takeLastVisible(this.$element_);
	    this.giveLastVisible(this.$element_);
	  };

	  return ButtonBox;
	}(_openlayers2.default.Object);

/***/ },
/* 244 */
200,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.GeolocationButton = undefined;

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(120);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(121);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _openlayers = __webpack_require__(77);

	var _openlayers2 = _interopRequireDefault(_openlayers);

	var _jquery = __webpack_require__(78);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _Control2 = __webpack_require__(215);

	var _html = __webpack_require__(198);

	var _VectorLayer = __webpack_require__(168);

	var _MessageDisplay = __webpack_require__(251);

	var _globals = __webpack_require__(183);

	__webpack_require__(255);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @typedef {g4uControlOptions} GeolocationButtonOptions
	 * @property {boolean} [animated] if the move on the map to the geoposition should be animated
	 * @property {StyleLike} [style='#defaultStyle']
	 * @property {number} [maxZoom]
	 */

	/**
	 * This class provides a button to center the view on your current geoposition.
	 */
	var GeolocationButton = exports.GeolocationButton = function (_Control) {
	  (0, _inherits3.default)(GeolocationButton, _Control);

	  /**
	   * @param {GeolocationButtonOptions} [options={}]
	   */
	  function GeolocationButton() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    (0, _classCallCheck3.default)(this, GeolocationButton);

	    options.className = options.className || 'g4u-geolocation';
	    options.singleButton = true;
	    options.element = (0, _jquery2.default)('<button>').get(0);

	    /**
	     * @type {string}
	     * @private
	     */
	    var _this = (0, _possibleConstructorReturn3.default)(this, _Control.call(this, options));

	    _this.classNamePushed_ = _this.className_ + '-pushed';

	    /**
	     * @type {boolean}
	     * @private
	     */
	    _this.animated_ = options.animated;

	    /**
	     * @type {StyleLike}
	     * @private
	     */
	    _this.style_ = options.style || '#defaultStyle';

	    /**
	     * @type {number}
	     * @private
	     */
	    _this.maxZoom_ = options.maxZoom;

	    _this.setTitle(_this.getTitle() || _this.getLocaliser().localiseUsingDictionary('GeolocationButton title'));

	    _this.setTipLabel(_this.getTipLabel() || _this.getLocaliser().localiseUsingDictionary('GeolocationButton tipLabel'));

	    _this.get$Element().addClass(_this.className_).addClass(_globals.cssClasses.mainButton).html(_this.getTitle());

	    (0, _html.addTooltip)(_this.get$Element(), _this.getTipLabel());

	    /**
	     * @type {MessageDisplay}
	     * @private
	     */
	    _this.buttonMessageDisplay_ = new _MessageDisplay.MessageDisplay(_this.get$Element());

	    _this.get$Element().on('click touch', function () {
	      if (_openlayers2.default.has.GEOLOCATION) {
	        _this.setActive(!_this.getActive());
	      } else {
	        _this.buttonMessageDisplay_.error(_this.getLocaliser().localiseUsingDictionary('geolocation geolocation-not-possible'), _this.getMap().get('mobile') ? { position: 'top middle' } : {});
	      }
	    });

	    _this.layer_ = null;
	    _this.geolocation_ = new _openlayers2.default.Geolocation();
	    _this.geolocation_.on('error', function () {
	      _this.buttonMessageDisplay_.error(_this.getLocaliser().localiseUsingDictionary('geolocation geolocation-not-possible'), _this.getMap().get('mobile') ? { position: 'top middle' } : {});
	      _this.setActive(false);
	    });

	    /**
	     * @type {boolean}
	     * @private
	     */
	    _this.active_ = false;
	    return _this;
	  }

	  /**
	   * @param {G4UMap} map
	   */


	  GeolocationButton.prototype.setMap = function setMap(map) {
	    if (map) {
	      var projection = map.getView().getProjection();
	      this.geolocation_.setProjection(projection);

	      var layerOptions = { source: new _openlayers2.default.source.Vector({ projection: projection }), visible: true };
	      this.layer_ = new _VectorLayer.VectorLayer(layerOptions);

	      map.get('styling').styleLayer(this.layer_, this.style_);
	      map.getLayers().insertAt(1, this.layer_); // 0 is where the baseLayers are
	    } else {
	      this.getMap().getLayers().remove(this.layer_);
	    }

	    _Control.prototype.setMap.call(this, map);
	  };

	  /**
	   * @returns {boolean}
	   */


	  GeolocationButton.prototype.getActive = function getActive() {
	    return this.active_;
	  };

	  /**
	   * Show/Hide the geolocation on the map as point with a circle in the size of the accuracy around
	   * @param {boolean} active
	   */


	  GeolocationButton.prototype.setActive = function setActive(active) {
	    var _this2 = this;

	    var oldValue = this.active_;
	    if (oldValue !== active) {
	      this.get$Element().toggleClass(this.classNamePushed_, active);

	      if (active) {
	        (function () {
	          var source = _this2.layer_.getSource();

	          // change:accuracyGeometry comes always after change:position
	          _this2.geolocation_.once('change:accuracyGeometry', function () {
	            var position = _this2.geolocation_.getPosition();
	            source.addFeature(new _openlayers2.default.Feature({ geometry: new _openlayers2.default.geom.Point(position) }));

	            var circle = _this2.geolocation_.getAccuracyGeometry();
	            source.addFeature(new _openlayers2.default.Feature({ geometry: circle }));
	            _this2.getMap().get('move').toExtent(circle.getExtent(), { animated: _this2.animated_, maxZoom: _this2.maxZoom_ });
	            _this2.geolocation_.setTracking(false);
	          });

	          _this2.geolocation_.setTracking(true);
	        })();
	      } else {
	        this.layer_.getSource().clear();
	      }

	      this.active_ = active;
	      this.dispatchEvent({
	        type: 'change:active',
	        oldValue: oldValue
	      });
	    }
	  };

	  /**
	   * Creates a circle around a given position with a given radius in meters in a desired projection
	   * @param {ol.Coordinate} position
	   * @param {ol.ProjectionLike} projection
	   * @param {number} meters
	   * @returns {ol.geom.Circle}
	   * @private
	   */


	  GeolocationButton.makeCircle_ = function makeCircle_(position, projection, meters) {
	    // using assumption that earth is a sphere and that one degree in north/south direction
	    // on any point of the earth is 90/10000 km

	    var position4326 = _openlayers2.default.proj.transform(position, projection, 'EPSG:4326');

	    var secondPosition4326 = [position4326[0], position4326[1] + meters / 1000 * 90 / 10000];

	    var secondPosition = _openlayers2.default.proj.transform(secondPosition4326, 'EPSG:4326', projection);

	    var radius = Math.abs(position[1] - secondPosition[1]);

	    return new _openlayers2.default.geom.Circle(position, radius);
	  };

	  return GeolocationButton;
	}(_Control2.Control);

/***/ },
/* 251 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.MessageDisplay = undefined;

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	__webpack_require__(252);

	__webpack_require__(254);

	var _jquery = __webpack_require__(78);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _utilities = __webpack_require__(138);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @typedef {object} MessageReducedDisplayOptions
	 * @property {boolean} [autoHide] - whether to auto-hide the notification
	 * @property {number} [autoHideDelay] - milliseconds before hide (if autoHide is set)
	 * @property {string} [position] - notification position relative to element
	 */

	/**
	 * @typedef {MessageReducedDisplayOptions} MessageDisplayOptions
	 * @property {(string|string[])} [className] - default class
	 */

	/**
	 * @typedef {MessageDisplayOptions} MessageConstructorOptions
	 * @property {boolean} [arrowShow=true] - whether to show an arrow pointing at the element
	 * @property {number} [arrowSize=5] - Arrow size in pixels
	 * @property {boolean} [autoHide=true] - whether to auto-hide the notification
	 * @property {number} [autoHideDelay=15000] - milliseconds before hide (if autoHide is set)
	 * @property {(string|string[])} [className='error'] - default class
	 * @property {string} [position=bottom left] - notification position relative to element
	 * @property {number} [gap=2] - padding between element and notification
	 * @property {string} [hideAnimation=slideUp] - hide animation type
	 * @property {number} [hideDuration=200] - hide animation duration in milliseconds
	 * @property {string} [showAnimation=slideDown] - show animation type
	 * @property {number} [showDuration=400] - show animation duration in miliseconds
	 * @property {string} [style=bootstrap] - default style
	 */

	/**
	 * Displays Messages
	 */
	var MessageDisplay = function () {
	  /**
	   * @param {jQuery} $element
	   * @param {MessageConstructorOptions} options
	   */

	  function MessageDisplay($element) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    (0, _classCallCheck3.default)(this, MessageDisplay);

	    if ($element) {
	      /**
	       * @type {jQuery}
	       * @private
	       */
	      this.$element_ = $element;

	      if (!_jquery2.default.notify.getStyle('benndorf')) {
	        _jquery2.default.notify.addStyle('benndorf', {
	          html: '<div>' + '<div class="text" data-notify-text />' + '</div>' + '</div>',
	          classes: {
	            error: {
	              'color': '#b94a48',
	              'background-color': '#f2dede',
	              'border-color': '#b94a48'
	            },
	            success: {
	              'color': '#468847',
	              'background-color': '#dff0d8',
	              'border-color': '#468847'
	            },
	            info: {
	              'color': '#3a87a',
	              'background-color': '#d9edf7',
	              'border-color': '#3a87ad'
	            },
	            warn: {
	              'color': '#c09853',
	              'background-color': '#fcf8e3',
	              'border-color': '#c09853'
	            }
	          }
	        });
	      }
	    } else {
	      throw new Error('MessageDisplay needs an object to be associated to!');
	    }

	    /**
	     * @type {MessageOptions}
	     * @private
	     */
	    this.defaults_ = options;

	    /**
	     * @type {?number}
	     * @private
	     */
	    this.autoHideTimer_ = null;

	    if (!options.hasOwnProperty('arrowShow')) {
	      this.defaults_.arrowShow = true;
	    }
	    if (!options.hasOwnProperty('arrowSize')) {
	      this.defaults_.arrowSize = 5;
	    }
	    if (!options.hasOwnProperty('autoHide')) {
	      this.defaults_.autoHide = true;
	    }
	    if (!options.hasOwnProperty('autoHideDelay')) {
	      this.defaults_.autoHideDelay = 15000;
	    }
	    if (!options.hasOwnProperty('className')) {
	      this.defaults_.className = 'error';
	    }
	    if (!options.hasOwnProperty('position')) {
	      this.defaults_.position = 'bottom left';
	    }
	    if (!options.hasOwnProperty('gap')) {
	      this.defaults_.gap = 2;
	    }
	    if (!options.hasOwnProperty('hideAnimation')) {
	      this.defaults_.hideAnimation = 'slideUp';
	    }
	    if (!options.hasOwnProperty('hideDuration')) {
	      this.defaults_.hideDuration = 200;
	    }
	    if (!options.hasOwnProperty('showAnimation')) {
	      this.defaults_.showAnimation = 'slideDown';
	    }
	    if (!options.hasOwnProperty('showDuration')) {
	      this.defaults_.showDuration = 400;
	    }
	    if (!options.hasOwnProperty('style')) {
	      this.defaults_.style = 'benndorf';
	    }
	  }

	  /**
	   * Displays a generic message
	   * @param {string} message
	   * @param {MessageDisplayOptions} options
	   */


	  MessageDisplay.prototype.message = function message(_message) {
	    var _this = this;

	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    var msgOptions = this.defaults_;
	    if (options.hasOwnProperty('autoHide')) {
	      msgOptions.autoHide = options.autoHide;
	    }
	    if (options.hasOwnProperty('autoHideDelay')) {
	      msgOptions.autoHideDelay = options.autoHideDelay;
	    }
	    if (options.hasOwnProperty('className')) {
	      msgOptions.className = options.className;
	    }
	    if (options.hasOwnProperty('position')) {
	      msgOptions.position = options.position;
	    }

	    this.$element_.notify((0, _utilities.html2Text)(_message), msgOptions);

	    // HOTFIX for notifyjs issue
	    (0, _jquery2.default)('.notifyjs-wrapper').click(function () {
	      _this.hide();
	    });
	  };

	  /**
	   * Displays an error message
	   * @param {string} message
	   * @param {MessageReducedDisplayOptions} options
	   */


	  MessageDisplay.prototype.error = function error(message) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    options.className = 'error';
	    this.message(message, options);
	  };

	  /**
	   * Displays an info message
	   * @param {string} message
	   * @param {MessageReducedDisplayOptions} options
	   */


	  MessageDisplay.prototype.info = function info(message) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    options.className = 'info';
	    this.message(message, options);
	  };

	  /**
	   * Displays a success message
	   * @param {string} message
	   * @param {MessageReducedDisplayOptions} options
	   */


	  MessageDisplay.prototype.success = function success(message) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    options.className = 'success';
	    this.message(message, options);
	  };

	  /**
	   * Displays a warning message
	   * @param {string} message
	   * @param {MessageReducedDisplayOptions} options
	   */


	  MessageDisplay.prototype.warn = function warn(message) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    options.className = 'warn';
	    this.message(message, options);
	  };

	  /**
	   * Hides all messages
	   */


	  MessageDisplay.prototype.hide = function hide() {
	    (0, _jquery2.default)('.notifyjs-wrapper').trigger('notify-hide');
	    window.clearTimeout(this.autoHideTimer_);
	  };

	  return MessageDisplay;
	}();

	exports.MessageDisplay = MessageDisplay;

/***/ },
/* 252 */
200,
/* 253 */,
/* 254 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* Notify.js - http://notifyjs.com/ Copyright (c) 2015 MIT */
	(function (factory) {
		// UMD start
		// https://github.com/umdjs/umd/blob/master/jqueryPluginCommonjs.js
		if (true) {
			// AMD. Register as an anonymous module.
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(78)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof module === 'object' && module.exports) {
			// Node/CommonJS
			module.exports = function( root, jQuery ) {
				if ( jQuery === undefined ) {
					// require('jQuery') returns a factory that requires window to
					// build a jQuery instance, we normalize how we use modules
					// that require this pattern but the window provided is a noop
					// if it's defined (how jquery works)
					if ( typeof window !== 'undefined' ) {
						jQuery = require('jquery');
					}
					else {
						jQuery = require('jquery')(root);
					}
				}
				factory(jQuery);
				return jQuery;
			};
		} else {
			// Browser globals
			factory(jQuery);
		}
	}(function ($) {
		//IE8 indexOf polyfill
		var indexOf = [].indexOf || function(item) {
			for (var i = 0, l = this.length; i < l; i++) {
				if (i in this && this[i] === item) {
					return i;
				}
			}
			return -1;
		};

		var pluginName = "notify";
		var pluginClassName = pluginName + "js";
		var blankFieldName = pluginName + "!blank";

		var positions = {
			t: "top",
			m: "middle",
			b: "bottom",
			l: "left",
			c: "center",
			r: "right"
		};
		var hAligns = ["l", "c", "r"];
		var vAligns = ["t", "m", "b"];
		var mainPositions = ["t", "b", "l", "r"];
		var opposites = {
			t: "b",
			m: null,
			b: "t",
			l: "r",
			c: null,
			r: "l"
		};

		var parsePosition = function(str) {
			var pos;
			pos = [];
			$.each(str.split(/\W+/), function(i, word) {
				var w;
				w = word.toLowerCase().charAt(0);
				if (positions[w]) {
					return pos.push(w);
				}
			});
			return pos;
		};

		var styles = {};

		var coreStyle = {
			name: "core",
			html: "<div class=\"" + pluginClassName + "-wrapper\">\n	<div class=\"" + pluginClassName + "-arrow\"></div>\n	<div class=\"" + pluginClassName + "-container\"></div>\n</div>",
			css: "." + pluginClassName + "-corner {\n	position: fixed;\n	margin: 5px;\n	z-index: 1050;\n}\n\n." + pluginClassName + "-corner ." + pluginClassName + "-wrapper,\n." + pluginClassName + "-corner ." + pluginClassName + "-container {\n	position: relative;\n	display: block;\n	height: inherit;\n	width: inherit;\n	margin: 3px;\n}\n\n." + pluginClassName + "-wrapper {\n	z-index: 1;\n	position: absolute;\n	display: inline-block;\n	height: 0;\n	width: 0;\n}\n\n." + pluginClassName + "-container {\n	display: none;\n	z-index: 1;\n	position: absolute;\n}\n\n." + pluginClassName + "-hidable {\n	cursor: pointer;\n}\n\n[data-notify-text],[data-notify-html] {\n	position: relative;\n}\n\n." + pluginClassName + "-arrow {\n	position: absolute;\n	z-index: 2;\n	width: 0;\n	height: 0;\n}"
		};

		var stylePrefixes = {
			"border-radius": ["-webkit-", "-moz-"]
		};

		var getStyle = function(name) {
			return styles[name];
		};

		var addStyle = function(name, def) {
			if (!name) {
				throw "Missing Style name";
			}
			if (!def) {
				throw "Missing Style definition";
			}
			if (!def.html) {
				throw "Missing Style HTML";
			}
			//remove existing style
			var existing = styles[name];
			if (existing && existing.cssElem) {
				if (window.console) {
					console.warn(pluginName + ": overwriting style '" + name + "'");
				}
				styles[name].cssElem.remove();
			}
			def.name = name;
			styles[name] = def;
			var cssText = "";
			if (def.classes) {
				$.each(def.classes, function(className, props) {
					cssText += "." + pluginClassName + "-" + def.name + "-" + className + " {\n";
					$.each(props, function(name, val) {
						if (stylePrefixes[name]) {
							$.each(stylePrefixes[name], function(i, prefix) {
								return cssText += "	" + prefix + name + ": " + val + ";\n";
							});
						}
						return cssText += "	" + name + ": " + val + ";\n";
					});
					return cssText += "}\n";
				});
			}
			if (def.css) {
				cssText += "/* styles for " + def.name + " */\n" + def.css;
			}
			if (cssText) {
				def.cssElem = insertCSS(cssText);
				def.cssElem.attr("id", "notify-" + def.name);
			}
			var fields = {};
			var elem = $(def.html);
			findFields("html", elem, fields);
			findFields("text", elem, fields);
			def.fields = fields;
		};

		var insertCSS = function(cssText) {
			var e, elem, error;
			elem = createElem("style");
			elem.attr("type", 'text/css');
			$("head").append(elem);
			try {
				elem.html(cssText);
			} catch (_) {
				elem[0].styleSheet.cssText = cssText;
			}
			return elem;
		};

		var findFields = function(type, elem, fields) {
			var attr;
			if (type !== "html") {
				type = "text";
			}
			attr = "data-notify-" + type;
			return find(elem, "[" + attr + "]").each(function() {
				var name;
				name = $(this).attr(attr);
				if (!name) {
					name = blankFieldName;
				}
				fields[name] = type;
			});
		};

		var find = function(elem, selector) {
			if (elem.is(selector)) {
				return elem;
			} else {
				return elem.find(selector);
			}
		};

		var pluginOptions = {
			clickToHide: true,
			autoHide: true,
			autoHideDelay: 5000,
			arrowShow: true,
			arrowSize: 5,
			breakNewLines: true,
			elementPosition: "bottom",
			globalPosition: "top right",
			style: "bootstrap",
			className: "error",
			showAnimation: "slideDown",
			showDuration: 400,
			hideAnimation: "slideUp",
			hideDuration: 200,
			gap: 5
		};

		var inherit = function(a, b) {
			var F;
			F = function() {};
			F.prototype = a;
			return $.extend(true, new F(), b);
		};

		var defaults = function(opts) {
			return $.extend(pluginOptions, opts);
		};

		var createElem = function(tag) {
			return $("<" + tag + "></" + tag + ">");
		};

		var globalAnchors = {};

		var getAnchorElement = function(element) {
			var radios;
			if (element.is('[type=radio]')) {
				radios = element.parents('form:first').find('[type=radio]').filter(function(i, e) {
					return $(e).attr("name") === element.attr("name");
				});
				element = radios.first();
			}
			return element;
		};

		var incr = function(obj, pos, val) {
			var opp, temp;
			if (typeof val === "string") {
				val = parseInt(val, 10);
			} else if (typeof val !== "number") {
				return;
			}
			if (isNaN(val)) {
				return;
			}
			opp = positions[opposites[pos.charAt(0)]];
			temp = pos;
			if (obj[opp] !== undefined) {
				pos = positions[opp.charAt(0)];
				val = -val;
			}
			if (obj[pos] === undefined) {
				obj[pos] = val;
			} else {
				obj[pos] += val;
			}
			return null;
		};

		var realign = function(alignment, inner, outer) {
			if (alignment === "l" || alignment === "t") {
				return 0;
			} else if (alignment === "c" || alignment === "m") {
				return outer / 2 - inner / 2;
			} else if (alignment === "r" || alignment === "b") {
				return outer - inner;
			}
			throw "Invalid alignment";
		};

		var encode = function(text) {
			encode.e = encode.e || createElem("div");
			return encode.e.text(text).html();
		};

		function Notification(elem, data, options) {
			if (typeof options === "string") {
				options = {
					className: options
				};
			}
			this.options = inherit(pluginOptions, $.isPlainObject(options) ? options : {});
			this.loadHTML();
			this.wrapper = $(coreStyle.html);
			if (this.options.clickToHide) {
				this.wrapper.addClass(pluginClassName + "-hidable");
			}
			this.wrapper.data(pluginClassName, this);
			this.arrow = this.wrapper.find("." + pluginClassName + "-arrow");
			this.container = this.wrapper.find("." + pluginClassName + "-container");
			this.container.append(this.userContainer);
			if (elem && elem.length) {
				this.elementType = elem.attr("type");
				this.originalElement = elem;
				this.elem = getAnchorElement(elem);
				this.elem.data(pluginClassName, this);
				this.elem.before(this.wrapper);
			}
			this.container.hide();
			this.run(data);
		}

		Notification.prototype.loadHTML = function() {
			var style;
			style = this.getStyle();
			this.userContainer = $(style.html);
			this.userFields = style.fields;
		};

		Notification.prototype.show = function(show, userCallback) {
			var args, callback, elems, fn, hidden;
			callback = (function(_this) {
				return function() {
					if (!show && !_this.elem) {
						_this.destroy();
					}
					if (userCallback) {
						return userCallback();
					}
				};
			})(this);
			hidden = this.container.parent().parents(':hidden').length > 0;
			elems = this.container.add(this.arrow);
			args = [];
			if (hidden && show) {
				fn = "show";
			} else if (hidden && !show) {
				fn = "hide";
			} else if (!hidden && show) {
				fn = this.options.showAnimation;
				args.push(this.options.showDuration);
			} else if (!hidden && !show) {
				fn = this.options.hideAnimation;
				args.push(this.options.hideDuration);
			} else {
				return callback();
			}
			args.push(callback);
			return elems[fn].apply(elems, args);
		};

		Notification.prototype.setGlobalPosition = function() {
			var p = this.getPosition();
			var pMain = p[0];
			var pAlign = p[1];
			var main = positions[pMain];
			var align = positions[pAlign];
			var key = pMain + "|" + pAlign;
			var anchor = globalAnchors[key];
			if (!anchor) {
				anchor = globalAnchors[key] = createElem("div");
				var css = {};
				css[main] = 0;
				if (align === "middle") {
					css.top = '45%';
				} else if (align === "center") {
					css.left = '45%';
				} else {
					css[align] = 0;
				}
				anchor.css(css).addClass(pluginClassName + "-corner");
				$("body").append(anchor);
			}
			return anchor.prepend(this.wrapper);
		};

		Notification.prototype.setElementPosition = function() {
			var arrowColor, arrowCss, arrowSize, color, contH, contW, css, elemH, elemIH, elemIW, elemPos, elemW, gap, j, k, len, len1, mainFull, margin, opp, oppFull, pAlign, pArrow, pMain, pos, posFull, position, ref, wrapPos;
			position = this.getPosition();
			pMain = position[0];
			pAlign = position[1];
			pArrow = position[2];
			elemPos = this.elem.position();
			elemH = this.elem.outerHeight();
			elemW = this.elem.outerWidth();
			elemIH = this.elem.innerHeight();
			elemIW = this.elem.innerWidth();
			wrapPos = this.wrapper.position();
			contH = this.container.height();
			contW = this.container.width();
			mainFull = positions[pMain];
			opp = opposites[pMain];
			oppFull = positions[opp];
			css = {};
			css[oppFull] = pMain === "b" ? elemH : pMain === "r" ? elemW : 0;
			incr(css, "top", elemPos.top - wrapPos.top);
			incr(css, "left", elemPos.left - wrapPos.left);
			ref = ["top", "left"];
			for (j = 0, len = ref.length; j < len; j++) {
				pos = ref[j];
				margin = parseInt(this.elem.css("margin-" + pos), 10);
				if (margin) {
					incr(css, pos, margin);
				}
			}
			gap = Math.max(0, this.options.gap - (this.options.arrowShow ? arrowSize : 0));
			incr(css, oppFull, gap);
			if (!this.options.arrowShow) {
				this.arrow.hide();
			} else {
				arrowSize = this.options.arrowSize;
				arrowCss = $.extend({}, css);
				arrowColor = this.userContainer.css("border-color") || this.userContainer.css("border-top-color") || this.userContainer.css("background-color") || "white";
				for (k = 0, len1 = mainPositions.length; k < len1; k++) {
					pos = mainPositions[k];
					posFull = positions[pos];
					if (pos === opp) {
						continue;
					}
					color = posFull === mainFull ? arrowColor : "transparent";
					arrowCss["border-" + posFull] = arrowSize + "px solid " + color;
				}
				incr(css, positions[opp], arrowSize);
				if (indexOf.call(mainPositions, pAlign) >= 0) {
					incr(arrowCss, positions[pAlign], arrowSize * 2);
				}
			}
			if (indexOf.call(vAligns, pMain) >= 0) {
				incr(css, "left", realign(pAlign, contW, elemW));
				if (arrowCss) {
					incr(arrowCss, "left", realign(pAlign, arrowSize, elemIW));
				}
			} else if (indexOf.call(hAligns, pMain) >= 0) {
				incr(css, "top", realign(pAlign, contH, elemH));
				if (arrowCss) {
					incr(arrowCss, "top", realign(pAlign, arrowSize, elemIH));
				}
			}
			if (this.container.is(":visible")) {
				css.display = "block";
			}
			this.container.removeAttr("style").css(css);
			if (arrowCss) {
				return this.arrow.removeAttr("style").css(arrowCss);
			}
		};

		Notification.prototype.getPosition = function() {
			var pos, ref, ref1, ref2, ref3, ref4, ref5, text;
			text = this.options.position || (this.elem ? this.options.elementPosition : this.options.globalPosition);
			pos = parsePosition(text);
			if (pos.length === 0) {
				pos[0] = "b";
			}
			if (ref = pos[0], indexOf.call(mainPositions, ref) < 0) {
				throw "Must be one of [" + mainPositions + "]";
			}
			if (pos.length === 1 || ((ref1 = pos[0], indexOf.call(vAligns, ref1) >= 0) && (ref2 = pos[1], indexOf.call(hAligns, ref2) < 0)) || ((ref3 = pos[0], indexOf.call(hAligns, ref3) >= 0) && (ref4 = pos[1], indexOf.call(vAligns, ref4) < 0))) {
				pos[1] = (ref5 = pos[0], indexOf.call(hAligns, ref5) >= 0) ? "m" : "l";
			}
			if (pos.length === 2) {
				pos[2] = pos[1];
			}
			return pos;
		};

		Notification.prototype.getStyle = function(name) {
			var style;
			if (!name) {
				name = this.options.style;
			}
			if (!name) {
				name = "default";
			}
			style = styles[name];
			if (!style) {
				throw "Missing style: " + name;
			}
			return style;
		};

		Notification.prototype.updateClasses = function() {
			var classes, style;
			classes = ["base"];
			if ($.isArray(this.options.className)) {
				classes = classes.concat(this.options.className);
			} else if (this.options.className) {
				classes.push(this.options.className);
			}
			style = this.getStyle();
			classes = $.map(classes, function(n) {
				return pluginClassName + "-" + style.name + "-" + n;
			}).join(" ");
			return this.userContainer.attr("class", classes);
		};

		Notification.prototype.run = function(data, options) {
			var d, datas, name, type, value;
			if ($.isPlainObject(options)) {
				$.extend(this.options, options);
			} else if ($.type(options) === "string") {
				this.options.className = options;
			}
			if (this.container && !data) {
				this.show(false);
				return;
			} else if (!this.container && !data) {
				return;
			}
			datas = {};
			if ($.isPlainObject(data)) {
				datas = data;
			} else {
				datas[blankFieldName] = data;
			}
			for (name in datas) {
				d = datas[name];
				type = this.userFields[name];
				if (!type) {
					continue;
				}
				if (type === "text") {
					d = encode(d);
					if (this.options.breakNewLines) {
						d = d.replace(/\n/g, '<br/>');
					}
				}
				value = name === blankFieldName ? '' : '=' + name;
				find(this.userContainer, "[data-notify-" + type + value + "]").html(d);
			}
			this.updateClasses();
			if (this.elem) {
				this.setElementPosition();
			} else {
				this.setGlobalPosition();
			}
			this.show(true);
			if (this.options.autoHide) {
				clearTimeout(this.autohideTimer);
				this.autohideTimer = setTimeout(this.show.bind(this, false), this.options.autoHideDelay);
			}
		};

		Notification.prototype.destroy = function() {
			this.wrapper.data(pluginClassName, null);
			this.wrapper.remove();
		};

		$[pluginName] = function(elem, data, options) {
			if ((elem && elem.nodeName) || elem.jquery) {
				$(elem)[pluginName](data, options);
			} else {
				options = data;
				data = elem;
				new Notification(null, data, options);
			}
			return elem;
		};

		$.fn[pluginName] = function(data, options) {
			$(this).each(function() {
				var prev = getAnchorElement($(this)).data(pluginClassName);
				if (prev) {
					prev.destroy();
				}
				var curr = new Notification($(this), data, options);
			});
			return this;
		};

		$.extend($[pluginName], {
			defaults: defaults,
			addStyle: addStyle,
			pluginOptions: pluginOptions,
			getStyle: getStyle,
			insertCSS: insertCSS
		});

		//always include the default bootstrap style
		addStyle("bootstrap", {
			html: "<div>\n<span data-notify-text></span>\n</div>",
			classes: {
				base: {
					"font-weight": "bold",
					"padding": "8px 15px 8px 14px",
					"text-shadow": "0 1px 0 rgba(255, 255, 255, 0.5)",
					"background-color": "#fcf8e3",
					"border": "1px solid #fbeed5",
					"border-radius": "4px",
					"white-space": "nowrap",
					"padding-left": "25px",
					"background-repeat": "no-repeat",
					"background-position": "3px 7px"
				},
				error: {
					"color": "#B94A48",
					"background-color": "#F2DEDE",
					"border-color": "#EED3D7",
					"background-image": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAtRJREFUeNqkVc1u00AQHq+dOD+0poIQfkIjalW0SEGqRMuRnHos3DjwAH0ArlyQeANOOSMeAA5VjyBxKBQhgSpVUKKQNGloFdw4cWw2jtfMOna6JOUArDTazXi/b3dm55socPqQhFka++aHBsI8GsopRJERNFlY88FCEk9Yiwf8RhgRyaHFQpPHCDmZG5oX2ui2yilkcTT1AcDsbYC1NMAyOi7zTX2Agx7A9luAl88BauiiQ/cJaZQfIpAlngDcvZZMrl8vFPK5+XktrWlx3/ehZ5r9+t6e+WVnp1pxnNIjgBe4/6dAysQc8dsmHwPcW9C0h3fW1hans1ltwJhy0GxK7XZbUlMp5Ww2eyan6+ft/f2FAqXGK4CvQk5HueFz7D6GOZtIrK+srupdx1GRBBqNBtzc2AiMr7nPplRdKhb1q6q6zjFhrklEFOUutoQ50xcX86ZlqaZpQrfbBdu2R6/G19zX6XSgh6RX5ubyHCM8nqSID6ICrGiZjGYYxojEsiw4PDwMSL5VKsC8Yf4VRYFzMzMaxwjlJSlCyAQ9l0CW44PBADzXhe7xMdi9HtTrdYjFYkDQL0cn4Xdq2/EAE+InCnvADTf2eah4Sx9vExQjkqXT6aAERICMewd/UAp/IeYANM2joxt+q5VI+ieq2i0Wg3l6DNzHwTERPgo1ko7XBXj3vdlsT2F+UuhIhYkp7u7CarkcrFOCtR3H5JiwbAIeImjT/YQKKBtGjRFCU5IUgFRe7fF4cCNVIPMYo3VKqxwjyNAXNepuopyqnld602qVsfRpEkkz+GFL1wPj6ySXBpJtWVa5xlhpcyhBNwpZHmtX8AGgfIExo0ZpzkWVTBGiXCSEaHh62/PoR0p/vHaczxXGnj4bSo+G78lELU80h1uogBwWLf5YlsPmgDEd4M236xjm+8nm4IuE/9u+/PH2JXZfbwz4zw1WbO+SQPpXfwG/BBgAhCNZiSb/pOQAAAAASUVORK5CYII=)"
				},
				success: {
					"color": "#468847",
					"background-color": "#DFF0D8",
					"border-color": "#D6E9C6",
					"background-image": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAutJREFUeNq0lctPE0Ecx38zu/RFS1EryqtgJFA08YCiMZIAQQ4eRG8eDGdPJiYeTIwHTfwPiAcvXIwXLwoXPaDxkWgQ6islKlJLSQWLUraPLTv7Gme32zoF9KSTfLO7v53vZ3d/M7/fIth+IO6INt2jjoA7bjHCJoAlzCRw59YwHYjBnfMPqAKWQYKjGkfCJqAF0xwZjipQtA3MxeSG87VhOOYegVrUCy7UZM9S6TLIdAamySTclZdYhFhRHloGYg7mgZv1Zzztvgud7V1tbQ2twYA34LJmF4p5dXF1KTufnE+SxeJtuCZNsLDCQU0+RyKTF27Unw101l8e6hns3u0PBalORVVVkcaEKBJDgV3+cGM4tKKmI+ohlIGnygKX00rSBfszz/n2uXv81wd6+rt1orsZCHRdr1Imk2F2Kob3hutSxW8thsd8AXNaln9D7CTfA6O+0UgkMuwVvEFFUbbAcrkcTA8+AtOk8E6KiQiDmMFSDqZItAzEVQviRkdDdaFgPp8HSZKAEAL5Qh7Sq2lIJBJwv2scUqkUnKoZgNhcDKhKg5aH+1IkcouCAdFGAQsuWZYhOjwFHQ96oagWgRoUov1T9kRBEODAwxM2QtEUl+Wp+Ln9VRo6BcMw4ErHRYjH4/B26AlQoQQTRdHWwcd9AH57+UAXddvDD37DmrBBV34WfqiXPl61g+vr6xA9zsGeM9gOdsNXkgpEtTwVvwOklXLKm6+/p5ezwk4B+j6droBs2CsGa/gNs6RIxazl4Tc25mpTgw/apPR1LYlNRFAzgsOxkyXYLIM1V8NMwyAkJSctD1eGVKiq5wWjSPdjmeTkiKvVW4f2YPHWl3GAVq6ymcyCTgovM3FzyRiDe2TaKcEKsLpJvNHjZgPNqEtyi6mZIm4SRFyLMUsONSSdkPeFtY1n0mczoY3BHTLhwPRy9/lzcziCw9ACI+yql0VLzcGAZbYSM5CCSZg1/9oc/nn7+i8N9p/8An4JMADxhH+xHfuiKwAAAABJRU5ErkJggg==)"
				},
				info: {
					"color": "#3A87AD",
					"background-color": "#D9EDF7",
					"border-color": "#BCE8F1",
					"background-image": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QYFAhkSsdes/QAAA8dJREFUOMvVlGtMW2UYx//POaWHXg6lLaW0ypAtw1UCgbniNOLcVOLmAjHZolOYlxmTGXVZdAnRfXQm+7SoU4mXaOaiZsEpC9FkiQs6Z6bdCnNYruM6KNBw6YWewzl9z+sHImEWv+vz7XmT95f/+3/+7wP814v+efDOV3/SoX3lHAA+6ODeUFfMfjOWMADgdk+eEKz0pF7aQdMAcOKLLjrcVMVX3xdWN29/GhYP7SvnP0cWfS8caSkfHZsPE9Fgnt02JNutQ0QYHB2dDz9/pKX8QjjuO9xUxd/66HdxTeCHZ3rojQObGQBcuNjfplkD3b19Y/6MrimSaKgSMmpGU5WevmE/swa6Oy73tQHA0Rdr2Mmv/6A1n9w9suQ7097Z9lM4FlTgTDrzZTu4StXVfpiI48rVcUDM5cmEksrFnHxfpTtU/3BFQzCQF/2bYVoNbH7zmItbSoMj40JSzmMyX5qDvriA7QdrIIpA+3cdsMpu0nXI8cV0MtKXCPZev+gCEM1S2NHPvWfP/hL+7FSr3+0p5RBEyhEN5JCKYr8XnASMT0xBNyzQGQeI8fjsGD39RMPk7se2bd5ZtTyoFYXftF6y37gx7NeUtJJOTFlAHDZLDuILU3j3+H5oOrD3yWbIztugaAzgnBKJuBLpGfQrS8wO4FZgV+c1IxaLgWVU0tMLEETCos4xMzEIv9cJXQcyagIwigDGwJgOAtHAwAhisQUjy0ORGERiELgG4iakkzo4MYAxcM5hAMi1WWG1yYCJIcMUaBkVRLdGeSU2995TLWzcUAzONJ7J6FBVBYIggMzmFbvdBV44Corg8vjhzC+EJEl8U1kJtgYrhCzgc/vvTwXKSib1paRFVRVORDAJAsw5FuTaJEhWM2SHB3mOAlhkNxwuLzeJsGwqWzf5TFNdKgtY5qHp6ZFf67Y/sAVadCaVY5YACDDb3Oi4NIjLnWMw2QthCBIsVhsUTU9tvXsjeq9+X1d75/KEs4LNOfcdf/+HthMnvwxOD0wmHaXr7ZItn2wuH2SnBzbZAbPJwpPx+VQuzcm7dgRCB57a1uBzUDRL4bfnI0RE0eaXd9W89mpjqHZnUI5Hh2l2dkZZUhOqpi2qSmpOmZ64Tuu9qlz/SEXo6MEHa3wOip46F1n7633eekV8ds8Wxjn37Wl63VVa+ej5oeEZ/82ZBETJjpJ1Rbij2D3Z/1trXUvLsblCK0XfOx0SX2kMsn9dX+d+7Kf6h8o4AIykuffjT8L20LU+w4AZd5VvEPY+XpWqLV327HR7DzXuDnD8r+ovkBehJ8i+y8YAAAAASUVORK5CYII=)"
				},
				warn: {
					"color": "#C09853",
					"background-color": "#FCF8E3",
					"border-color": "#FBEED5",
					"background-image": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAABJlBMVEXr6eb/2oD/wi7/xjr/0mP/ykf/tQD/vBj/3o7/uQ//vyL/twebhgD/4pzX1K3z8e349vK6tHCilCWbiQymn0jGworr6dXQza3HxcKkn1vWvV/5uRfk4dXZ1bD18+/52YebiAmyr5S9mhCzrWq5t6ufjRH54aLs0oS+qD751XqPhAybhwXsujG3sm+Zk0PTwG6Shg+PhhObhwOPgQL4zV2nlyrf27uLfgCPhRHu7OmLgAafkyiWkD3l49ibiAfTs0C+lgCniwD4sgDJxqOilzDWowWFfAH08uebig6qpFHBvH/aw26FfQTQzsvy8OyEfz20r3jAvaKbhgG9q0nc2LbZxXanoUu/u5WSggCtp1anpJKdmFz/zlX/1nGJiYmuq5Dx7+sAAADoPUZSAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfdBgUBGhh4aah5AAAAlklEQVQY02NgoBIIE8EUcwn1FkIXM1Tj5dDUQhPU502Mi7XXQxGz5uVIjGOJUUUW81HnYEyMi2HVcUOICQZzMMYmxrEyMylJwgUt5BljWRLjmJm4pI1hYp5SQLGYxDgmLnZOVxuooClIDKgXKMbN5ggV1ACLJcaBxNgcoiGCBiZwdWxOETBDrTyEFey0jYJ4eHjMGWgEAIpRFRCUt08qAAAAAElFTkSuQmCC)"
				}
			}
		});

		$(function() {
			insertCSS(coreStyle.css).attr("id", "core-notify");
			$(document).on("click", "." + pluginClassName + "-hidable", function(e) {
				$(this).trigger("notify-hide");
			});
			$(document).on("notify-hide", "." + pluginClassName + "-wrapper", function(e) {
				var elem = $(this).data(pluginClassName);
				if(elem) {
					elem.show(false);
				}
			});
		});

	}));


/***/ },
/* 255 */
200,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.MeasurementButton = undefined;

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(120);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(121);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _openlayers = __webpack_require__(77);

	var _openlayers2 = _interopRequireDefault(_openlayers);

	var _jquery = __webpack_require__(78);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _Control2 = __webpack_require__(215);

	var _globals = __webpack_require__(183);

	var _VectorLayer = __webpack_require__(168);

	__webpack_require__(260);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @typedef {g4uControlOptions} MeasurementButtonOptions
	 * @property {StyleLike} [style='#defaultStyle']
	 * @property {string} type geometry type ('LineString', 'Polygon')
	 * @property {number} [dimension=1] 1 for lines, 2 for polygons
	 * @property {string} [atDrawEnd] if set to 'newMeasurement' the control will start a new measurement after
	 *    completing a measurement. if set to 'closeWindow' the window will be closed.
	 */

	/**
	 * Enables the user to draw lines or polygons on the map and displays the length or area.
	 */
	var MeasurementButton = exports.MeasurementButton = function (_Control) {
	  (0, _inherits3.default)(MeasurementButton, _Control);

	  /**
	   * @param {MeasurementButtonOptions} options
	   */
	  function MeasurementButton() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    (0, _classCallCheck3.default)(this, MeasurementButton);

	    options.element = (0, _jquery2.default)('<div>').get(0);
	    options.className = options.className || 'g4u-measurement';
	    options.singleButton = false;

	    /**
	     * @type {StyleLike}
	     * @private
	     */
	    var _this = (0, _possibleConstructorReturn3.default)(this, _Control.call(this, options));

	    _this.style_ = options.style || '#defaultStyle';

	    if (!options.hasOwnProperty('type')) {
	      throw new Error('Measurement needs a type (Polygon, LineString, etc)');
	    }

	    /**
	     * @type {string}
	     * @private
	     */
	    _this.type_ = options.type;

	    /**
	     * @type {number}
	     * @private
	     */
	    _this.dimension_ = options.dimension || 1;

	    _this.setTitle(_this.getTitle() || _this.getLocaliser().localiseUsingDictionary('MeasurementButton dim' + _this.dimension_ + ' title'));
	    _this.setTipLabel(_this.getTipLabel() || _this.getLocaliser().localiseUsingDictionary('MeasurementButton dim' + _this.dimension_ + ' tipLabel'));

	    /**
	     * @type {string|undefined}
	     * @private
	     */
	    _this.atDrawEnd_ = options.atDrawEnd;

	    /**
	     * @type {boolean}
	     * @private
	     */
	    _this.active_ = false;

	    /**
	     * @type {number}
	     * @private
	     */
	    _this.value_ = 0;

	    /**
	     * @type {jQuery}
	     * @private
	     */
	    _this.$valueDisplay_ = (0, _jquery2.default)('<span>').html('0');

	    /**
	     * @type {jQuery}
	     * @private
	     */
	    _this.$unitPlaceholder_ = (0, _jquery2.default)('<span>');
	    return _this;
	  }

	  /**
	   * @param {G4UMap} map
	   */


	  MeasurementButton.prototype.setMap = function setMap(map) {
	    var _this2 = this;

	    if (map) {
	      (function () {
	        _this2.get$Element().append(_this2.getLocaliser().localiseUsingDictionary('MeasurementButton dim' + _this2.dimension_ + ' measured')).append((0, _jquery2.default)('<span>').addClass(_this2.className_ + '-value').append(_this2.$valueDisplay_).append('&nbsp;').append(_this2.$unitPlaceholder_)).append('<br/>').append(_this2.getLocaliser().localiseUsingDictionary('MeasurementButton doubleClickEndsMeasurement'));

	        /**
	         * @type {ol.proj.Projection}
	         * @private
	         */
	        _this2.measurementProjection_ = map.get('measurementProjection');

	        if (!_this2.measurementProjection_) {
	          throw new Error('MeasurementButton needs a measurementProjection. This is a global option of the map.');
	        }

	        if (_this2.dimension_ === 1) {
	          _this2.$unitPlaceholder_.replaceWith(_this2.measurementProjection_.getUnits());
	        }
	        if (_this2.dimension_ === 2) {
	          _this2.$unitPlaceholder_.replaceWith(_this2.measurementProjection_.getUnits() + '&sup2;');
	        }

	        /**
	         * @type {ol.TransformFunction}
	         * @private
	         */
	        _this2.measurementTransform_ = _openlayers2.default.proj.getTransform(map.getView().getProjection(), _this2.measurementProjection_);

	        /**
	         * @type {ol.source.Vector}
	         * @private
	         */
	        _this2.source_ = new _openlayers2.default.source.Vector({
	          projection: _this2.measurementProjection_
	        });

	        /**
	         * @type {VectorLayer}
	         * @private
	         */
	        _this2.layer_ = new _VectorLayer.VectorLayer({
	          source: _this2.source_
	        });

	        map.get('styling').styleLayer(_this2.layer_, _this2.style_);

	        map.getLayers().insertAt(1, _this2.layer_); // at 0 the baselayers are

	        /**
	         * @type {ol.interaction.Draw}
	         * @private
	         */
	        _this2.drawInteraction_ = new _openlayers2.default.interaction.Draw({
	          source: _this2.source_,
	          type: _this2.type_,
	          style: map.get('styling').getStyle(_this2.style_)
	        });

	        _this2.drawInteraction_.setActive(false);

	        map.addSupersedingInteraction('singleclick dblclick pointermove', _this2.drawInteraction_);

	        var curFeature = null;

	        _this2.drawInteraction_.on('drawstart', function (e) {
	          _this2.clear();
	          curFeature = e.feature;
	          _this2.dispatchEvent('measurement');
	        });

	        map.on('click', function () {
	          if (_this2.getActive()) {
	            var geometry = curFeature.getGeometry().clone();
	            geometry.applyTransform(_this2.measurementTransform_);
	            if (_this2.dimension_ === 1) {
	              _this2.setValue(geometry.getLength());
	            } else if (_this2.dimension_ === 2) {
	              _this2.setValue(geometry.getArea());
	            }
	          }
	        });

	        (0, _jquery2.default)(map.getViewport()).parent().on('keydown', function (e) {
	          if (e.which === _globals.keyCodes.ESCAPE && _this2.drawInteraction_.getActive()) {
	            _this2.drawInteraction_.finishDrawing();
	          }
	        });

	        _this2.drawInteraction_.on('drawend', function () {
	          switch (_this2.atDrawEnd_) {
	            case 'newMeasurement':
	              break;
	            case 'closeWindow':
	              _this2.setActive(false);
	              break;
	            default:
	              _this2.drawInteraction_.setActive(false);
	          }
	        });
	      })();
	    } else {
	      this.getMap().getLayers().remove(this.layer_);
	      this.getMap().removeInteraction(this.drawInteraction_);
	    }

	    _Control.prototype.setMap.call(this, map);
	  };

	  /**
	   * @returns {number}
	   */


	  MeasurementButton.prototype.getValue = function getValue() {
	    return this.value_;
	  };

	  /**
	   * @param {number} value
	   */


	  MeasurementButton.prototype.setValue = function setValue(value) {
	    this.value_ = value;
	    this.$valueDisplay_.html('' + Math.round(value));
	    this.changed();
	  };

	  /**
	   * @returns {string}
	   */


	  MeasurementButton.prototype.getType = function getType() {
	    return this.type_;
	  };

	  /**
	   * @returns {boolean}
	   */


	  MeasurementButton.prototype.getActive = function getActive() {
	    return this.active_;
	  };

	  /**
	   * @param {boolean} active
	   */


	  MeasurementButton.prototype.setActive = function setActive(active) {
	    var oldValue = this.active_;

	    if (oldValue !== active) {
	      var changeEvent = {
	        type: 'change:active',
	        oldValue: oldValue
	      };

	      this.active_ = active;

	      this.layer_.setVisible(active);

	      if (active) {
	        this.getMap().get('featurePopup').setVisible(false);
	        (0, _jquery2.default)(this.getMap().getViewport()).addClass(_globals.cssClasses.crosshair);

	        this.clear();
	        this.drawInteraction_.setActive(true);
	      } else {
	        (0, _jquery2.default)(this.getMap().getViewport()).removeClass(_globals.cssClasses.crosshair);

	        this.drawInteraction_.setActive(false);
	      }

	      this.dispatchEvent(changeEvent);
	    }
	  };

	  /**
	   * Clears any measurement
	   */


	  MeasurementButton.prototype.clear = function clear() {
	    this.source_.clear();
	    this.setValue(0);
	  };

	  return MeasurementButton;
	}(_Control2.Control);

/***/ },
/* 260 */
200,
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.LanguageSwitcherButton = undefined;

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(120);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(121);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _jquery = __webpack_require__(78);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _Control2 = __webpack_require__(215);

	var _html = __webpack_require__(198);

	var _Debug = __webpack_require__(151);

	__webpack_require__(265);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @typedef {g4uControlOptions} LanguageSwitcherButtonOptions
	 */

	/**
	 * A button to switch the language that is being used.
	 * Works if only two languages are configured.
	 */
	var LanguageSwitcherButton = exports.LanguageSwitcherButton = function (_Control) {
	  (0, _inherits3.default)(LanguageSwitcherButton, _Control);

	  /**
	   * @param {LanguageSwitcherButtonOptions} options
	   */
	  function LanguageSwitcherButton() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    (0, _classCallCheck3.default)(this, LanguageSwitcherButton);

	    options.element = (0, _jquery2.default)('<button>').get(0);
	    options.singleButton = true;
	    options.className = options.className || 'g4u-languageswitcher';

	    /**
	     * @type {jQuery}
	     * @private
	     */
	    var _this = (0, _possibleConstructorReturn3.default)(this, _Control.call(this, options));

	    _this.$button_ = _this.get$Element().addClass(_this.className_ + '-button');

	    var languages = _this.getLocaliser().getAvailableLanguages();

	    if (languages.length < 2) {
	      _Debug.Debug.info('You do not have any languages to switch between.');
	      _Debug.Debug.info('Could it be that you forgot to disable languageSwitcherButton?');
	    } else if (languages.length > 2) {
	      _Debug.Debug.info('You have more than 2 languages to switch between.');
	      _Debug.Debug.info('In this case you need to use languageSwitcherMenu.');
	    }

	    _this.$button_.on('click', function () {
	      var availableLanguages = _this.getLocaliser().getAvailableLanguages();
	      var sourceLanguage = availableLanguages[0];
	      var targetLanguage = availableLanguages[1] || availableLanguages[0];
	      _this.getLocaliser().setCurrentLang(targetLanguage);

	      var map = _this.getMap();
	      var visibilities = map.getLayerGroup().getIdsVisibilities();

	      map.get('configurator').configureLayers();
	      map.get('configurator').configureUI();

	      map.getLayerGroup().setIdsVisibilities(visibilities);

	      _this.getLocaliser().setAvailableLanguages([targetLanguage, sourceLanguage]);
	    });
	    return _this;
	  }

	  /**
	   * @param {G4UMap} map
	   */


	  LanguageSwitcherButton.prototype.setMap = function setMap(map) {
	    if (map) {
	      this.$button_.html(this.getLocaliser().getCurrentLang());
	      (0, _html.addTooltip)(this.$button_, this.getLocaliser().localiseUsingDictionary('LanguageSwitcherButton tipLabel'));
	    }

	    _Control.prototype.setMap.call(this, map);
	  };

	  return LanguageSwitcherButton;
	}(_Control2.Control);

/***/ },
/* 265 */
200,
/* 266 */,
/* 267 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.LanguageSwitcherMenu = undefined;

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(120);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(121);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _jquery = __webpack_require__(78);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _Dropdown = __webpack_require__(268);

	var _html = __webpack_require__(198);

	var _Control = __webpack_require__(215);

	var _globals = __webpack_require__(183);

	var _Debug = __webpack_require__(151);

	__webpack_require__(265);

	var _ListenerOrganizerMixin = __webpack_require__(217);

	var _utilities = __webpack_require__(138);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @typedef {g4uControlOptions} LanguageSwitcherMenuOptions
	 */

	/**
	 * A button to switch the language that is being used.
	 */
	var LanguageSwitcherMenu = exports.LanguageSwitcherMenu = function (_mixin) {
	  (0, _inherits3.default)(LanguageSwitcherMenu, _mixin);

	  /**
	   * @param {LanguageSwitcherMenuOptions} options
	   */
	  function LanguageSwitcherMenu() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    (0, _classCallCheck3.default)(this, LanguageSwitcherMenu);

	    options.className = options.className || 'g4u-languageswitchermenu';
	    options.element = (0, _jquery2.default)('<div>').get(0);
	    options.singleButton = false;

	    var _this = (0, _possibleConstructorReturn3.default)(this, _mixin.call(this, options));

	    _this.setTitle(_this.getLocaliser().getCurrentLang());

	    /**
	     * @type {jQuery}
	     * @private
	     */
	    _this.$button_ = (0, _jquery2.default)('<button>').addClass(_this.className_ + '-button').addClass(_globals.cssClasses.mainButton);
	    _this.get$Element().append(_this.$button_);

	    var dropdownOptions = { 'className': 'g4u-dropdown' };

	    /**
	     * @type {Dropdown}
	     * @private
	     */
	    _this.dropdown_ = new _Dropdown.Dropdown(dropdownOptions);
	    _this.get$Element().append(_this.dropdown_.get$Element());

	    var languages = _this.getLocaliser().getAvailableLanguages();

	    if (languages.length < 2) {
	      _Debug.Debug.info('You do not have any languages to switch between.');
	      _Debug.Debug.info('Could it be that you forgot to disable languageSwitcherMenu?');
	    } else if (languages.length === 2) {
	      _Debug.Debug.info('You only have 2 languages to switch between.');
	      _Debug.Debug.info('What about using languageSwitcherButton in place of languageSwitcherMenu?');
	    }

	    _this.dropdown_.setEntries(languages, languages.map(function (l) {
	      return l.toUpperCase() + ' - ' + _this.getLocaliser().localiseUsingDictionary(l);
	    }));

	    _this.dropdown_.on('select', function () {
	      return _this.switchLanguage_(_this.dropdown_.getValue());
	    });

	    _this.get$Element().on('keydown', function (e) {
	      if (e.which === _globals.keyCodes.ESCAPE) {
	        _this.setActive(false);
	        (0, _jquery2.default)(_this.getMap().getViewport()).focus();
	      }
	    });

	    /**
	     * @type {boolean}
	     * @private
	     */
	    _this.active_ = false;
	    return _this;
	  }

	  /**
	   * Creates a handler to switch to the specified language
	   * @param {string} iso639
	   */


	  LanguageSwitcherMenu.prototype.switchLanguage_ = function switchLanguage_(iso639) {
	    this.getLocaliser().setCurrentLang(iso639);
	    this.setTitle(iso639);

	    var map = this.getMap();

	    var visibilities = map.getLayerGroup().getIdsVisibilities();

	    map.get('configurator').configureLayers();
	    map.get('configurator').configureUI();

	    map.getLayerGroup().setIdsVisibilities(visibilities);
	  };

	  /**
	   * @param {G4UMap} map
	   */


	  LanguageSwitcherMenu.prototype.setMap = function setMap(map) {
	    var _this2 = this;

	    if (this.getMap()) {
	      this.detachAllListeners();

	      this.setActive(false);
	    }

	    _mixin.prototype.setMap.call(this, map);

	    if (map) {
	      this.collapse_ = true;

	      // The following does not work in 'on('click')' as it relies on useCapture; all click events will be
	      // dispatched to the listener before being dispatched to any EventTarget beneath it in the DOM tree.
	      this.listenAt(document).on('click', function () {
	        _this2.collapse_ = true;
	      }, true);

	      this.listenAt([(0, _jquery2.default)(this.getMap().getViewport()).find('.ol-overlaycontainer-stopevent'), document]).on('click', function () {
	        if (_this2.collapse_ && _this2.getActive()) {
	          _this2.setActive(false);
	        }
	      });

	      this.listenAt(this.get$Element()).on('click', function () {
	        _this2.collapse_ = false;
	        _this2.setActive(!_this2.getActive());
	      });

	      this.$button_.html(this.getLocaliser().getCurrentLang());

	      (0, _html.addTooltip)(this.$button_, this.getLocaliser().localiseUsingDictionary('LanguageSwitcherMenu tipLabel'));
	    }
	  };

	  LanguageSwitcherMenu.prototype.getActive = function getActive() {
	    return this.active_;
	  };

	  LanguageSwitcherMenu.prototype.setActive = function setActive(active) {
	    var oldValue = this.active_;
	    if (oldValue !== active) {
	      if (active) {
	        this.collapse_ = false;
	        this.dropdown_.slideDown(this.getMap().get('mobile'));
	      } else {
	        this.dropdown_.slideUp(this.getMap().get('mobile'));
	      }
	      this.active_ = active;
	      this.dispatchEvent({
	        type: 'change:active',
	        oldValue: oldValue
	      });
	    }
	  };

	  return LanguageSwitcherMenu;
	}((0, _utilities.mixin)(_Control.Control, _ListenerOrganizerMixin.ListenerOrganizerMixin));

/***/ },
/* 268 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Dropdown = undefined;

	var _promise = __webpack_require__(12);

	var _promise2 = _interopRequireDefault(_promise);

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(120);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(121);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _openlayers = __webpack_require__(77);

	var _openlayers2 = _interopRequireDefault(_openlayers);

	var _jquery = __webpack_require__(78);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _globals = __webpack_require__(183);

	__webpack_require__(80);

	__webpack_require__(269);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @typedef {object} DropdownOptions
	 * @property {string} [className='g4u-dropdown']
	 * @property {string} [ghostentry='no entries'] This text is shown if the dropdown has no entries
	 * @property {number} [slideDuration=400] standard slideDuration
	 */

	/**
	 * @typedef {Object} Entry
	 * @property {jQuery} $element
	 * @property {*} value
	 */

	_jquery2.default.extend(_jquery2.default.easing, {
	  easeOutCirc: function easeOutCirc(x, t, b, c, d) {
	    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
	  },
	  easeInCirc: function easeInCirc(x, t, b, c, d) {
	    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
	  }
	});

	/**
	 * A HTML Dropdown select.
	 * The text entries in the list can be setted and changed and given a click handler.
	 * @fires 'leave:backwards' This event is raised if the dropdown is left via the up arrow or shift+tab
	 * @fires 'leave:forwards' This event is raised if the dropdown is left via the down arrow or tab
	 */

	var Dropdown = exports.Dropdown = function (_ol$Object) {
	  (0, _inherits3.default)(Dropdown, _ol$Object);

	  /**
	   * @param {DropdownOptions} [options={}]
	   */
	  function Dropdown() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    (0, _classCallCheck3.default)(this, Dropdown);

	    /**
	     * @type {string}
	     * @private
	     */
	    var _this = (0, _possibleConstructorReturn3.default)(this, _ol$Object.call(this));

	    _this.className_ = options.className || 'g4u-dropdown';

	    /**
	     * @type {Object.<string, string>}
	     * @private
	     */
	    _this.classNames_ = {
	      entry: _this.className_ + '-entry',
	      selected: _this.className_ + '-selected',
	      ghost: _this.className_ + '-ghostentry'
	    };

	    /**
	     * @type {jQuery}
	     * @private
	     */
	    _this.$element_ = (0, _jquery2.default)('<div>').addClass(_this.className_);

	    /**
	     * @type {jQuery}
	     */
	    _this.$ghostentry = (0, _jquery2.default)('<button tabindex="-1">').addClass(_this.classNames_.ghost).html(options.ghostentry || 'no entries');

	    /**
	     * @type {number}
	     * @private
	     */
	    _this.slideDuration_ = options.slideDuration || 400;

	    /**
	     * @type {Entry[]}
	     * @private
	     */
	    _this.entriesArray_ = [];

	    /**
	     * @type {number}
	     * @private
	     */
	    _this.selectedIndex_ = -1;

	    // key handling

	    _this.setUpKeyboardHandling_();

	    _this.$element_.on('focus', function () {
	      if (_this.selectedIndex_ > -1) {
	        _this.entriesArray_[_this.selectedIndex_].$element.focus();
	      }
	    });

	    _this.$element_.get(0).addEventListener('mousemove', function (e) {
	      e.stopPropagation();
	    }, false);

	    _this.slideUp(true);
	    return _this;
	  }

	  /**
	   * returns the value of the selected list element
	   * @returns {*}
	   */


	  Dropdown.prototype.getValue = function getValue() {
	    if (this.selectedIndex_ >= 0) {
	      return this.entriesArray_[this.selectedIndex_].value;
	    }
	  };

	  /**
	   * @private
	   */


	  Dropdown.prototype.setUpKeyboardHandling_ = function setUpKeyboardHandling_() {
	    var _this2 = this;

	    this.$element_.on('keydown', function (e) {
	      switch (e.which) {
	        case _globals.keyCodes.ARROW_DOWN:
	          e.preventDefault();
	          e.stopPropagation();
	          if (_this2.selectedIndex_ < _this2.entriesArray_.length - 1) {
	            _this2.entriesArray_[_this2.selectedIndex_ + 1].$element.addClass(_this2.classNames_.selected);
	            _this2.entriesArray_[_this2.selectedIndex_ + 1].$element.focus();
	            _this2.entriesArray_[_this2.selectedIndex_].$element.removeClass(_this2.classNames_.selected);
	            _this2.selectedIndex_ += 1;
	          }
	          break;
	        case _globals.keyCodes.ARROW_UP:
	          e.preventDefault();
	          e.stopPropagation();
	          if (_this2.selectedIndex_ > 0) {
	            _this2.entriesArray_[_this2.selectedIndex_ - 1].$element.addClass(_this2.classNames_.selected);
	            _this2.entriesArray_[_this2.selectedIndex_ - 1].$element.focus();
	            _this2.entriesArray_[_this2.selectedIndex_].$element.removeClass(_this2.classNames_.selected);
	            _this2.selectedIndex_ -= 1;
	          } else {
	            _this2.entriesArray_[_this2.selectedIndex_].$element.removeClass(_this2.classNames_.selected);
	            _this2.selectedIndex_ = -1;
	            _this2.dispatchEvent({
	              type: 'leave:backwards',
	              originalEvent: e
	            });
	          }
	          break;
	        case _globals.keyCodes.TAB:
	          if (!e.shiftKey) {
	            _this2.dispatchEvent({
	              type: 'leave:forwards',
	              originalEvent: e
	            });
	          } else {
	            _this2.dispatchEvent({
	              type: 'leave:backwards',
	              originalEvent: e
	            });
	          }
	          break;
	        case _globals.keyCodes.ENTER:
	          e.stopPropagation();
	          e.preventDefault();
	          _this2.select$Entry_(_this2.entriesArray_[_this2.selectedIndex_].$element);
	      }
	    });
	  };

	  /**
	   * return the whole element
	   * @returns {jQuery}
	   */


	  Dropdown.prototype.get$Element = function get$Element() {
	    return this.$element_;
	  };

	  /**
	   * Returns the amount of dropdown entries
	   * @returns {Number}
	   */


	  Dropdown.prototype.getLength = function getLength() {
	    return this.entriesArray_.length;
	  };

	  /**
	   * Adds an entry to the end of the dropdown list
	   * @param {*} value
	   * @param {string} [text=value]
	   * @param {boolean} [optSelected=false]
	   */


	  Dropdown.prototype.addEntry = function addEntry(value, text) {
	    var optSelected = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	    text = text || value;

	    var index = this.getLength();
	    this.setLength(index + 1);

	    var entry = this.entriesArray_[index];
	    entry.$element.html(text);
	    entry.value = value;

	    if (optSelected) {
	      entry.$element.addClass(this.classNames_.selected);
	      this.selectedIndex_ = index;
	    }
	  };

	  /**
	   * This function takes an array of entries (strings).
	   * The length of the dropdown is set to the length of the arrays (they have to have the same length).
	   * @param {any[]} values
	   * @param {string[]} [texts=values]
	   */


	  Dropdown.prototype.setEntries = function setEntries(values, texts) {
	    texts = texts || values;
	    this.setLength(values.length);

	    for (var i = 0, ii = values.length; i < ii; i++) {
	      this.entriesArray_[i].$element.html(texts[i]);
	      this.entriesArray_[i].value = values[i];
	    }
	  };

	  Dropdown.prototype.select$Entry_ = function select$Entry_($entry) {
	    if (!$entry.hasClass(this.classNames_.selected)) {
	      $entry.addClass(this.classNames_.selected);
	      if (this.selectedIndex_ > -1) {
	        this.entriesArray_[this.selectedIndex_].$element.removeClass(this.classNames_.selected);
	      }
	    }
	    this.selectedIndex_ = this.entriesArray_.findIndex(function (el) {
	      return el.$element === $entry;
	    });
	    this.dispatchEvent('select');
	  };

	  /**
	   * This function corrects the number of entries in the dropdown. The content of the entries is not respected.
	   * New entries are slided down, to be removed entries are slided up then removed.
	   * @param {number} length
	   */


	  Dropdown.prototype.setLength = function setLength(length) {
	    var _this3 = this;

	    if (this.selectedIndex_ > -1) {
	      this.entriesArray_[this.selectedIndex_].$element.removeClass(this.classNames_.selected);
	      this.selectedIndex_ = -1;
	    }

	    var i = void 0,
	        ii = void 0;

	    if (this.entriesArray_.length === 0) {
	      // removing ghost entry
	      this.$element_.empty();
	    }

	    if (length > this.entriesArray_.length) {
	      var _loop = function _loop() {
	        var $entry = (0, _jquery2.default)('<button tabindex="-1">').addClass(_this3.classNames_.entry).hide();

	        $entry.on('click', function () {
	          return _this3.select$Entry_($entry);
	        });
	        $entry.focus();

	        _this3.$element_.append($entry);

	        _this3.entriesArray_.push({
	          $element: $entry
	        });

	        $entry.slideDown({ duration: _this3.slideDuration_ });
	      };

	      // adding entries and dropdown handlers
	      for (i = this.entriesArray_.length, ii = length; i < ii; i++) {
	        _loop();
	      }
	    } else if (length < this.entriesArray_.length) {
	      // removing entries
	      for (i = this.entriesArray_.length - 1, ii = length; i >= ii; i--) {
	        this.entriesArray_[i].$element.slideUp({
	          duration: this.slideDuration_,
	          complete: function complete() {
	            _this3.entriesArray_.pop();
	            _this3.$element_.children().last().remove();
	          }
	        });
	      }
	      if (this.selectedIndex_ >= length) {
	        // correcting selected element
	        this.selectedIndex_ = length - 1;
	      }
	    }
	  };

	  Dropdown.prototype.showGhostEntry = function showGhostEntry() {
	    this.setLength(0);
	    this.$element_.append(this.$ghostentry);
	    this.slideDown();
	  };

	  Dropdown.prototype.focus = function focus() {
	    if (this.entriesArray_.length >= 0) {
	      if (this.selectedIndex_ < 0) {
	        this.selectedIndex_ = 0;
	        this.entriesArray_[0].$element.addClass(this.classNames_.selected);
	      }
	      this.entriesArray_[this.selectedIndex_].$element.focus();
	    }
	  };

	  /**
	   * @param {boolean} [immediately=false] if setted to true the animation is skipped
	   * @returns {Promise}
	   */


	  Dropdown.prototype.slideUp = function slideUp() {
	    var _this4 = this;

	    var immediately = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	    return new _promise2.default(function (resolve) {
	      var duration = 0;
	      if (!immediately) {
	        duration = _this4.slideDuration_;
	      }
	      _this4.$element_.slideUp({
	        duration: duration,
	        complete: function complete() {
	          _this4.$element_.addClass(_globals.cssClasses.hidden);
	          resolve();
	        },
	        easing: 'easeInCirc'
	      });
	    });
	  };

	  /**
	   * @param {boolean} [immediately=false] if setted to true the animation is skipped
	   * @returns {Promise}
	   */


	  Dropdown.prototype.slideDown = function slideDown() {
	    var _this5 = this;

	    var immediately = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	    return new _promise2.default(function (resolve) {
	      if (_this5.$element_.children().length > 0) {
	        var duration = 0;
	        if (!immediately) {
	          duration = _this5.slideDuration_;
	        }
	        _this5.$element_.removeClass(_globals.cssClasses.hidden);
	        _this5.$element_.slideDown({
	          easing: 'easeOutCirc',
	          complete: resolve,
	          duration: duration
	        });
	      }
	    });
	  };

	  /**
	   * Removes all entries
	   */


	  Dropdown.prototype.clear = function clear() {
	    this.slideUp();
	    this.$element_.empty();
	    this.entriesArray_ = [];
	    this.selectedIndex_ = -1;
	  };

	  /**
	   * Returns true if the dropdown has selectable elements
	   * @returns {boolean}
	   */


	  Dropdown.prototype.isSelectable = function isSelectable() {
	    return this.entriesArray_.length > 0;
	  };

	  return Dropdown;
	}(_openlayers2.default.Object);

/***/ },
/* 269 */
200,
/* 270 */,
/* 271 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.MobileControls = undefined;

	var _getIterator2 = __webpack_require__(105);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(120);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(121);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _jquery = __webpack_require__(78);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _ShiftableComposedControl = __webpack_require__(272);

	var _WindowDecorator = __webpack_require__(273);

	__webpack_require__(276);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * This class represents the mobile menu containing all the controls.
	 */
	var MobileControls = exports.MobileControls = function (_ShiftableComposedCon) {
	  (0, _inherits3.default)(MobileControls, _ShiftableComposedCon);

	  /**
	   * @param {ShiftableComposedControlOptions} options
	   */
	  function MobileControls() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    (0, _classCallCheck3.default)(this, MobileControls);

	    options.className = options.className || 'g4u-mobilecontrols';
	    options.element = (0, _jquery2.default)('<div>').get(0);
	    options.containerClassName = options.className + '-container';
	    options.visibleControls = options.visibleControls || 6;

	    return (0, _possibleConstructorReturn3.default)(this, _ShiftableComposedCon.call(this, options));
	  }

	  /**
	   * @param {Control} control
	   * @param {g4uControlOptions} options
	   */


	  MobileControls.prototype.addControl = function addControl(control, options) {
	    if (control.isWindowed() || control.isSingleButton()) {
	      _ShiftableComposedCon.prototype.addControl.call(this, control, options);
	    } else {
	      _ShiftableComposedCon.prototype.addControl.call(this, new _WindowDecorator.WindowDecorator({
	        component: control
	      }), options);
	    }
	  };

	  /**
	   * @param {G4UMap} map
	   */


	  MobileControls.prototype.setMap = function setMap(map) {
	    var _this2 = this;

	    if (this.getMap()) {
	      this.getMap().un('change:mobile', this.handler_);
	    }

	    _ShiftableComposedCon.prototype.setMap.call(this, map);

	    if (map) {
	      this.handler_ = function () {
	        if (!map.get('mobile')) {
	          var _iteratorNormalCompletion = true;
	          var _didIteratorError = false;
	          var _iteratorError = undefined;

	          try {
	            for (var _iterator = (0, _getIterator3.default)(_this2.getControls().filter(function (c) {
	              return c.setWindowVisible;
	            })), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	              var control = _step.value;

	              control.setWindowVisible(false);
	            }
	          } catch (err) {
	            _didIteratorError = true;
	            _iteratorError = err;
	          } finally {
	            try {
	              if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	              }
	            } finally {
	              if (_didIteratorError) {
	                throw _iteratorError;
	              }
	            }
	          }
	        }
	      };
	      map.on('change:mobile', this.handler_);
	    }
	  };

	  return MobileControls;
	}(_ShiftableComposedControl.ShiftableComposedControl);

/***/ },
/* 272 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ShiftableComposedControl = undefined;

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(120);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(121);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _jquery = __webpack_require__(78);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _ComposedControl2 = __webpack_require__(222);

	var _globals = __webpack_require__(183);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @typedef {ComposedControlOptions} ShiftableComposedControlOptions
	 * @property {number} visibleControls specifies amount visible controls
	 */

	/**
	 * This class displays only a given amount of the containing controls and arrows to switch through these
	 */
	var ShiftableComposedControl = exports.ShiftableComposedControl = function (_ComposedControl) {
	  (0, _inherits3.default)(ShiftableComposedControl, _ComposedControl);

	  /**
	   * @param {ShiftableComposedControlOptions} options
	   */
	  function ShiftableComposedControl() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    (0, _classCallCheck3.default)(this, ShiftableComposedControl);

	    /**
	     * @type {number}
	     * @private
	     */
	    var _this = (0, _possibleConstructorReturn3.default)(this, _ComposedControl.call(this, options));

	    _this.visibleControls_ = options.visibleControls;

	    /**
	     * @type {number}
	     * @private
	     */
	    _this.position_ = 1;

	    var $shiftContainer = (0, _jquery2.default)('<div>').addClass(_this.className_ + '-shift');
	    _this.get$Element().append($shiftContainer.append(_this.get$Container()));

	    /**
	     * @type {jQuery}
	     * @private
	     */
	    _this.$moveLeftButton_ = (0, _jquery2.default)('<button>').addClass(_this.className_ + '-move-left').addClass(_this.classNameItem_).addClass(_this.classNameItemFirst_).addClass(_globals.cssClasses.hidden);
	    _this.$moveLeftButton_.on('click', function () {
	      return _this.shiftControls(-(_this.visibleControls_ - 2));
	    });

	    $shiftContainer.prepend(_this.$moveLeftButton_);
	    _this.$moveLeftButton_.addClass(_globals.cssClasses.hidden);

	    /**
	     * @type {jQuery}
	     * @private
	     */
	    _this.$moveRightButton_ = (0, _jquery2.default)('<button>').addClass(_this.className_ + '-move-right').addClass(_this.classNameItem_).addClass(_this.classNameItemLast_);
	    _this.$moveRightButton_.on('click', function () {
	      return _this.shiftControls(_this.visibleControls_ - 2);
	    });

	    $shiftContainer.append(_this.$moveRightButton_);
	    _this.$moveRightButton_.addClass(_globals.cssClasses.hidden);
	    return _this;
	  }

	  /**
	   * @param {Control} control
	   * @param {g4uControlOptions} options
	   */


	  ShiftableComposedControl.prototype.addControl = function addControl(control, options) {
	    _ComposedControl.prototype.addControl.call(this, control, options);

	    if (this.controls_.length > this.visibleControls_) {
	      var $lastInsertedControl = this.get$Container().children(':last-child');
	      $lastInsertedControl.addClass(_globals.cssClasses.hidden);
	      (0, _jquery2.default)(this.get$Container().children()[this.visibleControls_ - 1]).addClass(_globals.cssClasses.hidden);
	      this.$moveRightButton_.removeClass(_globals.cssClasses.hidden);
	    }
	  };

	  /**
	   * Shift the controls the given amount of steps to the left. if the value is negative, the controls are shifted to
	   * the right
	   * @param shift
	   */


	  ShiftableComposedControl.prototype.shiftControls = function shiftControls(shift) {
	    if (shift < 0) {
	      if (this.position_ > 1) {
	        // shift 'left'

	        // show move right button
	        if (this.$moveRightButton_.hasClass(_globals.cssClasses.hidden)) {
	          this.get$Container().children(':last-child').addClass(_globals.cssClasses.hidden);
	          this.$moveRightButton_.removeClass(_globals.cssClasses.hidden);
	        }

	        // shift visible controls
	        this.position_--;
	        (0, _jquery2.default)(this.get$Container().children()[this.position_]).removeClass(_globals.cssClasses.hidden);
	        (0, _jquery2.default)(this.get$Container().children()[this.position_ + this.visibleControls_ - 2]).addClass(_globals.cssClasses.hidden);

	        // show first button instead of move left
	        if (this.position_ === 1) {
	          this.get$Container().children(':first-child').removeClass(_globals.cssClasses.hidden);
	          this.$moveLeftButton_.addClass(_globals.cssClasses.hidden);
	        }

	        // recurse
	        this.shiftControls(shift + 1);
	      }
	    } else if (shift > 0) {
	      if (this.position_ + this.visibleControls_ < this.controls_.length + 1) {
	        // shift 'right'

	        // show move left button
	        if (this.$moveLeftButton_.hasClass(_globals.cssClasses.hidden)) {
	          this.get$Container().children(':first-child').addClass(_globals.cssClasses.hidden);
	          this.$moveLeftButton_.removeClass(_globals.cssClasses.hidden);
	        }

	        // shift visible controls
	        this.position_++;
	        (0, _jquery2.default)(this.get$Container().children()[this.position_ - 1]).addClass(_globals.cssClasses.hidden);
	        (0, _jquery2.default)(this.get$Container().children()[this.position_ + this.visibleControls_ - 3]).removeClass(_globals.cssClasses.hidden);

	        // show last button instead of move right
	        if (this.position_ + this.visibleControls_ >= this.controls_.length) {
	          this.get$Container().children(':last-child').removeClass(_globals.cssClasses.hidden);
	          this.$moveRightButton_.addClass(_globals.cssClasses.hidden);
	        }

	        // recurse
	        this.shiftControls(shift - 1);
	      }
	    }
	  };

	  return ShiftableComposedControl;
	}(_ComposedControl2.ComposedControl);

/***/ },
/* 273 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.WindowDecorator = undefined;

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(120);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(121);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _jquery = __webpack_require__(78);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _Control2 = __webpack_require__(215);

	var _Window = __webpack_require__(197);

	var _html = __webpack_require__(198);

	var _globals = __webpack_require__(183);

	__webpack_require__(274);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @typedef {g4uControlOptions} WindowDecoratorOptions
	 * @property {Control} component
	 */

	/**
	 * This class provides an easy wrap around an control to provide a button to open the control inside of a window.
	 * If the child control has a setActive method it is called upon opening and closing the window.
	 */
	var WindowDecorator = exports.WindowDecorator = function (_Control) {
	  (0, _inherits3.default)(WindowDecorator, _Control);

	  /**
	   * @param {WindowDecoratorOptions} options
	   */
	  function WindowDecorator() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    (0, _classCallCheck3.default)(this, WindowDecorator);

	    options.element = (0, _jquery2.default)('<div>').addClass('g4u-window-decorator').get(0);
	    options.singleButton = false;
	    options.className = options.component.getClassName();
	    options.windowed = true;

	    /**
	     * @type {jQuery}
	     * @private
	     */
	    var _this = (0, _possibleConstructorReturn3.default)(this, _Control.call(this, options));

	    _this.$button_ = (0, _jquery2.default)('<button>').addClass(_globals.cssClasses.mainButton);

	    _this.get$Element().append(_this.$button_);

	    /**
	     * @type {Control}
	     * @private
	     */
	    _this.component_ = options.component;
	    _this.component_.get$Element().addClass('g4u-window-component');

	    _this.$button_.addClass(_globals.cssClasses.hasTooltip).html(_this.component_.getTitle());
	    (0, _html.addTooltip)(_this.$button_, _this.component_.getTipLabel());

	    _this.component_.on('change', function () {
	      _this.window_.updateSize();
	      _this.window_.getInFront();
	    });
	    return _this;
	  }

	  /**
	   * @returns {Control}
	   */


	  WindowDecorator.prototype.getComponent = function getComponent() {
	    return this.component_;
	  };

	  /**
	   * @param {G4UMap} map
	   */


	  WindowDecorator.prototype.setMap = function setMap(map) {
	    var _this2 = this;

	    _Control.prototype.setMap.call(this, map);

	    if (this.getMap()) {
	      this.getMap().removeControl(this.component_);
	    }

	    if (map) {
	      map.addControl(this.component_);

	      /**
	       * @type {Window}
	       * @private
	       */
	      this.window_ = new _Window.Window({ map: map });

	      this.window_.get$Body().append(this.component_.get$Element());

	      if (this.component_.setActive) {
	        this.$button_.on('click touch', function () {
	          _this2.component_.setActive(!_this2.component_.getActive());
	        });

	        this.component_.on('change:active', function () {
	          var active = _this2.component_.getActive();
	          _this2.setWindowVisible(active);
	          _this2.$button_.toggleClass(_globals.cssClasses.active, active);
	        });

	        this.window_.on('change:visible', function (e) {
	          if (!_this2.window_.getVisible()) {
	            _this2.component_.setActive(false);
	          }
	          _this2.dispatchEvent(e);
	        });
	      } else {
	        this.$button_.on('click touch', function () {
	          _this2.setWindowVisible(!_this2.window_.getVisible());
	        });

	        this.window_.on('change:visible', function (e) {
	          _this2.dispatchEvent(e);
	        });
	      }
	      this.get$Element().append(this.window_.get$Element());
	    }
	  };

	  WindowDecorator.prototype.setActive = function setActive(active) {
	    if (this.component_.setActive) {
	      this.component_.setActive(active);
	    } else {
	      this.window_.setVisible(active);
	    }
	  };

	  /**
	   * @param {boolean} visible
	   */


	  WindowDecorator.prototype.setWindowVisible = function setWindowVisible(visible) {
	    this.window_.setVisible(visible);
	  };

	  /**
	   * @returns {boolean}
	   */


	  WindowDecorator.prototype.getWindowVisible = function getWindowVisible() {
	    return this.window_.getVisible();
	  };

	  return WindowDecorator;
	}(_Control2.Control);

/***/ },
/* 274 */
200,
/* 275 */,
/* 276 */
200,
/* 277 */,
/* 278 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.InfoButton = undefined;

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(120);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(121);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _jquery = __webpack_require__(78);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _utilities = __webpack_require__(138);

	var _Attribution = __webpack_require__(214);

	var _Control2 = __webpack_require__(215);

	__webpack_require__(279);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @typedef {g4uControlOptions} InfoButtonOptions
	 * @property {string} contentURL url providing content to be shown
	 * @property {boolean} [useProxy]
	 * @property {string} [proxy]
	 * @property {boolean} [attribution=true]
	 */

	/**
	 * This control opens a window with showing some specified info text
	 */
	var InfoButton = exports.InfoButton = function (_Control) {
	  (0, _inherits3.default)(InfoButton, _Control);

	  /**
	   * @param {InfoButtonOptions} options
	   */
	  function InfoButton() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    (0, _classCallCheck3.default)(this, InfoButton);

	    options.className = options.className || 'g4u-infobutton';
	    options.element = (0, _jquery2.default)('<div>')[0];

	    /**
	     * @type {string}
	     * @private
	     */
	    var _this = (0, _possibleConstructorReturn3.default)(this, _Control.call(this, options));

	    _this.classNameAttributions_ = _this.className_ + '-attributions';

	    /**
	     * @type {string}
	     * @private
	     */
	    _this.classNameContent_ = _this.className_ + '-content';

	    _this.setTitle(_this.getLocaliser().localiseUsingDictionary('InfoPage title'));
	    _this.setTipLabel(_this.getLocaliser().localiseUsingDictionary('InfoPage tipLabel'));

	    /**
	     * @type {jQuery}
	     * @private
	     */
	    _this.$content_ = (0, _jquery2.default)('<div>').addClass(_this.classNameContent_);

	    _this.get$Element().append(_this.$content_);

	    /**
	     * @type {boolean}
	     * @private
	     */
	    _this.attribution_ = options.attribution !== false;

	    /**
	     * @type {string}
	     * @private
	     */
	    _this.contentURL_ = options.contentURL;

	    /**
	     * @type {boolean}
	     * @private
	     */
	    _this.useProxy_ = _this.useProxy_ = options.useProxy || !options.hasOwnProperty('useProxy') && options.proxy;

	    /**
	     * @type {string|undefined}
	     * @private
	     */
	    _this.proxy_ = options.proxy;

	    if (_this.attribution_) {
	      /**
	       * @type {jQuery}
	       * @private
	       */
	      _this.$attributions_ = (0, _jquery2.default)('<div>');

	      _this.get$Element().append((0, _jquery2.default)('<h2>').html(_this.getLocaliser().localiseUsingDictionary('InfoPage copyrightTitle'))).append(_this.$attributions_);

	      /**
	       * @type {Attribution}
	       * @private
	       */
	      _this.attributionControl_ = new _Attribution.Attribution({
	        target: _this.get$Element()[0],
	        localiser: _this.getLocaliser(),
	        collapsible: false,
	        className: _this.classNameAttributions_
	      });
	    }

	    /**
	     * @type {boolean}
	     * @private
	     */
	    _this.loaded_ = false;

	    /**
	     * @type {boolean}
	     * @private
	     */
	    _this.active_ = false;
	    return _this;
	  }

	  /**
	   * @param {G4UMap} map
	   */


	  InfoButton.prototype.setMap = function setMap(map) {
	    var oldMap = this.getMap();

	    if (oldMap && this.attribution_) {
	      oldMap.removeControl(this.attributionControl_);
	    }

	    if (map && this.attribution_) {
	      map.addControl(this.attributionControl_);
	    }

	    _Control.prototype.setMap.call(this, map);
	  };

	  /**
	   * @param {boolean} active
	   */


	  InfoButton.prototype.setActive = function setActive(active) {
	    var _this2 = this;

	    var oldValue = this.active_;
	    if (oldValue !== active) {
	      (function () {
	        _this2.active_ = active;
	        var changeEvent = {
	          type: 'change:active',
	          oldValue: oldValue
	        };
	        if (!_this2.loaded_) {
	          if (_this2.contentURL_) {
	            var url = _this2.getLocaliser().selectL10N(_this2.contentURL_);
	            if (_this2.useProxy_) {
	              url = (0, _utilities.addProxy)(url, _this2.proxy_ || _this2.getMap().get('proxy'));
	            }
	            _jquery2.default.get(url, function (data) {
	              _this2.$content_.html(data);
	              _this2.dispatchEvent(changeEvent);
	            });
	          } else {
	            _this2.dispatchEvent(changeEvent);
	          }
	        } else {
	          _this2.dispatchEvent(changeEvent);
	        }
	      })();
	    }
	  };

	  /**
	   * @returns {boolean}
	   */


	  InfoButton.prototype.getActive = function getActive() {
	    return this.active_;
	  };

	  return InfoButton;
	}(_Control2.Control);

/***/ },
/* 279 */
200,
/* 280 */,
/* 281 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.LinkButton = undefined;

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(120);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(121);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _jquery = __webpack_require__(78);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _Control2 = __webpack_require__(215);

	var _html = __webpack_require__(198);

	var _globals = __webpack_require__(183);

	__webpack_require__(282);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @typedef {g4uControlOptions} LinkButtonOptions
	 * @property {string} [url]
	 * @property {string} [linkTarget] set the link target (e.g. '_blank')
	 */

	/**
	 * provides a button which links to another page
	 */
	var LinkButton = exports.LinkButton = function (_Control) {
	  (0, _inherits3.default)(LinkButton, _Control);

	  /**
	   * @param {LinkButtonOptions} options
	   */
	  function LinkButton() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    (0, _classCallCheck3.default)(this, LinkButton);

	    options.className = options.className || 'g4u-link-button';
	    options.singleButton = true;
	    options.element = (0, _jquery2.default)('<a></a>').get(0);

	    /**
	     * @type {string}
	     * @private
	     */
	    var _this = (0, _possibleConstructorReturn3.default)(this, _Control.call(this, options));

	    _this.url_ = options.hasOwnProperty('url') ? options.url : '';

	    _this.setTitle(_this.getTitle() || _this.getLocaliser().localiseUsingDictionary('LinkButton title'));
	    _this.setTipLabel(_this.getTipLabel() || _this.getLocaliser().localiseUsingDictionary('LinkButton tipLabel'));

	    _this.get$Element().attr('href', _this.url_).addClass(_this.className_);
	    if (options.hasOwnProperty('target')) {
	      _this.get$Element().attr('target', options.target);
	    }
	    var $button = (0, _jquery2.default)('<button>').addClass(_globals.cssClasses.mainButton).html(_this.getTitle());

	    (0, _html.addTooltip)($button, _this.getTipLabel());

	    _this.get$Element().append($button);

	    if (options.hasOwnProperty('linkTarget')) {
	      _this.get$Element().attr('target', options.linkTarget);
	    }
	    return _this;
	  }

	  return LinkButton;
	}(_Control2.Control);

/***/ },
/* 282 */
200,
/* 283 */,
/* 284 */,
/* 285 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.PrintButton = undefined;

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(120);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(121);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _jquery = __webpack_require__(78);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _Control2 = __webpack_require__(215);

	var _html = __webpack_require__(198);

	var _globals = __webpack_require__(183);

	__webpack_require__(286);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PrintButton = exports.PrintButton = function (_Control) {
	  (0, _inherits3.default)(PrintButton, _Control);

	  /**
	   * @param {g4uControlOptions} options
	   */
	  function PrintButton() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    (0, _classCallCheck3.default)(this, PrintButton);

	    options.className = options.className || 'g4u-printbutton';
	    options.element = (0, _jquery2.default)('<button>').get(0);

	    var _this = (0, _possibleConstructorReturn3.default)(this, _Control.call(this, options));

	    _this.get$Element().addClass(_this.className_).addClass(_globals.cssClasses.mainButton).html(_this.getLocaliser().localiseUsingDictionary('PrintButton title'));

	    (0, _html.addTooltip)(_this.get$Element(), _this.getLocaliser().localiseUsingDictionary('PrintButton tipLabel'));

	    _this.get$Element().on('click', function () {
	      return _this.onClick_();
	    });
	    return _this;
	  }

	  /**
	   * @private
	   */


	  PrintButton.prototype.onClick_ = function onClick_() {
	    var _this2 = this;

	    var setDivSize = function setDivSize(div, mapSize) {
	      (0, _jquery2.default)(div).innerWidth(mapSize[0]);
	      (0, _jquery2.default)(div).innerHeight(mapSize[1]);
	    };

	    //
	    // Variant A: Create a new window and copy the canvas over there. This raises security issues in IE.
	    //
	    // Variant B: Apply a special css class to the body that hides everything except the map for @media print
	    //    DOES NOT WORK
	    //      -> doesn't work because hiding everything will hide the parents of the map, too
	    //
	    // Variant C: Create a new body and switching it with the old body for printing
	    //      -> This heavily manipulates the existing DOM-Structure and it
	    //        relies on the ol-viewport div being the only child of its parent.
	    //        works in IE!
	    //
	    // Variant D: Convert everything to a pdf
	    //    IMPLEMENTED IN MODULE
	    //      -> jsPDF Print Module
	    //
	    // Variant E: Add a function to reproduce a map in its current state on another page
	    //    NOT IMPLEMENTED
	    //      -> some work, but maybe useful for other functions, too
	    //

	    var isMapCanvasTainted = function isMapCanvasTainted() {
	      // Needs to be looked into
	      try {
	        var viewport = this.getMap().getViewport();
	        var srcCanvas = viewport.getElementsByTagName('canvas')[0];
	        srcCanvas.getContext('2d').getImageData(1, 1, 1, 1);
	        return false;
	      } catch (e) {
	        return true;
	      }
	    };

	    //
	    // We check if we can use variant a, if we cant, we use variant c
	    //

	    if (!isMapCanvasTainted()) {
	      (function () {
	        //
	        // Variant A: Creating a new window and copying the canvas over there. This raises security issues in IE.
	        //

	        // new window
	        var newWindow = window.open('', '_blank');

	        var jStyleDiv = (0, _jquery2.default)('<div>').append((0, _jquery2.default)('style').clone()).append((0, _jquery2.default)('link[type="text/css"]').clone());

	        // copying the map
	        var viewport = _this2.getMap().getViewport();
	        var mapClone = viewport.parentNode.cloneNode(true);
	        setDivSize(mapClone, _this2.getMap().getSize());
	        var srcCanvas = viewport.getElementsByTagName('canvas')[0];
	        var destCanvas = mapClone.getElementsByTagName('canvas')[0];
	        var destContext = destCanvas.getContext('2d');
	        destContext.drawImage(srcCanvas, 0, 0);
	        var newdoc = newWindow.document;

	        // writing the document
	        newdoc.open();
	        newdoc.write('<!doctype html>');
	        newdoc.write('<html>');
	        newdoc.write('<head>');
	        newdoc.write('<title>');
	        newdoc.write(_this2.getLocaliser().localiseUsingDictionary('PrintButton windowTitle'));
	        newdoc.write('</title>');
	        newdoc.write(jStyleDiv.html());
	        newdoc.write('<script type="text/javascript">');
	        newdoc.write('window.onload = function () {\n');
	        newdoc.write('\twindow.focus();\n');
	        newdoc.write('\tsetTimeout( function () {\n'); // we need to wait till the map is appended
	        newdoc.write('\t\twindow.print();\n');
	        newdoc.write('\t\twindow.close();\n');
	        newdoc.write('\t}, 50);\n');
	        newdoc.write('};');
	        newdoc.write('</script>');
	        newdoc.write('</head>');
	        newdoc.write('</html>');
	        newdoc.close();

	        newWindow.onload = function () {
	          newdoc.getElementsByTagName('body')[0].appendChild(mapClone);
	        };

	        newWindow.focus();
	      })();
	    } else {
	      //
	      // Variant C: Creating a new body and switching it with the old body for printing
	      //

	      var $mapViewport = (0, _jquery2.default)(this.getMap().getViewport());
	      var $mapParent = $mapViewport.parent();
	      var $mapContainer = $mapParent.clone().empty().append($mapViewport);
	      setDivSize($mapContainer, this.getMap().getSize());
	      var $oldbody = (0, _jquery2.default)('body');
	      var $newbody = (0, _jquery2.default)('<body>').append($mapContainer);
	      document.body = $newbody.get(0);
	      window.print();
	      document.body = $oldbody.get(0);
	      $mapParent.append($mapViewport);
	    }

	    this.dispatchEvent('click');
	  };

	  return PrintButton;
	}(_Control2.Control);

/***/ },
/* 286 */
200,
/* 287 */,
/* 288 */,
/* 289 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Logo = undefined;

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(120);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(121);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _jquery = __webpack_require__(78);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _Control2 = __webpack_require__(215);

	__webpack_require__(290);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @typedef {g4uControlOptions} LogoOptions
	 * @property {string} [src='images/g4u-logo.png'] path to the image
	 * @property {number} [width]
	 * @property {number} [height]
	 * @property {number} [opacity]
	 * @property {string} [mode='both'] possible values: print, screen, both
	 */

	/**
	 * This is a class which provides a logo on the map.
	 */
	var Logo = exports.Logo = function (_Control) {
	  (0, _inherits3.default)(Logo, _Control);

	  /**
	   * @param {LogoOptions} options
	   */
	  function Logo() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    (0, _classCallCheck3.default)(this, Logo);

	    options.className = options.className || 'g4u-logo';
	    options.element = (0, _jquery2.default)('<img>').get(0);
	    options.singleButton = false;

	    /**
	     * @type {string}
	     * @private
	     */
	    var _this = (0, _possibleConstructorReturn3.default)(this, _Control.call(this, options));

	    _this.logo_ = options.hasOwnProperty('src') ? options.src : 'images/g4u-logo.png';

	    _this.get$Element().on('load', function () {
	      return _this.changed;
	    }).prop('src', _this.logo_).addClass(_this.className_);

	    if (options.mode === 'both' || options.mode === 'screen') {
	      _this.get$Element().addClass(_this.className_ + '-screen');
	    }

	    if (options.mode === 'both' || options.mode === 'print') {
	      _this.get$Element().addClass(_this.className_ + '-print');
	    }

	    if (options.width) {
	      _this.get$Element().width(options.width);
	    }

	    if (options.height) {
	      _this.get$Element().height(options.height);
	    }

	    if (options.opacity) {
	      _this.get$Element().css('opacity', options.opacity.toString());
	    }
	    return _this;
	  }

	  return Logo;
	}(_Control2.Control);

/***/ },
/* 290 */
200,
/* 291 */,
/* 292 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.HelpButton = undefined;

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(120);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(121);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _jquery = __webpack_require__(78);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _Control2 = __webpack_require__(215);

	var _utilities = __webpack_require__(138);

	var _stripJsonComments = __webpack_require__(129);

	var _stripJsonComments2 = _interopRequireDefault(_stripJsonComments);

	var _Debug = __webpack_require__(151);

	__webpack_require__(293);

	var _utilitiesObject = __webpack_require__(137);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @typedef {g4uControlOptions} HelpButtonOptions
	 * @property {object} [configControls={}]
	 * @property {string} fileName of the json with the helptexts
	 */

	/**
	 * Shows a help button. Loads an json file with the helptexts and images from the server.
	 */
	var HelpButton = exports.HelpButton = function (_Control) {
	  (0, _inherits3.default)(HelpButton, _Control);

	  /**
	   * @param {HelpButtonOptions} options
	   */
	  function HelpButton(options) {
	    (0, _classCallCheck3.default)(this, HelpButton);

	    options.element = (0, _jquery2.default)('<div>')[0];
	    options.className = options.className || 'g4u-helpbutton';

	    var _this = (0, _possibleConstructorReturn3.default)(this, _Control.call(this, options));

	    _this.setTitle(_this.getTitle() || _this.getLocaliser().localiseUsingDictionary('HelpButton title'));
	    _this.setTipLabel(_this.getTipLabel() || options.localiser.localiseUsingDictionary('HelpButton tipLabel'));

	    /**
	     * @type {object}
	     * @private
	     */
	    _this.configControls_ = options.configControls || {};

	    /**
	     * @type {boolean}
	     * @private
	     */
	    _this.active_ = false;

	    /**
	     * @type {string}
	     * @private
	     */
	    _this.documentationFileName_ = options.fileName;
	    return _this;
	  }

	  HelpButton.prototype.createContent_ = function createContent_() {
	    var _this2 = this;

	    var languageSettings = this.getMap().get('localiser');

	    var documentationObject = JSON.parse((0, _stripJsonComments2.default)(this.contentData_));

	    if ((0, _utilities.checkFor)(documentationObject, languageSettings.getCurrentLang())) {
	      this.language = languageSettings.getCurrentLang();
	    } else if ((0, _utilities.checkFor)(documentationObject, languageSettings.getDefaultLang())) {
	      this.language = languageSettings.getDefaultLang();
	    } else {
	      this.language = 'de';
	    }

	    var makeDocumentationTable = function makeDocumentationTable(documentation, language) {
	      var $table = (0, _jquery2.default)('<table>').addClass(_this2.className_ + '-table');
	      var documentationLocalized = documentationObject[language];
	      var id = void 0;
	      var imgData = void 0;
	      var descrData = void 0;
	      var joinWith = void 0;
	      var imgElements = void 0;
	      var $row = void 0;
	      var $td = void 0;
	      var visibleControls = [];

	      function recursivelyFindVisibleControls(controls, arr) {
	        for (var i = 0, ii = arr.length; i < ii; i++) {
	          if (controls[arr[i]] && controls[arr[i]].contains) {
	            for (var j = 0, jj = controls[arr[i]].contains.length; j < jj; j++) {
	              if (visibleControls.indexOf(controls[arr[i]].contains[j]) === -1) {
	                visibleControls.push(controls[arr[i]].contains[j]);
	              }
	            }
	            recursivelyFindVisibleControls(controls, controls[arr[i]].contains);
	          }
	        }
	      }

	      if (_this2.configControls_ && _this2.configControls_.onMap) {
	        visibleControls = (0, _utilitiesObject.copyDeep)(_this2.configControls_.onMap);
	        recursivelyFindVisibleControls(_this2.configControls_, visibleControls);
	      }
	      for (id in documentationLocalized) {
	        if (documentationLocalized.hasOwnProperty(id) && documentationLocalized[id]) {
	          imgData = documentationLocalized[id].img;
	          descrData = documentationLocalized[id].descr || '';
	          joinWith = documentationLocalized[id].joinWith || '';

	          if (visibleControls.indexOf(id) > -1) {
	            $row = (0, _jquery2.default)('<tr>');

	            imgElements = '<td class="' + _this2.className_ + '-img"><div class="' + _this2.className_ + '-imgDiv">';
	            if (imgData) {
	              if (_jquery2.default.isArray(imgData)) {
	                for (var j = 0, jj = imgData.length; j < jj; j++) {
	                  imgData[j] = '<img class="' + _this2.className_ + '-docuImg" src="images/doc/' + imgData[j] + '">';
	                }
	                imgElements += imgData.join(joinWith);
	              } else {
	                imgElements += '<img class="' + _this2.className_ + '-docuImg" src="images/doc/' + imgData + '">';
	              }
	            }
	            imgElements += '</div></td>';

	            $row.append(imgElements);
	            $td = (0, _jquery2.default)('<td>').addClass(_this2.className_ + '-descr');
	            if (_jquery2.default.isArray(descrData)) {
	              $td.append(descrData.join('<p>'));
	            } else {
	              $td.append(descrData);
	            }
	            $row.append($td);
	          }
	          $table.append($row);
	        }
	      }
	      return $table;
	    };

	    this.get$Element().append(makeDocumentationTable(documentationObject, this.language));
	  };

	  /**
	   * @param {boolean} active
	   */


	  HelpButton.prototype.setActive = function setActive(active) {
	    var _this3 = this;

	    if (!this.loading_) {
	      var oldValue = this.active_;
	      if (oldValue !== active) {
	        (function () {
	          _this3.active_ = active;
	          var changeEvent = {
	            type: 'change:active',
	            oldValue: oldValue
	          };

	          if (active === true) {
	            if (!_this3.contentData_) {
	              _this3.loading_ = true;

	              _jquery2.default.ajax(_this3.documentationFileName_, { dataType: 'text' }).fail(function () {
	                var msg = "Wasn't able to load the documentation file " + _this3.documentationFileName_;
	                _Debug.Debug.error(msg);
	                throw new Error(msg);
	              }).done(function (data) {
	                _this3.contentData_ = data;
	                _this3.createContent_();

	                (0, _utilities.finishAllImages)(_this3.get$Element()).then(function () {
	                  _this3.loading_ = false;
	                  _this3.dispatchEvent(changeEvent);
	                });
	              });
	            } else {
	              _this3.dispatchEvent(changeEvent);
	            }
	          } else {
	            _this3.dispatchEvent(changeEvent);
	          }
	        })();
	      }
	    }
	  };

	  /**
	   * @returns {boolean}
	   */


	  HelpButton.prototype.getActive = function getActive() {
	    return this.active_;
	  };

	  return HelpButton;
	}(_Control2.Control);

/***/ },
/* 293 */
200,
/* 294 */,
/* 295 */,
/* 296 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ActiveGroup = undefined;

	var _getIterator2 = __webpack_require__(105);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * This class organizes controls in an active group in which only one control can bea active at a time.
	 * This specified and configured via a property 'activeGroup' in the config object of the control and
	 * a matching string for all controls which should be in this group
	 */
	var ActiveGroup = exports.ActiveGroup = function () {
	  /**
	   * @param {Control[]} controls
	   */
	  function ActiveGroup() {
	    var controls = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	    (0, _classCallCheck3.default)(this, ActiveGroup);

	    /**
	     * @type {Control[]}
	     * @private
	     */
	    this.controls_ = controls;
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	      for (var _iterator = (0, _getIterator3.default)(this.controls_), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var control = _step.value;

	        this.addControl(control);
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator.return) {
	          _iterator.return();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }
	  }

	  /**
	   * @param {Control} control
	   */


	  ActiveGroup.prototype.addControl = function addControl(control) {
	    var _this = this;

	    this.controls_.push(control);
	    control.on('change:active', function () {
	      if (control.getActive()) {
	        if (_this.activeControl_) {
	          _this.activeControl_.setActive(false);
	        }
	        _this.activeControl_ = control;
	      } else {
	        _this.activeControl_ = null;
	      }
	    });
	  };

	  return ActiveGroup;
	}();

/***/ },
/* 297 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.MousePosition = undefined;

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(120);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(121);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _openlayers = __webpack_require__(77);

	var _openlayers2 = _interopRequireDefault(_openlayers);

	var _utilities = __webpack_require__(138);

	var _RewireMixin = __webpack_require__(241);

	__webpack_require__(298);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @typedef {g4uControlOptions} MousePositionOptions
	 * @property {function} [coordinateFormat]
	 */

	/**
	 * @extends Control
	 */
	var MousePosition = exports.MousePosition = function (_mixin) {
	  (0, _inherits3.default)(MousePosition, _mixin);

	  /**
	   * @param {MousePositionOptions} [options={}]
	   */
	  function MousePosition() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    (0, _classCallCheck3.default)(this, MousePosition);

	    options.className = options.hasOwnProperty('className') ? options.className : 'g4u-mouseposition';

	    var truncateToString = function truncateToString(x, length) {
	      var lead = x.toString().match(/^[^.]*/)[0];
	      if (lead.length >= length) {
	        return lead;
	      } else {
	        return x.toFixed(length - lead.length);
	      }
	    };

	    var digits = options.digits || 8;

	    options.coordinateFormat = function (c) {
	      return truncateToString(c[0], digits) + ', ' + truncateToString(c[1], digits);
	    };

	    var dashs = '&ndash;' + '.' + '&ndash;'.repeat(digits - 1);
	    options.undefinedHTML = dashs + ', ' + dashs;

	    return (0, _possibleConstructorReturn3.default)(this, _mixin.call(this, options));
	  }

	  return MousePosition;
	}((0, _utilities.mixin)(_openlayers2.default.control.MousePosition, _RewireMixin.RewireMixin));

/***/ },
/* 298 */
200,
/* 299 */,
/* 300 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ScaleLine = undefined;

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(120);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(121);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _openlayers = __webpack_require__(77);

	var _openlayers2 = _interopRequireDefault(_openlayers);

	var _utilities = __webpack_require__(138);

	var _RewireMixin = __webpack_require__(241);

	__webpack_require__(301);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @extends Control
	 */
	var ScaleLine = exports.ScaleLine = function (_mixin) {
	  (0, _inherits3.default)(ScaleLine, _mixin);

	  /**
	   * @param {g4uControlOptions} [options={}]
	   */
	  function ScaleLine() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    (0, _classCallCheck3.default)(this, ScaleLine);

	    options.className = options.hasOwnProperty('className') ? options.className : 'g4u-scale-line';
	    return (0, _possibleConstructorReturn3.default)(this, _mixin.call(this, options));
	  }

	  return ScaleLine;
	}((0, _utilities.mixin)(_openlayers2.default.control.ScaleLine, _RewireMixin.RewireMixin));

/***/ },
/* 301 */
200,
/* 302 */,
/* 303 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.OverviewMap = undefined;

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(120);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(121);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _openlayers = __webpack_require__(77);

	var _openlayers2 = _interopRequireDefault(_openlayers);

	var _RewireMixin = __webpack_require__(241);

	var _utilities = __webpack_require__(138);

	__webpack_require__(304);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @typedef {g4uControlOptions} OverviewMapOptions
	 * @property {Localizable} [tipLabel]
	 */

	/**
	 * @extends Control
	 */
	var OverviewMap = exports.OverviewMap = function (_mixin) {
	  (0, _inherits3.default)(OverviewMap, _mixin);

	  /**
	   * @param {OverviewMapOptions} [options={}]
	   */
	  function OverviewMap() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    (0, _classCallCheck3.default)(this, OverviewMap);

	    if (options.hasOwnProperty('title')) {
	      options.tipLabel = options.localiser.selectL10N(options.title);
	    } else {
	      options.tipLabel = options.hasOwnProperty('tipLabel') ? options.localiser.selectL10N(options.tipLabel) : options.localiser.localiseUsingDictionary('OverviewMap tipLabel');
	    }

	    return (0, _possibleConstructorReturn3.default)(this, _mixin.call(this, options));
	  }

	  OverviewMap.prototype.setMap = function setMap(map) {
	    var _this2 = this;

	    _mixin.prototype.setMap.call(this, map);
	    if (map) {
	      (function () {
	        var $overviewmap = _this2.get$Element().find('.ol-overviewmap-map');

	        $overviewmap = $overviewmap.add($overviewmap.find('.ol-overviewmap-box'));

	        var dontClick = false;

	        $overviewmap.on('click', function (e) {
	          if (!dontClick) {
	            map.getView().setCenter(_this2.getOverviewMap().getEventCoordinate(e));
	          }
	        });

	        var mouseDown = false;

	        $overviewmap.on('mousedown', function () {
	          dontClick = false;
	          mouseDown = true;
	        });

	        $overviewmap.on('mouseup', function (e) {
	          mouseDown = false;
	        });

	        $overviewmap.on('mousemove', function (e) {
	          if (mouseDown) {
	            map.getView().setCenter(_this2.getOverviewMap().getEventCoordinate(e));
	          }
	        });

	        _this2.getOverviewMap().getView().on('change:center', function () {
	          mouseDown = false;
	          dontClick = true;
	        });
	      })();
	    }
	  };

	  return OverviewMap;
	}((0, _utilities.mixin)(_openlayers2.default.control.OverviewMap, _RewireMixin.RewireMixin));

/***/ },
/* 304 */
200,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.FeatureSelect = undefined;

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(120);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(121);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _openlayers = __webpack_require__(77);

	var _openlayers2 = _interopRequireDefault(_openlayers);

	var _sortBy = __webpack_require__(309);

	var _sortBy2 = _interopRequireDefault(_sortBy);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * This interaction is a little further customized select interaction.
	 * Selected features get sorted by geometry type.
	 */
	var FeatureSelect = exports.FeatureSelect = function (_ol$interaction$Selec) {
	  (0, _inherits3.default)(FeatureSelect, _ol$interaction$Selec);

	  /**
	   * @param {object} [options={}]
	   */
	  function FeatureSelect() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    (0, _classCallCheck3.default)(this, FeatureSelect);

	    var _this = (0, _possibleConstructorReturn3.default)(this, _ol$interaction$Selec.call(this, options));

	    var sort = function sort(f) {
	      if (f.getGeometry() instanceof _openlayers2.default.geom.Point || f.getGeometry() instanceof _openlayers2.default.geom.MultiPoint) {
	        return 1;
	      } else if (f.getGeometry() instanceof _openlayers2.default.geom.LineString || f.getGeometry() instanceof _openlayers2.default.geom.MultiLineString) {
	        return 2;
	      } else {
	        return 3;
	      }
	    };

	    _this.on('select', function (e) {
	      e.selected = (0, _sortBy2.default)(e.selected, sort);
	      e.deselected = (0, _sortBy2.default)(e.deselected, sort);
	    });
	    return _this;
	  }

	  return FeatureSelect;
	}(_openlayers2.default.interaction.Select);

/***/ },
/* 309 */
/***/ function(module, exports, __webpack_require__) {

	var baseFlatten = __webpack_require__(187),
	    baseOrderBy = __webpack_require__(310),
	    baseRest = __webpack_require__(420),
	    isIterateeCall = __webpack_require__(428);

	/**
	 * Creates an array of elements, sorted in ascending order by the results of
	 * running each element in a collection thru each iteratee. This method
	 * performs a stable sort, that is, it preserves the original sort order of
	 * equal elements. The iteratees are invoked with one argument: (value).
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {...(Function|Function[])} [iteratees=[_.identity]]
	 *  The iteratees to sort by.
	 * @returns {Array} Returns the new sorted array.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'fred',   'age': 48 },
	 *   { 'user': 'barney', 'age': 36 },
	 *   { 'user': 'fred',   'age': 40 },
	 *   { 'user': 'barney', 'age': 34 }
	 * ];
	 *
	 * _.sortBy(users, [function(o) { return o.user; }]);
	 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
	 *
	 * _.sortBy(users, ['user', 'age']);
	 * // => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]
	 */
	var sortBy = baseRest(function(collection, iteratees) {
	  if (collection == null) {
	    return [];
	  }
	  var length = iteratees.length;
	  if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
	    iteratees = [];
	  } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
	    iteratees = [iteratees[0]];
	  }
	  return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
	});

	module.exports = sortBy;


/***/ },
/* 310 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(311),
	    baseIteratee = __webpack_require__(312),
	    baseMap = __webpack_require__(411),
	    baseSortBy = __webpack_require__(417),
	    baseUnary = __webpack_require__(376),
	    compareMultiple = __webpack_require__(418),
	    identity = __webpack_require__(407);

	/**
	 * The base implementation of `_.orderBy` without param guards.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
	 * @param {string[]} orders The sort orders of `iteratees`.
	 * @returns {Array} Returns the new sorted array.
	 */
	function baseOrderBy(collection, iteratees, orders) {
	  var index = -1;
	  iteratees = arrayMap(iteratees.length ? iteratees : [identity], baseUnary(baseIteratee));

	  var result = baseMap(collection, function(value, key, collection) {
	    var criteria = arrayMap(iteratees, function(iteratee) {
	      return iteratee(value);
	    });
	    return { 'criteria': criteria, 'index': ++index, 'value': value };
	  });

	  return baseSortBy(result, function(object, other) {
	    return compareMultiple(object, other, orders);
	  });
	}

	module.exports = baseOrderBy;


/***/ },
/* 311 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array ? array.length : 0,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	module.exports = arrayMap;


/***/ },
/* 312 */
/***/ function(module, exports, __webpack_require__) {

	var baseMatches = __webpack_require__(313),
	    baseMatchesProperty = __webpack_require__(392),
	    identity = __webpack_require__(407),
	    isArray = __webpack_require__(196),
	    property = __webpack_require__(408);

	/**
	 * The base implementation of `_.iteratee`.
	 *
	 * @private
	 * @param {*} [value=_.identity] The value to convert to an iteratee.
	 * @returns {Function} Returns the iteratee.
	 */
	function baseIteratee(value) {
	  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
	  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
	  if (typeof value == 'function') {
	    return value;
	  }
	  if (value == null) {
	    return identity;
	  }
	  if (typeof value == 'object') {
	    return isArray(value)
	      ? baseMatchesProperty(value[0], value[1])
	      : baseMatches(value);
	  }
	  return property(value);
	}

	module.exports = baseIteratee;


/***/ },
/* 313 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsMatch = __webpack_require__(314),
	    getMatchData = __webpack_require__(389),
	    matchesStrictComparable = __webpack_require__(391);

	/**
	 * The base implementation of `_.matches` which doesn't clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatches(source) {
	  var matchData = getMatchData(source);
	  if (matchData.length == 1 && matchData[0][2]) {
	    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
	  }
	  return function(object) {
	    return object === source || baseIsMatch(object, source, matchData);
	  };
	}

	module.exports = baseMatches;


/***/ },
/* 314 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(315),
	    baseIsEqual = __webpack_require__(353);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/**
	 * The base implementation of `_.isMatch` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Object} source The object of property values to match.
	 * @param {Array} matchData The property names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, source, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;

	  if (object == null) {
	    return !length;
	  }
	  object = Object(object);
	  while (index--) {
	    var data = matchData[index];
	    if ((noCustomizer && data[2])
	          ? data[1] !== object[data[0]]
	          : !(data[0] in object)
	        ) {
	      return false;
	    }
	  }
	  while (++index < length) {
	    data = matchData[index];
	    var key = data[0],
	        objValue = object[key],
	        srcValue = data[1];

	    if (noCustomizer && data[2]) {
	      if (objValue === undefined && !(key in object)) {
	        return false;
	      }
	    } else {
	      var stack = new Stack;
	      if (customizer) {
	        var result = customizer(objValue, srcValue, key, object, source, stack);
	      }
	      if (!(result === undefined
	            ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack)
	            : result
	          )) {
	        return false;
	      }
	    }
	  }
	  return true;
	}

	module.exports = baseIsMatch;


/***/ },
/* 315 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(316),
	    stackClear = __webpack_require__(324),
	    stackDelete = __webpack_require__(325),
	    stackGet = __webpack_require__(326),
	    stackHas = __webpack_require__(327),
	    stackSet = __webpack_require__(328);

	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack(entries) {
	  var data = this.__data__ = new ListCache(entries);
	  this.size = data.size;
	}

	// Add methods to `Stack`.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;

	module.exports = Stack;


/***/ },
/* 316 */
/***/ function(module, exports, __webpack_require__) {

	var listCacheClear = __webpack_require__(317),
	    listCacheDelete = __webpack_require__(318),
	    listCacheGet = __webpack_require__(321),
	    listCacheHas = __webpack_require__(322),
	    listCacheSet = __webpack_require__(323);

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;

	module.exports = ListCache;


/***/ },
/* 317 */
/***/ function(module, exports) {

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	  this.size = 0;
	}

	module.exports = listCacheClear;


/***/ },
/* 318 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(319);

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  --this.size;
	  return true;
	}

	module.exports = listCacheDelete;


/***/ },
/* 319 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(320);

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	module.exports = assocIndexOf;


/***/ },
/* 320 */
/***/ function(module, exports) {

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	module.exports = eq;


/***/ },
/* 321 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(319);

	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  return index < 0 ? undefined : data[index][1];
	}

	module.exports = listCacheGet;


/***/ },
/* 322 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(319);

	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}

	module.exports = listCacheHas;


/***/ },
/* 323 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(319);

	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    ++this.size;
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}

	module.exports = listCacheSet;


/***/ },
/* 324 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(316);

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = new ListCache;
	  this.size = 0;
	}

	module.exports = stackClear;


/***/ },
/* 325 */
/***/ function(module, exports) {

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  var data = this.__data__,
	      result = data['delete'](key);

	  this.size = data.size;
	  return result;
	}

	module.exports = stackDelete;


/***/ },
/* 326 */
/***/ function(module, exports) {

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  return this.__data__.get(key);
	}

	module.exports = stackGet;


/***/ },
/* 327 */
/***/ function(module, exports) {

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  return this.__data__.has(key);
	}

	module.exports = stackHas;


/***/ },
/* 328 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(316),
	    Map = __webpack_require__(329),
	    MapCache = __webpack_require__(338);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet(key, value) {
	  var data = this.__data__;
	  if (data instanceof ListCache) {
	    var pairs = data.__data__;
	    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
	      pairs.push([key, value]);
	      this.size = ++data.size;
	      return this;
	    }
	    data = this.__data__ = new MapCache(pairs);
	  }
	  data.set(key, value);
	  this.size = data.size;
	  return this;
	}

	module.exports = stackSet;


/***/ },
/* 329 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(330),
	    root = __webpack_require__(191);

	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');

	module.exports = Map;


/***/ },
/* 330 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsNative = __webpack_require__(331),
	    getValue = __webpack_require__(337);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}

	module.exports = getNative;


/***/ },
/* 331 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(332),
	    isMasked = __webpack_require__(334),
	    isObject = __webpack_require__(333),
	    toSource = __webpack_require__(336);

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	module.exports = baseIsNative;


/***/ },
/* 332 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(333);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    proxyTag = '[object Proxy]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed array and other constructors.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag || tag == proxyTag;
	}

	module.exports = isFunction;


/***/ },
/* 333 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 334 */
/***/ function(module, exports, __webpack_require__) {

	var coreJsData = __webpack_require__(335);

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}

	module.exports = isMasked;


/***/ },
/* 335 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(191);

	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];

	module.exports = coreJsData;


/***/ },
/* 336 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var funcProto = Function.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to process.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	module.exports = toSource;


/***/ },
/* 337 */
/***/ function(module, exports) {

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	module.exports = getValue;


/***/ },
/* 338 */
/***/ function(module, exports, __webpack_require__) {

	var mapCacheClear = __webpack_require__(339),
	    mapCacheDelete = __webpack_require__(347),
	    mapCacheGet = __webpack_require__(350),
	    mapCacheHas = __webpack_require__(351),
	    mapCacheSet = __webpack_require__(352);

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;

	module.exports = MapCache;


/***/ },
/* 339 */
/***/ function(module, exports, __webpack_require__) {

	var Hash = __webpack_require__(340),
	    ListCache = __webpack_require__(316),
	    Map = __webpack_require__(329);

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.size = 0;
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
	  };
	}

	module.exports = mapCacheClear;


/***/ },
/* 340 */
/***/ function(module, exports, __webpack_require__) {

	var hashClear = __webpack_require__(341),
	    hashDelete = __webpack_require__(343),
	    hashGet = __webpack_require__(344),
	    hashHas = __webpack_require__(345),
	    hashSet = __webpack_require__(346);

	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;

	module.exports = Hash;


/***/ },
/* 341 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(342);

	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	  this.size = 0;
	}

	module.exports = hashClear;


/***/ },
/* 342 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(330);

	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');

	module.exports = nativeCreate;


/***/ },
/* 343 */
/***/ function(module, exports) {

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  var result = this.has(key) && delete this.__data__[key];
	  this.size -= result ? 1 : 0;
	  return result;
	}

	module.exports = hashDelete;


/***/ },
/* 344 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(342);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}

	module.exports = hashGet;


/***/ },
/* 345 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(342);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
	}

	module.exports = hashHas;


/***/ },
/* 346 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(342);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  this.size += this.has(key) ? 0 : 1;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}

	module.exports = hashSet;


/***/ },
/* 347 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(348);

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  var result = getMapData(this, key)['delete'](key);
	  this.size -= result ? 1 : 0;
	  return result;
	}

	module.exports = mapCacheDelete;


/***/ },
/* 348 */
/***/ function(module, exports, __webpack_require__) {

	var isKeyable = __webpack_require__(349);

	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}

	module.exports = getMapData;


/***/ },
/* 349 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}

	module.exports = isKeyable;


/***/ },
/* 350 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(348);

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}

	module.exports = mapCacheGet;


/***/ },
/* 351 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(348);

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}

	module.exports = mapCacheHas;


/***/ },
/* 352 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(348);

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  var data = getMapData(this, key),
	      size = data.size;

	  data.set(key, value);
	  this.size += data.size == size ? 0 : 1;
	  return this;
	}

	module.exports = mapCacheSet;


/***/ },
/* 353 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(354),
	    isObject = __webpack_require__(333),
	    isObjectLike = __webpack_require__(195);

	/**
	 * The base implementation of `_.isEqual` which supports partial comparisons
	 * and tracks traversed objects.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {boolean} [bitmask] The bitmask of comparison flags.
	 *  The bitmask may be composed of the following flags:
	 *     1 - Unordered comparison
	 *     2 - Partial comparison
	 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, customizer, bitmask, stack) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
	}

	module.exports = baseIsEqual;


/***/ },
/* 354 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(315),
	    equalArrays = __webpack_require__(355),
	    equalByTag = __webpack_require__(361),
	    equalObjects = __webpack_require__(365),
	    getTag = __webpack_require__(383),
	    isArray = __webpack_require__(196),
	    isBuffer = __webpack_require__(369),
	    isTypedArray = __webpack_require__(373);

	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;

	  if (!objIsArr) {
	    objTag = getTag(object);
	    objTag = objTag == argsTag ? objectTag : objTag;
	  }
	  if (!othIsArr) {
	    othTag = getTag(other);
	    othTag = othTag == argsTag ? objectTag : othTag;
	  }
	  var objIsObj = objTag == objectTag,
	      othIsObj = othTag == objectTag,
	      isSameTag = objTag == othTag;

	  if (isSameTag && isBuffer(object)) {
	    if (!isBuffer(other)) {
	      return false;
	    }
	    objIsArr = true;
	    objIsObj = false;
	  }
	  if (isSameTag && !objIsObj) {
	    stack || (stack = new Stack);
	    return (objIsArr || isTypedArray(object))
	      ? equalArrays(object, other, equalFunc, customizer, bitmask, stack)
	      : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
	  }
	  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	    if (objIsWrapped || othIsWrapped) {
	      var objUnwrapped = objIsWrapped ? object.value() : object,
	          othUnwrapped = othIsWrapped ? other.value() : other;

	      stack || (stack = new Stack);
	      return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new Stack);
	  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
	}

	module.exports = baseIsEqualDeep;


/***/ },
/* 355 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(356),
	    arraySome = __webpack_require__(359),
	    cacheHas = __webpack_require__(360);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `array` and `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      arrLength = array.length,
	      othLength = other.length;

	  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(array);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var index = -1,
	      result = true,
	      seen = (bitmask & UNORDERED_COMPARE_FLAG) ? new SetCache : undefined;

	  stack.set(array, other);
	  stack.set(other, array);

	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, arrValue, index, other, array, stack)
	        : customizer(arrValue, othValue, index, array, other, stack);
	    }
	    if (compared !== undefined) {
	      if (compared) {
	        continue;
	      }
	      result = false;
	      break;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (seen) {
	      if (!arraySome(other, function(othValue, othIndex) {
	            if (!cacheHas(seen, othIndex) &&
	                (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
	              return seen.push(othIndex);
	            }
	          })) {
	        result = false;
	        break;
	      }
	    } else if (!(
	          arrValue === othValue ||
	            equalFunc(arrValue, othValue, customizer, bitmask, stack)
	        )) {
	      result = false;
	      break;
	    }
	  }
	  stack['delete'](array);
	  stack['delete'](other);
	  return result;
	}

	module.exports = equalArrays;


/***/ },
/* 356 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(338),
	    setCacheAdd = __webpack_require__(357),
	    setCacheHas = __webpack_require__(358);

	/**
	 *
	 * Creates an array cache object to store unique values.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	  var index = -1,
	      length = values ? values.length : 0;

	  this.__data__ = new MapCache;
	  while (++index < length) {
	    this.add(values[index]);
	  }
	}

	// Add methods to `SetCache`.
	SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
	SetCache.prototype.has = setCacheHas;

	module.exports = SetCache;


/***/ },
/* 357 */
/***/ function(module, exports) {

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Adds `value` to the array cache.
	 *
	 * @private
	 * @name add
	 * @memberOf SetCache
	 * @alias push
	 * @param {*} value The value to cache.
	 * @returns {Object} Returns the cache instance.
	 */
	function setCacheAdd(value) {
	  this.__data__.set(value, HASH_UNDEFINED);
	  return this;
	}

	module.exports = setCacheAdd;


/***/ },
/* 358 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is in the array cache.
	 *
	 * @private
	 * @name has
	 * @memberOf SetCache
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `true` if `value` is found, else `false`.
	 */
	function setCacheHas(value) {
	  return this.__data__.has(value);
	}

	module.exports = setCacheHas;


/***/ },
/* 359 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.some` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array ? array.length : 0;

	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}

	module.exports = arraySome;


/***/ },
/* 360 */
/***/ function(module, exports) {

	/**
	 * Checks if a `cache` value for `key` exists.
	 *
	 * @private
	 * @param {Object} cache The cache to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function cacheHas(cache, key) {
	  return cache.has(key);
	}

	module.exports = cacheHas;


/***/ },
/* 361 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(190),
	    Uint8Array = __webpack_require__(362),
	    eq = __webpack_require__(320),
	    equalArrays = __webpack_require__(355),
	    mapToArray = __webpack_require__(363),
	    setToArray = __webpack_require__(364);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]';

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
	  switch (tag) {
	    case dataViewTag:
	      if ((object.byteLength != other.byteLength) ||
	          (object.byteOffset != other.byteOffset)) {
	        return false;
	      }
	      object = object.buffer;
	      other = other.buffer;

	    case arrayBufferTag:
	      if ((object.byteLength != other.byteLength) ||
	          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
	        return false;
	      }
	      return true;

	    case boolTag:
	    case dateTag:
	    case numberTag:
	      // Coerce booleans to `1` or `0` and dates to milliseconds.
	      // Invalid dates are coerced to `NaN`.
	      return eq(+object, +other);

	    case errorTag:
	      return object.name == other.name && object.message == other.message;

	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings, primitives and objects,
	      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
	      // for more details.
	      return object == (other + '');

	    case mapTag:
	      var convert = mapToArray;

	    case setTag:
	      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
	      convert || (convert = setToArray);

	      if (object.size != other.size && !isPartial) {
	        return false;
	      }
	      // Assume cyclic values are equal.
	      var stacked = stack.get(object);
	      if (stacked) {
	        return stacked == other;
	      }
	      bitmask |= UNORDERED_COMPARE_FLAG;

	      // Recursively compare objects (susceptible to call stack limits).
	      stack.set(object, other);
	      var result = equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
	      stack['delete'](object);
	      return result;

	    case symbolTag:
	      if (symbolValueOf) {
	        return symbolValueOf.call(object) == symbolValueOf.call(other);
	      }
	  }
	  return false;
	}

	module.exports = equalByTag;


/***/ },
/* 362 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(191);

	/** Built-in value references. */
	var Uint8Array = root.Uint8Array;

	module.exports = Uint8Array;


/***/ },
/* 363 */
/***/ function(module, exports) {

	/**
	 * Converts `map` to its key-value pairs.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the key-value pairs.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);

	  map.forEach(function(value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}

	module.exports = mapToArray;


/***/ },
/* 364 */
/***/ function(module, exports) {

	/**
	 * Converts `set` to an array of its values.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the values.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);

	  set.forEach(function(value) {
	    result[++index] = value;
	  });
	  return result;
	}

	module.exports = setToArray;


/***/ },
/* 365 */
/***/ function(module, exports, __webpack_require__) {

	var keys = __webpack_require__(366);

	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;

	  if (objLength != othLength && !isPartial) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
	      return false;
	    }
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(object);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(object, other);
	  stack.set(other, object);

	  var skipCtor = isPartial;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, objValue, key, other, object, stack)
	        : customizer(objValue, othValue, key, object, other, stack);
	    }
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(compared === undefined
	          ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
	          : compared
	        )) {
	      result = false;
	      break;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (result && !skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;

	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      result = false;
	    }
	  }
	  stack['delete'](object);
	  stack['delete'](other);
	  return result;
	}

	module.exports = equalObjects;


/***/ },
/* 366 */
/***/ function(module, exports, __webpack_require__) {

	var arrayLikeKeys = __webpack_require__(367),
	    baseKeys = __webpack_require__(378),
	    isArrayLike = __webpack_require__(382);

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}

	module.exports = keys;


/***/ },
/* 367 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(368),
	    isArguments = __webpack_require__(193),
	    isArray = __webpack_require__(196),
	    isBuffer = __webpack_require__(369),
	    isIndex = __webpack_require__(372),
	    isTypedArray = __webpack_require__(373);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  var isArr = isArray(value),
	      isArg = !isArr && isArguments(value),
	      isBuff = !isArr && !isArg && isBuffer(value),
	      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
	      skipIndexes = isArr || isArg || isBuff || isType,
	      result = skipIndexes ? baseTimes(value.length, String) : [],
	      length = result.length;

	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) &&
	        !(skipIndexes && (
	           // Safari 9 has enumerable `arguments.length` in strict mode.
	           key == 'length' ||
	           // Node.js 0.10 has enumerable non-index properties on buffers.
	           (isBuff && (key == 'offset' || key == 'parent')) ||
	           // PhantomJS 2 has enumerable non-index properties on typed arrays.
	           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
	           // Skip index properties.
	           isIndex(key, length)
	        ))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = arrayLikeKeys;


/***/ },
/* 368 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	module.exports = baseTimes;


/***/ },
/* 369 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(191),
	    stubFalse = __webpack_require__(371);

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = nativeIsBuffer || stubFalse;

	module.exports = isBuffer;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(370)(module)))

/***/ },
/* 370 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 371 */
/***/ function(module, exports) {

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	module.exports = stubFalse;


/***/ },
/* 372 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}

	module.exports = isIndex;


/***/ },
/* 373 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsTypedArray = __webpack_require__(374),
	    baseUnary = __webpack_require__(376),
	    nodeUtil = __webpack_require__(377);

	/* Node.js helper references. */
	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

	module.exports = isTypedArray;


/***/ },
/* 374 */
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(375),
	    isObjectLike = __webpack_require__(195);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
	}

	module.exports = baseIsTypedArray;


/***/ },
/* 375 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ },
/* 376 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}

	module.exports = baseUnary;


/***/ },
/* 377 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(192);

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports && freeGlobal.process;

	/** Used to access faster Node.js helpers. */
	var nodeUtil = (function() {
	  try {
	    return freeProcess && freeProcess.binding('util');
	  } catch (e) {}
	}());

	module.exports = nodeUtil;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(370)(module)))

/***/ },
/* 378 */
/***/ function(module, exports, __webpack_require__) {

	var isPrototype = __webpack_require__(379),
	    nativeKeys = __webpack_require__(380);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = baseKeys;


/***/ },
/* 379 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

	  return value === proto;
	}

	module.exports = isPrototype;


/***/ },
/* 380 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(381);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);

	module.exports = nativeKeys;


/***/ },
/* 381 */
/***/ function(module, exports) {

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	module.exports = overArg;


/***/ },
/* 382 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(332),
	    isLength = __webpack_require__(375);

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}

	module.exports = isArrayLike;


/***/ },
/* 383 */
/***/ function(module, exports, __webpack_require__) {

	var DataView = __webpack_require__(384),
	    Map = __webpack_require__(329),
	    Promise = __webpack_require__(385),
	    Set = __webpack_require__(386),
	    WeakMap = __webpack_require__(387),
	    baseGetTag = __webpack_require__(388),
	    toSource = __webpack_require__(336);

	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    objectTag = '[object Object]',
	    promiseTag = '[object Promise]',
	    setTag = '[object Set]',
	    weakMapTag = '[object WeakMap]';

	var dataViewTag = '[object DataView]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView),
	    mapCtorString = toSource(Map),
	    promiseCtorString = toSource(Promise),
	    setCtorString = toSource(Set),
	    weakMapCtorString = toSource(WeakMap);

	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	var getTag = baseGetTag;

	// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
	if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
	    (Map && getTag(new Map) != mapTag) ||
	    (Promise && getTag(Promise.resolve()) != promiseTag) ||
	    (Set && getTag(new Set) != setTag) ||
	    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
	  getTag = function(value) {
	    var result = objectToString.call(value),
	        Ctor = result == objectTag ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : undefined;

	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString: return dataViewTag;
	        case mapCtorString: return mapTag;
	        case promiseCtorString: return promiseTag;
	        case setCtorString: return setTag;
	        case weakMapCtorString: return weakMapTag;
	      }
	    }
	    return result;
	  };
	}

	module.exports = getTag;


/***/ },
/* 384 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(330),
	    root = __webpack_require__(191);

	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView');

	module.exports = DataView;


/***/ },
/* 385 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(330),
	    root = __webpack_require__(191);

	/* Built-in method references that are verified to be native. */
	var Promise = getNative(root, 'Promise');

	module.exports = Promise;


/***/ },
/* 386 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(330),
	    root = __webpack_require__(191);

	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');

	module.exports = Set;


/***/ },
/* 387 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(330),
	    root = __webpack_require__(191);

	/* Built-in method references that are verified to be native. */
	var WeakMap = getNative(root, 'WeakMap');

	module.exports = WeakMap;


/***/ },
/* 388 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * The base implementation of `getTag`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  return objectToString.call(value);
	}

	module.exports = baseGetTag;


/***/ },
/* 389 */
/***/ function(module, exports, __webpack_require__) {

	var isStrictComparable = __webpack_require__(390),
	    keys = __webpack_require__(366);

	/**
	 * Gets the property names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = keys(object),
	      length = result.length;

	  while (length--) {
	    var key = result[length],
	        value = object[key];

	    result[length] = [key, value, isStrictComparable(value)];
	  }
	  return result;
	}

	module.exports = getMatchData;


/***/ },
/* 390 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(333);

	/**
	 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` if suitable for strict
	 *  equality comparisons, else `false`.
	 */
	function isStrictComparable(value) {
	  return value === value && !isObject(value);
	}

	module.exports = isStrictComparable;


/***/ },
/* 391 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `matchesProperty` for source values suitable
	 * for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function matchesStrictComparable(key, srcValue) {
	  return function(object) {
	    if (object == null) {
	      return false;
	    }
	    return object[key] === srcValue &&
	      (srcValue !== undefined || (key in Object(object)));
	  };
	}

	module.exports = matchesStrictComparable;


/***/ },
/* 392 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(353),
	    get = __webpack_require__(393),
	    hasIn = __webpack_require__(404),
	    isKey = __webpack_require__(402),
	    isStrictComparable = __webpack_require__(390),
	    matchesStrictComparable = __webpack_require__(391),
	    toKey = __webpack_require__(403);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/**
	 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatchesProperty(path, srcValue) {
	  if (isKey(path) && isStrictComparable(srcValue)) {
	    return matchesStrictComparable(toKey(path), srcValue);
	  }
	  return function(object) {
	    var objValue = get(object, path);
	    return (objValue === undefined && objValue === srcValue)
	      ? hasIn(object, path)
	      : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
	  };
	}

	module.exports = baseMatchesProperty;


/***/ },
/* 393 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(394);

	/**
	 * Gets the value at `path` of `object`. If the resolved value is
	 * `undefined`, the `defaultValue` is returned in its place.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.7.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.get(object, 'a[0].b.c');
	 * // => 3
	 *
	 * _.get(object, ['a', '0', 'b', 'c']);
	 * // => 3
	 *
	 * _.get(object, 'a.b.c', 'default');
	 * // => 'default'
	 */
	function get(object, path, defaultValue) {
	  var result = object == null ? undefined : baseGet(object, path);
	  return result === undefined ? defaultValue : result;
	}

	module.exports = get;


/***/ },
/* 394 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(395),
	    isKey = __webpack_require__(402),
	    toKey = __webpack_require__(403);

	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path) {
	  path = isKey(path, object) ? [path] : castPath(path);

	  var index = 0,
	      length = path.length;

	  while (object != null && index < length) {
	    object = object[toKey(path[index++])];
	  }
	  return (index && index == length) ? object : undefined;
	}

	module.exports = baseGet;


/***/ },
/* 395 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(196),
	    stringToPath = __webpack_require__(396);

	/**
	 * Casts `value` to a path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {Array} Returns the cast property path array.
	 */
	function castPath(value) {
	  return isArray(value) ? value : stringToPath(value);
	}

	module.exports = castPath;


/***/ },
/* 396 */
/***/ function(module, exports, __webpack_require__) {

	var memoizeCapped = __webpack_require__(397),
	    toString = __webpack_require__(399);

	/** Used to match property names within property paths. */
	var reLeadingDot = /^\./,
	    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	var stringToPath = memoizeCapped(function(string) {
	  string = toString(string);

	  var result = [];
	  if (reLeadingDot.test(string)) {
	    result.push('');
	  }
	  string.replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	});

	module.exports = stringToPath;


/***/ },
/* 397 */
/***/ function(module, exports, __webpack_require__) {

	var memoize = __webpack_require__(398);

	/** Used as the maximum memoize cache size. */
	var MAX_MEMOIZE_SIZE = 500;

	/**
	 * A specialized version of `_.memoize` which clears the memoized function's
	 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
	 *
	 * @private
	 * @param {Function} func The function to have its output memoized.
	 * @returns {Function} Returns the new memoized function.
	 */
	function memoizeCapped(func) {
	  var result = memoize(func, function(key) {
	    if (cache.size === MAX_MEMOIZE_SIZE) {
	      cache.clear();
	    }
	    return key;
	  });

	  var cache = result.cache;
	  return result;
	}

	module.exports = memoizeCapped;


/***/ },
/* 398 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(338);

	/** Error message constants. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/**
	 * Creates a function that memoizes the result of `func`. If `resolver` is
	 * provided, it determines the cache key for storing the result based on the
	 * arguments provided to the memoized function. By default, the first argument
	 * provided to the memoized function is used as the map cache key. The `func`
	 * is invoked with the `this` binding of the memoized function.
	 *
	 * **Note:** The cache is exposed as the `cache` property on the memoized
	 * function. Its creation may be customized by replacing the `_.memoize.Cache`
	 * constructor with one whose instances implement the
	 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
	 * method interface of `delete`, `get`, `has`, and `set`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to have its output memoized.
	 * @param {Function} [resolver] The function to resolve the cache key.
	 * @returns {Function} Returns the new memoized function.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': 2 };
	 * var other = { 'c': 3, 'd': 4 };
	 *
	 * var values = _.memoize(_.values);
	 * values(object);
	 * // => [1, 2]
	 *
	 * values(other);
	 * // => [3, 4]
	 *
	 * object.a = 2;
	 * values(object);
	 * // => [1, 2]
	 *
	 * // Modify the result cache.
	 * values.cache.set(object, ['a', 'b']);
	 * values(object);
	 * // => ['a', 'b']
	 *
	 * // Replace `_.memoize.Cache`.
	 * _.memoize.Cache = WeakMap;
	 */
	function memoize(func, resolver) {
	  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var memoized = function() {
	    var args = arguments,
	        key = resolver ? resolver.apply(this, args) : args[0],
	        cache = memoized.cache;

	    if (cache.has(key)) {
	      return cache.get(key);
	    }
	    var result = func.apply(this, args);
	    memoized.cache = cache.set(key, result) || cache;
	    return result;
	  };
	  memoized.cache = new (memoize.Cache || MapCache);
	  return memoized;
	}

	// Expose `MapCache`.
	memoize.Cache = MapCache;

	module.exports = memoize;


/***/ },
/* 399 */
/***/ function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(400);

	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  return value == null ? '' : baseToString(value);
	}

	module.exports = toString;


/***/ },
/* 400 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(190),
	    arrayMap = __webpack_require__(311),
	    isArray = __webpack_require__(196),
	    isSymbol = __webpack_require__(401);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;

	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (isArray(value)) {
	    // Recursively convert values (susceptible to call stack limits).
	    return arrayMap(value, baseToString) + '';
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	module.exports = baseToString;


/***/ },
/* 401 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(195);

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}

	module.exports = isSymbol;


/***/ },
/* 402 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(196),
	    isSymbol = __webpack_require__(401);

	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;

	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  if (isArray(value)) {
	    return false;
	  }
	  var type = typeof value;
	  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
	      value == null || isSymbol(value)) {
	    return true;
	  }
	  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
	    (object != null && value in Object(object));
	}

	module.exports = isKey;


/***/ },
/* 403 */
/***/ function(module, exports, __webpack_require__) {

	var isSymbol = __webpack_require__(401);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/**
	 * Converts `value` to a string key if it's not a string or symbol.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {string|symbol} Returns the key.
	 */
	function toKey(value) {
	  if (typeof value == 'string' || isSymbol(value)) {
	    return value;
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	module.exports = toKey;


/***/ },
/* 404 */
/***/ function(module, exports, __webpack_require__) {

	var baseHasIn = __webpack_require__(405),
	    hasPath = __webpack_require__(406);

	/**
	 * Checks if `path` is a direct or inherited property of `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 * @example
	 *
	 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
	 *
	 * _.hasIn(object, 'a');
	 * // => true
	 *
	 * _.hasIn(object, 'a.b');
	 * // => true
	 *
	 * _.hasIn(object, ['a', 'b']);
	 * // => true
	 *
	 * _.hasIn(object, 'b');
	 * // => false
	 */
	function hasIn(object, path) {
	  return object != null && hasPath(object, path, baseHasIn);
	}

	module.exports = hasIn;


/***/ },
/* 405 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.hasIn` without support for deep paths.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHasIn(object, key) {
	  return object != null && key in Object(object);
	}

	module.exports = baseHasIn;


/***/ },
/* 406 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(395),
	    isArguments = __webpack_require__(193),
	    isArray = __webpack_require__(196),
	    isIndex = __webpack_require__(372),
	    isKey = __webpack_require__(402),
	    isLength = __webpack_require__(375),
	    toKey = __webpack_require__(403);

	/**
	 * Checks if `path` exists on `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @param {Function} hasFunc The function to check properties.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 */
	function hasPath(object, path, hasFunc) {
	  path = isKey(path, object) ? [path] : castPath(path);

	  var index = -1,
	      length = path.length,
	      result = false;

	  while (++index < length) {
	    var key = toKey(path[index]);
	    if (!(result = object != null && hasFunc(object, key))) {
	      break;
	    }
	    object = object[key];
	  }
	  if (result || ++index != length) {
	    return result;
	  }
	  length = object ? object.length : 0;
	  return !!length && isLength(length) && isIndex(key, length) &&
	    (isArray(object) || isArguments(object));
	}

	module.exports = hasPath;


/***/ },
/* 407 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 408 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(409),
	    basePropertyDeep = __webpack_require__(410),
	    isKey = __webpack_require__(402),
	    toKey = __webpack_require__(403);

	/**
	 * Creates a function that returns the value at `path` of a given object.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': 2 } },
	 *   { 'a': { 'b': 1 } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b'));
	 * // => [2, 1]
	 *
	 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
	}

	module.exports = property;


/***/ },
/* 409 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = baseProperty;


/***/ },
/* 410 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(394);

	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function basePropertyDeep(path) {
	  return function(object) {
	    return baseGet(object, path);
	  };
	}

	module.exports = basePropertyDeep;


/***/ },
/* 411 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(412),
	    isArrayLike = __webpack_require__(382);

	/**
	 * The base implementation of `_.map` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function baseMap(collection, iteratee) {
	  var index = -1,
	      result = isArrayLike(collection) ? Array(collection.length) : [];

	  baseEach(collection, function(value, key, collection) {
	    result[++index] = iteratee(value, key, collection);
	  });
	  return result;
	}

	module.exports = baseMap;


/***/ },
/* 412 */
/***/ function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(413),
	    createBaseEach = __webpack_require__(416);

	/**
	 * The base implementation of `_.forEach` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 */
	var baseEach = createBaseEach(baseForOwn);

	module.exports = baseEach;


/***/ },
/* 413 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(414),
	    keys = __webpack_require__(366);

	/**
	 * The base implementation of `_.forOwn` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return object && baseFor(object, iteratee, keys);
	}

	module.exports = baseForOwn;


/***/ },
/* 414 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(415);

	/**
	 * The base implementation of `baseForOwn` which iterates over `object`
	 * properties returned by `keysFunc` and invokes `iteratee` for each property.
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();

	module.exports = baseFor;


/***/ },
/* 415 */
/***/ function(module, exports) {

	/**
	 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;

	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	module.exports = createBaseFor;


/***/ },
/* 416 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(382);

	/**
	 * Creates a `baseEach` or `baseEachRight` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseEach(eachFunc, fromRight) {
	  return function(collection, iteratee) {
	    if (collection == null) {
	      return collection;
	    }
	    if (!isArrayLike(collection)) {
	      return eachFunc(collection, iteratee);
	    }
	    var length = collection.length,
	        index = fromRight ? length : -1,
	        iterable = Object(collection);

	    while ((fromRight ? index-- : ++index < length)) {
	      if (iteratee(iterable[index], index, iterable) === false) {
	        break;
	      }
	    }
	    return collection;
	  };
	}

	module.exports = createBaseEach;


/***/ },
/* 417 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.sortBy` which uses `comparer` to define the
	 * sort order of `array` and replaces criteria objects with their corresponding
	 * values.
	 *
	 * @private
	 * @param {Array} array The array to sort.
	 * @param {Function} comparer The function to define sort order.
	 * @returns {Array} Returns `array`.
	 */
	function baseSortBy(array, comparer) {
	  var length = array.length;

	  array.sort(comparer);
	  while (length--) {
	    array[length] = array[length].value;
	  }
	  return array;
	}

	module.exports = baseSortBy;


/***/ },
/* 418 */
/***/ function(module, exports, __webpack_require__) {

	var compareAscending = __webpack_require__(419);

	/**
	 * Used by `_.orderBy` to compare multiple properties of a value to another
	 * and stable sort them.
	 *
	 * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
	 * specify an order of "desc" for descending or "asc" for ascending sort order
	 * of corresponding values.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {boolean[]|string[]} orders The order to sort by for each property.
	 * @returns {number} Returns the sort order indicator for `object`.
	 */
	function compareMultiple(object, other, orders) {
	  var index = -1,
	      objCriteria = object.criteria,
	      othCriteria = other.criteria,
	      length = objCriteria.length,
	      ordersLength = orders.length;

	  while (++index < length) {
	    var result = compareAscending(objCriteria[index], othCriteria[index]);
	    if (result) {
	      if (index >= ordersLength) {
	        return result;
	      }
	      var order = orders[index];
	      return result * (order == 'desc' ? -1 : 1);
	    }
	  }
	  // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
	  // that causes it, under certain circumstances, to provide the same value for
	  // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
	  // for more details.
	  //
	  // This also ensures a stable sort in V8 and other engines.
	  // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
	  return object.index - other.index;
	}

	module.exports = compareMultiple;


/***/ },
/* 419 */
/***/ function(module, exports, __webpack_require__) {

	var isSymbol = __webpack_require__(401);

	/**
	 * Compares values to sort them in ascending order.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {number} Returns the sort order indicator for `value`.
	 */
	function compareAscending(value, other) {
	  if (value !== other) {
	    var valIsDefined = value !== undefined,
	        valIsNull = value === null,
	        valIsReflexive = value === value,
	        valIsSymbol = isSymbol(value);

	    var othIsDefined = other !== undefined,
	        othIsNull = other === null,
	        othIsReflexive = other === other,
	        othIsSymbol = isSymbol(other);

	    if ((!othIsNull && !othIsSymbol && !valIsSymbol && value > other) ||
	        (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) ||
	        (valIsNull && othIsDefined && othIsReflexive) ||
	        (!valIsDefined && othIsReflexive) ||
	        !valIsReflexive) {
	      return 1;
	    }
	    if ((!valIsNull && !valIsSymbol && !othIsSymbol && value < other) ||
	        (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) ||
	        (othIsNull && valIsDefined && valIsReflexive) ||
	        (!othIsDefined && valIsReflexive) ||
	        !othIsReflexive) {
	      return -1;
	    }
	  }
	  return 0;
	}

	module.exports = compareAscending;


/***/ },
/* 420 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(407),
	    overRest = __webpack_require__(421),
	    setToString = __webpack_require__(423);

	/**
	 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 */
	function baseRest(func, start) {
	  return setToString(overRest(func, start, identity), func + '');
	}

	module.exports = baseRest;


/***/ },
/* 421 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(422);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * A specialized version of `baseRest` which transforms the rest array.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @param {Function} transform The rest array transform.
	 * @returns {Function} Returns the new function.
	 */
	function overRest(func, start, transform) {
	  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);

	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    index = -1;
	    var otherArgs = Array(start + 1);
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = transform(array);
	    return apply(func, this, otherArgs);
	  };
	}

	module.exports = overRest;


/***/ },
/* 422 */
/***/ function(module, exports) {

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  switch (args.length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}

	module.exports = apply;


/***/ },
/* 423 */
/***/ function(module, exports, __webpack_require__) {

	var baseSetToString = __webpack_require__(424),
	    shortOut = __webpack_require__(427);

	/**
	 * Sets the `toString` method of `func` to return `string`.
	 *
	 * @private
	 * @param {Function} func The function to modify.
	 * @param {Function} string The `toString` result.
	 * @returns {Function} Returns `func`.
	 */
	var setToString = shortOut(baseSetToString);

	module.exports = setToString;


/***/ },
/* 424 */
/***/ function(module, exports, __webpack_require__) {

	var constant = __webpack_require__(425),
	    defineProperty = __webpack_require__(426),
	    identity = __webpack_require__(407);

	/**
	 * The base implementation of `setToString` without support for hot loop shorting.
	 *
	 * @private
	 * @param {Function} func The function to modify.
	 * @param {Function} string The `toString` result.
	 * @returns {Function} Returns `func`.
	 */
	var baseSetToString = !defineProperty ? identity : function(func, string) {
	  return defineProperty(func, 'toString', {
	    'configurable': true,
	    'enumerable': false,
	    'value': constant(string),
	    'writable': true
	  });
	};

	module.exports = baseSetToString;


/***/ },
/* 425 */
/***/ function(module, exports) {

	/**
	 * Creates a function that returns `value`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {*} value The value to return from the new function.
	 * @returns {Function} Returns the new constant function.
	 * @example
	 *
	 * var objects = _.times(2, _.constant({ 'a': 1 }));
	 *
	 * console.log(objects);
	 * // => [{ 'a': 1 }, { 'a': 1 }]
	 *
	 * console.log(objects[0] === objects[1]);
	 * // => true
	 */
	function constant(value) {
	  return function() {
	    return value;
	  };
	}

	module.exports = constant;


/***/ },
/* 426 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(330);

	var defineProperty = (function() {
	  try {
	    var func = getNative(Object, 'defineProperty');
	    func({}, '', {});
	    return func;
	  } catch (e) {}
	}());

	module.exports = defineProperty;


/***/ },
/* 427 */
/***/ function(module, exports) {

	/** Used to detect hot functions by number of calls within a span of milliseconds. */
	var HOT_COUNT = 500,
	    HOT_SPAN = 16;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeNow = Date.now;

	/**
	 * Creates a function that'll short out and invoke `identity` instead
	 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
	 * milliseconds.
	 *
	 * @private
	 * @param {Function} func The function to restrict.
	 * @returns {Function} Returns the new shortable function.
	 */
	function shortOut(func) {
	  var count = 0,
	      lastCalled = 0;

	  return function() {
	    var stamp = nativeNow(),
	        remaining = HOT_SPAN - (stamp - lastCalled);

	    lastCalled = stamp;
	    if (remaining > 0) {
	      if (++count >= HOT_COUNT) {
	        return arguments[0];
	      }
	    } else {
	      count = 0;
	    }
	    return func.apply(undefined, arguments);
	  };
	}

	module.exports = shortOut;


/***/ },
/* 428 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(320),
	    isArrayLike = __webpack_require__(382),
	    isIndex = __webpack_require__(372),
	    isObject = __webpack_require__(333);

	/**
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
	 *  else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	        ? (isArrayLike(object) && isIndex(index, object.length))
	        : (type == 'string' && index in object)
	      ) {
	    return eq(object[index], value);
	  }
	  return false;
	}

	module.exports = isIterateeCall;


/***/ },
/* 429 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.FunctionCallBuffer = undefined;

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Gathers function calls made in a specified time or till the main loop is free again and only calls the function once
	 */
	var FunctionCallBuffer = exports.FunctionCallBuffer = function () {
	  /**
	   * @param {function} func the function whichs call should be buffered
	   * @param {number} [bufferTime=0] time of the buffer. If set to 0 it evaluates as soon as the main loop is free again
	   */
	  function FunctionCallBuffer(func) {
	    var bufferTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	    (0, _classCallCheck3.default)(this, FunctionCallBuffer);

	    /**
	     * @type {function}
	     * @private
	     */
	    this.func_ = func;
	    /**
	     * @type {number}
	     * @private
	     */
	    this.bufferTime_ = bufferTime;

	    /**
	     * Timeout ID
	     * @type {number}
	     * @private
	     */
	    this.timeout_ = -1;
	  }

	  /**
	   * @param {any[]} params
	   */


	  FunctionCallBuffer.prototype.call = function call() {
	    var _this = this;

	    for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
	      params[_key] = arguments[_key];
	    }

	    clearTimeout(this.timeout_);
	    this.timeout_ = setTimeout(function () {
	      _this.func_.apply(_this, params);
	    }, this.bufferTime_);
	  };

	  return FunctionCallBuffer;
	}();

/***/ },
/* 430 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ShowWMSFeatureInfo = undefined;

	var _toConsumableArray2 = __webpack_require__(178);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	var _getIterator2 = __webpack_require__(105);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _openlayers = __webpack_require__(77);

	var _openlayers2 = _interopRequireDefault(_openlayers);

	var _VectorLayer = __webpack_require__(168);

	var _MapEventInteraction = __webpack_require__(431);

	var _FeaturePopup = __webpack_require__(185);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @typedef {Object} ShowWMSFeatureInfoOptions
	 * @property {StyleLike} [style='#defaultStyle']
	 * @property {String} [seperator='<br>']
	 * @property {String[]} [mutators=[]]
	 * @property {boolean} [animated]
	 */

	var ShowWMSFeatureInfo = exports.ShowWMSFeatureInfo = function () {
	  /**
	   * @param {ShowWMSFeatureInfoOptions} [options={}]
	   */
	  function ShowWMSFeatureInfo() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    (0, _classCallCheck3.default)(this, ShowWMSFeatureInfo);

	    this.separator_ = options.hasOwnProperty('seperator') ? options.seperator : '<br>';
	    this.style_ = options.style || '#defaultStyle';

	    this.animated_ = options.animated;
	    this.centerOnPopup_ = options.hasOwnProperty('centerOnPopup') ? options.centerOnPopup : true;
	    this.centerIfNoData_ = options.hasOwnProperty('centerOnPopup') ? options.centerIfNoData : false;

	    this.centerOnPopupInitial_ = this.centerOnPopup_;

	    this.mutators_ = options.mutators || [];
	  }

	  ShowWMSFeatureInfo.prototype.setMap = function setMap(map) {
	    var _this = this;

	    var onMapChangeMobile = function onMapChangeMobile() {
	      if (map.get('mobile')) {
	        _this.centerOnPopup_ = false;
	      } else {
	        _this.centerOnPopup_ = _this.centerOnPopupInitial_;
	      }
	    };

	    if (this.getMap()) {
	      this.getMap().un('change:mobile', onMapChangeMobile);
	      _openlayers2.default.Observable.unByKey(this.listenerKey_);
	    }

	    this.map_ = map;
	    if (map) {
	      (function () {
	        _this.utilitySource_ = new _openlayers2.default.source.Vector();
	        _this.utilityLayer_ = new _VectorLayer.VectorLayer({
	          visible: false,
	          source: _this.utilitySource_
	        });
	        map.addLayer(_this.utilityLayer_);

	        _this.layers_ = [];

	        var featurePopup = map.get('featurePopup');
	        var projection = map.getView().getProjection();

	        var interaction = new _MapEventInteraction.MapEventInteraction({ type: 'singleclick' });
	        interaction.on('mapevent', function (e) {
	          var coordinate = e.mapEvent.coordinate;
	          _this.utilitySource_.clear();
	          if (!map.forEachFeatureAtPixel(e.mapEvent.pixel, _FeaturePopup.FeaturePopup.canDisplay)) {
	            (function () {
	              var feature = void 0;
	              var _iteratorNormalCompletion = true;
	              var _didIteratorError = false;
	              var _iteratorError = undefined;

	              try {
	                var _loop = function _loop() {
	                  var layer = _step.value;

	                  if (layer.getVisible()) {
	                    layer.getSource().getFeatureInfo(coordinate, map.getView().getResolution(), projection).then(function (data) {
	                      if (data !== '') {
	                        if (!feature) {
	                          _this.utilitySource_.clear();
	                          feature = new _openlayers2.default.Feature({
	                            geometry: new _openlayers2.default.geom.Point(coordinate),
	                            description: data
	                          });
	                          map.get('styling').styleFeature(feature, _this.style_);
	                          _this.utilitySource_.addFeature(feature);
	                          featurePopup.setFeature(feature, [].concat((0, _toConsumableArray3.default)(_this.mutators_), (0, _toConsumableArray3.default)(layer.getSource().getFeatureInfoMutators())));
	                          featurePopup.setVisible(true);
	                          _this.setPointVisible(true);
	                          if (_this.centerOnPopup_) {
	                            featurePopup.centerMapOnPopup(_this.animated_);
	                          }
	                          featurePopup.once('change:visible', function () {
	                            return _this.setPointVisible(false);
	                          });
	                        } else {
	                          feature.set('description', feature.get('description') + _this.separator_ + data);
	                        }
	                      }
	                      layer.on('change:visible', function () {
	                        featurePopup.setVisible(false);
	                      });
	                    });
	                  }
	                };

	                for (var _iterator = (0, _getIterator3.default)(_this.layers_), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                  _loop();
	                }
	              } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	              } finally {
	                try {
	                  if (!_iteratorNormalCompletion && _iterator.return) {
	                    _iterator.return();
	                  }
	                } finally {
	                  if (_didIteratorError) {
	                    throw _iteratorError;
	                  }
	                }
	              }
	            })();
	          }
	        });

	        map.addDefaultInteraction('singleclick', interaction);

	        onMapChangeMobile();
	        map.on('change:mobile', onMapChangeMobile);
	      })();
	    }
	  };

	  ShowWMSFeatureInfo.prototype.getPointVisible = function getPointVisible() {
	    return this.utilityLayer_.getVisible();
	  };

	  ShowWMSFeatureInfo.prototype.setPointVisible = function setPointVisible(visible) {
	    this.utilityLayer_.setVisible(visible);
	  };

	  ShowWMSFeatureInfo.prototype.getMap = function getMap() {
	    return this.map_;
	  };

	  ShowWMSFeatureInfo.prototype.addLayer = function addLayer(layer) {
	    this.layers_.push(layer);
	  };

	  return ShowWMSFeatureInfo;
	}();

/***/ },
/* 431 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.MapEventInteraction = undefined;

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(120);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(121);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _openlayers = __webpack_require__(77);

	var _openlayers2 = _interopRequireDefault(_openlayers);

	var _jquery = __webpack_require__(78);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var MapEventInteraction = exports.MapEventInteraction = function (_ol$interaction$Inter) {
	  (0, _inherits3.default)(MapEventInteraction, _ol$interaction$Inter);

	  function MapEventInteraction() {
	    var _this;

	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    (0, _classCallCheck3.default)(this, MapEventInteraction);

	    var type = options.type || 'singleclick';
	    return _this = (0, _possibleConstructorReturn3.default)(this, _ol$interaction$Inter.call(this, {
	      handleEvent: function handleEvent(e) {
	        if (_this.getActive() && e.type === type && (0, _jquery2.default)(e.originalEvent.target).is('.ol-viewport > canvas')) {
	          _this.dispatchEvent({
	            type: 'mapevent',
	            mapEvent: e
	          });
	        }
	        return true;
	      }
	    }));
	  }

	  return MapEventInteraction;
	}(_openlayers2.default.interaction.Interaction);

/***/ },
/* 432 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.API = undefined;

	var _promise = __webpack_require__(12);

	var _promise2 = _interopRequireDefault(_promise);

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(120);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(121);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _openlayers = __webpack_require__(77);

	var _openlayers2 = _interopRequireDefault(_openlayers);

	var _jquery = __webpack_require__(78);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _globals = __webpack_require__(183);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @typedef {object} APIOptions
	 * @property {StyleLike} [drawStyle='#drawStyle']
	 */

	var API = exports.API = function (_ol$Object) {
	  (0, _inherits3.default)(API, _ol$Object);

	  /**
	   * @param {G4UMap} map
	   * @param {object} options
	   */
	  function API(map) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    (0, _classCallCheck3.default)(this, API);

	    /**
	     * @type {boolean}
	     * @private
	     */
	    var _this = (0, _possibleConstructorReturn3.default)(this, _ol$Object.call(this));

	    _this.featureManipulationActive_ = false;

	    /**
	     * @type {StyleLike}
	     * @private
	     */
	    _this.drawStyle_ = options.drawStyle || '#drawStyle';

	    /**
	     * @type {ol.format.WKT}
	     * @private
	     */
	    _this.wktParser_ = new _openlayers2.default.format.WKT();

	    /**
	     * @type {G4UMap}
	     * @private
	     */
	    _this.map_ = map;

	    /**
	     * @type {?ol.interaction.Interaction}
	     * @private
	     */
	    _this.featureManipulationInteraction_ = null;

	    _this.map_.once('ready', function () {
	      _this.layerConfigurator_ = _this.map_.get('configurator').layerConfigurator_;
	    });

	    (0, _jquery2.default)(_this.map_.getViewport()).on('keydown', _this.onKeyDown_.bind(_this));
	    return _this;
	  }

	  // //////////////  FEATURE MANIPULATION ////////////////

	  API.prototype.endFeatureManipulationInternal_ = function endFeatureManipulationInternal_() {
	    if (this.featureManipulationInteraction_) {
	      this.featureManipulationInteraction_.setActive(false);

	      this.map_.removeInteraction(this.featureManipulationInteraction_);
	    }

	    (0, _jquery2.default)(this.map_.getViewport()).removeClass(_globals.cssClasses.crosshair);
	    (0, _jquery2.default)(this.map_.getViewport()).removeClass(_globals.cssClasses.arrow);
	    // and any other cursor changes

	    this.featureManipulationActive_ = false;

	    this.dispatchEvent('endManipulation');
	  };

	  /**
	   * cancel the current feature manipulation
	   */


	  API.prototype.cancelFeatureManipulation = function cancelFeatureManipulation() {
	    if (this.featureManipulationActive_) {
	      this.endFeatureManipulationInternal_();
	    }
	  };

	  /**
	   * draw a feature
	   * @param {object} [options={}]
	   * @param {StyleLike} [options.style]
	   * @param {string} [options.type='Point']
	   * @returns {Promise<ol.Feature>}
	   */


	  API.prototype.drawFeature = function drawFeature() {
	    var _this2 = this;

	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    if (this.featureManipulationActive_) {
	      this.endFeatureManipulationInternal_();
	    }

	    this.featureManipulationActive_ = true;

	    return new _promise2.default(function (resolve) {
	      var collection = new _openlayers2.default.Collection();

	      var styleConf = options.style || _this2.drawStyle_ || {};

	      var style = _this2.map_.get('styling').getStyle(styleConf);

	      _this2.map_.get('styling').styleCollection(collection, style);

	      _this2.featureManipulationInteraction_ = new _openlayers2.default.interaction.Draw({
	        features: collection,
	        type: options.type || 'Point',
	        style: style
	      });

	      _this2.map_.addSupersedingInteraction('singleclick dblclick pointermove', _this2.featureManipulationInteraction_);

	      (0, _jquery2.default)(_this2.map_.getViewport()).addClass(_globals.cssClasses.crosshair);

	      _this2.featureManipulationInteraction_.on('drawend', function (e) {
	        resolve(e.feature);
	        _this2.endFeatureManipulationInternal_();
	      });
	    });
	  };

	  API.prototype.onKeyDown_ = function onKeyDown_(e) {
	    if (this.featureManipulationActive_ && e.which === _globals.keyCodes.ESCAPE) {
	      this.endFeatureManipulationInternal_();
	    }
	  };

	  /**
	   * Select a feature with a single click
	   * @returns {Promise<ol.Feature>}
	   */


	  API.prototype.selectFeature = function selectFeature() {
	    var _this3 = this;

	    if (this.featureManipulationActive_) {
	      this.endFeatureManipulationInternal_(null);
	    }

	    this.featureManipulationActive_ = true;

	    return new _promise2.default(function (resolve) {
	      _this3.featureManipulationInteraction_ = new _openlayers2.default.interaction.Select();

	      _this3.map_.addSupersedingInteraction('singleclick', _this3.featureManipulationInteraction_);

	      (0, _jquery2.default)(_this3.map_.getViewport()).addClass(_globals.cssClasses.arrow);

	      _this3.featureManipulationInteraction_.getFeatures().on('add', /** ol.CollectionEvent */function (e) {
	        resolve(e.element);
	        _this3.endFeatureManipulationInternal_();
	      });
	    });
	  };

	  /**
	   * Modify a given Feature
	   * @param {ol.Collection<ol.Feature>|ol.Feature[]|ol.Feature} feature
	   * @param {Object} options
	   * @param {StyleLike} [options.style]
	   */


	  API.prototype.modifyFeature = function modifyFeature(feature) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    var features = void 0;

	    if (feature instanceof _openlayers2.default.Collection) {
	      features = feature;
	    } else if (feature instanceof Array) {
	      features = new _openlayers2.default.Collection(feature);
	    } else {
	      features = new _openlayers2.default.Collection([feature]);
	    }

	    if (this.featureManipulationActive_) {
	      this.endFeatureManipulationInternal_(false);
	    }

	    this.featureManipulationActive_ = true;

	    options.features = features;
	    if (options.style) {
	      options.style = this.map_.get('styling').getStyle(options.style);
	    }

	    this.featureManipulationInteraction_ = new _openlayers2.default.interaction.Modify(options);

	    this.map_.addSupersedingInteraction('singleclick dblclick pointermove', this.featureManipulationInteraction_);

	    (0, _jquery2.default)(this.map_.getViewport()).addClass(_globals.cssClasses.crosshair);
	  };

	  /**
	   * This function creates a layer from the given layerOptions and adds it the map
	   * @param {g4uLayerOptions} layerOptions
	   * @returns {VectorLayer}
	   */


	  API.prototype.addFeatureLayer = function addFeatureLayer(layerOptions) {
	    return this.layerConfigurator_.getFactory().addLayer(this.map_.get('featureLayers'), layerOptions, 'featureLayer', true);
	  };

	  /**
	   * This function creates a layer from the given layerOptions and adds it as a fixedFeatureLayer to the map
	   * @param {g4uLayerOptions} layerOptions
	   * @returns {VectorLayer}
	   */


	  API.prototype.addFixedFeatureLayer = function addFixedFeatureLayer(layerOptions) {
	    return this.layerConfigurator_.getFactory().addLayer(this.map_.get('fixedFeatureLayers'), layerOptions, 'featureLayer', true);
	  };

	  /**
	   * This function creates a base layer from the given layerOptions and adds it to the map
	   * @param {g4uLayerOptions} layerOptions
	   * @returns {ol.layer.Base}
	   */


	  API.prototype.addBaseLayer = function addBaseLayer(layerOptions) {
	    return this.layerConfigurator_.getFactory().addLayer(this.map_.get('baseLayers'), layerOptions, 'baseLayer', true);
	  };

	  /**
	   * This function creates a layer from the given layerOptions, adds it as a VectorLayere and returns a promise which
	   * is resolved as soon as the layer is loaded fully.
	   * @param {g4uLayerOptions} layerOptions
	   * @returns {Promise.<VectorLayer>}
	   */


	  API.prototype.loadLayerFromServer = function loadLayerFromServer(layerOptions) {
	    var _this4 = this;

	    layerOptions = layerOptions || {};
	    layerOptions.visible = true;
	    layerOptions.source = layerOptions.source || {};

	    var promise = new _promise2.default(function (resolve, reject) {
	      var layer = _this4.addFeatureLayer(layerOptions);
	      var source = layer.getSource();
	      var loadEndHandler = function loadEndHandler() {
	        source.un('vectorloadend', loadErrorHandler);
	        resolve(layer);
	      };
	      var loadErrorHandler = function loadErrorHandler() {
	        source.un('vectorloaderror', loadEndHandler);
	        reject('vector load error');
	      };
	      source.once('vectorloadend', loadEndHandler);
	      source.once('vectorloaderror', loadErrorHandler);
	    });

	    return promise;
	  };

	  /**
	   * Creates a Feature from the given config
	   * @param {FeatureConfig} config
	   * @returns {ol.Feature}
	   */


	  API.prototype.createFeature = function createFeature(config) {
	    return this.layerConfigurator_.getFactory().createFeature(config);
	  };

	  /**
	   * Removes a layer from the map
	   * @param {ol.layer.Base} layer
	   */


	  API.prototype.removeLayer = function removeLayer(layer) {
	    this.map_.getLayerGroup().removeLayer(layer);
	  };

	  return API;
	}(_openlayers2.default.Object);

/***/ },
/* 433 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _openlayers = __webpack_require__(77);

	var _openlayers2 = _interopRequireDefault(_openlayers);

	var _jquery = __webpack_require__(78);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * extends the openlayers ol.Object class. Waits till a property is set to a specific value and calls the given
	 * callback function. If the value already has the desired value the callback is called immediately.
	 * @param {string} propName
	 * @param {*} value
	 * @param {function} cb
	 */
	_openlayers2.default.Object.prototype.asSoonAs = function (propName, value, cb) {
	  var _this = this;

	  if (!_jquery2.default.isFunction(cb)) {
	    throw new Error('You need to provide a callback to asSoonAs.');
	  }
	  if (this.get(propName) === value) {
	    // run callback
	    cb();
	  } else {
	    this.once('change:' + propName, function () {
	      // recursive call
	      _this.asSoonAs(propName, value, cb);
	    });
	  }
	};

/***/ },
/* 434 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.L10N = undefined;

	var _classCallCheck2 = __webpack_require__(119);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _jquery = __webpack_require__(78);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _stripJsonComments = __webpack_require__(129);

	var _stripJsonComments2 = _interopRequireDefault(_stripJsonComments);

	var _Debug = __webpack_require__(151);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @typedef {Object.<string, string>|string} Localizable
	 */

	/**
	 * @typedef {object} L10NOptions
	 * @property {string} [defaultLanguage='en']
	 * @property {string} [currentLanguage]
	 * @property {string} [languageFile='files/l10n.commented.json']
	 * @property {string[]} [availableLanguages]
	 */

	/**
	 * This class localizes texts by either selecting one from a dictionary (asynchron loaded JSON File) or choosing the
	 * right string from a selection.
	 */
	var L10N = exports.L10N = function () {
	  /**
	   * @param {L10NOptions} options
	   */
	  function L10N() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    (0, _classCallCheck3.default)(this, L10N);

	    /**
	     * @type {string}
	     * @private
	     */
	    this.defaultLang_ = options.defaultLanguage || 'en';

	    /**
	     * @type {string}
	     * @private
	     */
	    this.currentLang_ = options.currentLanguage || this.defaultLang_;

	    /**
	     * @type {string}
	     * @private
	     */
	    this.languageFile_ = options.languageFile || 'files/l10n.commented.json';

	    if (options.availableLanguages) {
	      /**
	       * @type {string[]}
	       * @private
	       */
	      this.availableLanguages_ = options.availableLanguages;
	    } else {
	      this.availableLanguages_ = [this.currentLang_];
	      if (this.currentLang_ !== this.defaultLang_) {
	        this.availableLanguages_.push(this.defaultLang_);
	      }
	    }
	  }

	  /**
	   * @returns {string[]}
	   */


	  L10N.prototype.getAvailableLanguages = function getAvailableLanguages() {
	    return this.availableLanguages_;
	  };

	  /**
	   * @param {string[]} languages
	   */


	  L10N.prototype.setAvailableLanguages = function setAvailableLanguages(languages) {
	    this.availableLanguages_ = languages;
	  };

	  /**
	   * Loads the language file. This function is called manually from outside to be abel to pass in a callback.
	   */


	  L10N.prototype.ajaxGetLanguageFile = function ajaxGetLanguageFile() {
	    var _this = this;

	    return _jquery2.default.ajax({
	      type: 'GET',
	      url: this.languageFile_,
	      dataType: 'text',
	      success: function success(data) {
	        _this.dictionary = JSON.parse((0, _stripJsonComments2.default)(data));
	      },
	      error: function error() {
	        // The arguments are ignored
	        _Debug.Debug.error('The language file ' + _this.languageFile_ + ' couldn\'t be loaded or parsed');
	      }
	    });
	  };

	  /**
	   * Select language string. Note that this routine throws an error if there is no fitting string. Method to obtain the
	   *    fitting string:
	   * 1. If there is no data, an 'Unable to obtain localization' error is thrown.
	   * 2. If data is a string, that string is returned.
	   * 3. If language is given and present in data, the string value for langage is returned.
	   * 4. As a last resort the default language is tried. If it does, that value is returned.
	   * 5. If still no string was found at this point, an 'Unable to obtain localization' error is thrown.
	   * @property {Localizable} data
	   * @returns {string} a (presumably localised) string
	   */


	  L10N.prototype.selectL10N = function selectL10N(data) {
	    if (data) {
	      if (typeof data === 'string') {
	        // Only a generic string is available
	        return data;
	      } else {
	        // an object is available
	        if (this.currentLang_ in data) {
	          // current language available
	          return data[this.currentLang_];
	        } else if (this.defaultLang_ in data) {
	          // default language as a last resort
	          return data[this.defaultLang_];
	        } else {
	          _Debug.Debug.error('Unable to obtain localization');
	        }
	      }
	    }
	  };

	  /**
	   * Localise identifier using given dictionary. Throws an error if identifier is not in dictionary. Relies on
	   * selectL10N to select actual localisation.
	   * @param {string} identifier
	   * @param {boolean} silent if an error message should be printed if the text is not found in the dictionary
	   * @returns {string} a (presumably localised) string
	   */


	  L10N.prototype.localiseUsingDictionary = function localiseUsingDictionary(identifier) {
	    var silent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	    if (identifier in this.dictionary) {
	      return this.selectL10N(this.dictionary[identifier]);
	    } else if (!silent) {
	      _Debug.Debug.error('Cannot localise \'' + identifier + '\': Not in dictionary');
	    }
	  };

	  /**
	   * @param {string} lang
	   */


	  L10N.prototype.setCurrentLang = function setCurrentLang(lang) {
	    this.currentLang_ = lang;
	  };

	  /**
	   *
	   * @returns {string|*}
	   */


	  L10N.prototype.getCurrentLang = function getCurrentLang() {
	    return this.currentLang_;
	  };

	  L10N.prototype.getDefaultLang = function getDefaultLang() {
	    return this.defaultLang_;
	  };

	  return L10N;
	}();

/***/ },
/* 435 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//
	// Hard coded default configuration for the client
	//

	// Element is a Keyword for the composition of config objects. Every attribute with 'Element' in its name
	// isn't copied but used as a default case for elements of an array with the same name (-Element)

	var defaults = exports.defaults = {};

	defaults.baselayer = {
	  title: {
	    'de': 'Standardtitel',
	    'en': 'Default title'
	  },
	  type: 'OSM',
	  source: {
	    projection: 'EPSG:3857',
	    url: {
	      'de': '//{a-c}.tile.openstreetmap.de/tiles/osmde//{z}/{x}/{y}.png',
	      'en': '//{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
	    },
	    attribution: {
	      'de': 'Karte von <a target="_blank" href="http://www.openstreetmap.org/">OpenStreetMap</a>, ' + 'Lizenz: <a target="_blank" href="http://opendatacommons.org/licenses/odbl/">ODbL</a>',
	      'en': 'Map from <a target="_blank" href="http://www.openstreetmap.org/">OpenStreetMap</a>, ' + 'licence: <a target="_blank" href="http://opendatacommons.org/licenses/odbl/">ODbL</a>'
	    }
	  }
	};

	defaults.config = {
	  target: '#g4u-map',
	  interfaceProjection: 'EPSG:4326',
	  view: {
	    center: [7.086134, 50.714689], // always in interfaceProjection
	    zoom: 18,
	    minZoom: 0,
	    maxZoom: 18
	  },
	  layers: {
	    // baselayers
	    baseLayers: [{
	      // this default-case only comes into action if there is NO baselayer defined
	      id: 0,
	      title: defaults.baselayer.title,
	      type: defaults.baselayer.type,
	      source: {
	        projection: defaults.baselayer.source.projection,
	        url: defaults.baselayer.source.url,
	        attribution: defaults.baselayer.source.attribution
	      },
	      visible: true
	    }],
	    featureLayers: [], // this default-case only comes into action if there is NO featurelayer defined
	    featureLayersElement: {
	      // these are the default values for the properties of every featurelayer defined
	      title: 'Default title',
	      type: 'KML',
	      source: {
	        loadingStrategy: 'ALL'
	      }
	    }
	  },
	  // (standard-) controls
	  controls: {},
	  move: {
	    animationDuration: 2000,
	    pixelPadding: 60,
	    meterMinSize: 300
	  },
	  styleMap: {
	    '#defaultStyle': {
	      fill: {
	        color: 'rgba(0,0,0,0)'
	      },
	      stroke: {
	        color: 'rgba(255,255,255,1)',
	        width: 2
	      },
	      circle: {
	        radius: 5,
	        fill: {
	          color: 'rgba(0,0,0,0)'
	        },
	        stroke: {
	          color: 'rgba(255,255,255,1)',
	          width: 2
	        }
	      }
	    }
	  }
	};

/***/ },
/* 436 */
200,
/* 437 */,
/* 438 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "conf/client.commented.json";

/***/ },
/* 439 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "conf/layers.commented.json";

/***/ },
/* 440 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "files/l10n.json";

/***/ }
/******/ ])))
});
;