const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.post('/login', userController.checkUser, (req, res) => res.json(res.locals));

userRouter.post('/signup', userController.createUser, (req, res) => res.json(res.locals));

module.exports = userRouter;
