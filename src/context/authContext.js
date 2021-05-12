import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { FormContext } from '../context/formContext'

const AuthContext = React.createContext('')

function AuthContextProvider(props) {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')

    const [loading, setLoading] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [token, setToken] = useState('')
    const [expiration, setExpiration] = useState('')
    const [list, setList] = useState([])

    const {setErrors, buttonDisabled, setButtonDisabled, resetForm} = useContext(FormContext)

    const history = useHistory()

    const doLogin = async () => {
        if (!username) return
        if (!password) return
        setButtonDisabled(true)

        try {
            let res = await axios({
                url: '/login',
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                data: JSON.stringify({
                    username: username,
                    password: password,
                }),
            })

            let result = await res.data

            if (result && result.success) {
                setIsLoggedIn(true)
                setUsername(result.username)
            } else if (result && result.success === false) {
                resetForm()
                setErrors([result.error])
            }
        } catch (err) {
            resetForm()
        }
    }

    const doRegister = async () => {
        if (!username) return
        if (!email) return
        if (!password) return
        if (!confirm) return
        setButtonDisabled(true)

        try {
            let res = await axios({
                url: '/register',
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                data: JSON.stringify({
                    username: username,
                    email: email,
                    password: password,
                    confirm: confirm,
                }),
            })

            let result = await res.data

            if (result && result.success) {
                alert(result.msg)
                doLogin()
            } else if (result && result.success === false) {
                resetForm()
                setErrors({[result.error]: result.msg})
            }
        } catch (err) {
            resetForm()
        }
    }    

    const resetPassword = async () => {
        if (!email) return
        setButtonDisabled(true)

        try {
            let res = await axios({
                url: '/resetPassword',
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                data: JSON.stringify({
                    email: email,
                }),
            })

            let result = await res.data

            if (result && result.success) {
                setEmail(result.email)
                setExpiration(result.expiration)
                history.replace('sent')
            } else if (result && result.success === false) {
                resetForm()
                setErrors([result.error])
            }
        } catch (err) {
            resetForm()
        }
    }

    const authContextValue = {
        username,
        password, 
        email,
        confirm,
        doLogin,
        doRegister,
        resetPassword
    }
    
    return (
        <AuthContext.Provider value={authContextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export {AuthContextProvider, AuthContext}