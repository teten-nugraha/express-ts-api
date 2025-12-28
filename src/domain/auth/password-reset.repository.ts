export interface PasswordResetRepository {
  create(data: { tokenHash: string; userId: string; expiresAt: Date }): Promise<void>;

  findValid(tokenHash: string): Promise<{
    userId: string;
    expiresAt: Date;
    used: boolean;
  } | null>;

  markUsed(tokenHash: string): Promise<void>;
}
