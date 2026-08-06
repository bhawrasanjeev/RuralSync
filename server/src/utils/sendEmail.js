const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  if (!process.env.SMTP_USER || process.env.SMTP_USER === 'your_email@gmail.com') {
    console.log(`[Email Mock Service] Email to ${options.to}: ${options.subject} - ${options.text}`);
    return { mock: true, sent: true };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const message = {
    from: `${process.env.FROM_NAME || 'RuralSync Governance'} <${process.env.FROM_EMAIL || process.env.SMTP_USER}>`,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  };

  const info = await transporter.sendMail(message);
  return info;
};

module.exports = sendEmail;
