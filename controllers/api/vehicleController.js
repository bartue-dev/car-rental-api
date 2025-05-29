const asyncHandler = require("express-async-handler");
const { vehicleMethods} = require("../../db/api/vehicleQueries");
const { imagesMethods } = require("../../db/api/imagesQueries");
const { validationResult } = require("express-validator");
const { validateAddVehicle, validateGetVehicle, validateUpdateVehicle, validateDeleteVehicle } = require("../../validator/vehicleValidator");
const supabase = require("../../supabase/supabase");
const CustomErr = require("../../utils/customErr");

//admin
//add vehicle details
exports.addVehicle = [validateAddVehicle, asyncHandler(async (req, res, next) => {
  let { name, type, status, price } = req.body;
  const { id } = req.user;

  if (!id) {
    const err = new CustomErr("Unauthorized", 401);
    next(err);
    return;
  }

  // validation
  const validationErr = validationResult(req);
  if (!validationErr.isEmpty()) {
    return res.status(400).json({
      status: "Failed",
      message: "Validation Error",
      errors: validationErr.array()
    });
  }

  // save vehicle details to db
  const vehicleDetails = await vehicleMethods.addVehicle(
      name,
      type,
      status,
      Number(price),
      id
  );


res.status(200).json({
  status: "success",
  message: "Vehicle added successfully",
  data: {
    vehicleDetails
  }
});

})];

//retrieve all vehicle data
exports.getAllVehicle = asyncHandler(async (req, res, next) => {
  const allVehicle = await vehicleMethods.getAllVehicle();

  res.status(200).json({
    status: "success",
    message: "Vehicle details retreive successfully",
    data: {
      allVehicle
    }
  })
});

//retrieve specific vehicle data
exports.getVehicle = [validateGetVehicle, asyncHandler(async (req, res, next) => {
  const {vehicleId} = req.params;
  const validationErr = validationResult(req);

  if (!validationErr.isEmpty()) {
    return res.status(400).json({
      status: "Failed",
      message: "Validation Error",
      errors: validationErr.array()
    })
  }

  const vehicleDetails = await vehicleMethods.getVehicle(vehicleId);

  res.status(200).json({
    status: "success",
    message: "Vehicle data retrieve successfully",
    data: {
      vehicleDetails
    }
  });
})];

//update vehicle data
exports.updateVehicle = [validateUpdateVehicle, asyncHandler(async (req, res, next) => {
  const { name, type, status, price } = req.body;
  const { vehicleId } = req.params;
  const validationErr = validationResult(req);

  if (!validationErr.isEmpty()) {
    return res.status(400).json({
      status: "Failed",
      message: "Validation Error",
      errors: validationErr.array()
    })
  }

  await vehicleMethods.updateVehicle(vehicleId, name, type, status, Number(price));

  res.status(200).json({
    status: "Success",
    message: "Vehicle data updated successfully"
  })
})];

//delete vehicle data
exports.deleteVehicle = [validateDeleteVehicle, asyncHandler(async (req, res, next) => {
  const { vehicleId } = req.params;
  const validationErr = validationResult(req);

  if (!validationErr.isEmpty()) {
    return res.status(400).json({
      status: "Failed",
      message: "Validation Error",
      errors: validationErr.array()
    });
  }

  const images = await imagesMethods.getImagesByVehicle(vehicleId);

  // delete images from supabase and its folder
  for (const image of images) {
    const url = image.url.split("/public/images/");

    const filePath = url[1].replace(/%20/g, " ");

    const {data, error} = await supabase.storage
      .from("images")
      .remove([filePath]);

    console.log("data supbase delete", data)
    console.log("image url", url);
    console.log("filePath", filePath);

    if (error) {
      console.log("delete supabase error", error);
      const err = new CustomErr("Supabase error", 400);
      next(err);
      return
    }
  }

  await vehicleMethods.deleteVehicle(vehicleId);

  res.status(204).json({
    status: "success",
    message: "Vehicle data deleted successfully",
  })
})];



