import React from 'react';
import { Phone, MessageCircle, Mail, MapPin, ExternalLink } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyInfo';

export default function ContactSection() {
  const contactCards = [
    {
      id: 'call',
      title: 'Call Us Directly',
      subtitle: COMPANY_INFO.phonePrimary,
      actionText: 'Call Now',
      href: `tel:${COMPANY_INFO.phoneRaw}`,
      icon: Phone,
      color: 'bg-maroon-900 text-gold-400 border border-gold-500/20',
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp Chat',
      subtitle: `+91 ${COMPANY_INFO.whatsappNumber}`,
      actionText: 'Chat on WhatsApp',
      href: `https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent('Hello Sai Shivansh Tours & Travels, I would like to enquire about booking a vehicle.')}`,
      icon: MessageCircle,
      color: 'bg-whatsapp text-white',
      external: true,
    },
    {
      id: 'email',
      title: 'Email Us',
      subtitle: COMPANY_INFO.email,
      actionText: 'Send Email',
      href: `mailto:${COMPANY_INFO.email}`,
      icon: Mail,
      color: 'bg-warmbrown-900 text-gold-400 border border-gold-500/20',
    },
    {
      id: 'address',
      title: 'Our Dispatch Office',
      subtitle: COMPANY_INFO.address,
      actionText: 'Get Directions',
      href: COMPANY_INFO.googleMapsUrl,
      icon: MapPin,
      color: 'bg-maroon-900 text-gold-400 border border-gold-500/20',
      external: true,
    },
  ];

  return (
    <section id="contact" className="py-16 sm:py-24 bg-cream-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 bg-maroon-100 text-maroon-900 text-xs font-bold px-3.5 py-1.5 rounded-full mb-3 uppercase tracking-wider border border-maroon-200">
            <Phone className="w-4 h-4 text-maroon-700" />
            <span>Connect With Us</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-maroon-950 font-sans tracking-tight">
            Get In Touch
          </h2>

          <p className="text-base sm:text-lg text-warmbrown-700 mt-2.5 leading-relaxed">
            Contact us 24/7 for booking, rates (₹11–₹25/km), custom pilgrimage itineraries, and instant inquiries.
          </p>
        </div>

        {/* 4 Contact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="bg-white rounded-2xl p-6 border border-cream-200 hover:border-maroon-400 shadow-sm hover:shadow-card-hover transform hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow ${card.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-maroon-950 group-hover:text-maroon-700 transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-warmbrown-700 mt-1.5 leading-relaxed line-clamp-3 font-medium">
                    {card.subtitle}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-cream-100">
                  <a
                    href={card.href}
                    target={card.external ? '_blank' : undefined}
                    rel={card.external ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-maroon-800 group-hover:text-gold-600 transition-colors"
                  >
                    <span>{card.actionText}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
