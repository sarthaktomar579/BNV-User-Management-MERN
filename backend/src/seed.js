/**
 * Seed script — populates the database with demo users.
 * Usage: node src/seed.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');

const avatar = (id) => `https://i.pravatar.cc/200?img=${id}`;

const demoUsers = [
  { firstName: 'Sarthak', lastName: 'Tomar',  email: 'sarthak.tomar@example.com', phone: '9876543210', gender: 'Male',   location: 'Pune, India',      status: 'Active',   profileImage: avatar(11) },
  { firstName: 'Aarav',   lastName: 'Sharma', email: 'aarav.sharma@example.com',  phone: '9123456780', gender: 'Male',   location: 'Mumbai, India',    status: 'Active',   profileImage: avatar(12) },
  { firstName: 'Priya',   lastName: 'Verma',  email: 'priya.verma@example.com',   phone: '9988776655', gender: 'Female', location: 'Bengaluru, India', status: 'Active',   profileImage: avatar(5)  },
  { firstName: 'Rohan',   lastName: 'Kapoor', email: 'rohan.kapoor@example.com',  phone: '9090909090', gender: 'Male',   location: 'Delhi, India',     status: 'Inactive', profileImage: avatar(13) },
  { firstName: 'Isha',    lastName: 'Gupta',  email: 'isha.gupta@example.com',    phone: '9876501234', gender: 'Female', location: 'Hyderabad, India', status: 'Active',   profileImage: avatar(9)  },
  { firstName: 'Karan',   lastName: 'Mehta',  email: 'karan.mehta@example.com',   phone: '9001234567', gender: 'Male',   location: 'Ahmedabad, India', status: 'Active',   profileImage: avatar(14) },
  { firstName: 'Anaya',   lastName: 'Singh',  email: 'anaya.singh@example.com',   phone: '9112233445', gender: 'Female', location: 'Jaipur, India',    status: 'Active',   profileImage: avatar(16) },
  { firstName: 'Vivaan',  lastName: 'Iyer',   email: 'vivaan.iyer@example.com',   phone: '9445566778', gender: 'Male',   location: 'Chennai, India',   status: 'Inactive', profileImage: avatar(15) },
  { firstName: 'Diya',    lastName: 'Patel',  email: 'diya.patel@example.com',    phone: '9009876543', gender: 'Female', location: 'Surat, India',     status: 'Active',   profileImage: avatar(20) },
  { firstName: 'Aditya',  lastName: 'Reddy',  email: 'aditya.reddy@example.com',  phone: '9889988998', gender: 'Male',   location: 'Pune, India',      status: 'Active',   profileImage: avatar(17) },
  { firstName: 'Meera',   lastName: 'Joshi',  email: 'meera.joshi@example.com',   phone: '9778899001', gender: 'Female', location: 'Kolkata, India',   status: 'Active',   profileImage: avatar(25) },
  { firstName: 'Arjun',   lastName: 'Nair',   email: 'arjun.nair@example.com',    phone: '9667788990', gender: 'Male',   location: 'Kochi, India',     status: 'Active',   profileImage: avatar(33) },
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
