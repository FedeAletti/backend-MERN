const Messages = require("../models/Message")

const messagesCtrl = {
	renderAll: async (req, res) => {
		const { name, email, avatar } = req.user
		res.render("chat/chat", { name, email, avatar })
	},
	save: async (message) => {
		try {
			let timestamp = new Date()
			message.timestamp = timestamp
			await Messages.create(message)
			return message
		} catch (error) {
			throw Error(error.message)
		}
	},
	getAll: async (options) => {
		try {
			let messages = await Messages.find({}).sort({ timestamp: 0 }).lean()

			if (options?.sort == true) {
				messages = await Messages.find({}).sort({ timestamp: 0 }).lean()
				// res.render("chat/chat", { messages })
			} else {
				messages = await Messages.find({}).lean()
				// res.render("chat/chat", { messages })
				// console.log(messages)
			}
			// res.render("chat/chat", { messages })
			return messages
		} catch (error) {
			throw Error(error.message)
		}
	},
}

module.exports = messagesCtrl
