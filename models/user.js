/**
 * Created by Susana Caballero on 9/30/2015.
 */

var pg = require('../db/pgsql_client');
//var db = require("./database.js");
var schemas = require("./schemas.js");
var _ = require("lodash");

var User = function (data) {
    this.data = this.sanitize(data);
}

User.prototype.data = {}

User.prototype.changeName = function (name) {
    this.data.name = name;
}

User.prototype.get = function (name) {
    return this.data[name];
}

User.prototype.set = function (name, value) {
    this.data[name] = value;
}

User.prototype.sanitize = function (data) {
    data = data || {};
    schema = schemas.user;
    return _.pick(_.defaults(data, schema), _.keys(schema));
}

User.prototype.save = function (callback) {
    var self = this;
    this.data = this.sanitize(this.data);
    db.get('users', {id: this.data.id}).update(JSON.stringify(this.data)).run(function (err, result) {
        if (err) return callback(err);
        callback(null, result);
    });
}

User.findById = function (id, callback) {
    db.get('users', {id: id}).run(function (err, data) {
        if (err) return callback(err);
        callback(null, new User(data));
    });
}

User.register = function (data, cb){
    pg.query('INSERT INTO "User" (username, password, email) values($1, $2, $3)', [data.username, data.password, data.email], function(err, rows) {
        cb(err,  rows.rowCount>0 ? new User(rows.rows[0]) : null)
    })
}

User.findByEmail = function(email, cb) {
    pg.query('SELECT * FROM "User" WHERE email = $1', [email], function(err, rows) {
        cb(err,  rows.rowCount>0 ? new User(rows.rows[0]) : null)
    })
}

User.login = function(email, psw, cb){
   pg.query('SELECT * from "User" WHERE email=$1 AND password=$2',[email,psw], function(err, rows){
       cb(err,  rows.rowCount>0 ? new User(rows.rows[0]) : null)
   });
}

module.exports = User;