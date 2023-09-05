const nodemailer = require('nodemailer');

async function sendEmail(toEmail, subject, text) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'shaanagarwal1942003@gmail.com',
                pass: 'ddkwxstrydyfitey',
            },
        });

        const mailOptions = {
            from: 'shaanagarwal1942003@gmail.com',
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