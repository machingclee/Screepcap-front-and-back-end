import express from "express";
import { hashing, compare } from "../Utils/bcrypt/index";
import { checkUserIdentity } from "../services/authServices";
import User from "../database/models/User";
import messages from "../enums/messages";
import passport from "passport";

const router = express.Router();

router.post(
  "/login",
  passport.authenticate("local", { failWithError: true }),
  errorHandling,
  loginSucess
);
router.post("/register", registerUser);
router.post("/checkIdentity", checkIdentity); // testing purpose, this is implemented already in local strategy.
router.get("/logout", logout);

function errorHandling(err, req, res, next) {
  if (err) res.json({ message: messages.incorrectUsernameOrPassword });
  else next();
}

function loginSucess(req, res, next) {
  console.log(req.session);
  console.log(req.user);
  res.json({ message: messages.success });
}

function logout(req, res) {
  req.logout();
  res.send("you logged out.");
}

async function registerUser(req, res) {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ where: { username: username } });

  if (existingUser) {
    res.json({ message: messages.alreadyExists });
    return;
  }

  if (!existingUser) {
    const hash = await hashing(password);
    try {
      const user = (await User.create({ username: username, password: hash })).dataValues;
      if (user) res.json({ message: messages.success });
      else throw new Error();
    } catch (err) {
      throw new Error();
    }
  } else {
    res.json({ message: messages.fail });
  }
}

async function checkIdentity(req, res) {
  const { username, password } = req.body;
  // console.log(username);
  console.log(req.body);
  const user = (await User.findOne({ where: { username: username } })).dataValues;
  const result = await compare(password, user.password);
  console.log(user);
  res.json({ result: result });
}

export default router;
