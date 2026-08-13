import React from 'react';
import { Users, Wind, CheckCircle2, MessageCircle, Phone, Calendar } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyInfo';

export default function VehicleCard({ vehicle, onSelectVehicle }) {
  const whatsappVehicleUrl = `https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent(`Hello Sai Shivansh Tours & Travels, I would like to book a ${vehicle.name}. Please provide availability and pricing.`)}`;

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-cream-200 shadow-sm hover:shadow-card-hover transform hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
      
      {/* Vehicle Image Container on Clean White/Light Background */}
      <div className="relative h-44 sm:h-48 overflow-hidden bg-white p-3 flex items-center justify-center border-b border-cream-100">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Category Tag */}
        <div className="absolute top-2.5 left-2.5">
          <span className="bg-maroon-950/90 text-cream-50 text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-md backdrop-blur-md shadow-sm border border-maroon-800">
            {vehicle.category}
          </span>
        </div>

        {/* Badge Tag if any */}
        {vehicle.badge && (
          <div className="absolute top-2.5 right-2.5">
            <span className="bg-gold-500 text-maroon-950 text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-sm tracking-tight">
              {vehicle.badge}
            </span>
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5">
        <div>
          {/* Vehicle Name */}
          <div className="flex items-baseline justify-between gap-1">
            <h3 className="text-base sm:text-lg font-extrabold text-maroon-950 group-hover:text-maroon-700 transition-colors leading-tight">
              {vehicle.name}
            </h3>
            <span className="text-xs font-extrabold text-gold-600 shrink-0">
              {vehicle.priceStarting}
            </span>
          </div>

          {/* Tagline / Subtitle */}
          <p className="text-xs text-warmbrown-700 mt-1 line-clamp-2 leading-relaxed font-normal">
            {vehicle.tagline}
          </p>

          {/* Quick Specifications */}
          <div className="grid grid-cols-2 gap-2 mt-3 pt-2.5 border-t border-cream-100 text-xs text-warmbrown-800">
            <div className="flex items-center space-x-1.5 font-medium">
              <Users className="w-3.5 h-3.5 text-maroon-700 shrink-0" />
              <span className="truncate">{vehicle.seating}</span>
            </div>
            <div className="flex items-center space-x-1.5 font-medium">
              <Wind className="w-3.5 h-3.5 text-maroon-700 shrink-0" />
              <span className="truncate">{vehicle.acType}</span>
            </div>
          </div>

          {/* Key Features List */}
          <div className="mt-3 space-y-1">
            {vehicle.features.slice(0, 2).map((feat, idx) => (
              <div key={idx} className="flex items-center space-x-1.5 text-xs text-charcoal-700">
                <CheckCircle2 className="w-3 h-3 text-gold-600 shrink-0" />
                <span className="truncate">{feat}</span>
              </div>
            ))}
          </div>

          {/* Rate & Monthly Rental Info */}
          <div className="mt-3.5 pt-2.5 border-t border-cream-200 bg-cream-100/90 -mx-4 -mb-1 px-4 py-2 rounded-lg text-xs space-y-0.5">
            <div className="flex justify-between items-center text-charcoal-800">
              <span className="text-warmbrown-600 font-medium">Rate Range:</span>
              <span className="font-bold text-maroon-950">₹11–₹25/km</span>
            </div>
            {vehicle.monthlyRental && (
              <div className="flex justify-between items-center text-charcoal-800">
                <span className="text-warmbrown-600 font-medium">Monthly Rental:</span>
                <span className="font-bold text-gold-700">{vehicle.monthlyRental}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons: Book on WhatsApp & Call Now / Book Form */}
        <div className="pt-2 flex flex-col gap-2 mt-auto">
          {/* Primary Button: Book on WhatsApp */}
          <a
            href={whatsappVehicleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center space-x-2 bg-whatsapp hover:bg-whatsapp-hover text-white font-bold text-xs sm:text-sm py-2.5 px-3.5 rounded-xl shadow-sm hover:shadow-whatsapp-glow transition-all duration-200"
          >
            <MessageCircle className="w-4 h-4 fill-white stroke-none" />
            <span>Book on WhatsApp</span>
          </a>

          {/* Secondary Buttons Row: Online Form & Call */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onSelectVehicle(vehicle)}
              className="inline-flex items-center justify-center space-x-1 bg-cream-100 hover:bg-cream-200 text-maroon-950 font-bold text-xs py-2 px-2 rounded-xl border border-cream-300 transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-maroon-700" />
              <span>Book Online</span>
            </button>

            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="inline-flex items-center justify-center space-x-1 bg-maroon-800 hover:bg-maroon-900 text-white font-bold text-xs py-2 px-2 rounded-xl transition-colors"
            >
              <Phone className="w-3 h-3 text-gold-400" />
              <span>Call Now</span>
            </a>
          </div>
        </div>

      </div>

    </div>
  );
}
