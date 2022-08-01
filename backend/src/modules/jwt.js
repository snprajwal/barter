const jwt = require('jsonwebtoken')

const genAccessToken = async (id, email) => {
	return await jwt.sign({
		'type': 'access',
		'id': id,
		'email': email
	}, process.env.JWT_SECRET_KEY, {
		expiresIn: '15m'
	})
}

const genRefreshToken = async (id, email, pass) => {
	return await jwt.sign({
		'type': 'refresh',
		'id': id,
		'email': email,
		'pass': pass
	}, process.env.JWT_SECRET_KEY)
}

module.exports = {genAccessToken, genRefreshToken}
