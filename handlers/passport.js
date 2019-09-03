const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const passportJwt = require('passport-jwt');
const userController = require('../controllers/user-controller');

const { Strategy, ExtractJwt } = passportJwt;

// options to be passed to strategy
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
  issuer: process.env.ISSUER,
  passReqToCallback: true,
};

const jwtStrategy = new Strategy(options, async (req, payload, done) => {
  try {
    const user = await userController.readOne({ _id: payload._id });
    req.user = user;
    done(null, user);
  } catch (err) {
    done(err, false);
  }
});

module.exports = jwtStrategy;
