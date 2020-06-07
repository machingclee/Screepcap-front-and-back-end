import jwt from "jsonwebtoken";

export default function issueJWT(user) {
  const payload = { id: user.id };
  const expiresIn = process.env.TOKEN_EXPIRE_IN;
  const token = jwt.sign(payload, process.env.PRIVATE_KEY, {
    expiresIn: expiresIn
  });
  return token;
}
