const express = require('express');
const userRoute = express.Router();
const userController = require('../controllers/userController');

userRoute.post('/login', userController.checkUser, (req, res) => res.sendStatus(200));

userRoute.post('/signup', userController.createUser, (req, res) => res.sendStatus(200));

module.exports = userRoute;
