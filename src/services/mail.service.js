const { createTransport } = require("nodemailer")

const { logger, errorLogger } = require("../config/logger")

let MAIL = process.env.GMAIL_MAIL
let MAILPASS = process.env.GMAIL_PASS

const transporter = createTransport({
	service: "gmail",
	port: 587,
	auth: {
		user: MAIL,
		pass: MAILPASS,
	},
})

const sendEmail = async (user) => {
	try {
		const { name, age, address, email, phone, avatar } = user
		const mailOptions = {
			from: "Proyecto Backend",
			to: MAIL,
			subject: `Nuevo Usuario Registrado:`,
			html: `
                    <h1>NUEVO USUARIO REGISTRADO</h1>
                    <h2>El Sr/Sra ${name}</h2>
					<p>Edad: ${age}</p>
                    <p>Telefono Celular: ${phone}</p>
					<p>Dirección: ${address}</p>
                    <p>Correo: ${email}</p>
                    <img src="${avatar}" />
                    `,
		}
		const info = await transporter.sendMail(mailOptions)
		logger.info({ message: "Mail de registro enviado", info })
	} catch (err) {
		errorLogger.error(err)
	}
}

const sendPurchaseEmail = async (formattedProducts, user) => {
	try {
		const { name, email } = user

		const mailOptions = {
			from: MAIL,
			to: MAIL,
			subject: `Nuevo pedido de: ${name}`,
			html: `
                <h1>NUEVO PEDIDO</h1>
                
                <div>La compra fue la siguiente:</div>
                <div>
					<ul>${formattedProducts}</ul>
				</div>
				<hr />
				<div>El cliente es: ${name}, su correo: ${email}</div>
            `,
		}
		const info = await transporter.sendMail(mailOptions)
		logger.info({ message: "Mail de pedido enviado", info })
	} catch (err) {
		errorLogger.error(err)
	}
}

module.exports = { sendEmail, sendPurchaseEmail }
