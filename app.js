const express = require('express');
require('dotenv').config();
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const { errorHandler } = require('./utils/error-handler');
const {
  allowlist,
  mongooseAddress,
  mongooseSettings,
  limiterSettings
} = require('./utils/constants');

const { PORT = 3001 } = process.env;
const app = express();

app.use(cors({
  origin: allowlist,
  credentials: true
}));

mongoose.connect(mongooseAddress, mongooseSettings);

app.use(requestLogger);

app.use(helmet());
app.use(rateLimit(limiterSettings));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', router);

app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
