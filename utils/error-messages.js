const InternalServerErrMess = 'Внутренняя ошибка сервера';
const badRequestErrMess = 'Переданы некорректные данные';
const conflictUserReqErrMess = 'Пользователь с таким email уже существует';
const conflictMovieReqErrMess = 'Фильм уже добавлен';
const forbiddenErrMess = 'Нет прав на удаление';
const urlNotFoundErrMess = 'Запрашиваемый ресурс не найден';
const movieNotFoundErrMess = 'Фильм не найден';
const authorizedFailErrMess = 'Некорректно заполнено одно из полей';
const unauthorizedErrMess = 'Необходима авторизация';

module.exports = {
  InternalServerErrMess,
  badRequestErrMess,
  conflictUserReqErrMess,
  conflictMovieReqErrMess,
  forbiddenErrMess,
  urlNotFoundErrMess,
  movieNotFoundErrMess,
  authorizedFailErrMess,
  unauthorizedErrMess
};
