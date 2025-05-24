const asyncHandler = require("express-async-handler");
const { testimonialsMethods } = require("../../db/api/testimonialsQueries");
const CustomErr = require("../../utils/customErr");

exports.createTestimonials = asyncHandler(async (req, res, next) => {
  const { content } = req.body;
  const { id } = req.user;

  if (!id) {
    const err = new CustomErr("Unauthorized", 401);
    next(err);
    return;
  }

  const createdTestimonials = await testimonialsMethods.createTestimonials(content, id);

  if (!createdTestimonials) {
    const err = new CustomErr("Connot create testimonials", 400);
    next(err);
    return;
  }

  res.status(201).json({
    status: "success",
    message: "Testimonial created successfully",
    data: {
      createdTestimonials
    }
  });
});

