const expressSession = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const User = require("../models/user.model");
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/ex-contacts";

const session = expressSession({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: {
    httpOnly: true,
    secure: process.env.SESSION_SECURE === "true",
  },
  store: new MongoStore({
    mongoUrl: MONGODB_URI,
    ttl: 3600 * 24 * 7,
  }),
});

module.exports.session = session;
module.exports.loadUser = (req, res, next) => {
  const { userId } = req.session;
  if (userId) {
    User.findById(userId)
      .then((user) => {
        req.user = user;
        res.locals.currentUser = user;

        next();
      })
      .catch((error) => next(error));
  } else {
    next();
  }
};
