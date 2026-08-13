import React from 'react';
import { Phone, MessageCircle, Mail, MapPin, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyInfo';
import logo from '../assets/logo.jpg';

export default function Footer({ onOpenBooking }) {
  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Vehicles', href: '#vehicles' },
    { name: 'Services', href: '#services' },
    { name: 'About Us', href: '#about' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Location', href: '#location' },
    { name: 'Contact', href: '#contact' },
  ];

  const serviceLinks = [
    { name: 'Shirdi Pilgrimage Travel', href: '#services' },
    { name: 'Airport Transfers', href: '#services' },
    { name: 'Outstation Travel', href: '#services' },
    { name: 'Local Sightseeing', href: '#services' },
    { name: 'Family Tours & Groups', href: '#services' },
    { name: 'Monthly Vehicle Rentals', href: '#vehicles' },
  ];

  const handleScroll = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const navOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const whatsappFooterUrl = `https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent('Hello Sai Shivansh Tours & Travels, I would like to book a vehicle.')}`;

  return (
    <footer className="bg-maroon-950 text-white pt-16 pb-8 border-t border-maroon-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-maroon-900/80">
          
          {/* Column 1: Actual Logo & Business Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3.5">
              {/* Actual Logo Image */}
              <img
                src={logo}
                alt="Sai Shivansh Tours & Travels"
                className="w-14 h-14 object-contain rounded-full border border-gold-500/40 shadow bg-white p-0.5"
              />
              <div>
                <h3 className="text-xl font-bold font-sans text-white tracking-tight leading-tight">
                  {COMPANY_INFO.name}
                </h3>
                <span className="text-[11px] font-semibold text-gold-400 tracking-wider uppercase block mt-0.5">
                  {COMPANY_INFO.tagline}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-cream-200/90 leading-relaxed pr-4">
              Your trusted car rental and travel service in Shirdi. Offering sanitized Swift Dzire, Ertiga, Innova, Innova Crysta, Tavera, Ciaz, and luxury 12–26 seater Tempo Travellers for pilgrimage, local, and outstation trips.
            </p>

            <div className="pt-2 flex items-center space-x-2.5 text-xs text-gold-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0" />
              <span>Safe • Comfortable • Reliable Travel Service in Shirdi</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider text-gold-400">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className="text-cream-200 hover:text-gold-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider text-gold-400">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {serviceLinks.map((service) => (
                <li key={service.name}>
                  <a
                    href={service.href}
                    onClick={(e) => handleScroll(e, service.href)}
                    className="text-cream-200 hover:text-gold-400 transition-colors"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider text-gold-400">
              Contact Us
            </h4>
            
            <div className="space-y-2.5 text-xs sm:text-sm text-cream-200">
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="flex items-start space-x-2.5 hover:text-gold-400 transition-colors font-medium"
              >
                <Phone className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>Phone: {COMPANY_INFO.phonePrimary}</span>
              </a>

              <a
                href={whatsappFooterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start space-x-2.5 hover:text-whatsapp transition-colors font-medium"
              >
                <MessageCircle className="w-4 h-4 text-whatsapp shrink-0 mt-0.5" />
                <span>WhatsApp: {COMPANY_INFO.phonePrimary}</span>
              </a>

              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-start space-x-2.5 hover:text-gold-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span className="break-all">{COMPANY_INFO.email}</span>
              </a>

              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{COMPANY_INFO.address}</span>
              </div>
            </div>

            {/* WhatsApp Booking CTA Button */}
            <div className="pt-2">
              <a
                href={whatsappFooterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center space-x-2 bg-whatsapp hover:bg-whatsapp-hover text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-white stroke-none" />
                <span>Chat & Book on WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-cream-300 space-y-4 sm:space-y-0">
          <p>© 2026 Sai Shivansh Tours & Travels. All Rights Reserved.</p>
          <div className="flex items-center space-x-1">
            <span>Location: <strong>{COMPANY_INFO.city}, {COMPANY_INFO.state}</strong></span>
          </div>
        </div>

      </div>
    </footer>
  );
}
