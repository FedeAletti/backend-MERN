const { faker } = require("@faker-js/faker")

const createId = () => {
	return faker.database.mongodbObjectId()
}

module.exports = createId
