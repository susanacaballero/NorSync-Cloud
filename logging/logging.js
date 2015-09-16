/**
 * Created by Susana Caballero on 9/14/2015.
 */
(function() {
    var loggingDB = require('../db/mongo_client');
    var Timestamp = require('mongodb').Timestamp;
    var assert = require('assert');

    // wire up your express app or whatever then:

    loggingDB.connect('mongodb://localhost:27017/loggingDB',  function(err, db) {
        assert.equal(null, err);
        //assert.ok(db != null);
    });

    //Incoming requests

    module.exports = {
        log: function (args, callback) {
            var doc = {
                host: args.headers.host,
                path : args.url,
                timestamp: new Timestamp()
            };
            var collection = loggingDB.db().collection('logs');
            collection.insertOne(doc, function (err, result) {
                    assert.equal(err, null);
                    assert.equal(1, result.result.n);
                    assert.equal(1, result.ops.length);
                    console.log("Inserted 1 document into the document collection");
                    callback(result);
                });

        }
    };
})();