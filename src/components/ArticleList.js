import React from 'react'
import Article from './Article'
import useAPI from '../hooks/useAPI'
import useArticles from '../hooks/useArticles'

function ArticleList({setMyList, articles, setTagList}) {
	const { loading } = useAPI()

	if (loading) {
		return <p>Loading...</p>
	}

	return (
		<div>
			{articles.map(article => <Article article={article} key={article.id} setMyList={setMyList} setTagList={setTagList} />)}	
		</div>
	)
}

export default ArticleList