const nodemailer = require('nodemailer');

// Submit contact form
const submitContactForm = async (req, res) => {
    const { name, email, message } = req.body;
    try {
        // Send email logic
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER,
            subject: `Contact Form Submission from ${name}`,
            text: message,
        };

        await transporter.sendMail(mailOptions);
        res.status(201).json({ message: 'Contact form submitted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { submitContactForm };