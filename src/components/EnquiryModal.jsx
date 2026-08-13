import React, { useState } from 'react';
import { X, Send, CheckCircle2, MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyInfo';

export default function EnquiryModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    queryType: 'Shirdi Pilgrimage Tour',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const generateWhatsAppMessage = () => {
    const msg = `*NEW ENQUIRY - SAI SHIVANSH TOURS*\n\n` +
      `👤 *Name*: ${formData.name || 'Not provided'}\n` +
      `📞 *Phone*: ${formData.phone || 'Not provided'}\n` +
      `🏷️ *Topic*: ${formData.queryType}\n` +
      `📝 *Message*: ${formData.message || 'I would like to enquire about vehicle rental and tour rates.'}\n\n` +
      `Please contact me back with details.`;

    return `https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-modal">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-cream-200 relative">
        
        {/* Modal Header */}
        <div className="bg-maroon-950 text-white p-6 flex items-center justify-between border-b border-maroon-900">
          <div>
            <span className="bg-gold-500 text-maroon-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              24/7 Support
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-sans mt-1">
              General Travel Enquiry
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 bg-cream-50/50">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-maroon-950">Enquiry Submitted!</h3>
              <p className="text-sm text-warmbrown-700">
                Our Shirdi support agent will get back to you shortly at <strong className="text-maroon-900">{formData.phone}</strong>.
              </p>
              <button
                onClick={() => { setSubmitted(false); onClose(); }}
                className="bg-maroon-800 hover:bg-maroon-900 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-maroon-950 uppercase tracking-wider mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-maroon-700 text-sm outline-none bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-maroon-950 uppercase tracking-wider mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="10-digit mobile number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-maroon-700 text-sm outline-none bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-maroon-950 uppercase tracking-wider mb-1">
                  Topic of Enquiry
                </label>
                <select
                  name="queryType"
                  value={formData.queryType}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-maroon-700 text-sm outline-none bg-white font-medium text-charcoal-900"
                >
                  <option value="Shirdi Pilgrimage Tour">Shirdi Pilgrimage Tour</option>
                  <option value="Vehicle Rate Inquiry (₹11-₹25/km)">Vehicle Rate Inquiry (₹11-₹25/km)</option>
                  <option value="Monthly Vehicle Rental (₹35,000/mo)">Monthly Vehicle Rental (₹35,000/mo)</option>
                  <option value="Airport Transfer">Airport Transfer</option>
                  <option value="Outstation State Travel">Outstation State Travel</option>
                  <option value="Large Group / Tempo Traveller">Large Group / Tempo Traveller</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-maroon-950 uppercase tracking-wider mb-1">
                  Message / Details
                </label>
                <textarea
                  name="message"
                  rows="3"
                  placeholder="Type your requirements or destination details..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl border border-cream-300 focus:ring-2 focus:ring-maroon-700 text-sm outline-none bg-white resize-none"
                ></textarea>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  className="w-full bg-maroon-800 hover:bg-maroon-900 text-white font-bold py-3 px-4 rounded-xl text-sm transition-colors flex items-center justify-center space-x-2 border border-gold-500/30"
                >
                  <Send className="w-4 h-4 text-gold-400" />
                  <span>Submit Online Enquiry</span>
                </button>

                <a
                  href={generateWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-whatsapp hover:bg-whatsapp-hover text-white font-bold py-3 px-4 rounded-xl text-sm transition-colors flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white stroke-none" />
                  <span>Ask Directly on WhatsApp</span>
                </a>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
