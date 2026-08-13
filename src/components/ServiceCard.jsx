import React from 'react';
import { 
  Plane, 
  Compass, 
  MapPin, 
  TrendingUp, 
  Repeat, 
  Users, 
  Calendar,
  ArrowRight,
  CheckCircle2,
  MessageCircle
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyInfo';

const ICON_MAP = {
  Plane,
  Compass,
  MapPin,
  TrendingUp,
  TrendingRight: TrendingUp,
  Repeat,
  Users,
  Calendar,
};

export default function ServiceCard({ service, onSelectService }) {
  const Icon = ICON_MAP[service.iconName] || Compass;

  const whatsappServiceUrl = `https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent(`Hello Sai Shivansh Tours & Travels, I would like to enquire about ${service.title}. Please provide details and pricing.`)}`;

  return (
    <div className="bg-white rounded-2xl p-6 border border-cream-200 shadow-sm hover:shadow-card-hover transform hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full group relative overflow-hidden">
      
      {/* Top Accent Stripe in Burgundy, Gold and Warm Brown */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-maroon-800 via-gold-500 to-warmbrown-900 group-hover:h-1.5 transition-all duration-300"></div>

      <div>
        {/* Icon & Popular Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-cream-100 text-maroon-800 flex items-center justify-center group-hover:bg-maroon-900 group-hover:text-gold-400 transition-colors duration-300 border border-cream-200 shadow-inner">
            <Icon className="w-6 h-6" />
          </div>

          {service.popular && (
            <span className="bg-gold-500/20 text-maroon-950 text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-gold-500/40">
              Popular Choice
            </span>
          )}
        </div>

        {/* Service Name & Subtitle */}
        <h3 className="text-xl font-bold text-maroon-950 group-hover:text-maroon-700 transition-colors">
          {service.title}
        </h3>
        
        <p className="text-xs font-bold text-gold-700 mt-1">
          {service.subtitle}
        </p>

        {/* Description */}
        <p className="text-sm text-warmbrown-800 mt-3 leading-relaxed">
          {service.description}
        </p>

        {/* Highlights */}
        {service.highlights && (
          <div className="mt-4 pt-3 border-t border-cream-100 space-y-1.5">
            {service.highlights.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-2 text-xs text-charcoal-700 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-maroon-700 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pricing & Actions */}
      <div className="mt-6 pt-4 border-t border-cream-100 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-warmbrown-500 font-medium uppercase tracking-wider block">Pricing</span>
          <span className="text-xs sm:text-sm font-extrabold text-maroon-950">
            {service.startingPrice}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <a
            href={whatsappServiceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center space-x-1.5 bg-whatsapp hover:bg-whatsapp-hover text-white font-bold text-xs py-2.5 px-3 rounded-xl shadow-sm transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white stroke-none" />
            <span>WhatsApp</span>
          </a>

          <button
            onClick={() => onSelectService(service)}
            className="inline-flex items-center justify-center space-x-1 bg-maroon-800 hover:bg-maroon-900 text-white font-bold text-xs py-2.5 px-3 rounded-xl shadow transition-colors border border-gold-500/20"
          >
            <span>Book Ride</span>
            <ArrowRight className="w-3.5 h-3.5 text-gold-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

    </div>
  );
}
