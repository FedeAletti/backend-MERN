const mongoose = require("mongoose")
const { errorLogger, logger } = require("./config/logger")

const MONGODB_URI = process.env.MONGO_DB_URI

mongoose
	.connect(MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((db) => {
		console.log("DB is connected")
		logger.info("DB is connected")
	})
	.catch((err) => errorLogger.error("Error in DB connection: " + err))
