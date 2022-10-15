require("dotenv").config()
const app = require("./server")
require("./database")

app.listen(app.get("port"), () => {
	console.log("Server is listening on port", app.get("port"))
	console.log("Open with Ctrl + Click: http://127.0.0.1:8080")
})
