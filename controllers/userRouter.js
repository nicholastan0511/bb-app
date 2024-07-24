require('dotenv').config();
const bcrypt = require('bcrypt');
const userRouter = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const middleware = require('../utils/middleware');

userRouter.post('/', async (req, res, next) => {
  const { username, password } = req.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    passwordHash,
  });

  try {
    const savedUser = await user.save();

    const userForToken = {
      username: savedUser.username,
      id: savedUser.id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    res.status(201).json({ token, ...userForToken });
  } catch (err) {
    next(err);
  }
});

userRouter.post(
  '/verse',
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (req, res, next) => {
    const user = req.user;
    try {
      user.generatedVerseCount++;
      const result = await user.save();
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
);

userRouter.get(
  '/',
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (req, res) => {
    const user = req.user;
    res.send(user);
  }
);

module.exports = userRouter;
