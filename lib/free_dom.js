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
	
	$l = function $l(selectors){
	
	  var dom;
	  var nodeList;
	  var funcs = [];
	  if(selectors instanceof Function){
	    funcs.push(selectors);
	    document.addEventListener("DOMContentLoaded", function(event) {
	      console.log("DOM fully loaded and parsed");
	    });
	  }
	
	  if(selectors instanceof HTMLElement){
	    dom = new DOMNodeCollection([selectors]);
	  } else {
	    var elementList = document.querySelectorAll(selectors);
	    nodeList = [].slice.call(elementList);
	    dom = new DOMNodeCollection(nodeList);
	  }
	
	
	  // for(var i=0; i<1000000000; i++)
	  return dom;
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

	
	var DOMNodeCollection = function (HTMLElements){
	  this.HTMLElements = HTMLElements;
	};
	
	DOMNodeCollection.prototype.html = function(string){
	  if (string === undefined) return this.HTMLElements[0];
	
	  for (var i = 0; i < this.HTMLElements.length; i++) {
	    this.HTMLElements[i].innerHTML = string;
	  }
	};
	
	DOMNodeCollection.prototype.empty = function () {
	  for (var i = 0; i < this.HTMLElements.length; i++) {
	    this.HTMLElements[i].innerHTML = "";
	  }
	};
	
	DOMNodeCollection.prototype.append = function (item) {
	  for (var i = 0; i < this.HTMLElements.length; i++) {
	    this.HTMLElements[i].innerHTML += item;
	  }
	};
	
	DOMNodeCollection.prototype.attr = function (attributeName) {
	  var allAttr = this.HTMLElements[0].attributes;
	  return allAttr[attributeName];
	};
	
	DOMNodeCollection.prototype.addClass = function (string) {
	  for (var i = 0; i < this.HTMLElements.length; i++) {
	    this.HTMLElements[i].classList.add(string);
	  }
	};
	
	DOMNodeCollection.prototype.removeClass = function (string) {
	  for (var i = 0; i < this.HTMLElements.length; i++) {
	    if (string === undefined){
	      this.HTMLElements[i].removeAttribute("class");
	    } else {
	      this.HTMLElements[i].classList.remove(string);
	    }
	  }
	};
	
	DOMNodeCollection.prototype.children = function () {
	  var result = [];
	  for (var i = 0; i < this.HTMLElements.length; i++) {
	    var currentChildren = this.HTMLElements[i].children;
	
	    for (var j = 0; j < currentChildren.length; j++) {
	      result.push(currentChildren[j]);
	    }
	
	  }
	
	  return new DOMNodeCollection(result);
	};
	
	DOMNodeCollection.prototype.parent = function () {
	  var result = [];
	  for (var i = 0; i < this.HTMLElements.length; i++) {
	    var currentParent = this.HTMLElements[i].parentElement;
	    result.push(currentParent);
	
	  }
	
	  return new DOMNodeCollection(result);
	};
	
	DOMNodeCollection.prototype.find = function (selectors) {
	  var result = [];
	  for (var i = 0; i < this.HTMLElements.length; i++) {
	    var currentNodes = this.HTMLElements[i].querySelectorAll(selectors);
	    currentNodes = [].slice.call(currentNodes);
	    for (var j = 0; j < currentNodes.length; j++) {
	      result.push(currentNodes[j]);
	    }
	
	  }
	
	  return new DOMNodeCollection(result);
	};
	
	DOMNodeCollection.prototype.remove = function () {
	  for (var i = 0; i < this.HTMLElements.length; i++) {
	    this.HTMLElements[i].remove();
	  }
	  this.HTMLElements = [];
	};
	
	DOMNodeCollection.prototype.on = function (type, listener) {
	  for (var i = 0; i < this.HTMLElements.length; i++) {
	    this.HTMLElements[i].addEventListener(type, listener);
	  }
	};
	
	DOMNodeCollection.prototype.off = function (type, listener) {
	  for (var i = 0; i < this.HTMLElements.length; i++) {
	    this.HTMLElements[i].removeEventListener(type, listener);
	  }
	};
	
	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);
//# sourceMappingURL=free_dom.js.map