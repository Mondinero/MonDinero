const pkg = require('pg');
require('dotenv').config();

const pool = new pkg.Pool({
  host: process.env.PG_URI,
  database: 'mondinerodb',
  user: 'mondineroadmin',
  password: process.env.PG_PW,
  port: 5432,
  ssl: false,
});

pool.connect((err) => {
  if (err) {
    return console.error('could not connect to postgres', err);
  } else {
    console.log('connected');
  }
});

const db = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};

module.exports = db;
