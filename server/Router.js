const bcrypt = require('bcrypt')
const validator = require('email-validator')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

class Router {
	constructor(app, db) {
		this.login(app, db)
		this.register(app, db)
		this.logout(app, db)
		this.resetPassword(app, db)
		this.updatePassword(app, db)
		this.isLoggedIn(app, db)
		this.addToList(app, db)
		this.getListItems(app, db)
		this.getListItems(app, db)
		this.deleteListItem(app, db)
	}

	login(app, db) {
		app.post('/login', (req, res) => {
			let { username, password } = req.body

			username = username.toLowerCase()

			db.query(
				'SELECT * FROM user WHERE username = ? LIMIT 1',
				[username],
				(err, data, fields) => {
					if (err) {
						res.json({
							success: false,
							error: err,
							msg: 'An error occurred, please try again.'
						})
						return
					}
					if (data && data.length === 1) {
						bcrypt.compare(
							password,
							data[0].password,
							(bcryptErr, verified) => {
								if (verified) {
									req.session.userID = data[0].id
									res.json({
										data: data,
										success: true,
										username: data[0].username,
									})
									return
								} else {
									res.json({
										success: false,
										error: bcryptErr,
										msg: 'Invalid password',
									})
								}
							}
						)
					} else {
						res.json({
							success: false,
							error: 'username',
							msg: 'Username does not exist',
						})
					}
				}
			)
		})
	}

	register(app, db) {
		app.post('/register', (req, res) => {
			let { username, email, password, confirm } = req.body

			username = username.toLowerCase()

			if (!validator.validate(email)) {
				res.json({
					success: false,
					error: 'email',
					msg: 'Please provide a valid email.',
				})
			}

			if (password.length < 6) {
				res.json({
					success: false,
					error: 'password',
					msg: 'Password must be at least 6 characters, please try again.',
				})
			}

			if (password !== confirm) {
				res.json({
					success: false,
					error: 'confirm',
					msg: 'Passwords do not match, please try again.',
				})
			}

			db.query( // Check if username already exists, if not, insert in db
				'SELECT * FROM user WHERE username = ? LIMIT 1',
				[username],
				(err, data, fields) => {
					if (data && data.length === 1) {
						res.json({
							success: false,
							error: 'password',
							msg: 'Username taken.',
						})
						return
					}
					let hashedPassword = bcrypt.hashSync(password, 9)
					db.query(
						'INSERT INTO user (username, email, password) VALUES (?, ?, ?)',
						[username, email, hashedPassword],
						(err, data, fields) => {
							if (err) {
								res.json({
									success: false,
									msg: 'An error occurred, please try again.',
								})
								return
							} else {
								res.json({
									success: true,
									username: username,
									msg: `${username} has been registered.`,
								})
							}
						}
					)
				}
			)
		})
	}

	logout(app, db) {
		app.post('/logout', (req, res) => {
			if (req.session.userID) {
				req.session.destroy()
				res.json({
					success: true,
				})
				return true
			} else {
				res.json({
					success: false,
				})
				return false
			}
		})
	}

	isLoggedIn(app, db) { // returns true if user is logged in, false if not
		app.post('/isLoggedIn', (req, res) => {
			if (req.session.userID) {
				db.query(
					'SELECT * FROM user WHERE id = ? LIMIT 1',
					[req.session.userID],
					(err, data, fields) => {
						if (data && data.length === 1) {
							res.json({
								success: true,
								username: data[0].username,
							})
							return true
						} else {
							res.json({
								success: false,
							})
						}
					}
				)
			} else {
				res.json({
					success: false,
				})
			}
		})
	}

