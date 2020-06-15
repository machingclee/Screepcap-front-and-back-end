import User from "../database/models/User";
import { compare } from "../Utils/bcrypt/index";
import jwt from "jsonwebtoken";

async function checkUserIdentity(username, password) {
  const user = (await User.findOne({ where: { username: username } })).dataValues;
  if (user) {
    const isCorrectPassword = await compare(password, user.password);
    return isCorrectPassword;
  } else {
    return false;
  }
}

export { checkUserIdentity };

function issueJWT(user) {
  const payload = { id: user.id };
  const expiresIn = process.env.TOKEN_EXPIRE_IN;
  const token = jwt.sign(payload, process.env.PRIVATE_KEY, {
    expiresIn: expiresIn
  });
  return token;
}

async function saveToken({ user, token }) {
  await User.update({ push_notification_token: token }, { where: { id: user.id } });
}

export const authServices = {
  issueJWT,
  saveToken
};
