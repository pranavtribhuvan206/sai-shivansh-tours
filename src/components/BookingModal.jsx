import React, { useState, useEffect } from 'react';
import { X, Send, Calendar, Clock, MapPin, Users, Car, MessageSquare, CheckCircle2, ShieldCheck, MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyInfo';
import { VEHICLES } from '../data/vehicles';
import { SERVICES } from '../data/services';

export default function BookingModal({ isOpen, onClose, selectedVehicle, selectedService }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pickupLocation: '',
    dropLocation: '',
    travelDate: '',
    pickupTime: '',
    passengers: '4 Passengers',
    vehicle: 'Swift Dzire',
    serviceType: 'Shirdi Pilgrimage Travel',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  useEffect(() => {
    if (selectedVehicle) {
      setFormData(prev => ({
        ...prev,
        vehicle: selectedVehicle.name || prev.vehicle,
        passengers: selectedVehicle.seating || prev.passengers
      }));
    }
    if (selectedService) {
      setFormData(prev => ({
        ...prev,
        serviceType: selectedService.title || prev.serviceType
      }));
    }
  }, [selectedVehicle, selectedService]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateWhatsAppMessage = () => {
    const msg = `*NEW BOOKING REQUEST - SAI SHIVANSH TOURS*\n\n` +
      `👤 *Customer Name*: ${formData.name || 'Not provided'}\n` +
      `📞 *Mobile Number*: ${formData.phone || 'Not provided'}\n` +
      `🚗 *Vehicle*: ${formData.vehicle}\n` +
      `🧳 *Service Type*: ${formData.serviceType}\n` +
      `📍 *Pickup Location*: ${formData.pickupLocation || 'Shirdi'}\n` +
      `🏁 *Drop Location*: ${formData.dropLocation || 'Not specified'}\n` +
      `📅 *Travel Date*: ${formData.travelDate || 'Today / Next Available'}\n` +
      `⏰ *Pickup Time*: ${formData.pickupTime || 'Flexible'}\n` +
      `👥 *Passengers*: ${formData.passengers}\n` +
      (formData.message ? `📝 *Notes*: ${formData.message}\n` : '') +
      `\nPlease confirm vehicle availability and send pricing quote. Thank you!`;

    return `https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent(msg)}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const randomRef = 'SST-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(randomRef);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-modal">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-cream-200 relative">
        
        {/* Modal Header */}
        <div className="bg-maroon-950 text-white p-6 sm:p-7 flex items-center justify-between relative overflow-hidden border-b border-maroon-900">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="relative z-10">
            <span className="bg-gold-500 text-maroon-950 text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              {COMPANY_INFO.name}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-sans mt-2">
              Book Your Ride
            </h2>
            <p className="text-xs sm:text-sm text-cream-200 mt-1">
              Fill out your travel details for immediate rate quote and confirmation.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shrink-0 relative z-10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 bg-cream-50/50">
          {submitted ? (
            /* Confirmation State */
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 mx-auto flex items-center justify-center shadow">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-maroon-950">
                  Booking Request Received!
                </h3>
                <p className="text-sm text-warmbrown-700 max-w-md mx-auto">
                  Thank you, <strong className="text-maroon-900">{formData.name}</strong>. Your booking reference is <span className="bg-maroon-50 text-maroon-800 font-extrabold px-2 py-0.5 rounded border border-maroon-200">{bookingRef}</span>. Our Shirdi dispatch team will assist you shortly.
                </p>
              </div>

              {/* Direct WhatsApp CTA Button */}
              <div className="pt-4 border-t border-cream-200 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={generateWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-whatsapp hover:bg-whatsapp-hover text-white font-bold px-6 py-3.5 rounded-xl shadow-md transition-colors text-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-white stroke-none" />
                  <span>Instant Confirm via WhatsApp</span>
                </a>

                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto bg-cream-200 hover:bg-cream-300 text-charcoal-800 font-semibold px-6 py-3.5 rounded-xl transition-colors text-sm"
                >
                  Close & Done
                </button>
              </div>
            </div>
          ) : (
            /* Form Fields */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Row 1: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-maroon-950 uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-maroon-700 text-sm outline-none bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-maroon-950 uppercase tracking-wider mb-1.5">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-maroon-700 text-sm outline-none bg-white transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Vehicle & Service Select */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-maroon-950 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                    <span>Select Vehicle *</span>
                    <Car className="w-3.5 h-3.5 text-maroon-700" />
                  </label>
                  <select
                    name="vehicle"
                    value={formData.vehicle}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-maroon-700 text-sm outline-none bg-white transition-all font-medium text-charcoal-900"
                  >
                    {VEHICLES.map(v => (
                      <option key={v.id} value={v.name}>
                        {v.name} ({v.seating})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-maroon-950 uppercase tracking-wider mb-1.5">
                    Service Type *
                  </label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-maroon-700 text-sm outline-none bg-white transition-all font-medium text-charcoal-900"
                  >
                    {SERVICES.map(s => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3: Pickup Location & Drop Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-maroon-950 uppercase tracking-wider mb-1.5 flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-maroon-700" />
                    <span>Pickup Location *</span>
                  </label>
                  <input
                    type="text"
                    name="pickupLocation"
                    required
                    placeholder="e.g. Shirdi Hotel / Airport / Station"
                    value={formData.pickupLocation}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-maroon-700 text-sm outline-none bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-maroon-950 uppercase tracking-wider mb-1.5 flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-maroon-700" />
                    <span>Drop Location *</span>
                  </label>
                  <input
                    type="text"
                    name="dropLocation"
                    required
                    placeholder="e.g. Pune / Shanisingnapur / Airport"
                    value={formData.dropLocation}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-maroon-700 text-sm outline-none bg-white transition-all"
                  />
                </div>
              </div>

              {/* Row 4: Travel Date, Pickup Time, Passenger Count */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-maroon-950 uppercase tracking-wider mb-1.5 flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-maroon-700" />
                    <span>Travel Date *</span>
                  </label>
                  <input
                    type="date"
                    name="travelDate"
                    required
                    value={formData.travelDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-maroon-700 text-sm outline-none bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-maroon-950 uppercase tracking-wider mb-1.5 flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-maroon-700" />
                    <span>Pickup Time</span>
                  </label>
                  <input
                    type="time"
                    name="pickupTime"
                    value={formData.pickupTime}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-maroon-700 text-sm outline-none bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-maroon-950 uppercase tracking-wider mb-1.5 flex items-center space-x-1">
                    <Users className="w-3.5 h-3.5 text-maroon-700" />
                    <span>Passengers</span>
                  </label>
                  <select
                    name="passengers"
                    value={formData.passengers}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-maroon-700 text-sm outline-none bg-white transition-all font-medium text-charcoal-900"
                  >
                    <option value="1-3 Passengers">1-3 Passengers</option>
                    <option value="4-6 Passengers">4-6 Passengers</option>
                    <option value="7-9 Passengers">7-9 Passengers</option>
                    <option value="12-17 Passengers">12-17 Passengers</option>
                    <option value="17-26 Large Group">17-26 Large Group</option>
                  </select>
                </div>
              </div>

              {/* Message / Special Instructions */}
              <div>
                <label className="block text-xs font-bold text-maroon-950 uppercase tracking-wider mb-1.5 flex items-center space-x-1">
                  <MessageSquare className="w-3.5 h-3.5 text-maroon-700" />
                  <span>Additional Instructions / Notes</span>
                </label>
                <textarea
                  name="message"
                  rows="2"
                  placeholder="e.g. Need child seat, extra luggage space, flight number..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl border border-cream-300 focus:ring-2 focus:ring-maroon-700 text-sm outline-none bg-white transition-all resize-none"
                ></textarea>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  className="w-full sm:flex-1 inline-flex items-center justify-center space-x-2 bg-maroon-800 hover:bg-maroon-900 text-white font-bold text-sm py-3.5 px-6 rounded-xl shadow-md transition-all border border-gold-500/30"
                >
                  <Send className="w-4 h-4 text-gold-400" />
                  <span>Send Booking Request</span>
                </button>

                <a
                  href={generateWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 inline-flex items-center justify-center space-x-2 bg-whatsapp hover:bg-whatsapp-hover text-white font-bold text-sm py-3.5 px-6 rounded-xl shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white stroke-none" />
                  <span>Book via WhatsApp</span>
                </a>
              </div>

              <div className="text-center pt-1">
                <span className="inline-flex items-center space-x-1 text-[11px] text-warmbrown-600 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-maroon-700" />
                  <span>No advance fee for inquiry • Standard rates ₹11–₹25/km • Monthly rental available</span>
                </span>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
