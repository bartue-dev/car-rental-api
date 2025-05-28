require("dotenv").config();
const express = require("express");
const credentials = require("./middleware/credentials")
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
const CustomErr = require("./utils/customErr");
const {cronJobs} = require("./cronJobs")
const router = require("./routes");
const verifyJwt  = require("./middleware/verifyJwt");
const authByRole = require("./middleware/authByRole");

//handles syncchronous error. Ex. undifined variable or function
//it should shut down the app because the server already crashed
//it should invoke before the app express() to make sure it work
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("Uncaught Exception occured!, shutting down");

  process.exit(1);
});

const app = express();

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// middleware json
app.use(express.json());

// other body request
app.use(express.urlencoded({extended: true}))

// middleware for cookies
app.use(cookieParser());

//auth routes
app.use("/v1/register", router.registerRoute);
app.use("/v1/login", router.loginRoute);
app.use("/v1/refreshToken", router.refreshTokenRoute);
app.use("/v1/logout", router.logoutRoute);

//api routes
app.use(verifyJwt);
app.use("/v1/vehicle", router.vehicleRoute);
app.use("/v1/images", router.imagesRoute);
app.use("/v1/testimonials-admin", router.adminTestimonialsRoute);
app.use("/v1/testimonials", router.userTestimonialsRoute);

//cron jobs
cronJobs();

//default route
//handles error if the the url cannot find
app.all(/(.*)/, (req, res, next) => {
  const err = new CustomErr(`Can't find ${req.originalUrl} on the server`, 404)
  next(err);
});

//errorHandler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3500
const server = app.listen(PORT, () => {
  console.log(`Server listening to PORT ${PORT}`);
});


//handle rejection promise, if no catch block to a promise
//it should shut down the app because the server already crashed
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled rejection occured!, shutting down");
  
  server.close(() => {
    process.exit(1);
  });
});

/* 
  process.exit( code )
  Code: It can be either 0 or 1. 
  0 means end the process without any kind of failure and 
  1 means end the process with some failure.
*/