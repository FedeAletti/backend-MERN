const { Router } = require("express")

const router = Router()

const cartController = require("../controllers/cart.controller")
const { isAuthenticated } = require("../helpers/auth")

router.get("/cart", isAuthenticated, cartController.getCart)

router.post("/cart", isAuthenticated, cartController.addToCart)

module.exports = router
