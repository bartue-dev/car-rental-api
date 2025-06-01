const { Router } = require("express");
const router = Router();
const testimonialsCon = require("../../../controllers/api/testimonialsController");
const {authByRoleAdmin} = require("../../../middleware/authByRole")

router.use(authByRoleAdmin);

router.get("/", testimonialsCon.getAllTestimonials);

router.route("/:testimonialId")
  .update(testimonialsCon.updateTestimonial)
  .delete(testimonialsCon.deleteTestimonials)

module.exports = router;