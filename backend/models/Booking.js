const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  activity: {
    type: mongoose.Schema.ObjectId,
    ref: 'Activity',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent duplicate bookings
bookingSchema.index({ user: 1, activity: 1 }, { unique: true });

module.exports = mongoose.model('Booking', bookingSchema);