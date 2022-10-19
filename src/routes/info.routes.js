const { Router } = require("express")
const infoCtrl = require("../controllers/info.controller")

const router = Router()

router.get("/info", infoCtrl.getInfo)

module.exports = router
