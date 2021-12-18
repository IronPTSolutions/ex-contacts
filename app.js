require('dotenv').config();

const express = require("express");
const logger = require("morgan");
const mongoose = require('mongoose');
const createError = require('http-errors');

const app = express();

/** Configs */
require("./config/hbs.config");
require("./config/db.config");
const { session, loadUser } = require('./config/session.config');

app.set("views", `${__dirname}/views`);
app.set("view engine", "hbs");

/** Middlewares */
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(session);
app.use(loadUser);

const routes = require("./config/routes.config");
app.use("/", routes);

app.use((error, req, res, next) => {
  if (error instanceof mongoose.Error.CastError && error.message.includes('ObjectId')) {
    next(createError(404, 'Resource not found'));
  } else {
    next(error);
  }
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.info(`Application listen at port ${port}`));
