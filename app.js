const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// Express
const app = express();

// 1) MIDDLEWARES
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json()); // Modify incoming request data  **middleware**
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from the middleware :)');
  next(); // Always call it
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next(); // Always call it
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

module.exports = app;
