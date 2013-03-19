###
run many times so that we can abstract out the overhead of promise creation.
###

_ = require 'lodash'

path = require 'path'

assert = require 'assert'
expected = path.join __dirname, '..', '/node_modules/tap/lib/main.js'

node_resolve = require '../'

count = 100

compare = 

  'node-resolve *async*' : (done) ->
    test_done = _.after count, done()
    for i in [0...count] by 1
      node_resolve 'tap', { basedir: __dirname }, (err, filename) ->
        
        # assert.strictEqual filename, expected, 'filename not resolved'

        test_done
      null
    null

  'node-resolve *sync*' : (done) ->
    for i in [0...count] by 1
      filename = node_resolve.sync 'tap'
      assert.strictEqual filename, expected, 'filename not resolved'
      null
    done()

module.exports = {compare, countPerLap : count }