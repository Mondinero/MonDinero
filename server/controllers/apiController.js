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

apiController.getBalances = async (req, res, next) => {
  console.log('INSIDE GET BALANCES');

  // assuming access_token has been saved on the user making the request
  const { user_id } = req.body;

  const query = 'SELECT * FROM item_access WHERE user_id = $1';
  const data = await db.query(query, [user_id]);
  console.log('data.rows is: ', data.rows);
  const access_tokens = data.rows;

  try {
    const balanceArr = [];
    for (let i = 0; i < access_tokens.length; i++) {
      console.log('INSIDE OUTER FOR LOOP');
      const request = { access_token: access_tokens[i].access_token };
      const response = await client.accountsBalanceGet(request);
      console.log('response.data is: ', response.data);
      
      const accounts = response.data.accounts;
      for (let j = 0; j < accounts.length; j++) {
        if (accounts[j].subtype === 'checking') {
          balanceArr.push(accounts[j].balances.available);
        }
      }
    }
    res.locals.balance = balanceArr;
    return next();
  } catch (err) {
      return next(
        errorHandler.makeError(
          'getBalances',
          `Encountered error while getting account balances: ${err}`,
          500,
          'Encountered error while getting account balances'
        )
      );
    }
  };

apiController.getTransactions = async (req, res, next) => {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  
  const request = {
    access_token: accessToken,
    start_date: `{year}-01-01`,
    end_date: `{year}-{month}-{day}`,
    options: {
      include_personal_finance_category: true,
      // count: 100,
    },
  };
  try {
    const response = await client.transactionsGet(request);
    let transactions = response.data.transactions;
    const total_transactions = response.data.total_transactions;
    // Manipulate the offset parameter to paginate
    // transactions and retrieve all available data
    while (transactions.length < total_transactions) {
      const paginatedRequest = {
        access_token: accessToken,
        start_date: `{year}-01-01`,
        end_date: `{year}-{month}-{day}`,
        options: {
          offset: transactions.length,
          include_personal_finance_category: true,
        },
      };
      const paginatedResponse = await client.transactionsGet(paginatedRequest);
      transactions = transactions.concat(paginatedResponse.data.transactions);
    }
    return next();
  } catch (err) {
    return next(
      errorHandler.makeError(
        'getTransactions',
        `Encountered error while getting account transactions: ${err}`,
        500,
        'Encountered error while getting account transactions'
      )
    );
  }
}

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
      const testJson = fs
        .readFileSync(
          path.resolve(__dirname, '../test_data/graph_test_transactions.json')
        )
        .toString();
      console.log(testJson);
      res.locals.testTransactionsJson = JSON.parse(testJson);
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

      return next();
    });
};

module.exports = apiController;
