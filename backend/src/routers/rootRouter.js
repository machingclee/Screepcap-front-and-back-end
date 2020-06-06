import express from "express";
import { isLoggedIn } from "../middlewares/authMiddleware";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("../../public/index.html");
});
router.get("/success", (req, res) => {
  res.send("<h1>hahaha, this is the success page</h1>");
});

router.get("/protected", isLoggedIn, (req, res) => {
  res.send("You logged in.");
});

router.get("/failure", (req, res) => {
  res.send("<h1>hahaha, this is the failure page</h1>");
});

router.get("/profile", (req, res) => {
  console.log("want to see profile", req.user);
  console.log(req.session);
  res.json(req.user);
});

router.get("/getToken", (req, res) => {
  const payload = {
    id: 2,
    username: "cclee"
  };

  // const token = jwt.sign(payload, process.env.PRIVATE_KEY);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJjY2xlZSIsImlhdCI6MTU5MTQzMjI1NX0.B2EFfoLF3MDjkybzrtuMiSRZxkfZ4qBAwrz0x9AGCUE";

  jwt.verify(token, process.env.PRIVATE_KEY, (err, payload) => {
    if (!err) {
      res.json(payload);
    } else {
      res.json({ message: "incorrect token" });
    }
  });
});

export default router;
