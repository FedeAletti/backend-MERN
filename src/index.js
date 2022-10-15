require("dotenv").config()
const { app, httpServer } = require("./server")
require("./database")

// app.listen(app.get("port"), () => {
// 	console.log("Server is listening on port", app.get("port"))
// 	console.log("Open with Ctrl + Click: http://127.0.0.1:8080")
// })

const PORT = process.env.port || 8080
httpServer.listen(process.env.PORT || PORT, () =>
	console.log("Servidor Funcionando en Puerto 8080: " + "http://127.0.0.1:8080")
)
httpServer.on("error", (error) => console.log(`Error en servidor ${error}`))
