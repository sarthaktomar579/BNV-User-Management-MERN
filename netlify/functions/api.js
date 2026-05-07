/**
 * Netlify Function entry point — wraps the existing Express app
 * (defined in backend/src/app.js) so the same codebase can run as
 * either a long-running server (Render / local dev) or a Netlify
 * Function (serverless).
 *
 * The MongoDB connection is established lazily on the first request
 * and reused across warm invocations.
 */
const serverless = require('serverless-http');
const app = require('../../backend/src/app');
const connectDB = require('../../backend/src/config/db');

// Recover the original request URL (e.g. /api/users) so Express's mounted
// routes (/api/users) match. Netlify rewrites the path to
// /.netlify/functions/api before invoking the function, which would
// otherwise hide the original path from the Express router. We try multiple
// signals on the event object for resilience across Netlify deploy types.
function recoverOriginalUrl(event) {
  if (!event) return null;

  if (event.rawUrl) {
    try {
      const u = new URL(event.rawUrl);
      return u.pathname + (u.search || '');
    } catch (_) {
      // fall through
    }
  }

  if (event.path) {
    const stripped = event.path.replace(/^\/?\.netlify\/functions\/api/, '');
    const path = stripped.startsWith('/') ? stripped : `/${stripped}`;
    const qs = event.rawQueryString
      ? `?${event.rawQueryString}`
      : event.queryStringParameters
      ? `?${new URLSearchParams(event.queryStringParameters).toString()}`
      : '';
    return path + qs;
  }

  return null;
}

const wrappedHandler = serverless(app, {
  request: (req, event) => {
    const original = recoverOriginalUrl(event);
    if (original) req.url = original;
  },
});

let connectionPromise;

exports.handler = async (event, context) => {
  // Don't wait for the event loop to drain (mongoose keeps sockets alive)
  context.callbackWaitsForEmptyEventLoop = false;

  // Diagnostic: log what Netlify is actually delivering to the function so
  // we can debug method/path issues from the Functions log in the dashboard.
  console.log(
    `[fn] ${event.httpMethod || '?'} path=${event.path} rawUrl=${event.rawUrl} -> recovered=${recoverOriginalUrl(event)}`
  );

  if (!connectionPromise) {
    connectionPromise = connectDB().catch((err) => {
      connectionPromise = undefined;
      throw err;
    });
  }
  await connectionPromise;

  return wrappedHandler(event, context);
};
