const asyncHandler = require("express-async-handler");
const { testimonialsMethods } = require("../../db/api/testimonialsQueries");
const { validationResult } = require("express-validator")
const { validateCreateTesmonials, validateDeleteTestimonial, validateUpdateTestimonial } = require("../../validator/testimonialsValidator");
const CustomErr = require("../../utils/customErr");

// admin 
exports.getAllTestimonials = asyncHandler(async (req, res, next) => {
  const allTestimonials = await testimonialsMethods.getAllTestimonials();

  if(!allTestimonials) {
    const err = new CustomErr("Cannot retrive all testimonials", 400);
    next(err);
    return;
  }

  res.status(200).json({
    status: "success",
    message: "Testiminols retrive successfully",
    data: {
      allTestimonials
    }
  });
});

exports.getTestimonialAdmin = asyncHandler(async (req, res, next) => {
  const { testimonialId } = req.params;

  const testimonialDetails = await testimonialsMethods.getTestimonial(testimonialId);

  if (!testimonialDetails) {
    const err = new CustomErr("Cannot retrieve testimonial", 400)
    next(err);
    return
  }

  res.status(200).json({
    status: "Success",
    message: "Testimonial retrieve successfully",
    data: {
      testimonialDetails
    }
  });
});

exports.deleteTestimonials = [validateDeleteTestimonial, asyncHandler(async (req, res, next) => {
  const { testimonialId } = req.params;
  const validationErr = validationResult(req);

  // validation
  if(!validationErr.isEmpty()) {
    return res.status(400).json({
      status: "Failed",
      message: "Invalid testemonial Id",
      errors: validationErr.array()
    });
  }

  const deletedTestomoninal = await testimonialsMethods.deleteTestimonial(testimonialId);

  if (!deletedTestomoninal) {
    const err = new CustomErr("Cannot delete testimonial", 400);
    next(err);
    return;
  }

  res.status(204)
})];

exports.updateTestimonial = [validateUpdateTestimonial, asyncHandler(async (req, res, next) => {
  const { testimonialId } = req.params;
  const validationErr = validationResult(req);

  // validation
  if(!validationErr.isEmpty()) {
    const err = new CustomErr("Invalid testimonial id", 400);
    next(err);
    return;
  }

  const updatedTestimonial = await testimonialsMethods.updateTestimonial(testimonialId);

  if(!updatedTestimonial) {
    const err = new CustomErr("Cannot update testimonial", 400);
    next(err);
    return;
  }

  res.status(200).json({
    status: "success",
    message: "Testimonial updated successfully",
    data: {
      updatedTestimonial
    }
  });
})];

// user
exports.createTestimonials = [validateCreateTesmonials, asyncHandler(async (req, res, next) => {
  const { content } = req.body;
  const { id } = req.user;
  const validationErr = validationResult(req);

  if (!id) {
    const err = new CustomErr("Unauthorized", 401);
    next(err);
    return;
  }

  if (!validationErr.isEmpty()) {
    return res.status(400).json({
      status: "Failed",
      message: "Validation Error",
      errors: validationErr.array()
    })
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
})];

exports.getTestimonialUser = asyncHandler(async (req, res, next) => {
  const { testimonialId } = req.params;

  const testimonialDetails = await testimonialsMethods.getTestimonial(testimonialId);

  if (!testimonialDetails) {
    const err = new CustomErr("Cannot retrieve testimonial", 400)
    next(err);
    return
  }

  res.status(200).json({
    status: "Success",
    message: "Testimonial retrieve successfully",
    data: {
      testimonialDetails
    }
  });
});

exports.getTestimonialsByUser = asyncHandler(async (req, res, next) => {
  const { id } = req.user;

  const testimonialsDetails = await testimonialsMethods.getTestimonialsByUser(id);

  if (!testimonialsDetails) {
    const err = new CustomErr("Cannot retrieve testomials", 400);
    next(err);
    return;
  }

  res.status(200).json({
    status: "Success",
    message: "Testimonials retrieve successfully",
    data: {
      testimonialsDetails
    }
  })
});



