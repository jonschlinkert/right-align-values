/*!
 * right-align-values <https://github.com/jonschlinkert/right-align-values>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

/* deps:mocha */
var should = require('should');
var align = require('./');

var arr = [{a: 'b'}, {a: 'bb'}, {a: 'bbbb'}, {a: 'bbb'}, {a: 'bb'}];

describe('right align values', function () {
  describe('array:', function () {
    it('should right-align the values for the given property:', function () {
      align(arr, 'a').should.eql([
        {a: '   b'},
        {a: '  bb'},
        {a: 'bbbb'},
        {a: ' bbb'},
        {a: '  bb'}
      ]);
    });
  });
  describe('object:', function () {
    it('should right-pad the values of an object:', function () {
      align({a: 'b', c: 'dddddd', e: 'fff', g: 'hhhhh'}).should.eql({
        a: '     b',
        c: 'dddddd',
        e: '   fff',
        g: ' hhhhh',
      });
    });
  });

  it('should throw an error when an array is not passed:', function () {
    (function () {
      align();
    }).should.throw('right-align-values expects an object or array.');
  });
});
