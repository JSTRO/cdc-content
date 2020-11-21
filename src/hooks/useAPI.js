import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useAPI(url = 'https://tools.cdc.gov/api/v2/resources/media') {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [articles, setArticles] = useState([])
  const [currentArticles, setCurrentArticles] = useState([])
  const [search, setSearch] = useState('')
  const [articlesPerPage, setArticlesPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [max, setMax] = useState(100)
  const [pageCount, setPageCount] = useState(Math.ceil(max / articlesPerPage))
  
  const indexOfLastPost = currentPage * articlesPerPage
  const indexOfFirstPost = indexOfLastPost - articlesPerPage

  useEffect(() => {
    const getResults = async () => {
      setLoading(true)
      setError(false)
      try {
        const res = await axios.get('https://tools.cdc.gov/api/v2/resources/media', {
          params: {
            q: search,
            language: 'english',
            max: max,
            offset: indexOfFirstPost,
            pagenum: currentPage,
          }
        })
        setArticles(res.data.results)
        setCurrentArticles(res.data.results.slice(indexOfFirstPost, indexOfLastPost))
        setLoading(false)
      } catch(err) {
        setError(true)
      }
    }
    getResults()
  }, [search, currentPage])

  return { setCurrentPage, currentArticles, search, setSearch, pageCount }
}