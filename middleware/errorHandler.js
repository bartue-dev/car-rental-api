require("dotenv").config();

//development err
const devErr = (res, err) => {
  res.status(err.statusCode).json({
    status: err.statusCode,
    message: err.message,
    stackTrace: err.stack,
    error: err
  });
}

//production err
const prodErr = (res, err) => {
  if (err.isOperation === true) {
    res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
      error: err
    });
  } else {
    res.status(500).json({
      status: 500,
      message: err.message,
      error: err
    });
  }
}

//err handler middleware
const errHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "err";

  if (process.env.NODE_ENV === "development") {
    devErr(res, err);
  } else if (process.env.NODE_ENV === "production") {
    prodErr(res, err);
  }
}

module.exports = errHandler;