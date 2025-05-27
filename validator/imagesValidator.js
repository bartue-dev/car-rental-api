const {body} = require("express-validator");


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


module.exports = {
  validateAddImages
}