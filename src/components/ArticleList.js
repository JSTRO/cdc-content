import React from 'react'
import Article from './Article'

function ArticleList({ setTagList, currentArticles }) {
	return (
		<div>
			{currentArticles.map(article => (
				<Article article={article} key={article.id} setTagList={setTagList} />
			))}
		</div>
	)
}

export default ArticleList