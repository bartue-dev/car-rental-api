const { Router } = require("express");
const router = Router();
const imagesCon = require("../../../controllers/api/imagesController");
const {authByRoleUser} = require("../../../middleware/authByRole");

router.use(authByRoleUser);

router.route("/vehicle/:vehicleId")
  .get(imagesCon.getImagesByVehicle)


module.exports = router;
