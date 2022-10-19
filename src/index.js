require("dotenv").config()
const yargs = require("yargs/yargs")(process.argv.slice(2))
const { app, httpServer } = require("./server")
require("./database")

// app.listen(app.get("port"), () => {
// 	console.log("Server is listening on port", app.get("port"))
// 	console.log("Open with Ctrl + Click: http://127.0.0.1:8080")
// })

const args = yargs.alias({
	p: "port",
}).argv
console.log(args)

const PORT = args.port || 8080

httpServer.listen(PORT, () =>
	console.log(`Servidor Funcionando en Puerto 8080: http://127.0.0.1:${PORT}`)
)
httpServer.on("error", (error) => console.log(`Error en servidor ${error}`))
