const { prisma } = require("../prisma");

class Booking {
  async addBooking(bookingData) {
    return await prisma.bookings.create({
      data: bookingData
    });
  }

  async getBookingsByUser(accountId) {
    return await prisma.bookings.findUnique({
      where: {
        accountId: accountId
      }
    })
  }

  async gelAllBookings(){
    return await prisma.bookings.findMany();
  }

  async getBookingAdmin(bookingId) {
    return await prisma.bookings.findUnique({
      where: {
        bookingId: bookingId
      }
    });
  }

  async getBookingUser(bookingId, accountId) {
    return await prisma.bookings.findUnique({
      where: {
        bookingId: bookingId,
        accountId: accountId
      }
    });
  }

  async deleteBookingAdmin(bookingId) {
    await prisma.bookings.delete({
      where: {
        bookingId: bookingId
      }
    })
  }

  async deleteBookingUser(bookingId, accountId) {
    await prisma.bookings.delete({
      where: {
        bookingId: bookingId,
        accountId: accountId
      }
    })
  }

  async updateBookingAdmin(bookingId, bookingData) {
    return await prisma.bookings.update({
      where: {
        bookingId: bookingId
      },
      data: bookingData
    })
  }

  async updateBookingUser(bookingId, accountId, bookingData) {
    return await prisma.bookings.update({
      where: {
        bookingId: bookingId,
        accountId: accountId
      },
      data: bookingData
    })
  }
}

const bookingMethods = new Booking();

module.exports = {
  bookingMethods
}