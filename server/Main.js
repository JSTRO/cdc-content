const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const mysql = require('mysql')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session)
const Router = require('./Router')

app.use(cors())
app.use(express.static(path.join(__dirname, '../build')))
app.use(express.json())

// Database
// const db_config = {
// 	host: 'localhost',
// 	user: 'root',
// 	password: 'a4UM7MWPDZzBt6tI',
// 	database: 'cdc-content',
// 	debug: ['ComQueryPacket', 'RowDataPacket'],
// }

const db_config = {
	host: 'us-cdbr-east-04.cleardb.com',
	user: 'b3a33aa31d1b74',
	password: '51e0d99c',
	database: 'heroku_2c8efedceb90e88',
	debug: ['ComQueryPacket', 'RowDataPacket'],
}

const db = mysql.createPool(db_config)

// db.connect(err => {
// 	if (err) {
// 		console.log('DB error')
// 		throw err
// 		return false
// 	}

// 	console.log('Connected successfully.')
// })

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
			maxAge: 600000,
			httpOnly: false,
		},
	})
)

new Router(app, db)

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'))
})

app.listen(process.env.PORT || 8080)