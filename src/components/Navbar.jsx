import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.jpg';
import {
  Phone,
  Menu,
  X,
  ShieldCheck,
  MapPin,
  ChevronRight,
  MessageCircle,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyInfo';

export default function Navbar({ onOpenBooking, onOpenEnquiry }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Vehicles', href: '#vehicles' },
    { name: 'Services', href: '#services' },
    { name: 'About Us', href: '#about' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Location', href: '#location' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const element = document.querySelector(href);
    if (element) {
      const navOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const whatsappGeneralUrl = `https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent('Hello Sai Shivansh Tours & Travels, I would like to enquire about booking a vehicle.')}`;

  return (
    <>
      {/* Top Notification / Contact Strip in Rich Burgundy */}
      <div className="bg-maroon-950 text-white text-xs py-2 px-4 border-b border-maroon-900/80 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1.5 text-gold-400 font-medium">
              <MapPin className="w-3.5 h-3.5" />
              <span>Base Location: {COMPANY_INFO.city}, {COMPANY_INFO.state}</span>
            </span>

            <span className="flex items-center space-x-1.5 text-cream-200">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
              <span>Safe & Reliable • 100% Sanitized Fleet</span>
            </span>
          </div>

          <div className="flex items-center space-x-5">
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="hover:text-gold-400 transition-colors text-cream-200 hidden lg:inline-flex items-center space-x-1"
            >
              <span>{COMPANY_INFO.email}</span>
            </a>

            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="hover:text-gold-400 transition-colors flex items-center space-x-1.5 font-semibold text-gold-300"
            >
              <Phone className="w-3.5 h-3.5 text-gold-400" />
              <span>24/7 Helpline: {COMPANY_INFO.phonePrimary}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar on Luxury Cream/Off-White Background */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav shadow-lg py-2 border-b border-cream-300/80'
            : 'bg-cream-50 py-2.5 sm:py-3 border-b border-cream-200/90'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">

            {/* Actual Logo + Brand Name */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-center space-x-3 sm:space-x-3.5 group min-w-0"
              aria-label="Sai Shivansh Tours & Travels Home"
            >
              {/* Actual Sai Shivansh Logo */}
              <div className="flex-shrink-0 relative">
                <img
                  src={logo}
                  alt="Sai Shivansh Tours & Travels Logo"
                  className="
                    w-13 h-13
                    sm:w-16 sm:h-16
                    lg:w-18 lg:h-18
                    object-contain
                    rounded-full
                    shadow-sm
                    border-2
                    border-gold-500/40
                    transition-transform
                    duration-300
                    group-hover:scale-105
                  "
                  style={{ maxHeight: '72px' }}
                />
              </div>

              {/* Company Branding */}
              <div className="flex flex-col min-w-0 justify-center">
                <span
                  className="
                    text-base
                    sm:text-lg
                    lg:text-xl
                    font-extrabold
                    font-sans
                    text-maroon-950
                    tracking-tight
                    leading-tight
                    group-hover:text-maroon-700
                    transition-colors
                  "
                >
                  {COMPANY_INFO.name}
                </span>

                <span
                  className="
                    text-[10px]
                    sm:text-xs
                    font-bold
                    text-warmbrown-700
                    tracking-wider
                    uppercase
                    flex
                    items-center
                    gap-1
                    mt-0.5
                  "
                >
                  <span>Safe Journey, Happy Memories</span>
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-7">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="
                    text-sm
                    font-semibold
                    text-charcoal-800
                    hover:text-maroon-700
                    transition-colors
                    relative
                    py-1
                    after:content-['']
                    after:absolute
                    after:bottom-0
                    after:left-0
                    after:w-0
                    after:h-0.5
                    after:bg-maroon-700
                    hover:after:w-full
                    after:transition-all
                    after:duration-300
                  "
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Right Action Buttons */}
            <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
              
              {/* WhatsApp Quick CTA */}
              <a
                href={whatsappGeneralUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  hidden
                  xl:inline-flex
                  items-center
                  space-x-1.5
                  bg-whatsapp
                  hover:bg-whatsapp-hover
                  text-white
                  text-xs
                  font-bold
                  px-3.5
                  py-2
                  rounded-full
                  shadow-sm
                  transition-all
                  duration-200
                "
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white stroke-none" />
                <span>WhatsApp</span>
              </a>

              {/* Call Button in Rich Maroon */}
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="
                  inline-flex
                  items-center
                  space-x-1.5
                  sm:space-x-2
                  bg-maroon-700
                  hover:bg-maroon-800
                  text-white
                  text-xs
                  sm:text-sm
                  font-bold
                  px-3.5
                  sm:px-4
                  py-2
                  sm:py-2.5
                  rounded-full
                  shadow-md
                  hover:shadow-maroon-glow
                  transition-all
                  duration-300
                  border
                  border-gold-500/40
                  transform
                  hover:-translate-y-0.5
                "
              >
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold-400 animate-pulse" />
                <span>Call Now</span>
              </a>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
                className="
                  lg:hidden
                  p-2
                  rounded-xl
                  text-maroon-950
                  hover:bg-cream-200
                  focus:outline-none
                  transition-colors
                "
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-maroon-900" />
                ) : (
                  <Menu className="w-6 h-6 text-maroon-900" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-cream-50 border-b border-cream-300 px-4 pt-3 pb-6 shadow-xl animate-modal">
            <div className="flex flex-col space-y-1">

              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="
                    flex
                    items-center
                    justify-between
                    text-sm
                    font-bold
                    text-charcoal-900
                    hover:text-maroon-700
                    hover:bg-maroon-50
                    px-4
                    py-2.5
                    rounded-xl
                    transition-colors
                  "
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-warmbrown-400" />
                </a>
              ))}

              {/* Mobile Buttons */}
              <div className="pt-4 mt-2 border-t border-cream-200 flex flex-col space-y-2.5">
                
                {/* Mobile WhatsApp Button */}
                <a
                  href={whatsappGeneralUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    w-full
                    flex
                    items-center
                    justify-center
                    space-x-2
                    bg-whatsapp
                    hover:bg-whatsapp-hover
                    text-white
                    font-bold
                    py-3
                    px-4
                    rounded-xl
                    shadow-sm
                    text-sm
                  "
                >
                  <MessageCircle className="w-4 h-4 fill-white stroke-none" />
                  <span>WhatsApp ({COMPANY_INFO.phonePrimary})</span>
                </a>

                {/* Mobile Call Button */}
                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="
                    w-full
                    flex
                    items-center
                    justify-center
                    space-x-2
                    bg-maroon-700
                    hover:bg-maroon-800
                    text-white
                    font-bold
                    py-3
                    px-4
                    rounded-xl
                    shadow-md
                    text-sm
                    border
                    border-gold-500/30
                  "
                >
                  <Phone className="w-4 h-4 text-gold-400" />
                  <span>Call {COMPANY_INFO.phonePrimary}</span>
                </a>

                {/* Mobile Book Button */}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="
                    w-full
                    bg-gold-500
                    hover:bg-gold-400
                    text-maroon-950
                    font-extrabold
                    py-3
                    px-4
                    rounded-xl
                    shadow
                    text-sm
                    transition-colors
                  "
                >
                  Book Your Ride
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}