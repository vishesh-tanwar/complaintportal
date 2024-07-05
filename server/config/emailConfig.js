const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service provider
    auth: {
        user: 'potssteve187@gmail.com', // Your email
        pass: 'iucb lnov ikbr hthg'   // Your email password or app-specific password
    }
});

const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: 'potssteve187@gmail.com',
        to,
        subject,
        text
    };

    return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;