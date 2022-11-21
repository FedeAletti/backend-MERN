const log4js = require("log4js")

// --- configuracion de logger ---
log4js.configure({
	appenders: {
		consoleLogger: { type: "console" },
		fileLogger: { type: "file", filename: "warnsAndErrors.log" },
		fileLogger2: { type: "file", filename: "info.log" },
	},
	categories: {
		default: { appenders: ["consoleLogger"], level: "trace" },
		console: { appenders: ["fileLogger"], level: "debug" },
		file: { appenders: ["fileLogger"], level: "warn" },
		file2: { appenders: ["fileLogger2"], level: "info" },
		all: { appenders: ["consoleLogger", "fileLogger"], level: "error" },
	},
})

// --- exportar logger ---
module.exports = {
	logger: log4js.getLogger("all"),
	loggerConsole: log4js.getLogger("console"),
	loggerFile: log4js.getLogger("file"),
	loggerFile2: log4js.getLogger("file2"),
}
