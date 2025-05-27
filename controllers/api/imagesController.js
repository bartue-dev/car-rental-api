const asyncHandler = require("express-async-handler");
const supabase = require("../../supabase/supabase");
const { decode } = require("base64-arraybuffer");
const { imagesMethods } = require("../../db/api/imagesQueries");
const {validationResult} = require("express-validator");
const {validateAddImages} = require("../../validator/imagesValidator")
const CustomErr = require("../../utils/customErr");

exports.addImages = [validateAddImages, asyncHandler(async (req, res, next) => {
  const files = req.files;
  const { id } = req.user;
  const { vehicleId } = req.params;
  const validationErr = validationResult(req);

  if (!id) {
    const err = new CustomErr("Unauthorized", 401);
    next(err);
    return;
  }

  // validation
  if (!validationErr.isEmpty()) {
    return res.status(400).json({
      status: "Failed",
      message: "Invalid file",
      errors: validationErr.array()
    })
  }


  for (const file of files) {
    const filePath = `${id}/${file.originalname}`;
    const fileBase64 = decode(file.buffer.toString("base64"));

    const { data, error } = await supabase.storage
      .from("images")
      .upload(filePath, fileBase64, {
        contentType: file.mimetype
      });

    if (error) {
      return res.status(400).json({
        status: "Failed",
        message: "Supabase error",
        errors: error
      });
    }

    const {data: image} = supabase.storage
      .from("images")
      .getPublicUrl(filePath)

    const imageUrl = image.publicUrl;

    await imagesMethods.addImages(file.originalname, imageUrl, file.mimetype, vehicleId);
  }

  const imageDetails = await imagesMethods.getImagesByVehicle(vehicleId)

  res.status(200).json({
    status: "success",
    message: "Images added successfully",
    data: {
      imageDetails
    }
  });

})];