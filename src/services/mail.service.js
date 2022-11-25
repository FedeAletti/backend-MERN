const { createTransport } = require("nodemailer")

const { logger, errorLogger } = require("../config/logger")

let MAIL = process.env.GMAIL_MAIL

const transporter = createTransport({
	service: "gmail",
	port: 587,
	auth: {
		user: MAIL,
		pass: process.env.GMAIL_PASS,
	},
})

const sendEmail = async ({ username, name, age, address, phone, image }) => {
	try {
		const mailOptions = {
			from: MAIL,
			to: MAIL,
			subject: `Nuevo Usuario Registrado:`,
			html: `
                    <h1>NUEVO USUARIO REGISTRADO</h1>
                    <h2>El Sr/Sra ${name} se ha registrado exitosamente con su usuario: ${username}</h2>
                    <p>Edad: ${age}</p>
                    <p>Direccion: ${address}</p>
                    <p>Telefono Celular: ${phone}</p>
                    <img src="${image}" />
                    `,
			// attachments: [
			// 	{
			// 		filename: `${image}`,
			// 		path: path.join(__dirname, "../public/uploads/") + image,
			// 	},
			// ],
		}
		const info = await transporter.sendMail(mailOptions)
		logger.info({ message: "Mail de registro enviado", info })
	} catch (err) {
		errorLogger.error(err)
	}
}

const sendPurchaseEmail = async (formattedProducts, user) => {
	try {
		const { username, name, age, address, phone, image } = user

		const mailOptions = {
			from: MAIL,
			to: MAIL,
			subject: `Nuevo pedido de: ${name}, ${username}`,
			html: `
                <h1>NUEVO PEDIDO</h1>
                
                <div>La compra fue la siguiente:</div>
                <div><p>${formattedProducts.join("</p><p>")}</p></div>
                </div>
            `,
		}
		const info = await transporter.sendMail(mailOptions)
		logger.info({ message: "Mail de pedido enviado", info })
	} catch (err) {
		errorLogger.error(err)
	}
}
