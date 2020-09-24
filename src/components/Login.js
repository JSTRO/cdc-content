import React, { useState } from 'react'
import axios from 'axios'
import InputField from './InputField'
import Submit from './Submit'
import UserStore from '../stores/UserStore'

function Login() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [buttonDisabled, setButtonDisabled] = useState(false)

	const setInputValue = (property, val) => {
		val = val.trim()
		if (val.length > 12) {
			return
		}
		property === 'username' ? setUsername(val) : setPassword(val)
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
        console.log(UserStore.isLoggedIn, "UserStore.isLoggedIn")
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
			<InputField 
				type="text"
				placeholder='Username' 
				value={username ? username : ''}
				onChange={(val) => setInputValue('username', val)}
			/>
			<InputField 
				type="password"
				placeholder='Password' 
				value={password ? password : ''}
				onChange={(val) => setInputValue('password', val)}
			/>
			<Submit 
				text='Log in'
				disabled={buttonDisabled}
				onClick={() => doLogin()}
			/>
		</div>
	)
}

export default Login