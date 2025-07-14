const {param} = require("express-validator");

const validateSelectedTestimonial = [
    param("testimonialId").trim()
    .exists().withMessage("testimonailId not exist")
    .isUUID().withMessage("testimonialId must be a valid UUID")
]

module.exports = {
  validateSelectedTestimonial
}