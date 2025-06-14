const { Router } = require("express");
const router = Router();
const testimonialsCon = require("../../../controllers/api/testimonialsController");
const { authByRoleUser } = require("../../../middleware/authByRole")

router.use(authByRoleUser);

router.route("/")
  .post(testimonialsCon.createTestimonials)
  .get(testimonialsCon.getTestimonialsByUser)

router.get("/:testimonailId", testimonialsCon.getTestimonialUser)

module.exports = router;