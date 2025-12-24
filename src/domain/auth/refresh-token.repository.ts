import { RefreshToken } from './refresh-token.entity';

export interface RefreshTokenRepository {
  create(data: { token: string; userId: string; expiresAt: Date }): Promise<RefreshToken>;

  findByToken(token: string): Promise<RefreshToken | null>;

  revoke(token: string): Promise<void>;
}
