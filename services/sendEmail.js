const nodemailer = require("nodemailer");
const tokenMap = require('./token.js');
const sendEmail = async (email) => {

    const generateResetToken = () => {
        const token = Math.floor(1000 + Math.random() * 9000);
        const expiresAt = Date.now() + 300000; // 5 minutes expiration
        return { token, expiresAt };
    };

    const { token, expiresAt } = generateResetToken();

    tokenMap.set(token, expiresAt);

    // tokenMap.forEach((result, index) => {
    //     console.log(result)
    //     console.log(index)
    // });

    const myEmail = 'Your@gmail.com';
    const myPassword = 'YourPass';

    return new Promise((resolve, reject) => {

        const transporter = nodemailer.createTransport({
            // Configure your email service
            service: 'gmail',
            auth: {
                user: myEmail,
                pass: myPassword
            }
        });

        const mailOptions = {
            from: myEmail,
            to: "Your@gmail.com",
            subject: 'Password Reset',
            text: `Click the link below to reset your password:\n\nhttp://localhost:3000/?token=${token}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(new Error("Email could not be sent"));
            } else {
                resolve("Email is sent");
            }
        });
    });
};

module.exports = sendEmail;