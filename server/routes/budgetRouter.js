const express = require('express');
const budgetRouter = express.Router();
const budgetController = require('../controllers/budgetController');

budgetRouter.post('/checkBudget', budgetController.checkBudget, (req, res) => {
    return res.status(200).json(res.locals.budget);
});

budgetRouter.post('/createBudget', budgetController.createBudget, (req, res) => {
    return res.sendStatus(200);
});

module.exports = budgetRouter;
