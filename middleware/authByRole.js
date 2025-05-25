const { userMethods } = require("../db/authQueries");
const CustomErr = require("../utils/customErr");

const authByRoleAdmin = async (req, res, next) => {
  const { id } = req.user;

  const currentUser = await userMethods.getUser(id);

  if(!currentUser) {
    const err = new CustomErr("User not found", 404);
    next(err);
    return
  }

  if (currentUser.role !== "ADMIN") {
    return res.status(401).json({
      status: "Failed",
      message: "Unauthorized user, Admin only",
    })
  }
  
  next()

}


const authByRoleUser = async (req, res, next) => {
  const { id } = req.user;

  const currentUser = await userMethods.getUser(id);

  if(!currentUser) {
    const err = new CustomErr("User not found", 404);
    next(err);
    return
  }

  if (currentUser.role !== "USER") {
    return res.status(401).json({
      status: "Failed",
      message: "Unauthorized user",
    })
  }
  
  next()
}

module.exports = {
  authByRoleAdmin,
  authByRoleUser
};