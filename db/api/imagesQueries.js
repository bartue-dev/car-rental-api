const { prisma } = require("../prisma");

class Images {
  async addImages(name, imageUrl, type, vehicleId) {
    return await prisma.images.create({
      data: {
        name: name,
        url: imageUrl,
        type: type,
        vehicleId: vehicleId
      }
    });
  }

  async getImagesByVehicle(vehicleId) {
    return await prisma.images.findMany({
      where: {
        vehicleId: vehicleId
      }
    });
  }
}
const imagesMethods = new Images();

module.exports = {
  imagesMethods
}