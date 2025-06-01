const { Router } = require("express");
const router = Router();
const bookingCon = require("../../../controllers/api/bookingsController");
const {authByRoleAdmin} = require("../../../middleware/authByRole");

router.use(authByRoleAdmin)

router.route("/")
  .get(bookingCon.getAllBookings)

router.route("/:bookingId")
  .get(bookingCon.getBookingAdmin)
  .update(bookingCon.updateBookingAdmin)
  .delete(bookingCon.deleteBookingAdmin)



module.exports = router;
