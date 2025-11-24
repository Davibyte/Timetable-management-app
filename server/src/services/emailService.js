const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false // for development
    }
});

// Send verification email
exports.sendVerificationEmail = async (email, token) => {
    const verificationUrl = `${process.env.CLIENT_URL}/verify-email/${token}`;

    const mailOptions = {
        from: `"Timetable Management System" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Email Verification - Timetable Management System',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body {
                        font-family: 'Poppins', sans-serif;
                        background-color: #f5f5f5;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 40px auto;
                        background-color: #ffffff;
                        border-radius: 8px;
                        overflow: hidden;
                        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        background-color: #660116;
                        padding: 30px;
                        text-align: center;
                    }
                    .header h1 {
                        color: #ffffff;
                        margin: 0;
                        font-size: 24px;
                    }
                    .content {
                        padding: 40px 30px;
                        color: #051D41;
                    }
                    .content h2 {
                        color: #660116;
                        margin-top: 0;
                    }
                    .button {
                        display: inline-block;
                        padding: 14px 32px;
                        background-color: #66C7F4;
                        color: #051D41;
                        text-decoration: none;
                        border-radius: 6px;
                        font-weight: 600;
                        margin: 20px 0;
                    }
                    .footer {
                        background-color: #f9f9f9;
                        padding: 20px;
                        text-align: center;
                        color: #8D888B;
                        font-size: 12px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Timetable Management System</h1>
                    </div>
                    <div class="content">
                        <h2>Verify Your Email Address</h2>
                        <p>Thank you for registering with Timetable Management System!</p>
                        <p>Please click the button below to verify your email address and activate your account:</p>
                        <center>
                            <a href="${verificationUrl}" class="button">Verify Email</a>
                        </center>
                        <p>Or copy and paste this link into your browser:</p>
                        <p style="color: #8D888B; word-break: break-all;">${verificationUrl}</p>
                        <p style="color: #8D888B; font-size: 14px; margin-top: 30px;">
                            This link will expire in 1 hour. If you didn't create an account, please ignore this email.
                        </p>
                    </div>
                    <div class="footer">
                        <p>© 2025 Timetable Management System. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent to:', email);
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw new Error('Failed to send verification email');
    }
};

// Send password reset email
exports.sendPasswordResetEmail = async (email, token) => {
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;

    const mailOptions = {
        from: `"Timetable Management System" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Password Reset Request - Timetable Management System',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body {
                        font-family: 'Poppins', sans-serif;
                        background-color: #f5f5f5;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 40px auto;
                        background-color: #ffffff;
                        border-radius: 8px;
                        overflow: hidden;
                        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        background-color: #660116;
                        padding: 30px;
                        text-align: center;
                    }
                    .header h1 {
                        color: #ffffff;
                        margin: 0;
                        font-size: 24px;
                    }
                    .content {
                        padding: 40px 30px;
                        color: #051D41;
                    }
                    .content h2 {
                        color: #660116;
                        margin-top: 0;
                    }
                    .button {
                        display: inline-block;
                        padding: 14px 32px;
                        background-color: #66C7F4;
                        color: #051D41;
                        text-decoration: none;
                        border-radius: 6px;
                        font-weight: 600;
                        margin: 20px 0;
                    }
                    .warning {
                        background-color: #FFD6DA;
                        padding: 15px;
                        border-radius: 6px;
                        margin: 20px 0;
                        color: #660116;
                    }
                    .footer {
                        background-color: #f9f9f9;
                        padding: 20px;
                        text-align: center;
                        color: #8D888B;
                        font-size: 12px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Timetable Management System</h1>
                    </div>
                    <div class="content">
                        <h2>Reset Your Password</h2>
                        <p>We received a request to reset your password. Click the button below to create a new password:</p>
                        <center>
                            <a href="${resetUrl}" class="button">Reset Password</a>
                        </center>
                        <p>Or copy and paste this link into your browser:</p>
                        <p style="color: #8D888B; word-break: break-all;">${resetUrl}</p>
                        <div class="warning">
                            <strong>Security Notice:</strong> This link will expire in 1 hour. If you didn't request a password reset, please ignore this email and your password will remain unchanged.
                        </div>
                    </div>
                    <div class="footer">
                        <p>© 2025 Timetable Management System. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Password reset email sent to:', email);
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw new Error('Failed to send password reset email');
    }
};