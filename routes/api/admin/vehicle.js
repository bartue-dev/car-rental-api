const { Router } = require("express");
const router = Router();
const vehicleCon = require("../../../controllers/api/vehicleController")

router.get("/", vehicleCon.addVehicle);

module.exports = router;