const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.post('/login', userController.checkUser, (req, res) => res.sendStatus(200));

userRouter.post('/signup', userController.createUser, (req, res) => res.sendStatus(200));

module.exports = userRouter;
