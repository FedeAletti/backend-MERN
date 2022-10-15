const { faker } = require("@faker-js/faker")
const createId = require("./createId")

const createNFakeProducts = (n = 5) => {
	let products = []
	for (let i = 0; i < n; i++) {
		products.push({
			id: createId(),
			name: faker.commerce.product(),
			price: faker.commerce.price(10000, 20000, 0, "$"),
			thumbnail: faker.image.image(200, 200, false),
		})
	}
	return products
}

module.exports = createNFakeProducts
