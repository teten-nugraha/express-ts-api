import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  PORT: z.string().transform(Number),
  APP_NAME: z.string(),
  APP_VERSION: z.string(),
  JWT_SECRET: z.string(),
  DATABASE_URL: z.string(),
  MAIL_HOST: z.string(),
  MAIL_USERNAME: z.string(),
  MAIL_PASSWORD: z.string(),
  MAIL_PORT: z.string().transform(Number),
  FRONTEND_URL: z.string().transform(Number),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables', parsedEnv.error.format());
  process.exit(1);
}

export const env = {
  nodeEnv: parsedEnv.data.NODE_ENV,
  port: parsedEnv.data.PORT,
  appName: parsedEnv.data.APP_NAME,
  appVersion: parsedEnv.data.APP_VERSION,
  jwtSecret: parsedEnv.data.JWT_SECRET,
  databaseUrl: parsedEnv.data.DATABASE_URL,
  mailHost: parsedEnv.data.MAIL_HOST,
  mailUsername: parsedEnv.data.MAIL_USERNAME,
  mailPassword: parsedEnv.data.MAIL_PASSWORD,
  mailPort: parsedEnv.data.MAIL_PORT,
  frontendUrl: parsedEnv.data.FRONTEND_URL,
};
