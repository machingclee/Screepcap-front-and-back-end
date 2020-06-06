import express from "express";
import screencapRouter from "./src/routers/screencapRouter";
import authRouter from "./src/routers/authRouter";
import rootRouter from "./src/routers/rootRouter";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";

import "./passport";

const app = express();
const port = 3000;
const FileStore = require("session-file-store")(session);

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb", extended: true }));

app.use(
  session({
    store: new FileStore(),
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    maxAge: 365 * 24 * 60 * 60 * 1000
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", rootRouter);
app.use("/auth", authRouter);
app.use("/screencap", screencapRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
