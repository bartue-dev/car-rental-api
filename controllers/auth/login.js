require("dotenv").config();
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { accountMethods, refreshTokenMethods } = require("../../db/authQueries");
const { validationResult } = require("express-validator");
const { validateLogin } = require("../../validator/authValidator");
const CustomErr = require("../../utils/customErr");


exports.login = [validateLogin, asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  const validationErr = validationResult(req);

  //validation
  if (!validationErr.isEmpty()) {
    return res.status(400).json({
      status: "Failed",
      message: "Log in failed",
      errors: validationErr.array()
    });
  }

  const currentAccountByUsername = await accountMethods.currentAccountByUsername(username);

  if (!currentAccountByUsername) {
    const err = new CustomErr(`Incorrect username`, 400);
    next(err);
    return;
  }

  const passwordMatch = await bcrypt.compare(password, currentAccountByUsername.password);

  if (!passwordMatch) {
    const err = new CustomErr(`Incorrect password`, 400);
    next(err);
    return
  } else {
    // create jwt

    // access token
    const accessToken = jwt.sign(
      {
        "id": currentAccountByUsername.accountId,
        "username": currentAccountByUsername.username
      },
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: "30min"}
    );

    // refresh token
    const refreshToken = jwt.sign(
      {
        "id": currentAccountByUsername.accountId,
        "username": currentAccountByUsername.username
      },
      process.env.REFRESH_TOKEN_SECRET,
      {expiresIn: "1d"}
    );

    // save refresh token to db
    const now = new Date();
    const saveToken = await refreshTokenMethods.saveRefreshToken(currentAccountByUsername.accountId, refreshToken, now)

    if (!saveToken) {
      const err = new CustomErr(`Error on saving token on db`, 400);
      next(err);
      return;
    }

    // save refreshToken to cookie httpOnly
    res.cookie(
      "jwt",
      refreshToken,
      {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000 // 2 days
      }
    );

    res.status(200).json({
      status: "success",
      message: "Log in successfully",
      accessToken: accessToken
    });  
  }
})];