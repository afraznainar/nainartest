const db = require('../config/db');

const Feedback = {
    // Create new feedback
    create: (userId, feedback) => {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO feedback (user_id, feedback) VALUES (?, ?)';
            db.query(sql, [userId, feedback], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    },

    // Get all feedback (optional)
    getAll: () => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM feedback';
            db.query(sql, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },
};

module.exports = Feedback;