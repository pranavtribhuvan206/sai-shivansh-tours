/**
 * Centralized Feedback Service for Sai Shivansh Tours & Travels
 * 
 * Flow:
 * 1. PRIMARY: Sends feedback to Cloudflare API (/api/feedback) to insert into Cloudflare D1 SQL database with approved = 0.
 * 2. PRIMARY: Fetches approved customer reviews (approved = 1) from D1 database. Customer email is NEVER returned in public responses.
 * 3. FALLBACK: LocalStorage is used ONLY as an offline transient cache when network/backend API is unreachable.
 */

const LOCAL_STORAGE_KEY = 'sai_shivansh_tours_feedback_v1';
const API_URL = import.meta.env.VITE_FEEDBACK_API_URL || '/api/feedback';

/**
 * Fetch approved customer feedback reviews from Cloudflare D1 database API
 * @returns {Promise<{feedbacks: Array, configured: boolean}>}
 */
export async function getFeedbacks() {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success && Array.isArray(data.feedbacks)) {
        return {
          feedbacks: data.feedbacks,
          configured: data.configured !== false
        };
      }
    }
  } catch (err) {
    console.warn('API endpoint unreachable, checking offline local storage fallback:', err);
  }

  // Fallback to offline localStorage
  return {
    feedbacks: getLocalFeedbacks(),
    configured: false
  };
}

/**
 * Get feedback stored in offline localStorage fallback
 */
export function getLocalFeedbacks() {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        // Return only items stored locally
        return parsed.filter(item => item && item.name && item.message);
      }
    }
  } catch (err) {
    console.error('Error reading feedback from local storage:', err);
  }
  return [];
}

/**
 * Submit customer feedback to Cloudflare D1 backend database
 * @param {Object} feedback 
 * @param {string} feedback.name - Full name
 * @param {string} feedback.email - Email address (stored in DB, never exposed in public review cards)
 * @param {number} feedback.rating - Rating (1 to 5)
 * @param {string} [feedback.tripName] - Optional package / trip name
 * @param {string} feedback.message - Feedback message
 * @returns {Promise<{success: boolean, dbSaved?: boolean, message?: string, error?: string, feedback?: Object}>}
 */
export async function submitFeedback({ name, email, rating, tripName = '', message }) {
  // Client-side pre-validation
  const trimmedName = (name || '').trim();
  const trimmedEmail = (email || '').trim();
  const trimmedMessage = (message || '').trim();
  const numericRating = Number(rating);

  if (!trimmedName || trimmedName.length < 2) {
    return { success: false, error: 'Full name is required (min 2 characters).' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
    return { success: false, error: 'Please enter a valid email address.' };
  }

  if (!numericRating || numericRating < 1 || numericRating > 5) {
    return { success: false, error: 'Please select a rating between 1 and 5 stars.' };
  }

  if (!trimmedMessage || trimmedMessage.length < 5) {
    return { success: false, error: 'Feedback message is required (min 5 characters).' };
  }

  const payload = {
    name: trimmedName,
    email: trimmedEmail,
    rating: numericRating,
    tripName: (tripName || '').trim(),
    message: trimmedMessage
  };

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (res.ok && data.success) {
      // Offline fallback copy
      saveToLocalFallback({
        ...data.feedback,
        email: undefined // Do not save email in local review cards
      });

      return {
        success: true,
        dbSaved: data.dbSaved !== false,
        message: data.message || 'Thank you! Your feedback has been received and will be published once reviewed by our team.',
        feedback: data.feedback
      };
    } else {
      return {
        success: false,
        error: data.error || 'Server validation failed. Please check your inputs.'
      };
    }
  } catch (err) {
    console.warn('Backend API request failed, saving to offline fallback:', err);
    
    // Save to offline fallback
    const offlineItem = {
      id: 'fb-offline-' + Date.now(),
      name: trimmedName,
      rating: numericRating,
      tripName: (tripName || '').trim(),
      message: trimmedMessage,
      createdAt: new Date().toISOString()
    };
    saveToLocalFallback(offlineItem);

    return {
      success: true,
      dbSaved: false,
      message: 'Feedback saved locally (offline mode). Cloudflare D1 database connection required for central storage.',
      feedback: offlineItem
    };
  }
}

/**
 * Save item to local fallback storage
 */
function saveToLocalFallback(item) {
  try {
    const existing = getLocalFeedbacks();
    const updated = [item, ...existing.filter(i => i.id !== item.id)];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated.slice(0, 50)));
  } catch (err) {
    console.error('Error writing to local fallback:', err);
  }
}
