import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import Submit from './Submit'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import '../App.css'

function Register() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [confirm, setConfirm] = useState('')
	const [buttonDisabled, setButtonDisabled] = useState(false)

	const setInputValue = event => {
		let {name, value} = event.target
		value = value.trim()
		if (value.length > 12) {
			return
		}
		if (name === 'username') {
			setUsername(value)
		} else if (name === 'password') {
			setPassword(value)
		} else {
			setConfirm(value)
		}
	}

	const resetForm = () => {
		setUsername('')
		setPassword('')
		setButtonDisabled(false)
	}

	const doRegister = async () => {
		if (!username) return
		if (!password) return
		if (!confirm) return
		setButtonDisabled(true)

		try {
			let res = await axios({
				url: '/register',
				method: 'post',
				headers: { 
	      	'Accept': 'application/json', 
	      	'Content-Type': 'application/json' 
	      },
	      data: JSON.stringify({
	      	username: username,
	      	password: password,
	      	confirm: confirm
	      })
			})

			let result = await res.data

			if (result && result.success) {
        alert(result.msg)
      } else if (result && result.success === false) {
    		resetForm()
    		alert(result.msg)
      }
	  } catch(err) {
	  		resetForm()
	  }
	}

	return (
		<div className="register">
			<Grid container spacing={0} justify="center" direction="row">
				<Grid item>
					<Grid
						container
						direction="column"
						justify="center"
						spacing={2}
						className="login-form"
					>
						<Paper variant="elevation" elevation={2} className="login-background">
							<Grid item>
								<Typography component="h1" variant="h5">
									Sign Up
								</Typography>
							</Grid>
							<Grid item>
								<form>
									<Grid container direction="column" spacing={2}>
										<Grid item>
											<TextField
												required
												name="username"
												label="username"
												autoComplete="username"
												variant="outlined"
												value={username ? username : ''}
												onChange={setInputValue}
											/>
										</Grid>
										<Grid item>
											<TextField
												required
												name="password"
											  label="password"
											  type="password"
											  variant="outlined"
											  value={password ? password : ''}
												onChange={setInputValue}
											/>
										</Grid>
										<Grid item>
											<TextField 
												required
												name="confirm"
											  label="confirm password"
											  type="password"
											  variant="outlined"
											  value={confirm ? confirm : ''}
												onChange={setInputValue}
											/>
										</Grid>
										<Grid item>
											<Submit 
												text='Register'
												color="primary"
												disabled={buttonDisabled}
												onClick={() => doRegister()}
											/>
										</Grid>
									</Grid>
								</form>
							</Grid>
							<Grid item>
								Already a member? <Link to='/login'>Sign In</Link>
							</Grid>
						</Paper>
					</Grid>
				</Grid>
			</Grid>
		</div>
	)
}

export default Register