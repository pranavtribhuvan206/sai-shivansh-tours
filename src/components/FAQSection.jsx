import React, { useState } from 'react';
import { FAQS } from '../data/faqs';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyInfo';

export default function FAQSection() {
  const [openId, setOpenId] = useState(1);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-cream-100/70 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-maroon-100 text-maroon-900 text-xs font-bold px-3.5 py-1.5 rounded-full mb-3 uppercase tracking-wider border border-maroon-200">
            <HelpCircle className="w-4 h-4 text-maroon-700" />
            <span>Got Questions?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-maroon-950 font-sans tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="text-base sm:text-lg text-warmbrown-700 mt-2.5 max-w-xl mx-auto">
            Everything you need to know about our vehicle fleet, rates (₹11–₹25/km), Shirdi pickups, outstation travel, and booking process.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-maroon-700 shadow-md ring-1 ring-maroon-700/20'
                    : 'border-cream-200 hover:border-maroon-300 shadow-sm'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between space-x-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-maroon-950">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 shrink-0 ${
                      isOpen ? 'bg-maroon-900 text-gold-400 rotate-180' : 'bg-cream-100 text-warmbrown-600'
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-warmbrown-800 leading-relaxed border-t border-cream-100 bg-cream-50">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-12 text-center bg-white rounded-2xl p-6 sm:p-8 border border-cream-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-lg font-bold text-maroon-950">Have another question or custom requirement?</h4>
            <p className="text-xs sm:text-sm text-warmbrown-600">Our Shirdi customer care is active 24/7 on WhatsApp & phone.</p>
          </div>

          <a
            href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent('Hello Sai Shivansh Tours & Travels, I have a query regarding vehicle booking.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-whatsapp hover:bg-whatsapp-hover text-white font-bold text-sm px-6 py-3 rounded-xl shadow transition-colors shrink-0"
          >
            <MessageCircle className="w-4 h-4 fill-white stroke-none" />
            <span>Ask on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
}
