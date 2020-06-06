import passport from "../../passport";
import messages from "../enums/messages";

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  else res.json({ message: messages.notAuthenticated });
};

export { isLoggedIn };
