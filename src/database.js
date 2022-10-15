const mongoose = require("mongoose")

const MONGODB_URI = process.env.MONGO_DB_URI

mongoose
	.connect(MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((db) => console.log("DB is connected"))
	.catch((err) => console.error(err))
