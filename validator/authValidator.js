const { body, param } = require("express-validator");

const isEmptyMsg = "must not be empty";
const isLengthMsg = "must be atleast 4 characters or more";
const passwordLength = "must be atleast 8 characters or more";
const passwordContains = "must contains number, symbold and letters";
const role = ["USER", "ADMIN"];

const validateRegister = [
  body("username").trim()
    .notEmpty().withMessage(`Username ${isEmptyMsg}`)
    .isLength({min: 4}).withMessage(`Username ${isLengthMsg}`)
    .exists().withMessage("Username already exist"),
  body("password").trim()
    .notEmpty().withMessage(`Password ${isEmptyMsg}`)
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])[A-Za-z\d#?!@$%^&*-]{8,}$/).withMessage(`Password ${passwordLength} and ${passwordContains}`),
  body("role").trim()
    .isUppercase().withMessage("role must be uppercase")
    .custom(async value => {
      const user = role.includes(value)
      console.log(value)
      if (user){
        return true
      } else {
        throw new Error()
      }
    }).withMessage("role must be either USER or ADMIN")
]

const validateLogin = [
  body("username").trim()
    .notEmpty().withMessage(`Username ${isEmptyMsg}`),
  body("password").trim()
    .notEmpty().withMessage(`Password ${isEmptyMsg}`)
]

module.exports = {
  validateRegister,
  validateLogin
}