const passport = require("passport")
const User = require("../models/User")
const { faker } = require("@faker-js/faker")
const { logger, errorLogger } = require("../config/logger")
const LocalStrategy = require("passport-local").Strategy

const usersCtrl = {
	renderSignUpForm: (req, res) => {
		res.render("users/signup")
	},

	signUp: async (req, res) => {
		const { name, email, countryCode, cellphone, password, confirm_password } =
			req.body
		const errors = []

		if (name.length <= 0) {
			errors.push({ text: "Please write a name" })
		}
		if (
			countryCode.length <= 0 &&
			cellphone.length <= 0 &&
			cellphone.length == 10
		) {
			errors.push({ text: "Please introduce a correct phone number" })
		}
		if (password != confirm_password) {
			errors.push({ text: "Passwords do not match" })
		}
		if (password.length < 4) {
			errors.push({ text: "Password must be at least 4 characters" })
		}
		if (errors.length > 0) {
			res.render("users/signup", {
				errors,
				name,
				email,
			})
		} else {
			const emailUser = await User.findOne({ email: email })
			if (emailUser) {
				logger.warn(
					"User tried to register with an email already in use: " + email
				)
				req.flash("error_msg", "The email is already in use")
				res.redirect("/users/signup")
			} else {
				const newUser = new User({
					name,
					phone: `+${countryCode}9${cellphone}`,
					email,
					password,
					avatar: faker.image.avatar(),
					// // take the image from middleware
					// avatar: req.file,
				})
				console.log(newUser)
				newUser.password = await newUser.encryptPassword(password)
				await newUser.save()
				logger.info("New user registered: " + newUser.name)
				req.flash("success_msg", "You are registered")
				res.redirect("/users/signin")
			}
		}
	},

	renderSignInForm: (req, res) => {
		res.render("users/signin")
	},

	signIn: passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/users/signin",
		failureFlash: true,
	}),

	logOut: (req, res) => {
		try {
			req.logout(() => {
				req.flash("success_msg", "You are logged out now")
				req.session.destroy()
				res.redirect("/")
			})
		} catch (e) {
			errorLogger.error("Error in logOut() - usersCtrl: " + e)
		}
	},
}

module.exports = usersCtrl
