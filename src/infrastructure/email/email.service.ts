export interface EmailService {
  sendResetPassword(email: string, link: string): Promise<void>;
}
