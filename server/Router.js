const bcrypt = require('bcrypt')

class Router {
	constructor(app, db) {
		this.login(app, db)
		this.register(app, db)
		this.logout(app, db)
		this.isLoggedIn(app, db)
		this.addToList(app, db)
		this.getListItems(app, db)
		this.getListItems(app, db)
		this.deleteListItem(app, db)
	}

	login(app, db) {
		app.post('/login', (req, res) => {
			let username = req.body.username
			let password = req.body.password

			username = username.toLowerCase()

			if (username.length > 12 || password.length > 12) {
				res.json({
					success: false,
					msg: 'An error occurred, please try again.'
				})
				return
			}

			let cols = [username]

			db.query('SELECT * FROM user WHERE username = ? LIMIT 1', cols, (err, data, fields) => {
				if (err) {
					res.json({
						success: false,
						msg: 'An error occurred, please try again.'
					})
					return
				}
				if (data && data.length === 1) {
					bcrypt.compare(password, data[0].password, (bcryptErr, verified) => {
						if (verified) {
							req.session.userID = data[0].id
							res.json({
								data: data,
								success: true, 
								username: data[0].username
							})
							return
						} else {
							res.json({
								success: false,
								msg: "Invalid password"
							})
						}
					})
				} else {
					res.json({
						success: false,
						msg: "Username does not exist"
					})
				}
			})
		})
	}

	register(app, db) {
		app.post('/register', (req, res) => {
			let username = req.body.username
			let password = req.body.password
			let confirm = req.body.confirm

			username = username.toLowerCase()

			if (username.length > 12 || password.length > 12) {
				res.json({
					success: false,
					msg: 'Username or password too long, please try again.'
				})
				return
			}

			if (password !== confirm) {
				res.json({
					success: false,
					msg: 'Passwords do not match, please try again.'
				})
				return
			}

			db.query('SELECT * FROM user WHERE username = ? LIMIT 1', [username], (err, data, fields) => {
				if (data && data.length === 1) {
					res.json({
						success: false,
						msg: 'Username taken.'
					})
					return
				} else {
					let pswrd = bcrypt.hashSync(password, 9)
					db.query('INSERT INTO user (username, password) VALUES (?, ?)', [username, pswrd], (err, data, fields) => {
						if (err) {
							res.json({
								success: false,
								msg: 'An error occurred, please try again.'
							})
							return
						} else {
							res.json({
								success: true,
								username: username,
								msg: `${username} has been registered.`
							})
						}
					})
				}
			})
		})
	}

	logout(app, db) {
		app.post('/logout', (req, res) => {
			if (req.session.userID) {
				req.session.destroy()
				res.json({
					success: true
				})

				return true
			} else {
				res.json({
					success: false
				})

				return false
			}
		})
	}

	isLoggedIn(app, db) {
		app.post('/isLoggedIn', (req, res) => {
			if (req.session.userID) {
				let cols = [req.session.userID]
				db.query('SELECT * FROM user WHERE id = ? LIMIT 1', cols, (err, data, fields) => {
					if (data && data.length === 1) {
						res.json({
							success: true,
							username: data[0].username
						})

						return true
					} else {
						res.json({
							success: false,
						})
					}
				})
			} else {
				res.json({
					success: false,
				})
			}
		})
	}

	addToList(app, db) {
		const sql = 'INSERT INTO list (username, listID, name, sourceUrl) VALUES (?, ?, ?, ?)'

		app.post('/list', (req, res) => {
			let username = req.body.username
			let listID = req.body.listID
			let name = req.body.name
			let sourceUrl = req.body.sourceUrl
			if (req.session.userID) {
				db.query(sql, [username, listID, name, sourceUrl], (err) => {
					if (err) {
						res.json({
							success: false,
							msg: err
						})
						return
					} else {
						res.json({
							success: true,
							username: username,
							listID: listID,
							name: name,
							sourceUrl: sourceUrl
						})
						console.log(sql)
					}
				})
			} else {
				res.json({
					success: false,
				})
			}
		})
	}

	getListItems(app, db) {
		const sql = `SELECT * from list WHERE username = ?`

		app.get('/list', (req, res) => {
			let username = req.query.username
			db.query(sql, [username], (err, rows) => {
				if (err) {
					res.json({
						success: false,
						msg: err
					})
					return
				} else {
					res.json({
    				success: true,
    				data: rows,
  				})
				}
			})
		}) 
	}

	deleteListItem(app, db) {
		const sql = `DELETE from list WHERE username = ? AND listID = ?`

		app.delete('/list', (req, res) => {
			let username = req.query.username
			let listID = req.query.listID
			db.query(sql, [username, listID], (err, rows) => {
				if (err) {
					res.json({
						success: false,
						msg: err
					})
					return
				} else {
					res.json({
    				success: true,
    				data: rows,
  				})
				}
			})
		}) 
	}
}

module.exports = Router