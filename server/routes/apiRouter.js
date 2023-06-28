const { Router } = require('express');
const apiController = require('../controllers/apiController');
const userController = require('../controllers/userController');
const apiRouter = Router();

apiRouter.post(
  '/create_link_token',
  apiController.createLinkToken,
  (req, res) => {
    res.status(200).json(res.locals.tokenResponse);
  }
);

apiRouter.post(
  '/exchange_public_token',
  apiController.exchangePublicToken,
  (req, res) => {
    res.status(200).json({ public_token_exchange: 'complete' });
  }
);

apiRouter.get(
  '/testTransactions',
  apiController.testTransactions,
  (req, res) => {
    return res.status(200).json(res.locals.testTransactionsJson);
  }
);

apiRouter.get('/testBalances', apiController.testBalance, (req, res) => {
  return res.sendStatus(200);
});

module.exports = apiRouter;
