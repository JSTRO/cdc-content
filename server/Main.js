const express = require('express')
const app = express()
const path = require('path')
const mysql = require('mysql')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session)
const Router = require('./Router')

app.use(express.static(path.join(__dirname, '../public')))
app.use(express.json())

// Database
const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'a4UM7MWPDZzBt6tI',
	database: 'cdc-content',
	debug: ['ComQueryPacket', 'RowDataPacket'],
})

db.connect(err => {
	if (err) {
		console.log('DB error')
		throw err
		return false
	}

	console.log('Connected successfully.')
})

const sessionStore = new MySQLStore(
	{
		expiration: 10000,
		endConnectionOnClose: false,
	},
	db
)

app.use(
	session({
		key: 'X6utGXtH5fL61LG9dpZOPQiQwDdqc7lV',
		secret: 'MC5qnPYyihBnMakX7fycgVtvW3WRrKiQ',
		store: sessionStore,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 1825 * 86400 * 1000,
			httpOnly: false,
		},
	})
)

new Router(app, db)

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

app.listen(process.env.PORT || 8080)