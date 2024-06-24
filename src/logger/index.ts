import winston from 'winston';
import path from 'node:path';

const logDirectory = path.join((process.cwd(), 'logs'));

const colors = {
  info: 'green',
  error: 'red',
  warn: 'yellow',
  debug: 'cyan'
};

winston.addColors(colors);

const logFomat = winston.format.printf(({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`);

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(winston.format.timestamp(), winston.format.colorize({ all: true }), logFomat),

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
