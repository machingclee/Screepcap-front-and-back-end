import passport from "passport";
import passportLocal from "passport-local";
import User from "./src/database/models/User";
import { compare } from "./src/Utils/bcrypt/index";
import messages from "./src/enums/messages";
import passportJwt from "passport-jwt";

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.PRIVATE_KEY;

const strategy = new JwtStrategy(options, (jwt_payload, done) => {
  User.findOne({ where: { id: jwt_payload.id } })
    .then((user) => {
      if (user) {
        return done(null, user.dataValues);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => {
      done(err, null);
    });
});

passport.use(strategy);

/*
// local-strategy:
const localStrategyVerifyCallBack = function (username, password, done) {
  User.findOne({ where: { username: username } }).then((user) => {
    if (!user)
      return done(null, false, {
        message: messages.incorrectUsernameOrPassword
      });

    compare(password, user.password).then((isValidPassword) => {
      if (!isValidPassword)
        return done(null, false, { message: messages.incorrectUsernameOrPassword });

      return done(null, user.dataValues);
    });
  });
};

// at this point, passport.authenticate('local', (err, user, info)=>{}) will call localStrategyVerifyCallBack.
const localStrategy = new LocalStrategy(localStrategyVerifyCallBack);

passport.use(localStrategy);
*/

//user is retrieved from the JWT callback above, and serializedUser is used to determine what should be saved in the session variable,
// the id is saved at req.session.passport.user = {id: '..'}
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// once after seriallizeUser is called, the user id is then used to retrieve the user object and saved in req.user.
// {id: 111222} is the only data saved in the session, not the whole user object.
passport.deserializeUser(function (id, done) {
  User.findOne({ where: { id: id } }).then((user) => {
    try {
      done(null, user.dataValues);
    } catch (err) {
      done(null, null);
    }
  });
});
