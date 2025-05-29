const asyncHandler = require("express-async-handler");
const supabase = require("../../supabase/supabase");
const { decode } = require("base64-arraybuffer");
const { imagesMethods } = require("../../db/api/imagesQueries");
const {validationResult} = require("express-validator");
const {validateAddImages, validateDeleteImage, validateVehicleId} = require("../../validator/imagesValidator")
const CustomErr = require("../../utils/customErr");

//add images
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
      message: "Validation Error",
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

//get all images by vehicle
exports.getImagesByVehicle = [validateVehicleId, asyncHandler(async (req, res, next) => {
  const { vehicleId } = req.params;
  const validationErr = validationResult(req);

  if (!validationErr.isEmpty()) {
    return res.status(400).json({
      status: "Failed",
      message: "Validation Error",
      errors: validationErr.array()
    });
  }

  const images = await imagesMethods.getAllImages(vehicleId);

  if (!images) {
    const err = new CustomErr("Cannot retrieve images", 400);
    next(err);
    return
  }

  res.status(200).json({
    status: "Success",
    message: "Images retrieve successfully",
    data: {
      images
    }
  })

})];

//delete images by vehicle
exports.deleteImagesByVehicle = [validateVehicleId, asyncHandler(async (req, res, next) => {
  const {vehicleId} = req.params;
  const validationErr = validationResult(req);

  if (!validationErr.isEmpty()) {
    return res.status(400).json({
      status: "Failed",
      message: "Validation Error",
      errors: validationErr.array()
    });
  }

  const imagesByVehicle = await imagesMethods.getImagesByVehicle(vehicleId);

  for (const image of imagesByVehicle) {
    
    const url = image.url.split("/public/images/");

    const filePath = url[1].replace(/%20/g, " ");

     //delete image in supabase storage
    const {data, error} = await supabase.storage
      .from("images")
      .remove([filePath]);

    if (error) {
      return res.status(400).json({
        status: "Failed",
        message: "Supabase error",
        errors: error
      });
    }
  }

  await imagesMethods.deleteImagesByVehicle(vehicleId);

  res.sendStatus(204)
})];

//delete specific image
exports.deleteImage = [validateDeleteImage, asyncHandler(async (req, res, next) => {
  const { imageId } = req.params;
  const validationErr = validationResult(req);

  if (!validationErr.isEmpty()) {
    return res.status(400).json({
      status: "Failed",
      message: "Validation Error",
      errors: validationErr.array()
    })
  }

  const image = await imagesMethods.getImage(imageId);

  console.log("Image:", image)

  const url = image.url.split("/public/images/");

  const filePath = url[1].replace(/%20/g, " ");

  //delete image in supabase storage
  const {data, error} = await supabase.storage
    .from("images")
    .remove([filePath])

  if (error) {
    return res.status(400).json({
      status: "Failed",
      message: "Supabase error",
      error: error
    });
  }

  await imagesMethods.deleteImage(imageId);

  res.sendStatus(204)
})];