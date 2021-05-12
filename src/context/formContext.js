import React, { useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/authContext'

const FormContext = React.createContext('')

function FormContextProvider(props) {
    const [errors, setErrors] = useState([])
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [inputValues, setInputValues] = useState('')
    const {setUsername, setEmail, setPassword, setConfirm} = useContext(AuthContext)

    const handleInputChange = e => {
        let {name, value} = e.target
        value = value.trim()
        setInputValues(prev => ({ ...prev, [name]: value }))
    }

    const resetForm = () => {
        setUsername('')
        setEmail('')
        setPassword('')
        setConfirm('')
        setButtonDisabled(false)
    }

    const formContextValue = {
        errors,
        setErrors,
        buttonDisabled,
        handleInputChange,
        resetForm
    }
    
    return (
        <FormContext.Provider value={formContextValue}>
            {props.children}
        </FormContext.Provider>
    )
}

export {FormContextProvider, FormContext}