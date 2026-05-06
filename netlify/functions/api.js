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

// Recover the original request URL (e.g. /api/users) from event.rawUrl so
// Express's mounted routes (/api/users) match. Netlify rewrites the path
// to /.netlify/functions/api/* before invoking, which would otherwise hide
// the original path from the Express router.
const wrappedHandler = serverless(app, {
  request: (req, event) => {
    if (event && event.rawUrl) {
      try {
        const u = new URL(event.rawUrl);
        req.url = u.pathname + u.search;
      } catch (_) {
        // fall back to the rewritten path
      }
    }
  },
});

let connectionPromise;

exports.handler = async (event, context) => {
  // Don't wait for the event loop to drain (mongoose keeps sockets alive)
  context.callbackWaitsForEmptyEventLoop = false;

  if (!connectionPromise) {
    connectionPromise = connectDB().catch((err) => {
      connectionPromise = undefined;
      throw err;
    });
  }
  await connectionPromise;

  return wrappedHandler(event, context);
};
