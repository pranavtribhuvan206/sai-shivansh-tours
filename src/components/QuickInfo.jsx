import React from 'react';
import { MapPin, Car, ShieldCheck, MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyInfo';

export default function QuickInfo() {
  const infoCards = [
    {
      id: 'location',
      title: 'Location',
      detail: 'Near Hotel Abhishek',
      subtext: 'Nagar-Manmad Highway, Shirdi',
      icon: MapPin,
      color: 'bg-maroon-900 text-gold-400 border border-gold-500/20',
    },
    {
      id: 'vehicles',
      title: 'Fleet & Rates',
      detail: '8 Fleet Vehicles',
      subtext: 'Starting from ₹11–₹25 / km',
      icon: Car,
      color: 'bg-warmbrown-800 text-gold-400 border border-gold-500/20',
    },
    {
      id: 'trust',
      title: 'Safe & Reliable',
      detail: 'Comfortable Journeys',
      subtext: '24/7 Shirdi Travel Support',
      icon: ShieldCheck,
      color: 'bg-maroon-900 text-gold-400 border border-gold-500/20',
    },
    {
      id: 'contact',
      title: 'Call / WhatsApp',
      detail: COMPANY_INFO.phonePrimary,
      subtext: 'Instant rates on chat',
      icon: MessageCircle,
      color: 'bg-whatsapp text-white shadow-sm',
      link: `https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent('Hello Sai Shivansh Tours & Travels, I would like to book a vehicle.')}`,
    },
  ];

  return (
    <section className="relative z-20 -mt-8 sm:-mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-cream-50 rounded-3xl p-3 sm:p-5 shadow-xl border border-cream-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {infoCards.map((card) => {
          const Icon = card.icon;
          const CardWrapper = card.link ? 'a' : 'div';
          return (
            <CardWrapper
              key={card.id}
              href={card.link || undefined}
              target={card.link ? '_blank' : undefined}
              rel={card.link ? 'noopener noreferrer' : undefined}
              className="bg-white rounded-2xl p-4 hover:bg-cream-100/80 hover:shadow-md border border-cream-200/90 transition-all duration-300 flex items-center space-x-3.5 group cursor-pointer"
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300 ${card.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] sm:text-[11px] font-extrabold text-warmbrown-500 uppercase tracking-wider block">
                  {card.title}
                </span>
                <h3 className="text-sm sm:text-base font-extrabold text-maroon-950 group-hover:text-maroon-700 transition-colors truncate">
                  {card.detail}
                </h3>
                <p className="text-xs text-warmbrown-600 truncate mt-0.5 font-medium">
                  {card.subtext}
                </p>
              </div>
            </CardWrapper>
          );
        })}
      </div>
    </section>
  );
}
