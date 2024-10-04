import express from "express";
import path from "path";
import session from "express-session";
import mongoSession from "connect-mongodb-session";
import { config } from "dotenv";
import dbConnection from "./src/db/dbConnection.js";

import homRouter from "./src/modules/home/routes.js";

import registerRouter from "./src/modules/register/routes.js";
import loginRouter from "./src/modules/login/routes.js";
import resumeRouter from "./src/modules/resume/routes.js";
import logoutRouter from "./src/modules/logout/routes.js";

import forgetRouter from "./src/modules/forgetPassword/routes.js";

import profileRouter from "./src/modules/profile/routes.js";
config();

const app = express();
const MongoDBStore = mongoSession(session);
const store = new MongoDBStore({
  uri: process.env.MONGO_ATLAS_URI,
  collection: "sessions",
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "public")));

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store,
  })
);

app.get("/", homRouter);
app.use(registerRouter);

app.use(loginRouter);
app.use(resumeRouter);
app.use(logoutRouter);
app.use(forgetRouter);
app.use(profileRouter);
app.use("*", (req, res, next) => {
  res.render("notFound.ejs");
});

dbConnection();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server up and running on port ${port}`));
