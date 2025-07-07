const {body, param} = require("express-validator");

const isEmptyMsg = "must not be empty";
const isAlpha = "must be characters only"
const isAlphaNum = "must contains character and numbers only"
const isNum = "must be numbers only"

const validationAddBooking = [
  body("firstName").trim()
    .notEmpty().withMessage(`First name ${isEmptyMsg}`),
  body("lastName").trim()
    .notEmpty().withMessage(`Last name ${isEmptyMsg}`)
    .isAlpha().withMessage(`Last name ${isAlpha}`),
  body("address").trim()
    .notEmpty().withMessage(`Address ${isEmptyMsg}`),
  body("phoneNumber").trim()
    .notEmpty().withMessage(`Phone number ${isEmptyMsg}`)
    .isMobilePhone("en-PH").withMessage("Invalid mobile number"),
  body("pickupDateTime").trim()
    .notEmpty().withMessage(`Pickup time ${isEmptyMsg}`),
  body("vehicleId").trim()
    .exists().withMessage("vehicleId doesn't exist")
    .isUUID().withMessage("vehicleId is not a valid UUID")
]

const validateBookingId = [
  param("bookingId").trim()
    .exists().withMessage("bookingId doesn't exist")
    .isUUID().withMessage("bookingId is not a valid UUID")
]

module.exports = {
  validationAddBooking,
  validateBookingId
}