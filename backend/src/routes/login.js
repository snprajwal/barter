const {getUser} = require('../modules/db')
const {genAccessToken, genRefreshToken} = require('../modules/jwt')
const bcrypt = require('bcrypt')
const {check, validationResult} = require('express-validator')
const router = require('express').Router()

router.post('/', [
	check('email').isEmail(),
	check('password').isLength({min: 1})
], async (req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({'error': errors.array()})
	}

	const email = req.body.email
	try {
		const user = await getUser(email)
		if (!user) {
			return res.status(404).json({
				'error': 'ERR_NO_USER',
				'msg': 'User does not exist'
			})
		}
		const match = await bcrypt.compare(req.body.password, user.password)
		if (!match) {
			return res.status(401).json({
				'error': 'ERR_INCORRECT_PASSWORD',
				'msg': 'Incorrect password'
			})
		}
		accessToken = await genAccessToken(user.id, email)
		refreshToken = await genRefreshToken(user.id, email, user.password)
		return res.status(200).json({accessToken, refreshToken})
	} catch (err) {console.log(err)}
})

module.exports = router
