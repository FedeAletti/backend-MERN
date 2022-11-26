const { errorLogger, logger } = require("../config/logger")
const Cart = require("../models/Cart")
const Product = require("../models/Product")
const { sendPurchaseEmail } = require("../services/mail.service")
const sendSMS = require("../services/sms.service")
const sendWhatsapp = require("../services/whatsapp.service")

const cartController = {
	getCart: async (req, res) => {
		try {
			const userCart = await Cart.findOne({ userId: req.user._id }).lean()

			// if user cart is empty, render empty cart
			if (!userCart) {
				res.render("cart/cart", { productsExist: false })
			} else {
				// if user cart is not empty, render cart with products
				let totalCart = 0
				userCart.products.forEach((product) => {
					product.id = product._id.toString()
					product.totalPrice = product.price * product.quantity
					totalCart += product.totalPrice
				})

				res.render("cart/cart", {
					productsExist: true,
					products: userCart.products,
					totalCart,
					cartId: userCart._id.toString(),
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
					products: [{ ...product, quantity: 1 }],
				})

				await newCart.save()
			} else {
				// edit cart if exist adding the product
				const productExist = userCart.products.find(
					(product) => product._id.toString() === req.body.productId
				)

				if (productExist) {
					// if product exist in cart, add quantity
					const products = userCart.products.map((product) => {
						if (product._id.toString() === req.body.productId) {
							return { ...product, quantity: product.quantity + 1 }
						} else {
							return product
						}
					})

					await Cart.findOneAndUpdate(
						{ userId: req.user._id },
						{ products: products }
					)
				} else {
					// if product does not exist in cart, add product
					const products = [...userCart.products, { ...product, quantity: 1 }]

					await Cart.findOneAndUpdate(
						{ userId: req.user._id },
						{ products: products }
					)
				}
			}
			logger.info("Product added to cart")
			res.redirect("/cart")
		} catch (error) {
			errorLogger.warn("Error in addToCart: " + error)
		}
	},

	deleteProd: async (req, res) => {
		try {
			// delete prod and update cart
			const userCart = await Cart.findOne({ userId: req.user._id }).lean()

			const products = userCart.products.filter(
				(product) => product._id.toString() !== req.body.productId
			)

			await Cart.findOne({ userId: req.user._id }).updateOne({
				products: products,
			})

			res.status(204).json({ message: "Product deleted" })

			logger.info("Product deleted from cart")
		} catch (error) {
			errorLogger.warn("Error in deleteProd: " + error)
		}
	},

	checkout: async (req, res) => {
		//
		try {
			// get cart from mongo
			const userCart = await Cart.findOne({ userId: req.user._id }).lean()

			// formate products to send to email
			let products = ""
			userCart.products.forEach((product) => {
				products += `<li>${product.name} - ${product.quantity} - $${product.price}</li>`
			})

			// senders
			await sendPurchaseEmail(products, req.user)
			await sendSMS(
				"La orden fue confirmada, su pedido esta en proceso",
				req.user.phone
			)
			await sendWhatsapp(
				`Se ha creado una nueva orden de compra de parte de: ${req.user.name}`
			)

			// delete cart
			await Cart.findOne({ userId: req.user._id }).deleteOne()

			logger.info("New order: " + newUser.name)
			req.flash(
				"success_msg",
				"Order in progress! You'll receive a confirmation email and SMS"
			)
			res.status(200).json({ message: "Order confirmed" })
			res.redirect("/")
		} catch (error) {
			errorLogger.error({
				error: error.message,
			})
			req.flash("error_msg", "Error in checkout, try again")
			res.status(500).send({
				status: 500,
				message: error.message,
			})
		}
	},
}

module.exports = cartController
