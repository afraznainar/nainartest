const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
    service: 'Gmail', // You can change this to your email service provider
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Function to send a plain text email
const sendPlainEmail = async (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error('Error sending email:', error.message);
        throw new Error('Email sending failed');
    }
};

// Function to send an HTML email
const sendHtmlEmail = async (to, subject, html) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`HTML email sent to ${to}`);
    } catch (error) {
        console.error('Error sending HTML email:', error.message);
        throw new Error('HTML email sending failed');
    }
};

// Function to send a verification email
const sendVerificationEmail = async (to, verificationLink) => {
    const subject = 'Verify Your Email';
    const html = `<p>Please verify your email by clicking the link below:</p>
                  <a href="${verificationLink}">Verify Email</a>`;
    await sendHtmlEmail(to, subject, html);
};

// Function to send a password reset email
const sendPasswordResetEmail = async (to, resetLink) => {
    const subject = 'Password Reset Request';
    const html = `<p>You requested a password reset. Click the link below to reset your password:</p>
                  <a href="${resetLink}">Reset Password</a>`;
    await sendHtmlEmail(to, subject, html);
};

module.exports = {
    sendPlainEmail,
    sendHtmlEmail,
    sendVerificationEmail,
    sendPasswordResetEmail,
};