const { Pool } = require('pg')

const pool = new Pool({
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT
})

const getPass = async (email) => {
	try {
		const res = await pool.query('SELECT password FROM users WHERE email = $1', [email])
		if (!res.rows[0]) { return null }
		return res.rows[0].password
	} catch (err) { console.log(err) }
}

const createUser = async (name, email, phone, pass) => {
	try {
		await pool.query('INSERT INTO users (name, email, phone, password) VALUES ($1, $2, $3, $4)', [name, email, phone, pass])
		return console.log('New user created')
	} catch (err) { console.log(err) }
}

const createProduct = async (name, price) => {
	try {
		await pool.query('INSERT INTO products (name, price) VALUES ($1, $2)', [name, price])
		return console.log('New product created')
	} catch (err) { console.log(err) }
}

module.exports = { getPass, createUser, createProduct }
