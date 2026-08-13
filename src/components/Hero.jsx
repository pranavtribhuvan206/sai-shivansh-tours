import React from 'react';
import { Calendar, MessageSquareText, Phone, MapPin } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyInfo';
import templeImg from '../assets/shirdi-temple.jpg';

export default function Hero({ onOpenBooking, onOpenEnquiry }) {
  return (
    <section id="home" className="relative min-h-[90vh] lg:min-h-[85vh] flex items-center bg-[#28060D] overflow-hidden pt-8 pb-20 lg:py-24">
      
      {/* Background Temple Image with Rich Burgundy & Warm Mocha Ambient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={templeImg}
          alt="Shirdi Sai Baba Temple Background"
          className="w-full h-full object-cover object-center opacity-30 filter scale-105"
        />
        {/* Deep Maroon & Warm Brown Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1F040A]/95 via-[#3A2016]/85 to-[#28060D]/90"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold-500/15 via-transparent to-[#1F040A]/75"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Tagline, Description & 3 Action Buttons */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* Top Badge: Trusted Travel Service in Shirdi */}
            <div className="inline-flex items-center space-x-2 bg-black/40 backdrop-blur-md border border-[#C9A227] rounded-full px-4 py-1.5 shadow-lg">
              <span className="text-sm">🚗</span>
              <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
                Trusted Travel Service in Shirdi
              </span>
            </div>

            {/* Main Heading: Sai Shivansh (White) + Tours & Travels (Gold) */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-sans text-white tracking-tight leading-[1.1]">
                Sai Shivansh
              </h1>
              <div className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-sans text-[#F4C542] tracking-tight leading-[1.1]">
                Tours & Travels
              </div>
            </div>

            {/* Sub-tagline: Safe • Comfortable • Reliable (Gold #F4C542) */}
            <div className="flex items-center space-x-2.5 text-[#F4C542] font-bold text-base sm:text-xl tracking-wide">
              <span>Safe</span>
              <span>•</span>
              <span>Comfortable</span>
              <span>•</span>
              <span>Reliable</span>
            </div>

            {/* Supporting Description text (Clean Light #F5F5F5) */}
            <p className="text-sm sm:text-base lg:text-lg text-[#F5F5F5] font-normal leading-relaxed max-w-xl">
              Your trusted travel partner in Shirdi for local journeys, airport transfers, events, outstation trips, one-way journeys and more.
            </p>

            {/* 3 Buttons matching the exact photo design */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2 w-full sm:w-auto">
              
              {/* Button 1: Book Now (Green) */}
              <button
                onClick={onOpenBooking}
                className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-xl shadow-lg hover:shadow-whatsapp-glow transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <Calendar className="w-4 h-4 text-white" />
                <span>Book Now</span>
              </button>

              {/* Button 2: Enquire Now (Cream/Gold) */}
              <button
                onClick={onOpenEnquiry}
                className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-2 bg-[#FDE08B] hover:bg-[#FCD366] text-maroon-950 font-extrabold text-sm sm:text-base px-7 py-3.5 rounded-xl shadow-md transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <MessageSquareText className="w-4 h-4 text-maroon-950" />
                <span>Enquire Now</span>
              </button>

              {/* Button 3: Call Now (White) */}
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white hover:bg-cream-50 text-maroon-950 font-bold text-sm sm:text-base px-7 py-3.5 rounded-xl shadow-md border border-cream-200 transition-all duration-200"
              >
                <Phone className="w-4 h-4 text-maroon-800" />
                <span>Call Now</span>
              </a>

            </div>

          </div>

          {/* Right Column: Prominent Shirdi Temple Golden Spire Card */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Golden & Maroon Ambient Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-gold-500/30 to-maroon-600/30 rounded-3xl blur-2xl opacity-75"></div>

              {/* Main Shirdi Golden Spire Temple Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-gold-500/30 bg-maroon-950 animate-float-slow group">
                <img
                  src={templeImg}
                  alt="Shirdi Sai Baba Temple Golden Spire"
                  className="w-full h-72 sm:h-84 lg:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Subtle Bottom Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                
                {/* Bottom Overlay Info Tag */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="bg-maroon-950/90 text-gold-300 text-xs font-bold px-3 py-1.5 rounded-xl backdrop-blur-md border border-gold-500/30 flex items-center space-x-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gold-400" />
                    <span>Shirdi Sai Baba Temple</span>
                  </span>
                  
                  <span className="bg-gold-500 text-maroon-950 text-xs font-extrabold px-3 py-1.5 rounded-xl shadow">
                    24/7 Available
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
