import login from './routes/login.js'
import signup from './routes/signup.js'
import isAuth from './middlewares/auth.js'
import express from 'express'
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/', isAuth, async (req, res) => res.send('Express is running'))
app.use('/login', login)
app.use('/signup', signup)
app.listen(3000, () => console.log('Listening on port 3000'))
