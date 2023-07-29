const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const { OK_STATUS, CREATED_STATUS } = require('../utils/constants');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const InternalServerError = require('../errors/InternalServerError');
const ConflictError = require('../errors/ConflictError');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res
        .status(OK_STATUS)
        .send({ token });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(CREATED_STATUS).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
        _id: user._id,
      });
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('Неверные логин или пароль'));
      }
      if (error.code === 11000) {
        return next(new ConflictError('Пользователь с таким email уже зарегистрирован'));
      } return next(error);
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(OK_STATUS).send(users);
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById({ _id: req.params.userId })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Id пользователя не найден');
      }
      res.status(OK_STATUS).send(user);
    })
    .catch(next);
};

const updateUserData = (req, res, next, config = {}) => {
  User.findByIdAndUpdate(req.user._id, req.body, config)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Информация о пользователе не найдена');
      }
      res.status(OK_STATUS).send(user);
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('Невалидные данные'));
      }
      return next(new InternalServerError('Ошибка обновления профиля'));
    });
};

module.exports.updateUserInfo = (req, res, next) => {
  updateUserData(req, res, next, {
    new: true,
    runValidators: true,
  });
};

module.exports.updateAvatar = (req, res, next) => {
  updateUserData(req, res, next, {
    new: true,
    runValidators: true,
  });
};

module.exports.getUserInfo = (req, res, next) => {
  console.log(req.user._id);
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Информация о пользователе не найдена'));
      }
      return res.status(OK_STATUS).send(user);
    })
    .catch(next);
};

module.exports.signOut = (req, res) => {
  res.clearCookie('token');
  res.status(OK_STATUS).send('Выход выполнен успешно');
};
