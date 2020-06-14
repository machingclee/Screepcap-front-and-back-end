import express from "express";
import { hashing, compare } from "../Utils/bcrypt/index";
import { checkUserIdentity } from "../services/authServices";
import User from "../database/models/User";
import messages from "../enums/messages";
import passport from "passport";
import { issueJWT } from "../Utils/JWT/index";
import { authServices } from "../services/authServices";

const router = express.Router();

router.post("/login", login);
router.post("/register", registerUser_JWT);
router.post("/checkIdentity", checkIdentity); // testing purpose, this is implemented already in local strategy.
router.get("/logout", logout);

router.get(
  "/protected",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  errorHandling,
  (req, res) => {
    res.json({ message: "authorized" });
  }
);

async function login(req, res) {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username: username } });
    if (user) {
      const pwIsCorrect = await compare(password, user.password);

      if (pwIsCorrect)
        res.json({ token: issueJWT(user), nickname: user.nickname, email: user.email });
      else throw new Error();
    } else {
      throw new Error();
    }
  } catch (err) {
    res.json({ message: messages.incorrectUsernameOrPassword });
  }
}

function errorHandling(err, req, res, next) {
  if (err) {
    console.log(err);
    res.json({ message: messages.fail });
  } else {
    next();
  }
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

async function registerUser_JWT(req, res) {
  const { username, password, nickname, email } = req.body;
  const existingUser = await User.findOne({ where: { username: username } });
  if (existingUser) {
    res.json({ message: messages.alreadyExists });
    return;
  }
  if (!existingUser) {
    const hash = await hashing(password);
    try {
      const user = (
        await User.create({
          username: username,
          password: hash,
          nickname: nickname,
          email: email
        })
      ).dataValues;
      console.log(user);
      if (user) {
        const token = authServices.issueJWT(user);
        res.json({ token, message: messages.success });
      } else {
        throw new Error();
      }
    } catch (err) {
      console.log(err);
      res.json({ message: messages.fail });
    }
  } else {
    res.json({ message: messages.fail });
  }
}

// async function registerUser(req, res) {
//   const { username, password } = req.body;
//   const existingUser = await User.findOne({ where: { username: username } });

//   if (existingUser) {
//     res.json({ message: messages.alreadyExists });
//     return;
//   }

//   if (!existingUser) {
//     const hash = await hashing(password);
//     try {
//       const user = (await User.create({ username: username, password: hash })).dataValues;
//       if (user) res.json({ message: messages.success });
//       else throw new Error();
//     } catch (err) {
//       res.json({ message: messages.fail });
//     }
//   } else {
//     res.json({ message: messages.fail });
//   }
// }

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
