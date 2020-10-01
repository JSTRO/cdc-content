import React, { useEffect } from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import { observer } from 'mobx-react'
import UserStore from './stores/UserStore'
import Login from './components/Login'
import Register from './components/Register'
import Search from './components/Search'
import ArticleList from './components/ArticleList'
import Pagination from '@material-ui/lab/Pagination'
import Drawer from './components/Drawer'
import usePagination from './hooks/usePagination'
import login from './auth/login'
import './App.css'

function App() {

  const { search, setSearch, pageCount, currentPage, handleChange, currentArticles } = usePagination()

  useEffect(() => {
    login()
  }, [])
{/*}  
  if (UserStore.loading) {
    return (
      <div className="App">
        <p>Loading...</p>
      </div>
    )
  } 
  else if (!UserStore.isLoggedIn) {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">              
              <Register />
            </Route> 
            <Route exact path="/login"> 
              <Login />
            </Route>   
          </Switch>  
        </Router>  
      </div>
    )
  } 
  else { */}
    return (
      <div className="App">
        <p>Welcome, {UserStore.username}</p>
        <Drawer />
        <Search search={search} setSearch={setSearch}/>
        <Pagination 
          count={pageCount}
          page={currentPage}
          onChange={handleChange}
        />
        <ArticleList articles={currentArticles}/>
      </div>  
    )
//  }
}

export default observer(App)