const { Router } = require("express");
const router = Router();
const testimonialsCon = require("../../controllers/api/testimonialsController");

router.post("/", testimonialsCon.createTestimonials);

module.exports = router;