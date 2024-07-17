import { Injectable } from '@nestjs/common';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailerService {
  constructor(private readonly mailerService: NestMailerService) {}

  async sendVerificationEmail(email: string, token: string) {
    const url = `http://localhost:3000/${token}`;
    await this.mailerService.sendMail({
      from: email,
      to: email,
      subject: 'Verify Your Email',
      text: `Click on this link to verify your email: ${url}`,
    });
  }
}
