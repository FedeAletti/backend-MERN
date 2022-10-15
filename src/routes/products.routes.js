const { Router } = require("express")
const productCtrl = require("../controllers/products.controller")
const { isAuthenticated, isAuthorized } = require("../helpers/auth")

const router = Router()

router.get("/products", productCtrl.getAllProducts)

router.get("/product/:id", productCtrl.getProduct)

router.get("/products/add", isAuthorized, productCtrl.renderAddProduct)

router.post("/products/add", isAuthorized, productCtrl.saveProduct)

router.get("/products/edit/:id", isAuthorized, productCtrl.renderEditProduct)

router.put("/products/edit/:id", isAuthorized, productCtrl.editProduct)

router.delete("/products/delete/:id", isAuthorized, productCtrl.deleteProduct)

module.exports = router
