//auth
const registerRouteUser = require("./auth/registerUser");
const registerRouteAdmin = require("./auth/registerAdmin");
const loginRoute = require("./auth/login");
const refreshTokenRoute = require("./auth/refreshToken");
const logoutRoute = require("./auth/logout");


//api
//user
const userTestimonialsRoute = require("./api/user/testimonialsUser");
const bookingRouteUser = require("./api/user/bookingUser");
const vehicleRouteUser = require("./api/user/vehicleUser");
const imagesRouteUser = require("./api/user/imagesUser");

//admin
const vehicleRouteAdmin = require("./api/admin/vehicleAdmin");
const imagesRouteAdmin = require("./api/admin/imagesAdmin");
const adminTestimonialsRoute = require("./api/admin/testimonialsAdmin");
const bookingRouteAdmin = require("./api/admin/bookingAdmin")

//pubic
const vehiclePublicRoute = require("./api/publicRoute/vehiclePublic");
const imagesPublicRoute = require("./api/publicRoute/imagesPublic")

module.exports = {
  registerRouteAdmin,
  registerRouteUser,
  loginRoute,
  refreshTokenRoute,
  logoutRoute,
  userTestimonialsRoute,
  adminTestimonialsRoute,
  vehicleRouteAdmin,
  imagesRouteAdmin,
  bookingRouteUser,
  bookingRouteAdmin,
  imagesRouteUser,
  vehicleRouteUser,
  vehiclePublicRoute,
  imagesPublicRoute
}
