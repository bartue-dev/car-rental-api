const { Router } = require("express");
const router = Router();
const selectedTestimonialCon = require("../../../controllers/api/selectedTestimonialsController");

router.route("/")
  .get(selectedTestimonialCon.getSelectedTestimonials)  
  

module.exports = router;