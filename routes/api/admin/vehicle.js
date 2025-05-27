const { Router } = require("express");
const router = Router();
const vehicleCon = require("../../../controllers/api/vehicleController");
const {authByRoleAdmin} = require("../../../middleware/authByRole")

router.use(authByRoleAdmin);

router.post("/", vehicleCon.addVehicle);

module.exports = router;