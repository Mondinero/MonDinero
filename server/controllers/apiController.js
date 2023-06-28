const { LinkTokenCreateRequest, Products, CountryCode } = require('plaid');
const client = require('../server');
const ErrorHandler = require('../errorHandler');

const apiController = {};
const errorHandler = new ErrorHandler('apiController');

apiController.createLinkToken = (req, res, next) => {
  const user = { id: 'sample_user_id' };
  const clientUserId = user.id;
  const request = {
    user: {
      client_user_id: clientUserId,
    },
    client_name: 'OurAppName',
    products: [Products.Auth],
    language: 'en',
    //redirect_uri: 'https://localhost:3000/',
    country_codes: [CountryCode.Us],
  };

  client
    .linkTokenCreate(request)
    .then((resp) => {
      console.log(resp.data);
      res.locals.tokenResponse = resp.data;
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
      public_token: public_token,
    })
    .then((resp) => {
      //Save these to DB and associate with current user
      const { access_token, item_id } = resp.data;
      res.locals.accessTokenAndItem = resp.data;
      return next();
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
  const { access_token } = req.body;
  const request = {
    access_token: access_token,
  };

  try {
    const response = await client.accountsBalanceGet(request);
    const accounts = response.data.accounts;
    for (let i = 0; i < accounts.length; i++) {
      if (accounts[i].subtype === 'checking') {
        res.locals.balance = {
          account_id: accounts[i].account_id,
          account_balance: accounts[i].balances.available,
        };
        break;
      }
    }
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
  // Provide a cursor from your database if you've previously received one for the Item. Leave null if this is your first sync call for this Item. The first request will return a cursor.
  let cursor = database.getLatestCursorOrNull(itemId);
  // New transaction updates since "cursor"
  let added = [];
  let modified = [];
  // Removed transaction ids
  let removed = [];
  let hasMore = true;
  // Iterate through each page of new transaction updates for item
  while (hasMore) {
    const request = {
      access_token: accessToken,
      cursor: cursor,
      options: { include_personal_finance_category: true },
    };

    try {
      const response = await client.transactionsSync(request);
      const data = response.data;
      // Add this page of results
      added = added.concat(data.added);
      modified = modified.concat(data.modified);
      removed = removed.concat(data.removed);
      hasMore = data.has_more;
      // Update cursor to the next cursor
      cursor = data.next_cursor;

     
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

  // Persist cursor and updated data
  database.applyUpdates(itemId, added, modified, removed, cursor);
};

module.exports = apiController;
