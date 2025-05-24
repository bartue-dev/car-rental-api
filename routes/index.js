//auth
const registerRoute = require("./auth/register");
const loginRoute = require("./auth/login");
const refreshTokenRoute = require("./auth/refreshToken");
const logoutRoute = require("./auth/logout");


//api
const testimonialsRoute = require("./api/testimonials");
const vehicleRoute = require("./api/vehicle");

module.exports = {
  registerRoute,
  loginRoute,
  refreshTokenRoute,
  logoutRoute,
  testimonialsRoute,
  vehicleRoute
}
