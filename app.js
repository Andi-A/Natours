/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
// eslint-disable-next-line import/no-unresolved
const reviewRouter = require('./routes/reviewRoutes');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

// Express
const app = express();

// 1)GLOBAL  MIDDLEWARES
// console.log(process.env.NODE_ENV);
// Set Security HTTP HEADER
app.use(helmet()); // Put it in the begining

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// Limit request from same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, // 100 request from same IP for one hour
  message: 'To many requests from this IP, please try again in an hour',
});
app.use('/api', limiter); // Affect all routes

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' })); // Modify incoming request data  **middleware**

// Data Sanitization against NOSQL query injection
app.use(mongoSanitize());
// Data Sanitization against XSS

app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);
// Serving static files
app.use(express.static(`${__dirname}/public`));

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  //console.log(req.headers);
  next(); // Always call it
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404)); // This jumps to the error middleware down below
});

app.use(globalErrorHandler);

module.exports = app;
