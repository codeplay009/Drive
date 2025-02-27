const express = require('express')
const app = express()
const userRouter = require('./routes/user.routes')
const submitRouter = require('./routes/submit.routes')
const connectDB = require('./config/db')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

dotenv.config()
connectDB()

app.set('view engine','ejs')

app.use(express.static('public'))

app.use('',userRouter)

app.use('', submitRouter)

app.use(cookieParser())

app.listen('3000')