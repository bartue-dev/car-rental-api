const { prisma } = require("../prisma");

class Vehicle {
  async addVehicle(name, type, status, price, accountId, imageUrl) {
    return await prisma.vehicle.create({
      data: {
        name: name,
        type: type,
        status: status,
        price: price,
        accountId: accountId
      },
      include: {
        images: true
      }
    })
  }
}

const vehicleMethods = new Vehicle();

module.exports = {
  vehicleMethods,
}