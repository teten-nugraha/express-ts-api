export interface RefreshToken {
  id: string;
  token: string;
  userId: string;
  expiresAt: Date;
  revoked: boolean;
}
