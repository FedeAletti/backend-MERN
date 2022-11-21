require("dotenv").config()
const yargs = require("yargs/yargs")(process.argv.slice(2))
const { app, httpServer } = require("./server")
require("./database")
const cluster = require("cluster")
const logger = require("./config/logger")
const numCPUs = require("os").cpus().length

console.log(numCPUs)

const args = yargs.alias({
	p: "port",
}).argv

const PORT = args.port || 8080

// if (cluster.isMaster) {
// 	console.log(`Master ${process.pid} is running`)
// 	// fork workers.
// 	for (let i = 0; i < numCPUs; i++) {
// 		cluster.fork()
// 	}
// 	cluster.on("exit", (worker, code, signal) => {
// 		//cluster.fork();
// 		console.log(`worker ${worker.process.pid} died`)
// 	})
// } else {
// 	httpServer.listen(PORT)
// 	console.log(`Worker ${process.pid} started`)
// }

httpServer.listen(PORT, () =>
	console.log(`Servidor Funcionando en Puerto 8080: http://127.0.0.1:${PORT}`)
)
httpServer.on("error", (error) => logger.error(`Error en servidor ${error}`))
