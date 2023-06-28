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
      client_user_id: clientUserId,
    },
    client_name: 'MonDinero',
    //redirect_uri: 'https://redirectmeto.com/http://localhost:8080/',
    products: [Products.Auth],
    language: 'en',
    //redirect_uri: 'https://localhost:3000/',
    country_codes: [CountryCode.Us],
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
        errorHandler.makeError('createLinkToken', `Encountered error while creating link token: ${err}`, 500)
      );
    });
};

apiController.exchangePublicToken = (req, res, next) => {
  const { public_token } = req.body;
  client
    .itemPublicTokenExchange({
      public_token: public_token,
    })
    .then((resp) => {
      const { access_token, item_id, request_id } = resp.data;
      const { user_id } = req.cookies;
      const params = [item_id, user_id, access_token, request_id];
      const query = 'INSERT INTO item_access (item_id, user_id, access_token, request_id) VALUES ($1, $2, $3, $4)';

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

  let { user_id } = req.body;
  if (!user_id) {
    user_id = req.cookies.user_id;
  }
  console.log(user_id);

  const query = 'SELECT * FROM item_access WHERE user_id = $1';
  const data = await db.query(query, [user_id]);
  console.log('data.rows is: ', data.rows);

  const access_tokens = [];
  data.rows.forEach((el) => access_tokens.push(el.access_token));
  console.log(access_tokens);

  try {
    const balanceArr = [];
    for (let i = 0; i < access_tokens.length; i++) {
      //console.log('INSIDE OUTER FOR LOOP');
      const request = { access_token: access_tokens[i] };
      console.log('request is: ', request);
      const response = await client.accountsBalanceGet(request);
      console.log('response.data is: ', response.data);

      const accounts = response.data.accounts;
      console.log(response);
      for (let j = 0; j < accounts.length; j++) {
        balanceArr.push({
          name: accounts[j].name,
          available: accounts[j].balances.available,
          current: accounts[j].balances.current,
        });
      }
    }
    res.locals.balance = balanceArr;
    console.log(`Balance Array: ${balanceArr}`);
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
  // console.log('INSIDE GET TRANSACTIONS');
  // let { user_id } = req.body;
  // if (!user_id) {
  //   user_id = req.cookies.user_id;
  // }

  // const query = 'SELECT * FROM item_access WHERE user_id = $1';
  // const data = await db.query(query, [user_id]);
  // //console.log('data.rows is: ', data.rows);
  // const access_token = data.rows[0].access_token;

  const access_token = res.locals.accessTokenList[0];
  console.log(access_token);

  const request = {
    access_token: access_token,
    options: {
      include_personal_finance_category: true,
    },
  };

  // console.log('get transactions request is: ', request);
  try {
    const response = await client.transactionsSync(request);
    //console.log('this is the response', response);
    let transactions = response.data.added;
    // console.log('transactions are: ', transactions);
    // console.log('first transaction: ', transactions[0]);
    const transactionArr = [];
    for (let i = 0; i < transactions.length; i++) {
      transactionArr.push({
        account_id: transactions[i].account_id,
        date: transactions[i].date,
        amount: transactions[i].amount,
        category: transactions[i].category,
        name: transactions[i].name,
        transaction_id: transactions[i].transaction_id,
      });
    }
    res.locals.transactions = transactionArr;
    console.log(transactionArr);
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
};

apiController.testTransactions = (req, res, next) => {
  client
    .transactionsSync({
      access_token: 'access-sandbox-30e0347a-8520-4b1d-b061-d9e09ff04d59',
    })
    .then((resp) => {
      fs.writeFileSync(path.resolve(__dirname, '../test_data/test_transactions.json'), JSON.stringify(resp.data.added));
      res.locals.rawTransactionsData = resp.data.added;
      const testJson = fs.readFileSync(path.resolve(__dirname, '../test_data/graph_test_transactions.json')).toString();
      // console.log(testJson);
      res.locals.testTransactionsJson = JSON.parse(testJson);
      return next();
    });
};

apiController.testBalance = (req, res, next) => {
  // client
  //   .accountsBalanceGet({
  //     access_token: 'access-sandbox-30e0347a-8520-4b1d-b061-d9e09ff04d59'
  //   })
  //   .then((resp) => {
  //     fs.writeFileSync(
  //       path.resolve(__dirname, '../test_data/test_balances.json'),
  //       JSON.stringify(resp.data)
  //     );

  const data = fs.readFileSync(path.resolve(__dirname, '../test_data/test_balances.json')).toString();
  const accounts = [];
  for (const el of JSON.parse(data).accounts) {
    console.log(el.name, el.balances.current, el.balances.available);
    accounts.push({
      name: el.name,
      current: el.balances.current,
      available: el.balances.available,
    });
  }
  res.locals.balances = accounts;
  console.log(res.locals.balances);
  return next();
};

module.exports = apiController;
