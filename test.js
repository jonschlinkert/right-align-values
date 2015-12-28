/*!
 * right-align-values <https://github.com/jonschlinkert/right-align-values>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

require('mocha');
var assert = require('assert');
var align = require('./');

var arr = [{a: 'b'}, {a: 'bb'}, {a: 'bbbb'}, {a: 'bbb'}, {a: 'bb'}];

describe('right align values', function () {
  describe('array', function () {
    it('should right-align the values for the given property', function () {
      assert.deepEqual(align(arr, 'a'), [
        {a: '   b'},
        {a: '  bb'},
        {a: 'bbbb'},
        {a: ' bbb'},
        {a: '  bb'}
      ]);
    });
  });

  describe('objects', function () {
    it('should right-align the values of an object', function () {
      assert.deepEqual(align({a: 'b', c: 'dddddd', e: 'fff', g: 'hhhhh'}), {
        a: '     b',
        c: 'dddddd',
        e: '   fff',
        g: ' hhhhh',
      });
    });

    it('should right-align values of a specific object property', function() {
      var res = align('foo', {
        a: {
          foo: 'a',
          bar: 'z'
        },
        b: {
          foo: 'aaaaaaa',
          bar: 'z'
        },
        c: {
          foo: 'aaa',
          bar: 'z'
        }
      });

      assert.deepEqual(res, {
        a: {
          foo: '      a',
          bar: 'z'
        },
        b: {
          foo: 'aaaaaaa',
          bar: 'z'
        },
        c: {
          foo: '    aaa',
          bar: 'z'
        }
      });
    });

    it('should right-align values for multiple properties', function() {
      var res = align(['foo', 'bar'], {
        a: {
          foo: 'a',
          bar: 'zzz'
        },
        b: {
          foo: 'aaaaaaa',
          bar: 'zz'
        },
        c: {
          foo: 'aaa',
          bar: 'zzzz'
        }
      });

      assert.deepEqual(res, {
        a: {
          foo: '      a',
          bar: ' zzz'
        },
        b: {
          foo: 'aaaaaaa',
          bar: '  zz'
        },
        c: {
          foo: '    aaa',
          bar: 'zzzz'
        }
      });
    });
  });

  it('should throw an error when an array is not passed', function(cb) {
    try {
      align();
      cb(new Error('expected an error'));
    } catch (err) {
      assert.equal(err.message, 'right-align-values expects an object or array.');
      cb();
    }
  });
});
