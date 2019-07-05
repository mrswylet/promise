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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;

/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */

function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;

/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;

/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);
  config.method = config.method ? config.method.toLowerCase() : 'get';

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;

/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");
var isAbsoluteURL = __webpack_require__(/*! ./../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ./../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(config.data, config.headers, config.transformRequest);

  // Flatten headers
  config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers || {});

  utils.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {
    delete config.headers[method];
  });

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(response.data, response.headers, config.transformResponse);

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(reason.response.data, reason.response.headers, config.transformResponse);
      }
    }

    return Promise.reject(reason);
  });
};

/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */

module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function () {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};

/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  utils.forEach(['url', 'method', 'params', 'data'], function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(['headers', 'auth', 'proxy'], function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach(['baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer', 'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName', 'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'maxContentLength', 'validateStatus', 'maxRedirects', 'httpAgent', 'httpsAgent', 'cancelToken', 'socketPath'], function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};

/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError('Request failed with status code ' + response.status, response.config, null, response.request, response));
  }
};

/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};

/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  // Only Node.JS has a process variable that is of [[Class]] process
  if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) {/* Ignore */}
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */

module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = utils.isStandardBrowserEnv() ?

// Standard browser envs support document.cookie
function standardBrowserEnv() {
  return {
    write: function write(name, value, expires, path, domain, secure) {
      var cookie = [];
      cookie.push(name + '=' + encodeURIComponent(value));

      if (utils.isNumber(expires)) {
        cookie.push('expires=' + new Date(expires).toGMTString());
      }

      if (utils.isString(path)) {
        cookie.push('path=' + path);
      }

      if (utils.isString(domain)) {
        cookie.push('domain=' + domain);
      }

      if (secure === true) {
        cookie.push('secure');
      }

      document.cookie = cookie.join('; ');
    },

    read: function read(name) {
      var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
      return match ? decodeURIComponent(match[3]) : null;
    },

    remove: function remove(name) {
      this.write(name, '', Date.now() - 86400000);
    }
  };
}() :

// Non standard browser env (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return {
    write: function write() {},
    read: function read() {
      return null;
    },
    remove: function remove() {}
  };
}();

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */

module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return (/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
  );
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = utils.isStandardBrowserEnv() ?

// Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
function standardBrowserEnv() {
  var msie = /(msie|trident)/i.test(navigator.userAgent);
  var urlParsingNode = document.createElement('a');
  var originURL;

  /**
  * Parse a URL to discover it's components
  *
  * @param {String} url The URL to be parsed
  * @returns {Object}
  */
  function resolveURL(url) {
    var href = url;

    if (msie) {
      // IE needs attribute set twice to normalize properties
      urlParsingNode.setAttribute('href', href);
      href = urlParsingNode.href;
    }

    urlParsingNode.setAttribute('href', href);

    // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
    return {
      href: urlParsingNode.href,
      protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
      host: urlParsingNode.host,
      search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
      hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
      hostname: urlParsingNode.hostname,
      port: urlParsingNode.port,
      pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
    };
  }

  originURL = resolveURL(window.location.href);

  /**
  * Determine if a URL shares the same origin as the current location
  *
  * @param {String} requestURL The URL to test
  * @returns {boolean} True if URL shares the same origin, otherwise false
  */
  return function isURLSameOrigin(requestURL) {
    var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
    return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
  };
}() :

// Non standard browser envs (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return function isURLSameOrigin() {
    return true;
  };
}();

/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = ['age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since', 'last-modified', 'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent'];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) {
    return parsed;
  }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */

module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var isBuffer = __webpack_require__(/*! is-buffer */ "./node_modules/is-buffer/index.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return typeof FormData !== 'undefined' && val instanceof FormData;
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && val.buffer instanceof ArrayBuffer;
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' || navigator.product === 'NativeScript' || navigator.product === 'NS')) {
    return false;
  }
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge() /* obj1, obj2, obj3, ... */{
  var result = {};
  function assignValue(val, key) {
    if (_typeof(result[key]) === 'object' && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge() /* obj1, obj2, obj3, ... */{
  var result = {};
  function assignValue(val, key) {
    if (_typeof(result[key]) === 'object' && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};

/***/ }),

/***/ "./node_modules/is-buffer/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

module.exports = function isBuffer(obj) {
  return obj != null && obj.constructor != null && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj);
};

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getFeedback = __webpack_require__(/*! ./js/modules/getFeedback */ "./src/js/modules/getFeedback.js");

(0, _getFeedback.getFeedback)(); //import './scss/bootstrap/bootstrap.scss'
//import './scss/style.scss'

/***/ }),

/***/ "./src/js/modules/getFeedback.js":
/*!***************************************!*\
  !*** ./src/js/modules/getFeedback.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getFeedback(service) {
	return new Promise(function (fulfill, reject) {
		_axios2.default.get('/feedback_list.json').then(function (response) {

			if (response.status !== 200) {
				reject(response.statusText);
			} else {
				var data = response.data;
				debugger;
				var data_sort = quickSortArrOjb(data, 'date');

				var users_id_list = getArrListForObjKeys(data, 'user_id');
			}
		});
	});
}

module.exports = { getFeedback: getFeedback };

/**
 * Получение
 * @param arr_obj
 * @param key
 */
function getArrListForObjKeys(arr_obj, key) {}

/**
 * Сортировка массива объектов arr_obj по ключу key
 * @param arr_obj
 * @param key
 * @return {*}
 */
