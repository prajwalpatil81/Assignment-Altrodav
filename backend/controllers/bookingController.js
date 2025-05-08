const Booking = require('../models/Booking');
const Activity = require('../models/Activity');

// @desc    Book an activity
// @route   POST /api/bookings
// @access  Private
exports.createBooking = async (req, res, next) => {
  try {
    // Check if activity exists
    const activity = await Activity.findById(req.body.activityId);
    if (!activity) {
      return res.status(404).json({ msg: 'Activity not found' });
    }

    // Check if already booked
    const existingBooking = await Booking.findOne({
      user: req.user.id,
      activity: req.body.activityId,
    });
    if (existingBooking) {
      return res.status(400).json({ msg: 'Activity already booked' });
    }

    const booking = new Booking({
      user: req.user.id,
      activity: req.body.activityId,
    });

    await booking.save();

    // Populate activity details in the response
    await booking.populate('activity');

    res.status(201).json({
      success: true,
      data: booking,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get logged in user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
exports.getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('activity');
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};