  var assert, compare, count, expected, node_resolve, path, _;

  _ = require('lodash');

  path = require('path');

  assert = require('assert');

  expected = path.join(__dirname, '..', '/node_modules/tap/lib/main.js');

  node_resolve = require('../');

  count = 100;

  compare = {
    'node-resolve *async*': function(done) {
      var i, test_done, _i;

      test_done = _.after(count, done());
      for (i = _i = 0; _i < count; i = _i += 1) {
        node_resolve('tap', {
          basedir: __dirname
        }, function(err, filename) {

          // this will fail
          // assert.strictEqual(filename, expected, 'filename not resolved');
          
          return test_done;
        });
        null;
      }
      return null;
    },
    'node-resolve *sync*': function(done) {
      var filename, i, _i;

      for (i = _i = 0; _i < count; i = _i += 1) {
        filename = node_resolve.sync('tap');
        // this will work
        // assert.strictEqual(filename, expected, 'filename not resolved');
        null;
      }
      return done();
    }
  };

  module.exports = {
    compare: compare,
    countPerLap: count
  };