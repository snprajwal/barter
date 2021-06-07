import { getPass } from '../modules/db.js'
import { genAccessToken, genRefreshToken } from '../modules/jwt.js'
import bcrypt from 'bcrypt'
import express from 'express'
const router = express.Router()

router.post('/', async (req, res) => {
	const email = req.body.email
	try {
		const pass = await getPass(email)
		if (!pass) { return res.status(404).send('User does not exist') }
		const match = await bcrypt.compare(req.body.password, pass)
		if (!match) { return res.status(401).send('Incorrect password') }
		accessToken = await genAccessToken(email)
		refreshToken = await genRefreshToken(email, pass)
		return res.status(200).json({ accessToken, refreshToken })
	} catch (err) { console.log(err) }
})

export default router
