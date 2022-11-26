const { Router } = require("express")

const router = Router()

const userCtrl = require("../controllers/users.controller")
const { isAuthenticated } = require("../helpers/auth")
const { upLoad, uploadFile } = require("../helpers/uploadFiles")

router.get("/users/signup", userCtrl.renderSignUpForm)

router.post("/users/signup", userCtrl.signUp)
// router.post("/users/signup", upLoad, uploadFile)

router.get("/users/signin", userCtrl.renderSignInForm)

router.post("/users/signin", userCtrl.signIn)

router.get("/users/logout", userCtrl.logOut)

router.get("/users/account", isAuthenticated, userCtrl.renderAccountInfo)

module.exports = router
