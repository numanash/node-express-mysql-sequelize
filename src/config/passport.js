const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const UserDao = require('../dao/UserDao');
const config = require('./config');
const { tokenTypes } = require('./tokens');
const TokenDao = require('../dao/TokenDao');

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  passReqToCallback: true,
};

const jwtVerify = async (req, payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error('Invalid token type');
    }
    const userDao = new UserDao();
    const tokenDao = new TokenDao();
    const authorization =
      req.headers.authorization !== undefined ? req.headers.authorization.split(' ') : [];
    if (authorization[1] === undefined) {
      return done(null, false);
    }

    const tokenDoc = await tokenDao.findOne({
      token: authorization[1],
      type: tokenTypes.ACCESS,
      blacklisted: false,
    });

    if (!tokenDoc) {
      return done(null, false);
    }
    const user = await userDao.findOneByWhere({ uuid: payload.sub });

    if (!user) {
      return done(null, false);
    }

    done(null, user);
  } catch (error) {
    console.log(error);
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
};
