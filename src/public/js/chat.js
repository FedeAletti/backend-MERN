const socket = io()
socket.on("connect", () => {
	console.log(socket.id)
})

const denormalize = (messages) => {
	const author = new normalizr.schema.Entity("authors")
	const mensajes = new normalizr.schema.Entity("mensajes", {
		author: author,
	})
	const chats = new normalizr.schema.Entity("chats", { chats: [mensajes] })

	const denormalizedMessages = normalizr.denormalize(
		messages.result,
		chats,
		messages.entities
	)
	return denormalizedMessages
}

const button = document.getElementById("sendMessage")
button.addEventListener("click", (e) => {
	const message = {
		author: {
			id: document.getElementById("email").value,
			nombre: document.getElementById("name").value,
			apellido: document.getElementById("surname").value,
			edad: document.getElementById("age").value,
			alias: document.getElementById("nickname").value,
			avatar: document.getElementById("avatar").value,
		},
		text: document.getElementById("msg-box").value,
	}
	socket.emit("new-message", JSON.stringify(message))
	document.getElementById("msg-box").value = ""
})

socket.on("messages", (data) => {
	let denormalizedChats = denormalize(data)
	let compression =
		(JSON.stringify(denormalizedChats).length / JSON.stringify(data).length) *
		100
	document.getElementById(
		"div-compress"
	).innerText = `Porcentaje de compresion es %${compression
		.toString()
		.slice(0, 5)}`

	const add = denormalizedChats.chats
		.sort((b, a) => b.timestamp + a.timestamp)
		.map((chat) => {
			let time = new Date(chat.timestamp)
			let formatedTime = time
				.toISOString()
				.replace(/([^T]+)T([^\.]+).*/g, "$1 $2")

			return `
					<div class="">
						<div class="message card d-flex justify-content-start rounded mb-4 mx-auto">
							<div class="message__author card-header">
								<div class="">
									<div class="d-flex justify-content-between align-items-center">
										<div class="d-flex align-items-center gap-3">
											<img src="${chat.author.avatar}" width="40px" height="100%" alt="">
											<p class="m-0 fw-bolder">
												Fede
											</p>
										</div>
										<small class="text-muted">${formatedTime}</small>
									</div>
									<div>
										<div class="d-flex justify-content-between my-2">
											<small class="primary">${chat.author.id}</small>
										</div>
									</div>
								</div>
							</div>
							<div class="message__content card-body">
								<p class="card-text">${chat.text}</p>
							</div>
						</div>
					</div>
                    `
		})
		.join(" ")

	document.getElementById("div-chats").innerHTML = add
})
