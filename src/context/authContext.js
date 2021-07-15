import React, { useState } from 'react'
import axios from 'axios'

const AuthContext = React.createContext({})

function AuthContextProvider(props) {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [resetSuccess, setResetSuccess] = useState(false)
    const [emailSent, setEmailSent] = useState(false)
    const [loading, setLoading] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [expiration, setExpiration] = useState(0)
    const [errors, setErrors] = useState([])
    const [buttonDisabled, setButtonDisabled] = useState(false)

    const handleInputChange = event => {
        event.preventDefault()
        let { name, value } = event.target
        value = value.trim()

        if (name === 'username') {
            setUsername(value)
        } else if (name === 'password') {
            setPassword(value)
        } else if (name === 'confirm') {
            setConfirm(value)
        } else {
            setEmail(value)
        }
    }

    const resetForm = () => {
        setUsername('')
        setEmail('')
        setPassword('')
        setConfirm('')
        setErrors('')
        setButtonDisabled(false)
    }

    const checkIsLoggedIn = async () => {
        try {
            let res = await axios({
                url: '/isLoggedIn',
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })

            let result = await res.data

            if (result && result.success) {
                setLoading(false)
                setIsLoggedIn(true)
                setUsername(result.username)
            } else {
                setLoading(false)
                setIsLoggedIn(false)
            }
        } catch (err) {
            setLoading(false)
            setIsLoggedIn(false)
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
                setErrors(errors => [...errors, result.msg])
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
                setErrors(errors => [...errors, result.msg])
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
                setEmailSent(true)
                setExpiration(result.expiration)
            } else if (result && result.success === false) {
                resetForm()
                setErrors(errors => [...errors, result.msg])
            }
        } catch (err) {
            resetForm()
        }
    }

    const updatePassword = async token => {
        if (!password) return
        if (!confirm) return

        try {
            let res = await axios({
                url: '/updatePassword',
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                data: JSON.stringify({
                    password: password,
                    confirm: confirm,
                    token: token,
                }),
            })

            let result = await res.data

            if (result && result.success) {
                setResetSuccess(true)
            } else {
                resetForm()
                console.log(result.error)
                setErrors(errors => [...errors, result.msg])
            }
        } catch (err) {
            console.log(err)
            resetForm()
        }
    }

    const logout = async () => {
        try {
            let res = await axios({
                url: '/logout',
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })

            let result = await res.data

            if (result && result.success) {
                setIsLoggedIn(false)
                setUsername('')
            }
        } catch (err) {
            console.log(err)
        }
    }

    const authContextValue = {
        username,
        password,
        email,
        confirm,
        checkIsLoggedIn,
        isLoggedIn,
        doLogin,
        doRegister,
        resetPassword,
        updatePassword,
        logout,
        loading,
        errors,
        buttonDisabled,
        handleInputChange,
        resetForm,
        expiration,
        resetSuccess,
        emailSent
    }

    return (
        <AuthContext.Provider value={authContextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContextProvider, AuthContext }