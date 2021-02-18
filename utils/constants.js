const allowlist = [
  'https://api.diplom.kiprin.students.nomoredomains.icu/',
  'http://api.diplom.kiprin.students.nomoredomains.icu/',
  'https://diplom.kiprin.students.nomoredomains.icu/',
  'http://diplom.kiprin.students.nomoredomains.icu/',
  'http://localhost:3000'
];

const mongooseAddress = 'mongodb://localhost:27017/diplomDB';

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
  allowlist,
  mongooseAddress,
  mongooseSettings,
  limiterSettings
};