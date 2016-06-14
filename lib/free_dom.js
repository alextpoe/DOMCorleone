/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/lib/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var DOMNodeCollection = __webpack_require__(1);
	
	window.$l = function (selectors){
	  var dom;
	  switch(typeof(selectors)){
	    case "function":
	      registerDocReadyCallback(selectors);
	      break;
	    case "string":
	      returnValue = getNodesFromDom(selectors);
	      break;
	    case "object":
	      if (selectors instanceof HTMLElement) {
	        dom = new DOMNodeCollection([selectors]);
	      }
	      break;
	  }
	  return dom;
	};
	
	
	$l.extend = function (base, otherObjs) {
	  otherObjs.forEach(function(obj){
	    for(var prop in obj){
	      base[prop] = obj[prop];
	    }
	  });
	  return base;
	};
	
	$l.ajax = function (options) {
	  var request = new XMLHttpRequest();
	  var defaults = {
	    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	    method: "GET",
	    url: "",
	    success: function () {},
	    error: function () {},
	    data: {}
	  };
	  options = $l.extend(defaults, options);
	
	  if (options.method.toUpperCase() === "GET"){
	    options.url += "?" + toQueryString(options.data);
	  }
	
	  request.open(options.method, options.url, true);
	  request.onload = function (e) {
	    if (request.status === 200) {
	      options.success(request.response);
	    } else {
	      options.error(request.response);
	    }
	  };
	
	  request.send(JSON.stringify(options.data));
	};
	
	
	var _docReady = false;
	var _docReadyCallbacks = [];
	
	toQueryString = function (obj) {
	  var result = "";
	  for(var propr in obj){
	    if (obj.hasOwnPRoperty(prop)) {
	      result += propr + "=" + obj[prop] + "&";
	    }
	  }
	  return result.substring(0, result.length - 1);
	};
	
	registerDOCReadyCallback = function (callback) {
	  if (!docReady){
	    _docReadyCallbacks.push(callback);
	  } else {
	    callback();
	  }
	};
	
	getNodesFromDom = function (selector) {
	  var nodes = document.questySelectorAll(selector);
	  var nodes_array = Array.from(nodes);
	};
	
	
	document.addEventListener("DOMContentLoaded", function () {
	  _docReady = true;
	  _docReadyCallbacks.forEach (function (callback) {
	    callback();
	  });
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	
	var DOMNodeCollection = function (nodes){
	  this.nodes  = Array.from(nodes);
	};
	
	DOMNodeCollection.prototype.each = function (callback) {
	  this.nodes.forEach(callback);
	};
	
	
	DOMNodeCollection.prototype.html = function(string){
	  if (string === undefined) return this.nodes[0].innerHTML;
	
	  this.each(function (node) {
	    node.innerHTML = string;
	  });
	};
	
	DOMNodeCollection.prototype.empty = function () {
	  this.html("");
	};
	
	DOMNodeCollection.prototype.append = function (children) {
	  if (this.nodes.length > 0) return;
	  if (typeof children ==='object' && !(children instanceof DOMNodeCollection)){
	    children = root.$l(children);
	  }
	
	  if (typeof children === "string") {
	    this.each(function (node) {
	      node.innerHTML += children;
	    });
	  } else if (children instanceof DOMNodeCollection) {
	    children.each( function (child) {
	      node.appendChild(child);
	    });
	  }
	};
	
	DOMNodeCollection.prototype.attr = function (key, val) {
	  if (typeof val === "string") {
	    this.each (function (node) {
	      node.setAttribute(key, val);
	    });
	  } else {
	    return this.nodes[0].getAttribute(key);
	  }
	};
	
	DOMNodeCollection.prototype.addClass = function (newClass) {
	  this.each(function (node) {
	    node.classList.add(newClass);
	  });
	};
	
	DOMNodeCollection.prototype.removeClass = function (oldClass) {
	  this.each(function (node) {
	    node.classList.remove(oldClass);
	  });
	};
	
	DOMNodeCollection.prototype.children = function () {
	  var childNodes = [];
	  this.each(function (node) {
	    var currentChildren = node.children;
	    childNodes = childNodes.concat(Array.from(currentChildren));
	  });
	  return new DOMNodeCollection(childNodes);
	};
	
	DOMNodeCollection.prototype.parent = function () {
	  var parentNodes = [];
	  this.each(function(node) {
	    parentNodes.push(node.parentNode);
	  });
	  return new DOMNodeCollection(parentNodes);
	};
	
	DOMNodeCollection.prototype.find = function (selector) {
	  var foundNodes = [];
	  this.each(function (node) {
	    foundNodes = foundNodes.concat(Array.from(node.querySelectorAll(selector)));
	  });
	  return new DOMNodeCollection(foundNodes);
	};
	
	DOMNodeCollection.prototype.remove = function () {
	  for (var i = 0; i < this.HTMLElements.length; i++) {
	    this.HTMLElements[i].remove();
	  }
	  this.HTMLElements = [];
	};
	
	DOMNodeCollection.prototype.on = function (type, callback) {
	  this.each(function (node) {
	    node.addEventListener(type, callback);
	    node[type].push(callback);
	  });
	};
	
	DOMNodeCollection.prototype.off = function (type) {
	  this.each(function (node) {
	    if (node[type]){
	      node[type].forEach( function (callback) {
	        node.removeEventListener(type, callback);
	      });
	    }
	    node[type] = [];
	  });
	};
	
	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);
//# sourceMappingURL=free_dom.js.map