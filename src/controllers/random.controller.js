const { fork } = require("child_process")

const randomController = {
	calculateRandomNumber: (req, res) => {
		const cant = req.query.cant || 100000000
		let random = fork("./src/helpers/randomNumbers.js")
		random.send({ message: "start", cant: cant })
		random.on("message", (obj) => {
			res.json(obj)
		})
	},
}

module.exports = randomController
