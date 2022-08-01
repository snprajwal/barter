const {getUser, createUser} = require('../modules/db')
const bcrypt = require('bcrypt')
const {check, validationResult} = require('express-validator')
const router = require('express').Router()

router.post('/', [
	check('email').isEmail(),
	check('password').isLength({min: 1}),
	check('name').isLength({min: 1})
], async (req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({'error': errors.array()})
	}

	const {name, phone, email, password} = req.body
	try {
		const user = await getUser(email)
		if (user) {
			return res.status(500).json({
				'error': 'ERR_USER_EXISTS',
				'msg': 'User already exists, try logging in'
			})
		}
		const pass = await bcrypt.hash(password, 5)
		await createUser(name, email, phone, pass)
		return res.status(201).json({'msg': 'New user created'})
	} catch (err) {console.log(err)}
})

module.exports = router
