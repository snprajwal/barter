const {listOrders, createOrder, getOrder} = require('../modules/db')
const {check, validationResult} = require('express-validator')
const router = require('express').Router()

router.get('/', async (req, res) => {
	try {
		const orders = await listOrders(req.body.userId)
		if (!orders) {
			return res.status(204).json({'msg': 'No orders placed'})
		}
		return res.status(200).json(orders)
	} catch (err) {console.log(err)}
})

router.post('/new', [
	check('productId').isInt(),
	check('quantity').isInt(),
	check('price').isInt()
], async (req, res) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({'error': errors.array()})
		}

		await createOrder(req.body.userId, req.body.productId, req.body.quantity, req.body.price)
		return res.status(201).json({'msg': 'New order created'})
	} catch (err) {console.log(err)}
})

router.get('/:orderId', [
	check('orderId').isInt()
], async (req, res) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({'error': errors.array()})
		}

		const order = await getOrder(req.params.orderId)
		if (!order) {
			return res.status(404).json({
				'error': 'ERR_NO_ORDER',
				'msg': 'Order does not exist'
			})
		}
		return res.status(200).json(order)
	} catch (err) {console.log(err)}
})

module.exports = router
