const db = require('../config/db');

const User = {
    // Create a new user
    create: (username, email, password) => {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
            db.query(sql, [username, email, password], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    },

    // Find a user by email
    findByEmail: (email) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM users WHERE email = ?';
            db.query(sql, [email], (err, results) => {
                if (err) return reject(err);
                resolve(results[0]); // Return the first user found
            });
        });
    },

    // Update user profile
    update: (id, username, email, profilePicture) => {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE users SET username = ?, email = ?, profile_picture = ? WHERE id = ?';
            db.query(sql, [username, email, profilePicture, id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    },

    // Get user by ID
    findById: (id) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM users WHERE id = ?';
            db.query(sql, [id], (err, results) => {
                if (err) return reject(err);
                resolve(results[0]); // Return the first user found
            });
        });
    },
};

module.exports = User;