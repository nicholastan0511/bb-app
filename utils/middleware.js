const jwt = require('jsonwebtoken');
const User = require('../models/user');

const tokenExtractor = (req, res, next) => {
  try {
    const authorization = req.get('authorization');
    if (authorization && authorization.startsWith('Bearer ')) {
      req.token = authorization.replace('Bearer ', '');
    } else {
      return res.status(400).send({ error: 'Invalid token' });
    }
    next();
  } catch (err) {
    next(err);
  }
};

const userExtractor = async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token invalid' });
    }
    req.user = await User.findById(decodedToken.id).populate('savedVerses');
    next();
  } catch (err) {
    next(err);
  }
};

const errorHandler = (error, req, res, next) => {
  console.log('IM THE ERR NAME', error.name);
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  } else if (error.name === 'CastError')
    return res.status(400).send({ error: 'malformatted id' });
  else if (error.name === 'JsonWebTokenError') {
    console.log('IM CALLED!!!');
    return res.status(401).json({ error: error.message });
  }

  next(error);
};

const unknownEndpoint = (req, res, next) => {
  return res.status(404).send({ error: 'unknown endpoint' });
};

module.exports = {
  tokenExtractor,
  userExtractor,
  errorHandler,
  unknownEndpoint,
};
