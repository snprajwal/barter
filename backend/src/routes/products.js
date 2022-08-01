const {listProducts, createProduct, getProduct} = require('../modules/db')
const {check, validationResult} = require('express-validator')
const router = require('express').Router()

router.get('/', async (_, res) => {
	try {
		const products = await listProducts()
		if (!products) {
			return res.status(204).json({'msg': 'No products available'})
		}
		return res.status(200).json(products)
	} catch (err) {console.log(err)}
})

router.post('/new', [
	check('name').isLength({min: 1}),
	check('price').isInt()
], async (req, res) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({'error': errors.array()})
		}

		await createProduct(req.body.name, req.body.price)
		return res.status(201).json({'msg': 'New product created'})
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

		const product = await getProduct(req.params.productId)
		if (!product) {
			return res.status(404).json({
				'error': 'ERR_NO_PRODUCT',
				'msg': 'Product does not exist'
			})
		}
		return res.status(200).json(product)
	} catch (err) {console.log(err)}
})

module.exports = router
