const bcrypt = require('bcryptjs');
const User = require('../models/user');

const BadRequestError = require('../errors/bad-request-err');
const ConflictingRequestError = require('../errors/conflicting-request-err');
const { conflictUserReqErrMess, authorizedFailErrMess } = require('../utils/error-messages');

async function createUser(req, res, next) {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
    });
    res.send({
      email: user.email,
      name: user.name,
      _id: user._id

    });
  } catch (err) {
    if (err.code === 11000) {
      const conflictingRequestError = new ConflictingRequestError(conflictUserReqErrMess);
      next(conflictingRequestError);
    }
    if (err.name === 'ValidationError') {
      const badRequestError = new BadRequestError(authorizedFailErrMess);
      next(badRequestError);
    }
    next(err);
  }
}

module.exports = createUser;
