import winston from "winston";

// log requests info on a console
export const infoLogger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple(),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "logs/request.log",
      level: "info",
    }),
  ],
});

// log error to a file and console
export const errorLogger = winston.createLogger({
  level: "error",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/error.log" }),
  ],
});
