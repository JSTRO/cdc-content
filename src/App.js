import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { observer } from 'mobx-react'
import UserStore from './stores/UserStore'
import Login from './components/Login'
import Submit from './components/Submit'
import Search from './components/Search'
import ArticleList from './components/ArticleList'
import Pagination from '@material-ui/lab/Pagination'
import Drawer from './components/Drawer'
import useAPI from './hooks/useAPI'
import './App.css'

function App() {
  const { articles } = useAPI()

  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [articlesPerPage] = useState(20)
  const [filteredArticles, setFilteredArticles] = useState([])

  const indexOfLastPost = currentPage * articlesPerPage
  const indexOfFirstPost = indexOfLastPost - articlesPerPage
  const currentArticles = filteredArticles.slice(indexOfFirstPost, indexOfLastPost)

  const handleChange = (event, value) => {
    setCurrentPage(value);
  }

  // MOVE TO SEPARATE FILE
  const logIn = async () => {
    try {
      let res = await axios({
        url: '/isLoggedIn',
        method: 'post',
        headers: { 
          'Accept': 'application/json', 
          'Content-Type': 'application/json' 
        }
      })
      
      let result = await res.data
      
      if (result && result.success) {
        console.log("UserStore.isLoggedIn", UserStore.isLoggedIn)
        UserStore.loading = false
        UserStore.isLoggedIn = true
        UserStore.username = result.username
        console.log("UserStore.isLoggedIn", UserStore.isLoggedIn)
      } else {
        UserStore.loading = false
        UserStore.isLoggedIn = false
      }
      
    } catch(err) {
        UserStore.loading = false
        UserStore.isLoggedIn = false
    }
  }

  useEffect(() => {
    logIn()
  }, [])
  
  // MOVE TO SEPARATE FILE
  const logOut = async () => {
    try {
      let res = await axios({
        url: '/logOut',
        method: 'post',
        headers: { 
          'Accept': 'application/json', 
          'Content-Type': 'application/json' 
        }
      })

      let result = await res.data
      
      if (result && result.success) {
        UserStore.isLoggedIn = false
        UserStore.username = ''
      } 
    } catch(err) {
        console.log(err)
    }
  }

  // pagination
  useEffect(() => {
    setFilteredArticles(articles.filter(a => {
      return a.name.toLowerCase().includes(search.toLowerCase())
    }))
    setCurrentPage(1)
  }, [search, articles])

  if (UserStore.loading) {
    return (
      <div className="App">
        <p>Loading...</p>
      </div>
    )
  } 
  // else if (!UserStore.isLoggedIn) {
  //   return (
  //     <div className="App">
  //       <Login />
  //     </div>
  //   )
  // } 
  else {
    return (
      <div className="App">
        <p>Welcome, {UserStore.username}</p>
        <Submit text={'Log Out'} disabed={false} onClick={() => logOut()}/>
        <Drawer />
        <Search search={search} setSearch={setSearch}/>
        <Pagination 
          count={Math.ceil(filteredArticles.length / articlesPerPage)}
          page={currentPage}
          onChange={handleChange}
        />
        <ArticleList articles={currentArticles}/>
      </div>  
    )
  }
}

export default observer(App)