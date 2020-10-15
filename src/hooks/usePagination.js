import { useState, useEffect } from 'react'
import useAPI from './useAPI'

export default function usePagination() {
  const { articles } = useAPI()
  const [currentPage, setCurrentPage] = useState(0)
  const [articlesPerPage, setArticlesPerPage] = useState(10)

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

  return { articlesPerPage, currentPage, setCurrentPage, handlePageChange, handleChangeRowsPerPage, currentArticles }

}