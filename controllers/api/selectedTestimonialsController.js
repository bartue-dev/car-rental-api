const asyncHandler = require("express-async-handler");
const { selectedTestimonialsMethods } = require("../../db/api/selectedTestmonialQueries")
const { validationResult } = require("express-validator")
const { validateSelectedTestimonial } = require("../../validator/selectedTestimonialsValidator");
const CustomErr = require("../../utils/customErr");

//admin
exports.selectTestimonial = [validateSelectedTestimonial ,asyncHandler(async (req, res, next) => {
  const {testimonialId} = req.params;
  const validationErr = validationResult(req);

  if (!validationErr.isEmpty()) {
    return res.status(400).json({
      status: "Failed",
      message: "Validation Error",
      errors: validationErr.array()
    })
  }

  const selectedTestimonial = await selectedTestimonialsMethods.selectTestimonial(testimonialId);

  if (!selectedTestimonial) {
    const err = new CustomErr("Cannot select the selected testimonial", 400)
    next(err);
    return
  }

  res.status(200).json({
    status: "success",
    message: "testimonial selelected"
  })
})]

exports.deleteSelectedTestimonial = asyncHandler(async (req, res, next) => {
  const { testimonialId } = req.params;

  console.log("DELETE SELECTED TESTIMONIAL:", testimonialId)

  await selectedTestimonialsMethods.deleteSelectedTestimonial(testimonialId);

  res.sendStatus(204);
})

//public
exports.getSelectedTestimonials = asyncHandler(async (req, res, next) => {
  const selectedTestimonials = await selectedTestimonialsMethods.getSelectedTestimonials();

  res.status(200).json({
    status: "success",
    message: "selected testiomnials retrieve successfully",
    data: {
      selectedTestimonials
    }
  })
})

