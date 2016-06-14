var DOMNodeCollection = require('./dom_node_collection');

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
