const nodemailer = require('nodemailer');

async function sendEmail(toEmail, subject, text) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'agarwalshaan27@gmail.com',
                pass: 'ghkn yagl faxk frfv',
            },
        });

        const mailOptions = {
            from: 'agarwalshaan27@gmail.com',
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