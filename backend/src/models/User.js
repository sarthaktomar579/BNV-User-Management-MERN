const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      minlength: 1,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address'],
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      trim: true,
      match: [/^[0-9]{10}$/, 'Phone must be a 10-digit number'],
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      default: 'Other',
    },
    location: {
      type: String,
      trim: true,
      maxlength: 160,
      default: '',
    },
    profileImage: {
      type: String,
      trim: true,
      maxlength: 500,
      default: '',
    },
    // Legacy fields kept for backward compatibility with existing documents.
    // The form now collects a single `location` value but older records may
    // still have `city` / `country` populated.
    city: {
      type: String,
      trim: true,
      maxlength: 80,
    },
    country: {
      type: String,
      trim: true,
      maxlength: 80,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
  },
  { timestamps: true }
);

userSchema.index({ firstName: 'text', lastName: 'text', email: 'text', location: 'text', city: 'text' });

module.exports = mongoose.model('User', userSchema);
