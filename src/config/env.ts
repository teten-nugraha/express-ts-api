import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  PORT: z.string().transform(Number),
  APP_NAME: z.string(),
  APP_VERSION: z.string(),
  JWT_SECRET: z.string(),
  DATABASE_URL: z.string(),
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
};
