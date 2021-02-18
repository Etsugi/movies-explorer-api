const jwt = require('jsonwebtoken');
const User = require('../models/user');

const UnauthorizeError = require('../errors/unauthorized-err');
const { authorizedFailErrMess } = require('../utils/error-messages');

const { NODE_ENV, JWT_SECRET } = process.env;

async function login(req, res, next) {
  const { email, password } = req.body;
  try {
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      { expiresIn: '7d' },
    );
    res.send({ token });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const unauthorizeError = new UnauthorizeError(authorizedFailErrMess);
      next(unauthorizeError);
    }
    next(err);
  }
}

module.exports = login;
