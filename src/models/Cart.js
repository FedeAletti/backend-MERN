const { Schema, model } = require("mongoose")
const { ProductSchema } = require("./Product")

const CartSchema = new Schema(
	{
		userId: { type: Schema.ObjectId, required: true },
		products: { type: [ProductSchema], required: true },
	},
	{ timestamps: true }
)

module.exports = model("Cart", CartSchema)
