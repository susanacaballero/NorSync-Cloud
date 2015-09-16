/**
 * Created by Susana Caballero on 9/14/2015.
 */
(function(){
    var client = require('mongodb').MongoClient,
        mongodb;

    module.exports =  {
        /** connect: open a connection to the MongoDB server and save that connection object as a local variable of the module */
        connect: function(dburl, callback) {
            client.connect(dburl,
                function(err, db){
                    mongodb = db;
                    if(callback) { callback(); }
                });
        },
        /** db: a function that simply returns the instance of the connection object (that was set via connect) */
        db: function() {
            return mongodb;
        },
        /** close: a function that closes the connection */
        close: function() {
            mongodb.close();
        }
    };
})();