import User from "../database/models/User";
import { compare } from "../Utils/bcrypt";

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
