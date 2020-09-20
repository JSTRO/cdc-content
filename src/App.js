import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import ArticleList from './components/ArticleList'
import Pagination from '@material-ui/lab/Pagination'
import useAPI from './hooks/useAPI'
import './App.css'

function App() {

  const { articles, setArticles } = useAPI()

  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [articlesPerPage, setArticlesPerPage] = useState(10)
  const [filteredArticles, setFilteredArticles] = useState([])

  const indexOfLastPost = currentPage * articlesPerPage
  const indexOfFirstPost = indexOfLastPost - articlesPerPage
  const currentArticles = filteredArticles.slice(indexOfFirstPost, indexOfLastPost)

  const handleChange = (event, value) => {
    setCurrentPage(value);
  }

  useEffect(() => {
    setFilteredArticles(articles.filter(a => {
      return a.name.toLowerCase().includes(search.toLowerCase())
    }))
    setCurrentPage(1)
  }, [search, articles])

  return (
    <div className="App">
      <header className="App-header">
        <h1>CDC Content</h1>
      </header>
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

export default App
