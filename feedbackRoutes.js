const express = require('express');
const { submitFeedback } = require('../controllers/feedbackController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Submit feedback
router.post('/', protect, submitFeedback);

// Optional: Get all feedback (if needed)
router.get('/', protect, getFeedback); // Ensure to implement getFeedback in feedbackController

module.exports = router;