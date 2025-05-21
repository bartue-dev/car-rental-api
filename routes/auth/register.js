const { Router, application } = require("express")
const router = Router();
const registerCon = require("../../controllers/auth/register");

router.post("/", registerCon.register);

module.exports = router;