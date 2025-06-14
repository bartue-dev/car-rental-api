const { Router } = require("express");
const router = Router();
const imagesCon = require("../../../controllers/api/imagesController");

router.route("/vehicle/:vehicleId")
  .get(imagesCon.getImagesByVehicle)

module.exports = router;
