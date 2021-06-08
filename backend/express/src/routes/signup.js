const { getPass, createUser } = require('../modules/db')
const bcrypt = require('bcrypt')
const router = require('express').Router()

router.post('/', async (req, res) => {
	const { name, phone, email, password } = req.body
	try {
		let pass = await getPass(email)
		if (pass) { return res.status(500).send('User already exists, try logging in') }
		pass = await bcrypt.hash(password, 5)
		await createUser(name, email, phone, pass)
		return res.status(201).send('New user created')
	} catch (err) { console.log(err) }
})

module.exports = router
