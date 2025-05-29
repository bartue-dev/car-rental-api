const {body, param} = require("express-validator");


const validateAddImages = [
  body("file")
    .custom((value, {req}) => {
    const imgTypes = /\/(gif|jpe?g|tiff?|png|webp|bmp)$/i;
    for (const file of req.files) {
      if (imgTypes.test(file.mimetype)) {
      return true;
      } else {
        throw new Error();
      }
    }
  }).withMessage("Invalid image type")
]

const validateVehicleId = [
  param("vehicleId")
    .exists().withMessage("vehicleId not exist")
    .isUUID().withMessage("vehicleId is not a valid UUID")
]

const validateDeleteImage = [
  param("imageId")
    .exists().withMessage("imageId not exist")
    .isUUID().withMessage("imageId is not a valid UUID")
]


module.exports = {
  validateAddImages,
  validateVehicleId,
  validateDeleteImage
}