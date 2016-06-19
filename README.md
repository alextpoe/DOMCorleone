# DOM Corleone

One DOM to bring them all and in the browsers bind them.

What you're working with here is a lightweight version of jquery, with only the essentials needed to manipulate DOM.

DOM Corleone uses the DOM documentation by MDN(https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) to provide the same following functionality:

### DOM Manipulation and Traversal

#### Manipulation
- empty
- html
- attr
- addClass
```JavaScript
DOMNodeCollection.prototype.addClass = function (newClass) {
  this.each(function (node) {
    node.classList.add(newClass);
  });
};
```
- removeClass

#### Traversal
- remove
- find
```JavaScript
DOMNodeCollection.prototype.find = function (selector) {
  var foundNodes = [];
  this.each(function (node) {
    foundNodes = foundNodes.concat(Array.from(node.querySelectorAll(selector)));
  });
  return new DOMNodeCollection(foundNodes);
};
```
- children
- parent

### Event Handling
- on
```JavaScript
DOMNodeCollection.prototype.on = function (type, callback) {
  this.each(function (node) {
    node.addEventListener(type, callback);
    node[type].push(callback);
  });
};
```
- off

### Document Ready
- ready

### AJAX
- extend
- ajax
```JavaScript
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

```

## Demo
In order to explore your new-found DOM Corleone, it is helpful to use the demo project available as the index.html file.  From there you can open up the JavaScript console (command + option + i) and use the various methods that come with DOM Corleone.
