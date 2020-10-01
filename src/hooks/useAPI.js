import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useAPI() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [articles, setArticles] = useState([])

  useEffect(() => {
    const getResults = async () => {
      setLoading(true)
      setError(false)
      try {
        const res = await axios.get('https://tools.cdc.gov/api/v2/resources/media?max=100')
        setArticles(res.data.results)
        setLoading(false)
      } catch(err) {
        setError(true)
      }
    }
    getResults()
  }, [])

  return { loading, error, articles, setArticles }
}