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

  async getAllVehicle() {
    return await prisma.vehicle.findMany({
      include: {
        images: true
      }
    });
  }

  async getVehicle(vehicleId) {
    return await prisma.vehicle.findUnique({
      where: {
        vehicleId: vehicleId
      },
      include: {
        images: true
      }
    });
  }

  async updateVehicle(vehicleId, name, type, status, price) {
    await prisma.vehicle.update({
      where: {
        vehicleId: vehicleId
      },
      data: {
        name: name,
        type: type,
        status: status,
        price: price
      }
    });
  }

  async deleteVehicle(vehicleId) {
    await prisma.vehicle.delete({
      where: {
        vehicleId
      }
    });
  }
}

const vehicleMethods = new Vehicle();

module.exports = {
  vehicleMethods,
}