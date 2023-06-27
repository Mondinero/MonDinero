const db = require('../models/dbModels');
const bcrypt = require('bcryptjs');

const userController = {
  checkUser: async (req, res, next) => {
    const { username, password } = req.body;
    const sqlQuery = 'SELECT * FROM users WHERE username = $1';
    try {
      const data = await db.query(sqlQuery, [username]);
      if (!data.rows[0]) return next('incorrect username or password');
      const compare = await bcrypt.compare(password, data.rows[0].password);
      if (!compare) return next('incorrect username or password');
      else return next();
    } catch (err) {
      return next(err);
    }
  },

  createUser: async (req, res, next) => {
    const { firstName, lastName, username, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const sqlQuery = 'INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)';
    try {
      await db.query(sqlQuery, [firstName, lastName, username, hashPassword]);
      return next();
    } catch (err) {
      return next(err);
    }
  },
};

module.exports = userController;
