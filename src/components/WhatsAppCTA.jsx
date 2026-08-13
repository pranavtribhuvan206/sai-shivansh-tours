import React from 'react';
import { MessageCircle, Phone, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyInfo';

export default function WhatsAppCTA() {
  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent('Hello Sai Shivansh Tours & Travels, I would like to enquire about booking a vehicle.')}`;

  return (
    <section className="py-14 bg-gradient-to-r from-maroon-950 via-warmbrown-950 to-maroon-950 text-white relative overflow-hidden">
      
      {/* Decorative Shimmer Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-maroon-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Safe Journey, Happy Memories</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-sans text-white tracking-tight">
            Ready to Travel with Us?
          </h2>

          <p className="text-lg sm:text-xl text-cream-100 font-medium leading-relaxed">
            “Book your vehicle today and enjoy a safe, comfortable, and memorable journey in Shirdi & beyond.”
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
            
            {/* WhatsApp Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-whatsapp hover:bg-whatsapp-hover text-white font-extrabold text-base sm:text-lg px-8 py-4 rounded-2xl shadow-whatsapp-glow transform hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <MessageCircle className="w-6 h-6 fill-white stroke-none group-hover:scale-110 transition-transform" />
              <span>WhatsApp Now</span>
            </a>

            {/* Call Us Button */}
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-white/10 hover:bg-white/20 text-white font-extrabold text-base sm:text-lg px-8 py-4 rounded-2xl border border-gold-500/40 backdrop-blur-md transition-all duration-300"
            >
              <Phone className="w-5 h-5 text-gold-400 animate-pulse" />
              <span>Call Us ({COMPANY_INFO.phonePrimary})</span>
            </a>

          </div>

        </div>
      </div>
    </section>
  );
}
