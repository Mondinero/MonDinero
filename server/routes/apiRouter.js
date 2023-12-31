const { Router } = require('express');
const apiController = require('../controllers/apiController');
const userController = require('../controllers/userController');
const dataController = require('../controllers/dataController');

const apiRouter = Router();

apiRouter.post('/create_link_token', apiController.createLinkToken, (req, res) => {
  res.status(200).json(res.locals.tokenResponse);
});

apiRouter.post('/exchange_public_token', apiController.exchangePublicToken, (req, res) => {
  res.status(200).json({ public_token_exchange: 'complete' });
});

apiRouter.post('/accounts/balance/get', userController.getCurrentUserTokens, apiController.getBalances, (req, res) => {
  return res.status(200).json(res.locals.balance);
});

apiRouter.post('/transactions/sync', userController.getCurrentUserTokens, apiController.getTransactions, (req, res) => {
  return res.status(200).json(res.locals.transactions);
});

apiRouter.get('/testTransactions', apiController.testTransactions, (req, res) => {
  return res.status(200).json(res.locals.testTransactionsJson);
});

apiRouter.get('/testBalances', apiController.testBalance, (req, res) => {
  return res.status(200).json(res.locals.balances);
});

apiRouter.get(
  '/data/pieChart',
  userController.getCurrentUserTokens,
  apiController.getTransactions,
  dataController.transactionsCategoryFine,
  (req, res) => {
    res.status(200).json(res.locals.finalFormatted);
  }
);

apiRouter.get(
  '/data/transactionsBar',
  userController.getCurrentUserTokens,
  apiController.getTransactions,
  dataController.transactionsTotalCategoryMonth,
  (req, res) => {
    res.status(200).json(res.locals.finalFormatted);
  }
);

module.exports = apiRouter;
