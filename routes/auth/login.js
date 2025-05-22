const { Router } = require("express");
const router = Router();
const loginCon = require("../../controllers/auth/login");

router.post("/", loginCon.login);

module.exports = router;