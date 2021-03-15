const User = require('../models/user');

const BadRequestError = require('../errors/bad-request-err');
const { badRequestErrMess } = require('../utils/error-messages');

async function getUserInfo(req, res, next) {
  const id = req.user._id;
  try {
    const user = await User.findById(id);
    res.send(user);
  } catch (err) {
    next(err);
  }
}

async function updateUser(req, res, next) {
  const { email, name } = req.body;
  const id = req.user._id;

  try {
    const user = await User.findByIdAndUpdate(id, {
      email,
      name
    }, {
      runValidators: true,
      new: true
    });
    res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const badRequestError = new BadRequestError(badRequestErrMess);
      next(badRequestError);
    }
    next(err);
  }
}

module.exports = {
  getUserInfo,
  updateUser
};
