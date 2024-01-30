const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const tourRouter = require(`${__dirname}/routes/tourRoutes`);
const userRouter = require(`${__dirname}/routes/userRoutes`);

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  const err = new AppError(`Can't find ${req.originalUrl}`, 404);

  next(err);
});

app.use(globalErrorHandler);

module.exports = app;
