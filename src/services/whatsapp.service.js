const twilio = require("twilio")

const ACCOUNT_SID = process.env.ACCOUNT_SID_TWILIO
const AUTH_TOKEN = process.env.AUTH_TOKEN_TWILIO
const PHONE_NUMBER = process.env.FROMWSP

const client = twilio(ACCOUNT_SID, AUTH_TOKEN)

const sendWhatsapp = async (body) => {
	try {
		await client.messages
			.create({
				body,
				from: process.env.FROMWSP,
				to: process.env.TOWSP,
			})
			.then((message) => console.log(message.sid))
			.done()
	} catch (e) {
		console.log(e)
	}
}

module.exports = sendWhatsapp
