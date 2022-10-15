const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const User = require("../models/User")

passport.use(
	"local",
	new LocalStrategy(
		{
			usernameField: "email",
			passwordField: "password",
		},
		async (email, password, done) => {
			// Match Email's User
			const user = await User.findOne({ email: email })

			if (!user) {
				return done(null, false, { message: "Not User Found" })
			} else {
				// Match Password's User
				const match = await user.matchPassword(password)
				if (match) {
					return done(null, user)
				} else {
					return done(null, false, { message: "Incorrect Password" })
				}
			}
		}
	)
)

passport.serializeUser((user, done) => {
	done(null, user.id)
})

passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(err, user)
	})
})
