const { Router } = require("express")

const router = Router()

const cartController = require("../controllers/cart.controller")
const { isAuthenticated } = require("../helpers/auth")

router.get("/cart", isAuthenticated, cartController.getCart)

router.post("/cart", isAuthenticated, cartController.addToCart)

router.delete("/cart", isAuthenticated, cartController.deleteProd)

router.post("/cart/checkout/:id", isAuthenticated, cartController.checkout)

module.exports = router
