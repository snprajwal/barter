const {getAmount, depositAmount, withdrawAmount} = require('../modules/db')
const {check, validationResult} = require('express-validator')
const router = require('express').Router()

router.get('/', async (req, res) => {
	try {
		const wallet = await getAmount(req.body.userId)
		if (!wallet) {
			return res.status(200).json({'balance': 0})
		}
		return res.status(200).json({'balance': wallet.sum})

	} catch (err) {console.log(err)}
})

router.post('/deposit', [
	check('amount').isInt()
], async (req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({'error': errors.array()})
	}

	await depositAmount(req.body.userId, req.body.amount)
	return res.status(200).json({'msg': 'Amount credited'})
})

router.post('/withdraw', [
	check('amount').isInt()
], async (req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({'error': errors.array()})
	}

	await withdrawAmount(req.body.userId, req.body.amount)
	return res.status(200).json({'msg': 'Amount debited'})
})

module.exports = router
