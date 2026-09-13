/**
 * Cloudflare Pages Function API Endpoint for Feedback Storage
 * Path: /api/feedback
 * 
 * Works automatically when deployed on Cloudflare Pages / Workers.
 * Configured to support Cloudflare D1 SQL database or KV Store bindings if present.
 */

export async function onRequestGet(context) {
  const { env } = context;

  // 1. If Cloudflare D1 Database binding 'DB' is available
  if (env.DB) {
    try {
      const { results } = await env.DB.prepare(
        'SELECT id, name, rating, tripName, message, createdAt FROM feedbacks ORDER BY createdAt DESC LIMIT 50'
      ).all();
      return new Response(JSON.stringify({ feedbacks: results }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    } catch (err) {
      console.error('D1 Query Error:', err);
    }
  }

  // 2. If Cloudflare KV binding 'FEEDBACK_KV' is available
  if (env.FEEDBACK_KV) {
    try {
      const stored = await env.FEEDBACK_KV.get('all_feedbacks');
      const feedbacks = stored ? JSON.parse(stored) : [];
      return new Response(JSON.stringify({ feedbacks }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    } catch (err) {
      console.error('KV Query Error:', err);
    }
  }

  // Fallback empty response
  return new Response(JSON.stringify({ feedbacks: [] }), {
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const data = await request.json();
    const { name, email, rating, tripName, message } = data;

    if (!name || !email || !rating || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const newFeedback = {
      id: data.id || ('fb-' + Date.now()),
      name: String(name).trim(),
      email: String(email).trim(),
      rating: Number(rating),
      tripName: String(tripName || '').trim(),
      message: String(message).trim(),
      createdAt: data.createdAt || new Date().toISOString()
    };

    // 1. Save to Cloudflare D1 Database if binding 'DB' exists
    if (env.DB) {
      await env.DB.prepare(
        'INSERT INTO feedbacks (id, name, email, rating, tripName, message, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)'
      ).bind(
        newFeedback.id,
        newFeedback.name,
        newFeedback.email,
        newFeedback.rating,
        newFeedback.tripName,
        newFeedback.message,
        newFeedback.createdAt
      ).run();
    }

    // 2. Save to Cloudflare KV Store if binding 'FEEDBACK_KV' exists
    if (env.FEEDBACK_KV) {
      const stored = await env.FEEDBACK_KV.get('all_feedbacks');
      const feedbacks = stored ? JSON.parse(stored) : [];
      feedbacks.unshift(newFeedback);
      await env.FEEDBACK_KV.put('all_feedbacks', JSON.stringify(feedbacks.slice(0, 100)));
    }

    return new Response(JSON.stringify({ success: true, feedback: newFeedback }), {
      status: 201,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message || 'Internal Server Error' }), {
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
