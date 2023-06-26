const pkg = require('pg');

const PG_URI = 'mondinero-prod-instance-1.cejnzawepqxu.us-east-1.rds.amazonaws.com';
const pool = new pkg.Pool({
  connectionString: PG_URI,
  database: 'mondinerodb',
  user: 'mondineroadmin',
  password: 123456789,
  port: 5432,
  ssl: true,
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
