import React from 'react'
import TablePagination from '@material-ui/core/TablePagination'
import useAPI from '../hooks/useAPI'

function Pagination({currentArticles}) {
	const { articles, currentPage, setCurrentPage, articlesPerPage, setArticlesPerPage } = useAPI()
	const pageCount = Math.ceil(articles.length)
  const indexOfLastPost = (currentPage + 1) * articlesPerPage
  const indexOfFirstPost = indexOfLastPost - articlesPerPage

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    const { value } = event.target
    setArticlesPerPage(parseInt(value))
    setCurrentPage(0)
  }

  console.log(currentPage, articlesPerPage)

	return (
		<TablePagination
      component="div"
      className="pagination"
      count={pageCount}
      page={currentPage}
      onChangePage={handlePageChange}
      rowsPerPage={articlesPerPage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
	)
}

export default Pagination