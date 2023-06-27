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



// apiController.getTransactions = (req, res, next) => {


module.exports = apiController;
