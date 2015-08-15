/*!
 * right-align-values <https://github.com/jonschlinkert/right-align-values>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var longest = require('longest-value');
var pad = require('pad-left');

module.exports = function rightAlignValues(obj, prop) {
  if (typeof obj !== 'object') {
    throw new TypeError('right-align-values expects an object or array.');
  }

  if (Array.isArray(obj)) {
    return arrayValues(obj, prop);
  }
  return objectValues(obj);
};

function arrayValues(arr, prop) {
  var max = longest(arr, prop).length;
  var len = arr.length;
  var res = new Array(len);

  while (len--) {
    var ele = arr[len];
    var val = ele[prop].toString();
    ele[prop] = pad(val, max, ' ');
    res[len] = ele;
  }
  return res;
}

function objectValues(obj) {
  var max = longest(obj).length;
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      var val = obj[key].toString();
      obj[key] = pad(val, max, ' ');
    }
  }
  return obj;
}
