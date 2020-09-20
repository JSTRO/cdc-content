import React from 'react'
import useAPI from '../hooks/useAPI'
import Article from './Article'

function ArticleList({articles}) {
	const { loading } = useAPI()

	if (loading) {
		return <p>Loading...</p>
	}
	return (
		<div>
			{articles.map(article => <Article article={article} key={article.id} />)}
		</div>	
	)
}

export default ArticleList