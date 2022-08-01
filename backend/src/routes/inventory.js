const {listInventoryItems, addInventoryItem, getInventoryItem} = require('../modules/db')
const {check, validationResult} = require('express-validator')
const router = require('express').Router()

router.get('/', async (_, res) => {
	try {
		const items = await listInventoryItems()
		if (!items) {
			return res.status(204).json({'msg': 'No items available'})
		}
		return res.status(200).json(items)
	} catch (err) {console.log(err)}
})

router.post('/add', [
	check('productId').isInt(),
	check('sellerId').isInt(),
	check('quantity').isInt()
], async (req, res) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({'error': errors.array()})
		}

		await addInventoryItem(req.body.productId, req.body.sellerId, req.body.quantity)
		return res.status(201).json({'msg': 'New item added'})
	} catch (err) {console.log(err)}
})

router.get('/:productId', [
	check('productId').isInt()
], async (req, res) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({'error': errors.array()})
		}

		const product = await getInventoryItem(req.params.productId)
		if (!product) {
			return res.status(404).json({
				'error': 'ERR_NO_ITEM',
				'msg': 'Item does not exist'
			})
		}
		return res.status(200).json(product)
	} catch (err) {console.log(err)}
})

module.exports = router
