function errorHandler(err, req, res, next) {
  // Mongoose validation
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ success: false, message: 'Validation failed', errors });
  }

  // Duplicate key (e.g. unique email)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    return res.status(409).json({
      success: false,
      message: `Duplicate value for ${field}`,
    });
  }

  // Invalid ObjectId
  if (err.name === 'CastError') {
    return res.status(400).json({ success: false, message: `Invalid ${err.path}` });
  }

  console.error('[error]', err);
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
}

module.exports = errorHandler;
