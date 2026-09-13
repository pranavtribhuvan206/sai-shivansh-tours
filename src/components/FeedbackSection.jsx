import React, { useState, useEffect } from 'react';
import { Star, MessageSquareQuote, Send, CheckCircle2, AlertCircle, Sparkles, User, Mail, ThumbsUp } from 'lucide-react';
import { getFeedbacks, submitFeedback } from '../services/feedbackService';
import { VEHICLES } from '../data/vehicles';
import { SERVICES } from '../data/services';

export default function FeedbackSection() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loadingFeedbacks, setLoadingFeedbacks] = useState(true);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [tripName, setTripName] = useState('');
  const [message, setMessage] = useState('');

  // UI State
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    setLoadingFeedbacks(true);
    try {
      const data = await getFeedbacks();
      setFeedbacks(data);
    } catch (err) {
      console.error('Failed to load feedback reviews:', err);
    } finally {
      setLoadingFeedbacks(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Full name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!rating || rating < 1 || rating > 5) {
      newErrors.rating = 'Please select a star rating (1 to 5 stars)';
    }

    if (!message.trim()) {
      newErrors.message = 'Feedback message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await submitFeedback({
        name,
        email,
        rating,
        tripName,
        message,
      });

      if (res.success) {
        setSubmittedSuccess(true);
        // Clear form fields
        setName('');
        setEmail('');
        setRating(0);
        setTripName('');
        setMessage('');
        setErrors({});

        // Reload reviews list to display new feedback
        loadReviews();
      } else {
        setServerError(res.error || 'Failed to submit feedback. Please try again.');
      }
    } catch (err) {
      setServerError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Pre-populated trip package options
  const packageOptions = [
    'Shirdi Temple Pilgrimage Darshan',
    'Shirdi Airport Transfer (SAG)',
    'Shirdi to Pune Cab',
    'Shirdi to Mumbai Cab',
    'Shani Shingnapur Tour',
    'Monthly Car Rental',
    'Group Travel (Tempo Traveller / Urbania)',
    'Outstation Round Trip',
  ];

  return (
    <section id="feedback" className="py-16 sm:py-24 bg-cream-50 relative overflow-hidden">
      {/* Background Decorative Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-maroon-100/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 bg-maroon-100 text-maroon-900 text-xs font-bold px-3.5 py-1.5 rounded-full mb-3 uppercase tracking-wider border border-maroon-200">
            <MessageSquareQuote className="w-4 h-4 text-maroon-700" />
            <span>Traveler Reviews & Feedback</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-maroon-950 font-sans tracking-tight">
            Share Your Experience
          </h2>

          <p className="text-base sm:text-lg text-warmbrown-700 mt-2.5 leading-relaxed">
            Your feedback helps us maintain our high standard of safety, comfort, and reliability for all pilgrims and travelers visiting Shirdi.
          </p>
        </div>

        {/* 2-Column Grid: Left (Form) | Right (Reviews Display) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Column 1: Feedback Form */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-cream-200">
            <div className="mb-6 border-b border-cream-200 pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-maroon-950 flex items-center space-x-2">
                  <span>Send Us Your Feedback</span>
                </h3>
                <p className="text-xs text-warmbrown-600 mt-0.5">
                  We appreciate your valuable review!
                </p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-maroon-50 text-maroon-700 flex items-center justify-center border border-maroon-100 shrink-0">
                <ThumbsUp className="w-5 h-5" />
              </div>
            </div>

            {submittedSuccess ? (
              /* Success Banner */
              <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center space-y-4 animate-modal">
                <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full mx-auto flex items-center justify-center shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl font-bold text-green-900">
                    Thank You for Your Feedback!
                  </h4>
                  <p className="text-xs sm:text-sm text-green-800 leading-relaxed">
                    Your feedback has been successfully submitted and stored. We appreciate you taking the time to share your experience with Sai Shivansh Tours & Travels.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSubmittedSuccess(false)}
                  className="mt-2 inline-flex items-center space-x-2 bg-maroon-800 hover:bg-maroon-900 text-white font-bold text-xs py-2.5 px-5 rounded-xl shadow transition-colors"
                >
                  <span>Submit Another Review</span>
                </button>
              </div>
            ) : (
              /* Feedback Form */
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                
                {serverError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm p-3.5 rounded-xl flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{serverError}</span>
                  </div>
                )}

                {/* Rating Input (1 to 5 Stars) */}
                <div>
                  <label className="block text-xs font-bold text-maroon-950 uppercase tracking-wider mb-2">
                    Overall Experience Rating *
                  </label>
                  
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const active = star <= (hoverRating || rating);
                      return (
                        <button
                          key={star}
                          type="button"
                          onClick={() => {
                            setRating(star);
                            if (errors.rating) setErrors(prev => ({ ...prev, rating: null }));
                          }}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          aria-label={`Rate ${star} out of 5 stars`}
                          className="p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-700 transition-transform duration-150 transform hover:scale-125"
                        >
                          <Star
                            className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                              active
                                ? 'fill-gold-400 text-gold-500 drop-shadow-sm'
                                : 'text-cream-400 fill-cream-100 hover:text-gold-300'
                            }`}
                          />
                        </button>
                      );
                    })}

                    {rating > 0 && (
                      <span className="text-xs font-bold text-maroon-800 ml-2 bg-gold-100 px-2 py-0.5 rounded-full border border-gold-300">
                        {rating} / 5 Stars
                      </span>
                    )}
                  </div>

                  {errors.rating && (
                    <p className="text-xs text-red-600 font-medium mt-1.5 flex items-center space-x-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.rating}</span>
                    </p>
                  )}
                </div>

                {/* Full Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fb-name" className="block text-xs font-bold text-maroon-950 uppercase tracking-wider mb-1.5 flex items-center space-x-1">
                      <User className="w-3.5 h-3.5 text-maroon-700" />
                      <span>Full Name *</span>
                    </label>
                    <input
                      id="fb-name"
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors(prev => ({ ...prev, name: null }));
                      }}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none bg-white transition-all ${
                        errors.name
                          ? 'border-red-400 focus:ring-2 focus:ring-red-500'
                          : 'border-cream-300 focus:ring-2 focus:ring-maroon-700'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-600 font-medium mt-1 flex items-center space-x-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="fb-email" className="block text-xs font-bold text-maroon-950 uppercase tracking-wider mb-1.5 flex items-center space-x-1">
                      <Mail className="w-3.5 h-3.5 text-maroon-700" />
                      <span>Email Address *</span>
                    </label>
                    <input
                      id="fb-email"
                      type="email"
                      required
                      placeholder="e.g. rahul@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors(prev => ({ ...prev, email: null }));
                      }}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none bg-white transition-all ${
                        errors.email
                          ? 'border-red-400 focus:ring-2 focus:ring-red-500'
                          : 'border-cream-300 focus:ring-2 focus:ring-maroon-700'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-600 font-medium mt-1 flex items-center space-x-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Optional Travel / Package Name */}
                <div>
                  <label htmlFor="fb-trip" className="block text-xs font-bold text-maroon-950 uppercase tracking-wider mb-1.5">
                    Travel Service / Vehicle Used (Optional)
                  </label>
                  <select
                    id="fb-trip"
                    value={tripName}
                    onChange={(e) => setTripName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-cream-300 focus:ring-2 focus:ring-maroon-700 text-sm outline-none bg-white text-charcoal-900 transition-all font-medium"
                  >
                    <option value="">-- Select or type below --</option>
                    {packageOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Feedback Message */}
                <div>
                  <label htmlFor="fb-message" className="block text-xs font-bold text-maroon-950 uppercase tracking-wider mb-1.5">
                    Your Feedback / Experience *
                  </label>
                  <textarea
                    id="fb-message"
                    rows="3"
                    required
                    placeholder="Tell us about your driver, vehicle comfort, punctuality, or tour experience..."
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message) setErrors(prev => ({ ...prev, message: null }));
                    }}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none bg-white transition-all resize-none ${
                      errors.message
                        ? 'border-red-400 focus:ring-2 focus:ring-red-500'
                        : 'border-cream-300 focus:ring-2 focus:ring-maroon-700'
                    }`}
                  ></textarea>
                  {errors.message && (
                    <p className="text-xs text-red-600 font-medium mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center space-x-2 bg-maroon-800 hover:bg-maroon-900 disabled:bg-maroon-400 text-white font-bold text-sm py-3.5 px-6 rounded-xl shadow-md transition-all border border-gold-500/30"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Submitting Feedback...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-gold-400" />
                        <span>Submit Feedback</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}
          </div>

          {/* Column 2: What Our Travelers Say (Reviews Display) */}
          <div className="lg:col-span-6 space-y-4">
            
            <div className="flex items-center justify-between px-1">
              <h3 className="text-xl font-bold text-maroon-950 font-sans">
                What Our Travelers Say
              </h3>
              <span className="text-xs font-semibold text-warmbrown-600">
                {feedbacks.length} {feedbacks.length === 1 ? 'Review' : 'Reviews'}
              </span>
            </div>

            {loadingFeedbacks ? (
              /* Loading Skeleton */
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 border border-cream-200 animate-pulse space-y-3">
                    <div className="h-4 bg-cream-200 rounded w-1/3"></div>
                    <div className="h-3 bg-cream-200 rounded w-1/4"></div>
                    <div className="h-12 bg-cream-200 rounded w-full"></div>
                  </div>
                ))}
              </div>
            ) : feedbacks.length === 0 ? (
              /* Clean Empty State - No Fake Reviews */
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-cream-200 shadow-sm text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-cream-100 text-maroon-700 mx-auto flex items-center justify-center border border-cream-300">
                  <Sparkles className="w-8 h-8 text-gold-500" />
                </div>
                <div className="space-y-1.5 max-w-sm mx-auto">
                  <h4 className="text-lg font-bold text-maroon-950">
                    Be the first to share your experience.
                  </h4>
                  <p className="text-xs sm:text-sm text-warmbrown-600 leading-relaxed">
                    Have you recently traveled with Sai Shivansh Tours & Travels in Shirdi? Fill out the form to leave our very first customer review!
                  </p>
                </div>
              </div>
            ) : (
              /* Review Cards List */
              <div className="space-y-4 max-h-[550px] overflow-y-auto pr-1 custom-scrollbar">
                {feedbacks.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl p-5 sm:p-6 border border-cream-200 shadow-sm hover:border-maroon-300 transition-all duration-200"
                  >
                    {/* Header: Name + Stars */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-base font-bold text-maroon-950">
                          {item.name}
                        </h4>
                        
                        {item.tripName && (
                          <span className="inline-block mt-1 text-[11px] font-semibold text-maroon-800 bg-maroon-50 px-2.5 py-0.5 rounded-full border border-maroon-100">
                            {item.tripName}
                          </span>
                        )}
                      </div>

                      {/* Stars */}
                      <div className="flex items-center space-x-1 shrink-0">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-4 h-4 ${
                              s <= item.rating
                                ? 'fill-gold-400 text-gold-500'
                                : 'fill-cream-200 text-cream-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Feedback Message */}
                    <p className="text-xs sm:text-sm text-charcoal-800 mt-3 leading-relaxed font-sans italic bg-cream-50/60 p-3 rounded-xl border border-cream-100">
                      "{item.message}"
                    </p>

                    {/* Date Footer */}
                    <div className="mt-3 text-[11px] text-warmbrown-500 font-medium flex items-center justify-between pt-2 border-t border-cream-100">
                      <span>Verified Guest Review</span>
                      <span>
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })
                          : 'Recently Submitted'}
                      </span>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