	resetPassword(app, db) {
		app.post('/resetPassword', (req, res) => {
			let { email } = req.body

			if (email) {
				const token = crypto.randomBytes(20).toString('hex')
				const createdAt = Date.now()
				const expiration = createdAt + 3600000

				const sql = `UPDATE user SET token = ?, expiration = ?, createdAt = ?, used = ? WHERE email = ? LIMIT 1`

				db.query(
					sql,
					[token, expiration, createdAt, 0, email],
					(err, data, fields) => {
						if (data) {
							const transporter = nodemailer.createTransport({
								service: 'SendinBlue',
								auth: {
									user: `${process.env['EMAIL_ADDRESS']}`,
									pass: `${process.env['EMAIL_PASSWORD']}`,
								},
							})

							const mailOptions = {
								from: `${process.env['EMAIL_ADDRESS']}`,
								to: email,
								subject: 'Link To Reset Password',
								text:
									'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
									'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n' +
									`https://cdc-content.herokuapp.com/reset/${token}\n\n` +
									'If you did not request this, please ignore this email and your password will remain unchanged.\n',
							}

							console.log('sending mail')

							transporter.sendMail(mailOptions, (err, response) => {
								if (err) {
									console.error(err)
								} else {
									console.log('here is the res: ', response)
									res.json({
										success: true,
										msg: 'recovery email sent',
										email: email,
										token: token,
										expiration: expiration,
									})
								}
							})
						} else {
							console.log(err)
							res.json({
								success: false,
							})
						}
					}
				)
			} else {
				console.log('not valid email')
				res.json({
					success: false,
				})
			}
		})
	}

	updatePassword(app, db) {
		app.post('/updatePassword', (req, res) => {
			let { password, confirm, token } = req.body

			const date = Date.now()

			if (password.length < 6) {
				res.json({
					success: false,
					error: 'password',
					msg: 'Password must be at least 6 characters, please try again.',
				})
			}

			if (password !== confirm) {
				res.json({
					success: false,
					error: 'confirm',
					msg: 'Passwords do not match, please try again.',
				})
			}

			let hashedPassword = bcrypt.hashSync(password, 9)
			let sql = `UPDATE user SET password = ? WHERE token = ? AND expiration > ? LIMIT 1`

			db.query(sql, [hashedPassword, token, date], (err, data, fields) => {
				if (data) {
					let sql = `UPDATE user SET token = ?, expiration = ?, used = ? WHERE token = ? LIMIT 1`
					db.query(sql, [undefined, undefined, 1, token], e => {
						if (e) {
							console.log(e)
						} else {
							res.json({
								success: true,
								msg: 'token reset',
								token: token,
							})
						}
					})
				} else {
					res.json({
						success: false,
						error: err,
						msg: 'An error occurred resetting your password, please try again.',
					})
				}
			})
		})
	}

	addToList(app, db) {
		const sql = `
			INSERT INTO list (username, listID, name, sourceUrl, thumbnailUrl, datePublished, owningOrgId) 
			VALUES (?, ?, ?, ?, ?, ?, ?)
		`

		app.post('/list', (req, res) => {
			let {
				username,
				listID,
				name,
				sourceUrl,
				thumbnailUrl,
				datePublished,
				owningOrgId,
			} = req.body
			datePublished = datePublished.slice(0, 10)

			console.log('req.session',req.session)

			if (req.session.userID) {
				db.query(
					sql,
					[
						username,
						listID,
						name,
						sourceUrl,
						thumbnailUrl,
						datePublished,
						owningOrgId,
					],
					(err, rows) => {
						if (err) {
							res.json({
								success: false,
								msg: err,
							})
							return
						} else {
							res.json({
								success: true,
								username,
								listID,
								name,
								sourceUrl,
								thumbnailUrl,
								datePublished,
								owningOrgId,
							})
						}
					}
				)
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
			let {username} = req.query
			db.query(sql, [username], (err, rows) => {
				if (err) {
					res.json({
						success: false,
						msg: err,
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
			let {username, listID} = req.query
			
			db.query(sql, [username, listID], (err, rows) => {
				if (err) {
					res.json({
						success: false,
						msg: err,
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