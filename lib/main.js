var DOMNodeCollection = require('./dom_node_collection');

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
