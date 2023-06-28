const db = require('../models/dbModels');
const bcrypt = require('bcryptjs');

const userController = {
  checkUser: async (req, res, next) => {
    const { username, password } = req.body;
    const sqlQuery = 'SELECT * FROM users WHERE username = $1';
    try {
      const data = await db.query(sqlQuery, [username]);
      if (!data.rows[0]) return next('incorrect username or password');
      res.locals._id = data.rows[0]._id;
      res.locals.firstName = data.rows[0].first_name;
      res.locals.username = data.rows[0].username;
      const compare = await bcrypt.compare(password, data.rows[0].password);
      if (!compare) return next('incorrect username or password');
      else {
        res.cookie('user_id', res.locals._id).cookie('username', username);
        return next();
      }
    } catch (err) {
      return next(err);
    }
  },

  createUser: async (req, res, next) => {
    const { firstName, lastName, username, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const sqlQuery =
      'INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4) RETURNING _id';
    try {
      const data = await db.query(sqlQuery, [
        firstName,
        lastName,
        username,
        hashPassword
      ]);
      res.locals._id = data.rows[0]._id;
      res.locals.firstName = data.rows[0].first_name;
      res.locals.username = data.rows[0].username;
      return next();
    } catch (err) {
      return next(err);
    }
  },

  getCurrentUserTokens: async (req, res, next) => {
    try {
      const { user_id, username } = req.cookies;
      const accessQuery = await db.query(
        'SELECT * FROM item_access WHERE user_id = $1',
        [user_id]
      );
      const accessTokenList = {};
      for (const row of accessQuery.rows) {
        accessTokenList[row[item_id]] = row[access_token];
      }
      res.locals.accessTokenList = accessTokenList;
      return next();
    } catch (err) {
      return next(err);
    }
  }
};

module.exports = userController;
