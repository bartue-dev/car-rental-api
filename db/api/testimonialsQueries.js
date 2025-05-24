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
}

const testimonialsMethods = new Testimonials();

module.exports = {
  testimonialsMethods
}