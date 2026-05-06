const mongoose = require('mongoose');

// Cache the connection on the global object so warm Lambda / Netlify Function
// invocations reuse the same Mongoose connection instead of dialing MongoDB
// on every request. Falls back to a single regular connection in long-running
// server mode (where this is established once on boot anyway).
let cached = global._bnvMongoose;
if (!cached) {
  cached = global._bnvMongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI is not defined in environment variables');
  }

  if (!cached.promise) {
    mongoose.set('strictQuery', true);
    cached.promise = mongoose
      .connect(uri, {
        // serverless-friendly: don't queue commands while disconnected
        bufferCommands: false,
      })
      .then((m) => {
        console.log('[db] MongoDB connected');
        return m;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }
  return cached.conn;
}

module.exports = connectDB;
