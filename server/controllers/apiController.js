const { Products, CountryCode } = require('plaid');
const client = require('../server.js');
const ErrorHandler = require('../errorHandler');
const db = require('../models/dbModels');
const fs = require('fs');
const path = require('path');

const apiController = {};
const errorHandler = new ErrorHandler('apiController');

apiController.createLinkToken = (req, res, next) => {
  const clientUserId = req.cookies.user_id;
  const request = {
    user: {
      client_user_id: clientUserId
    },
    client_name: 'OurAppName',
    //redirect_uri: 'https://redirectmeto.com/http://localhost:8080/',
    products: [Products.Auth],
    language: 'en',
    //redirect_uri: 'https://localhost:3000/',
    country_codes: [CountryCode.Us]
  };

  client
    .linkTokenCreate(request)
    .then((resp) => {
      res.locals.tokenResponse = resp.data;
      console.log(resp.data);
      return next();
    })
    .catch((err) => {
      return next(
        errorHandler.makeError(
          'createLinkToken',
          `Encountered error while creating link token: ${err}`,
          500
        )
      );
    });
};

apiController.exchangePublicToken = (req, res, next) => {
  const { public_token } = req.body;
  client
    .itemPublicTokenExchange({
      public_token: public_token
    })
    .then((resp) => {
      const { access_token, item_id, request_id } = resp.data;
      const { user_id } = req.cookies;
      const params = [item_id, user_id, access_token, request_id];
      const query =
        'INSERT INTO item_access (item_id, user_id, access_token, request_id) VALUES ($1, $2, $3, $4)';

      db.query(query, params)
        .then((result) => {
          console.log(result);
          return next();
        })
        .catch((err) => {
          return next(
            errorHandler.makeError(
              'exchangePublicToken',
              `Error while saving app token to database: ${err}`,
              500,
              'Encountered error while exchanging public token for app token'
            )
          );
        });
    })
    .catch((err) => {
      return next(
        errorHandler.makeError(
          'exchangePublicToken',
          `Encountered error while exchanging public token for app token: ${err}`,
          500,
          'Encountered error while exchanging public token for app token'
        )
      );
    });
};

apiController.testTransactions = (req, res, next) => {
  client
    .transactionsSync({
      access_token: 'access-sandbox-30e0347a-8520-4b1d-b061-d9e09ff04d59'
    })
    .then((resp) => {
      fs.writeFileSync(
        path.resolve(__dirname, '../test_data/test_transactions.json'),
        JSON.stringify(resp.data)
      );
      console.dir(resp.data);
      return next();
    });
};

apiController.testBalance = (req, res, next) => {
  client
    .accountsBalanceGet({
      access_token: 'access-sandbox-30e0347a-8520-4b1d-b061-d9e09ff04d59'
    })
    .then((resp) => {
      fs.writeFileSync(
        path.resolve(__dirname, '../test_data/test_balances.json'),
        JSON.stringify(resp.data)
      );
      console.dir(resp.data);
      return next();
    });
};

module.exports = apiController;
