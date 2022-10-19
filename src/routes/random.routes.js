const { Router } = require("express")
const randomCtrl = require("../controllers/random.controller")

const router = Router()

router.get("/api/random", randomCtrl.calculateRandomNumber)

module.exports = router
