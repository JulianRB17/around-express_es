const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi, Segments, errors } = require('celebrate');
const validator = require('validator');
const cors = require('cors');
const { cardsRoute } = require('./routes/cards');
const { usersRoute } = require('./routes/users');
const { login, createUser, getUserData } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
require('dotenv').config();

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/aroundb');

const allowedCors = [
  'https://wwww.julianrb-around.students.nomoredomainssbs.ru/',
  'https://julianrb-around.students.nomoredomainssbs.ru/',
  'http://wwww.julianrb-around.students.nomoredomainssbs.ru/',
  'http://julianrb-around.students.nomoredomainssbs.ru/',
  'http://localhost:3000',
];
const corsOptions = function (origin, callback) {
  if (allowedCors.indexOf(origin)) callback(null, true);
};

const urlValidator = function (value, helpers) {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

const emailValidator = function (value, helpers) {
  if (validator.isEmail(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

app.options('*', cors());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.post(
  '/signup',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      avatar: Joi.string()
        .default(
          'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg'
        )
        .custom(urlValidator),
      email: Joi.string().required().custom(emailValidator),
    }),
  }),
  createUser
);
app.post('/signin', login);
app.use(auth);
app.use('/cards', cardsRoute);
app.get('/users/me', getUserData);
app.use('/users', usersRoute);

app.use(errorLogger);

app.use(errors());
app.use((err, req, res, next) => {
  const { status = 500, message } = err;
  res.status(status).send({
    message:
      status === 500 ? 'Se ha producido un error en el servidor' : message,
  });
});

app.listen(PORT, () => {
  console.log(PORT);
});
