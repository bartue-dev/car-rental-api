const {prisma} = require("../prisma");

class Testimonials {
  async createTestimonials(content, accountId) {
    return await prisma.testimonials.create({
      data: {
        content: content,
        accountId: accountId
      }
    })
  }

  async getAllTestimonials() {
    return await prisma.testimonials.findMany({
      include: {
        user: true
      }
    })
  }

  async testimonialsCount() {
    return await prisma.testimonials.count();
  }

  async getTestimonial(testimonialId) {
    return await prisma.testimonials.findUnique({
      where: {
        testimonialId: testimonialId
      }
    })
  }

  async getTestimonialsByUser(accountId) {
    return await prisma.testimonials.findMany({
      where: {
        accountId: accountId
      }
    })
  }

  async deleteTestimonial(testimonialId) {
    return await prisma.testimonials.delete({
      where: {
        testimonialId: testimonialId
      }
    });
  }

  async updateTestimonial(testimonailId) {
    return await prisma.testimonials.update({
      where: {
        testimonialId: testimonailId
      }
    })
  }
}

const testimonialsMethods = new Testimonials();

module.exports = {
  testimonialsMethods
}