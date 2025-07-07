const asyncHandler = require("express-async-handler");
const {bookingMethods} = require("../../db/api/bookingQueries");
const {validationResult} = require("express-validator");
const {validationAddBooking, validateBookingId} = require("../../validator/bookingValidator");
const CustomErr = require("../../utils/customErr");

//USER
//add booking (also use in admin route)
exports.addBooking = [validationAddBooking, asyncHandler(async (req, res, next) => {
  const {
      firstName,
      lastName, 
      address, 
      phoneNumber, 
      pickupDateTime,
      vehicleId
    } = req.body;
  const { id } = req.user;
  const validationErr = validationResult(req);

  //validation
  if (!validationErr.isEmpty()) {
    return res.status(400).json({
      status: "Failed",
      message: "Validation Error",
      errors: validationErr.array()
    });
  }

  const bookingDetails = await bookingMethods.addBooking({
    firstName: firstName,
    lastName: lastName,
    address: address,
    phoneNumber: phoneNumber,
    pickupDateTime: pickupDateTime,
    accountId: id,
    vehicleId: vehicleId
  });

  if (!bookingDetails) {
    const err = new CustomErr("Cannot add booking details", 400);
    next(err);
    return;
  }

  res.status(200).json({
    status: "success",
    message: "Booking added successfully",
    data: {
      bookingDetails
    }
  })

})];

//get all booking by user
exports.getBookingsByUser = asyncHandler(async (req, res, next) => {
  const { id } = req.user;

  const bookingsDetails = await bookingMethods.getBookingsByUser(id);

  if (!bookingsDetails) {
    const err = new CustomErr("Cannot retrieve booking details", 400);
    next(err);
    return;
  }

  res.status(200).json({
    status: "Success",
    message: "Booking details retrieve successfully",
    data: {
      bookingsDetails
    }
  })
});

//get specific booking 
exports.getBookingUser = [validateBookingId, asyncHandler(async (req, res, next) => {
  const {bookingId} = req.params;
  const {id} = req.user;
  const validationErr = validationResult(req);

  if (!validationErr.isEmpty()) {
    return res.status(400).json({
      status: "Failed",
      message: "Validation Err",
      errors: validationErr.array()
    })
  }

  const bookingDetails = await bookingMethods.getBookingUser(bookingId, id);

  if (!bookingDetails) {
    const err = new CustomErr("Cannot retrieve booking", 400) 
    next(err);
    return;
  }

  res.status(200).json({
    status: "Success",
    message: "Booking retrieve successfully",
    data: {
      bookingDetails
    }
  });
})];

//update specific booking
exports.updateBookingUser = asyncHandler(async (req, res, next) => {
  const {bookingId} = req.params;
  const {id} = req.user;
  const {
      firstName,
      lastName, 
      address, 
      phoneNumber, 
      pickupDateTime,
    } = req.body;

  const updatedBookingDetails = await bookingMethods.updateBookingUser(bookingId, id, {
    firstName: firstName,
    lastName: lastName,
    address: address,
    phoneNumber: phoneNumber,
    pickupDateTime: pickupDateTime,
  });


  if (!updatedBookingDetails) {
    const err = new CustomErr("Cannot update booking details", 400);
    next(err);
    return;
  }

  res.status(200).json({
    status: "Success",
    message: "Booking Updated Successfully",
    data: {
      updatedBookingDetails
    }
  })
});

exports.deleteBookingUser = [validateBookingId, asyncHandler(async (req, res, next) => {
  const { bookingId } = req.params;
  const {id} = req.user;
  const validationErr = validationResult(req);

  if (!validationErr.isEmpty()) {
    return res.status(400).json({
      status: "Failed",
      message: "Validation Error",
      errors: validationErr.array()
    })
  }

  await bookingMethods.deleteBookingUser(bookingId, id);

  res.sendStatus(204)
})];

//ADMIN
//get all bookings
exports.getAllBookings = asyncHandler(async (req, res, next) => {
  const bookingsDetails = await bookingMethods.gelAllBookings();
  const totalItems = await bookingMethods.bookingsCount();

  if (!bookingsDetails) {
    const err = new CustomErr("Cannot retrieve all bookings", 400);
    next(err);
    return;
  }

  res.status(200).json({
    status: "Success",
    message: "Bookings retrieve successfully",
    data: {
      bookingsDetails,
      totalItems
    }
  });
});

//get specific booking 
exports.getBookingAdmin = [validateBookingId, asyncHandler(async (req, res, next) => {
  const {bookingId} = req.params;
  const validationErr = validationResult(req);

  if (!validationErr.isEmpty()) {
    return res.status(400).json({
      status: "Failed",
      message: "Validation Err",
      errors: validationErr.array()
    })
  }

  const bookingDetails = await bookingMethods.getBookingAdmin(bookingId);

  if (!bookingDetails) {
    const err = new CustomErr("Cannot retrieve booking", 400) 
    next(err);
    return;
  }

  res.status(200).json({
    status: "Success",
    message: "Booking retrieve successfully",
    data: {
      bookingDetails
    }
  });
})];

//update specific booking
exports.updateBookingAdmin = asyncHandler(async (req, res, next) => {
  const {bookingId} = req.params;
  const {
      firstName,
      lastName, 
      address, 
      phoneNumber, 
      pickupDateTime,
      status,
      vehicleId
    } = req.body;

  const updatedBookingDetails = await bookingMethods.updateBookingAdmin(bookingId, {
    firstName: firstName,
    lastName: lastName,
    address: address,
    phoneNumber: phoneNumber,
    pickupDateTime: pickupDateTime,
    status: status,
    vehicleId: vehicleId
  });


  if (!updatedBookingDetails) {
    const err = new CustomErr("Cannot update booking details", 400);
    next(err);
    return;
  }

  res.status(200).json({
    status: "Success",
    message: "Booking Updated Successfully",
    data: {
      updatedBookingDetails
    }
  })
});

//delete booking
exports.deleteBookingAdmin = [validateBookingId, asyncHandler(async (req, res, next) => {
  const { bookingId } = req.params;
  const validationErr = validationResult(req);

  if (!validationErr.isEmpty()) {
    return res.status(400).json({
      status: "Failed",
      message: "Validation Error",
      errors: validationErr.array()
    })
  }

  await bookingMethods.deleteBookingAdmin(bookingId);

  res.sendStatus(204)
})];


