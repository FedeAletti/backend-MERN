const passport = require("passport")
const User = require("../models/User")
const LocalStrategy = require("passport-local").Strategy

const usersCtrl = {
	renderSignUpForm: (req, res) => {
		res.render("users/signup")
	},

	signUp: async (req, res) => {
		const { name, email, password, confirm_password } = req.body
		const errors = []

		if (name.length <= 0) {
			errors.push({ text: "Please write a name" })
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
				req.flash("error_msg", "The email is already in use")
				res.redirect("/users/signup")
			} else {
				const newUser = new User({ name, email, password })
				newUser.password = await newUser.encryptPassword(password)
				await newUser.save()
				req.flash("success_msg", "You are registered")
				res.redirect("/users/signin")
			}
		}
	},

	renderSignInForm: (req, res) => {
		res.render("users/signin")
	},

	signIn: passport.authenticate("local", {
		successRedirect: "/notes",
		failureRedirect: "/users/signin",
		failureFlash: true,
	}),

	logOut: (req, res) => {
		req.logout(() => {
			req.flash("success_msg", "You are logged out now")
			res.redirect("/")
		})
	},
}

module.exports = usersCtrl
