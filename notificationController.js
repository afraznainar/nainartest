const Notification = require('../models/Notification'); // Assuming Notification model is defined

// Create a notification
const createNotification = async (req, res) => {
    const { message } = req.body;
    try {
        await Notification.create(req.user.id, message);
        res.status(201).json({ message: 'Notification created' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get notifications for a user
const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.getByUserId(req.user.id); // Implement this method in the Notification model
        res.json(notifications);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createNotification, getNotifications };