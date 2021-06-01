import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { AuthContextProvider } from './context/authContext'
import { APIContextProvider } from './context/APIContext'

ReactDOM.render(
		<APIContextProvider>
		  <AuthContextProvider>
		    <App />
		  </AuthContextProvider>
	  </APIContextProvider>,
  document.getElementById('root')
)
