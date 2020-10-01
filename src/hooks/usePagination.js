import { useState, useEffect } from 'react'
import useAPI from './useAPI'

export default function usePagination() {
  const { articles } = useAPI()
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [articlesPerPage] = useState(20)
  const [filteredArticles, setFilteredArticles] = useState([])

  const indexOfLastPost = currentPage * articlesPerPage
  const indexOfFirstPost = indexOfLastPost - articlesPerPage
  const currentArticles = filteredArticles.slice(indexOfFirstPost, indexOfLastPost)
  const pageCount = Math.ceil(filteredArticles.length / articlesPerPage)

  const handleChange = (event, value) => {
    setCurrentPage(value);
  }

  useEffect(() => {
    setFilteredArticles(articles.filter(a => {
      return a.name.toLowerCase().includes(search.toLowerCase())
    }))
    setCurrentPage(1)
  }, [search, articles])

  return { search, setSearch, pageCount, currentPage, handleChange, currentArticles }

}