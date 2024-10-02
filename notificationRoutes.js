const express = require('express');
const { createNotification, getNotifications } = require('../controllers/notificationController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Create a notification
router.post('/', protect, createNotification);

// Get notifications for a user
router.get('/', protect, getNotifications);

module.exports = router;