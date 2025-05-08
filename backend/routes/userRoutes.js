const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const {
  register,
  login,
  getMe,
} = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('phone', 'Phone number is required').not().isEmpty(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  register
);

router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  login
);

router.get('/me', protect, getMe);

module.exports = router;