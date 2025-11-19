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
const sendVerificationEmail = async (email, firstName, verificationUrl) => {
    const mailOptions = {
        from: `Timetable Management System <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Verify Your Email Address',
        html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #4F46E5; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .button { display: inline-block; padding: 12px 30px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Timetable Management System</h1>
            </div>
            <div class="content">
              <h2>Hi ${firstName},</h2>
              <p>Thank you for registering with our Timetable Management System. Please verify your email address by clicking the button below:</p>
              <div style="text-align: center;">
                <a href="${verificationUrl}" class="button">Verify Email Address</a>
              </div>
              <p>Or copy and paste this link into your browser:</p>
              <p style="word-break: break-all; color: #4F46E5;">${verificationUrl}</p>
              <p>This link will expire in 24 hours.</p>
              <p>If you didn't create an account, please ignore this email.</p>
            </div>
            <div class="footer">
              <p>&copy; 2024 Timetable Management System. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Verification email sent to ${email}`);
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw new Error('Failed to send verification email');
    }
}

// Send password reset email
const sendPasswordResetEmail = async (email, firstName, resetUrl) => {
    const mailOptions = {
        from: `Timetable Management System <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Password Reset Request',
        html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #4F46E5; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .button { display: inline-block; padding: 12px 30px; background-color: #DC2626; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
            .warning { background-color: #FEF3C7; padding: 10px; border-left: 4px solid #F59E0B; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Password Reset Request</h1>
            </div>
            <div class="content">
              <h2>Hi ${firstName},</h2>
              <p>We received a request to reset your password. Click the button below to create a new password:</p>
              <div style="text-align: center;">
                <a href="${resetUrl}" class="button">Reset Password</a>
              </div>
              <p>Or copy and paste this link into your browser:</p>
              <p style="word-break: break-all; color: #4F46E5;">${resetUrl}</p>
              <div class="warning">
                <strong>⚠️ Security Notice:</strong>
                <p>This link will expire in 1 hour for security reasons.</p>
              </div>
              <p>If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
            </div>
            <div class="footer">
              <p>&copy; 2024 Timetable Management System. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Password reset email sent to ${email}`);
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw new Error('Failed to send password reset email');
    }
}

// Send password change confirmation
const sendPasswordChangeConfirmation = async (email, firstName) => {
    const mailOptions = {
        from: `Timetable Management System <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Password Changed Successfully',
        html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #10B981; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
            .alert { background-color: #FEE2E2; padding: 10px; border-left: 4px solid #DC2626; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✓ Password Changed Successfully</h1>
            </div>
            <div class="content">
              <h2>Hi ${firstName},</h2>
              <p>This is a confirmation that your password has been changed successfully.</p>
              <p><strong>Date & Time:</strong> ${new Date().toLocaleString()}</p>
              <div class="alert">
                <strong>⚠️ Didn't make this change?</strong>
                <p>If you did not change your password, please contact our support team immediately.</p>
              </div>
              <p>For security reasons, make sure to:</p>
              <ul>
                <li>Use a strong, unique password</li>
                <li>Never share your password with anyone</li>
                <li>Enable two-factor authentication if available</li>
              </ul>
            </div>
            <div class="footer">
              <p>&copy; 2024 Timetable Management System. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Password change confirmation sent to ${email}`);
    } catch (error) {
        console.error('Error sending password change confirmation:', error);
        // Don't throw error here as password is already changed
    }
}

// Send welcome email
const sendWelcomeEmail = async (email, firstName) => {
    const mailOptions = {
        from: `Timetable Management System <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Welcome to Timetable Management System',
        html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #4F46E5; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome Aboard! 🎉</h1>
            </div>
            <div class="content">
              <h2>Hi ${firstName},</h2>
              <p>Welcome to the Timetable Management System! We're excited to have you on board.</p>
              <p>Your account is now active and you can start using all our features:</p>
              <ul>
                <li>View your personalized timetable</li>
                <li>Receive real-time updates</li>
                <li>Access your schedule anytime, anywhere</li>
              </ul>
              <p>If you need any assistance, feel free to reach out to our support team.</p>
            </div>
            <div class="footer">
              <p>&copy; 2024 Timetable Management System. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Welcome email sent to ${email}`);
    } catch (error) {
        console.error('Error sending welcome email:', error);
    }
}

module.exports = {
    sendVerificationEmail,
    sendPasswordResetEmail,
    sendPasswordChangeConfirmation,
    sendWelcomeEmail
};