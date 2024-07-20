require('dotenv').config();
const bcrypt = require('bcrypt');
const userRouter = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

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

module.exports = userRouter;
