import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { AuthContextProvider } from './context/authContext'
import { APIContextProvider } from './context/APIContext'
import { ListContextProvider } from './context/listContext'

ReactDOM.render(
		<APIContextProvider>
		  <AuthContextProvider>
		  	<ListContextProvider>
		    	<App />
		    </ListContextProvider>	
		  </AuthContextProvider>
	  </APIContextProvider>,
  document.getElementById('root')
)
