const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: String,
  date: String,
  time: String,
  service: String,
  userEmail: String
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
