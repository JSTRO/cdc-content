import React, { useState } from 'react'
import { Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom'
import axios from 'axios'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import UserStore from '../stores/UserStore'
import { observer } from 'mobx-react'

function Login() {
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
		<div>
			<Router>
        <Switch>
          <Route exact path="/login"> 
          	<LoginPage
          		username={username}
          		password={password}
          		setInputValue={setInputValue}
          		buttonDisabled={buttonDisabled}
          		doLogin={doLogin}
          	/>
          </Route>
          <Route exact path="/register">
          	<RegisterPage
          		username={username}
          		password={password}
          		confirm={confirm}
          		setInputValue={setInputValue}
          		buttonDisabled={buttonDisabled}
          		doRegister={doRegister}
          	/>
          </Route>
        </Switch>
      </Router>				
      <Link to="/">Continue to browse</Link>
		</div>
	)
}

export default observer(Login)