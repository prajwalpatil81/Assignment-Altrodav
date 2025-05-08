const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  location: {
    type: String,
    required: [true, 'Please add a location'],
  },
  dateTime: {
    type: Date,
    required: [true, 'Please add date and time'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Activity', activitySchema);