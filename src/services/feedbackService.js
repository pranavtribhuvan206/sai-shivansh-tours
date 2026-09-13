/**
 * Feedback Service for Sai Shivansh Tours & Travels
 * 
 * Manages submission and retrieval of customer feedback.
 * Operates with a dual-persistence strategy:
 * 1. Sends data to Cloudflare API (/api/feedback or VITE_FEEDBACK_API_URL) if available.
 * 2. Saves to localStorage as a client-side store so feedback remains immediately persistent across sessions.
 */

const LOCAL_STORAGE_KEY = 'sai_shivansh_tours_feedback_v1';
const API_URL = import.meta.env.VITE_FEEDBACK_API_URL || '/api/feedback';

/**
 * Get stored feedback reviews
 * @returns {Promise<Array>} List of feedback objects
 */
export async function getFeedbacks() {
  try {
    // Attempt backend fetch if deployed with API endpoint
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data.feedbacks)) {
        return data.feedbacks;
      }
    }
  } catch (err) {
    // API endpoint not configured or offline - fallback to local storage
  }

  // Fallback to LocalStorage
  return getLocalFeedbacks();
}

/**
 * Helper to get feedback stored locally
 */
export function getLocalFeedbacks() {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading feedback from local storage:', err);
  }
  return [];
}

/**
 * Submit customer feedback
 * @param {Object} feedback 
 * @param {string} feedback.name - Full name
 * @param {string} feedback.email - Email address
 * @param {number} feedback.rating - Rating (1 to 5)
 * @param {string} [feedback.tripName] - Optional package / trip name
 * @param {string} feedback.message - Feedback message
 * @returns {Promise<{success: boolean, feedback?: Object, error?: string}>}
 */
export async function submitFeedback({ name, email, rating, tripName = '', message }) {
  // Input Validation
  const trimmedName = (name || '').trim();
  const trimmedEmail = (email || '').trim();
  const trimmedMessage = (message || '').trim();
  const numericRating = Number(rating);

  if (!trimmedName) {
    return { success: false, error: 'Full name is required.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
    return { success: false, error: 'Please provide a valid email address.' };
  }

  if (!numericRating || numericRating < 1 || numericRating > 5) {
    return { success: false, error: 'Please select a rating from 1 to 5 stars.' };
  }

  if (!trimmedMessage) {
    return { success: false, error: 'Feedback message is required.' };
  }

  const newFeedback = {
    id: 'fb-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    name: trimmedName,
    email: trimmedEmail,
    rating: numericRating,
    tripName: (tripName || '').trim(),
    message: trimmedMessage,
    createdAt: new Date().toISOString(),
  };

  // Try submitting to API
  let apiSuccess = false;
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newFeedback)
    });

    if (res.ok) {
      apiSuccess = true;
    }
  } catch (err) {
    // API server call failed/not set up - will use localStorage
  }

  // Always update local storage for immediate persistence
  try {
    const existing = getLocalFeedbacks();
    const updated = [newFeedback, ...existing];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error saving feedback locally:', err);
  }

  return {
    success: true,
    feedback: newFeedback,
    apiSynced: apiSuccess
  };
}
