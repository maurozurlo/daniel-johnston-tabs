require("dotenv").config();
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path')
//Express & basic middleware
const app = express()
const PORT = process.env.PORT || 5000;
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('tiny'))

// Session
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session)
const pool = require('./config/db')

const sessionStore = new MySQLStore({}, pool)
app.use(session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

// Admin Panel routes
app.use('/api/users', require('./routes/user'))
app.use('/api', require('./routes/tabs'))

app.listen(PORT, '0.0.0.0', () => console.log(`Listening on port ${PORT}`));
