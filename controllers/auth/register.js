const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { validateRegister } = require("../../validator/authValidator");
const { validationResult } = require("express-validator")
const { accountMethods } = require("../../db/authQueries");
const CustomErr = require("../../utils/customErr");

exports.register = [validateRegister ,asyncHandler(async (req, res, next) => {
  let { username, password, role } = req.body;
  const validationErr = validationResult(req);

  //validation
  if (!validationErr.isEmpty()) {
    return res.status(400).json({
      message: "Registration failed",
      errors: validationErr.array()
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const createdAccount = await accountMethods.createAccount(username, hashPassword, role);

  if (!createdAccount) {
    const err = new CustomErr(`Cannot create an account`, 400);
    next(err)
    return;
  }

  res.status(201).json({
    status: "success",
    message: "Account registered successfully",
    account: createdAccount
  })
})];