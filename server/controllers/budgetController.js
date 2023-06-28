const db = require('../models/dbModels');

const budgetController = {
  checkBudget: async (req, res, next) => {
    const { _id } = req.body;
    const sqlQuery = 'SELECT * FROM budget WHERE _id = $1';
    try {
      const data = await db.query(sqlQuery, [_id]);
      // to be updated
      if (!data.rows[0]) return next('data does not exist');
      res.locals._id = data.rows[0]._id;
      return next();
    } catch (err) {
      return next(err);
    }
  },

  createBudget: async (req, res, next) => {
    const {
      income,
      entertainment,
      food_and_drink,
      general_merchandise,
      transportation,
      tavel,
      rent_and_utilities,
    } = req.body;

    const sqlQuery =
      'INSERT INTO budget (income, entertainment, food_and_drink, general_merchandise, transportation, travel, rent_and_utilities) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING _id';
    
      try {
      const data = await db.query(sqlQuery, [
        income,
        entertainment,
        food_and_drink,
        general_merchandise,
        transportation,
        travel,
        rent_and_utilities,
      ]);
      // to be updated
      res.locals.budget_id = data.rows[0]._id;
      return next();
    } catch (err) {
      return next(err);
    }
  },
};

module.exports = budgetController;
