-- CreateTable
CREATE TABLE "SelectedTestimonials" (
    "selectedTestimonialId" TEXT NOT NULL,
    "testimonialId" TEXT NOT NULL,

    CONSTRAINT "SelectedTestimonials_pkey" PRIMARY KEY ("selectedTestimonialId")
);

-- CreateIndex
CREATE UNIQUE INDEX "SelectedTestimonials_testimonialId_key" ON "SelectedTestimonials"("testimonialId");

-- AddForeignKey
ALTER TABLE "SelectedTestimonials" ADD CONSTRAINT "SelectedTestimonials_testimonialId_fkey" FOREIGN KEY ("testimonialId") REFERENCES "Testimonials"("testimonialId") ON DELETE CASCADE ON UPDATE CASCADE;
