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

(0, _getFeedback.getFeedback)().then(function (feedbacks) {
	console.log(feedbacks);
}); //import './scss/bootstrap/bootstrap.scss'
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
		_axios2.default.get('/feedback_list.json', { data: { service: service } }).then(function (response) {

			if (response.status !== 200) {
				reject(response.statusText);
			} else {
				var feedback_list = response.data;

				// сортируем данные
				var feedback_list_sort = quickSortArrObj(feedback_list, 'date');
				// получаем список пользователей
				var users_id_list = getArrListForObjKeys(feedback_list, 'user_id');
				// получаем объект с пользователями
				_axios2.default.get('/users_list.json', { data: { users_id_list: users_id_list } }).then(function (response) {
					if (response.status !== 200) {
						reject(response.statusText);
					} else {
						var users_list = response.data;

						var feedbacks = buildFeedback(feedback_list_sort, users_list);

						fulfill(feedbacks);
					}
				});
			}
		});
	});
}

module.exports = { getFeedback: getFeedback };

/**
 *
 * @param feedback_list
 * @param users_list
 */
function buildFeedback(feedback_list, users_list) {
	var result_feedback = [];
	// клонируем массив пользователей

	var clone_user_list = JSON.parse(JSON.stringify(users_list));
	var cache_users = {};

	var _loop = function _loop(index) {
		var feedback = feedback_list[index];
		var id = feedback.id;
		var text = feedback.text;
		var name = getUserName(feedback.user_id);
		var date = function () {
			var number_date = parseInt(feedback.date, 10);
			var date = new Date(number_date);
			return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
		}();

		result_feedback.push({ id: id, name: name, text: text, date: date });
	};

	for (var index = 0; index < feedback_list.length; index++) {
		_loop(index);
	}

	return result_feedback;

	/**
  *
  * @param user_id
  * @return {*}
  */
	function getUserName(user_id) {
		if (cache_users[user_id]) {
			return cache_users[user_id];
		}
		var length = clone_user_list.length;
		for (var index = 0; index < length; index++) {
			var obj_user = clone_user_list[index];
			var test_user_id = obj_user["user_id"];
			var name = obj_user["name"];

			clone_user_list.splice(index, 1);
			--length;
			--index;

			cache_users[test_user_id] = name;

			if (test_user_id === user_id) {
				return name;
			}
		}
	}
}

/**
 * Получение массива ключей из объектов в переданном массиве по ключу
 * @param arr_obj {array} - массив объектов
 * @param key {string} - ключ, по которому извлекаются данный из массива объектов
 */
