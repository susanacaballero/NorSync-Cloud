/**
 * Created by Susana Caballero on 9/29/2015.
 */

    var coreDB = require('../db/pgsql_client');

    module.exports = {
        insertUser: function(email, password, cb){
            coreDB.query('INSERT INTO "user" (email, password) values ($1, $2)', [email, password], function(err, rows){
                cb (err,rows ? rows[0] : null)
            })
        },
        getUserById: function(id, cb) {
            coreDB.query('SELECT * FROM "user" WHERE id = $1', [id], function(err, rows) {
                cb(err, rows ? rows[0] : null)
            })
        },
        getUserByEmail: function(email, cb) {
            coreDB.query('SELECT * FROM "user" WHERE email = $1', [email], function(err, rows) {
                cb(err, rows ? rows[0] : null)
            })
        }

    };