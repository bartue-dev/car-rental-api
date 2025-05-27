const { Router } = require("express");
const router = Router();
const imagesCon = require("../../../controllers/api/imagesController");
const {authByRoleAdmin} = require("../../../middleware/authByRole");
const multer = require("multer");

router.use(authByRoleAdmin);

const storage = multer.memoryStorage();

const upload = multer({storage: storage});

router.post("/:vehicleId", upload.array("file"), imagesCon.addImages);

module.exports = router;
