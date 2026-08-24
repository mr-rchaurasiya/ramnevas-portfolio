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
  const emailUser = process.env.EMAIL_USER || 'ramnevas8188@gmail.com';
  const emailPass = process.env.EMAIL_PASS || 'xjqvpiuipedepmxm';
  const emailHost = process.env.EMAIL_HOST || 'smtp.gmail.com';
  const emailPort = parseInt(process.env.EMAIL_PORT || '587', 10);
  const emailSecure = process.env.EMAIL_SECURE === 'true'; // false by default for 587
  const emailTo = to || process.env.EMAIL_TO || 'ramnevas8188@gmail.com';

  if (!emailUser || !emailPass) {
    console.warn('\n[Nodemailer Warning] EMAIL_USER or EMAIL_PASS not configured in .env.');
    console.warn('Skipping email notification. Message logged to console instead.');
    return { skipped: true };
  }

  const transporter = nodemailer.createTransport({
    host: emailHost,
    port: emailPort,
    secure: emailSecure,
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  const mailOptions = {
    from: `"${from.name}" <${emailUser}>`,
    replyTo: from.email,
    to: emailTo,
    subject: `Portfolio Contact: ${subject}`,
    text,
    html,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`[Nodemailer Success] Email sent successfully: ${info.messageId}`);
  return info;
};

export default sendEmail;
