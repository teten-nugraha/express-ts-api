import nodemailer from 'nodemailer';

export const mailTransporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  secure: false,
  auth: {
    user: '8edbe09af1e5f5',
    pass: '62bde491f1e7d5',
  },
});