function getArrListForObjKeys(arr_obj, key) {
	var obj_key = {};
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = arr_obj[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var value = _step.value;

			obj_key[value[key]] = '';
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

	return Object.keys(obj_key);
}

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

	return quickSortArrObj(previous, key).concat(arr_obj[reference_index], quickSortArrObj(next, key));
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9jcmVhdGVFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9lbmhhbmNlRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL21lcmdlQ29uZmlnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3RyYW5zZm9ybURhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYmluZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3ByZWFkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2lzLWJ1ZmZlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbW9kdWxlcy9nZXRGZWVkYmFjay5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwicmVxdWlyZSIsInV0aWxzIiwic2V0dGxlIiwiYnVpbGRVUkwiLCJwYXJzZUhlYWRlcnMiLCJpc1VSTFNhbWVPcmlnaW4iLCJjcmVhdGVFcnJvciIsInhockFkYXB0ZXIiLCJjb25maWciLCJQcm9taXNlIiwiZGlzcGF0Y2hYaHJSZXF1ZXN0IiwicmVzb2x2ZSIsInJlamVjdCIsInJlcXVlc3REYXRhIiwiZGF0YSIsInJlcXVlc3RIZWFkZXJzIiwiaGVhZGVycyIsImlzRm9ybURhdGEiLCJyZXF1ZXN0IiwiWE1MSHR0cFJlcXVlc3QiLCJhdXRoIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsIkF1dGhvcml6YXRpb24iLCJidG9hIiwib3BlbiIsIm1ldGhvZCIsInRvVXBwZXJDYXNlIiwidXJsIiwicGFyYW1zIiwicGFyYW1zU2VyaWFsaXplciIsInRpbWVvdXQiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJoYW5kbGVMb2FkIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsInJlc3BvbnNlVVJMIiwiaW5kZXhPZiIsInJlc3BvbnNlSGVhZGVycyIsImdldEFsbFJlc3BvbnNlSGVhZGVycyIsInJlc3BvbnNlRGF0YSIsInJlc3BvbnNlVHlwZSIsInJlc3BvbnNlVGV4dCIsInJlc3BvbnNlIiwic3RhdHVzVGV4dCIsIm9uYWJvcnQiLCJoYW5kbGVBYm9ydCIsIm9uZXJyb3IiLCJoYW5kbGVFcnJvciIsIm9udGltZW91dCIsImhhbmRsZVRpbWVvdXQiLCJpc1N0YW5kYXJkQnJvd3NlckVudiIsImNvb2tpZXMiLCJ4c3JmVmFsdWUiLCJ3aXRoQ3JlZGVudGlhbHMiLCJ4c3JmQ29va2llTmFtZSIsInJlYWQiLCJ1bmRlZmluZWQiLCJ4c3JmSGVhZGVyTmFtZSIsImZvckVhY2giLCJzZXRSZXF1ZXN0SGVhZGVyIiwidmFsIiwia2V5IiwidG9Mb3dlckNhc2UiLCJlIiwib25Eb3dubG9hZFByb2dyZXNzIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uVXBsb2FkUHJvZ3Jlc3MiLCJ1cGxvYWQiLCJjYW5jZWxUb2tlbiIsInByb21pc2UiLCJ0aGVuIiwib25DYW5jZWxlZCIsImNhbmNlbCIsImFib3J0Iiwic2VuZCIsImJpbmQiLCJBeGlvcyIsIm1lcmdlQ29uZmlnIiwiZGVmYXVsdHMiLCJjcmVhdGVJbnN0YW5jZSIsImRlZmF1bHRDb25maWciLCJjb250ZXh0IiwiaW5zdGFuY2UiLCJwcm90b3R5cGUiLCJleHRlbmQiLCJheGlvcyIsImNyZWF0ZSIsImluc3RhbmNlQ29uZmlnIiwiQ2FuY2VsIiwiQ2FuY2VsVG9rZW4iLCJpc0NhbmNlbCIsImFsbCIsInByb21pc2VzIiwic3ByZWFkIiwiZGVmYXVsdCIsIm1lc3NhZ2UiLCJ0b1N0cmluZyIsIl9fQ0FOQ0VMX18iLCJleGVjdXRvciIsIlR5cGVFcnJvciIsInJlc29sdmVQcm9taXNlIiwicHJvbWlzZUV4ZWN1dG9yIiwidG9rZW4iLCJyZWFzb24iLCJ0aHJvd0lmUmVxdWVzdGVkIiwic291cmNlIiwiYyIsInZhbHVlIiwiSW50ZXJjZXB0b3JNYW5hZ2VyIiwiZGlzcGF0Y2hSZXF1ZXN0IiwiaW50ZXJjZXB0b3JzIiwiYXJndW1lbnRzIiwiY2hhaW4iLCJ1bnNoaWZ0UmVxdWVzdEludGVyY2VwdG9ycyIsImludGVyY2VwdG9yIiwidW5zaGlmdCIsImZ1bGZpbGxlZCIsInJlamVjdGVkIiwicHVzaFJlc3BvbnNlSW50ZXJjZXB0b3JzIiwicHVzaCIsImxlbmd0aCIsInNoaWZ0IiwiZ2V0VXJpIiwicmVwbGFjZSIsImZvckVhY2hNZXRob2ROb0RhdGEiLCJtZXJnZSIsImZvckVhY2hNZXRob2RXaXRoRGF0YSIsImhhbmRsZXJzIiwidXNlIiwiZWplY3QiLCJpZCIsImZuIiwiZm9yRWFjaEhhbmRsZXIiLCJoIiwiZW5oYW5jZUVycm9yIiwiY29kZSIsImVycm9yIiwiRXJyb3IiLCJ0cmFuc2Zvcm1EYXRhIiwiaXNBYnNvbHV0ZVVSTCIsImNvbWJpbmVVUkxzIiwidGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZCIsImJhc2VVUkwiLCJ0cmFuc2Zvcm1SZXF1ZXN0IiwiY29tbW9uIiwiY2xlYW5IZWFkZXJDb25maWciLCJhZGFwdGVyIiwib25BZGFwdGVyUmVzb2x1dGlvbiIsInRyYW5zZm9ybVJlc3BvbnNlIiwib25BZGFwdGVyUmVqZWN0aW9uIiwiaXNBeGlvc0Vycm9yIiwidG9KU09OIiwibmFtZSIsImRlc2NyaXB0aW9uIiwibnVtYmVyIiwiZmlsZU5hbWUiLCJsaW5lTnVtYmVyIiwiY29sdW1uTnVtYmVyIiwic3RhY2siLCJjb25maWcxIiwiY29uZmlnMiIsInZhbHVlRnJvbUNvbmZpZzIiLCJwcm9wIiwibWVyZ2VEZWVwUHJvcGVydGllcyIsImlzT2JqZWN0IiwiZGVlcE1lcmdlIiwiZGVmYXVsdFRvQ29uZmlnMiIsInZhbGlkYXRlU3RhdHVzIiwiZm5zIiwidHJhbnNmb3JtIiwibm9ybWFsaXplSGVhZGVyTmFtZSIsIkRFRkFVTFRfQ09OVEVOVF9UWVBFIiwic2V0Q29udGVudFR5cGVJZlVuc2V0IiwiaXNVbmRlZmluZWQiLCJnZXREZWZhdWx0QWRhcHRlciIsInByb2Nlc3MiLCJPYmplY3QiLCJjYWxsIiwiaXNBcnJheUJ1ZmZlciIsImlzQnVmZmVyIiwiaXNTdHJlYW0iLCJpc0ZpbGUiLCJpc0Jsb2IiLCJpc0FycmF5QnVmZmVyVmlldyIsImJ1ZmZlciIsImlzVVJMU2VhcmNoUGFyYW1zIiwiSlNPTiIsInN0cmluZ2lmeSIsInBhcnNlIiwibWF4Q29udGVudExlbmd0aCIsInRoaXNBcmciLCJ3cmFwIiwiYXJncyIsIkFycmF5IiwiaSIsImFwcGx5IiwiZW5jb2RlIiwiZW5jb2RlVVJJQ29tcG9uZW50Iiwic2VyaWFsaXplZFBhcmFtcyIsInBhcnRzIiwic2VyaWFsaXplIiwiaXNBcnJheSIsInBhcnNlVmFsdWUiLCJ2IiwiaXNEYXRlIiwidG9JU09TdHJpbmciLCJqb2luIiwiaGFzaG1hcmtJbmRleCIsInNsaWNlIiwicmVsYXRpdmVVUkwiLCJzdGFuZGFyZEJyb3dzZXJFbnYiLCJ3cml0ZSIsImV4cGlyZXMiLCJwYXRoIiwiZG9tYWluIiwic2VjdXJlIiwiY29va2llIiwiaXNOdW1iZXIiLCJEYXRlIiwidG9HTVRTdHJpbmciLCJpc1N0cmluZyIsImRvY3VtZW50IiwibWF0Y2giLCJSZWdFeHAiLCJkZWNvZGVVUklDb21wb25lbnQiLCJyZW1vdmUiLCJub3ciLCJub25TdGFuZGFyZEJyb3dzZXJFbnYiLCJ0ZXN0IiwibXNpZSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsInVybFBhcnNpbmdOb2RlIiwiY3JlYXRlRWxlbWVudCIsIm9yaWdpblVSTCIsInJlc29sdmVVUkwiLCJocmVmIiwic2V0QXR0cmlidXRlIiwicHJvdG9jb2wiLCJob3N0Iiwic2VhcmNoIiwiaGFzaCIsImhvc3RuYW1lIiwicG9ydCIsInBhdGhuYW1lIiwiY2hhckF0Iiwid2luZG93IiwibG9jYXRpb24iLCJyZXF1ZXN0VVJMIiwicGFyc2VkIiwibm9ybWFsaXplZE5hbWUiLCJwcm9jZXNzSGVhZGVyIiwiaWdub3JlRHVwbGljYXRlT2YiLCJzcGxpdCIsInBhcnNlciIsImxpbmUiLCJ0cmltIiwic3Vic3RyIiwiY29uY2F0IiwiY2FsbGJhY2siLCJhcnIiLCJGb3JtRGF0YSIsInJlc3VsdCIsIkFycmF5QnVmZmVyIiwiaXNWaWV3IiwiaXNGdW5jdGlvbiIsInBpcGUiLCJVUkxTZWFyY2hQYXJhbXMiLCJzdHIiLCJwcm9kdWN0Iiwib2JqIiwibCIsImhhc093blByb3BlcnR5IiwiYXNzaWduVmFsdWUiLCJhIiwiYiIsImNvbnN0cnVjdG9yIiwiY2FjaGVkU2V0VGltZW91dCIsImNhY2hlZENsZWFyVGltZW91dCIsImRlZmF1bHRTZXRUaW1vdXQiLCJkZWZhdWx0Q2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsImNsZWFyVGltZW91dCIsInJ1blRpbWVvdXQiLCJmdW4iLCJydW5DbGVhclRpbWVvdXQiLCJtYXJrZXIiLCJxdWV1ZSIsImRyYWluaW5nIiwiY3VycmVudFF1ZXVlIiwicXVldWVJbmRleCIsImNsZWFuVXBOZXh0VGljayIsImRyYWluUXVldWUiLCJsZW4iLCJydW4iLCJuZXh0VGljayIsIkl0ZW0iLCJhcnJheSIsInRpdGxlIiwiYnJvd3NlciIsImVudiIsImFyZ3YiLCJ2ZXJzaW9uIiwidmVyc2lvbnMiLCJub29wIiwib24iLCJhZGRMaXN0ZW5lciIsIm9uY2UiLCJvZmYiLCJyZW1vdmVMaXN0ZW5lciIsInJlbW92ZUFsbExpc3RlbmVycyIsImVtaXQiLCJwcmVwZW5kTGlzdGVuZXIiLCJwcmVwZW5kT25jZUxpc3RlbmVyIiwibGlzdGVuZXJzIiwiYmluZGluZyIsImN3ZCIsImNoZGlyIiwiZGlyIiwidW1hc2siLCJmZWVkYmFja3MiLCJjb25zb2xlIiwibG9nIiwiZ2V0RmVlZGJhY2siLCJzZXJ2aWNlIiwiZnVsZmlsbCIsImdldCIsImZlZWRiYWNrX2xpc3QiLCJmZWVkYmFja19saXN0X3NvcnQiLCJxdWlja1NvcnRBcnJPYmoiLCJ1c2Vyc19pZF9saXN0IiwiZ2V0QXJyTGlzdEZvck9iaktleXMiLCJ1c2Vyc19saXN0IiwiYnVpbGRGZWVkYmFjayIsInJlc3VsdF9mZWVkYmFjayIsImNsb25lX3VzZXJfbGlzdCIsImNhY2hlX3VzZXJzIiwiaW5kZXgiLCJmZWVkYmFjayIsInRleHQiLCJnZXRVc2VyTmFtZSIsInVzZXJfaWQiLCJkYXRlIiwibnVtYmVyX2RhdGUiLCJwYXJzZUludCIsImdldEZ1bGxZZWFyIiwiZ2V0TW9udGgiLCJnZXREYXRlIiwib2JqX3VzZXIiLCJ0ZXN0X3VzZXJfaWQiLCJzcGxpY2UiLCJhcnJfb2JqIiwib2JqX2tleSIsImtleXMiLCJyZWZlcmVuY2VfaW5kZXgiLCJNYXRoIiwiY2VpbCIsInJlZmVyZW5jZV92YWx1ZSIsInByZXZpb3VzIiwibmV4dCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QXRDLEVBQWdFekIsZ0JBQWdCOEIsSUFBaEIsRUFBc0IxUyxHQUF0QixDQUFoRSxDQUFQO0FBQ0EsQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2F4aW9zJyk7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgc2V0dGxlID0gcmVxdWlyZSgnLi8uLi9jb3JlL3NldHRsZScpO1xudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG52YXIgcGFyc2VIZWFkZXJzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL3BhcnNlSGVhZGVycycpO1xudmFyIGlzVVJMU2FtZU9yaWdpbiA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9pc1VSTFNhbWVPcmlnaW4nKTtcbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4uL2NvcmUvY3JlYXRlRXJyb3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB4aHJBZGFwdGVyKGNvbmZpZykge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gZGlzcGF0Y2hYaHJSZXF1ZXN0KHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhciByZXF1ZXN0RGF0YSA9IGNvbmZpZy5kYXRhO1xuICAgIHZhciByZXF1ZXN0SGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzO1xuXG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEocmVxdWVzdERhdGEpKSB7XG4gICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddOyAvLyBMZXQgdGhlIGJyb3dzZXIgc2V0IGl0XG4gICAgfVxuXG4gICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgIC8vIEhUVFAgYmFzaWMgYXV0aGVudGljYXRpb25cbiAgICBpZiAoY29uZmlnLmF1dGgpIHtcbiAgICAgIHZhciB1c2VybmFtZSA9IGNvbmZpZy5hdXRoLnVzZXJuYW1lIHx8ICcnO1xuICAgICAgdmFyIHBhc3N3b3JkID0gY29uZmlnLmF1dGgucGFzc3dvcmQgfHwgJyc7XG4gICAgICByZXF1ZXN0SGVhZGVycy5BdXRob3JpemF0aW9uID0gJ0Jhc2ljICcgKyBidG9hKHVzZXJuYW1lICsgJzonICsgcGFzc3dvcmQpO1xuICAgIH1cblxuICAgIHJlcXVlc3Qub3Blbihjb25maWcubWV0aG9kLnRvVXBwZXJDYXNlKCksIGJ1aWxkVVJMKGNvbmZpZy51cmwsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKSwgdHJ1ZSk7XG5cbiAgICAvLyBTZXQgdGhlIHJlcXVlc3QgdGltZW91dCBpbiBNU1xuICAgIHJlcXVlc3QudGltZW91dCA9IGNvbmZpZy50aW1lb3V0O1xuXG4gICAgLy8gTGlzdGVuIGZvciByZWFkeSBzdGF0ZVxuICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCB8fCByZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBUaGUgcmVxdWVzdCBlcnJvcmVkIG91dCBhbmQgd2UgZGlkbid0IGdldCBhIHJlc3BvbnNlLCB0aGlzIHdpbGwgYmVcbiAgICAgIC8vIGhhbmRsZWQgYnkgb25lcnJvciBpbnN0ZWFkXG4gICAgICAvLyBXaXRoIG9uZSBleGNlcHRpb246IHJlcXVlc3QgdGhhdCB1c2luZyBmaWxlOiBwcm90b2NvbCwgbW9zdCBicm93c2Vyc1xuICAgICAgLy8gd2lsbCByZXR1cm4gc3RhdHVzIGFzIDAgZXZlbiB0aG91Z2ggaXQncyBhIHN1Y2Nlc3NmdWwgcmVxdWVzdFxuICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAwICYmICEocmVxdWVzdC5yZXNwb25zZVVSTCAmJiByZXF1ZXN0LnJlc3BvbnNlVVJMLmluZGV4T2YoJ2ZpbGU6JykgPT09IDApKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gUHJlcGFyZSB0aGUgcmVzcG9uc2VcbiAgICAgIHZhciByZXNwb25zZUhlYWRlcnMgPSAnZ2V0QWxsUmVzcG9uc2VIZWFkZXJzJyBpbiByZXF1ZXN0ID8gcGFyc2VIZWFkZXJzKHJlcXVlc3QuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpIDogbnVsbDtcbiAgICAgIHZhciByZXNwb25zZURhdGEgPSAhY29uZmlnLnJlc3BvbnNlVHlwZSB8fCBjb25maWcucmVzcG9uc2VUeXBlID09PSAndGV4dCcgPyByZXF1ZXN0LnJlc3BvbnNlVGV4dCA6IHJlcXVlc3QucmVzcG9uc2U7XG4gICAgICB2YXIgcmVzcG9uc2UgPSB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgc3RhdHVzOiByZXF1ZXN0LnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVxdWVzdC5zdGF0dXNUZXh0LFxuICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICByZXF1ZXN0OiByZXF1ZXN0XG4gICAgICB9O1xuXG4gICAgICBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgYnJvd3NlciByZXF1ZXN0IGNhbmNlbGxhdGlvbiAoYXMgb3Bwb3NlZCB0byBhIG1hbnVhbCBjYW5jZWxsYXRpb24pXG4gICAgcmVxdWVzdC5vbmFib3J0ID0gZnVuY3Rpb24gaGFuZGxlQWJvcnQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ1JlcXVlc3QgYWJvcnRlZCcsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBsb3cgbGV2ZWwgbmV0d29yayBlcnJvcnNcbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcigpIHtcbiAgICAgIC8vIFJlYWwgZXJyb3JzIGFyZSBoaWRkZW4gZnJvbSB1cyBieSB0aGUgYnJvd3NlclxuICAgICAgLy8gb25lcnJvciBzaG91bGQgb25seSBmaXJlIGlmIGl0J3MgYSBuZXR3b3JrIGVycm9yXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBjb25maWcsIG51bGwsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSB0aW1lb3V0XG4gICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCd0aW1lb3V0IG9mICcgKyBjb25maWcudGltZW91dCArICdtcyBleGNlZWRlZCcsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsXG4gICAgICAgIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgIC8vIFRoaXMgaXMgb25seSBkb25lIGlmIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50LlxuICAgIC8vIFNwZWNpZmljYWxseSBub3QgaWYgd2UncmUgaW4gYSB3ZWIgd29ya2VyLCBvciByZWFjdC1uYXRpdmUuXG4gICAgaWYgKHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkpIHtcbiAgICAgIHZhciBjb29raWVzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2Nvb2tpZXMnKTtcblxuICAgICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgICB2YXIgeHNyZlZhbHVlID0gKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMgfHwgaXNVUkxTYW1lT3JpZ2luKGNvbmZpZy51cmwpKSAmJiBjb25maWcueHNyZkNvb2tpZU5hbWUgP1xuICAgICAgICBjb29raWVzLnJlYWQoY29uZmlnLnhzcmZDb29raWVOYW1lKSA6XG4gICAgICAgIHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHhzcmZWYWx1ZSkge1xuICAgICAgICByZXF1ZXN0SGVhZGVyc1tjb25maWcueHNyZkhlYWRlck5hbWVdID0geHNyZlZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFkZCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0XG4gICAgaWYgKCdzZXRSZXF1ZXN0SGVhZGVyJyBpbiByZXF1ZXN0KSB7XG4gICAgICB1dGlscy5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVxdWVzdERhdGEgPT09ICd1bmRlZmluZWQnICYmIGtleS50b0xvd2VyQ2FzZSgpID09PSAnY29udGVudC10eXBlJykge1xuICAgICAgICAgIC8vIFJlbW92ZSBDb250ZW50LVR5cGUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgICAgICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBPdGhlcndpc2UgYWRkIGhlYWRlciB0byB0aGUgcmVxdWVzdFxuICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEFkZCB3aXRoQ3JlZGVudGlhbHMgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoY29uZmlnLndpdGhDcmVkZW50aWFscykge1xuICAgICAgcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIEFkZCByZXNwb25zZVR5cGUgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBjb25maWcucmVzcG9uc2VUeXBlO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBFeHBlY3RlZCBET01FeGNlcHRpb24gdGhyb3duIGJ5IGJyb3dzZXJzIG5vdCBjb21wYXRpYmxlIFhNTEh0dHBSZXF1ZXN0IExldmVsIDIuXG4gICAgICAgIC8vIEJ1dCwgdGhpcyBjYW4gYmUgc3VwcHJlc3NlZCBmb3IgJ2pzb24nIHR5cGUgYXMgaXQgY2FuIGJlIHBhcnNlZCBieSBkZWZhdWx0ICd0cmFuc2Zvcm1SZXNwb25zZScgZnVuY3Rpb24uXG4gICAgICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlICE9PSAnanNvbicpIHtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHByb2dyZXNzIGlmIG5lZWRlZFxuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIC8vIE5vdCBhbGwgYnJvd3NlcnMgc3VwcG9ydCB1cGxvYWQgZXZlbnRzXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25VcGxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJyAmJiByZXF1ZXN0LnVwbG9hZCkge1xuICAgICAgcmVxdWVzdC51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25VcGxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgICAgLy8gSGFuZGxlIGNhbmNlbGxhdGlvblxuICAgICAgY29uZmlnLmNhbmNlbFRva2VuLnByb21pc2UudGhlbihmdW5jdGlvbiBvbkNhbmNlbGVkKGNhbmNlbCkge1xuICAgICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZXF1ZXN0LmFib3J0KCk7XG4gICAgICAgIHJlamVjdChjYW5jZWwpO1xuICAgICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHJlcXVlc3REYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlcXVlc3REYXRhID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBTZW5kIHRoZSByZXF1ZXN0XG4gICAgcmVxdWVzdC5zZW5kKHJlcXVlc3REYXRhKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG52YXIgQXhpb3MgPSByZXF1aXJlKCcuL2NvcmUvQXhpb3MnKTtcbnZhciBtZXJnZUNvbmZpZyA9IHJlcXVpcmUoJy4vY29yZS9tZXJnZUNvbmZpZycpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0Q29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdENvbmZpZykge1xuICB2YXIgY29udGV4dCA9IG5ldyBBeGlvcyhkZWZhdWx0Q29uZmlnKTtcbiAgdmFyIGluc3RhbmNlID0gYmluZChBeGlvcy5wcm90b3R5cGUucmVxdWVzdCwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBheGlvcy5wcm90b3R5cGUgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBBeGlvcy5wcm90b3R5cGUsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgY29udGV4dCB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIGNvbnRleHQpO1xuXG4gIHJldHVybiBpbnN0YW5jZTtcbn1cblxuLy8gQ3JlYXRlIHRoZSBkZWZhdWx0IGluc3RhbmNlIHRvIGJlIGV4cG9ydGVkXG52YXIgYXhpb3MgPSBjcmVhdGVJbnN0YW5jZShkZWZhdWx0cyk7XG5cbi8vIEV4cG9zZSBBeGlvcyBjbGFzcyB0byBhbGxvdyBjbGFzcyBpbmhlcml0YW5jZVxuYXhpb3MuQXhpb3MgPSBBeGlvcztcblxuLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xuYXhpb3MuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGluc3RhbmNlQ29uZmlnKSB7XG4gIHJldHVybiBjcmVhdGVJbnN0YW5jZShtZXJnZUNvbmZpZyhheGlvcy5kZWZhdWx0cywgaW5zdGFuY2VDb25maWcpKTtcbn07XG5cbi8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuYXhpb3MuQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsJyk7XG5heGlvcy5DYW5jZWxUb2tlbiA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbFRva2VuJyk7XG5heGlvcy5pc0NhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL2lzQ2FuY2VsJyk7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5heGlvcy5zcHJlYWQgPSByZXF1aXJlKCcuL2hlbHBlcnMvc3ByZWFkJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gYXhpb3M7XG5cbi8vIEFsbG93IHVzZSBvZiBkZWZhdWx0IGltcG9ydCBzeW50YXggaW4gVHlwZVNjcmlwdFxubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEEgYENhbmNlbGAgaXMgYW4gb2JqZWN0IHRoYXQgaXMgdGhyb3duIHdoZW4gYW4gb3BlcmF0aW9uIGlzIGNhbmNlbGVkLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtzdHJpbmc9fSBtZXNzYWdlIFRoZSBtZXNzYWdlLlxuICovXG5mdW5jdGlvbiBDYW5jZWwobWVzc2FnZSkge1xuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xufVxuXG5DYW5jZWwucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiAnQ2FuY2VsJyArICh0aGlzLm1lc3NhZ2UgPyAnOiAnICsgdGhpcy5tZXNzYWdlIDogJycpO1xufTtcblxuQ2FuY2VsLnByb3RvdHlwZS5fX0NBTkNFTF9fID0gdHJ1ZTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWw7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBDYW5jZWwgPSByZXF1aXJlKCcuL0NhbmNlbCcpO1xuXG4vKipcbiAqIEEgYENhbmNlbFRva2VuYCBpcyBhbiBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byByZXF1ZXN0IGNhbmNlbGxhdGlvbiBvZiBhbiBvcGVyYXRpb24uXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGVjdXRvciBUaGUgZXhlY3V0b3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIENhbmNlbFRva2VuKGV4ZWN1dG9yKSB7XG4gIGlmICh0eXBlb2YgZXhlY3V0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleGVjdXRvciBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICB2YXIgcmVzb2x2ZVByb21pc2U7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIHByb21pc2VFeGVjdXRvcihyZXNvbHZlKSB7XG4gICAgcmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xuICB9KTtcblxuICB2YXIgdG9rZW4gPSB0aGlzO1xuICBleGVjdXRvcihmdW5jdGlvbiBjYW5jZWwobWVzc2FnZSkge1xuICAgIGlmICh0b2tlbi5yZWFzb24pIHtcbiAgICAgIC8vIENhbmNlbGxhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHJlcXVlc3RlZFxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRva2VuLnJlYXNvbiA9IG5ldyBDYW5jZWwobWVzc2FnZSk7XG4gICAgcmVzb2x2ZVByb21pc2UodG9rZW4ucmVhc29uKTtcbiAgfSk7XG59XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuQ2FuY2VsVG9rZW4ucHJvdG90eXBlLnRocm93SWZSZXF1ZXN0ZWQgPSBmdW5jdGlvbiB0aHJvd0lmUmVxdWVzdGVkKCkge1xuICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICB0aHJvdyB0aGlzLnJlYXNvbjtcbiAgfVxufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgbmV3IGBDYW5jZWxUb2tlbmAgYW5kIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBjYWxsZWQsXG4gKiBjYW5jZWxzIHRoZSBgQ2FuY2VsVG9rZW5gLlxuICovXG5DYW5jZWxUb2tlbi5zb3VyY2UgPSBmdW5jdGlvbiBzb3VyY2UoKSB7XG4gIHZhciBjYW5jZWw7XG4gIHZhciB0b2tlbiA9IG5ldyBDYW5jZWxUb2tlbihmdW5jdGlvbiBleGVjdXRvcihjKSB7XG4gICAgY2FuY2VsID0gYztcbiAgfSk7XG4gIHJldHVybiB7XG4gICAgdG9rZW46IHRva2VuLFxuICAgIGNhbmNlbDogY2FuY2VsXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbFRva2VuO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQ2FuY2VsKHZhbHVlKSB7XG4gIHJldHVybiAhISh2YWx1ZSAmJiB2YWx1ZS5fX0NBTkNFTF9fKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvYnVpbGRVUkwnKTtcbnZhciBJbnRlcmNlcHRvck1hbmFnZXIgPSByZXF1aXJlKCcuL0ludGVyY2VwdG9yTWFuYWdlcicpO1xudmFyIGRpc3BhdGNoUmVxdWVzdCA9IHJlcXVpcmUoJy4vZGlzcGF0Y2hSZXF1ZXN0Jyk7XG52YXIgbWVyZ2VDb25maWcgPSByZXF1aXJlKCcuL21lcmdlQ29uZmlnJyk7XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlQ29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIEF4aW9zKGluc3RhbmNlQ29uZmlnKSB7XG4gIHRoaXMuZGVmYXVsdHMgPSBpbnN0YW5jZUNvbmZpZztcbiAgdGhpcy5pbnRlcmNlcHRvcnMgPSB7XG4gICAgcmVxdWVzdDogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpLFxuICAgIHJlc3BvbnNlOiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKClcbiAgfTtcbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcgc3BlY2lmaWMgZm9yIHRoaXMgcmVxdWVzdCAobWVyZ2VkIHdpdGggdGhpcy5kZWZhdWx0cylcbiAqL1xuQXhpb3MucHJvdG90eXBlLnJlcXVlc3QgPSBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgLy8gQWxsb3cgZm9yIGF4aW9zKCdleGFtcGxlL3VybCdbLCBjb25maWddKSBhIGxhIGZldGNoIEFQSVxuICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25maWcgPSBhcmd1bWVudHNbMV0gfHwge307XG4gICAgY29uZmlnLnVybCA9IGFyZ3VtZW50c1swXTtcbiAgfSBlbHNlIHtcbiAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gIH1cblxuICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuICBjb25maWcubWV0aG9kID0gY29uZmlnLm1ldGhvZCA/IGNvbmZpZy5tZXRob2QudG9Mb3dlckNhc2UoKSA6ICdnZXQnO1xuXG4gIC8vIEhvb2sgdXAgaW50ZXJjZXB0b3JzIG1pZGRsZXdhcmVcbiAgdmFyIGNoYWluID0gW2Rpc3BhdGNoUmVxdWVzdCwgdW5kZWZpbmVkXTtcbiAgdmFyIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcblxuICB0aGlzLmludGVyY2VwdG9ycy5yZXF1ZXN0LmZvckVhY2goZnVuY3Rpb24gdW5zaGlmdFJlcXVlc3RJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi51bnNoaWZ0KGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uIHB1c2hSZXNwb25zZUludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnB1c2goaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHdoaWxlIChjaGFpbi5sZW5ndGgpIHtcbiAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKGNoYWluLnNoaWZ0KCksIGNoYWluLnNoaWZ0KCkpO1xuICB9XG5cbiAgcmV0dXJuIHByb21pc2U7XG59O1xuXG5BeGlvcy5wcm90b3R5cGUuZ2V0VXJpID0gZnVuY3Rpb24gZ2V0VXJpKGNvbmZpZykge1xuICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuICByZXR1cm4gYnVpbGRVUkwoY29uZmlnLnVybCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLnJlcGxhY2UoL15cXD8vLCAnJyk7XG59O1xuXG4vLyBQcm92aWRlIGFsaWFzZXMgZm9yIHN1cHBvcnRlZCByZXF1ZXN0IG1ldGhvZHNcbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAnb3B0aW9ucyddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh1dGlscy5tZXJnZShjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmxcbiAgICB9KSk7XG4gIH07XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGRhdGEsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXRpbHMubWVyZ2UoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsLFxuICAgICAgZGF0YTogZGF0YVxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIEludGVyY2VwdG9yTWFuYWdlcigpIHtcbiAgdGhpcy5oYW5kbGVycyA9IFtdO1xufVxuXG4vKipcbiAqIEFkZCBhIG5ldyBpbnRlcmNlcHRvciB0byB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdWxmaWxsZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgdGhlbmAgZm9yIGEgYFByb21pc2VgXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3RlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGByZWplY3RgIGZvciBhIGBQcm9taXNlYFxuICpcbiAqIEByZXR1cm4ge051bWJlcn0gQW4gSUQgdXNlZCB0byByZW1vdmUgaW50ZXJjZXB0b3IgbGF0ZXJcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiB1c2UoZnVsZmlsbGVkLCByZWplY3RlZCkge1xuICB0aGlzLmhhbmRsZXJzLnB1c2goe1xuICAgIGZ1bGZpbGxlZDogZnVsZmlsbGVkLFxuICAgIHJlamVjdGVkOiByZWplY3RlZFxuICB9KTtcbiAgcmV0dXJuIHRoaXMuaGFuZGxlcnMubGVuZ3RoIC0gMTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGFuIGludGVyY2VwdG9yIGZyb20gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGlkIFRoZSBJRCB0aGF0IHdhcyByZXR1cm5lZCBieSBgdXNlYFxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmVqZWN0ID0gZnVuY3Rpb24gZWplY3QoaWQpIHtcbiAgaWYgKHRoaXMuaGFuZGxlcnNbaWRdKSB7XG4gICAgdGhpcy5oYW5kbGVyc1tpZF0gPSBudWxsO1xuICB9XG59O1xuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbGwgdGhlIHJlZ2lzdGVyZWQgaW50ZXJjZXB0b3JzXG4gKlxuICogVGhpcyBtZXRob2QgaXMgcGFydGljdWxhcmx5IHVzZWZ1bCBmb3Igc2tpcHBpbmcgb3ZlciBhbnlcbiAqIGludGVyY2VwdG9ycyB0aGF0IG1heSBoYXZlIGJlY29tZSBgbnVsbGAgY2FsbGluZyBgZWplY3RgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGludGVyY2VwdG9yXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIGZvckVhY2goZm4pIHtcbiAgdXRpbHMuZm9yRWFjaCh0aGlzLmhhbmRsZXJzLCBmdW5jdGlvbiBmb3JFYWNoSGFuZGxlcihoKSB7XG4gICAgaWYgKGggIT09IG51bGwpIHtcbiAgICAgIGZuKGgpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEludGVyY2VwdG9yTWFuYWdlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGVuaGFuY2VFcnJvciA9IHJlcXVpcmUoJy4vZW5oYW5jZUVycm9yJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBtZXNzYWdlLCBjb25maWcsIGVycm9yIGNvZGUsIHJlcXVlc3QgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZUVycm9yKG1lc3NhZ2UsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgdmFyIGVycm9yID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICByZXR1cm4gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciB0cmFuc2Zvcm1EYXRhID0gcmVxdWlyZSgnLi90cmFuc2Zvcm1EYXRhJyk7XG52YXIgaXNDYW5jZWwgPSByZXF1aXJlKCcuLi9jYW5jZWwvaXNDYW5jZWwnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRzJyk7XG52YXIgaXNBYnNvbHV0ZVVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9pc0Fic29sdXRlVVJMJyk7XG52YXIgY29tYmluZVVSTHMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29tYmluZVVSTHMnKTtcblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5mdW5jdGlvbiB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZykge1xuICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgY29uZmlnLmNhbmNlbFRva2VuLnRocm93SWZSZXF1ZXN0ZWQoKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdCB0byB0aGUgc2VydmVyIHVzaW5nIHRoZSBjb25maWd1cmVkIGFkYXB0ZXIuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkaXNwYXRjaFJlcXVlc3QoY29uZmlnKSB7XG4gIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAvLyBTdXBwb3J0IGJhc2VVUkwgY29uZmlnXG4gIGlmIChjb25maWcuYmFzZVVSTCAmJiAhaXNBYnNvbHV0ZVVSTChjb25maWcudXJsKSkge1xuICAgIGNvbmZpZy51cmwgPSBjb21iaW5lVVJMcyhjb25maWcuYmFzZVVSTCwgY29uZmlnLnVybCk7XG4gIH1cblxuICAvLyBFbnN1cmUgaGVhZGVycyBleGlzdFxuICBjb25maWcuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzIHx8IHt9O1xuXG4gIC8vIFRyYW5zZm9ybSByZXF1ZXN0IGRhdGFcbiAgY29uZmlnLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgIGNvbmZpZy5kYXRhLFxuICAgIGNvbmZpZy5oZWFkZXJzLFxuICAgIGNvbmZpZy50cmFuc2Zvcm1SZXF1ZXN0XG4gICk7XG5cbiAgLy8gRmxhdHRlbiBoZWFkZXJzXG4gIGNvbmZpZy5oZWFkZXJzID0gdXRpbHMubWVyZ2UoXG4gICAgY29uZmlnLmhlYWRlcnMuY29tbW9uIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzW2NvbmZpZy5tZXRob2RdIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzIHx8IHt9XG4gICk7XG5cbiAgdXRpbHMuZm9yRWFjaChcbiAgICBbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdwb3N0JywgJ3B1dCcsICdwYXRjaCcsICdjb21tb24nXSxcbiAgICBmdW5jdGlvbiBjbGVhbkhlYWRlckNvbmZpZyhtZXRob2QpIHtcbiAgICAgIGRlbGV0ZSBjb25maWcuaGVhZGVyc1ttZXRob2RdO1xuICAgIH1cbiAgKTtcblxuICB2YXIgYWRhcHRlciA9IGNvbmZpZy5hZGFwdGVyIHx8IGRlZmF1bHRzLmFkYXB0ZXI7XG5cbiAgcmV0dXJuIGFkYXB0ZXIoY29uZmlnKS50aGVuKGZ1bmN0aW9uIG9uQWRhcHRlclJlc29sdXRpb24ocmVzcG9uc2UpIHtcbiAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgIHJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgcmVzcG9uc2UuZGF0YSxcbiAgICAgIHJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICApO1xuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9LCBmdW5jdGlvbiBvbkFkYXB0ZXJSZWplY3Rpb24ocmVhc29uKSB7XG4gICAgaWYgKCFpc0NhbmNlbChyZWFzb24pKSB7XG4gICAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgICBpZiAocmVhc29uICYmIHJlYXNvbi5yZXNwb25zZSkge1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEsXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVcGRhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIGNvbmZpZywgZXJyb3IgY29kZSwgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVycm9yIFRoZSBlcnJvciB0byB1cGRhdGUuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGVycm9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICBlcnJvci5jb25maWcgPSBjb25maWc7XG4gIGlmIChjb2RlKSB7XG4gICAgZXJyb3IuY29kZSA9IGNvZGU7XG4gIH1cblxuICBlcnJvci5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgZXJyb3IucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgZXJyb3IuaXNBeGlvc0Vycm9yID0gdHJ1ZTtcblxuICBlcnJvci50b0pTT04gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLy8gU3RhbmRhcmRcbiAgICAgIG1lc3NhZ2U6IHRoaXMubWVzc2FnZSxcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgIC8vIE1pY3Jvc29mdFxuICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb24sXG4gICAgICBudW1iZXI6IHRoaXMubnVtYmVyLFxuICAgICAgLy8gTW96aWxsYVxuICAgICAgZmlsZU5hbWU6IHRoaXMuZmlsZU5hbWUsXG4gICAgICBsaW5lTnVtYmVyOiB0aGlzLmxpbmVOdW1iZXIsXG4gICAgICBjb2x1bW5OdW1iZXI6IHRoaXMuY29sdW1uTnVtYmVyLFxuICAgICAgc3RhY2s6IHRoaXMuc3RhY2ssXG4gICAgICAvLyBBeGlvc1xuICAgICAgY29uZmlnOiB0aGlzLmNvbmZpZyxcbiAgICAgIGNvZGU6IHRoaXMuY29kZVxuICAgIH07XG4gIH07XG4gIHJldHVybiBlcnJvcjtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbi8qKlxuICogQ29uZmlnLXNwZWNpZmljIG1lcmdlLWZ1bmN0aW9uIHdoaWNoIGNyZWF0ZXMgYSBuZXcgY29uZmlnLW9iamVjdFxuICogYnkgbWVyZ2luZyB0d28gY29uZmlndXJhdGlvbiBvYmplY3RzIHRvZ2V0aGVyLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcxXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMlxuICogQHJldHVybnMge09iamVjdH0gTmV3IG9iamVjdCByZXN1bHRpbmcgZnJvbSBtZXJnaW5nIGNvbmZpZzIgdG8gY29uZmlnMVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1lcmdlQ29uZmlnKGNvbmZpZzEsIGNvbmZpZzIpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGNvbmZpZzIgPSBjb25maWcyIHx8IHt9O1xuICB2YXIgY29uZmlnID0ge307XG5cbiAgdXRpbHMuZm9yRWFjaChbJ3VybCcsICdtZXRob2QnLCAncGFyYW1zJywgJ2RhdGEnXSwgZnVuY3Rpb24gdmFsdWVGcm9tQ29uZmlnMihwcm9wKSB7XG4gICAgaWYgKHR5cGVvZiBjb25maWcyW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMltwcm9wXTtcbiAgICB9XG4gIH0pO1xuXG4gIHV0aWxzLmZvckVhY2goWydoZWFkZXJzJywgJ2F1dGgnLCAncHJveHknXSwgZnVuY3Rpb24gbWVyZ2VEZWVwUHJvcGVydGllcyhwcm9wKSB7XG4gICAgaWYgKHV0aWxzLmlzT2JqZWN0KGNvbmZpZzJbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSB1dGlscy5kZWVwTWVyZ2UoY29uZmlnMVtwcm9wXSwgY29uZmlnMltwcm9wXSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY29uZmlnMltwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGNvbmZpZzJbcHJvcF07XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc09iamVjdChjb25maWcxW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gdXRpbHMuZGVlcE1lcmdlKGNvbmZpZzFbcHJvcF0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvbmZpZzFbcHJvcF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBjb25maWcxW3Byb3BdO1xuICAgIH1cbiAgfSk7XG5cbiAgdXRpbHMuZm9yRWFjaChbXG4gICAgJ2Jhc2VVUkwnLCAndHJhbnNmb3JtUmVxdWVzdCcsICd0cmFuc2Zvcm1SZXNwb25zZScsICdwYXJhbXNTZXJpYWxpemVyJyxcbiAgICAndGltZW91dCcsICd3aXRoQ3JlZGVudGlhbHMnLCAnYWRhcHRlcicsICdyZXNwb25zZVR5cGUnLCAneHNyZkNvb2tpZU5hbWUnLFxuICAgICd4c3JmSGVhZGVyTmFtZScsICdvblVwbG9hZFByb2dyZXNzJywgJ29uRG93bmxvYWRQcm9ncmVzcycsICdtYXhDb250ZW50TGVuZ3RoJyxcbiAgICAndmFsaWRhdGVTdGF0dXMnLCAnbWF4UmVkaXJlY3RzJywgJ2h0dHBBZ2VudCcsICdodHRwc0FnZW50JywgJ2NhbmNlbFRva2VuJyxcbiAgICAnc29ja2V0UGF0aCdcbiAgXSwgZnVuY3Rpb24gZGVmYXVsdFRvQ29uZmlnMihwcm9wKSB7XG4gICAgaWYgKHR5cGVvZiBjb25maWcyW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMltwcm9wXTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb25maWcxW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMVtwcm9wXTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBjb25maWc7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuL2NyZWF0ZUVycm9yJyk7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpIHtcbiAgdmFyIHZhbGlkYXRlU3RhdHVzID0gcmVzcG9uc2UuY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xuICBpZiAoIXZhbGlkYXRlU3RhdHVzIHx8IHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICByZWplY3QoY3JlYXRlRXJyb3IoXG4gICAgICAnUmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgcmVzcG9uc2UuY29uZmlnLFxuICAgICAgbnVsbCxcbiAgICAgIHJlc3BvbnNlLnJlcXVlc3QsXG4gICAgICByZXNwb25zZVxuICAgICkpO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbi8qKlxuICogVHJhbnNmb3JtIHRoZSBkYXRhIGZvciBhIHJlcXVlc3Qgb3IgYSByZXNwb25zZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gZGF0YSBUaGUgZGF0YSB0byBiZSB0cmFuc2Zvcm1lZFxuICogQHBhcmFtIHtBcnJheX0gaGVhZGVycyBUaGUgaGVhZGVycyBmb3IgdGhlIHJlcXVlc3Qgb3IgcmVzcG9uc2VcbiAqIEBwYXJhbSB7QXJyYXl8RnVuY3Rpb259IGZucyBBIHNpbmdsZSBmdW5jdGlvbiBvciBBcnJheSBvZiBmdW5jdGlvbnNcbiAqIEByZXR1cm5zIHsqfSBUaGUgcmVzdWx0aW5nIHRyYW5zZm9ybWVkIGRhdGFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0cmFuc2Zvcm1EYXRhKGRhdGEsIGhlYWRlcnMsIGZucykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgdXRpbHMuZm9yRWFjaChmbnMsIGZ1bmN0aW9uIHRyYW5zZm9ybShmbikge1xuICAgIGRhdGEgPSBmbihkYXRhLCBoZWFkZXJzKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRhdGE7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgbm9ybWFsaXplSGVhZGVyTmFtZSA9IHJlcXVpcmUoJy4vaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lJyk7XG5cbnZhciBERUZBVUxUX0NPTlRFTlRfVFlQRSA9IHtcbiAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG59O1xuXG5mdW5jdGlvbiBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgdmFsdWUpIHtcbiAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzKSAmJiB1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzWydDb250ZW50LVR5cGUnXSkpIHtcbiAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9IHZhbHVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldERlZmF1bHRBZGFwdGVyKCkge1xuICB2YXIgYWRhcHRlcjtcbiAgLy8gT25seSBOb2RlLkpTIGhhcyBhIHByb2Nlc3MgdmFyaWFibGUgdGhhdCBpcyBvZiBbW0NsYXNzXV0gcHJvY2Vzc1xuICBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChwcm9jZXNzKSA9PT0gJ1tvYmplY3QgcHJvY2Vzc10nKSB7XG4gICAgLy8gRm9yIG5vZGUgdXNlIEhUVFAgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL2h0dHAnKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gRm9yIGJyb3dzZXJzIHVzZSBYSFIgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL3hocicpO1xuICB9XG4gIHJldHVybiBhZGFwdGVyO1xufVxuXG52YXIgZGVmYXVsdHMgPSB7XG4gIGFkYXB0ZXI6IGdldERlZmF1bHRBZGFwdGVyKCksXG5cbiAgdHJhbnNmb3JtUmVxdWVzdDogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlcXVlc3QoZGF0YSwgaGVhZGVycykge1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0FjY2VwdCcpO1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0NvbnRlbnQtVHlwZScpO1xuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0FycmF5QnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0J1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNTdHJlYW0oZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzRmlsZShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCbG9iKGRhdGEpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXJWaWV3KGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YS5idWZmZXI7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIGRhdGEudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzT2JqZWN0KGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgdHJhbnNmb3JtUmVzcG9uc2U6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShkYXRhKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7IC8qIElnbm9yZSAqLyB9XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICAvKipcbiAgICogQSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byBhYm9ydCBhIHJlcXVlc3QuIElmIHNldCB0byAwIChkZWZhdWx0KSBhXG4gICAqIHRpbWVvdXQgaXMgbm90IGNyZWF0ZWQuXG4gICAqL1xuICB0aW1lb3V0OiAwLFxuXG4gIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXG4gIHhzcmZIZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcblxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcblxuICB2YWxpZGF0ZVN0YXR1czogZnVuY3Rpb24gdmFsaWRhdGVTdGF0dXMoc3RhdHVzKSB7XG4gICAgcmV0dXJuIHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwO1xuICB9XG59O1xuXG5kZWZhdWx0cy5oZWFkZXJzID0ge1xuICBjb21tb246IHtcbiAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKidcbiAgfVxufTtcblxudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB7fTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB1dGlscy5tZXJnZShERUZBVUxUX0NPTlRFTlRfVFlQRSk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZhdWx0cztcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBlbmNvZGUodmFsKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsKS5cbiAgICByZXBsYWNlKC8lNDAvZ2ksICdAJykuXG4gICAgcmVwbGFjZSgvJTNBL2dpLCAnOicpLlxuICAgIHJlcGxhY2UoLyUyNC9nLCAnJCcpLlxuICAgIHJlcGxhY2UoLyUyQy9naSwgJywnKS5cbiAgICByZXBsYWNlKC8lMjAvZywgJysnKS5cbiAgICByZXBsYWNlKC8lNUIvZ2ksICdbJykuXG4gICAgcmVwbGFjZSgvJTVEL2dpLCAnXScpO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgVVJMIGJ5IGFwcGVuZGluZyBwYXJhbXMgdG8gdGhlIGVuZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIGJhc2Ugb2YgdGhlIHVybCAoZS5nLiwgaHR0cDovL3d3dy5nb29nbGUuY29tKVxuICogQHBhcmFtIHtvYmplY3R9IFtwYXJhbXNdIFRoZSBwYXJhbXMgdG8gYmUgYXBwZW5kZWRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgdXJsXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHZhciBzZXJpYWxpemVkUGFyYW1zO1xuICBpZiAocGFyYW1zU2VyaWFsaXplcikge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXNTZXJpYWxpemVyKHBhcmFtcyk7XG4gIH0gZWxzZSBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSkge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXMudG9TdHJpbmcoKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcGFydHMgPSBbXTtcblxuICAgIHV0aWxzLmZvckVhY2gocGFyYW1zLCBmdW5jdGlvbiBzZXJpYWxpemUodmFsLCBrZXkpIHtcbiAgICAgIGlmICh2YWwgPT09IG51bGwgfHwgdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodXRpbHMuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgIGtleSA9IGtleSArICdbXSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWwgPSBbdmFsXTtcbiAgICAgIH1cblxuICAgICAgdXRpbHMuZm9yRWFjaCh2YWwsIGZ1bmN0aW9uIHBhcnNlVmFsdWUodikge1xuICAgICAgICBpZiAodXRpbHMuaXNEYXRlKHYpKSB7XG4gICAgICAgICAgdiA9IHYudG9JU09TdHJpbmcoKTtcbiAgICAgICAgfSBlbHNlIGlmICh1dGlscy5pc09iamVjdCh2KSkge1xuICAgICAgICAgIHYgPSBKU09OLnN0cmluZ2lmeSh2KTtcbiAgICAgICAgfVxuICAgICAgICBwYXJ0cy5wdXNoKGVuY29kZShrZXkpICsgJz0nICsgZW5jb2RlKHYpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcnRzLmpvaW4oJyYnKTtcbiAgfVxuXG4gIGlmIChzZXJpYWxpemVkUGFyYW1zKSB7XG4gICAgdmFyIGhhc2htYXJrSW5kZXggPSB1cmwuaW5kZXhPZignIycpO1xuICAgIGlmIChoYXNobWFya0luZGV4ICE9PSAtMSkge1xuICAgICAgdXJsID0gdXJsLnNsaWNlKDAsIGhhc2htYXJrSW5kZXgpO1xuICAgIH1cblxuICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgc2VyaWFsaXplZFBhcmFtcztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgc3BlY2lmaWVkIFVSTHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVVSTCBUaGUgcmVsYXRpdmUgVVJMXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgVVJMXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVsYXRpdmVVUkwpIHtcbiAgcmV0dXJuIHJlbGF0aXZlVVJMXG4gICAgPyBiYXNlVVJMLnJlcGxhY2UoL1xcLyskLywgJycpICsgJy8nICsgcmVsYXRpdmVVUkwucmVwbGFjZSgvXlxcLysvLCAnJylcbiAgICA6IGJhc2VVUkw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgc3VwcG9ydCBkb2N1bWVudC5jb29raWVcbiAgICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKG5hbWUsIHZhbHVlLCBleHBpcmVzLCBwYXRoLCBkb21haW4sIHNlY3VyZSkge1xuICAgICAgICAgIHZhciBjb29raWUgPSBbXTtcbiAgICAgICAgICBjb29raWUucHVzaChuYW1lICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSk7XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNOdW1iZXIoZXhwaXJlcykpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdleHBpcmVzPScgKyBuZXcgRGF0ZShleHBpcmVzKS50b0dNVFN0cmluZygpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcocGF0aCkpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdwYXRoPScgKyBwYXRoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcoZG9tYWluKSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ2RvbWFpbj0nICsgZG9tYWluKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc2VjdXJlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgnc2VjdXJlJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llLmpvaW4oJzsgJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChuYW1lKSB7XG4gICAgICAgICAgdmFyIG1hdGNoID0gZG9jdW1lbnQuY29va2llLm1hdGNoKG5ldyBSZWdFeHAoJyhefDtcXFxccyopKCcgKyBuYW1lICsgJyk9KFteO10qKScpKTtcbiAgICAgICAgICByZXR1cm4gKG1hdGNoID8gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzNdKSA6IG51bGwpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKG5hbWUpIHtcbiAgICAgICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDApO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudiAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge30sXG4gICAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7IHJldHVybiBudWxsOyB9LFxuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgICB9O1xuICAgIH0pKClcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0Fic29sdXRlVVJMKHVybCkge1xuICAvLyBBIFVSTCBpcyBjb25zaWRlcmVkIGFic29sdXRlIGlmIGl0IGJlZ2lucyB3aXRoIFwiPHNjaGVtZT46Ly9cIiBvciBcIi8vXCIgKHByb3RvY29sLXJlbGF0aXZlIFVSTCkuXG4gIC8vIFJGQyAzOTg2IGRlZmluZXMgc2NoZW1lIG5hbWUgYXMgYSBzZXF1ZW5jZSBvZiBjaGFyYWN0ZXJzIGJlZ2lubmluZyB3aXRoIGEgbGV0dGVyIGFuZCBmb2xsb3dlZFxuICAvLyBieSBhbnkgY29tYmluYXRpb24gb2YgbGV0dGVycywgZGlnaXRzLCBwbHVzLCBwZXJpb2QsIG9yIGh5cGhlbi5cbiAgcmV0dXJuIC9eKFthLXpdW2EtelxcZFxcK1xcLVxcLl0qOik/XFwvXFwvL2kudGVzdCh1cmwpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIGhhdmUgZnVsbCBzdXBwb3J0IG9mIHRoZSBBUElzIG5lZWRlZCB0byB0ZXN0XG4gIC8vIHdoZXRoZXIgdGhlIHJlcXVlc3QgVVJMIGlzIG9mIHRoZSBzYW1lIG9yaWdpbiBhcyBjdXJyZW50IGxvY2F0aW9uLlxuICAgIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICB2YXIgbXNpZSA9IC8obXNpZXx0cmlkZW50KS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgICB2YXIgdXJsUGFyc2luZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICB2YXIgb3JpZ2luVVJMO1xuXG4gICAgICAvKipcbiAgICAqIFBhcnNlIGEgVVJMIHRvIGRpc2NvdmVyIGl0J3MgY29tcG9uZW50c1xuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIFVSTCB0byBiZSBwYXJzZWRcbiAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgKi9cbiAgICAgIGZ1bmN0aW9uIHJlc29sdmVVUkwodXJsKSB7XG4gICAgICAgIHZhciBocmVmID0gdXJsO1xuXG4gICAgICAgIGlmIChtc2llKSB7XG4gICAgICAgIC8vIElFIG5lZWRzIGF0dHJpYnV0ZSBzZXQgdHdpY2UgdG8gbm9ybWFsaXplIHByb3BlcnRpZXNcbiAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcbiAgICAgICAgICBocmVmID0gdXJsUGFyc2luZ05vZGUuaHJlZjtcbiAgICAgICAgfVxuXG4gICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuXG4gICAgICAgIC8vIHVybFBhcnNpbmdOb2RlIHByb3ZpZGVzIHRoZSBVcmxVdGlscyBpbnRlcmZhY2UgLSBodHRwOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsdXRpbHNcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBocmVmOiB1cmxQYXJzaW5nTm9kZS5ocmVmLFxuICAgICAgICAgIHByb3RvY29sOiB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbCA/IHVybFBhcnNpbmdOb2RlLnByb3RvY29sLnJlcGxhY2UoLzokLywgJycpIDogJycsXG4gICAgICAgICAgaG9zdDogdXJsUGFyc2luZ05vZGUuaG9zdCxcbiAgICAgICAgICBzZWFyY2g6IHVybFBhcnNpbmdOb2RlLnNlYXJjaCA/IHVybFBhcnNpbmdOb2RlLnNlYXJjaC5yZXBsYWNlKC9eXFw/LywgJycpIDogJycsXG4gICAgICAgICAgaGFzaDogdXJsUGFyc2luZ05vZGUuaGFzaCA/IHVybFBhcnNpbmdOb2RlLmhhc2gucmVwbGFjZSgvXiMvLCAnJykgOiAnJyxcbiAgICAgICAgICBob3N0bmFtZTogdXJsUGFyc2luZ05vZGUuaG9zdG5hbWUsXG4gICAgICAgICAgcG9ydDogdXJsUGFyc2luZ05vZGUucG9ydCxcbiAgICAgICAgICBwYXRobmFtZTogKHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKSA/XG4gICAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZSA6XG4gICAgICAgICAgICAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBvcmlnaW5VUkwgPSByZXNvbHZlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblxuICAgICAgLyoqXG4gICAgKiBEZXRlcm1pbmUgaWYgYSBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiBhcyB0aGUgY3VycmVudCBsb2NhdGlvblxuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSByZXF1ZXN0VVJMIFRoZSBVUkwgdG8gdGVzdFxuICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4sIG90aGVyd2lzZSBmYWxzZVxuICAgICovXG4gICAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKHJlcXVlc3RVUkwpIHtcbiAgICAgICAgdmFyIHBhcnNlZCA9ICh1dGlscy5pc1N0cmluZyhyZXF1ZXN0VVJMKSkgPyByZXNvbHZlVVJMKHJlcXVlc3RVUkwpIDogcmVxdWVzdFVSTDtcbiAgICAgICAgcmV0dXJuIChwYXJzZWQucHJvdG9jb2wgPT09IG9yaWdpblVSTC5wcm90b2NvbCAmJlxuICAgICAgICAgICAgcGFyc2VkLmhvc3QgPT09IG9yaWdpblVSTC5ob3N0KTtcbiAgICAgIH07XG4gICAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52cyAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbigpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9O1xuICAgIH0pKClcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCBub3JtYWxpemVkTmFtZSkge1xuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMsIGZ1bmN0aW9uIHByb2Nlc3NIZWFkZXIodmFsdWUsIG5hbWUpIHtcbiAgICBpZiAobmFtZSAhPT0gbm9ybWFsaXplZE5hbWUgJiYgbmFtZS50b1VwcGVyQ2FzZSgpID09PSBub3JtYWxpemVkTmFtZS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICBoZWFkZXJzW25vcm1hbGl6ZWROYW1lXSA9IHZhbHVlO1xuICAgICAgZGVsZXRlIGhlYWRlcnNbbmFtZV07XG4gICAgfVxuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLy8gSGVhZGVycyB3aG9zZSBkdXBsaWNhdGVzIGFyZSBpZ25vcmVkIGJ5IG5vZGVcbi8vIGMuZi4gaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9odHRwLmh0bWwjaHR0cF9tZXNzYWdlX2hlYWRlcnNcbnZhciBpZ25vcmVEdXBsaWNhdGVPZiA9IFtcbiAgJ2FnZScsICdhdXRob3JpemF0aW9uJywgJ2NvbnRlbnQtbGVuZ3RoJywgJ2NvbnRlbnQtdHlwZScsICdldGFnJyxcbiAgJ2V4cGlyZXMnLCAnZnJvbScsICdob3N0JywgJ2lmLW1vZGlmaWVkLXNpbmNlJywgJ2lmLXVubW9kaWZpZWQtc2luY2UnLFxuICAnbGFzdC1tb2RpZmllZCcsICdsb2NhdGlvbicsICdtYXgtZm9yd2FyZHMnLCAncHJveHktYXV0aG9yaXphdGlvbicsXG4gICdyZWZlcmVyJywgJ3JldHJ5LWFmdGVyJywgJ3VzZXItYWdlbnQnXG5dO1xuXG4vKipcbiAqIFBhcnNlIGhlYWRlcnMgaW50byBhbiBvYmplY3RcbiAqXG4gKiBgYGBcbiAqIERhdGU6IFdlZCwgMjcgQXVnIDIwMTQgMDg6NTg6NDkgR01UXG4gKiBDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cbiAqIENvbm5lY3Rpb246IGtlZXAtYWxpdmVcbiAqIFRyYW5zZmVyLUVuY29kaW5nOiBjaHVua2VkXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVycyBIZWFkZXJzIG5lZWRpbmcgdG8gYmUgcGFyc2VkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhoZWFkZXJzKSB7XG4gIHZhciBwYXJzZWQgPSB7fTtcbiAgdmFyIGtleTtcbiAgdmFyIHZhbDtcbiAgdmFyIGk7XG5cbiAgaWYgKCFoZWFkZXJzKSB7IHJldHVybiBwYXJzZWQ7IH1cblxuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMuc3BsaXQoJ1xcbicpLCBmdW5jdGlvbiBwYXJzZXIobGluZSkge1xuICAgIGkgPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBrZXkgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKDAsIGkpKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoaSArIDEpKTtcblxuICAgIGlmIChrZXkpIHtcbiAgICAgIGlmIChwYXJzZWRba2V5XSAmJiBpZ25vcmVEdXBsaWNhdGVPZi5pbmRleE9mKGtleSkgPj0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoa2V5ID09PSAnc2V0LWNvb2tpZScpIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSAocGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSA6IFtdKS5jb25jYXQoW3ZhbF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFN5bnRhY3RpYyBzdWdhciBmb3IgaW52b2tpbmcgYSBmdW5jdGlvbiBhbmQgZXhwYW5kaW5nIGFuIGFycmF5IGZvciBhcmd1bWVudHMuXG4gKlxuICogQ29tbW9uIHVzZSBjYXNlIHdvdWxkIGJlIHRvIHVzZSBgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5YC5cbiAqXG4gKiAgYGBganNcbiAqICBmdW5jdGlvbiBmKHgsIHksIHopIHt9XG4gKiAgdmFyIGFyZ3MgPSBbMSwgMiwgM107XG4gKiAgZi5hcHBseShudWxsLCBhcmdzKTtcbiAqICBgYGBcbiAqXG4gKiBXaXRoIGBzcHJlYWRgIHRoaXMgZXhhbXBsZSBjYW4gYmUgcmUtd3JpdHRlbi5cbiAqXG4gKiAgYGBganNcbiAqICBzcHJlYWQoZnVuY3Rpb24oeCwgeSwgeikge30pKFsxLCAyLCAzXSk7XG4gKiAgYGBgXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzcHJlYWQoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoYXJyKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFycik7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG52YXIgaXNCdWZmZXIgPSByZXF1aXJlKCdpcy1idWZmZXInKTtcblxuLypnbG9iYWwgdG9TdHJpbmc6dHJ1ZSovXG5cbi8vIHV0aWxzIGlzIGEgbGlicmFyeSBvZiBnZW5lcmljIGhlbHBlciBmdW5jdGlvbnMgbm9uLXNwZWNpZmljIHRvIGF4aW9zXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXkodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXIodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5QnVmZmVyXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEZvcm1EYXRhLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGb3JtRGF0YSh2YWwpIHtcbiAgcmV0dXJuICh0eXBlb2YgRm9ybURhdGEgIT09ICd1bmRlZmluZWQnKSAmJiAodmFsIGluc3RhbmNlb2YgRm9ybURhdGEpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJWaWV3KHZhbCkge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcpICYmIChBcnJheUJ1ZmZlci5pc1ZpZXcpKSB7XG4gICAgcmVzdWx0ID0gQXJyYXlCdWZmZXIuaXNWaWV3KHZhbCk7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gKHZhbCkgJiYgKHZhbC5idWZmZXIpICYmICh2YWwuYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJpbmdcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmluZywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaW5nKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZyc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBOdW1iZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIE51bWJlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTnVtYmVyKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ251bWJlcic7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgdW5kZWZpbmVkXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIHVuZGVmaW5lZCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBEYXRlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBEYXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNEYXRlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBEYXRlXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGaWxlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGaWxlXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCbG9iXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCbG9iLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNCbG9iKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBCbG9iXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRnVuY3Rpb24sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyZWFtXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJlYW0sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmVhbSh2YWwpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHZhbCkgJiYgaXNGdW5jdGlvbih2YWwucGlwZSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNVUkxTZWFyY2hQYXJhbXModmFsKSB7XG4gIHJldHVybiB0eXBlb2YgVVJMU2VhcmNoUGFyYW1zICE9PSAndW5kZWZpbmVkJyAmJiB2YWwgaW5zdGFuY2VvZiBVUkxTZWFyY2hQYXJhbXM7XG59XG5cbi8qKlxuICogVHJpbSBleGNlc3Mgd2hpdGVzcGFjZSBvZmYgdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgU3RyaW5nIHRvIHRyaW1cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBTdHJpbmcgZnJlZWQgb2YgZXhjZXNzIHdoaXRlc3BhY2VcbiAqL1xuZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzKi8sICcnKS5yZXBsYWNlKC9cXHMqJC8sICcnKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgd2UncmUgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnRcbiAqXG4gKiBUaGlzIGFsbG93cyBheGlvcyB0byBydW4gaW4gYSB3ZWIgd29ya2VyLCBhbmQgcmVhY3QtbmF0aXZlLlxuICogQm90aCBlbnZpcm9ubWVudHMgc3VwcG9ydCBYTUxIdHRwUmVxdWVzdCwgYnV0IG5vdCBmdWxseSBzdGFuZGFyZCBnbG9iYWxzLlxuICpcbiAqIHdlYiB3b3JrZXJzOlxuICogIHR5cGVvZiB3aW5kb3cgLT4gdW5kZWZpbmVkXG4gKiAgdHlwZW9mIGRvY3VtZW50IC0+IHVuZGVmaW5lZFxuICpcbiAqIHJlYWN0LW5hdGl2ZTpcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnUmVhY3ROYXRpdmUnXG4gKiBuYXRpdmVzY3JpcHRcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnTmF0aXZlU2NyaXB0JyBvciAnTlMnXG4gKi9cbmZ1bmN0aW9uIGlzU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgKG5hdmlnYXRvci5wcm9kdWN0ID09PSAnUmVhY3ROYXRpdmUnIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdOYXRpdmVTY3JpcHQnIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdOUycpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXG4gICk7XG59XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFuIEFycmF5IG9yIGFuIE9iamVjdCBpbnZva2luZyBhIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgYG9iamAgaXMgYW4gQXJyYXkgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBpbmRleCwgYW5kIGNvbXBsZXRlIGFycmF5IGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgJ29iaicgaXMgYW4gT2JqZWN0IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwga2V5LCBhbmQgY29tcGxldGUgb2JqZWN0IGZvciBlYWNoIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBvYmogVGhlIG9iamVjdCB0byBpdGVyYXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2sgdG8gaW52b2tlIGZvciBlYWNoIGl0ZW1cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaChvYmosIGZuKSB7XG4gIC8vIERvbid0IGJvdGhlciBpZiBubyB2YWx1ZSBwcm92aWRlZFxuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gRm9yY2UgYW4gYXJyYXkgaWYgbm90IGFscmVhZHkgc29tZXRoaW5nIGl0ZXJhYmxlXG4gIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIG9iaiA9IFtvYmpdO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBhcnJheSB2YWx1ZXNcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2ldLCBpLCBvYmopO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgb2JqZWN0IGtleXNcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICBmbi5jYWxsKG51bGwsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQWNjZXB0cyB2YXJhcmdzIGV4cGVjdGluZyBlYWNoIGFyZ3VtZW50IHRvIGJlIGFuIG9iamVjdCwgdGhlblxuICogaW1tdXRhYmx5IG1lcmdlcyB0aGUgcHJvcGVydGllcyBvZiBlYWNoIG9iamVjdCBhbmQgcmV0dXJucyByZXN1bHQuXG4gKlxuICogV2hlbiBtdWx0aXBsZSBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUga2V5IHRoZSBsYXRlciBvYmplY3QgaW5cbiAqIHRoZSBhcmd1bWVudHMgbGlzdCB3aWxsIHRha2UgcHJlY2VkZW5jZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcmVzdWx0ID0gbWVyZ2Uoe2ZvbzogMTIzfSwge2ZvbzogNDU2fSk7XG4gKiBjb25zb2xlLmxvZyhyZXN1bHQuZm9vKTsgLy8gb3V0cHV0cyA0NTZcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIE9iamVjdCB0byBtZXJnZVxuICogQHJldHVybnMge09iamVjdH0gUmVzdWx0IG9mIGFsbCBtZXJnZSBwcm9wZXJ0aWVzXG4gKi9cbmZ1bmN0aW9uIG1lcmdlKC8qIG9iajEsIG9iajIsIG9iajMsIC4uLiAqLykge1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHR5cGVvZiByZXN1bHRba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2UocmVzdWx0W2tleV0sIHZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBGdW5jdGlvbiBlcXVhbCB0byBtZXJnZSB3aXRoIHRoZSBkaWZmZXJlbmNlIGJlaW5nIHRoYXQgbm8gcmVmZXJlbmNlXG4gKiB0byBvcmlnaW5hbCBvYmplY3RzIGlzIGtlcHQuXG4gKlxuICogQHNlZSBtZXJnZVxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gZGVlcE1lcmdlKC8qIG9iajEsIG9iajIsIG9iajMsIC4uLiAqLykge1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHR5cGVvZiByZXN1bHRba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gZGVlcE1lcmdlKHJlc3VsdFtrZXldLCB2YWwpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gZGVlcE1lcmdlKHt9LCB2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRXh0ZW5kcyBvYmplY3QgYSBieSBtdXRhYmx5IGFkZGluZyB0byBpdCB0aGUgcHJvcGVydGllcyBvZiBvYmplY3QgYi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBUaGUgb2JqZWN0IHRvIGJlIGV4dGVuZGVkXG4gKiBAcGFyYW0ge09iamVjdH0gYiBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gdGhpc0FyZyBUaGUgb2JqZWN0IHRvIGJpbmQgZnVuY3Rpb24gdG9cbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIHJlc3VsdGluZyB2YWx1ZSBvZiBvYmplY3QgYVxuICovXG5mdW5jdGlvbiBleHRlbmQoYSwgYiwgdGhpc0FyZykge1xuICBmb3JFYWNoKGIsIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHRoaXNBcmcgJiYgdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYVtrZXldID0gYmluZCh2YWwsIHRoaXNBcmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSB2YWw7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpc0FycmF5OiBpc0FycmF5LFxuICBpc0FycmF5QnVmZmVyOiBpc0FycmF5QnVmZmVyLFxuICBpc0J1ZmZlcjogaXNCdWZmZXIsXG4gIGlzRm9ybURhdGE6IGlzRm9ybURhdGEsXG4gIGlzQXJyYXlCdWZmZXJWaWV3OiBpc0FycmF5QnVmZmVyVmlldyxcbiAgaXNTdHJpbmc6IGlzU3RyaW5nLFxuICBpc051bWJlcjogaXNOdW1iZXIsXG4gIGlzT2JqZWN0OiBpc09iamVjdCxcbiAgaXNVbmRlZmluZWQ6IGlzVW5kZWZpbmVkLFxuICBpc0RhdGU6IGlzRGF0ZSxcbiAgaXNGaWxlOiBpc0ZpbGUsXG4gIGlzQmxvYjogaXNCbG9iLFxuICBpc0Z1bmN0aW9uOiBpc0Z1bmN0aW9uLFxuICBpc1N0cmVhbTogaXNTdHJlYW0sXG4gIGlzVVJMU2VhcmNoUGFyYW1zOiBpc1VSTFNlYXJjaFBhcmFtcyxcbiAgaXNTdGFuZGFyZEJyb3dzZXJFbnY6IGlzU3RhbmRhcmRCcm93c2VyRW52LFxuICBmb3JFYWNoOiBmb3JFYWNoLFxuICBtZXJnZTogbWVyZ2UsXG4gIGRlZXBNZXJnZTogZGVlcE1lcmdlLFxuICBleHRlbmQ6IGV4dGVuZCxcbiAgdHJpbTogdHJpbVxufTtcbiIsIi8qIVxuICogRGV0ZXJtaW5lIGlmIGFuIG9iamVjdCBpcyBhIEJ1ZmZlclxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxodHRwczovL2Zlcm9zcy5vcmc+XG4gKiBAbGljZW5zZSAgTUlUXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0J1ZmZlciAob2JqKSB7XG4gIHJldHVybiBvYmogIT0gbnVsbCAmJiBvYmouY29uc3RydWN0b3IgIT0gbnVsbCAmJlxuICAgIHR5cGVvZiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyKG9iailcbn1cbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIvL2ltcG9ydCAnLi9zY3NzL2Jvb3RzdHJhcC9ib290c3RyYXAuc2NzcydcclxuLy9pbXBvcnQgJy4vc2Nzcy9zdHlsZS5zY3NzJ1xyXG5pbXBvcnQge2dldEZlZWRiYWNrfSBmcm9tICcuL2pzL21vZHVsZXMvZ2V0RmVlZGJhY2snXHJcblxyXG5nZXRGZWVkYmFjaygpXHJcblx0LnRoZW4oZnVuY3Rpb24gKGZlZWRiYWNrcykge1xyXG5cdFx0Y29uc29sZS5sb2coZmVlZGJhY2tzKTtcclxuXHR9KTsiLCJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xyXG5cclxuZnVuY3Rpb24gZ2V0RmVlZGJhY2soc2VydmljZSkge1xyXG5cdHJldHVybiBuZXcgUHJvbWlzZSgoZnVsZmlsbCwgcmVqZWN0KSA9PiB7XHJcblx0XHRheGlvcy5nZXQoJy9mZWVkYmFja19saXN0Lmpzb24nLHsgZGF0YToge3NlcnZpY2V9fSlcclxuXHRcdFx0LnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcblxyXG5cdFx0XHRcdGlmKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKXtcclxuXHRcdFx0XHRcdHJlamVjdChyZXNwb25zZS5zdGF0dXNUZXh0KVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRjb25zdCBmZWVkYmFja19saXN0ID0gcmVzcG9uc2UuZGF0YTtcclxuXHJcblx0XHRcdFx0XHQvLyDRgdC+0YDRgtC40YDRg9C10Lwg0LTQsNC90L3Ri9C1XHJcblx0XHRcdFx0XHRjb25zdCBmZWVkYmFja19saXN0X3NvcnQgPSBxdWlja1NvcnRBcnJPYmooZmVlZGJhY2tfbGlzdCwgJ2RhdGUnKTtcclxuXHRcdFx0XHRcdC8vINC/0L7Qu9GD0YfQsNC10Lwg0YHQv9C40YHQvtC6INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvQtdC5XHJcblx0XHRcdFx0XHRjb25zdCB1c2Vyc19pZF9saXN0ID0gZ2V0QXJyTGlzdEZvck9iaktleXMoZmVlZGJhY2tfbGlzdCwgJ3VzZXJfaWQnKTtcclxuXHRcdFx0XHRcdC8vINC/0L7Qu9GD0YfQsNC10Lwg0L7QsdGK0LXQutGCINGBINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRj9C80LhcclxuXHRcdFx0XHRcdGF4aW9zLmdldCgnL3VzZXJzX2xpc3QuanNvbicseyBkYXRhOiB7dXNlcnNfaWRfbGlzdH19KVxyXG5cdFx0XHRcdFx0XHQudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuXHRcdFx0XHRcdFx0XHRpZihyZXNwb25zZS5zdGF0dXMgIT09IDIwMCl7XHJcblx0XHRcdFx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2Uuc3RhdHVzVGV4dClcclxuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgdXNlcnNfbGlzdCA9IHJlc3BvbnNlLmRhdGE7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgZmVlZGJhY2tzID0gYnVpbGRGZWVkYmFjayhmZWVkYmFja19saXN0X3NvcnQsIHVzZXJzX2xpc3QpXHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0ZnVsZmlsbChmZWVkYmFja3MpO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHR9KVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtnZXRGZWVkYmFja307XHJcblxyXG4vKipcclxuICpcclxuICogQHBhcmFtIGZlZWRiYWNrX2xpc3RcclxuICogQHBhcmFtIHVzZXJzX2xpc3RcclxuICovXHJcbmZ1bmN0aW9uIGJ1aWxkRmVlZGJhY2soZmVlZGJhY2tfbGlzdCwgdXNlcnNfbGlzdCkge1xyXG5cdGxldCByZXN1bHRfZmVlZGJhY2sgPSBbXTtcclxuXHQvLyDQutC70L7QvdC40YDRg9C10Lwg0LzQsNGB0YHQuNCyINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvQtdC5XHJcblxyXG5cdGNvbnN0IGNsb25lX3VzZXJfbGlzdCA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodXNlcnNfbGlzdCkpO1xyXG5cdGNvbnN0IGNhY2hlX3VzZXJzID0ge307XHJcblxyXG5cclxuXHRmb3IobGV0IGluZGV4ID0gMDsgaW5kZXggPCBmZWVkYmFja19saXN0Lmxlbmd0aDsgaW5kZXgrKyl7XHJcblx0XHRjb25zdCBmZWVkYmFjayA9IGZlZWRiYWNrX2xpc3RbaW5kZXhdO1xyXG5cdFx0Y29uc3QgaWQgPSBmZWVkYmFjay5pZDtcclxuXHRcdGNvbnN0IHRleHQgPSBmZWVkYmFjay50ZXh0O1xyXG5cdFx0Y29uc3QgbmFtZSA9IGdldFVzZXJOYW1lKGZlZWRiYWNrLnVzZXJfaWQpO1xyXG5cdFx0Y29uc3QgZGF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0Y29uc3QgbnVtYmVyX2RhdGUgPSBwYXJzZUludChmZWVkYmFjay5kYXRlLCAxMCk7XHJcblx0XHRcdGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShudW1iZXJfZGF0ZSk7XHJcblx0XHRcdHJldHVybiBgJHtkYXRlLmdldEZ1bGxZZWFyKCl9LSR7ZGF0ZS5nZXRNb250aCgpKzF9LSR7ZGF0ZS5nZXREYXRlKCl9YDtcclxuXHRcdH0oKTtcclxuXHJcblx0XHRyZXN1bHRfZmVlZGJhY2sucHVzaCh7aWQsIG5hbWUsIHRleHQsIGRhdGV9KTtcclxuXHR9XHJcblxyXG5cdHJldHVybiByZXN1bHRfZmVlZGJhY2s7XHJcblxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB1c2VyX2lkXHJcblx0ICogQHJldHVybiB7Kn1cclxuXHQgKi9cclxuXHRmdW5jdGlvbiBnZXRVc2VyTmFtZSh1c2VyX2lkKSB7XHJcblx0XHRpZihjYWNoZV91c2Vyc1t1c2VyX2lkXSl7XHJcblx0XHRcdHJldHVybiBjYWNoZV91c2Vyc1t1c2VyX2lkXTtcclxuXHRcdH1cclxuXHRcdGxldCBsZW5ndGggPSBjbG9uZV91c2VyX2xpc3QubGVuZ3RoO1xyXG5cdFx0Zm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKyl7XHJcblx0XHRcdGNvbnN0IG9ial91c2VyID0gY2xvbmVfdXNlcl9saXN0W2luZGV4XTtcclxuXHRcdFx0Y29uc3QgdGVzdF91c2VyX2lkID0gb2JqX3VzZXJbXCJ1c2VyX2lkXCJdO1xyXG5cdFx0XHRjb25zdCBuYW1lID0gb2JqX3VzZXJbXCJuYW1lXCJdO1xyXG5cclxuXHRcdFx0Y2xvbmVfdXNlcl9saXN0LnNwbGljZShpbmRleCwgMSk7XHJcblx0XHRcdC0tbGVuZ3RoO1xyXG5cdFx0XHQtLWluZGV4O1xyXG5cclxuXHRcdFx0Y2FjaGVfdXNlcnNbdGVzdF91c2VyX2lkXSA9IG5hbWU7XHJcblxyXG5cdFx0XHRpZih0ZXN0X3VzZXJfaWQgPT09ICB1c2VyX2lkKXtcclxuXHRcdFx0XHRyZXR1cm4gbmFtZVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqINCf0L7Qu9GD0YfQtdC90LjQtSDQvNCw0YHRgdC40LLQsCDQutC70Y7Rh9C10Lkg0LjQtyDQvtCx0YrQtdC60YLQvtCyINCyINC/0LXRgNC10LTQsNC90L3QvtC8INC80LDRgdGB0LjQstC1INC/0L4g0LrQu9GO0YfRg1xyXG4gKiBAcGFyYW0gYXJyX29iaiB7YXJyYXl9IC0g0LzQsNGB0YHQuNCyINC+0LHRitC10LrRgtC+0LJcclxuICogQHBhcmFtIGtleSB7c3RyaW5nfSAtINC60LvRjtGHLCDQv9C+INC60L7RgtC+0YDQvtC80YMg0LjQt9Cy0LvQtdC60LDRjtGC0YHRjyDQtNCw0L3QvdGL0Lkg0LjQtyDQvNCw0YHRgdC40LLQsCDQvtCx0YrQtdC60YLQvtCyXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRBcnJMaXN0Rm9yT2JqS2V5cyhhcnJfb2JqLCBrZXkpIHtcclxuXHRjb25zdCBvYmpfa2V5ID0ge307XHJcblx0Zm9yKGNvbnN0IHZhbHVlIG9mIGFycl9vYmope1xyXG5cdFx0b2JqX2tleVt2YWx1ZVtrZXldXSA9ICcnXHJcblx0fVxyXG5cdHJldHVybiBPYmplY3Qua2V5cyhvYmpfa2V5KVxyXG59XHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiDQodC+0YDRgtC40YDQvtCy0LrQsCDQvNCw0YHRgdC40LLQsCDQvtCx0YrQtdC60YLQvtCyIGFycl9vYmog0L/QviDQutC70Y7Rh9GDIGtleVxyXG4gKiBAcGFyYW0gYXJyX29ialxyXG4gKiBAcGFyYW0ga2V5XHJcbiAqIEByZXR1cm4geyp9XHJcbiAqL1xyXG5mdW5jdGlvbiBxdWlja1NvcnRBcnJPYmooYXJyX29iaiwga2V5KSB7XHJcblxyXG5cdGlmKGFycl9vYmoubGVuZ3RoIDwgMil7XHJcblx0XHRyZXR1cm4gYXJyX29iajtcclxuXHR9XHJcblxyXG5cdGNvbnN0IHJlZmVyZW5jZV9pbmRleCA9IE1hdGguY2VpbChhcnJfb2JqLmxlbmd0aCAvIDIpIC0gMTtcclxuXHRjb25zdCByZWZlcmVuY2VfdmFsdWUgPSBhcnJfb2JqW3JlZmVyZW5jZV9pbmRleF1ba2V5XTtcclxuXHJcblx0bGV0IHByZXZpb3VzID0gW107XHJcblx0YXJyX29iai5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgpIHtcclxuXHRcdGlmKGluZGV4ID09PSByZWZlcmVuY2VfaW5kZXgpe1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYodmFsdWVba2V5XSA8IHJlZmVyZW5jZV92YWx1ZSl7XHJcblx0XHRcdHByZXZpb3VzLnB1c2godmFsdWUpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHRsZXQgbmV4dCA9IFtdO1xyXG5cdGFycl9vYmouZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGluZGV4KSB7XHJcblx0XHRpZihpbmRleCA9PT0gcmVmZXJlbmNlX2luZGV4KXtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHZhbHVlW2tleV0gPj0gcmVmZXJlbmNlX3ZhbHVlKXtcclxuXHRcdFx0bmV4dC5wdXNoKHZhbHVlKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0cmV0dXJuIHF1aWNrU29ydEFyck9iaihwcmV2aW91cywga2V5KS5jb25jYXQoYXJyX29ialtyZWZlcmVuY2VfaW5kZXhdLCBxdWlja1NvcnRBcnJPYmoobmV4dCwga2V5KSk7XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9