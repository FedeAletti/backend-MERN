const { errorLogger, logger } = require("../config/logger")
const Cart = require("../models/Cart")
const Product = require("../models/Product")

const cartController = {
	getCart: async (req, res) => {
		console.log("LLega")
		// get user cart from mongo
		try {
			const userCart = await Cart.findOne({ userId: req.user._id }).lean()

			// if user cart is empty, render empty cart
			if (userCart.products.length === 0) {
				res.render("cart/cart", { productsExist: false })
			} else {
				// if user cart is not empty, render cart with products
				res.render("cart/cart", {
					productsExist: true,
					products: userCart.products,
				})
			}
		} catch (error) {
			errorLogger.warn("Error in getCart: " + error)
		}
	},

	addToCart: async (req, res) => {
		try {
			// get product from mongo
			const product = await Product.findById({ _id: req.body.productId }).lean()

			// get user cart from mongo
			const userCart = await Cart.findOne({ userId: req.user._id }).lean()

			// if user cart is empty, create new cart
			if (!userCart) {
				const newCart = new Cart({
					userId: req.user._id,
					products: [product],
				})

				await newCart.save()
			} else {
				// if user cart is not empty, add product to cart
				userCart.products.push(product)
				await userCart.save()
			}
			logger.info("Product added to cart")
			// res.redirect("/cart")
		} catch (error) {
			errorLogger.warn("Error in addToCart: " + error)
		}
	},

	postCart: async (req, res) => {
		try {
		} catch (error) {}
	},

	deleteProdbyPage: async (req, res) => {
		try {
			// delete prod
			const userCart = await Cart.findOne({ userId: req.user._id }).lean()
			const prodId = req.params.id
			const prodIndex = userCart.products.findIndex(
				(prod) => prod._id.toString() === prodId
			)

			userCart.products.splice(prodIndex, 1)
			await userCart.save()
		} catch (error) {
			errorLogger.warn("Error in deleteProdbyPage: " + error)
		}
	},

	deleteProd: async (req, res) => {
		try {
			// delete prod
			const userCart = await Cart.findOne({ userId: req.user._id }).lean()
			const prodId = req.params.id
			const prodIndex = userCart.products.findIndex(
				(prod) => prod._id.toString() === prodId
			)

			userCart.products.splice(prodIndex, 1)
			await userCart.save()
		} catch (error) {
			errorLogger.warn("Error in deleteProd: " + error)
		}
	},

	postBuy: async (req, res) => {
		//
		try {
			await sendPurchaseEmail(formattedProducts, user)
			await sendSMS("La orden fue confirmada, su pedido esta en proceso")
			await sendWhatsapp(
				"Se ha creado una nueva orden de compra de parte de: " + req.user.name
			)

			res.redirect("/home")
		} catch (error) {
			errorLogger.error({
				error: error.message,
			})
			res.status(500).send({
				status: 500,
				message: error.message,
			})
		}
	},
}

module.exports = cartController
