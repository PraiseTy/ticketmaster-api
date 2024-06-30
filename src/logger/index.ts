import winston from 'winston';
import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config();

const logDirectory = path.join((process.cwd(), 'logs'));

const colors = {
  info: 'green',
  error: 'red',
  warn: 'yellow',
  debug: 'cyan'
};

winston.addColors(colors);

const logFormat = winston.format.printf(({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`);

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL,
  format: winston.format.combine(winston.format.timestamp(), winston.format.colorize({ all: true }), logFormat),

  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(logDirectory, 'error.log'),
      level: 'error'
    }),
    new winston.transports.File({ filename: path.join(logDirectory, 'combined.log') })
  ]
});

export default logger;
