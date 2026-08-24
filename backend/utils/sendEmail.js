import nodemailer from 'nodemailer';

/**
 * Utility to send an email using Nodemailer
 * @param {Object} options
 * @param {Object} options.from - sender info { name, email }
 * @param {string} options.to - recipient email override (defaults to EMAIL_TO)
 * @param {string} options.subject - email subject
 * @param {string} options.html - email html body
 * @param {string} options.text - email text body fallback
 */
const sendEmail = async ({ from, to, subject, html, text }) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('\n[Nodemailer Warning] EMAIL_USER or EMAIL_PASS not configured in .env.');
    console.warn('Skipping email notification. Message logged to console instead.');
    return { skipped: true };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587', 10),
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"${from.name}" <${process.env.EMAIL_USER}>`, // Authenticated sender
    replyTo: from.email,
    to: to || process.env.EMAIL_TO || process.env.EMAIL_USER,
    subject: `Portfolio Contact: ${subject}`,
    text,
    html,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`[Nodemailer Success] Email sent successfully: ${info.messageId}`);
  return info;
};

export default sendEmail;
