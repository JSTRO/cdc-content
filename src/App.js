import React, { useState, useEffect } from 'react'
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom'
import { observer } from 'mobx-react'
import UserStore from './stores/UserStore'
import Login from './components/Login'
import Search from './components/Search'
import ArticleList from './components/ArticleList'
import TagWithDelete from './components/TagWithDelete'
import Footer from './components/Footer'
import DrawerRight from './components/DrawerRight'
import Grid from '@material-ui/core/Grid'
import Pagination from '@material-ui/lab/Pagination'
import useAPI from './hooks/useAPI'
import './App.css'

function App() {
  const {
    currentArticles,
    setCurrentPage,
    search,
    setSearch,
    pageCount,
  } = useAPI()
  const [tagList, setTagList] = useState([])

  useEffect(() => {
    UserStore.checkIsLoggedIn()
  }, [])

  const handleChange = (event, value) => {
    setCurrentPage(value)
  }
  
  if (UserStore.loading) {
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
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Search search={search} setSearch={setSearch}/>
              </Grid> 
              <Grid item xs={6}>
                <Pagination count={pageCount} color="primary" onChange={handleChange}/>
              </Grid>
            </Grid> 
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
          <Route exact path="/login">
            {UserStore.isLoggedIn ? <Redirect to="/" /> : <Login />}
          </Route>  
          <Route exact path="/register" >
            {UserStore.isLoggedIn ? <Redirect to="/" /> : <Login />}
          </Route>
        </Switch>
        {currentArticles.length > 0 && <Footer />} 
      </Router>  
    </div>  
  )
}

export default observer(App)