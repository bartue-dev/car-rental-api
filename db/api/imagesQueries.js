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

  async getAllImages(vehicleId) {
    return await prisma.images.findMany({
      where: {
        vehicleId: vehicleId
      }
    })
  }

  async getImage(imageId) {
    return await prisma.images.findUnique({
      where: {
        imageId: imageId
      }
    })
  }

  async deleteImage(imageId) {
    await prisma.images.delete({
      where: {
        imageId: imageId
      }
    })
  }

  async deleteImagesByVehicle(vehicleId) {
    await prisma.images.deleteMany({
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