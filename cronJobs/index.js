const cron = require("node-cron");
const { deleteExpiresToken } = require("./auth/refreshToken");

const cronJobs = () => {
  // delete expires refresh token every 12 midnight
  cron.schedule("* 24 * * *", deleteExpiresToken);

};

module.exports = {
  cronJobs
}


