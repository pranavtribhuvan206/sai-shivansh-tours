import React from 'react';
import { MapPin, Navigation, Clock, CheckCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyInfo';

export default function LocationSection() {
  return (
    <section id="location" className="py-16 sm:py-24 bg-cream-100/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-maroon-100 text-maroon-900 text-xs font-bold px-3.5 py-1.5 rounded-full mb-3 uppercase tracking-wider border border-maroon-200">
            <MapPin className="w-4 h-4 text-maroon-700" />
            <span>Visit Our Shirdi Base</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-maroon-950 font-sans tracking-tight">
            Our Location in Shirdi
          </h2>

          <p className="text-base sm:text-lg text-warmbrown-700 mt-2.5">
            Conveniently located near Sai Baba Temple for immediate hotel, temple gate, and station pickups across Shirdi.
          </p>
        </div>

        {/* Map & Address Container */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-cream-200 grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Location Details */}
          <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-8 bg-gradient-to-b from-white to-cream-100/50">
            <div>
              <span className="bg-maroon-950 text-cream-50 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-gold-500/30">
                Shirdi Base Office
              </span>

              <h3 className="text-2xl font-extrabold text-maroon-950 mt-4">
                {COMPANY_INFO.name}
              </h3>

              <div className="mt-6 space-y-4 text-sm text-charcoal-800">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-maroon-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-maroon-950">Address:</span>
                    <span className="text-warmbrown-800">{COMPANY_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Navigation className="w-5 h-5 text-maroon-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-maroon-950">Landmark:</span>
                    <span className="text-warmbrown-800">{COMPANY_INFO.landmark}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-maroon-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-maroon-950">Operating Hours:</span>
                    <span className="text-warmbrown-800">Open 24 Hours / 7 Days a Week</span>
                  </div>
                </div>
              </div>

              {/* Shirdi Pickup Coverage Highlights */}
              <div className="mt-8 pt-6 border-t border-cream-200 space-y-2">
                <span className="text-xs font-extrabold text-maroon-950 uppercase tracking-wider block">
                  Quick Doorstep Pickup Points:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs text-warmbrown-700">
                  <span className="flex items-center space-x-1.5 font-medium">
                    <CheckCircle className="w-3.5 h-3.5 text-maroon-700 shrink-0" />
                    <span>Sai Temple Gates 1 & 2</span>
                  </span>
                  <span className="flex items-center space-x-1.5 font-medium">
                    <CheckCircle className="w-3.5 h-3.5 text-maroon-700 shrink-0" />
                    <span>Sainagar Railway Station</span>
                  </span>
                  <span className="flex items-center space-x-1.5 font-medium">
                    <CheckCircle className="w-3.5 h-3.5 text-maroon-700 shrink-0" />
                    <span>Shirdi Airport (SAG)</span>
                  </span>
                  <span className="flex items-center space-x-1.5 font-medium">
                    <CheckCircle className="w-3.5 h-3.5 text-maroon-700 shrink-0" />
                    <span>All Hotels & Ashrams</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Get Directions Button */}
            <div className="pt-4">
              <a
                href={COMPANY_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center space-x-2.5 bg-maroon-800 hover:bg-maroon-900 text-white font-extrabold py-3.5 px-6 rounded-xl shadow-md transition-all text-sm border border-gold-500/30"
              >
                <Navigation className="w-4 h-4 text-gold-400" />
                <span>Get Directions on Google Maps</span>
              </a>
            </div>

          </div>

          {/* Right Column: Embedded Google Maps Iframe */}
          <div className="lg:col-span-7 h-[350px] lg:h-auto min-h-[350px] relative bg-cream-200">
            <iframe
              title="Sai Shivansh Tours Shirdi Location"
              src={COMPANY_INFO.googleMapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full min-h-[350px] object-cover"
            ></iframe>
          </div>

        </div>

      </div>
    </section>
  );
}
