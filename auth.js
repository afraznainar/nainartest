const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const { query } = require('../config/db');

dotenv.config();

// Middleware to protect routes
const protect = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.startsWith('Bearer') ? req.headers.authorization.split(' ')[1] : null;
    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id }; // Attach user ID to request object
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};

// Function to generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// User registration
const registerUser = async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    return query(sql, [username, email, hashedPassword]);
};

// User login
const loginUser = async (email, password) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    const results = await query(sql, [email]);
    if (results.length === 0) {
        throw new Error('User not found');
    }
    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }
    return user;
};

module.exports = { protect, generateToken, registerUser, loginUser };