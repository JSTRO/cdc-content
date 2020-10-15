import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useAPI() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [articles, setArticles] = useState([])
  const [filteredArticles, setFilteredArticles] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    const getResults = async () => {
      setLoading(true)
      setError(false)
      try {
        const res = await axios.get('https://tools.cdc.gov/api/v2/resources/media', {
          params: {
            q: search,
            language: 'english',
            max: 10,
          }
        })
        setArticles(res.data.results)
        setLoading(false)
      } catch(err) {
        setError(true)
      }
    }
    getResults()
  }, [search])

  //  useEffect(() => {
  //   setFilteredArticles(articles.filter(a => {
  //     return a.name.toLowerCase().includes(search.toLowerCase())
  //   }))
  //   setCurrentPage(0)
  // }, [search, articles])

  return { loading, error, articles, setArticles, search, setSearch }
}