function quickSortArrObj(arr_obj, key) {

	if (arr_obj.length < 2) {
		return arr_obj;
	}

	var reference_index = Math.ceil(arr_obj.length / 2) - 1;
	var reference_value = arr_obj[reference_index][key];

	var previous = [];
	arr_obj.forEach(function (value, index) {
		if (index === reference_index) {
			return;
		}

		if (value[key] < reference_value) {
			previous.push(value);
		}
	});

	var next = [];
	arr_obj.forEach(function (value, index) {
		if (index === reference_index) {
			return;
		}

		if (value[key] >= reference_value) {
			next.push(value);
		}
	});

	return quickSortArrOjb(previous, key).concat(arr_obj[reference_index], quickSortArrOjb(next, key));
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9jcmVhdGVFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9lbmhhbmNlRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL21lcmdlQ29uZmlnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3RyYW5zZm9ybURhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYmluZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3ByZWFkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2lzLWJ1ZmZlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbW9kdWxlcy9nZXRGZWVkYmFjay5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwicmVxdWlyZSIsInV0aWxzIiwic2V0dGxlIiwiYnVpbGRVUkwiLCJwYXJzZUhlYWRlcnMiLCJpc1VSTFNhbWVPcmlnaW4iLCJjcmVhdGVFcnJvciIsInhockFkYXB0ZXIiLCJjb25maWciLCJQcm9taXNlIiwiZGlzcGF0Y2hYaHJSZXF1ZXN0IiwicmVzb2x2ZSIsInJlamVjdCIsInJlcXVlc3REYXRhIiwiZGF0YSIsInJlcXVlc3RIZWFkZXJzIiwiaGVhZGVycyIsImlzRm9ybURhdGEiLCJyZXF1ZXN0IiwiWE1MSHR0cFJlcXVlc3QiLCJhdXRoIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsIkF1dGhvcml6YXRpb24iLCJidG9hIiwib3BlbiIsIm1ldGhvZCIsInRvVXBwZXJDYXNlIiwidXJsIiwicGFyYW1zIiwicGFyYW1zU2VyaWFsaXplciIsInRpbWVvdXQiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJoYW5kbGVMb2FkIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsInJlc3BvbnNlVVJMIiwiaW5kZXhPZiIsInJlc3BvbnNlSGVhZGVycyIsImdldEFsbFJlc3BvbnNlSGVhZGVycyIsInJlc3BvbnNlRGF0YSIsInJlc3BvbnNlVHlwZSIsInJlc3BvbnNlVGV4dCIsInJlc3BvbnNlIiwic3RhdHVzVGV4dCIsIm9uYWJvcnQiLCJoYW5kbGVBYm9ydCIsIm9uZXJyb3IiLCJoYW5kbGVFcnJvciIsIm9udGltZW91dCIsImhhbmRsZVRpbWVvdXQiLCJpc1N0YW5kYXJkQnJvd3NlckVudiIsImNvb2tpZXMiLCJ4c3JmVmFsdWUiLCJ3aXRoQ3JlZGVudGlhbHMiLCJ4c3JmQ29va2llTmFtZSIsInJlYWQiLCJ1bmRlZmluZWQiLCJ4c3JmSGVhZGVyTmFtZSIsImZvckVhY2giLCJzZXRSZXF1ZXN0SGVhZGVyIiwidmFsIiwia2V5IiwidG9Mb3dlckNhc2UiLCJlIiwib25Eb3dubG9hZFByb2dyZXNzIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uVXBsb2FkUHJvZ3Jlc3MiLCJ1cGxvYWQiLCJjYW5jZWxUb2tlbiIsInByb21pc2UiLCJ0aGVuIiwib25DYW5jZWxlZCIsImNhbmNlbCIsImFib3J0Iiwic2VuZCIsImJpbmQiLCJBeGlvcyIsIm1lcmdlQ29uZmlnIiwiZGVmYXVsdHMiLCJjcmVhdGVJbnN0YW5jZSIsImRlZmF1bHRDb25maWciLCJjb250ZXh0IiwiaW5zdGFuY2UiLCJwcm90b3R5cGUiLCJleHRlbmQiLCJheGlvcyIsImNyZWF0ZSIsImluc3RhbmNlQ29uZmlnIiwiQ2FuY2VsIiwiQ2FuY2VsVG9rZW4iLCJpc0NhbmNlbCIsImFsbCIsInByb21pc2VzIiwic3ByZWFkIiwiZGVmYXVsdCIsIm1lc3NhZ2UiLCJ0b1N0cmluZyIsIl9fQ0FOQ0VMX18iLCJleGVjdXRvciIsIlR5cGVFcnJvciIsInJlc29sdmVQcm9taXNlIiwicHJvbWlzZUV4ZWN1dG9yIiwidG9rZW4iLCJyZWFzb24iLCJ0aHJvd0lmUmVxdWVzdGVkIiwic291cmNlIiwiYyIsInZhbHVlIiwiSW50ZXJjZXB0b3JNYW5hZ2VyIiwiZGlzcGF0Y2hSZXF1ZXN0IiwiaW50ZXJjZXB0b3JzIiwiYXJndW1lbnRzIiwiY2hhaW4iLCJ1bnNoaWZ0UmVxdWVzdEludGVyY2VwdG9ycyIsImludGVyY2VwdG9yIiwidW5zaGlmdCIsImZ1bGZpbGxlZCIsInJlamVjdGVkIiwicHVzaFJlc3BvbnNlSW50ZXJjZXB0b3JzIiwicHVzaCIsImxlbmd0aCIsInNoaWZ0IiwiZ2V0VXJpIiwicmVwbGFjZSIsImZvckVhY2hNZXRob2ROb0RhdGEiLCJtZXJnZSIsImZvckVhY2hNZXRob2RXaXRoRGF0YSIsImhhbmRsZXJzIiwidXNlIiwiZWplY3QiLCJpZCIsImZuIiwiZm9yRWFjaEhhbmRsZXIiLCJoIiwiZW5oYW5jZUVycm9yIiwiY29kZSIsImVycm9yIiwiRXJyb3IiLCJ0cmFuc2Zvcm1EYXRhIiwiaXNBYnNvbHV0ZVVSTCIsImNvbWJpbmVVUkxzIiwidGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZCIsImJhc2VVUkwiLCJ0cmFuc2Zvcm1SZXF1ZXN0IiwiY29tbW9uIiwiY2xlYW5IZWFkZXJDb25maWciLCJhZGFwdGVyIiwib25BZGFwdGVyUmVzb2x1dGlvbiIsInRyYW5zZm9ybVJlc3BvbnNlIiwib25BZGFwdGVyUmVqZWN0aW9uIiwiaXNBeGlvc0Vycm9yIiwidG9KU09OIiwibmFtZSIsImRlc2NyaXB0aW9uIiwibnVtYmVyIiwiZmlsZU5hbWUiLCJsaW5lTnVtYmVyIiwiY29sdW1uTnVtYmVyIiwic3RhY2siLCJjb25maWcxIiwiY29uZmlnMiIsInZhbHVlRnJvbUNvbmZpZzIiLCJwcm9wIiwibWVyZ2VEZWVwUHJvcGVydGllcyIsImlzT2JqZWN0IiwiZGVlcE1lcmdlIiwiZGVmYXVsdFRvQ29uZmlnMiIsInZhbGlkYXRlU3RhdHVzIiwiZm5zIiwidHJhbnNmb3JtIiwibm9ybWFsaXplSGVhZGVyTmFtZSIsIkRFRkFVTFRfQ09OVEVOVF9UWVBFIiwic2V0Q29udGVudFR5cGVJZlVuc2V0IiwiaXNVbmRlZmluZWQiLCJnZXREZWZhdWx0QWRhcHRlciIsInByb2Nlc3MiLCJPYmplY3QiLCJjYWxsIiwiaXNBcnJheUJ1ZmZlciIsImlzQnVmZmVyIiwiaXNTdHJlYW0iLCJpc0ZpbGUiLCJpc0Jsb2IiLCJpc0FycmF5QnVmZmVyVmlldyIsImJ1ZmZlciIsImlzVVJMU2VhcmNoUGFyYW1zIiwiSlNPTiIsInN0cmluZ2lmeSIsInBhcnNlIiwibWF4Q29udGVudExlbmd0aCIsInRoaXNBcmciLCJ3cmFwIiwiYXJncyIsIkFycmF5IiwiaSIsImFwcGx5IiwiZW5jb2RlIiwiZW5jb2RlVVJJQ29tcG9uZW50Iiwic2VyaWFsaXplZFBhcmFtcyIsInBhcnRzIiwic2VyaWFsaXplIiwiaXNBcnJheSIsInBhcnNlVmFsdWUiLCJ2IiwiaXNEYXRlIiwidG9JU09TdHJpbmciLCJqb2luIiwiaGFzaG1hcmtJbmRleCIsInNsaWNlIiwicmVsYXRpdmVVUkwiLCJzdGFuZGFyZEJyb3dzZXJFbnYiLCJ3cml0ZSIsImV4cGlyZXMiLCJwYXRoIiwiZG9tYWluIiwic2VjdXJlIiwiY29va2llIiwiaXNOdW1iZXIiLCJEYXRlIiwidG9HTVRTdHJpbmciLCJpc1N0cmluZyIsImRvY3VtZW50IiwibWF0Y2giLCJSZWdFeHAiLCJkZWNvZGVVUklDb21wb25lbnQiLCJyZW1vdmUiLCJub3ciLCJub25TdGFuZGFyZEJyb3dzZXJFbnYiLCJ0ZXN0IiwibXNpZSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsInVybFBhcnNpbmdOb2RlIiwiY3JlYXRlRWxlbWVudCIsIm9yaWdpblVSTCIsInJlc29sdmVVUkwiLCJocmVmIiwic2V0QXR0cmlidXRlIiwicHJvdG9jb2wiLCJob3N0Iiwic2VhcmNoIiwiaGFzaCIsImhvc3RuYW1lIiwicG9ydCIsInBhdGhuYW1lIiwiY2hhckF0Iiwid2luZG93IiwibG9jYXRpb24iLCJyZXF1ZXN0VVJMIiwicGFyc2VkIiwibm9ybWFsaXplZE5hbWUiLCJwcm9jZXNzSGVhZGVyIiwiaWdub3JlRHVwbGljYXRlT2YiLCJzcGxpdCIsInBhcnNlciIsImxpbmUiLCJ0cmltIiwic3Vic3RyIiwiY29uY2F0IiwiY2FsbGJhY2siLCJhcnIiLCJGb3JtRGF0YSIsInJlc3VsdCIsIkFycmF5QnVmZmVyIiwiaXNWaWV3IiwiaXNGdW5jdGlvbiIsInBpcGUiLCJVUkxTZWFyY2hQYXJhbXMiLCJzdHIiLCJwcm9kdWN0Iiwib2JqIiwibCIsImhhc093blByb3BlcnR5IiwiYXNzaWduVmFsdWUiLCJhIiwiYiIsImNvbnN0cnVjdG9yIiwiY2FjaGVkU2V0VGltZW91dCIsImNhY2hlZENsZWFyVGltZW91dCIsImRlZmF1bHRTZXRUaW1vdXQiLCJkZWZhdWx0Q2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsImNsZWFyVGltZW91dCIsInJ1blRpbWVvdXQiLCJmdW4iLCJydW5DbGVhclRpbWVvdXQiLCJtYXJrZXIiLCJxdWV1ZSIsImRyYWluaW5nIiwiY3VycmVudFF1ZXVlIiwicXVldWVJbmRleCIsImNsZWFuVXBOZXh0VGljayIsImRyYWluUXVldWUiLCJsZW4iLCJydW4iLCJuZXh0VGljayIsIkl0ZW0iLCJhcnJheSIsInRpdGxlIiwiYnJvd3NlciIsImVudiIsImFyZ3YiLCJ2ZXJzaW9uIiwidmVyc2lvbnMiLCJub29wIiwib24iLCJhZGRMaXN0ZW5lciIsIm9uY2UiLCJvZmYiLCJyZW1vdmVMaXN0ZW5lciIsInJlbW92ZUFsbExpc3RlbmVycyIsImVtaXQiLCJwcmVwZW5kTGlzdGVuZXIiLCJwcmVwZW5kT25jZUxpc3RlbmVyIiwibGlzdGVuZXJzIiwiYmluZGluZyIsImN3ZCIsImNoZGlyIiwiZGlyIiwidW1hc2siLCJnZXRGZWVkYmFjayIsInNlcnZpY2UiLCJmdWxmaWxsIiwiZ2V0IiwiZGF0YV9zb3J0IiwicXVpY2tTb3J0QXJyT2piIiwidXNlcnNfaWRfbGlzdCIsImdldEFyckxpc3RGb3JPYmpLZXlzIiwiYXJyX29iaiIsInF1aWNrU29ydEFyck9iaiIsInJlZmVyZW5jZV9pbmRleCIsIk1hdGgiLCJjZWlsIiwicmVmZXJlbmNlX3ZhbHVlIiwicHJldmlvdXMiLCJpbmRleCIsIm5leHQiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQUEsT0FBT0MsT0FBUCxHQUFpQkMsbUJBQU9BLENBQUMsc0RBQVIsQ0FBakIsQzs7Ozs7Ozs7Ozs7O0FDQWE7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LFNBQVE5USxPQUFSLENBQWdCLFVBQVVpRCxLQUFWLEVBQWlCb08sS0FBakIsRUFBd0I7QUFDdkMsTUFBR0EsVUFBVUwsZUFBYixFQUE2QjtBQUM1QjtBQUNBOztBQUVELE1BQUcvTixNQUFNOUMsR0FBTixJQUFhZ1IsZUFBaEIsRUFBZ0M7QUFDL0JDLFlBQVN2TixJQUFULENBQWNaLEtBQWQ7QUFDQTtBQUNELEVBUkQ7O0FBVUEsS0FBSXFPLE9BQU8sRUFBWDtBQUNBUixTQUFROVEsT0FBUixDQUFnQixVQUFVaUQsS0FBVixFQUFpQm9PLEtBQWpCLEVBQXdCO0FBQ3ZDLE1BQUdBLFVBQVVMLGVBQWIsRUFBNkI7QUFDNUI7QUFDQTs7QUFFRCxNQUFHL04sTUFBTTlDLEdBQU4sS0FBY2dSLGVBQWpCLEVBQWlDO0FBQ2hDRyxRQUFLek4sSUFBTCxDQUFVWixLQUFWO0FBQ0E7QUFDRCxFQVJEOztBQVVBLFFBQU8wTixnQkFBZ0JTLFFBQWhCLEVBQTBCalIsR0FBMUIsRUFBK0JxTSxNQUEvQixDQUFzQ3NFLFFBQVFFLGVBQVIsQ0FBdEMsRUFBZ0VMLGdCQUFnQlcsSUFBaEIsRUFBc0JuUixHQUF0QixDQUFoRSxDQUFQO0FBQ0EsQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2F4aW9zJyk7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgc2V0dGxlID0gcmVxdWlyZSgnLi8uLi9jb3JlL3NldHRsZScpO1xudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG52YXIgcGFyc2VIZWFkZXJzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL3BhcnNlSGVhZGVycycpO1xudmFyIGlzVVJMU2FtZU9yaWdpbiA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9pc1VSTFNhbWVPcmlnaW4nKTtcbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4uL2NvcmUvY3JlYXRlRXJyb3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB4aHJBZGFwdGVyKGNvbmZpZykge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gZGlzcGF0Y2hYaHJSZXF1ZXN0KHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhciByZXF1ZXN0RGF0YSA9IGNvbmZpZy5kYXRhO1xuICAgIHZhciByZXF1ZXN0SGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzO1xuXG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEocmVxdWVzdERhdGEpKSB7XG4gICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddOyAvLyBMZXQgdGhlIGJyb3dzZXIgc2V0IGl0XG4gICAgfVxuXG4gICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgIC8vIEhUVFAgYmFzaWMgYXV0aGVudGljYXRpb25cbiAgICBpZiAoY29uZmlnLmF1dGgpIHtcbiAgICAgIHZhciB1c2VybmFtZSA9IGNvbmZpZy5hdXRoLnVzZXJuYW1lIHx8ICcnO1xuICAgICAgdmFyIHBhc3N3b3JkID0gY29uZmlnLmF1dGgucGFzc3dvcmQgfHwgJyc7XG4gICAgICByZXF1ZXN0SGVhZGVycy5BdXRob3JpemF0aW9uID0gJ0Jhc2ljICcgKyBidG9hKHVzZXJuYW1lICsgJzonICsgcGFzc3dvcmQpO1xuICAgIH1cblxuICAgIHJlcXVlc3Qub3Blbihjb25maWcubWV0aG9kLnRvVXBwZXJDYXNlKCksIGJ1aWxkVVJMKGNvbmZpZy51cmwsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKSwgdHJ1ZSk7XG5cbiAgICAvLyBTZXQgdGhlIHJlcXVlc3QgdGltZW91dCBpbiBNU1xuICAgIHJlcXVlc3QudGltZW91dCA9IGNvbmZpZy50aW1lb3V0O1xuXG4gICAgLy8gTGlzdGVuIGZvciByZWFkeSBzdGF0ZVxuICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCB8fCByZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBUaGUgcmVxdWVzdCBlcnJvcmVkIG91dCBhbmQgd2UgZGlkbid0IGdldCBhIHJlc3BvbnNlLCB0aGlzIHdpbGwgYmVcbiAgICAgIC8vIGhhbmRsZWQgYnkgb25lcnJvciBpbnN0ZWFkXG4gICAgICAvLyBXaXRoIG9uZSBleGNlcHRpb246IHJlcXVlc3QgdGhhdCB1c2luZyBmaWxlOiBwcm90b2NvbCwgbW9zdCBicm93c2Vyc1xuICAgICAgLy8gd2lsbCByZXR1cm4gc3RhdHVzIGFzIDAgZXZlbiB0aG91Z2ggaXQncyBhIHN1Y2Nlc3NmdWwgcmVxdWVzdFxuICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAwICYmICEocmVxdWVzdC5yZXNwb25zZVVSTCAmJiByZXF1ZXN0LnJlc3BvbnNlVVJMLmluZGV4T2YoJ2ZpbGU6JykgPT09IDApKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gUHJlcGFyZSB0aGUgcmVzcG9uc2VcbiAgICAgIHZhciByZXNwb25zZUhlYWRlcnMgPSAnZ2V0QWxsUmVzcG9uc2VIZWFkZXJzJyBpbiByZXF1ZXN0ID8gcGFyc2VIZWFkZXJzKHJlcXVlc3QuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpIDogbnVsbDtcbiAgICAgIHZhciByZXNwb25zZURhdGEgPSAhY29uZmlnLnJlc3BvbnNlVHlwZSB8fCBjb25maWcucmVzcG9uc2VUeXBlID09PSAndGV4dCcgPyByZXF1ZXN0LnJlc3BvbnNlVGV4dCA6IHJlcXVlc3QucmVzcG9uc2U7XG4gICAgICB2YXIgcmVzcG9uc2UgPSB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgc3RhdHVzOiByZXF1ZXN0LnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVxdWVzdC5zdGF0dXNUZXh0LFxuICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICByZXF1ZXN0OiByZXF1ZXN0XG4gICAgICB9O1xuXG4gICAgICBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgYnJvd3NlciByZXF1ZXN0IGNhbmNlbGxhdGlvbiAoYXMgb3Bwb3NlZCB0byBhIG1hbnVhbCBjYW5jZWxsYXRpb24pXG4gICAgcmVxdWVzdC5vbmFib3J0ID0gZnVuY3Rpb24gaGFuZGxlQWJvcnQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ1JlcXVlc3QgYWJvcnRlZCcsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBsb3cgbGV2ZWwgbmV0d29yayBlcnJvcnNcbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcigpIHtcbiAgICAgIC8vIFJlYWwgZXJyb3JzIGFyZSBoaWRkZW4gZnJvbSB1cyBieSB0aGUgYnJvd3NlclxuICAgICAgLy8gb25lcnJvciBzaG91bGQgb25seSBmaXJlIGlmIGl0J3MgYSBuZXR3b3JrIGVycm9yXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBjb25maWcsIG51bGwsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSB0aW1lb3V0XG4gICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCd0aW1lb3V0IG9mICcgKyBjb25maWcudGltZW91dCArICdtcyBleGNlZWRlZCcsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsXG4gICAgICAgIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgIC8vIFRoaXMgaXMgb25seSBkb25lIGlmIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50LlxuICAgIC8vIFNwZWNpZmljYWxseSBub3QgaWYgd2UncmUgaW4gYSB3ZWIgd29ya2VyLCBvciByZWFjdC1uYXRpdmUuXG4gICAgaWYgKHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkpIHtcbiAgICAgIHZhciBjb29raWVzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2Nvb2tpZXMnKTtcblxuICAgICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgICB2YXIgeHNyZlZhbHVlID0gKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMgfHwgaXNVUkxTYW1lT3JpZ2luKGNvbmZpZy51cmwpKSAmJiBjb25maWcueHNyZkNvb2tpZU5hbWUgP1xuICAgICAgICBjb29raWVzLnJlYWQoY29uZmlnLnhzcmZDb29raWVOYW1lKSA6XG4gICAgICAgIHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHhzcmZWYWx1ZSkge1xuICAgICAgICByZXF1ZXN0SGVhZGVyc1tjb25maWcueHNyZkhlYWRlck5hbWVdID0geHNyZlZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFkZCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0XG4gICAgaWYgKCdzZXRSZXF1ZXN0SGVhZGVyJyBpbiByZXF1ZXN0KSB7XG4gICAgICB1dGlscy5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVxdWVzdERhdGEgPT09ICd1bmRlZmluZWQnICYmIGtleS50b0xvd2VyQ2FzZSgpID09PSAnY29udGVudC10eXBlJykge1xuICAgICAgICAgIC8vIFJlbW92ZSBDb250ZW50LVR5cGUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgICAgICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBPdGhlcndpc2UgYWRkIGhlYWRlciB0byB0aGUgcmVxdWVzdFxuICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEFkZCB3aXRoQ3JlZGVudGlhbHMgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoY29uZmlnLndpdGhDcmVkZW50aWFscykge1xuICAgICAgcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIEFkZCByZXNwb25zZVR5cGUgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBjb25maWcucmVzcG9uc2VUeXBlO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBFeHBlY3RlZCBET01FeGNlcHRpb24gdGhyb3duIGJ5IGJyb3dzZXJzIG5vdCBjb21wYXRpYmxlIFhNTEh0dHBSZXF1ZXN0IExldmVsIDIuXG4gICAgICAgIC8vIEJ1dCwgdGhpcyBjYW4gYmUgc3VwcHJlc3NlZCBmb3IgJ2pzb24nIHR5cGUgYXMgaXQgY2FuIGJlIHBhcnNlZCBieSBkZWZhdWx0ICd0cmFuc2Zvcm1SZXNwb25zZScgZnVuY3Rpb24uXG4gICAgICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlICE9PSAnanNvbicpIHtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHByb2dyZXNzIGlmIG5lZWRlZFxuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIC8vIE5vdCBhbGwgYnJvd3NlcnMgc3VwcG9ydCB1cGxvYWQgZXZlbnRzXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25VcGxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJyAmJiByZXF1ZXN0LnVwbG9hZCkge1xuICAgICAgcmVxdWVzdC51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25VcGxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgICAgLy8gSGFuZGxlIGNhbmNlbGxhdGlvblxuICAgICAgY29uZmlnLmNhbmNlbFRva2VuLnByb21pc2UudGhlbihmdW5jdGlvbiBvbkNhbmNlbGVkKGNhbmNlbCkge1xuICAgICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZXF1ZXN0LmFib3J0KCk7XG4gICAgICAgIHJlamVjdChjYW5jZWwpO1xuICAgICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHJlcXVlc3REYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlcXVlc3REYXRhID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBTZW5kIHRoZSByZXF1ZXN0XG4gICAgcmVxdWVzdC5zZW5kKHJlcXVlc3REYXRhKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG52YXIgQXhpb3MgPSByZXF1aXJlKCcuL2NvcmUvQXhpb3MnKTtcbnZhciBtZXJnZUNvbmZpZyA9IHJlcXVpcmUoJy4vY29yZS9tZXJnZUNvbmZpZycpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0Q29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdENvbmZpZykge1xuICB2YXIgY29udGV4dCA9IG5ldyBBeGlvcyhkZWZhdWx0Q29uZmlnKTtcbiAgdmFyIGluc3RhbmNlID0gYmluZChBeGlvcy5wcm90b3R5cGUucmVxdWVzdCwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBheGlvcy5wcm90b3R5cGUgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBBeGlvcy5wcm90b3R5cGUsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgY29udGV4dCB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIGNvbnRleHQpO1xuXG4gIHJldHVybiBpbnN0YW5jZTtcbn1cblxuLy8gQ3JlYXRlIHRoZSBkZWZhdWx0IGluc3RhbmNlIHRvIGJlIGV4cG9ydGVkXG52YXIgYXhpb3MgPSBjcmVhdGVJbnN0YW5jZShkZWZhdWx0cyk7XG5cbi8vIEV4cG9zZSBBeGlvcyBjbGFzcyB0byBhbGxvdyBjbGFzcyBpbmhlcml0YW5jZVxuYXhpb3MuQXhpb3MgPSBBeGlvcztcblxuLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xuYXhpb3MuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGluc3RhbmNlQ29uZmlnKSB7XG4gIHJldHVybiBjcmVhdGVJbnN0YW5jZShtZXJnZUNvbmZpZyhheGlvcy5kZWZhdWx0cywgaW5zdGFuY2VDb25maWcpKTtcbn07XG5cbi8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuYXhpb3MuQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsJyk7XG5heGlvcy5DYW5jZWxUb2tlbiA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbFRva2VuJyk7XG5heGlvcy5pc0NhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL2lzQ2FuY2VsJyk7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5heGlvcy5zcHJlYWQgPSByZXF1aXJlKCcuL2hlbHBlcnMvc3ByZWFkJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gYXhpb3M7XG5cbi8vIEFsbG93IHVzZSBvZiBkZWZhdWx0IGltcG9ydCBzeW50YXggaW4gVHlwZVNjcmlwdFxubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEEgYENhbmNlbGAgaXMgYW4gb2JqZWN0IHRoYXQgaXMgdGhyb3duIHdoZW4gYW4gb3BlcmF0aW9uIGlzIGNhbmNlbGVkLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtzdHJpbmc9fSBtZXNzYWdlIFRoZSBtZXNzYWdlLlxuICovXG5mdW5jdGlvbiBDYW5jZWwobWVzc2FnZSkge1xuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xufVxuXG5DYW5jZWwucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiAnQ2FuY2VsJyArICh0aGlzLm1lc3NhZ2UgPyAnOiAnICsgdGhpcy5tZXNzYWdlIDogJycpO1xufTtcblxuQ2FuY2VsLnByb3RvdHlwZS5fX0NBTkNFTF9fID0gdHJ1ZTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWw7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBDYW5jZWwgPSByZXF1aXJlKCcuL0NhbmNlbCcpO1xuXG4vKipcbiAqIEEgYENhbmNlbFRva2VuYCBpcyBhbiBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byByZXF1ZXN0IGNhbmNlbGxhdGlvbiBvZiBhbiBvcGVyYXRpb24uXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGVjdXRvciBUaGUgZXhlY3V0b3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIENhbmNlbFRva2VuKGV4ZWN1dG9yKSB7XG4gIGlmICh0eXBlb2YgZXhlY3V0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleGVjdXRvciBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICB2YXIgcmVzb2x2ZVByb21pc2U7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIHByb21pc2VFeGVjdXRvcihyZXNvbHZlKSB7XG4gICAgcmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xuICB9KTtcblxuICB2YXIgdG9rZW4gPSB0aGlzO1xuICBleGVjdXRvcihmdW5jdGlvbiBjYW5jZWwobWVzc2FnZSkge1xuICAgIGlmICh0b2tlbi5yZWFzb24pIHtcbiAgICAgIC8vIENhbmNlbGxhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHJlcXVlc3RlZFxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRva2VuLnJlYXNvbiA9IG5ldyBDYW5jZWwobWVzc2FnZSk7XG4gICAgcmVzb2x2ZVByb21pc2UodG9rZW4ucmVhc29uKTtcbiAgfSk7XG59XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuQ2FuY2VsVG9rZW4ucHJvdG90eXBlLnRocm93SWZSZXF1ZXN0ZWQgPSBmdW5jdGlvbiB0aHJvd0lmUmVxdWVzdGVkKCkge1xuICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICB0aHJvdyB0aGlzLnJlYXNvbjtcbiAgfVxufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgbmV3IGBDYW5jZWxUb2tlbmAgYW5kIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBjYWxsZWQsXG4gKiBjYW5jZWxzIHRoZSBgQ2FuY2VsVG9rZW5gLlxuICovXG5DYW5jZWxUb2tlbi5zb3VyY2UgPSBmdW5jdGlvbiBzb3VyY2UoKSB7XG4gIHZhciBjYW5jZWw7XG4gIHZhciB0b2tlbiA9IG5ldyBDYW5jZWxUb2tlbihmdW5jdGlvbiBleGVjdXRvcihjKSB7XG4gICAgY2FuY2VsID0gYztcbiAgfSk7XG4gIHJldHVybiB7XG4gICAgdG9rZW46IHRva2VuLFxuICAgIGNhbmNlbDogY2FuY2VsXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbFRva2VuO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQ2FuY2VsKHZhbHVlKSB7XG4gIHJldHVybiAhISh2YWx1ZSAmJiB2YWx1ZS5fX0NBTkNFTF9fKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvYnVpbGRVUkwnKTtcbnZhciBJbnRlcmNlcHRvck1hbmFnZXIgPSByZXF1aXJlKCcuL0ludGVyY2VwdG9yTWFuYWdlcicpO1xudmFyIGRpc3BhdGNoUmVxdWVzdCA9IHJlcXVpcmUoJy4vZGlzcGF0Y2hSZXF1ZXN0Jyk7XG52YXIgbWVyZ2VDb25maWcgPSByZXF1aXJlKCcuL21lcmdlQ29uZmlnJyk7XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlQ29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIEF4aW9zKGluc3RhbmNlQ29uZmlnKSB7XG4gIHRoaXMuZGVmYXVsdHMgPSBpbnN0YW5jZUNvbmZpZztcbiAgdGhpcy5pbnRlcmNlcHRvcnMgPSB7XG4gICAgcmVxdWVzdDogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpLFxuICAgIHJlc3BvbnNlOiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKClcbiAgfTtcbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcgc3BlY2lmaWMgZm9yIHRoaXMgcmVxdWVzdCAobWVyZ2VkIHdpdGggdGhpcy5kZWZhdWx0cylcbiAqL1xuQXhpb3MucHJvdG90eXBlLnJlcXVlc3QgPSBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgLy8gQWxsb3cgZm9yIGF4aW9zKCdleGFtcGxlL3VybCdbLCBjb25maWddKSBhIGxhIGZldGNoIEFQSVxuICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25maWcgPSBhcmd1bWVudHNbMV0gfHwge307XG4gICAgY29uZmlnLnVybCA9IGFyZ3VtZW50c1swXTtcbiAgfSBlbHNlIHtcbiAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gIH1cblxuICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuICBjb25maWcubWV0aG9kID0gY29uZmlnLm1ldGhvZCA/IGNvbmZpZy5tZXRob2QudG9Mb3dlckNhc2UoKSA6ICdnZXQnO1xuXG4gIC8vIEhvb2sgdXAgaW50ZXJjZXB0b3JzIG1pZGRsZXdhcmVcbiAgdmFyIGNoYWluID0gW2Rpc3BhdGNoUmVxdWVzdCwgdW5kZWZpbmVkXTtcbiAgdmFyIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcblxuICB0aGlzLmludGVyY2VwdG9ycy5yZXF1ZXN0LmZvckVhY2goZnVuY3Rpb24gdW5zaGlmdFJlcXVlc3RJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi51bnNoaWZ0KGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uIHB1c2hSZXNwb25zZUludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnB1c2goaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHdoaWxlIChjaGFpbi5sZW5ndGgpIHtcbiAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKGNoYWluLnNoaWZ0KCksIGNoYWluLnNoaWZ0KCkpO1xuICB9XG5cbiAgcmV0dXJuIHByb21pc2U7XG59O1xuXG5BeGlvcy5wcm90b3R5cGUuZ2V0VXJpID0gZnVuY3Rpb24gZ2V0VXJpKGNvbmZpZykge1xuICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuICByZXR1cm4gYnVpbGRVUkwoY29uZmlnLnVybCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLnJlcGxhY2UoL15cXD8vLCAnJyk7XG59O1xuXG4vLyBQcm92aWRlIGFsaWFzZXMgZm9yIHN1cHBvcnRlZCByZXF1ZXN0IG1ldGhvZHNcbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAnb3B0aW9ucyddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh1dGlscy5tZXJnZShjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmxcbiAgICB9KSk7XG4gIH07XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGRhdGEsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXRpbHMubWVyZ2UoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsLFxuICAgICAgZGF0YTogZGF0YVxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIEludGVyY2VwdG9yTWFuYWdlcigpIHtcbiAgdGhpcy5oYW5kbGVycyA9IFtdO1xufVxuXG4vKipcbiAqIEFkZCBhIG5ldyBpbnRlcmNlcHRvciB0byB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdWxmaWxsZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgdGhlbmAgZm9yIGEgYFByb21pc2VgXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3RlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGByZWplY3RgIGZvciBhIGBQcm9taXNlYFxuICpcbiAqIEByZXR1cm4ge051bWJlcn0gQW4gSUQgdXNlZCB0byByZW1vdmUgaW50ZXJjZXB0b3IgbGF0ZXJcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiB1c2UoZnVsZmlsbGVkLCByZWplY3RlZCkge1xuICB0aGlzLmhhbmRsZXJzLnB1c2goe1xuICAgIGZ1bGZpbGxlZDogZnVsZmlsbGVkLFxuICAgIHJlamVjdGVkOiByZWplY3RlZFxuICB9KTtcbiAgcmV0dXJuIHRoaXMuaGFuZGxlcnMubGVuZ3RoIC0gMTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGFuIGludGVyY2VwdG9yIGZyb20gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGlkIFRoZSBJRCB0aGF0IHdhcyByZXR1cm5lZCBieSBgdXNlYFxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmVqZWN0ID0gZnVuY3Rpb24gZWplY3QoaWQpIHtcbiAgaWYgKHRoaXMuaGFuZGxlcnNbaWRdKSB7XG4gICAgdGhpcy5oYW5kbGVyc1tpZF0gPSBudWxsO1xuICB9XG59O1xuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbGwgdGhlIHJlZ2lzdGVyZWQgaW50ZXJjZXB0b3JzXG4gKlxuICogVGhpcyBtZXRob2QgaXMgcGFydGljdWxhcmx5IHVzZWZ1bCBmb3Igc2tpcHBpbmcgb3ZlciBhbnlcbiAqIGludGVyY2VwdG9ycyB0aGF0IG1heSBoYXZlIGJlY29tZSBgbnVsbGAgY2FsbGluZyBgZWplY3RgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGludGVyY2VwdG9yXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIGZvckVhY2goZm4pIHtcbiAgdXRpbHMuZm9yRWFjaCh0aGlzLmhhbmRsZXJzLCBmdW5jdGlvbiBmb3JFYWNoSGFuZGxlcihoKSB7XG4gICAgaWYgKGggIT09IG51bGwpIHtcbiAgICAgIGZuKGgpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEludGVyY2VwdG9yTWFuYWdlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGVuaGFuY2VFcnJvciA9IHJlcXVpcmUoJy4vZW5oYW5jZUVycm9yJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBtZXNzYWdlLCBjb25maWcsIGVycm9yIGNvZGUsIHJlcXVlc3QgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZUVycm9yKG1lc3NhZ2UsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgdmFyIGVycm9yID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICByZXR1cm4gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciB0cmFuc2Zvcm1EYXRhID0gcmVxdWlyZSgnLi90cmFuc2Zvcm1EYXRhJyk7XG52YXIgaXNDYW5jZWwgPSByZXF1aXJlKCcuLi9jYW5jZWwvaXNDYW5jZWwnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRzJyk7XG52YXIgaXNBYnNvbHV0ZVVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9pc0Fic29sdXRlVVJMJyk7XG52YXIgY29tYmluZVVSTHMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29tYmluZVVSTHMnKTtcblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5mdW5jdGlvbiB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZykge1xuICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgY29uZmlnLmNhbmNlbFRva2VuLnRocm93SWZSZXF1ZXN0ZWQoKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdCB0byB0aGUgc2VydmVyIHVzaW5nIHRoZSBjb25maWd1cmVkIGFkYXB0ZXIuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkaXNwYXRjaFJlcXVlc3QoY29uZmlnKSB7XG4gIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAvLyBTdXBwb3J0IGJhc2VVUkwgY29uZmlnXG4gIGlmIChjb25maWcuYmFzZVVSTCAmJiAhaXNBYnNvbHV0ZVVSTChjb25maWcudXJsKSkge1xuICAgIGNvbmZpZy51cmwgPSBjb21iaW5lVVJMcyhjb25maWcuYmFzZVVSTCwgY29uZmlnLnVybCk7XG4gIH1cblxuICAvLyBFbnN1cmUgaGVhZGVycyBleGlzdFxuICBjb25maWcuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzIHx8IHt9O1xuXG4gIC8vIFRyYW5zZm9ybSByZXF1ZXN0IGRhdGFcbiAgY29uZmlnLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgIGNvbmZpZy5kYXRhLFxuICAgIGNvbmZpZy5oZWFkZXJzLFxuICAgIGNvbmZpZy50cmFuc2Zvcm1SZXF1ZXN0XG4gICk7XG5cbiAgLy8gRmxhdHRlbiBoZWFkZXJzXG4gIGNvbmZpZy5oZWFkZXJzID0gdXRpbHMubWVyZ2UoXG4gICAgY29uZmlnLmhlYWRlcnMuY29tbW9uIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzW2NvbmZpZy5tZXRob2RdIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzIHx8IHt9XG4gICk7XG5cbiAgdXRpbHMuZm9yRWFjaChcbiAgICBbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdwb3N0JywgJ3B1dCcsICdwYXRjaCcsICdjb21tb24nXSxcbiAgICBmdW5jdGlvbiBjbGVhbkhlYWRlckNvbmZpZyhtZXRob2QpIHtcbiAgICAgIGRlbGV0ZSBjb25maWcuaGVhZGVyc1ttZXRob2RdO1xuICAgIH1cbiAgKTtcblxuICB2YXIgYWRhcHRlciA9IGNvbmZpZy5hZGFwdGVyIHx8IGRlZmF1bHRzLmFkYXB0ZXI7XG5cbiAgcmV0dXJuIGFkYXB0ZXIoY29uZmlnKS50aGVuKGZ1bmN0aW9uIG9uQWRhcHRlclJlc29sdXRpb24ocmVzcG9uc2UpIHtcbiAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgIHJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgcmVzcG9uc2UuZGF0YSxcbiAgICAgIHJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICApO1xuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9LCBmdW5jdGlvbiBvbkFkYXB0ZXJSZWplY3Rpb24ocmVhc29uKSB7XG4gICAgaWYgKCFpc0NhbmNlbChyZWFzb24pKSB7XG4gICAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgICBpZiAocmVhc29uICYmIHJlYXNvbi5yZXNwb25zZSkge1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEsXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVcGRhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIGNvbmZpZywgZXJyb3IgY29kZSwgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVycm9yIFRoZSBlcnJvciB0byB1cGRhdGUuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGVycm9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICBlcnJvci5jb25maWcgPSBjb25maWc7XG4gIGlmIChjb2RlKSB7XG4gICAgZXJyb3IuY29kZSA9IGNvZGU7XG4gIH1cblxuICBlcnJvci5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgZXJyb3IucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgZXJyb3IuaXNBeGlvc0Vycm9yID0gdHJ1ZTtcblxuICBlcnJvci50b0pTT04gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLy8gU3RhbmRhcmRcbiAgICAgIG1lc3NhZ2U6IHRoaXMubWVzc2FnZSxcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgIC8vIE1pY3Jvc29mdFxuICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb24sXG4gICAgICBudW1iZXI6IHRoaXMubnVtYmVyLFxuICAgICAgLy8gTW96aWxsYVxuICAgICAgZmlsZU5hbWU6IHRoaXMuZmlsZU5hbWUsXG4gICAgICBsaW5lTnVtYmVyOiB0aGlzLmxpbmVOdW1iZXIsXG4gICAgICBjb2x1bW5OdW1iZXI6IHRoaXMuY29sdW1uTnVtYmVyLFxuICAgICAgc3RhY2s6IHRoaXMuc3RhY2ssXG4gICAgICAvLyBBeGlvc1xuICAgICAgY29uZmlnOiB0aGlzLmNvbmZpZyxcbiAgICAgIGNvZGU6IHRoaXMuY29kZVxuICAgIH07XG4gIH07XG4gIHJldHVybiBlcnJvcjtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbi8qKlxuICogQ29uZmlnLXNwZWNpZmljIG1lcmdlLWZ1bmN0aW9uIHdoaWNoIGNyZWF0ZXMgYSBuZXcgY29uZmlnLW9iamVjdFxuICogYnkgbWVyZ2luZyB0d28gY29uZmlndXJhdGlvbiBvYmplY3RzIHRvZ2V0aGVyLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcxXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMlxuICogQHJldHVybnMge09iamVjdH0gTmV3IG9iamVjdCByZXN1bHRpbmcgZnJvbSBtZXJnaW5nIGNvbmZpZzIgdG8gY29uZmlnMVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1lcmdlQ29uZmlnKGNvbmZpZzEsIGNvbmZpZzIpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGNvbmZpZzIgPSBjb25maWcyIHx8IHt9O1xuICB2YXIgY29uZmlnID0ge307XG5cbiAgdXRpbHMuZm9yRWFjaChbJ3VybCcsICdtZXRob2QnLCAncGFyYW1zJywgJ2RhdGEnXSwgZnVuY3Rpb24gdmFsdWVGcm9tQ29uZmlnMihwcm9wKSB7XG4gICAgaWYgKHR5cGVvZiBjb25maWcyW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMltwcm9wXTtcbiAgICB9XG4gIH0pO1xuXG4gIHV0aWxzLmZvckVhY2goWydoZWFkZXJzJywgJ2F1dGgnLCAncHJveHknXSwgZnVuY3Rpb24gbWVyZ2VEZWVwUHJvcGVydGllcyhwcm9wKSB7XG4gICAgaWYgKHV0aWxzLmlzT2JqZWN0KGNvbmZpZzJbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSB1dGlscy5kZWVwTWVyZ2UoY29uZmlnMVtwcm9wXSwgY29uZmlnMltwcm9wXSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY29uZmlnMltwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGNvbmZpZzJbcHJvcF07XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc09iamVjdChjb25maWcxW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gdXRpbHMuZGVlcE1lcmdlKGNvbmZpZzFbcHJvcF0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvbmZpZzFbcHJvcF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBjb25maWcxW3Byb3BdO1xuICAgIH1cbiAgfSk7XG5cbiAgdXRpbHMuZm9yRWFjaChbXG4gICAgJ2Jhc2VVUkwnLCAndHJhbnNmb3JtUmVxdWVzdCcsICd0cmFuc2Zvcm1SZXNwb25zZScsICdwYXJhbXNTZXJpYWxpemVyJyxcbiAgICAndGltZW91dCcsICd3aXRoQ3JlZGVudGlhbHMnLCAnYWRhcHRlcicsICdyZXNwb25zZVR5cGUnLCAneHNyZkNvb2tpZU5hbWUnLFxuICAgICd4c3JmSGVhZGVyTmFtZScsICdvblVwbG9hZFByb2dyZXNzJywgJ29uRG93bmxvYWRQcm9ncmVzcycsICdtYXhDb250ZW50TGVuZ3RoJyxcbiAgICAndmFsaWRhdGVTdGF0dXMnLCAnbWF4UmVkaXJlY3RzJywgJ2h0dHBBZ2VudCcsICdodHRwc0FnZW50JywgJ2NhbmNlbFRva2VuJyxcbiAgICAnc29ja2V0UGF0aCdcbiAgXSwgZnVuY3Rpb24gZGVmYXVsdFRvQ29uZmlnMihwcm9wKSB7XG4gICAgaWYgKHR5cGVvZiBjb25maWcyW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMltwcm9wXTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb25maWcxW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMVtwcm9wXTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBjb25maWc7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuL2NyZWF0ZUVycm9yJyk7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpIHtcbiAgdmFyIHZhbGlkYXRlU3RhdHVzID0gcmVzcG9uc2UuY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xuICBpZiAoIXZhbGlkYXRlU3RhdHVzIHx8IHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICByZWplY3QoY3JlYXRlRXJyb3IoXG4gICAgICAnUmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgcmVzcG9uc2UuY29uZmlnLFxuICAgICAgbnVsbCxcbiAgICAgIHJlc3BvbnNlLnJlcXVlc3QsXG4gICAgICByZXNwb25zZVxuICAgICkpO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbi8qKlxuICogVHJhbnNmb3JtIHRoZSBkYXRhIGZvciBhIHJlcXVlc3Qgb3IgYSByZXNwb25zZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gZGF0YSBUaGUgZGF0YSB0byBiZSB0cmFuc2Zvcm1lZFxuICogQHBhcmFtIHtBcnJheX0gaGVhZGVycyBUaGUgaGVhZGVycyBmb3IgdGhlIHJlcXVlc3Qgb3IgcmVzcG9uc2VcbiAqIEBwYXJhbSB7QXJyYXl8RnVuY3Rpb259IGZucyBBIHNpbmdsZSBmdW5jdGlvbiBvciBBcnJheSBvZiBmdW5jdGlvbnNcbiAqIEByZXR1cm5zIHsqfSBUaGUgcmVzdWx0aW5nIHRyYW5zZm9ybWVkIGRhdGFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0cmFuc2Zvcm1EYXRhKGRhdGEsIGhlYWRlcnMsIGZucykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgdXRpbHMuZm9yRWFjaChmbnMsIGZ1bmN0aW9uIHRyYW5zZm9ybShmbikge1xuICAgIGRhdGEgPSBmbihkYXRhLCBoZWFkZXJzKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRhdGE7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgbm9ybWFsaXplSGVhZGVyTmFtZSA9IHJlcXVpcmUoJy4vaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lJyk7XG5cbnZhciBERUZBVUxUX0NPTlRFTlRfVFlQRSA9IHtcbiAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG59O1xuXG5mdW5jdGlvbiBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgdmFsdWUpIHtcbiAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzKSAmJiB1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzWydDb250ZW50LVR5cGUnXSkpIHtcbiAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9IHZhbHVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldERlZmF1bHRBZGFwdGVyKCkge1xuICB2YXIgYWRhcHRlcjtcbiAgLy8gT25seSBOb2RlLkpTIGhhcyBhIHByb2Nlc3MgdmFyaWFibGUgdGhhdCBpcyBvZiBbW0NsYXNzXV0gcHJvY2Vzc1xuICBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChwcm9jZXNzKSA9PT0gJ1tvYmplY3QgcHJvY2Vzc10nKSB7XG4gICAgLy8gRm9yIG5vZGUgdXNlIEhUVFAgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL2h0dHAnKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gRm9yIGJyb3dzZXJzIHVzZSBYSFIgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL3hocicpO1xuICB9XG4gIHJldHVybiBhZGFwdGVyO1xufVxuXG52YXIgZGVmYXVsdHMgPSB7XG4gIGFkYXB0ZXI6IGdldERlZmF1bHRBZGFwdGVyKCksXG5cbiAgdHJhbnNmb3JtUmVxdWVzdDogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlcXVlc3QoZGF0YSwgaGVhZGVycykge1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0FjY2VwdCcpO1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0NvbnRlbnQtVHlwZScpO1xuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0FycmF5QnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0J1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNTdHJlYW0oZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzRmlsZShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCbG9iKGRhdGEpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXJWaWV3KGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YS5idWZmZXI7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIGRhdGEudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzT2JqZWN0KGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgdHJhbnNmb3JtUmVzcG9uc2U6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShkYXRhKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7IC8qIElnbm9yZSAqLyB9XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICAvKipcbiAgICogQSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byBhYm9ydCBhIHJlcXVlc3QuIElmIHNldCB0byAwIChkZWZhdWx0KSBhXG4gICAqIHRpbWVvdXQgaXMgbm90IGNyZWF0ZWQuXG4gICAqL1xuICB0aW1lb3V0OiAwLFxuXG4gIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXG4gIHhzcmZIZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcblxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcblxuICB2YWxpZGF0ZVN0YXR1czogZnVuY3Rpb24gdmFsaWRhdGVTdGF0dXMoc3RhdHVzKSB7XG4gICAgcmV0dXJuIHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwO1xuICB9XG59O1xuXG5kZWZhdWx0cy5oZWFkZXJzID0ge1xuICBjb21tb246IHtcbiAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKidcbiAgfVxufTtcblxudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB7fTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB1dGlscy5tZXJnZShERUZBVUxUX0NPTlRFTlRfVFlQRSk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZhdWx0cztcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBlbmNvZGUodmFsKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsKS5cbiAgICByZXBsYWNlKC8lNDAvZ2ksICdAJykuXG4gICAgcmVwbGFjZSgvJTNBL2dpLCAnOicpLlxuICAgIHJlcGxhY2UoLyUyNC9nLCAnJCcpLlxuICAgIHJlcGxhY2UoLyUyQy9naSwgJywnKS5cbiAgICByZXBsYWNlKC8lMjAvZywgJysnKS5cbiAgICByZXBsYWNlKC8lNUIvZ2ksICdbJykuXG4gICAgcmVwbGFjZSgvJTVEL2dpLCAnXScpO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgVVJMIGJ5IGFwcGVuZGluZyBwYXJhbXMgdG8gdGhlIGVuZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIGJhc2Ugb2YgdGhlIHVybCAoZS5nLiwgaHR0cDovL3d3dy5nb29nbGUuY29tKVxuICogQHBhcmFtIHtvYmplY3R9IFtwYXJhbXNdIFRoZSBwYXJhbXMgdG8gYmUgYXBwZW5kZWRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgdXJsXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHZhciBzZXJpYWxpemVkUGFyYW1zO1xuICBpZiAocGFyYW1zU2VyaWFsaXplcikge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXNTZXJpYWxpemVyKHBhcmFtcyk7XG4gIH0gZWxzZSBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSkge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXMudG9TdHJpbmcoKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcGFydHMgPSBbXTtcblxuICAgIHV0aWxzLmZvckVhY2gocGFyYW1zLCBmdW5jdGlvbiBzZXJpYWxpemUodmFsLCBrZXkpIHtcbiAgICAgIGlmICh2YWwgPT09IG51bGwgfHwgdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodXRpbHMuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgIGtleSA9IGtleSArICdbXSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWwgPSBbdmFsXTtcbiAgICAgIH1cblxuICAgICAgdXRpbHMuZm9yRWFjaCh2YWwsIGZ1bmN0aW9uIHBhcnNlVmFsdWUodikge1xuICAgICAgICBpZiAodXRpbHMuaXNEYXRlKHYpKSB7XG4gICAgICAgICAgdiA9IHYudG9JU09TdHJpbmcoKTtcbiAgICAgICAgfSBlbHNlIGlmICh1dGlscy5pc09iamVjdCh2KSkge1xuICAgICAgICAgIHYgPSBKU09OLnN0cmluZ2lmeSh2KTtcbiAgICAgICAgfVxuICAgICAgICBwYXJ0cy5wdXNoKGVuY29kZShrZXkpICsgJz0nICsgZW5jb2RlKHYpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcnRzLmpvaW4oJyYnKTtcbiAgfVxuXG4gIGlmIChzZXJpYWxpemVkUGFyYW1zKSB7XG4gICAgdmFyIGhhc2htYXJrSW5kZXggPSB1cmwuaW5kZXhPZignIycpO1xuICAgIGlmIChoYXNobWFya0luZGV4ICE9PSAtMSkge1xuICAgICAgdXJsID0gdXJsLnNsaWNlKDAsIGhhc2htYXJrSW5kZXgpO1xuICAgIH1cblxuICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgc2VyaWFsaXplZFBhcmFtcztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgc3BlY2lmaWVkIFVSTHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVVSTCBUaGUgcmVsYXRpdmUgVVJMXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgVVJMXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVsYXRpdmVVUkwpIHtcbiAgcmV0dXJuIHJlbGF0aXZlVVJMXG4gICAgPyBiYXNlVVJMLnJlcGxhY2UoL1xcLyskLywgJycpICsgJy8nICsgcmVsYXRpdmVVUkwucmVwbGFjZSgvXlxcLysvLCAnJylcbiAgICA6IGJhc2VVUkw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgc3VwcG9ydCBkb2N1bWVudC5jb29raWVcbiAgICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKG5hbWUsIHZhbHVlLCBleHBpcmVzLCBwYXRoLCBkb21haW4sIHNlY3VyZSkge1xuICAgICAgICAgIHZhciBjb29raWUgPSBbXTtcbiAgICAgICAgICBjb29raWUucHVzaChuYW1lICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSk7XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNOdW1iZXIoZXhwaXJlcykpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdleHBpcmVzPScgKyBuZXcgRGF0ZShleHBpcmVzKS50b0dNVFN0cmluZygpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcocGF0aCkpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdwYXRoPScgKyBwYXRoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcoZG9tYWluKSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ2RvbWFpbj0nICsgZG9tYWluKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc2VjdXJlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgnc2VjdXJlJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llLmpvaW4oJzsgJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChuYW1lKSB7XG4gICAgICAgICAgdmFyIG1hdGNoID0gZG9jdW1lbnQuY29va2llLm1hdGNoKG5ldyBSZWdFeHAoJyhefDtcXFxccyopKCcgKyBuYW1lICsgJyk9KFteO10qKScpKTtcbiAgICAgICAgICByZXR1cm4gKG1hdGNoID8gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzNdKSA6IG51bGwpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKG5hbWUpIHtcbiAgICAgICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDApO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudiAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge30sXG4gICAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7IHJldHVybiBudWxsOyB9LFxuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgICB9O1xuICAgIH0pKClcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0Fic29sdXRlVVJMKHVybCkge1xuICAvLyBBIFVSTCBpcyBjb25zaWRlcmVkIGFic29sdXRlIGlmIGl0IGJlZ2lucyB3aXRoIFwiPHNjaGVtZT46Ly9cIiBvciBcIi8vXCIgKHByb3RvY29sLXJlbGF0aXZlIFVSTCkuXG4gIC8vIFJGQyAzOTg2IGRlZmluZXMgc2NoZW1lIG5hbWUgYXMgYSBzZXF1ZW5jZSBvZiBjaGFyYWN0ZXJzIGJlZ2lubmluZyB3aXRoIGEgbGV0dGVyIGFuZCBmb2xsb3dlZFxuICAvLyBieSBhbnkgY29tYmluYXRpb24gb2YgbGV0dGVycywgZGlnaXRzLCBwbHVzLCBwZXJpb2QsIG9yIGh5cGhlbi5cbiAgcmV0dXJuIC9eKFthLXpdW2EtelxcZFxcK1xcLVxcLl0qOik/XFwvXFwvL2kudGVzdCh1cmwpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIGhhdmUgZnVsbCBzdXBwb3J0IG9mIHRoZSBBUElzIG5lZWRlZCB0byB0ZXN0XG4gIC8vIHdoZXRoZXIgdGhlIHJlcXVlc3QgVVJMIGlzIG9mIHRoZSBzYW1lIG9yaWdpbiBhcyBjdXJyZW50IGxvY2F0aW9uLlxuICAgIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICB2YXIgbXNpZSA9IC8obXNpZXx0cmlkZW50KS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgICB2YXIgdXJsUGFyc2luZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICB2YXIgb3JpZ2luVVJMO1xuXG4gICAgICAvKipcbiAgICAqIFBhcnNlIGEgVVJMIHRvIGRpc2NvdmVyIGl0J3MgY29tcG9uZW50c1xuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIFVSTCB0byBiZSBwYXJzZWRcbiAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgKi9cbiAgICAgIGZ1bmN0aW9uIHJlc29sdmVVUkwodXJsKSB7XG4gICAgICAgIHZhciBocmVmID0gdXJsO1xuXG4gICAgICAgIGlmIChtc2llKSB7XG4gICAgICAgIC8vIElFIG5lZWRzIGF0dHJpYnV0ZSBzZXQgdHdpY2UgdG8gbm9ybWFsaXplIHByb3BlcnRpZXNcbiAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcbiAgICAgICAgICBocmVmID0gdXJsUGFyc2luZ05vZGUuaHJlZjtcbiAgICAgICAgfVxuXG4gICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuXG4gICAgICAgIC8vIHVybFBhcnNpbmdOb2RlIHByb3ZpZGVzIHRoZSBVcmxVdGlscyBpbnRlcmZhY2UgLSBodHRwOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsdXRpbHNcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBocmVmOiB1cmxQYXJzaW5nTm9kZS5ocmVmLFxuICAgICAgICAgIHByb3RvY29sOiB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbCA/IHVybFBhcnNpbmdOb2RlLnByb3RvY29sLnJlcGxhY2UoLzokLywgJycpIDogJycsXG4gICAgICAgICAgaG9zdDogdXJsUGFyc2luZ05vZGUuaG9zdCxcbiAgICAgICAgICBzZWFyY2g6IHVybFBhcnNpbmdOb2RlLnNlYXJjaCA/IHVybFBhcnNpbmdOb2RlLnNlYXJjaC5yZXBsYWNlKC9eXFw/LywgJycpIDogJycsXG4gICAgICAgICAgaGFzaDogdXJsUGFyc2luZ05vZGUuaGFzaCA/IHVybFBhcnNpbmdOb2RlLmhhc2gucmVwbGFjZSgvXiMvLCAnJykgOiAnJyxcbiAgICAgICAgICBob3N0bmFtZTogdXJsUGFyc2luZ05vZGUuaG9zdG5hbWUsXG4gICAgICAgICAgcG9ydDogdXJsUGFyc2luZ05vZGUucG9ydCxcbiAgICAgICAgICBwYXRobmFtZTogKHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKSA/XG4gICAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZSA6XG4gICAgICAgICAgICAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBvcmlnaW5VUkwgPSByZXNvbHZlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblxuICAgICAgLyoqXG4gICAgKiBEZXRlcm1pbmUgaWYgYSBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiBhcyB0aGUgY3VycmVudCBsb2NhdGlvblxuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSByZXF1ZXN0VVJMIFRoZSBVUkwgdG8gdGVzdFxuICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4sIG90aGVyd2lzZSBmYWxzZVxuICAgICovXG4gICAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKHJlcXVlc3RVUkwpIHtcbiAgICAgICAgdmFyIHBhcnNlZCA9ICh1dGlscy5pc1N0cmluZyhyZXF1ZXN0VVJMKSkgPyByZXNvbHZlVVJMKHJlcXVlc3RVUkwpIDogcmVxdWVzdFVSTDtcbiAgICAgICAgcmV0dXJuIChwYXJzZWQucHJvdG9jb2wgPT09IG9yaWdpblVSTC5wcm90b2NvbCAmJlxuICAgICAgICAgICAgcGFyc2VkLmhvc3QgPT09IG9yaWdpblVSTC5ob3N0KTtcbiAgICAgIH07XG4gICAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52cyAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbigpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9O1xuICAgIH0pKClcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCBub3JtYWxpemVkTmFtZSkge1xuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMsIGZ1bmN0aW9uIHByb2Nlc3NIZWFkZXIodmFsdWUsIG5hbWUpIHtcbiAgICBpZiAobmFtZSAhPT0gbm9ybWFsaXplZE5hbWUgJiYgbmFtZS50b1VwcGVyQ2FzZSgpID09PSBub3JtYWxpemVkTmFtZS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICBoZWFkZXJzW25vcm1hbGl6ZWROYW1lXSA9IHZhbHVlO1xuICAgICAgZGVsZXRlIGhlYWRlcnNbbmFtZV07XG4gICAgfVxuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLy8gSGVhZGVycyB3aG9zZSBkdXBsaWNhdGVzIGFyZSBpZ25vcmVkIGJ5IG5vZGVcbi8vIGMuZi4gaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9odHRwLmh0bWwjaHR0cF9tZXNzYWdlX2hlYWRlcnNcbnZhciBpZ25vcmVEdXBsaWNhdGVPZiA9IFtcbiAgJ2FnZScsICdhdXRob3JpemF0aW9uJywgJ2NvbnRlbnQtbGVuZ3RoJywgJ2NvbnRlbnQtdHlwZScsICdldGFnJyxcbiAgJ2V4cGlyZXMnLCAnZnJvbScsICdob3N0JywgJ2lmLW1vZGlmaWVkLXNpbmNlJywgJ2lmLXVubW9kaWZpZWQtc2luY2UnLFxuICAnbGFzdC1tb2RpZmllZCcsICdsb2NhdGlvbicsICdtYXgtZm9yd2FyZHMnLCAncHJveHktYXV0aG9yaXphdGlvbicsXG4gICdyZWZlcmVyJywgJ3JldHJ5LWFmdGVyJywgJ3VzZXItYWdlbnQnXG5dO1xuXG4vKipcbiAqIFBhcnNlIGhlYWRlcnMgaW50byBhbiBvYmplY3RcbiAqXG4gKiBgYGBcbiAqIERhdGU6IFdlZCwgMjcgQXVnIDIwMTQgMDg6NTg6NDkgR01UXG4gKiBDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cbiAqIENvbm5lY3Rpb246IGtlZXAtYWxpdmVcbiAqIFRyYW5zZmVyLUVuY29kaW5nOiBjaHVua2VkXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVycyBIZWFkZXJzIG5lZWRpbmcgdG8gYmUgcGFyc2VkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhoZWFkZXJzKSB7XG4gIHZhciBwYXJzZWQgPSB7fTtcbiAgdmFyIGtleTtcbiAgdmFyIHZhbDtcbiAgdmFyIGk7XG5cbiAgaWYgKCFoZWFkZXJzKSB7IHJldHVybiBwYXJzZWQ7IH1cblxuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMuc3BsaXQoJ1xcbicpLCBmdW5jdGlvbiBwYXJzZXIobGluZSkge1xuICAgIGkgPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBrZXkgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKDAsIGkpKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoaSArIDEpKTtcblxuICAgIGlmIChrZXkpIHtcbiAgICAgIGlmIChwYXJzZWRba2V5XSAmJiBpZ25vcmVEdXBsaWNhdGVPZi5pbmRleE9mKGtleSkgPj0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoa2V5ID09PSAnc2V0LWNvb2tpZScpIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSAocGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSA6IFtdKS5jb25jYXQoW3ZhbF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFN5bnRhY3RpYyBzdWdhciBmb3IgaW52b2tpbmcgYSBmdW5jdGlvbiBhbmQgZXhwYW5kaW5nIGFuIGFycmF5IGZvciBhcmd1bWVudHMuXG4gKlxuICogQ29tbW9uIHVzZSBjYXNlIHdvdWxkIGJlIHRvIHVzZSBgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5YC5cbiAqXG4gKiAgYGBganNcbiAqICBmdW5jdGlvbiBmKHgsIHksIHopIHt9XG4gKiAgdmFyIGFyZ3MgPSBbMSwgMiwgM107XG4gKiAgZi5hcHBseShudWxsLCBhcmdzKTtcbiAqICBgYGBcbiAqXG4gKiBXaXRoIGBzcHJlYWRgIHRoaXMgZXhhbXBsZSBjYW4gYmUgcmUtd3JpdHRlbi5cbiAqXG4gKiAgYGBganNcbiAqICBzcHJlYWQoZnVuY3Rpb24oeCwgeSwgeikge30pKFsxLCAyLCAzXSk7XG4gKiAgYGBgXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzcHJlYWQoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoYXJyKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFycik7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG52YXIgaXNCdWZmZXIgPSByZXF1aXJlKCdpcy1idWZmZXInKTtcblxuLypnbG9iYWwgdG9TdHJpbmc6dHJ1ZSovXG5cbi8vIHV0aWxzIGlzIGEgbGlicmFyeSBvZiBnZW5lcmljIGhlbHBlciBmdW5jdGlvbnMgbm9uLXNwZWNpZmljIHRvIGF4aW9zXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXkodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXIodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5QnVmZmVyXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEZvcm1EYXRhLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGb3JtRGF0YSh2YWwpIHtcbiAgcmV0dXJuICh0eXBlb2YgRm9ybURhdGEgIT09ICd1bmRlZmluZWQnKSAmJiAodmFsIGluc3RhbmNlb2YgRm9ybURhdGEpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJWaWV3KHZhbCkge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcpICYmIChBcnJheUJ1ZmZlci5pc1ZpZXcpKSB7XG4gICAgcmVzdWx0ID0gQXJyYXlCdWZmZXIuaXNWaWV3KHZhbCk7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gKHZhbCkgJiYgKHZhbC5idWZmZXIpICYmICh2YWwuYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJpbmdcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmluZywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaW5nKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZyc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBOdW1iZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIE51bWJlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTnVtYmVyKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ251bWJlcic7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgdW5kZWZpbmVkXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIHVuZGVmaW5lZCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBEYXRlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBEYXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNEYXRlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBEYXRlXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGaWxlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGaWxlXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCbG9iXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCbG9iLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNCbG9iKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBCbG9iXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRnVuY3Rpb24sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyZWFtXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJlYW0sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmVhbSh2YWwpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHZhbCkgJiYgaXNGdW5jdGlvbih2YWwucGlwZSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNVUkxTZWFyY2hQYXJhbXModmFsKSB7XG4gIHJldHVybiB0eXBlb2YgVVJMU2VhcmNoUGFyYW1zICE9PSAndW5kZWZpbmVkJyAmJiB2YWwgaW5zdGFuY2VvZiBVUkxTZWFyY2hQYXJhbXM7XG59XG5cbi8qKlxuICogVHJpbSBleGNlc3Mgd2hpdGVzcGFjZSBvZmYgdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgU3RyaW5nIHRvIHRyaW1cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBTdHJpbmcgZnJlZWQgb2YgZXhjZXNzIHdoaXRlc3BhY2VcbiAqL1xuZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzKi8sICcnKS5yZXBsYWNlKC9cXHMqJC8sICcnKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgd2UncmUgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnRcbiAqXG4gKiBUaGlzIGFsbG93cyBheGlvcyB0byBydW4gaW4gYSB3ZWIgd29ya2VyLCBhbmQgcmVhY3QtbmF0aXZlLlxuICogQm90aCBlbnZpcm9ubWVudHMgc3VwcG9ydCBYTUxIdHRwUmVxdWVzdCwgYnV0IG5vdCBmdWxseSBzdGFuZGFyZCBnbG9iYWxzLlxuICpcbiAqIHdlYiB3b3JrZXJzOlxuICogIHR5cGVvZiB3aW5kb3cgLT4gdW5kZWZpbmVkXG4gKiAgdHlwZW9mIGRvY3VtZW50IC0+IHVuZGVmaW5lZFxuICpcbiAqIHJlYWN0LW5hdGl2ZTpcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnUmVhY3ROYXRpdmUnXG4gKiBuYXRpdmVzY3JpcHRcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnTmF0aXZlU2NyaXB0JyBvciAnTlMnXG4gKi9cbmZ1bmN0aW9uIGlzU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgKG5hdmlnYXRvci5wcm9kdWN0ID09PSAnUmVhY3ROYXRpdmUnIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdOYXRpdmVTY3JpcHQnIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdOUycpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXG4gICk7XG59XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFuIEFycmF5IG9yIGFuIE9iamVjdCBpbnZva2luZyBhIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgYG9iamAgaXMgYW4gQXJyYXkgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBpbmRleCwgYW5kIGNvbXBsZXRlIGFycmF5IGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgJ29iaicgaXMgYW4gT2JqZWN0IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwga2V5LCBhbmQgY29tcGxldGUgb2JqZWN0IGZvciBlYWNoIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBvYmogVGhlIG9iamVjdCB0byBpdGVyYXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2sgdG8gaW52b2tlIGZvciBlYWNoIGl0ZW1cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaChvYmosIGZuKSB7XG4gIC8vIERvbid0IGJvdGhlciBpZiBubyB2YWx1ZSBwcm92aWRlZFxuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gRm9yY2UgYW4gYXJyYXkgaWYgbm90IGFscmVhZHkgc29tZXRoaW5nIGl0ZXJhYmxlXG4gIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIG9iaiA9IFtvYmpdO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBhcnJheSB2YWx1ZXNcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2ldLCBpLCBvYmopO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgb2JqZWN0IGtleXNcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICBmbi5jYWxsKG51bGwsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQWNjZXB0cyB2YXJhcmdzIGV4cGVjdGluZyBlYWNoIGFyZ3VtZW50IHRvIGJlIGFuIG9iamVjdCwgdGhlblxuICogaW1tdXRhYmx5IG1lcmdlcyB0aGUgcHJvcGVydGllcyBvZiBlYWNoIG9iamVjdCBhbmQgcmV0dXJucyByZXN1bHQuXG4gKlxuICogV2hlbiBtdWx0aXBsZSBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUga2V5IHRoZSBsYXRlciBvYmplY3QgaW5cbiAqIHRoZSBhcmd1bWVudHMgbGlzdCB3aWxsIHRha2UgcHJlY2VkZW5jZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcmVzdWx0ID0gbWVyZ2Uoe2ZvbzogMTIzfSwge2ZvbzogNDU2fSk7XG4gKiBjb25zb2xlLmxvZyhyZXN1bHQuZm9vKTsgLy8gb3V0cHV0cyA0NTZcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIE9iamVjdCB0byBtZXJnZVxuICogQHJldHVybnMge09iamVjdH0gUmVzdWx0IG9mIGFsbCBtZXJnZSBwcm9wZXJ0aWVzXG4gKi9cbmZ1bmN0aW9uIG1lcmdlKC8qIG9iajEsIG9iajIsIG9iajMsIC4uLiAqLykge1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHR5cGVvZiByZXN1bHRba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2UocmVzdWx0W2tleV0sIHZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBGdW5jdGlvbiBlcXVhbCB0byBtZXJnZSB3aXRoIHRoZSBkaWZmZXJlbmNlIGJlaW5nIHRoYXQgbm8gcmVmZXJlbmNlXG4gKiB0byBvcmlnaW5hbCBvYmplY3RzIGlzIGtlcHQuXG4gKlxuICogQHNlZSBtZXJnZVxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gZGVlcE1lcmdlKC8qIG9iajEsIG9iajIsIG9iajMsIC4uLiAqLykge1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHR5cGVvZiByZXN1bHRba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gZGVlcE1lcmdlKHJlc3VsdFtrZXldLCB2YWwpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gZGVlcE1lcmdlKHt9LCB2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRXh0ZW5kcyBvYmplY3QgYSBieSBtdXRhYmx5IGFkZGluZyB0byBpdCB0aGUgcHJvcGVydGllcyBvZiBvYmplY3QgYi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBUaGUgb2JqZWN0IHRvIGJlIGV4dGVuZGVkXG4gKiBAcGFyYW0ge09iamVjdH0gYiBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gdGhpc0FyZyBUaGUgb2JqZWN0IHRvIGJpbmQgZnVuY3Rpb24gdG9cbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIHJlc3VsdGluZyB2YWx1ZSBvZiBvYmplY3QgYVxuICovXG5mdW5jdGlvbiBleHRlbmQoYSwgYiwgdGhpc0FyZykge1xuICBmb3JFYWNoKGIsIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHRoaXNBcmcgJiYgdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYVtrZXldID0gYmluZCh2YWwsIHRoaXNBcmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSB2YWw7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpc0FycmF5OiBpc0FycmF5LFxuICBpc0FycmF5QnVmZmVyOiBpc0FycmF5QnVmZmVyLFxuICBpc0J1ZmZlcjogaXNCdWZmZXIsXG4gIGlzRm9ybURhdGE6IGlzRm9ybURhdGEsXG4gIGlzQXJyYXlCdWZmZXJWaWV3OiBpc0FycmF5QnVmZmVyVmlldyxcbiAgaXNTdHJpbmc6IGlzU3RyaW5nLFxuICBpc051bWJlcjogaXNOdW1iZXIsXG4gIGlzT2JqZWN0OiBpc09iamVjdCxcbiAgaXNVbmRlZmluZWQ6IGlzVW5kZWZpbmVkLFxuICBpc0RhdGU6IGlzRGF0ZSxcbiAgaXNGaWxlOiBpc0ZpbGUsXG4gIGlzQmxvYjogaXNCbG9iLFxuICBpc0Z1bmN0aW9uOiBpc0Z1bmN0aW9uLFxuICBpc1N0cmVhbTogaXNTdHJlYW0sXG4gIGlzVVJMU2VhcmNoUGFyYW1zOiBpc1VSTFNlYXJjaFBhcmFtcyxcbiAgaXNTdGFuZGFyZEJyb3dzZXJFbnY6IGlzU3RhbmRhcmRCcm93c2VyRW52LFxuICBmb3JFYWNoOiBmb3JFYWNoLFxuICBtZXJnZTogbWVyZ2UsXG4gIGRlZXBNZXJnZTogZGVlcE1lcmdlLFxuICBleHRlbmQ6IGV4dGVuZCxcbiAgdHJpbTogdHJpbVxufTtcbiIsIi8qIVxuICogRGV0ZXJtaW5lIGlmIGFuIG9iamVjdCBpcyBhIEJ1ZmZlclxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxodHRwczovL2Zlcm9zcy5vcmc+XG4gKiBAbGljZW5zZSAgTUlUXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0J1ZmZlciAob2JqKSB7XG4gIHJldHVybiBvYmogIT0gbnVsbCAmJiBvYmouY29uc3RydWN0b3IgIT0gbnVsbCAmJlxuICAgIHR5cGVvZiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyKG9iailcbn1cbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIvL2ltcG9ydCAnLi9zY3NzL2Jvb3RzdHJhcC9ib290c3RyYXAuc2NzcydcclxuLy9pbXBvcnQgJy4vc2Nzcy9zdHlsZS5zY3NzJ1xyXG5pbXBvcnQge2dldEZlZWRiYWNrfSBmcm9tICcuL2pzL21vZHVsZXMvZ2V0RmVlZGJhY2snXHJcblxyXG5nZXRGZWVkYmFjaygpOyIsImltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XHJcblxyXG5mdW5jdGlvbiBnZXRGZWVkYmFjayhzZXJ2aWNlKSB7XHJcblx0cmV0dXJuIG5ldyBQcm9taXNlKChmdWxmaWxsLCByZWplY3QpID0+IHtcclxuXHRcdGF4aW9zLmdldCgnL2ZlZWRiYWNrX2xpc3QuanNvbicpXHJcblx0XHRcdC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG5cclxuXHRcdFx0XHRpZihyZXNwb25zZS5zdGF0dXMgIT09IDIwMCl7XHJcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2Uuc3RhdHVzVGV4dClcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Y29uc3QgZGF0YSA9IHJlc3BvbnNlLmRhdGE7XHJcblx0XHRcdFx0XHRkZWJ1Z2dlcjtcclxuXHRcdFx0XHRcdGNvbnN0IGRhdGFfc29ydCA9IHF1aWNrU29ydEFyck9qYihkYXRhLCAnZGF0ZScpO1xyXG5cclxuXHRcdFx0XHRcdGNvbnN0IHVzZXJzX2lkX2xpc3QgPSBnZXRBcnJMaXN0Rm9yT2JqS2V5cyhkYXRhLCAndXNlcl9pZCcpO1xyXG5cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdH0pXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge2dldEZlZWRiYWNrfTtcclxuXHJcblxyXG4vKipcclxuICog0J/QvtC70YPRh9C10L3QuNC1XHJcbiAqIEBwYXJhbSBhcnJfb2JqXHJcbiAqIEBwYXJhbSBrZXlcclxuICovXHJcbmZ1bmN0aW9uIGdldEFyckxpc3RGb3JPYmpLZXlzKGFycl9vYmosIGtleSkge1xyXG5cclxufVxyXG5cclxuXHJcblxyXG4vKipcclxuICog0KHQvtGA0YLQuNGA0L7QstC60LAg0LzQsNGB0YHQuNCy0LAg0L7QsdGK0LXQutGC0L7QsiBhcnJfb2JqINC/0L4g0LrQu9GO0YfRgyBrZXlcclxuICogQHBhcmFtIGFycl9vYmpcclxuICogQHBhcmFtIGtleVxyXG4gKiBAcmV0dXJuIHsqfVxyXG4gKi9cclxuZnVuY3Rpb24gcXVpY2tTb3J0QXJyT2JqKGFycl9vYmosIGtleSkge1xyXG5cclxuXHRpZihhcnJfb2JqLmxlbmd0aCA8IDIpe1xyXG5cdFx0cmV0dXJuIGFycl9vYmo7XHJcblx0fVxyXG5cclxuXHRjb25zdCByZWZlcmVuY2VfaW5kZXggPSBNYXRoLmNlaWwoYXJyX29iai5sZW5ndGggLyAyKSAtIDE7XHJcblx0Y29uc3QgcmVmZXJlbmNlX3ZhbHVlID0gYXJyX29ialtyZWZlcmVuY2VfaW5kZXhdW2tleV07XHJcblxyXG5cdGxldCBwcmV2aW91cyA9IFtdO1xyXG5cdGFycl9vYmouZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGluZGV4KSB7XHJcblx0XHRpZihpbmRleCA9PT0gcmVmZXJlbmNlX2luZGV4KXtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHZhbHVlW2tleV0gPCByZWZlcmVuY2VfdmFsdWUpe1xyXG5cdFx0XHRwcmV2aW91cy5wdXNoKHZhbHVlKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0bGV0IG5leHQgPSBbXTtcclxuXHRhcnJfb2JqLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBpbmRleCkge1xyXG5cdFx0aWYoaW5kZXggPT09IHJlZmVyZW5jZV9pbmRleCl7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZih2YWx1ZVtrZXldID49IHJlZmVyZW5jZV92YWx1ZSl7XHJcblx0XHRcdG5leHQucHVzaCh2YWx1ZSk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdHJldHVybiBxdWlja1NvcnRBcnJPamIocHJldmlvdXMsIGtleSkuY29uY2F0KGFycl9vYmpbcmVmZXJlbmNlX2luZGV4XSwgcXVpY2tTb3J0QXJyT2piKG5leHQsIGtleSkpO1xyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==