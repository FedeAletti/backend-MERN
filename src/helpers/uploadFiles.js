const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
	destination: path.join(__dirname, "../public/uploads"),
	filename: (req, file, cb) => {
		//null es que no da error
		//cb es callback
		//file.originalname
		cb(null, path.extname(file.originalname).toLocaleLowerCase())
	},
})

const upLoad = multer({
	storage,
	limits: { fileSize: 1000000000 },
	fileFilter: (req, file, cb) => {
		const filetypes = /jpeg|jpg|gif|png/
		const mimetype = filetypes.test(file.mimetype)
		const extname = filetypes.test(path.extname(file.originalname))
		if (mimetype && extname) {
			return cb(null, true)
		}
		cb("error: archivo debe ser una imagen")
	},
	dest: path.join(__dirname, "../public/uploads"),
}).single("image")

const uploadFile = (req, res) => {
	const file = req.file
	console.log(file)
	res.send(file)
}

module.exports = { upLoad, uploadFile }
