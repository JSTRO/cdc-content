import React, { useEffect, useContext } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import ArticleList from './components/ArticleList'
import TagWithDelete from './components/TagWithDelete'
import Footer from './components/Footer'
import DrawerRight from './components/DrawerRight'
import Pagination from '@material-ui/lab/Pagination'
import { AuthContext } from './context/authContext'
import { APIContext } from './context/APIContext'
import { ListContext } from './context/listContext'
import './App.css'

function App() {
  const {
    currentArticles,
    currentPage,
    setCurrentPage,
    search,
    setSearch,
    pageCount,
    tagList,
    setTagList,
    resultsLoading
  } = useContext(APIContext)

  const { checkIsLoggedIn, isLoggedIn } = useContext(AuthContext)

  const handlePagination = (event, page) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    checkIsLoggedIn()
  }, [])
  
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <DrawerRight search={search} setSearch={setSearch} />
            {tagList.map(tag => (
              <TagWithDelete tag={tag} setTagList={setTagList} />
            ))}
            <ArticleList
              setTagList={setTagList}
              currentArticles={currentArticles}
              resultsLoading={resultsLoading}
            />
            <Pagination
              className="pagination"
              count={pageCount}
              page={currentPage}
              color="primary"
              onChange={handlePagination}
              showFirstButton
              showLastButton
            />
            <Footer />
          </Route>
          {isLoggedIn ? (
            <Redirect to="/" />
          ) : (
            <>
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/register" component={RegisterPage} />
              <Route exact path="/forgot" component={ForgotPassword} />
              <Route exact path="/reset/:token" component={ResetPassword} />
            </>
          )}
        </Switch>
      </Router>
    </div>
  )
}

export default App