const { Router } = require("express");
const router = Router();
const vehicleCon = require("../../../controllers/api/vehicleController");
const {authByRoleUser} = require("../../../middleware/authByRole")

router.use(authByRoleUser);

router.route("/")
  .get(vehicleCon.getAllVehicle)

router.route("/:vehicleId")
  .get(vehicleCon.getVehicle)
  .put(vehicleCon.updateVehicle)

module.exports = router;