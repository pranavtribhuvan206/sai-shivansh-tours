import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import QuickInfo from './components/QuickInfo';
import VehiclesSection from './components/VehiclesSection';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';
import FAQSection from './components/FAQSection';
import WhatsAppCTA from './components/WhatsAppCTA';
import ContactSection from './components/ContactSection';
import LocationSection from './components/LocationSection';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import BookingModal from './components/BookingModal';
import EnquiryModal from './components/EnquiryModal';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  const handleOpenBooking = (vehicle = null, service = null) => {
    setSelectedVehicle(vehicle);
    setSelectedService(service);
    setBookingModalOpen(true);
  };

  const handleOpenEnquiry = () => {
    setEnquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col font-sans antialiased text-charcoal-900 selection:bg-maroon-700 selection:text-white">
      
      {/* Sticky Navigation Header */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenEnquiry={handleOpenEnquiry}
      />

      {/* Main Page Sections */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onOpenEnquiry={handleOpenEnquiry}
        />

        {/* Quick Information Cards */}
        <QuickInfo />

        {/* Fleet Vehicles Section */}
        <VehiclesSection
          onSelectVehicle={(vehicle) => handleOpenBooking(vehicle, null)}
        />

        {/* Services Section */}
        <ServicesSection
          onSelectService={(service) => handleOpenBooking(null, service)}
        />

        {/* About & Trust Highlights with Temple Photo */}
        <AboutSection />

        {/* FAQ Accordion Section */}
        <FAQSection />

        {/* WhatsApp & Call Action Banner */}
        <WhatsAppCTA />

        {/* Contact Section */}
        <ContactSection />

        {/* Location & Interactive Google Maps Section */}
        <LocationSection />
      </main>

      {/* Dark Burgundy Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Fixed Bottom Floating Actions */}
      <FloatingActions />

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        selectedVehicle={selectedVehicle}
        selectedService={selectedService}
      />

      {/* Quick Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
      />

    </div>
  );
}
