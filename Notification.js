const db = require('../config/db');

const Notification = {
    // Create a new notification
    create: (userId, message) => {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO notifications (user_id, message) VALUES (?, ?)';
            db.query(sql, [userId, message], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    },

    // Get notifications by user ID
    getByUserId: (userId) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM notifications WHERE user_id = ?';
            db.query(sql, [userId], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },
};

module.exports = Notification;