const {prisma} = require("../prisma");

class SelectedTestimonials {
  async selectTestimonial(testimonialId) {
   return await prisma.selectedTestimonials.create({
      data: {
        testimonialId: testimonialId,
      },
    })
  }

  async getSelectedTestimonials() {
    return await prisma.selectedTestimonials.findMany({
      include: { 
        testimonial: {
          include: {
            user: true
          }
        }
      }
    })
  }

  async deleteSelectedTestimonial(testimonailId) {
    return await prisma.selectedTestimonials.delete({
      where: {testimonialId: testimonailId}
    })
  }
}

const selectedTestimonialsMethods = new SelectedTestimonials();

module.exports = {
  selectedTestimonialsMethods
}