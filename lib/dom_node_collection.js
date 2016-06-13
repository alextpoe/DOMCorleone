
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
