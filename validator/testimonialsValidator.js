const {body, param} = require("express-validator");

const isEmptyMsg = "must not be empty";

const validateCreateTesmonials = [
  body("content").trim()
    .notEmpty().withMessage(`Content ${isEmptyMsg}`)
]

const validateDeleteTestimonial = [
  param("testimonialId").trim()
    .exists().withMessage("testimonailId not exist")
    .isUUID().withMessage("testimonialId must be a valid UUID")
]

const validateUpdateTestimonial = [
  param("testimonialId").trim()
    .exists().withMessage("testimonailId not exist")
    .isUUID().withMessage("testimonialId must be a valid UUID")
]

module.exports = {
  validateCreateTesmonials,
  validateDeleteTestimonial,
  validateUpdateTestimonial
}