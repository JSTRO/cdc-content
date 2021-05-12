import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { observer } from 'mobx-react'
import UserStore from './stores/UserStore'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import PasswordSent from './pages/PasswordSent'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Search from './components/Search'
import ArticleList from './components/ArticleList'
import TagWithDelete from './components/TagWithDelete'
import Footer from './components/Footer'
import DrawerRight from './components/DrawerRight'
import Pagination from '@material-ui/lab/Pagination'
import useAPI from './hooks/useAPI'
import useAuth from './hooks/useAuth'
import './App.css'

function App() {
  const {
    currentArticles,
    setCurrentPage,
    search,
    setSearch,
    pageCount,
    tagList,
    setTagList
  } = useAPI()

  const { loading, checkIsLoggedIn, isLoggedIn } = useAuth()

  useEffect(() => {
    checkIsLoggedIn()
  }, [])

  const handleChange = (event, value) => {
    setCurrentPage(value)
  }

  if (loading) {
    return (
      <div className="App">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <DrawerRight search={search} setSearch={setSearch} />
            <Search search={search} setSearch={setSearch}/>
            <Pagination 
              className="pagination"
              count={pageCount} 
              color="primary" 
              onChange={handleChange}
              showFirstButton
              showLastButton
            />
            {tagList.map(tag => (
              <TagWithDelete
                tag={tag}
                setTagList={setTagList}
              /> 
            ))}  
            <ArticleList 
              setTagList={setTagList}
              currentArticles={currentArticles}
            />
          </Route>
          {isLoggedIn ? <Redirect to="/" /> : 
            <>
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/register" component={RegisterPage} />
              <Route exact path="/forgot" component={ForgotPassword} />
              <Route exact path="/sent" component = {PasswordSent} />
              <Route exact path="/reset/:token" component = {ResetPassword} />
            </>
          } 
        </Switch>
        {currentArticles.length > 0 && <Footer />} 
      </Router>  
    </div>  
  )
}

export default observer(App)