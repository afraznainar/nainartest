const Message = require('../models/Message'); // Assuming Message model is defined

// Send a message
const sendMessage = async (req, res) => {
    const { recipientId, content } = req.body;
    try {
        await Message.create(req.user.id, recipientId, content);
        res.status(201).json({ message: 'Message sent' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get messages for a user
const getMessages = async (req, res) => {
    try {
        const messages = await Message.getMessagesByUserId(req.user.id); // Implement this method in the Message model
        res.json(messages);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { sendMessage, getMessages };