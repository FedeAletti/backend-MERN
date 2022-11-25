const { errorLogger } = require("../config/logger")
const normalizeMessages = require("../helpers/normalizeMessagges")
const messagesController = require("./messages.controller")

const socketCtrl = (io) => {
	io.on("connection", async (socket) => {
		console.log("Nuevo Cliente Conectado: " + socket.id)
		io.sockets.emit(
			"messages",
			normalizeMessages(await messagesController.getAll())
		)
		//queda escuchando el siguiente socket, socket es el usuario/cliente
		socket.on("new-message", async (msjClient) => {
			await messagesController.save(JSON.parse(msjClient))
			io.sockets.emit(
				"messages",
				normalizeMessages(await messagesController.getAll({ sort: true }))
			)
		})
	})
	io.on("error", (err) => {
		errorLogger.error("Error en socket.io: " + err)
	})
}

module.exports = socketCtrl
