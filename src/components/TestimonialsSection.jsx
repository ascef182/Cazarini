import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const testimonials = [
  {
    id: 1,
    quote:
      "I am pleased to recommend Thiago Cazarini, a standout expert in the Brazilian coffee market. His deep knowledge and insights have made a significant impact on the industry, and his willingness to share information sets him apart as a true thought leader. Thiago’s popular weekly report is a testament to his expertise, providing valuable analysis and updates that are highly regarded by professionals across the market. ",
    name: "Dave Behrends",
    title: "Managing Partner and Head of Trading",
    avatar: "/photos/dave.jfif",
  },
  {
    id: 2,
    quote:
      "Thiago, is a reliable and insightful commodities broker who not only handles transactions but also provides valuable market information, he has a very good reading of Brazilian Coffee Market, he brings a deep understanding of market dynamics to his current role as a broker. Thiago is not just focused on brokerage fees; he is dedicated to offering clients comprehensive market insights that help inform their trading decisions. His disciplined approach, honed through a commitment to sports, ensures he remains focused and strategic, providing clients with both expert advice and exceptional service.",
    name: "Carlos Santana Jr",
    title: "Commercial Director of Ecom Group (Brazil)",
    avatar: "/photos/carlos.jfif",
  },
  {
    id: 3,
    quote:
      "Thiago Cazarini is a brilliant green coffee broker in Brazil. His deep knowledge of the market and continuous sharing of important information is always very useful.",
    name: "Felipe Feijó",
    title: "Country Manager - Starbucks Farmer Support Center Brazil",
    avatar: "/photos/felipe.jfif",
  },
];

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const quoteRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 6500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!quoteRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }, quoteRef);
    return () => ctx.revert();
  }, [currentIndex]);

  const handleNavigate = (direction) => {
    setCurrentIndex((prev) => {
      if (direction === "prev") {
        return prev === 0 ? testimonials.length - 1 : prev - 1;
      }
      return prev === testimonials.length - 1 ? 0 : prev + 1;
    });
  };

  const activeTestimonial = testimonials[currentIndex];

  return (
    <section className="bg-white py-20 lg:py-28" aria-label="Testimonials">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-4 sm:px-6 lg:px-10">
        <div
          ref={quoteRef}
          key={activeTestimonial.id}
          className="max-w-4xl space-y-8"
        >
          <p className="text-balance text-xl leading-relaxed text-brand-900 sm:text-2xl lg:text-[1.75rem] lg:leading-[1.5]">
            "{activeTestimonial.quote}"
          </p>
        </div>

        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <img
              src={activeTestimonial.avatar}
              alt={activeTestimonial.name}
              className="h-14 w-14 rounded-full border-2 border-gray-200 object-cover"
              loading="lazy"
            />
            <div>
              <p className="text-base font-semibold text-brand-900">
                {activeTestimonial.name}
              </p>
              <p className="text-sm text-gray-500">{activeTestimonial.title}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => handleNavigate("prev")}
              aria-label="Previous testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-brand-900 transition hover:border-brand-900 hover:bg-gray-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <p
              className="min-w-[60px] text-center text-sm font-medium text-gray-500"
              aria-live="polite"
              aria-atomic="true"
            >
              0{currentIndex + 1} / 0{testimonials.length}
            </p>
            <button
              type="button"
              onClick={() => handleNavigate("next")}
              aria-label="Next testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-900 text-white transition hover:bg-brand-950"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
