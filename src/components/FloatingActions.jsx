import React, { useState, useEffect } from 'react';
import { MessageCircle, Phone, ChevronUp } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyInfo';

export default function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent('Hello Sai Shivansh Tours & Travels, I would like to enquire about vehicle booking.')}`;

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end space-y-3 pointer-events-auto">
      
      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="w-10 h-10 rounded-full bg-cream-50 text-maroon-950 shadow-lg border border-cream-300 flex items-center justify-center hover:bg-cream-200 transform hover:scale-110 transition-all duration-300"
        >
          <ChevronUp className="w-5 h-5 text-maroon-800" />
        </button>
      )}

      {/* Call Button in Rich Maroon */}
      <div className="relative group">
        {/* Tooltip */}
        <div className="absolute right-14 top-1/2 -translate-y-1/2 bg-maroon-950 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none border border-maroon-800">
          Call: {COMPANY_INFO.phonePrimary}
        </div>

        <a
          href={`tel:${COMPANY_INFO.phoneRaw}`}
          aria-label="Call Sai Shivansh Tours & Travels"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-maroon-800 hover:bg-maroon-900 text-white shadow-maroon-glow border-2 border-gold-400 flex items-center justify-center transform hover:scale-110 transition-all duration-300"
        >
          <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-gold-400 animate-pulse" />
        </a>
      </div>

      {/* WhatsApp Button with Pulsing Ring */}
      <div className="relative group">
        <span className="absolute -inset-1 rounded-full bg-whatsapp opacity-70 animate-ping"></span>
        
        {/* Tooltip */}
        <div className="absolute right-14 top-1/2 -translate-y-1/2 bg-maroon-950 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none border border-maroon-800">
          Chat on WhatsApp
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Sai Shivansh Tours & Travels on WhatsApp"
          className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-whatsapp hover:bg-whatsapp-hover text-white shadow-whatsapp-glow flex items-center justify-center transform hover:scale-110 transition-all duration-300"
        >
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-white stroke-none" />
        </a>
      </div>

    </div>
  );
}
