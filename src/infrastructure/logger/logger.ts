import winston from 'winston';
import path from 'path';
import DailyRotateFile from 'winston-daily-rotate-file';

const logDir = path.resolve('logs');

const { combine, timestamp, printf, errors, json } = winston.format;

// Custom log format (human readable)
const consoleFormat = printf(({ level, message, timestamp, stack }) => {
  return `[${timestamp}] ${level.toUpperCase()}: ${stack || message}`;
});
const appRotateTransport = new DailyRotateFile({
  dirname: logDir,
  filename: 'app-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d', // keep logs for 14 days
});

const errorRotateTransport = new DailyRotateFile({
  dirname: logDir,
  filename: 'error-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '10m',
  maxFiles: '30d',
  level: 'error',
});
export const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), errors({ stack: true }), json()),
  transports: [appRotateTransport, errorRotateTransport],
});

// Console logging (DEV only)
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: combine(timestamp(), consoleFormat),
    }),
  );
}
