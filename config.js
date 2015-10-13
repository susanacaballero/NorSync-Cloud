/**
 * Created by Susana Caballero on 9/29/2015.
 */
var PgConnectionString = process.env.PG_DATABASE_URL || 'postgres://postgres:mca570@localhost:5432/norsyncCloud';
var MongoConnectionString = process.env.MONGO_DATABASE_URL || 'mongodb://localhost:27017/loggingDB';

exports.pgConnectionString = PgConnectionString;
exports.mongoConnectionString = MongoConnectionString;