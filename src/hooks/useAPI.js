import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useAPI(url = 'https://tools.cdc.gov/api/v2/resources/media') {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [articles, setArticles] = useState([])
  const [currentArticles, setCurrentArticles] = useState([])
  const [filteredArticles, setFilteredArticles] = useState(articles)
  const [search, setSearch] = useState('')
  const [articlesPerPage, setArticlesPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [max, setMax] = useState(100)
  const [pageCount, setPageCount] = useState(10)
  const [tagList, setTagList] = useState([])

  const indexOfLastPost = currentPage * articlesPerPage
  const indexOfFirstPost = indexOfLastPost - articlesPerPage

  useEffect(() => {
    const getResults = async () => {
      setLoading(true)
      setError(false)
      try {
        const res = await axios.get(url, {
          params: {
            q: search,
            language: 'english',
            max: max,
            offset: indexOfFirstPost,
            pagenum: currentPage,
          },
        })
        setArticles(res.data.results)
        setLoading(false)
      } catch (err) {
        setError(true)
      }
    }
    getResults()
  }, [search, currentPage, indexOfFirstPost, max, url])

  // set filtered articles
  useEffect(() => {
    const filterByTags = results => {
      const isResultTagInList = resultTag =>
        tagList.some(tag => resultTag.id === tag.id)
      const resultFilter = result => result.tags.some(isResultTagInList)
      const filtered = results.filter(resultFilter)
      return filtered
    }

    const filtered = filterByTags(articles)
    const filteredCount = Math.ceil(filtered.length / articlesPerPage)
    const articleCount = Math.ceil(articles.length / articlesPerPage)

    if (tagList.length > 0) {
      setFilteredArticles(filtered)
      setPageCount(filteredCount)
    } else {
      setFilteredArticles(articles)
      setPageCount(articleCount)
    }
  }, [articles, tagList, articlesPerPage])

  // set current articles
  useEffect(() => {
    setCurrentArticles(
      filteredArticles.slice(indexOfFirstPost, indexOfLastPost)
    )
  }, [filteredArticles, indexOfFirstPost, indexOfLastPost])

  return {
    setCurrentPage,
    currentArticles,
    search,
    setSearch,
    pageCount,
    tagList,
    setTagList,
  }
}