const {Pool} = require('pg')

//db connection 
const pool = new Pool({
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT
})

// Auth
const getUser = async (email) => {
	try {
		const res = await pool.query('SELECT id, password FROM users WHERE email = $1', [email])
		if (!res.rows[0]) {return null}
		return res.rows[0]
	} catch (err) {console.log(err)}
}

const createUser = async (name, email, phone, pass) => {
	try {
		await pool.query('INSERT INTO users (name, email, phone, password) VALUES ($1, $2, $3, $4)', [name, email, phone, pass])
		return console.log('New user created')
	} catch (err) {console.log(err)}
}

// Wallet
const getAmount = async (id) => {
	try {
		const res = await pool.query('SELECT SUM(amount) FROM transactions WHERE user_id = $1', [id])
		if (!res.rows[0]) {return null}
		return res.rows[0]
	} catch (err) {console.log(err)}
}

const depositAmount = async (id, amount) => {
	try {
		await pool.query('INSERT INTO transactions (user_id, transfer_type, amount) VALUES ($1, $2, $3)', [id, 'credit', amount])
		return console.log('Amount credited')
	} catch (err) {console.log(err)}
}

const withdrawAmount = async (id, amount) => {
	try {
		await pool.query('INSERT INTO transactions (user_id, transfer_type, amount) VALUES ($1, $2, $3)', [id, 'debit', -amount])
		return console.log('Amount debited')
	} catch (err) {console.log(err)}
}

// Products
const listProducts = async () => {
	try {
		const res = await pool.query('SELECT * FROM products')
		if (!res.rows.length) {return null}
		return res.rows
	} catch (err) {console.log(err)}
}

const createProduct = async (name, price) => {
	try {
		await pool.query('INSERT INTO products (name, price) VALUES ($1, $2)', [name, price])
		return console.log('New product created')
	} catch (err) {console.log(err)}
}

const getProduct = async (id) => {
	try {
		const res = await pool.query('SELECT * FROM products WHERE id = $1', [id])
		if (!res.rows[0]) {return null}
		return res.rows[0]
	} catch (err) {console.log(err)}
}

// Inventory
const listInventoryItems = async () => {
	try {
		const res = await pool.query('SELECT * FROM inventory')
		if (!res.rows.length) {return null}
		return res.rows
	} catch (err) {console.log(err)}
}

const addInventoryItem = async (productId, sellerId, quantity) => {
	try {
		await pool.query('INSERT INTO inventory VALUES ($1, $2, $3) ON CONFLICT product_id DO UPDATE SET quantity = $4', [productId, sellerId, quantity, quantity])
		return console.log('Inventory item added')
	} catch (err) {console.log(err)}
}

const getInventoryItem = async (productId) => {
	try {
		const res = await pool.query('SELECT * FROM inventory WHERE product_id = $1', [productId])
		if (!res.rows.length) {return null}
		return res.rows
	} catch (err) {console.log(err)}
}

// Orders
const listOrders = async (id) => {
	try {
		const res = await pool.query('SELECT product_id, quantity, price FROM orders WHERE buyer_id = $1', [id])
		if (!res.rows.length) {return null}
		return res.rows
	} catch (err) {console.log(err)}
}

const createOrder = async (buyerId, productId, quantity, price) => {
	try {
		await pool.query('INSERT INTO orders (buyer_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)', [buyerId, productId, quantity, price])
		return console.log('Order created')
	} catch (err) {console.log(err)}
}

const getOrder = async (id) => {
	try {
		const res = await pool.query('SELECT product_id, quantity, price FROM orders WHERE buyer_id = $1', [id])
		if (!res.rows[0]) {return null}
		return res.rows[0]
	} catch (err) {console.log(err)}
}

module.exports = {
	getUser, createUser, createProduct,
	getAmount, depositAmount, withdrawAmount,
	listProducts, createProduct, getProduct,
	listInventoryItems, addInventoryItem, getInventoryItem,
	listOrders, getOrder, createOrder
}
