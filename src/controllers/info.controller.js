const infoController = {
	getInfo: (req, res) => {
		res.json({
			OS: process.platform,
			nodeVersion: process.version,
			memoryUsage: process.memoryUsage().rss,
			executionPath: process.execPath,
			processId: process.pid,
			path: process.cwd(),
		})
	},
}

module.exports = infoController
