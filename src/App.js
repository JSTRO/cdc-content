import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import { observer } from 'mobx-react'
import UserStore from './stores/UserStore'
import Login from './components/Login'
import Register from './components/Register'
import Search from './components/Search'
import ArticleList from './components/ArticleList'
import TagWithDelete from './components/TagWithDelete'
import Pagination from '@material-ui/lab/Pagination'
import TablePagination from '@material-ui/core/TablePagination'
import DrawerRight from './components/DrawerRight'
import usePagination from './hooks/usePagination'
import useAPI from './hooks/useAPI'
import login from './auth/login'
import './App.css'

function App() {
  //const { articlesPerPage, currentPage, setCurrentPage, handlePageChange, handleChangeRowsPerPage, currentArticles } = usePagination()
  //const { search, setSearch, articles, setArticles } = useAPI()
  const [myList, setMyList] = useState([]) // ADD TO DB
  const [tagList, setTagList] = useState([])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [articles, setArticles] = useState([])
  const [filteredArticles, setFilteredArticles] = useState([])
  const [search, setSearch] = useState('')

  const [currentPage, setCurrentPage] = useState(0)
  const [articlesPerPage, setArticlesPerPage] = useState(10)

  const pageCount = Math.ceil(articles.length)
  const indexOfLastPost = (currentPage + 1) * articlesPerPage
  const indexOfFirstPost = indexOfLastPost - articlesPerPage
  const currentArticles = articles.slice(indexOfFirstPost, indexOfLastPost)

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    const { value } = event.target
    setArticlesPerPage(parseInt(value))
    setCurrentPage(0)
  }

  useEffect(() => {
    const getResults = async () => {
      setLoading(true)
      setError(false)
      try {
        const res = await axios.get('https://tools.cdc.gov/api/v2/resources/media', {
          params: {
            q: search,
            language: 'english',
            max: 100,
            offset: indexOfLastPost - 10,
            pagenum: currentPage + 1,
          }
        })
        setArticles(res.data.results)
        setLoading(false)
      } catch(err) {
        setError(true)
      }
    }
    getResults()
  }, [search, articlesPerPage, currentPage])

  useEffect(() => {
    login()
  }, [])
  
  // if (UserStore.loading) {
  //   return (
  //     <div className="App">
  //       <p>Loading...</p>
  //     </div>
  //   )
  // } 
  // else if (!UserStore.isLoggedIn) {
  //   return (
  //     <div className="App">
  //       <Router>
  //         <Switch>
  //           <Route exact path="/register">              
  //             <Register />
  //           </Route> 
  //           <Route exact path="/login"> 
  //             <Login />
  //           </Route>   
  //         </Switch>  
  //       </Router>  
  //     </div>
  //   )
  // } 
  // else { 

    console.log(tagList)

    return (
      <div className="App">
        <DrawerRight myList={myList} search={search} setSearch={setSearch} />
        {tagList.map(tag => (
          <TagWithDelete
            tag={tag}
            setTagList={setTagList}
          /> 
        ))}
        <TablePagination
          component="div"
          count={pageCount}
          page={currentPage}
          onChangePage={handlePageChange}
          rowsPerPage={articlesPerPage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        <ArticleList 
          articles={currentArticles} 
          setArticles={setArticles} 
          setMyList={setMyList}
          setTagList={setTagList}
          search={search}
          setSearch={setSearch}
        />
      </div>      
    )
//  }
}

export default observer(App)