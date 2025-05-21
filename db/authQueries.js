const { prisma } = require("./prisma");

class Account {
  async createAccount(username, password) {
    return await prisma.account.create({
      data: {
        username: username,
        password: password,
        user: {
          create: {
            username: username
            //accountId will be create automatically in user model
          }
        }
      },
      include: {
        user: true
      }
    })
  }
}

const accountMethods = new Account();

module.exports = {
  accountMethods
}