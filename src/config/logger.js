const winston = require("winston")

const logger = winston.createLogger({
	format: winston.format.json(),
	transports: [
		new winston.transports.Console({ level: "info" }),
		new winston.transports.File({
			filename: "./logs/warn.log",
			level: "warn",
		}),
	],
})

const errorLogger = winston.createLogger({
	format: winston.format.json(),
	transports: [
		new winston.transports.Console({ level: "error" }),
		new winston.transports.File({
			filename: "./logs/error.log",
			level: "error",
		}),
	],
})

const urlMethodError = (req) => ({
	URL: req.originalUrl,
	method: req.method,
	error: error.message,
})

module.exports = { logger, errorLogger, urlMethodError }
