
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
