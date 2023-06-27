const { Router } = require('express');
const apiController = require('./apiController');
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

module.exports = apiRouter;
