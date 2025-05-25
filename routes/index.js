//auth
const registerRoute = require("./auth/register");
const loginRoute = require("./auth/login");
const refreshTokenRoute = require("./auth/refreshToken");
const logoutRoute = require("./auth/logout");


//api
const userTestimonialsRoute = require("./api/user/testimonialsUser");
const adminTestimonialsRoute = require("./api/admin/testimonialsAdmin");
const vehicleRoute = require("./api/admin/vehicle");

module.exports = {
  registerRoute,
  loginRoute,
  refreshTokenRoute,
  logoutRoute,
  userTestimonialsRoute,
  adminTestimonialsRoute,
  vehicleRoute
}
