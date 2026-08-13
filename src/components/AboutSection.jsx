import React from 'react';
import { ShieldCheck, Award, Clock, ThumbsUp, HeartHandshake } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyInfo';
import templeImg from '../assets/shirdi-temple.jpg';
import logo from '../assets/logo.jpg';

export default function AboutSection() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "Safe & Reliable",
      desc: "Licensed, polite chauffeurs with comprehensive route mastery for pilgrimage, cities, and highways."
    },
    {
      icon: ThumbsUp,
      title: "Comfortable Journeys",
      desc: "Thoroughly sanitized, air-conditioned vehicles equipped for peaceful and smooth travel."
    },
    {
      icon: HeartHandshake,
      title: "Customer Satisfaction",
      desc: "Dedicated 24/7 personalized travel support, on-time arrivals, and prompt dispatch."
    },
    {
      icon: Clock,
      title: "24/7 Doorstep Pickup",
      desc: "Immediate pickups from Shirdi Sai Temple gates, Sainagar Railway Station, hotels, and airports."
    }
  ];

  return (
    <section id="about" className="py-16 sm:py-24 bg-maroon-950 text-white relative overflow-hidden">
      
      {/* Background Deep Burgundy Radial Gradient */}
      <div className="absolute inset-0 bg-maroon-radial opacity-90"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Shirdi Temple Golden Spire Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-gold-500/50 bg-[#1F040A] p-2 group">
                <img
                  src={templeImg}
                  alt="Shirdi Sai Baba Temple - Sai Shivansh Tours & Travels"
                  className="w-full h-80 sm:h-96 object-cover object-center rounded-2xl group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-2 rounded-2xl bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none"></div>
              </div>

              {/* Floating Location Badge with Brand Logo */}
              <div className="absolute -bottom-5 -right-3 sm:right-4 bg-cream-50 text-maroon-950 p-3 sm:p-4 rounded-2xl shadow-2xl border border-gold-500/40 flex items-center space-x-3 max-w-xs">
                <img
                  src={logo}
                  alt="Sai Shivansh Tours"
                  className="w-11 h-11 rounded-full object-contain border border-gold-500/40 shrink-0 bg-maroon-950 p-0.5"
                />
                <div>
                  <div className="font-extrabold text-xs sm:text-sm text-maroon-950 leading-tight">Shirdi, Maharashtra</div>
                  <div className="text-[11px] text-warmbrown-600 mt-0.5 font-medium">Near Sai Baba Temple</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: About Content */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center space-x-2 bg-maroon-900 text-gold-400 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-gold-500/30">
              <Award className="w-4 h-4" />
              <span>About Sai Shivansh Tours & Travels</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-sans tracking-tight leading-tight">
              Your Trusted Travel Companion in Shirdi
            </h2>

            <p className="text-base sm:text-lg text-cream-100 leading-relaxed font-normal">
              Based in the holy city of Shirdi, <strong className="text-gold-300">Sai Shivansh Tours & Travels</strong> is committed to providing safe, comfortable, and memorable travel experiences for devotees, families, corporate guests, and tourists.
            </p>

            <p className="text-sm sm:text-base text-cream-200/90 leading-relaxed font-normal">
              Whether you require a quick airport transfer, a local Shirdi temple darshan ride, or an outstation journey to Pune, Mumbai, Nashik, or Trimbakeshwar, our verified chauffeurs and modern fleet ensure a blissful pilgrimage journey.
            </p>

            {/* 4 Feature Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {pillars.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-start space-x-3.5">
                    <div className="w-9 h-9 rounded-xl bg-gold-500/20 text-gold-400 flex items-center justify-center shrink-0 mt-0.5 border border-gold-500/30">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{item.title}</h4>
                      <p className="text-xs text-cream-200 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Rates & Booking Commitment Strip */}
            <div className="p-4 bg-maroon-900/90 rounded-2xl border border-gold-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div>
                <span className="text-xs font-bold text-gold-400 uppercase tracking-wider block">Transparent Billing</span>
                <span className="text-sm text-cream-100">Starting from <strong className="text-white font-bold">₹11–₹25/km</strong> & Monthly Rental: <strong className="text-gold-300 font-bold">₹35,000/month</strong></span>
              </div>

              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="bg-gold-500 hover:bg-gold-400 text-maroon-950 font-extrabold text-xs px-5 py-2.5 rounded-xl shadow transition-colors shrink-0"
              >
                Call {COMPANY_INFO.phonePrimary}
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
