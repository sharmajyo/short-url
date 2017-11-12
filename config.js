// var { Client } = require('pg');
// var conString = process.env.DATABASE_URL || "postgres://postgres:Welcome123@localhost:5432/postgres";
// var client = new Client({
//   user: 'jyoti.sharma',
//   database: 'feeds_db',
//   password: 'newsfeeds',
// });
// client.connect();

var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/feeds_db';
var db = pgp(connectionString);
