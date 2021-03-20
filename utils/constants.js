const { NODE_ENV, MONGOOSE_ADDRESS } = process.env;

const mongooseAddress = (NODE_ENV === 'production' ? MONGOOSE_ADDRESS : 'mongodb://localhost:27017/movieDB');

const mongooseSettings = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
};

const limiterSettings = {
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
  message: 'Превышен лимит запросов с одного IP, повторите позже'
};

module.exports = {
  mongooseAddress,
  mongooseSettings,
  limiterSettings
};
