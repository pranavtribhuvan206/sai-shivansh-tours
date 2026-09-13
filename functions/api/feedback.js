/**
 * Cloudflare Pages Function API Endpoint for Centralized Feedback
 * Path: /api/feedback
 * 
 * Features:
 * 1. Server-side validation & sanitization (name, email, rating, tripName, message).
 * 2. Moderation Workflow: Submissions are inserted with `approved = 0`.
 * 3. Privacy Protection: Customer email is stored securely in D1 but NEVER returned in public GET responses.
 * 4. Database Integration: Queries Cloudflare D1 SQL binding 'DB'.
 */

// Helper function to sanitize string inputs and prevent XSS
function sanitizeInput(str, maxLength = 255) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<[^>]*>?/gm, '') // Strip HTML tags
    .replace(/[\r\n\t]+/g, ' ') // Normalize whitespace
    .trim()
    .slice(0, maxLength);
}

// Helper to validate email format
function isValidEmail(email) {
  if (typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim()) && email.length <= 150;
}

export async function onRequestGet(context) {
  const { env } = context;

  // Check if Cloudflare D1 Database binding 'DB' is present
  if (env.DB) {
    try {
      // NOTE: Customer email is intentionally EXCLUDED from public GET response for privacy!
      const { results } = await env.DB.prepare(
        `SELECT id, name, rating, trip_name AS tripName, message, created_at AS createdAt 
         FROM feedbacks 
         WHERE approved = 1 
         ORDER BY created_at DESC 
         LIMIT 50`
      ).all();

      return new Response(JSON.stringify({
        success: true,
        configured: true,
        feedbacks: results || []
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=60, s-maxage=300'
        }
      });
    } catch (err) {
      return new Response(JSON.stringify({
        success: false,
        configured: true,
        error: 'Database query failure: ' + err.message,
        feedbacks: []
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  // D1 Database binding 'DB' is not yet configured in Cloudflare Dashboard
  return new Response(JSON.stringify({
    success: true,
    configured: false,
    message: "Cloudflare D1 database binding 'DB' is not yet connected.",
    feedbacks: []
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    // Parse JSON payload safely
    let body;
    try {
      body = await request.json();
    } catch (parseErr) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid JSON payload' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const rawName = body.name;
    const rawEmail = body.email;
    const rawRating = body.rating;
    const rawTripName = body.tripName;
    const rawMessage = body.message;

    // Server-Side Input Validation
    const name = sanitizeInput(rawName, 100);
    const email = (rawEmail || '').trim().toLowerCase();
    const rating = Number(rawRating);
    const tripName = sanitizeInput(rawTripName, 100);
    const message = sanitizeInput(rawMessage, 1000);

    if (!name || name.length < 2) {
      return new Response(JSON.stringify({ success: false, error: 'Full name is required (min 2 characters).' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!email || !isValidEmail(email)) {
      return new Response(JSON.stringify({ success: false, error: 'A valid email address is required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return new Response(JSON.stringify({ success: false, error: 'Rating must be an integer between 1 and 5 stars.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!message || message.length < 5) {
      return new Response(JSON.stringify({ success: false, error: 'Feedback message is required (min 5 characters).' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const id = 'fb-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);
    const createdAt = new Date().toISOString();
    // Default approval state is 0 (pending review)
    const approved = 0;

    // Insert into Cloudflare D1 Database if binding 'DB' exists
    if (env.DB) {
      await env.DB.prepare(
        `INSERT INTO feedbacks (id, name, email, rating, trip_name, message, created_at, approved)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
      ).bind(
        id,
        name,
        email,
        rating,
        tripName,
        message,
        createdAt,
        approved
      ).run();

      return new Response(JSON.stringify({
        success: true,
        dbSaved: true,
        message: 'Thank you! Your feedback has been received and will be published once reviewed by our team.',
        feedback: {
          id,
          name,
          rating,
          tripName,
          message,
          createdAt,
          approved: 0
        }
      }), {
        status: 201,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    // D1 binding 'DB' is not yet connected
    return new Response(JSON.stringify({
      success: true,
      dbSaved: false,
      message: 'Feedback received locally. Cloudflare D1 database binding "DB" needs to be connected in Cloudflare Dashboard.',
      feedback: {
        id,
        name,
        rating,
        tripName,
        message,
        createdAt,
        approved: 0
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });

  } catch (err) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Server error processing feedback submission: ' + err.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
