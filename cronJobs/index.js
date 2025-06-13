const cron = require("node-cron");
const { deleteExpiresToken } = require("./auth/refreshToken");

let flag = true;


const cronJobs = () => {
  
  cron.schedule(" 0 23 * * *", () => {
    // if else statement have a logic of if cronJob execute within the set time check the flag first
    // flag is true execute the deleteExpiresToken function otherwise change the value of flag to true
    // this means that the deleteExpiresToken function only run every other day
    if (flag) {
      deleteExpiresToken()
      flag = false;
    } else {
      flag = true
    }
  });

};

module.exports = {
  cronJobs
}


