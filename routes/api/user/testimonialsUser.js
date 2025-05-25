const { Router } = require("express");
const router = Router();
const testimonialsCon = require("../../../controllers/api/testimonialsController");
const { authByRoleUser } = require("../../../middleware/authByRole")

router.use(authByRoleUser);

router.post("/", testimonialsCon.createTestimonials);

router.route("/:testimonialId")
  .put(testimonialsCon.updateTestimonial)

module.exports = router;