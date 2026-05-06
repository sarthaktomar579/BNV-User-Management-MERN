/**
 * Seed script — populates the database with demo users.
 * Usage: node src/seed.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');

const demoUsers = [
  { firstName: 'Sarthak',  lastName: 'Tomar',    email: 'sarthak.tomar@example.com',  phone: '9876543210', gender: 'Male',   city: 'Pune',      country: 'India',  status: 'Active' },
  { firstName: 'Aarav',    lastName: 'Sharma',   email: 'aarav.sharma@example.com',   phone: '9123456780', gender: 'Male',   city: 'Mumbai',    country: 'India',  status: 'Active' },
  { firstName: 'Priya',    lastName: 'Verma',    email: 'priya.verma@example.com',    phone: '9988776655', gender: 'Female', city: 'Bengaluru', country: 'India',  status: 'Active' },
  { firstName: 'Rohan',    lastName: 'Kapoor',   email: 'rohan.kapoor@example.com',   phone: '9090909090', gender: 'Male',   city: 'Delhi',     country: 'India',  status: 'Inactive' },
  { firstName: 'Isha',     lastName: 'Gupta',    email: 'isha.gupta@example.com',     phone: '9876501234', gender: 'Female', city: 'Hyderabad', country: 'India',  status: 'Active' },
  { firstName: 'Karan',    lastName: 'Mehta',    email: 'karan.mehta@example.com',    phone: '9001234567', gender: 'Male',   city: 'Ahmedabad', country: 'India',  status: 'Active' },
  { firstName: 'Anaya',    lastName: 'Singh',    email: 'anaya.singh@example.com',    phone: '9112233445', gender: 'Female', city: 'Jaipur',    country: 'India',  status: 'Active' },
  { firstName: 'Vivaan',   lastName: 'Iyer',     email: 'vivaan.iyer@example.com',    phone: '9445566778', gender: 'Male',   city: 'Chennai',   country: 'India',  status: 'Inactive' },
  { firstName: 'Diya',     lastName: 'Patel',    email: 'diya.patel@example.com',     phone: '9009876543', gender: 'Female', city: 'Surat',     country: 'India',  status: 'Active' },
  { firstName: 'Aditya',   lastName: 'Reddy',    email: 'aditya.reddy@example.com',   phone: '9889988998', gender: 'Male',   city: 'Pune',      country: 'India',  status: 'Active' },
  { firstName: 'Meera',    lastName: 'Joshi',    email: 'meera.joshi@example.com',    phone: '9778899001', gender: 'Female', city: 'Kolkata',   country: 'India',  status: 'Active' },
  { firstName: 'Arjun',    lastName: 'Nair',     email: 'arjun.nair@example.com',     phone: '9667788990', gender: 'Male',   city: 'Kochi',     country: 'India',  status: 'Active' },
];

(async () => {
  try {
    await connectDB();
    await User.deleteMany({});
    const created = await User.insertMany(demoUsers);
    console.log(`[seed] Inserted ${created.length} demo users.`);
  } catch (err) {
    console.error('[seed] Error:', err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
})();
