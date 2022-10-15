const { Router } = require("express")

const router = Router()

const userCtrl = require("../controllers/users.controller")

router.get("/users/signup", userCtrl.renderSignUpForm)

router.post("/users/signup", userCtrl.signUp)

router.get("/users/signin", userCtrl.renderSignInForm)

router.post("/users/signin", userCtrl.signIn)

router.get("/users/logout", userCtrl.logOut)

module.exports = router
