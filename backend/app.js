require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const helmet = require('helmet');
const limiter = require('./middlewares/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const { PORT, DB_URL } = require('./utils/constants');
const router = require('./routes/index');

mongoose.connect(DB_URL);

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(requestLogger);
app.use(limiter);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Сервер запущен!');
});
