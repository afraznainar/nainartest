const db = require('../config/db');

const Message = {
    // Create a new message
    create: (senderId, recipientId, content) => {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO messages (sender_id, recipient_id, content) VALUES (?, ?, ?)';
            db.query(sql, [senderId, recipientId, content], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    },

    // Get messages by user ID
    getMessagesByUserId: (userId) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM messages WHERE recipient_id = ? OR sender_id = ?';
            db.query(sql, [userId, userId], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },
};

module.exports = Message;