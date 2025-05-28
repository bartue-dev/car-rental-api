const {body, param} = require("express-validator");

const isEmptyMsg = "must not be empty";

const validateAddVehicle = [
  body("name").trim()
    .notEmpty().withMessage(`Vehicle name ${isEmptyMsg}`)
    .isLength({ min: 4}).withMessage(`Name must be atleast 4 or more characters long`),
  body("type").trim()
    .notEmpty().withMessage(`Vehicle type ${isEmptyMsg}`),
  body("price").trim()
    .notEmpty().withMessage(`Vehicle price ${isEmptyMsg}`),
  body("status").trim()
  .notEmpty().withMessage(`Vehicle status ${isEmptyMsg}`)
  .custom(value => {
    if (value === "Available" || value === "Not Available") {
      return true
    } else {
      throw new Error();
    }
  }).withMessage(`Vehicle status must be iether Available or Not Available`),
]

const validateGetVehicle = [
  param("vehicleId")
    .exists().withMessage("VehicleId not exist")
    .isUUID().withMessage("VehicleId is not valid UUID")
]

const validateUpdateVehicle = [
  param("vehicleId")
    .exists().withMessage("VehicleId not exist")
    .isUUID().withMessage("VehicleId is not valid UUID"),
  body("name").trim()
    .notEmpty().withMessage(`Vehicle name ${isEmptyMsg}`)
    .isLength({ min: 4}).withMessage(`Name must be atleast 4 or more characters long`),
  body("type").trim()
    .notEmpty().withMessage(`Vehicle type ${isEmptyMsg}`),
  body("price").trim()
    .notEmpty().withMessage(`Vehicle price ${isEmptyMsg}`),
  body("status").trim()
  .notEmpty().withMessage(`Vehicle status ${isEmptyMsg}`)
  .custom(value => {
    if (value === "Available" || value === "Not Available") {
      return true
    } else {
      throw new Error();
    }
  }).withMessage(`Vehicle status must be iether Available or Not Available`),
  ]

const validateDeleteVehicle = [
  param("vehicleId")
    .exists().withMessage("VehicleId not exist")
    .isUUID().withMessage("VehicleId is not valid UUID"),
]

module.exports = {
  validateAddVehicle,
  validateGetVehicle,
  validateUpdateVehicle,
  validateDeleteVehicle
}