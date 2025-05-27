const asyncHandler = require("express-async-handler");
const { vehicleMethods} = require("../../db/api/vehicleQueries");
const { validationResult } = require("express-validator");
const { validateAddVehicle } = require("../../validator/vehicleValidator")
const CustomErr = require("../../utils/customErr");

//admin
exports.addVehicle = [validateAddVehicle, asyncHandler(async (req, res, next) => {
  let { name, type, status, price } = req.body;
  const { id } = req.user;

  if (!id) {
    const err = new CustomErr("Unauthorized", 401);
    next(err);
    return;
  }

  if (!files) {
    const err = new CustomErr("Invalid file", 400);
    next(err);
    return
  }

  // validation
  const validationErr = validationResult(req);
  if (!validationErr.isEmpty()) {
    return res.status(400).json({
      status: "Failed",
      message: "Adding a vehicle failed",
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
