const Feedback = require('../models/Feedback'); // Assuming Feedback model is defined

// Submit feedback
const submitFeedback = async (req, res) => {
    const { feedback } = req.body;
    try {
        await Feedback.create(req.user.id, feedback);
        res.status(201).json({ message: 'Feedback submitted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get feedback (optional)
const getFeedback = async (req, res) => {
    try {
        const feedbacks = await Feedback.getAll(); // Implement this method in the Feedback model
        res.json(feedbacks);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { submitFeedback, getFeedback };