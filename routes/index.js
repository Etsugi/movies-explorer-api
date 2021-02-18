const router = require('express').Router();

const auth = require('../middlewares/auth');
const signinRouter = require('./signin.js');
const signupRouter = require('./signup.js');
const usersRouter = require('./users.js');
const moviesRouter = require('./movies.js');

const NotFoundError = require('../errors/not-found-err');
const { urlNotFoundErrMess } = require('../utils/error-messages');

router.use('/signin', signinRouter);
router.use('/signup', signupRouter);

router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);

router.use('/*', () => {
  throw new NotFoundError(urlNotFoundErrMess);
});

module.exports = router;
