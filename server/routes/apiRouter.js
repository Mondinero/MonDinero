const { Router } = require('express');
const apiController = require('../controllers/apiController');
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

apiRouter.post('/accounts/balance/get', apiController.getBalances, (req, res) => {
  return res.status(200).json(res.locals.account);
})

// apiRouter.get('/transactions/sync', apiController.getTransactions, (req, res) => {
//   return res.status(200).json();
// })


module.exports = apiRouter;
