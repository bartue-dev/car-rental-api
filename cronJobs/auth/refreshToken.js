const { prisma } = require("../../db/prisma");

const deleteExpiresToken = async() => {
  await prisma.refreshToken.deleteMany({
    where: {
      expiresAt: {
        lt: new Date()
      }
    }
  })
};

module.exports = {
  deleteExpiresToken
}