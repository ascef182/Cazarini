import React, { useState } from "react";
import { useTranslation } from "../hooks/useTranslation";

export const FaqSection = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(0);

  const faqData = t("faq.items");

  const toggleFaq = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section id="faq" className="bg-white py-20 lg:py-28">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-4 sm:px-6 lg:grid lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:gap-16 lg:px-10">
        <div className="space-y-6 lg:border-r lg:border-gray-200 lg:pr-12">
          <h2 className="text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] text-brand-900 sm:text-4xl lg:text-[2rem]">
            {t("faq.titleShort")}
          </h2>
          <p className="text-base leading-relaxed text-gray-500">
            {t("faq.description")}
          </p>
          <div className="flex flex-col gap-3 pt-4">
            <button className="pill-button rounded-pill border border-brand-900 bg-brand-900 text-white hover:bg-brand-950">
              {t("faq.moreQuestions")}
            </button>
            <a
              href="#contact"
              className="pill-button rounded-pill border border-gray-300 bg-white text-brand-900 hover:border-brand-900 text-center"
            >
              {t("faq.contactUs")}
            </a>
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
