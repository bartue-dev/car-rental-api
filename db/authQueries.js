const { prisma } = require("./prisma");

class Account {
  async createAccount(username, password, role) {
    return await prisma.account.create({
      data: {
        username: username,
        password: password,
        user: {
          create: {
            username: username,
            role: role
            //accountId will be create automatically in user model
          }
        }
      },
      include: {
        user: true
      }
    })
  }

  async currentAccountByUsername(username) {
    return await prisma.account.findUnique({
      where: {
        username: username
      }
    });
  }
}

class RefreshToken {
  async saveRefreshToken(accountId, token, date) {
    return await prisma.refreshToken.create({
      data: {
        accountId: accountId,
        refreshToken: token,
        expiresAt: date
      }
    });
  }

  async currentAccountByToken(refreshToken) {
    return await prisma.refreshToken.findFirst({
      where: {
        refreshToken: refreshToken
      }
    });
  }

  async deleteRefreshToken(accountId) {
    return await prisma.refreshToken.deleteMany({
      where: {
        accountId: accountId
      }
    });
  }
}

class User {
  async getUser(accountId) {
    return await prisma.user.findUnique({
      where: {
        accountId: accountId
      }
    })
  }
}


const accountMethods = new Account();
const refreshTokenMethods = new RefreshToken();
const userMethods = new User();

module.exports = {
  accountMethods,
  refreshTokenMethods,
  userMethods
}