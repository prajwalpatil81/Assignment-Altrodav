const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
  createBooking,
  getMyBookings,
} = require('../controllers/bookingController');

router.post('/', protect, createBooking);
router.get('/mybookings', protect, getMyBookings);

module.exports = router;