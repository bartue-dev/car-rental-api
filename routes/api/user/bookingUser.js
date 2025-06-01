const { Router } = require("express");
const router = Router();
const bookingCon = require("../../../controllers/api/bookingsController");
const {authByRoleUser} = require("../../../middleware/authByRole")

router.use(authByRoleUser);

router.route("/")
  .post(bookingCon.addBooking)
  .get(bookingCon.getBookingsByUser)

router.route("/:bookingId")
  .get(bookingCon.getBookingUser)
  .update(bookingCon.updateBookingUser)
  .delete(bookingCon.deleteBookingUser)



module.exports = router;
