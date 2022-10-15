const { Router } = require("express")
const messagesCtrl = require("../controllers/messages.controller")
const { isAuthenticated } = require("../helpers/auth")

const router = Router()

router.get(
	"/chat",
	isAuthenticated,
	messagesCtrl.renderAll,
	messagesCtrl.getAll
)

module.exports = router
