const { Router } = require("express");
const router = Router();
const vehicleCon = require("../../../controllers/api/vehicleController");
const {authByRoleAdmin} = require("../../../middleware/authByRole")

router.use(authByRoleAdmin);

router.route("/")
  .post(vehicleCon.addVehicle)
  .get(vehicleCon.getAllVehicle)

router.route("/:vehicleId")
  .get(vehicleCon.getVehicle)
  .put(vehicleCon.updateVehicle)
  .delete(vehicleCon.deleteVehicle)

module.exports = router;