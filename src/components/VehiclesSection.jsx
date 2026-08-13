import React, { useState } from 'react';
import { VEHICLES } from '../data/vehicles';
import VehicleCard from './VehicleCard';
import { Car, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyInfo';

export default function VehiclesSection({ onSelectVehicle }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Sedan', 'MUV', 'SUV', 'Tempo Traveller'];

  const filteredVehicles = activeFilter === 'All'
    ? VEHICLES
    : VEHICLES.filter(v => v.category === activeFilter);

  return (
    <section id="vehicles" className="py-16 sm:py-24 bg-cream-100/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 bg-maroon-100 text-maroon-900 text-xs font-bold px-3.5 py-1.5 rounded-full mb-3 uppercase tracking-wider border border-maroon-200">
            <Car className="w-4 h-4 text-maroon-700" />
            <span>Our 8 Verified Fleet Vehicles</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-maroon-950 font-sans tracking-tight">
            Explore Our Vehicle Fleet
          </h2>
          
          <p className="text-base sm:text-lg text-warmbrown-700 mt-2.5 leading-relaxed">
            Clean, air-conditioned, and sanitized vehicles for local Shirdi temple darshan, outstation journeys, and monthly rental contracts.
          </p>
        </div>

        {/* Highlight Banner: Rates & Monthly Rental Info */}
        <div className="mb-10 bg-gradient-to-r from-maroon-950 via-warmbrown-900 to-maroon-950 text-white rounded-2xl p-4 sm:p-6 shadow-xl border border-gold-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-center md:text-left">
            <div className="w-12 h-12 rounded-xl bg-gold-500/20 text-gold-400 flex items-center justify-center shrink-0 border border-gold-500/30">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Standard Per-Kilometre Rates: <span className="text-gold-300 font-extrabold">₹11–₹25 / km</span>
              </h3>
              <p className="text-xs sm:text-sm text-cream-200">
                Transparent billing • No hidden surcharges • Toll & parking as applicable
              </p>
            </div>
          </div>

          {/* Monthly Rental Tag */}
          <div className="bg-gold-500 text-maroon-950 px-4 py-2 rounded-xl font-extrabold text-xs sm:text-sm shadow flex items-center space-x-2 shrink-0">
            <Sparkles className="w-4 h-4 text-maroon-950" />
            <span>Monthly Rental: ₹35,000 / month</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 ${
                activeFilter === category
                  ? 'bg-maroon-700 text-white shadow-maroon-glow scale-105 border border-gold-500/40'
                  : 'bg-white text-charcoal-700 hover:bg-cream-200 border border-cream-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Vehicle Cards Grid (4 columns on large screens) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onSelectVehicle={onSelectVehicle}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
