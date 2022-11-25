const btnAddCart = document.querySelector("#addCart")

const updateCart = (productId) => {
	fetch("/cart", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			productId: productId,
		}),
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data)
		})
		.catch((err) => console.log(err))
}

btnAddCart.addEventListener("click", (e) => {
	e.preventDefault()
	const productId = btnAddCart.getAttribute("data-productID")
	console.log(productId)
	// const productId = document.querySelector("#productId").value
	// const quantity = document.querySelector("#quantity").value
	updateCart(productId)
})
