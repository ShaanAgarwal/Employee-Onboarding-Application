const nodemailer = require('nodemailer');
require('dotenv').config();

async function sendEmail(toEmail, subject, text) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.nodemailer_account,
                pass: process.env.nodemailer_password,
            },
        });

        const mailOptions = {
            from: process.env.nodemailer_account,
            to: toEmail,
            subject: subject,
            text: text,
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

module.exports = { sendEmail };