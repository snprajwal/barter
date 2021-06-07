import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()

const genAccessToken = async (email) => {
	return await jwt.sign({
		'type': 'access',
		'email': email
	}, process.env.JWT_SECRET_KEY, {
		expiresIn : '15m'
	})
}

const genRefreshToken = async (email, pass) => {
	return await jwt.sign({
		'type': 'refresh',
		'email': email,
		'pass': pass
	}, process.env.JWT_SECRET_KEY)
}

export { genAccessToken, genRefreshToken }
