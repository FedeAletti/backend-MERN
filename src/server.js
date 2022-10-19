const express = require("express")
const exphbs = require("express-handlebars")
const morgan = require("morgan")
const path = require("path")
const methodOverride = require("method-override")
const flash = require("connect-flash")
const session = require("express-session")
const passport = require("passport")
const MongoStore = require("connect-mongo")
const { createServer } = require("http")
const { Server } = require("socket.io")
const socketCtrl = require("./controllers/sockets.controller")

// Initializations
const app = express()
const httpServer = createServer(app)

const io = new Server(httpServer, {})
socketCtrl(io)
require("./config/passport")

// Settings
app.set("port", process.env.PORT || 8080)
app.set("views", path.join(__dirname, "views"))
app.engine(
	".hbs",
	exphbs.engine({
		defaultLayout: "main",
		layoutsDir: path.join(app.get("views"), "/layouts"),
		partialsDir: path.join(app.get("views"), "/partials"),
		extname: ".hbs",
	})
)
app.set("view engine", ".hbs")

// Middlewares
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(methodOverride("_method"))
app.use(
	session({
		store: MongoStore.create({
			mongoUrl:
				"mongodb+srv://fedeUsername:Mongo.0303@cluster0.0kdfdvp.mongodb.net/?retryWrites=true&w=majority",
			mongoOptions: {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			},
		}),

		secret: "secreto",
		cookie: { maxAge: 600000 },
		resave: false,
		saveUninitialized: false,
	})
)
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// Global Variables
app.use((req, res, next) => {
	res.locals.success_msg = req.flash("success_msg")
	res.locals.error_msg = req.flash("error_msg")
	res.locals.error = req.flash("error")
	res.locals.user = req.user || null
	next()
})

// Routes
app.use(require("./routes/index.routes"))
app.use(require("./routes/products.routes"))
app.use(require("./routes/chat.routes"))
app.use(require("./routes/users.routes"))
app.use(require("./routes/info.routes"))
app.use(require("./routes/random.routes"))

// Static Files
app.use(express.static(path.join(__dirname, "public")))

module.exports = { app, httpServer }
