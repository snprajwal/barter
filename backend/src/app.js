const login = require('./routes/login')
const signup = require('./routes/signup')
const wallet = require('./routes/wallet')
const products = require('./routes/products')
const inventory = require('./routes/inventory')
const orders = require('./routes/orders')
const isAuth = require('./middlewares/auth')
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
// Healthcheck
app.get('/ping', async (_, res) => res.json({"msg": "pong"}))
// Auth
app.use('/login', login)
app.use('/signup', signup)
// Wallet
app.use('/wallet', isAuth, wallet)
// Products
app.get('/', isAuth, async (_, res) => res.redirect('/products'))
app.use('/products', isAuth, products)
// Inventory
app.use('/inventory', isAuth, inventory)
// Orders
app.use('/orders', isAuth, orders)
// Run the server
app.listen(3000, () => console.log('Listening on port 3000'))
