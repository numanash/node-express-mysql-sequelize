const express = require('express');

// utils
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const passport = require('passport');
const httpStatus = require('http-status');

const routes = require('./route');
const { jwtStrategy } = require('./config/passport');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./helper/ApiError');

process.env.PWD = process.cwd();

const app = express();

// enable cors
app.use(cors());
app.options('*', cors());

app.use(express.static(`${process.env.PWD}/public`));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));
// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

app.get('/', async (req, res) => {
  res.status(200).send('Congratulations! API is working!');
});
app.use('/api', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);
// eslint-disable-next-line no-unused-vars
const db = require('./models');

// Uncomment this line if you want to sync database model
db.sequelize.sync();

module.exports = app;
