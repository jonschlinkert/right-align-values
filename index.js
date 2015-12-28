/*!
 * right-align-values <https://github.com/jonschlinkert/right-align-values>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var isObject = require('isobject');
var longest = require('longest-value');
var pad = require('pad-left');

module.exports = function rightAlignValues(obj, prop) {
  if (isProp(obj)) {
    var temp = prop;
    prop = obj;
    obj = temp;
  }

  if (!obj || typeof obj !== 'object') {
    throw new TypeError('right-align-values expects an object or array.');
  }

  if (Array.isArray(obj)) {
    return arrayValues(obj, prop);
  }
  return objectValues(obj, prop);
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

function objectValues(obj, prop) {
  if (typeof prop !== 'undefined') {
    return objectProperties(obj, prop);
  }

  var max = longest(obj).length;
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      var val = obj[key].toString();
      obj[key] = pad(val, max, ' ');
    }
  }
  return obj;
}

function objectProperties(obj, prop) {
  if (Array.isArray(prop)) {
    return eachProperty(obj, prop);
  }

  var longest = 0;
  var res = {};

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      var val = obj[key];
      if (isObject(val) && val.hasOwnProperty(prop)) {
        var len = val[prop].length;
        if (len > longest) {
          longest = len;
        }
      }
    }
  }

  Object.keys(obj).forEach(function(key) {
    var val = obj[key];
    res[key] = val;

    if (isObject(val) && val.hasOwnProperty(prop)) {
      res[key][prop] = pad(val[prop], longest, ' ');
    }
  });

  return res;
}

function eachProperty(obj, props) {
  var len = props.length, i = -1;
  while (++i < len) {
    obj = objectProperties(obj, props[i]);
  }
  return obj;
}

function isProp(val) {
  if (typeof val === 'string') {
    return true;
  }
  if (Array.isArray(val) && typeof val[0] === 'string') {
    return true;
  }
  return false;
}
