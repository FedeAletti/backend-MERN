const Product = require("../models/Product")
const { createNFakeProducts } = require("../models/mocks")
const fs = require("fs")
const { logger, errorLogger } = require("../config/logger")

const productCtrl = {
	getAllProducts: async (req, res) => {
		try {
			const products = await Product.find({}).lean()

			// products.forEach((product) => {
			// 	product.price = product.price.toLocaleString("es-AR", {
			// 		style: "currency",
			// 		currency: "ARS",
			// 	})
			// 	console.log(product.price)
			// })

			products.forEach((product) => {
				// save the ObjectId as a string
				product.id = product._id.toString()
				console.log(product.id)
			})

			if (products.length > 0) {
				res.render("products/all-products", { products, productsExist: true })
			} else {
				res.render("products/all-products", {
					products,
					productsExist: false,
				})
			}
		} catch (err) {
			errorLogger.warn("Error in getAllProducts: " + err)
			req.flash("error", "Something went wrong")
		}
	},

	getProduct: async (req, res) => {
		try {
			let product = await Product.findById({ _id: req.params.id }).lean()
			console.log(product)

			product = {
				name: product.name,
				price: product.price,
				description: product.description,
				id: product._id.toString(),
				thumbnail: product.thumbnail,
			}

			res.render("products/product", { product })
		} catch (err) {
			errorLogger.warn("Error in getProduct: " + err)
			req.flash("error", "Something went wrong")
		}
	},

	renderAddProduct: (req, res) => {
		res.render("products/add-product")
	},

	saveProduct: async (req, res) => {
		try {
			const { name, description, price, thumbnail, stock } = req.body

			const newProduct = new Product({
				name,
				description,
				price,
				thumbnail,
				stock,
			})

			console.log(newProduct)

			newProduct.save(newProduct)

			logger.info("New product added: " + newProduct)
			req.flash("success", "Product created successfully")
			res.redirect("/products/add")
		} catch (err) {
			logger.warn("Error in saveProduct: " + err)
			req.flash("error", "Something went wrong")
		}
	},

	renderEditProduct: (req, res) => {
		try {
			let product = createNFakeProducts(1)
			res.render("products/edit-product", { product })
		} catch (err) {
			logger.warn("Error in renderEditProduct: " + err)
			req.flash("error", "Something went wrong")
		}
	},

	editProduct: async (req, res) => {
		try {
			logger.info("Product edited: " + req.params.id)
			req.flash("success", "Product edited successfully")
			res.redirect("/products")
		} catch (err) {
			logger.warn("Error in editProduct: " + err)
			req.flash("error", "Something went wrong")
		}
	},

	deleteProduct: async (req, res) => {
		try {
			await Product.findByIdAndDelete({ _id: req.params.id })
			logger.info("Product deleted: " + req.params.id)
			req.flash("success", "Product deleted successfully")
			res.redirect("/products")
		} catch (err) {
			logger.warn("Error in deleteProduct: " + err)
			req.flash("error", "Something went wrong")
		}
	},
}

module.exports = productCtrl
