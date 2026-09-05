const { Resend } = require('resend');

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const sendWithResend = async (to, subject, html) => {
  if (!resend) {
    throw new Error('RESEND_API_KEY is not configured');
  }
  return await resend.emails.send({
    from: process.env.EMAIL_USER,
    to,
    subject,
    html
  });
};

module.exports = { sendWithResend };
