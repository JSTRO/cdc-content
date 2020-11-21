import { useState, useEffect } from 'react'
import useAPI from './useAPI'

export default function usePagination() {
  const { articles, articlesPerPage, setArticlesPerPage, currentPage, setCurrentPage } = useAPI()
  //const [currentPage, setCurrentPage] = useState(0)

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

  return {handlePageChange, handleChangeRowsPerPage, currentArticles, pageCount}
}