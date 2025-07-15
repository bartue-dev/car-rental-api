const { Router } = require("express");
const router = Router();
const selectedTestimonialCon = require("../../../controllers/api/selectedTestimonialsController");
const {authByRoleAdmin} = require("../../../middleware/authByRole")

router.use(authByRoleAdmin);

router.route("/:testimonialId")
  .post(selectedTestimonialCon.selectTestimonial)
  .delete(selectedTestimonialCon.deleteSelectedTestimonial)

module.exports = router;