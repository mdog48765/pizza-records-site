import React, { useState } from "react";

const faqs = [
  {
    question: "Do you buy used records, CDs, and tapes?",
    answer:
      "Yes. Please check with the store before coming and schedule an appointment when possible. We also occasionally pause buying. We purchase clean, good-condition vinyl, CDs, cassettes, and music collectibles. Large collections are welcome."
  },
  {
    question: "Do you take trades?",
    answer:
      "Yes. We offer trade-ins for records, CDs, and cassettes. Trade value is given as store credit."
  },
  {
    question: "Are shows all-ages?",
    answer:
      "Most Pizza Records shows are all-ages unless otherwise noted. We want the local music scene to be accessible to everyone."
  },
  {
    question: "How do I book a show or host an event at Pizza Records?",
    answer:
      "Go to www.mkmentertainmentllc.com to start the booking process."
  },
  {
    question: "Do you sell turntables and audio equipment?",
    answer:
      "Yes. We carry select new and used turntables, Walkmans, CD players, speakers, guitar pedals, strings, accessories, slipmats, and more. Inventory changes constantly."
  },
  {
    question: "Do you offer gift cards?",
    answer:
      "Yes. Gift cards are available in any amount and can be used for vinyl, CDs, tapes, gear, or merch."
  },
  {
    question: "Do you stock new releases and restocks?",
    answer:
      "Absolutely. We receive new vinyl releases every week, along with restocks of popular titles. Follow us on Facebook or Instagram for updates when new shipments arrive."
  },
  {
    question: "Do you buy damaged or moldy records?",
    answer:
      "No. Items must be clean and in good, playable condition. We cannot purchase water-damaged, moldy, or heavily scratched items."
  },
  {
    question: "Do you offer special orders?",
    answer:
      "Yes. If you’re looking for a specific album, we’ll do our best to track it down for you."
  },
  {
    question: "Where are you located, and where should I park?",
    answer:
      "We’re located at 59 E Central Park Plaza, Jacksonville, IL 62650. Free parking is available in the downtown plaza lots and street-side near the shop."
  },
  { question: "Do you guys sell pizza?",
    answer: "No, but that would be awesome wouldn't it?"
  }

];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer
    }
  }))
};

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0); // first one open by default

  return (
    <section
      id="faq"
      className="bg-black/80 text-slate-100 py-16 border-t border-red-900"
    >
      {/* FAQ Schema for SEO */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm md:text-base text-slate-300">
            Answers to the things people ask us most at Pizza Records.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.question}
                className="border border-red-900/60 rounded-xl bg-black/60 backdrop-blur-sm"
              >
                <button
                  type="button"
                  className="w-full flex items-center justify-between px-4 md:px-5 py-3 md:py-4 text-left"
                  onClick={() =>
                    setOpenIndex(isOpen ? -1 : index)
                  }
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-sm md:text-base text-slate-100">
                    {item.question}
                  </span>
                  <span
                    className="ml-3 flex h-6 w-6 items-center justify-center rounded-full border border-red-700 text-xs text-red-300"
                    aria-hidden="true"
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <div
                  className={`px-4 md:px-5 pb-3 md:pb-4 text-sm md:text-base text-slate-300 transition-[max-height,opacity] duration-200 ease-out ${
                    isOpen
                      ? "max-h-40 md:max-h-52 opacity-100"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  <p className="pt-1 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
