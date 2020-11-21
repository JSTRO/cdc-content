import React from 'react'
import { observer } from 'mobx-react' 
import Article from './Article'

function ArticleList({ loading, setTagList, currentArticles }) {
	if (loading) {
		return <p>Loading...</p>
	}

	return (
		<div>
			{currentArticles.map(article => <Article article={article} key={article.id} setTagList={setTagList} />)}	
		</div>
	)
}

export default observer(ArticleList)