require('dotenv').config()
const jwt = require('jsonwebtoken')

const isAuth = async (req, res, next) => {
	if (!req.headers['authorization']) { return res.status(401).send('No token') }
	const accessToken = req.headers['authorization'].split(' ')[1]
	if (!accessToken) { return res.status(401).send('Invalid token') }
	try {
		const payload = await jwt.verify(accessToken, process.env.JWT_SECRET_KEY)
		if (payload.type !== 'access') { return res.status(401).send('Incorrect token') }
		return next()
	} catch(err) { return res.status(401).send(err) }
}

module.exports = isAuth
