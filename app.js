const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
dotenv.config();

// ROUTES
const indexRouter = require("./routes/index");
const musicRouter = require("./routes/music");
// EXPRESS INIT
const app = express();

// MONGODB CONNECTIONS
const db = require("./helpers/mongodb")();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// MIDDLEWARES
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/music", musicRouter);

// CATCH 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// ERROR HANDLER
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: { message: err.message, status: err.status } });
});

module.exports = app;
