require("dotenv").config();
const express = require("express");
const credentials = require("./middleware/credentails");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
const CustomErr = require("./utils/customErr");

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("Uncaught Exception occured!, shutting down");

  process.exit(1);
});

const app = express();

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

//routes
app.get("/", (req, res) => {
  res.send("HELLO NODE JS!")
});

app.all(/(.*)/, (req, res, next) => {
  const err = new CustomErr(`Can't find ${req.originalUrl} on the server`, 404)
  next(err);
});

app.use(errorHandler);

const PORT = process.env.PORT || 3500
const server = app.listen(PORT, () => {
  console.log(`Server listening to PORT ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled rejection occured!, shutting down");
  
  server.close(() => {
    process.exit(1);
  });
});

