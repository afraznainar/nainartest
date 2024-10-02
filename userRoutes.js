const express = require('express');
const { registerNewUser, loginUserController, updateUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// User registration
router.post('/register', registerNewUser);

// User login
router.post('/login', loginUserController);

// Update user profile
router.put('/profile', protect, updateUserProfile);

module.exports = router;