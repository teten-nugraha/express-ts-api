import { injectable } from 'tsyringe';
import { EmailService } from './email.service';
import { mailTransporter } from './nodemailer.transport';
import fs from 'fs';
import path from 'path';

const template = fs.readFileSync(path.join(__dirname, 'templates/reset-password.html'), 'utf8');

@injectable()
export class NodemailerEmailservice implements EmailService {
  async sendResetPassword(email: string, link: string): Promise<void> {
    const html = template
      .replace('{{name}}', 'Teten')
      .replace(/{{resetLink}}/g, link)
      .replace('{{year}}', new Date().getFullYear().toString());

    await mailTransporter.sendMail({
      from: process.env.MAIL_FROM,
      to: email,
      subject: 'Reset Your Password',
      html,
    });
  }
}
