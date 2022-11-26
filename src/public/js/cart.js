const btnAddCart = document.querySelector("#addCart")
const btnRemoveCart = document.querySelectorAll(".delete-product")
const tbodyCart = document.querySelectorAll("#tbodyCart tr")

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
			// console.log(data)
		})
		.catch((err) => console.log(err))
}

const deleteProd = (productId) => {
	console.log(productId)
	fetch("/cart", {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			productId: productId,
		}),
	})
		.then(() => {
			location.reload()
		})
		.catch((err) => console.log(err))
}

btnAddCart?.addEventListener("click", (e) => {
	e.preventDefault()
	const productId = btnAddCart.getAttribute("data-productID")
	updateCart(productId)
})

btnRemoveCart?.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		e.preventDefault()
		if (e.target.parentElement.parentElement.getAttribute("data-productID")) {
			const productId =
				e.target.parentElement.parentElement.getAttribute("data-productID")
			deleteProd(productId)
		} else if (e.target.parentElement.getAttribute("data-productID")) {
			const productId = e.target.parentElement.getAttribute("data-productID")
			deleteProd(productId)
		}
	})
})
