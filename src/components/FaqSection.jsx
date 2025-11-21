import React, { useState } from "react";

const faqData = [
  {
    question: "What does a Coffee Broker actually do?",
    answer:
      "A coffee broker connects coffee producers, exporters, and buyers to facilitate transparent, efficient, and secure transactions. By acting as intermediaries, brokers help negotiate contracts, ensure quality standards, and manage logistics. They act as intermediaries to secure the best prices and reduce operational risks.",
  },
  {
    question: "How can working with a Coffee Broker benefit my coffee business?",
    answer:
      "Working with a coffee broker provides access to a wider network of buyers and sellers, expert market intelligence, and streamlined contract negotiation. Brokers help you secure better pricing, reduce risk, and save time by handling complex logistics and documentation.",
  },
  {
    question: "What factors influence coffee prices in the global market?",
    answer:
      "Coffee prices are influenced by supply and demand dynamics, weather conditions affecting harvests, currency fluctuations, geopolitical events, and commodity market trends. Brokers monitor these factors to provide clients with timely insights and strategic advice.",
  },
  {
    question: "What is the difference between a Coffee Broker and a Coffee Trader?",
    answer:
      "A coffee broker facilitates transactions between buyers and sellers without taking ownership of the coffee, earning a commission. A coffee trader, on the other hand, buys and sells coffee on their own account, taking on inventory risk and aiming to profit from price movements.",
  },
];

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section id="faq" className="bg-white py-20 lg:py-28">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-4 sm:px-6 lg:grid lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:gap-16 lg:px-10">
        <div className="space-y-6 lg:border-r lg:border-gray-200 lg:pr-12">
          <h2 className="text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] text-brand-900 sm:text-4xl lg:text-[2rem]">
            FAQs
          </h2>
          <p className="text-base leading-relaxed text-gray-500">
            As a leading coffee marketing, we are dedicated to providing
            comprehensive educational resources and answering frequently asked
            questions to help our clients.
          </p>
          <div className="flex flex-col gap-3 pt-4">
            <button className="pill-button rounded-pill border border-brand-900 bg-brand-900 text-white hover:bg-brand-950">
              More Questions
            </button>
            <button className="pill-button rounded-pill border border-gray-300 bg-white text-brand-900 hover:border-brand-900">
              Contact Us
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {faqData.map((faq, index) => {
            const isOpen = index === openIndex;
            return (
              <div
                key={faq.question}
                className="border-b border-gray-200 last:border-b-0"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="text-lg font-semibold text-brand-900">
                    {faq.question}
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center text-xl text-brand-900 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div
                    id={`faq-panel-${index}`}
                    className="pb-5 pr-12 text-base leading-relaxed text-gray-500"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};