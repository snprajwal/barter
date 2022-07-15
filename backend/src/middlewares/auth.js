const jwt = require('jsonwebtoken')

const isAuth = async (req, res, next) => {
	if (!req.headers['authorization']) {return res.status(401).json({'error': 'ERR_NO_TOKEN'})}
	const accessToken = req.headers['authorization'].split(' ')[1]
	if (!accessToken) {return res.status(401).json({'error': 'ERR_NO_TOKEN'})}
	try {
		const payload = await jwt.verify(accessToken, process.env.JWT_SECRET_KEY)
		if (payload.type !== 'access') {return res.status(401).json({'error': 'ERR_INVALID_TOKEN'})}
		return next()
	} catch (err) {return res.status(401).json({"error": err})}
}

module.exports = isAuth
