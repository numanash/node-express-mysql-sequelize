const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../helper/ApiError');

const verifyCallback = (req, res, resolve, reject) => {
  return async (err, user, info) => {
    if (err || info || !user) {
      return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
    }
    req.user = user;

    resolve();
  };
};

const auth = () => {
  return async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate('jwt', { session: false }, verifyCallback(req, res, resolve, reject))(
        req,
        res,
        next,
      );
    })
      .then(() => {
        return next();
      })
      .catch((err) => {
        return next(err);
      });
  };
};

// Permission Middleware
const checkPermission = (requiredPermission) => {
  return (req, res, next) => {
    // Assuming you have a user object on the request
    const { user } = req;

    // Check if user has the required permission
    if (user && user.permissions && user.permissions.includes(requiredPermission)) {
      // User has the required permission, proceed to the next middleware or route handler
      next();
    } else {
      // User does not have the required permission, send an error response
      res.status(403).json({ error: 'Unauthorized' });
    }
  };
};

module.exports = { auth, checkPermission };
