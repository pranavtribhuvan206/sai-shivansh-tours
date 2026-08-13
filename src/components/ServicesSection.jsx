import React from 'react';
import { SERVICES } from '../data/services';
import ServiceCard from './ServiceCard';
import { Route } from 'lucide-react';

export default function ServicesSection({ onSelectService }) {
  return (
    <section id="services" className="py-16 sm:py-24 bg-cream-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 bg-maroon-100 text-maroon-900 text-xs font-bold px-3.5 py-1.5 rounded-full mb-3 uppercase tracking-wider border border-maroon-200">
            <Route className="w-4 h-4 text-maroon-700" />
            <span>Comprehensive Travel Solutions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-maroon-950 font-sans tracking-tight">
            Travel Services
          </h2>

          <p className="text-base sm:text-lg text-warmbrown-700 mt-2.5 leading-relaxed">
            Select the service you need and book directly through WhatsApp or call us for instant confirmation.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onSelectService={onSelectService}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
