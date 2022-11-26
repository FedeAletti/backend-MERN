const twilio = require("twilio")
const { logger, errorLogger } = require("../config/logger")

const ACCOUNT_SID = process.env.ACCOUNT_SID_TWILIO
const AUTH_TOKEN = process.env.AUTH_TOKEN_TWILIO
const PHONE_NUMBER = process.env.SMSFROM

const client = twilio(ACCOUNT_SID, AUTH_TOKEN)

// HACER QUE RECIBA EL NUMERO DESTINO
const sendSMS = async (body, phoneTo) => {
	try {
		const message = await client.messages.create({
			body,
			from: PHONE_NUMBER,
			to: `+${phoneTo}`,
		})
		logger.info({ message: "Mensaje Enviado", info })
	} catch (e) {
		errorLogger.error(e)
	}
}

module.exports = sendSMS
