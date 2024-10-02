import path from "path";
import express from "express";
import { fileURLToPath } from "url";
import session from "express-session";
import mongoSession from "connect-mongodb-session";
import { config } from "dotenv";
import dbConnection from "./src/db/dbConnection.js";

import homRouter from "./src/modules/home/routes.js";

import registerRouter from "./src/modules/register/routes.js";
import loginRouter from "./src/modules/login/routes.js";
import resumeRouter from "./src/modules/resume/routes.js";
import logoutRouter from "./src/modules/logout/routes.js";
config();

const app = express();
const MongoDBStore = mongoSession(session);
const store = new MongoDBStore({
  uri: process.env.DB_URI,
  collection: "sessions",
});

// Get the __dirname equivalent in ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store,
  })
);

app.use(homRouter);
app.use(registerRouter);

app.use(loginRouter);
app.use(resumeRouter);
app.use(logoutRouter);
app.use("*", (req, res) => {
  res.render("notFound.ejs");
});

dbConnection();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server up and running on port ${port}`));
