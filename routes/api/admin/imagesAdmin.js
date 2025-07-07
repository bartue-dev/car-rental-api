const { Router } = require("express");
const router = Router();
const imagesCon = require("../../../controllers/api/imagesController");
const {authByRoleAdmin} = require("../../../middleware/authByRole");
const multer = require("multer");

router.use(authByRoleAdmin);

const storage = multer.memoryStorage();

const upload = multer({storage: storage});

router.route("/vehicle/:vehicleId")
  .post(upload.array("file"), imagesCon.addImages)
  .get(imagesCon.getImagesByVehicle)
  .delete(imagesCon.deleteImagesByVehicle)

router.put("/:imageId/vehicle/:vehicleId", upload.array("file"), imagesCon.updateImage);

router.delete("/:imageId", imagesCon.deleteImage);

module.exports = router;
