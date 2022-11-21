const { loggerFile } = require("../config/logger")
const { createNFakeProducts } = require("../models/mocks")

const productCtrl = {
	getAllProducts: async (req, res) => {
		// await res.send(createNFakeProducts(5))
		try {
			let products = createNFakeProducts(5)
			if (products.length > 0) {
				res.render("products/all-products", { products, productsExist: true })
			} else {
				res.render("products/all-products", {
					products,
					productsExist: false,
				})
			}
		} catch (err) {
			loggerFile.warn("Error in getAllProducts: " + err)
			req.flash("error", "Something went wrong")
		}
	},

	getProduct: async (req, res) => {
		try {
			let product = createNFakeProducts(1)
			res.render("products/product", { product })
		} catch (err) {
			loggerFile.warn("Error in getProduct: " + err)
			req.flash("error", "Something went wrong")
		}
	},

	renderAddProduct: (req, res) => {
		res.render("products/add-product")
	},

	saveProduct: async (req, res) => {
		try {
			req.flash("success", "Product created successfully")
			res.redirect("/products")
		} catch (err) {
			loggerFile.warn("Error in saveProduct: " + err)
			req.flash("error", "Something went wrong")
		}
	},

	renderEditProduct: (req, res) => {
		try {
			let product = createNFakeProducts(1)
			res.render("products/edit-product", { product })
		} catch (err) {
			loggerFile.warn("Error in renderEditProduct: " + err)
			req.flash("error", "Something went wrong")
		}
	},

	editProduct: async (req, res) => {
		try {
			req.flash("success", "Product edited successfully")
			res.redirect("/products")
		} catch (err) {
			loggerFile.warn("Error in editProduct: " + err)
			req.flash("error", "Something went wrong")
		}
	},

	deleteProduct: async (req, res) => {
		try {
			req.flash("success", "Product deleted successfully")
			res.redirect("/products")
		} catch (err) {
			loggerFile.warn("Error in deleteProduct: " + err)
			req.flash("error", "Something went wrong")
		}
	},
}

module.exports = productCtrl
