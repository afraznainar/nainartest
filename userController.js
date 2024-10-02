const User = require('../models/User'); // Assuming User model is defined
const { registerUser, loginUser, generateToken } = require('../middleware/auth');
const nodemailer = require('nodemailer');

// Register a new user
const registerNewUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        await registerUser(username, email, password);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Login user
const loginUserController = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await loginUser(email, password);
        const token = generateToken(user.id);
        res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

// Update user profile
const updateUserProfile = async (req, res) => {
    const { username, email, profilePicture } = req.body;
    const sql = 'UPDATE users SET username = ?, email = ?, profile_picture = ? WHERE id = ?';
    try {
        await User.query(sql, [username, email, profilePicture, req.user.id]);
        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Send verification email (example)
const sendVerificationEmail = async (user) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Verify your email',
        text: 'Please verify your email by clicking the link.',
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { registerNewUser, loginUserController, updateUserProfile };