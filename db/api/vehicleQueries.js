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

  async getAllVehiclePagination(skip, take) {
    return await prisma.vehicle.findMany({
      skip: +skip,
      take: +take,
      include: {
        images: true
      }
    });
  }

   async getAllVehicle() {
    return await prisma.vehicle.findMany({
      include: {
        images: true
      }
    });
  }

  async vehicleCount() {
    return await prisma.vehicle.count();
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
    return await prisma.vehicle.update({
      where: {
        vehicleId: vehicleId
      },
      data: {
        name: name,
        type: type,
        status: status,
        price: price
      },
      include: {
        images: true
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