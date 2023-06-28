const path = require('path');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRouter');

require('dotenv').config();

const plaid = require('plaid');
const { Configuration, PlaidApi, PlaidEnvironments } = plaid;

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET_SANDBOX,
    },
  },
});

const client = new PlaidApi(configuration);

module.exports = client;

const apiRouter = require('./routes/apiRouter');
const budgetRouter = require('./routes/budgetRouter');

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../dist')));
} else {
  app.use('/assets', express.static(path.resolve(__dirname, '../src')));
}

// Routers
app.use('/api/', apiRouter);
app.use('/server/user', userRouter);
app.use('/budget/', budgetRouter);

// 404 error handler
app.use((req, res) => {
  console.log(req);
  return res.status(404).send("This is not the page you're looking for");
});

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// Starting server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
