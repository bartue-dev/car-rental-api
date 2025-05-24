const asyncHandler = require("express-async-handler");


exports.addVehicle = asyncHandler(async (req, res, next) => {
  

  res.status(200).json({
    message: "TESTING!"
  })
})