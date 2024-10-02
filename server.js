const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Database connection
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const contactRoutes = require('./routes/contactRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const { apiLimiter } = require('./middleware/rateLimitMiddleware'); // Rate limiting middleware

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Create an Express application
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies
app.use(apiLimiter); // Apply rate limiting middleware

// Define routes
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/feedback', feedbackRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 5000; // Use the port from environment variables or default to 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});