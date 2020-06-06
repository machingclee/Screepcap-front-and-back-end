import passport from "passport";
import passportLocal from "passport-local";
import passportJWT from "passport-jwt";
import User from "./src/database/models/User";
import { compare } from "./src/Utils/bcrypt/index";
import messages from "./src/enums/messages";
const LocalStrategy = passportLocal.Strategy;

const { JwtStrategy, ExtractJwt } = passportJWT;

//by local-strategy, done is a function: (err, user, info) => void:

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

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findOne({ where: { id: id } }).then((user) => {
    try {
      done(null, user.dataValues);
    } catch (err) {
      done(err, null);
    }
  });
});
