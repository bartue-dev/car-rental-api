const { Router } = require("express")
const router = Router();
const registerCon = require("../../controllers/auth/register");

router.route("/")
  .post(registerCon.registerUser)

module.exports = router;