/**
 * Created by Susana Caballero on 9/29/2015.
 */
    var pg = require('pg');
    var connectionString = require('../config').pgConnectionString;

    module.exports =  {
        query: function(text, values, cb) {
                pg.connect(connectionString,function(err, client, done) {

                    var handleError = function(err) {
                        // no error occurred, continue with the request
                        if(!err) return false;

                        // An error occurred, remove the client from the connection pool.
                        // A truthy value passed to done will remove the connection from the pool
                        // instead of simply returning it to be reused.
                        // In this case, if we have successfully received a client (truthy)
                        // then it will be removed from the pool.
                        if(client){
                            done(client);
                        }
                        return true;
                    };

                    // handle an error from the connection
                    if(handleError(err)) cb(err, null);

                    client.query(text, values, function(err, result){
                        // handle an error from the query
                        //console.error(err);
                        if(handleError(err)) cb(err, null);
                        // return the client to the connection pool for other requests to reuse
                        done();
                        cb(err, result);
                    });
                });
        }
    };

