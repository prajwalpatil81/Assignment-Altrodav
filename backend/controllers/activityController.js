const Activity = require('../models/Activity');

// @desc    Get all activities
// @route   GET /api/activities
// @access  Public
exports.getActivities = async (req, res, next) => {
  try {
    const activities = await Activity.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: activities.length,
      data: activities,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get single activity
// @route   GET /api/activities/:id
// @access  Public
exports.getActivity = async (req, res, next) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({ msg: 'Activity not found' });
    }
    res.status(200).json({
      success: true,
      data: activity,
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Activity not found' });
    }
    res.status(500).send('Server Error');
  }
};