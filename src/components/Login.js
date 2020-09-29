import React, { useState } from 'react'
import axios from 'axios'
import Submit from './Submit'
import UserStore from '../stores/UserStore'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Link from '@material-ui/core/Link'
import TextField from '@material-ui/core/TextField'
import '../App.css'

function Login() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [buttonDisabled, setButtonDisabled] = useState(false)

	const setInputValue = event => {
		let {name, value} = event.target
		value = value.trim()
		if (value.length > 12) {
			return
		}
		name === 'username' ? setUsername(value) : setPassword(value)
	}

	const resetForm = () => {
		setUsername('')
		setPassword('')
		setButtonDisabled(false)
	}

	const doLogin = async () => {
		if (!username) return
		if (!password) return
		setButtonDisabled(true)

		try {
			let res = await axios({
				url: '/login',
				method: 'post',
				headers: { 
	      	'Accept': 'application/json', 
	      	'Content-Type': 'application/json' 
	      },
	      data: JSON.stringify({
	      	username: username,
	      	password: password
	      })
			})

			let result = await res.data

			if (result && result.success) {
        UserStore.isLoggedIn = true
        UserStore.username = result.username
      } else if (result && result.success === false) {
      		resetForm()
      		alert(result.msg)
      }
	  } catch(err) {
	  		resetForm()
	  }
	}

	return (
		<div className="login">
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
									Sign in
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
											  autoComplete="current-password"
											  variant="outlined"
											  value={password ? password : ''}
												onChange={setInputValue}
											/>
										</Grid>
										<Grid item>
											<Submit 
												text='Log in'
												disabled={buttonDisabled}
												onClick={() => doLogin()}
											/>
										</Grid>
									</Grid>
								</form>
							</Grid>
							<Grid item>
								<Link href="#" variant="body2">
									Forgot Password?
								</Link>
							</Grid>
						</Paper>
					</Grid>
				</Grid>
			</Grid>
		</div>
	)
}

export default Login